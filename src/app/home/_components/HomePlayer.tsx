"use client";
import clsx from "clsx";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { VscRunErrors } from "react-icons/vsc";
import { CgDolby } from "react-icons/cg";

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
  isDolby?: boolean;
}

export interface HomePlayerRef {
  play: () => void;
  pause: () => void;
  reset: () => void;
}

const HomePlayer = forwardRef<HomePlayerRef, HomePlayerProps>(
  (
    {
      img,
      video,
      videoCover,
      sound,
      mediaMetaData,
      isDolby,
      ...htmlAttributes
    },
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
        audioDomRef.current.addEventListener("error", (e) => {
          setSoundLoadError(true);
          setSoundLoaded(false);
        });
      }
    }, [audioDomRef]);

    const setMediaSession = useCallback(() => {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: mediaMetaData.title,
        artist: mediaMetaData.artist,
        album: mediaMetaData.album,
        // 封面太大可能会导致 iOS 页面卡死
        // artwork: [
        //   {
        //     src: img,
        //   },
        // ],
      });
      navigator.mediaSession.setActionHandler("play", function () {
        audioDomRef.current?.play();
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("pause", function () {
        audioDomRef.current?.pause();
        setIsPlaying(false);
      });
    }, [mediaMetaData, audioDomRef]);

    const changePlayStatus = async (playStatus: "play" | "pause") => {
      if (audioDomRef.current) {
        if (playStatus === "play") {
          try {
            await audioDomRef.current.play();
            setMediaSession();
            setIsPlaying(true);
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            audioDomRef.current.pause();
            setIsPlaying(false);
          } catch (e) {
            console.log(e);
          }
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
        <audio loop ref={audioDomRef} src={sound}></audio>
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

        <div
          className={clsx([
            "w-full h-full flex flex-col items-center justify-center pb-[--bottom-nav-height] relative",
          ])}
        >
          {/* play icon */}
          <div className={clsx(["opacity-30", isPlaying ? "hidden" : ""])}>
            {!soundLoadError ? (
              <BsFillPlayFill size={80} color="#FFF" />
            ) : (
              <div className="flex flex-col items-center">
                <VscRunErrors size={60} color="#FFF" className="mb-2" />
                <span className="text-white">浏览器不支持当前音频</span>
              </div>
            )}
          </div>
          {/* title */}
          <div
            className={clsx([
              "text-white text-3xl tracking-[0.75rem] transition-all duration-500 ease-in-out absolute font-extralight",
              isPlaying ? "opacity-70" : "opacity-0",
            ])}
            style={{ writingMode: "vertical-lr" }}
          >
            {mediaMetaData.title}
          </div>
          {/* dolby */}
          {isDolby ? (
            <div className="absolute top-[70%] flex items-center text-white opacity-70">
              <CgDolby size={20} className="mr-0.5" />
              <span className="text-sm">
                <b>Dolby</b> <span className="font-extralight">Atmos</span>
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

HomePlayer.displayName = "HomePlayer";

export default HomePlayer;

export const HomePlayerMemo = memo(HomePlayer);
