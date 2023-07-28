import { ScenesListItem } from "@/types/sounds";
import { HOME_SOUNDS_API } from ".";

export interface GetHomeSoundsResponse {
  scenes: ScenesListItem[];
}

export interface HomeApi {
  [HOME_SOUNDS_API]: {
    get: {
      req: {
        page?: number;
        page_size?: number;
      };
      res: {
        scenes: ScenesListItem[];
      };
    };
  };
}
