import { request } from "@/utils/request";
import { HOME_SOUNDS_API } from ".";

export function getHomeSounds() {
  return request(HOME_SOUNDS_API, {
    method: "get",
  });
}
