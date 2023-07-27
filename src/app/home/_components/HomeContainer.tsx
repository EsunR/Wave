"use client";
import { ScenesListItem } from "@/types/sounds";
import { setThemeColorMeta } from "@/utils/dom";
import React, { useEffect, useMemo } from "react";

export interface HomeContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  activeIndex: number;
  soundList: ScenesListItem[];
}

export default function HomeContainer({
  activeIndex,
  soundList,
  children,
  ...htmlAttributes
}: HomeContainerProps) {
  const primaryColor = useMemo(() => {
    const color = soundList[activeIndex]?.primary_color;
    if (color) {
      return `rgba(${color})`;
    }
    return "rgba(0,0,0,1)";
  }, [soundList, activeIndex]);

  useEffect(() => {
    setThemeColorMeta(primaryColor);
  }, [primaryColor]);

  return (
    <div
      className="h-full transition-colors duration-200 ease-in-out"
      style={{
        backgroundColor: primaryColor,
      }}
      {...htmlAttributes}
    >
      <div className="h-full relative">{children}</div>
    </div>
  );
}
