import { NextResponse } from "next/server";
import scenesData from "@/assets/data/scenes.json";
import { ScenesListItem } from "@/types/sounds";
import { HOME_SOUNDS_API, PickRes } from "@/api";

export async function GET(req: Request) {
  return NextResponse.json({
    scenes: scenesData as any as ScenesListItem[],
  } as PickRes<typeof HOME_SOUNDS_API, "get">);
}
