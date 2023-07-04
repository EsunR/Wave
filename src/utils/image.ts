import { merge } from "lodash-es";

interface BosImageActions {
  resize?: {
    m?: "lfit" | "mfit" | "fill" | "pad" | "fixed";
    w?: number;
    h?: number;
    limit?: 0 | 1;
  };
  crop?: {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
  };
  quality?: {
    q?: number;
    Q?: number;
    c?: "le" | "ge" | "any";
  };
  format?: {
    f: "jpg" | "png" | "bmp" | "webp" | "heic" | "gif" | "auto";
  };
}

/**
 * 为 BOS 的图片添加图像处理参数
 */
export function bosImage(imgUrl: string, actions: BosImageActions = {}) {
  if (!imgUrl.includes("bcebos.com")) {
    return imgUrl;
  }
  const DEFAULT_ACTIONS: BosImageActions = {
    format: {
      f: "auto",
    },
    quality: {
      q: 80,
    },
    ...(actions.resize
      ? ({ resize: merge({ limit: 1 }, actions.resize) } as BosImageActions)
      : {}),
  };
  const actionStr = Object.entries(merge(DEFAULT_ACTIONS, actions))
    .map(([action, params]) => {
      const paramsStr = Object.entries(params)
        .map(([key, value]) => `${key}_${value}`)
        .join(",");
      return `${action},${paramsStr}`;
    })
    .join("/");
  return `${imgUrl}?x-bce-process=image/${actionStr}`;
}
