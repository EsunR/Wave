import { NextResponse } from "next/server";
import scenesData from "@/assets/data/scenes.json";
import { ScenesListItem } from "@/types/sounds";

export interface GetHomeSoundsResponse {
  scenes: ScenesListItem[];
}

export async function GET(req: Request) {
  return NextResponse.json({
    time: new Date().toISOString(),
    scenes: scenesData as any as ScenesListItem[],
  } as GetHomeSoundsResponse);
}
