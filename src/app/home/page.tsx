"use client";
import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { GreetingsMemo } from "./_components/Greetings";
import { SlidePlayerProps, SlidePlayerMemo } from "./_components/SlidePlayer";
import { setThemeColorMeta } from "@/utils/dom";
import { GetHomeSoundsResponse } from "../api/home/sounds/route";

export default function HomePage() {
  const [homeSoundList, setHomeSoundList] = useState<any[]>([]);
  const [slideActiveIndex, setSlideActiveIndex] = useState(0);

  const primaryColor = useMemo(() => {
    const color = homeSoundList[slideActiveIndex]?.primary_color;
    if (color) {
      return `rgba(${color})`;
    }
    return "rgba(0,0,0,1)";
  }, [homeSoundList, slideActiveIndex]);

  const fetchHomeSoundList = async () => {
    const res = (await (
      await fetch("/api/home/sounds")
    ).json()) as GetHomeSoundsResponse;
    setHomeSoundList(res.scenes);
  };

  useEffect(() => {
    fetchHomeSoundList();
  }, []);

  useEffect(() => {
    setThemeColorMeta(primaryColor);
  }, [primaryColor]);

  const onSlideChange = useCallback<
    NonNullable<SlidePlayerProps["onSlideChange"]>
  >((swiper) => {
    setSlideActiveIndex(swiper.realIndex);
  }, []);

  return (
    <div
      className="h-full transition-colors duration-200 ease-in-out"
      style={{
        backgroundColor: primaryColor,
      }}
    >
      {/* content */}
      <div className="h-full relative">
        <GreetingsMemo />
        <SlidePlayerMemo
          homeSoundList={homeSoundList}
          onSlideChange={onSlideChange}
        />

        {/* button area */}
        <div></div>
      </div>
    </div>
  );
}
