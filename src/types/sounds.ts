import { I18nValue } from "./common";

export interface SampleTag {
  id: string;
  name: I18nValue;
}

export interface ScenesListItem {
  name: I18nValue;
  sub_title: I18nValue;
  description: I18nValue;
  simpleTags: SampleTag[];
  primary_color: string;
  secondary_color: string;
  is_dolby: boolean;
  video_cover_url: string;
  video_cover_demo_url: string;
  image: string;
  scene_id: string;
  resource_hash: string;
  resource_download_url: string;
  resource_audio_type: string;
  video_cover_hash_key: string;
  video_cover_download_url: string;
}
