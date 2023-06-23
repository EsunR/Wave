"use client";
import clsx from "clsx";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { VscRunErrors } from "react-icons/vsc";

export interface HomePlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  img: string;
  video?: string;
  videoCover?: string;
  sound: string;
  mediaMetaData: {
    title: string;
    artist: string;
    album: string;
  };
}

export interface HomePlayerRef {
  play: () => void;
  pause: () => void;
  reset: () => void;
}

const HomePlayer = forwardRef<HomePlayerRef, HomePlayerProps>(
  (
    { img, video, videoCover, sound, mediaMetaData, ...htmlAttributes },
    ref
  ) => {
    const audioDomRef = useRef<HTMLAudioElement>(null);
    const [soundLoaded, setSoundLoaded] = useState(false);
    const [soundLoadError, setSoundLoadError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
      if (audioDomRef.current) {
        audioDomRef.current.addEventListener("loadeddata", () => {
          setSoundLoaded(true);
        });
        // 加载错误
        audioDomRef.current.addEventListener("error", () => {
          setSoundLoadError(true);
          setSoundLoaded(false);
        });
      }
    }, [audioDomRef]);

    function setMediaSession() {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: mediaMetaData.title,
        artist: mediaMetaData.artist,
        album: mediaMetaData.album,
        artwork: [
          {
            src: img,
          },
        ],
      });
      navigator.mediaSession.setActionHandler("play", function () {
        audioDomRef.current?.play();
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("pause", function () {
        audioDomRef.current?.pause();
        setIsPlaying(false);
      });
    }

    const changePlayStatus = async (playStatus: "play" | "pause") => {
      if (audioDomRef.current) {
        if (playStatus === "play") {
          try {
            await audioDomRef.current.play();
            setMediaSession();
            setIsPlaying(true);
          } catch {}
        } else {
          try {
            audioDomRef.current.pause();
            setIsPlaying(false);
          } catch {}
        }
      }
    };

    function onPlayerClick() {
      if (audioDomRef.current) {
        if (isPlaying) {
          changePlayStatus("pause");
        } else {
          changePlayStatus("play");
        }
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        play: () => {
          changePlayStatus("play");
        },
        pause: () => {
          changePlayStatus("pause");
        },
        reset: () => {
          changePlayStatus("pause");
          if (window) {
            (audioDomRef.current as any).currentTime = 0;
          }
        },
      }),
      [soundLoaded]
    );

    return (
      <div
        onClick={onPlayerClick}
        {...htmlAttributes}
        className={clsx(
          "home-player relative w-full h-full",
          htmlAttributes.className
        )}
      >
        <audio loop ref={audioDomRef}>
          <source src={sound} />
        </audio>
        {video ? (
          <video
            className="absolute -z-10 w-full h-full object-cover"
            src={video}
            poster={videoCover}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            className="absolute -z-10 w-full h-full object-cover"
            src={img}
            alt="background"
          />
        )}

        {/* play icon */}
        <div
          className={clsx([
            "w-full h-full flex items-center justify-center pb-[--bottom-nav-height]",
          ])}
        >
          <div className={clsx(["opacity-30", isPlaying ? "hidden" : ""])}>
            {!soundLoadError ? (
              <BsFillPlayFill size={80} color="#FFF" />
            ) : (
              <VscRunErrors size={60} color="#FFF" />
            )}
          </div>
          <div
            className={clsx([
              "text-white text-3xl tracking-[0.75rem] transition-all duration-500 ease-in-out absolute font-thin",
              isPlaying ? "opacity-50" : "opacity-0",
            ])}
            style={{ writingMode: "vertical-lr" }}
          >
            {mediaMetaData.title}
          </div>
        </div>
      </div>
    );
  }
);

HomePlayer.displayName = "HomePlayer";

export default HomePlayer;
