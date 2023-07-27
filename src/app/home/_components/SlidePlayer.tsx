"use client";
import clsx from "clsx";
import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import HomePlayer, { HomePlayerRef } from "./HomePlayer";
import { HomeContainerProvider } from "./HomeContainer";

export interface SlidePlayerProps {
  homeSoundList: any[];
  onSlideChange?: SwiperProps["onSlideChange"];
}

const SlidePlayer = forwardRef<any, SlidePlayerProps>(
  ({ homeSoundList, onSlideChange: onSlideChangeFromProps }, ref) => {
    const homePlayerRefs = useRef<HomePlayerRef[]>([]);
    const [isSliding, setIsSliding] = useState(false);
    const { setActiveSoundIndex } = useContext(HomeContainerProvider);

    const onSlideChange: SwiperProps["onSlideChange"] = (swiper) => {
      if (onSlideChangeFromProps) {
        onSlideChangeFromProps(swiper);
      }
      const currentIndex = swiper.realIndex;
      // 更新 Provider 中的 activeSoundIndex
      setActiveSoundIndex && setActiveSoundIndex(currentIndex);
      // 滑动到当前屏幕后，播放当前音频的视频封面，暂停其他音频的视频封面
      homePlayerRefs.current.forEach((homePlayerRef, index) => {
        if (index === currentIndex) {
          homePlayerRef.videoPlay();
        } else {
          homePlayerRef.videoPause();
        }
      });
    };

    const onSlideMove: SwiperProps["onSliderMove"] = (swiper, event) => {
      // 获取滑动距离
      const currentIndex = swiper.realIndex;
      const slidesLength = homeSoundList.length;
      const currentX = swiper.touches.currentX;
      const startX = swiper.touches.startX;
      const diffX = Math.round(currentX - startX);
      if (Math.abs(diffX)) {
        setIsSliding(true);
      }
      if (diffX > window.screen.width / 2) {
        setActiveSoundIndex &&
          setActiveSoundIndex((currentIndex - 1 + slidesLength) % slidesLength);
      } else if (diffX < -(window.screen.width / 2)) {
        setActiveSoundIndex &&
          setActiveSoundIndex((currentIndex + 1) % slidesLength);
      } else {
        setActiveSoundIndex && setActiveSoundIndex(currentIndex);
      }
    };

    const onAudioStartPlay = (audioIndex: number) => {
      // 当音频开始播放时，重置除了将要播放的音频之外的其他音频
      homePlayerRefs.current.forEach((homePlayerRef, index) => {
        if (index !== audioIndex) {
          homePlayerRef.reset();
        }
      });
    };

    useImperativeHandle(ref, () => ({}));

    return (
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        className="h-full"
        loop
        onSlideChange={onSlideChange}
        onSliderMove={onSlideMove}
        onSlideChangeTransitionEnd={() => setIsSliding(false)}
        onSlideResetTransitionEnd={() => setIsSliding(false)}
      >
        {homeSoundList.map((sound, index) => (
          <SwiperSlide key={sound.scene_id}>
            <HomePlayer
              className={clsx("transition-all duration-150 ease-in")}
              style={{
                scale: isSliding ? 0.95 : 1,
                borderRadius: isSliding ? "2rem" : "initial",
                overflow: "hidden",
              }}
              ref={(ref) => {
                if (ref) {
                  homePlayerRefs.current[index] = ref;
                }
              }}
              img={sound.image}
              sound={sound.resource_download_url}
              video={sound.video_cover_download_url}
              videoCover={sound.video_cover_url}
              mediaMetaData={{
                title: sound.name["zh-Hans"],
                artist: "Wave",
                album: "Wave Sounds",
              }}
              isDolby={sound.is_dolby}
              onAudioStartPlay={() => onAudioStartPlay(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
);

SlidePlayer.displayName = "SlidePlayer";

export default SlidePlayer;
