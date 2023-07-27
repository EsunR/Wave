"use client";
import { bosImage } from "@/utils/image";
import clsx from "clsx";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { CgDolby } from "react-icons/cg";
import { MdOutlineDownloading } from "react-icons/md";
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
  isDolby?: boolean;
  onAudioStartPlay?: () => void;
}

type MediaStatus = "loading" | "playing" | "pause" | "disable";

export interface HomePlayerRef {
  play: () => void;
  pause: () => void;
  reset: () => void;
  audioStatus: MediaStatus;
  videoPlay: () => void;
  videoPause: () => void;
  videoStatus: MediaStatus;
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
      onAudioStartPlay,
      ...htmlAttributes
    },
    ref
  ) => {
    const audioDomRef = useRef<HTMLAudioElement>(null);
    const videoDomRef = useRef<HTMLVideoElement>(null);
    const [audioStatus, setAudioStatus] = useState<MediaStatus>("loading");
    const [videoStatus, setVideoStatus] = useState<MediaStatus>(
      video ? "loading" : "disable"
    );

    useEffect(() => {
      if (audioDomRef.current) {
        audioDomRef.current.addEventListener("loadedmetadata", () => {
          setAudioStatus("pause");
        });
        // 加载错误
        audioDomRef.current.addEventListener("error", () => {
          setAudioStatus("disable");
        });
      }
    }, [audioDomRef]);

    useEffect(() => {
      if (videoDomRef.current) {
        videoDomRef.current.addEventListener("loadedmetadata", () => {
          setVideoStatus("pause");
        });
        // 加载错误
        videoDomRef.current.addEventListener("error", () => {
          setVideoStatus("disable");
        });
      }
    }, [videoDomRef]);

    const setMediaSession = useCallback(() => {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: mediaMetaData.title,
        artist: mediaMetaData.artist,
        album: mediaMetaData.album,
        // 封面太大可能会导致 iOS 页面卡死
        artwork: [
          {
            src: bosImage(img, { resize: { m: "fill", w: 200, h: 200 } }),
          },
        ],
      });
      navigator.mediaSession.setActionHandler("play", function () {
        audioDomRef.current?.play();
        setAudioStatus("playing");
      });
      navigator.mediaSession.setActionHandler("pause", function () {
        audioDomRef.current?.pause();
        setAudioStatus("pause");
      });
    }, [mediaMetaData, audioDomRef, img]);

    /**
     * 改变播放状态，仅处理播放和未播放状态，其他状态不处理
     */
    const changePlayStatus = useCallback(
      async (targetStatus: "playing" | "pause") => {
        if (audioStatus === "disable" || audioStatus === "loading") {
          return;
        }
        if (audioDomRef.current) {
          if (targetStatus === "playing") {
            try {
              await audioDomRef.current.play();
              setMediaSession();
              setAudioStatus("playing");
            } catch (e) {
              console.log(e);
            }
          } else {
            try {
              audioDomRef.current.pause();
              setAudioStatus("pause");
            } catch (e) {
              console.log(e);
            }
          }
        }
      },
      [setMediaSession, audioDomRef, audioStatus]
    );

    const changeVideoStatus = useCallback(
      async (targetStatus: "playing" | "pause") => {
        if (videoStatus === "disable" || videoStatus === "loading") {
          return;
        }
        if (videoDomRef.current) {
          if (targetStatus === "playing") {
            try {
              await videoDomRef.current.play();
              setVideoStatus("playing");
            } catch (e) {
              console.log(e);
            }
          } else {
            try {
              videoDomRef.current.pause();
              setVideoStatus("pause");
            } catch (e) {
              console.log(e);
            }
          }
        }
      },
      [videoDomRef, videoStatus]
    );

    function onPlayerClick() {
      if (audioDomRef.current) {
        if (audioStatus === "playing") {
          changePlayStatus("pause");
        } else {
          changePlayStatus("playing");
        }
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        play: () => {
          changePlayStatus("playing");
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
        audioStatus,
        videoPlay: () => {
          changeVideoStatus("playing");
        },
        videoPause: () => {
          changeVideoStatus("pause");
        },
        videoStatus,
      }),
      [audioStatus, changePlayStatus, videoStatus, changeVideoStatus]
    );

    useEffect(() => {
      if (audioStatus === "playing" && typeof onAudioStartPlay === "function") {
        onAudioStartPlay();
      }
    }, [audioStatus, onAudioStartPlay]);

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
            ref={videoDomRef}
            className="absolute -z-10 w-full h-full object-cover"
            src={video}
            poster={videoCover && bosImage(videoCover, { resize: { h: 896 } })}
            loop
            muted
            playsInline
          />
        ) : (
          <img
            className="absolute -z-10 w-full h-full object-cover"
            src={bosImage(img, { resize: { h: 896 } })}
            alt="background"
          />
        )}

        <div
          className={clsx([
            "w-full h-full flex flex-col items-center justify-center pb-[--bottom-nav-height] relative select-none",
          ])}
        >
          {/* play icon */}
          <div
            className={clsx([
              "opacity-30",
              audioStatus === "playing" ? "hidden" : "",
            ])}
          >
            {audioStatus === "loading" ? (
              <MdOutlineDownloading
                size={60}
                color="#FFF"
                className="animate-bounce"
              />
            ) : audioStatus === "disable" ? (
              <div className="flex flex-col items-center">
                <VscRunErrors size={60} color="#FFF" className="mb-2" />
                <span className="text-white">浏览器不支持当前音频</span>
              </div>
            ) : (
              <BsFillPlayFill size={80} color="#FFF" />
            )}
          </div>
          {/* title */}
          <div
            className={clsx([
              "text-white text-3xl tracking-[0.75rem] transition-all duration-500 ease-in-out absolute font-extralight",
              audioStatus === "playing" ? "opacity-70" : "hidden",
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
