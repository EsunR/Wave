"use client";
import clsx from "clsx";
import {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { HomePlayerMemo, HomePlayerRef } from "./HomePlayer";

export interface SlidePlayerProps {
  homeSoundList: any[];
  onSlideChange?: SwiperProps["onSlideChange"];
}

const SlidePlayer = forwardRef<any, SlidePlayerProps>(
  ({ homeSoundList, onSlideChange: onSlideChangeFromProps }, ref) => {
    const homePlayerRefs = useRef<HomePlayerRef[]>([]);
    const [isSliding, setIsSliding] = useState(false);

    const onSlideChange: SwiperProps["onSlideChange"] = (swiper) => {
      homePlayerRefs.current.forEach((player) => {
        player.reset();
      });
      if (onSlideChangeFromProps) {
        onSlideChangeFromProps(swiper);
      }
    };

    const onSlideMove: SwiperProps["onSliderMove"] = (swiper, event) => {
      // 获取滑动距离
      const currentX = swiper.touches.currentX;
      const startX = swiper.touches.startX;
      const diffX = Math.round(Math.abs(currentX - startX));
      if(diffX){
        setIsSliding(true);
      }
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
            <HomePlayerMemo
              className={clsx(
                "transition-all duration-150 ease-in",
              )}
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
);

SlidePlayer.displayName = "SlidePlayer";

export default SlidePlayer;

export const SlidePlayerMemo = memo(SlidePlayer);