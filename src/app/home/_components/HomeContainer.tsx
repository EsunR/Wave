"use client";
import { ScenesListItem } from "@/types/sounds";
import { setThemeColorMeta } from "@/utils/dom";
import React, { createContext, useEffect, useMemo } from "react";

export interface HomeContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  soundList: ScenesListItem[];
}

export const HomeContainerProvider = createContext<{
  activeSoundIndex?: number;
  setActiveSoundIndex?: React.Dispatch<React.SetStateAction<number>>;
}>({});

export default function HomeContainer({
  soundList,
  children,
  ...htmlAttributes
}: HomeContainerProps) {
  const [activeSoundIndex, setActiveSoundIndex] = React.useState(0);

  const primaryColor = useMemo(() => {
    const color = soundList[activeSoundIndex]?.primary_color;
    if (color) {
      return `rgba(${color})`;
    }
    return "rgba(0,0,0,1)";
  }, [soundList, activeSoundIndex]);

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
      <div className="h-full relative">
        <HomeContainerProvider.Provider
          value={{ activeSoundIndex, setActiveSoundIndex }}
        >
          {children}
        </HomeContainerProvider.Provider>
      </div>
    </div>
  );
}
