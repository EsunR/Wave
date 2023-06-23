"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import HomePlayer, { HomePlayerRef } from "./_components/HomePlayer";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import Greetings from "./_components/Greetings";
import clsx from "clsx";

const HOME_MOCK_DATA = [
  {
    name: {
      en: "Night Sea",
      "zh-Hans": "夜海",
      "zh-Hant": "夜海",
      ja: "夜の海",
      es: "Mar de noche",
      ko: "밤바다",
      ru: "Ночное Море",
    },
    sub_title: {
      en: "The sea under the moonlight",
      "zh-Hans": "月夜下的大海",
      "zh-Hant": "月夜下的大海",
      ja: "月夜の下の海",
      es: "El mar bajo la luz de la luna",
      ko: "달빛이 쏟아진 바다",
      ru: "Море под луной",
    },
    description: {
      en: "As I inhale the impalpable breezes that \nset in upon me.\nAs the ocean so mysterious rolls toward me closer and closer.",
      "zh-Hans": "当我呼吸着身上那微不足道的微风\n当如此神秘的海洋离我越来越近",
      "zh-Hant": "當我呼吸著身上那微不足道的微風\n當如此神祕的海洋離我越來越近",
      ja: "As I inhale the impalpable breezes that \nset in upon me.\nAs the ocean so mysterious rolls toward me closer and closer.",
      es: "As I inhale the impalpable breezes that \nset in upon me.\nAs the ocean so mysterious rolls toward me closer and closer.",
      ko: "As I inhale the impalpable breezes that \nset in upon me.\nAs the ocean so mysterious rolls toward me closer and closer.",
      ru: "As I inhale the impalpable breezes that \nset in upon me.\nAs the ocean so mysterious rolls toward me closer and closer.",
    },
    simple_tags: [
      {
        id: "5df9f013c9efb1000622555c",
        name: {
          en: "Nature",
          "zh-Hans": "自然",
          "zh-Hant": "自然",
          ja: "自然",
          es: "Naturaleza",
          ko: "자연",
          ru: "Природа",
        },
      },
      {
        id: "5fbf6790e67cf60006d3708d",
        name: {
          en: "Sleep",
          "zh-Hans": "助眠",
          "zh-Hant": "助眠",
          ja: "睡眠",
          es: "Dormir",
          ko: "수면",
          ru: "Сон",
        },
      },
    ],
    primary_color: "44,57,68,1",
    video_cover_url: "",
    video_cover_demo_url: "",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5a7702adfbcf3900067aabff/image.jpg",
    scene_id: "5a7702adfbcf3900067aabff",
    resource_hash: "lib25q7C2W6bfza44LqguI5EnELi",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5a7702adfbcf3900067aabff/sound.mp3",
    resource_audio_type: "stereo",
    video_cover_hash_key: "",
    video_cover_download_url: "",
  },
  {
    name: {
      en: "26.5℃",
      "zh-Hans": "26.5℃",
      "zh-Hant": "26.5℃",
      ja: "日の出",
      es: "26.5℃",
      ko: "26.5℃",
      ru: "26.5℃",
    },
    sub_title: {
      en: "A lazy afternoon",
      "zh-Hans": "慵懒的午后",
      "zh-Hant": "慵懶的午後",
      ja: "ゆったりとした午後",
      es: "A lazy afternoon",
      ko: "여유로운 오후",
      ru: "A lazy afternoon",
    },
    description: {
      en: "Once upon a time--imagine! \nMy heart \nfelt like a loaf of fresh-baked bread",
      "zh-Hans": "有时候觉得我的心\n像是刚烤好的\n面包一样",
      "zh-Hant": "有時候覺得我的心\n像是剛烤好的\n麵包一樣",
      ja: "Once upon a time--imagine! \nMy heart \nfelt like a loaf of fresh-baked bread",
      es: "Once upon a time--imagine! \nMy heart \nfelt like a loaf of fresh-baked bread",
      ko: "Once upon a time--imagine! \nMy heart \nfelt like a loaf of fresh-baked bread",
      ru: "Once upon a time--imagine! \nMy heart \nfelt like a loaf of fresh-baked bread",
    },
    simple_tags: [
      {
        id: "5df9efadc9efb1000622555a",
        name: {
          en: "Focus",
          "zh-Hans": "专注",
          "zh-Hant": "專注",
          ja: "集中",
          es: "Enfoque",
          ko: "집중 ",
          ru: "Фокус",
        },
      },
      {
        id: "5df9f15dc9efb1000622555e",
        name: {
          en: "Melody",
          "zh-Hans": "旋律",
          "zh-Hant": "旋律",
          ja: "メロディー",
          es: "Melodía",
          ko: "멜로디",
          ru: "Мелодия",
        },
      },
      {
        id: "6017a7773431240001da82c6",
        name: {
          en: "Lo-Fi",
          "zh-Hans": "Lo-Fi",
          "zh-Hant": "Lo-Fi",
          ja: "Lo-Fi",
          es: "Lo-Fi",
          ko: "Lo-Fi",
          ru: "Lo-Fi",
        },
      },
    ],
    primary_color: "240,159,154,1",
    video_cover_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5ea7ff080357020008374090/video_cover.jpg",
    video_cover_demo_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5ea7ff080357020008374090/video.mp4",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5ea7ff080357020008374090/image.jpg",
    scene_id: "5ea7ff080357020008374090",
    resource_hash: "lhzQXUEAeKtdFoWvo1GCzgM7sfdp",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5ea7ff080357020008374090/sound.mp3",
    resource_audio_type: "stereo",
    video_cover_hash_key: "sounds/lukX5pZj0S4rSaQeToCh4wI4s5jJ",
    video_cover_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5ea7ff080357020008374090/video.mp4",
  },
  {
    name: {
      en: "Umbrella",
      "zh-Hans": "伞下",
      "zh-Hant": "傘下",
      ja: "傘の下",
      es: "Paraguas",
      ko: "우산",
      ru: "Зонтик",
    },
    sub_title: {
      en: "Walk in the rain with an umbrella",
      "zh-Hans": "撑着伞在雨中漫游",
      "zh-Hant": "撐著傘在雨中漫遊",
      ja: "傘をさして雨の中で歩く",
      es: "Camine en las lluvias con un paraguas",
      ko: "우산을 가지고 빗속에서 걷고 있습니다",
      ru: "Прогулка под дождем с зонтиком",
    },
    description: {
      en: "With my blue umbrella,\ntake me away from the crowd if you want.",
      "zh-Hans": "带上那不可思议的蓝色雨伞\n如果你愿意，我们一起从人群中远走",
      "zh-Hant": "帶上那不可思議的藍色雨傘\n如果你願意，我們一起從人群中遠走",
      ja: "With my blue umbrella,\ntake me away from the crowd if you want.",
      es: "With my blue umbrella,\ntake me away from the crowd if you want.",
      ko: "With my blue umbrella,\ntake me away from the crowd if you want.",
      ru: "With my blue umbrella,\ntake me away from the crowd if you want.",
    },
    simple_tags: [
      {
        id: "5df9efadc9efb1000622555a",
        name: {
          en: "Focus",
          "zh-Hans": "专注",
          "zh-Hant": "專注",
          ja: "集中",
          es: "Enfoque",
          ko: "집중 ",
          ru: "Фокус",
        },
      },
      {
        id: "5fbf6790e67cf60006d3708d",
        name: {
          en: "Sleep",
          "zh-Hans": "助眠",
          "zh-Hant": "助眠",
          ja: "睡眠",
          es: "Dormir",
          ko: "수면",
          ru: "Сон",
        },
      },
    ],
    primary_color: "27,54,51,1",
    video_cover_url: "",
    video_cover_demo_url: "",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5bd97e218a65a50005062455/image.jpg",
    scene_id: "5bd97e218a65a50005062455",
    resource_hash: "lrm-2P7Jgu7imYP4qDXjqPruEKSA",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5bd97e218a65a50005062455/sound.mp3",
    resource_audio_type: "stereo",
    video_cover_hash_key: "",
    video_cover_download_url: "",
  },
  {
    name: {
      en: "Ocean",
      "zh-Hans": "海洋",
      "zh-Hant": "海洋",
      ja: "海",
      es: "Océano",
      ko: "바다",
      ru: "Океан",
    },
    sub_title: {
      en: "4 p.m. by ocean",
      "zh-Hans": "下午四点的海边",
      "zh-Hant": "下午四點的海邊",
      ja: "午後四時の海辺",
      es: "16:00 por el océano",
      ko: "오후 4시에 바닷가에서",
      ru: "16:00 на берегу",
    },
    description: {
      en: "The sea hath its pearls,\nthe heaven hath its stars.",
      "zh-Hans": "大海蕴藏着它的珍珠\n蓝天怀抱着它的星辰 ",
      "zh-Hant": "大海蘊藏著它的珍珠\n藍天懷抱著它的星辰 ",
      ja: "The sea hath its pearls,\nthe heaven hath its stars.",
      es: "The sea hath its pearls,\nthe heaven hath its stars.",
      ko: "The sea hath its pearls,\nthe heaven hath its stars.",
      ru: "The sea hath its pearls,\nthe heaven hath its stars.",
    },
    simple_tags: [
      {
        id: "5ee1ddcc62017d000ac76f18",
        name: {
          en: "Performance",
          "zh-Hans": "效率",
          "zh-Hant": "效率",
          ja: "効率",
          es: "Performance",
          ko: "효율",
          ru: "Performance",
        },
      },
      {
        id: "5df9efadc9efb1000622555a",
        name: {
          en: "Focus",
          "zh-Hans": "专注",
          "zh-Hant": "專注",
          ja: "集中",
          es: "Enfoque",
          ko: "집중 ",
          ru: "Фокус",
        },
      },
      {
        id: "6333c210c9253300010567b5",
        name: {
          en: "Tide × WILDAID",
          "zh-Hans": "潮汐 × WILDAID",
          "zh-Hant": "潮汐 × WILDAID",
          ja: "Tide × WILDAID",
          es: "Tide × WILDAID",
          ko: "Tide × WILDAID",
          ru: "Tide × WILDAID",
        },
      },
    ],
    primary_color: "93,160,174,1",
    video_cover_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5e54abfcc496e0000669d2c9/video_cover.jpg",
    video_cover_demo_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5e54abfcc496e0000669d2c9/video.mp4",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5e54abfcc496e0000669d2c9/image.jpg",
    scene_id: "5e54abfcc496e0000669d2c9",
    resource_hash: "lqVsojtUa0PGHanLKJwjWHMPyhP3",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5e54abfcc496e0000669d2c9/sound.mp3",
    resource_audio_type: "stereo",
    video_cover_hash_key: "sounds/lvDVU9NMXgW_nxE-dHVpyxgOr3_d",
    video_cover_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5e54abfcc496e0000669d2c9/video.mp4",
  },
  {
    name: {
      en: "Campfire",
      "zh-Hans": "篝火",
      "zh-Hant": "篝火",
      ja: "篝火",
      es: "Hoguera",
      ko: "불",
      ru: "Огонь",
    },
    sub_title: {
      en: "Warm and moderate flames",
      "zh-Hans": "温暖而热烈的火焰",
      "zh-Hant": "溫暖而熱烈的火焰",
      ja: "暖かくて熱烈な炎",
      es: "Llamas cálidos y animados",
      ko: "따뜻하고 적당한 불꽃",
      ru: "Теплый и умеренный огонь",
    },
    description: {
      en: "Time bursts into flame and disappears.",
      "zh-Hans": "时间迸出火焰\n又消失无踪",
      "zh-Hant": "時間迸出火焰\n又消失無蹤",
      ja: "Time bursts into flame and disappears.",
      es: "Time bursts into flame and disappears.",
      ko: "Time bursts into flame and disappears.",
      ru: "Time bursts into flame and disappears.",
    },
    simple_tags: [
      {
        id: "5fbf6790e67cf60006d3708d",
        name: {
          en: "Sleep",
          "zh-Hans": "助眠",
          "zh-Hant": "助眠",
          ja: "睡眠",
          es: "Dormir",
          ko: "수면",
          ru: "Сон",
        },
      },
    ],
    primary_color: "34,22,20,1",
    video_cover_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5a560d113ea0bf00086a36a8/video_cover.jpg",
    video_cover_demo_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5a560d113ea0bf00086a36a8/video.mp4",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5a560d113ea0bf00086a36a8/image.jpg",
    scene_id: "5a560d113ea0bf00086a36a8",
    resource_hash: "luadFKfSat4vp63vyZ_1zlC-8rnS",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5a560d113ea0bf00086a36a8/sound.mp3",
    resource_audio_type: "stereo",
    video_cover_hash_key: "sounds/loYXHbXsjvGw0lxZsZzz2S46IGjJ",
    video_cover_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/5a560d113ea0bf00086a36a8/video.mp4",
  },
  {
    name: {
      en: "Windmill",
      "zh-Hans": "老风车",
      "zh-Hant": "老風車",
      ja: "Windmill",
      es: "Windmill",
      ko: "Windmill",
      ru: "Windmill",
    },
    sub_title: {
      en: "Turning windmill by riverside field",
      "zh-Hans": "原野河畔旁，风车徐徐转动",
      "zh-Hant": "原野河畔旁，風車徐徐轉動",
      ja: "Turning windmill by riverside field",
      es: "Turning windmill by riverside field",
      ko: "Turning windmill by riverside field",
      ru: "Turning windmill by riverside field",
    },
    description: {
      en: "Wind blows. You can set a wall against it, you can build up a windmill. The choice is yours.",
      "zh-Hans": "起风了，有人筑起城墙抵御，有人选择建造风车。",
      "zh-Hant": "起風了，有人築起城牆抵禦，有人選擇建造風車。",
      ja: "Wind blows. You can set a wall against it, you can build up a windmill. The choice is yours.",
      es: "Wind blows. You can set a wall against it, you can build up a windmill. The choice is yours.",
      ko: "Wind blows. You can set a wall against it, you can build up a windmill. The choice is yours.",
      ru: "Wind blows. You can set a wall against it, you can build up a windmill. The choice is yours.",
    },
    simple_tags: [
      {
        id: "5df9efadc9efb1000622555a",
        name: {
          en: "Focus",
          "zh-Hans": "专注",
          "zh-Hant": "專注",
          ja: "集中",
          es: "Enfoque",
          ko: "집중 ",
          ru: "Фокус",
        },
      },
      {
        id: "5df9efdcc9efb1000622555b",
        name: {
          en: "Relax",
          "zh-Hans": "放松",
          "zh-Hant": "放鬆",
          ja: "リラックス",
          es: "Relajar",
          ko: "휴식",
          ru: "Досуг",
        },
      },
      {
        id: "5fbf6790e67cf60006d3708d",
        name: {
          en: "Sleep",
          "zh-Hans": "助眠",
          "zh-Hant": "助眠",
          ja: "睡眠",
          es: "Dormir",
          ko: "수면",
          ru: "Сон",
        },
      },
      {
        id: "5ee21bdd7391ea0007395baa",
        name: {
          en: "Stress",
          "zh-Hans": "减压",
          "zh-Hant": "減壓",
          ja: "ストレス",
          es: "Stress",
          ko: "스트레스",
          ru: "Stress",
        },
      },
    ],
    primary_color: "148,97,89,1",
    video_cover_url: "",
    video_cover_demo_url: "",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/636b2ef11ac8f7000192213a/image.jpg",
    scene_id: "636b2ef11ac8f7000192213a",
    resource_hash: "lnw8XdjqdQrkdeW2xKPr2Oq5l8jl",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/636b2ef11ac8f7000192213a/sound.mp3",
    resource_audio_type: "stereo",
    video_cover_hash_key: "",
    video_cover_download_url: "",
  },
  {
    name: {
      en: "Way of light",
      "zh-Hans": "光蕴",
      "zh-Hant": "光蘊",
      ja: "Way of light",
      es: "Way of light",
      ko: "Way of light",
      ru: "Way of light",
    },
    sub_title: {
      en: "A shed of joy, a shine of hope",
      "zh-Hans": "点点喜悦，束束希望",
      "zh-Hant": "點點喜悅，束束希望",
      ja: "A shed of joy, a shine of hope",
      es: "A shed of joy, a shine of hope",
      ko: "A shed of joy, a shine of hope",
      ru: "A shed of joy, a shine of hope",
    },
    description: {
      en: "There is a crack in everything, that's how the light gets in.",
      "zh-Hans": "万物皆有裂痕，那是光照进来的地方。",
      "zh-Hant": "万物皆有裂痕，那是光照进来的地方。",
      ja: "There is a crack in everything, that's how the light gets in.",
      es: "There is a crack in everything, that's how the light gets in.",
      ko: "There is a crack in everything, that's how the light gets in.",
      ru: "There is a crack in everything, that's how the light gets in.",
    },
    simple_tags: [
      {
        id: "5df9f15dc9efb1000622555e",
        name: {
          en: "Melody",
          "zh-Hans": "旋律",
          "zh-Hant": "旋律",
          ja: "メロディー",
          es: "Melodía",
          ko: "멜로디",
          ru: "Мелодия",
        },
      },
      {
        id: "6017a7773431240001da82c6",
        name: {
          en: "Lo-Fi",
          "zh-Hans": "Lo-Fi",
          "zh-Hant": "Lo-Fi",
          ja: "Lo-Fi",
          es: "Lo-Fi",
          ko: "Lo-Fi",
          ru: "Lo-Fi",
        },
      },
      {
        id: "5ee1deae62017d000ac76f1b",
        name: {
          en: "Emotions",
          "zh-Hans": "情绪",
          "zh-Hant": "情緒",
          ja: "情緒",
          es: "Emotions",
          ko: "기분",
          ru: "Emotions",
        },
      },
      {
        id: "5df9efdcc9efb1000622555b",
        name: {
          en: "Relax",
          "zh-Hans": "放松",
          "zh-Hant": "放鬆",
          ja: "リラックス",
          es: "Relajar",
          ko: "휴식",
          ru: "Досуг",
        },
      },
      {
        id: "5e2d7414c63421000630db65",
        name: {
          en: "Meditation",
          "zh-Hans": "冥想",
          "zh-Hant": "冥想",
          ja: "瞑想",
          es: "Meditación",
          ko: "명상",
          ru: "медитации",
        },
      },
    ],
    primary_color: "43,137,173,1",
    video_cover_url: "",
    video_cover_demo_url: "",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/63dccba61071d700010dcc30/image.jpg",
    scene_id: "63dccba61071d700010dcc30",
    resource_hash: "loSKbB9wGuWsYfKFK6cp2smp894B",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/63dccba61071d700010dcc30/sound.mp3",
    resource_audio_type: "stereo",
    video_cover_hash_key: "",
    video_cover_download_url: "",
  },
  {
    name: {
      en: "Signal",
      "zh-Hans": "信号",
      "zh-Hant": "訊號",
      ja: "Signal",
      es: "Signal",
      ko: "Signal",
      ru: "Signal",
    },
    sub_title: {
      en: "Radio waves in space",
      "zh-Hans": "太空中的电波",
      "zh-Hant": "太空中的電波",
      ja: "Radio waves in space",
      es: "Radio waves in space",
      ko: "Radio waves in space",
      ru: "Radio waves in space",
    },
    description: {
      en: "The signal is the truth. The noise is what distracts us from the truth.",
      "zh-Hans": "信号就是真相。 噪音才是让我们从真相中分心的原因。",
      "zh-Hant": "訊號就是真相。 噪音才是讓我們從真相中分心的原因。",
      ja: "The signal is the truth. The noise is what distracts us from the truth.",
      es: "The signal is the truth. The noise is what distracts us from the truth.",
      ko: "The signal is the truth. The noise is what distracts us from the truth.",
      ru: "The signal is the truth. The noise is what distracts us from the truth.",
    },
    simple_tags: [
      {
        id: "5df9efdcc9efb1000622555b",
        name: {
          en: "Relax",
          "zh-Hans": "放松",
          "zh-Hant": "放鬆",
          ja: "リラックス",
          es: "Relajar",
          ko: "휴식",
          ru: "Досуг",
        },
      },
      {
        id: "5df9efadc9efb1000622555a",
        name: {
          en: "Focus",
          "zh-Hans": "专注",
          "zh-Hant": "專注",
          ja: "集中",
          es: "Enfoque",
          ko: "집중 ",
          ru: "Фокус",
        },
      },
      {
        id: "5ee213857391ea0007395856",
        name: {
          en: "Sound",
          "zh-Hans": "声音",
          "zh-Hant": "声音",
        },
      },
      {
        id: "5ee21bdd7391ea0007395baa",
        name: {
          en: "Stress",
          "zh-Hans": "减压",
          "zh-Hant": "減壓",
          ja: "ストレス",
          es: "Stress",
          ko: "스트레스",
          ru: "Stress",
        },
      },
    ],
    primary_color: "56,47,49,1",
    video_cover_url: "",
    video_cover_demo_url: "",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/64073fcd8f67ef0001c6a8d9/image.jpg",
    scene_id: "64073fcd8f67ef0001c6a8d9",
    resource_hash: "lqJHZByJtvwlD2zrP47-hMCthGTI",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/64073fcd8f67ef0001c6a8d9/sound.mp3",
    resource_audio_type: "dolby",
    video_cover_hash_key: "",
    video_cover_download_url: "",
  },
  {
    name: {
      en: "Uranus",
      "zh-Hans": "天王星",
      "zh-Hant": "天王星",
      ja: "Uranus",
      es: "Uranus",
      ko: "Uranus",
      ru: "Uranus",
    },
    sub_title: {
      en: "Frosty romance",
      "zh-Hans": "冷浪漫",
      "zh-Hant": "冷浪漫",
      ja: "Frosty romance",
      es: "Frosty romance",
      ko: "Frosty romance",
      ru: "Frosty romance",
    },
    description: {
      en: "Thou who didst waken from his summer dreams\nThe blue Mediterranean, where he lay,\nLull'd by the coil of his crystalline streams.",
      "zh-Hans":
        "你将蓝色的地中海唤醒，\n而它曾昏睡了一整个夏天，\n被澄澈水流的回旋催眠入梦。",
      "zh-Hant":
        "你將藍色的地中海喚醒，\n而它曾昏睡了一整個夏天，\n被澄澈水流的迴旋催眠入夢。",
      ja: "Thou who didst waken from his summer dreams\nThe blue Mediterranean, where he lay,\nLull'd by the coil of his crystalline streams.",
      es: "Thou who didst waken from his summer dreams\nThe blue Mediterranean, where he lay,\nLull'd by the coil of his crystalline streams.",
      ko: "Thou who didst waken from his summer dreams\nThe blue Mediterranean, where he lay,\nLull'd by the coil of his crystalline streams.",
      ru: "Thou who didst waken from his summer dreams\nThe blue Mediterranean, where he lay,\nLull'd by the coil of his crystalline streams.",
    },
    simple_tags: [
      {
        id: "5df9efdcc9efb1000622555b",
        name: {
          en: "Relax",
          "zh-Hans": "放松",
          "zh-Hant": "放鬆",
          ja: "リラックス",
          es: "Relajar",
          ko: "휴식",
          ru: "Досуг",
        },
      },
      {
        id: "5df9f15dc9efb1000622555e",
        name: {
          en: "Melody",
          "zh-Hans": "旋律",
          "zh-Hant": "旋律",
          ja: "メロディー",
          es: "Melodía",
          ko: "멜로디",
          ru: "Мелодия",
        },
      },
      {
        id: "5ee21bdd7391ea0007395baa",
        name: {
          en: "Stress",
          "zh-Hans": "减压",
          "zh-Hant": "減壓",
          ja: "ストレス",
          es: "Stress",
          ko: "스트레스",
          ru: "Stress",
        },
      },
      {
        id: "6017a7773431240001da82c6",
        name: {
          en: "Lo-Fi",
          "zh-Hans": "Lo-Fi",
          "zh-Hant": "Lo-Fi",
          ja: "Lo-Fi",
          es: "Lo-Fi",
          ko: "Lo-Fi",
          ru: "Lo-Fi",
        },
      },
    ],
    primary_color: "41,78,83,1",
    video_cover_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/64102997fef71b00015b2590/video_cover.jpg",
    video_cover_demo_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/64102997fef71b00015b2590/video.mp4",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/64102997fef71b00015b2590/image.jpg",
    scene_id: "64102997fef71b00015b2590",
    resource_hash: "lu2d7m6fKV2qbrNsTiU7ca6cgVHR",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/64102997fef71b00015b2590/sound.mp3",
    resource_audio_type: "dolby",
    video_cover_hash_key: "scenes/loA21Ejmf_NP1q2DcPPj3DPM1dAY",
    video_cover_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/64102997fef71b00015b2590/video.mp4",
  },
  {
    name: {
      en: "Sagittarius A",
      "zh-Hans": "人马座A",
      "zh-Hant": "人馬座A",
      ja: "Sagittarius A",
      es: "Sagittarius A",
      ko: "Sagittarius A",
      ru: "Sagittarius A",
    },
    sub_title: {
      en: "The black hole at the galactic center",
      "zh-Hans": "银河系中心的黑洞",
      "zh-Hant": "銀河系中心的黑洞",
      ja: "The black hole at the galactic center",
      es: "The black hole at the galactic center",
      ko: "The black hole at the galactic center",
      ru: "The black hole at the galactic center",
    },
    description: {
      en: "Beneath the sound of shadows and bells,\nin the same grotto of human pleasure,\nI've tried to search for the eternal, unfathomable vein.",
      "zh-Hans":
        "在黑暗和钟声下，\n在人类欢乐的洞穴中，\n我曾触摸过永恒而深不可测的纹理。",
      "zh-Hant":
        "在黑暗和鐘聲下，\n在人類歡樂的洞穴中，\n我曾觸控過永恆而深不可測的紋理。",
      ja: "Beneath the sound of shadows and bells,\nin the same grotto of human pleasure,\nI've tried to search for the eternal, unfathomable vein.",
      es: "Beneath the sound of shadows and bells,\nin the same grotto of human pleasure,\nI've tried to search for the eternal, unfathomable vein.",
      ko: "Beneath the sound of shadows and bells,\nin the same grotto of human pleasure,\nI've tried to search for the eternal, unfathomable vein.",
      ru: "Beneath the sound of shadows and bells,\nin the same grotto of human pleasure,\nI've tried to search for the eternal, unfathomable vein.",
    },
    simple_tags: [
      {
        id: "5df9efdcc9efb1000622555b",
        name: {
          en: "Relax",
          "zh-Hans": "放松",
          "zh-Hant": "放鬆",
          ja: "リラックス",
          es: "Relajar",
          ko: "휴식",
          ru: "Досуг",
        },
      },
      {
        id: "5df9f15dc9efb1000622555e",
        name: {
          en: "Melody",
          "zh-Hans": "旋律",
          "zh-Hant": "旋律",
          ja: "メロディー",
          es: "Melodía",
          ko: "멜로디",
          ru: "Мелодия",
        },
      },
      {
        id: "5ee21bdd7391ea0007395baa",
        name: {
          en: "Stress",
          "zh-Hans": "减压",
          "zh-Hant": "減壓",
          ja: "ストレス",
          es: "Stress",
          ko: "스트레스",
          ru: "Stress",
        },
      },
      {
        id: "5df9efadc9efb1000622555a",
        name: {
          en: "Focus",
          "zh-Hans": "专注",
          "zh-Hant": "專注",
          ja: "集中",
          es: "Enfoque",
          ko: "집중 ",
          ru: "Фокус",
        },
      },
    ],
    primary_color: "15,35,46,1",
    video_cover_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/643671e5f46fd000016d47ee/video_cover.jpg",
    video_cover_demo_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/643671e5f46fd000016d47ee/video.mp4",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/643671e5f46fd000016d47ee/image.jpg",
    scene_id: "643671e5f46fd000016d47ee",
    resource_hash: "lhKivmqRh6i_27L_fabk6MoxoNcU",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/643671e5f46fd000016d47ee/sound.mp3",
    resource_audio_type: "dolby",
    video_cover_hash_key: "scenes/ljVA2kvmPny6xFuQ_g2zauBmlESw",
    video_cover_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/643671e5f46fd000016d47ee/video.mp4",
  },
  {
    name: {
      en: "Jupiter",
      "zh-Hans": "木星",
      "zh-Hant": "木星",
      ja: "Jupiter",
      es: "Jupiter",
      ko: "Jupiter",
      ru: "Jupiter",
    },
    sub_title: {
      en: "Dance with the Sun",
      "zh-Hans": "和太阳共舞",
      "zh-Hant": "和太陽共舞",
      ja: "Dance with the Sun",
      es: "Dance with the Sun",
      ko: "Dance with the sun",
      ru: "Dance with the Sun",
    },
    description: {
      en: "The moon begins first\nFourth, a faint slice west\nAt nightfall. Jupiter half-way\nHigh at the end of night-\nMeditation.",
      "zh-Hans": "月亮初露，西边的一线朦胧\n暮色中，木星高悬在夜间沉思。",
      "zh-Hant": "月亮初露，西邊的一線朦朧\n暮色中，木星高懸在夜間沉思。",
      ja: "The moon begins first\nFourth, a faint slice west\nAt nightfall. Jupiter half-way\nHigh at the end of night-\nMeditation.",
      es: "The moon begins first\nFourth, a faint slice west\nAt nightfall. Jupiter half-way\nHigh at the end of night-\nMeditation.",
      ko: "The moon begins first\nFourth, a faint slice west\nAt nightfall. Jupiter half-way\nHigh at the end of night-\nMeditation.",
      ru: "The moon begins first\nFourth, a faint slice west\nAt nightfall. Jupiter half-way\nHigh at the end of night-\nMeditation.",
    },
    simple_tags: [
      {
        id: "5df9efdcc9efb1000622555b",
        name: {
          en: "Relax",
          "zh-Hans": "放松",
          "zh-Hant": "放鬆",
          ja: "リラックス",
          es: "Relajar",
          ko: "휴식",
          ru: "Досуг",
        },
      },
      {
        id: "5df9f15dc9efb1000622555e",
        name: {
          en: "Melody",
          "zh-Hans": "旋律",
          "zh-Hant": "旋律",
          ja: "メロディー",
          es: "Melodía",
          ko: "멜로디",
          ru: "Мелодия",
        },
      },
      {
        id: "5ee21bdd7391ea0007395baa",
        name: {
          en: "Stress",
          "zh-Hans": "减压",
          "zh-Hant": "減壓",
          ja: "ストレス",
          es: "Stress",
          ko: "스트레스",
          ru: "Stress",
        },
      },
      {
        id: "5df9efadc9efb1000622555a",
        name: {
          en: "Focus",
          "zh-Hans": "专注",
          "zh-Hant": "專注",
          ja: "集中",
          es: "Enfoque",
          ko: "집중 ",
          ru: "Фокус",
        },
      },
    ],
    primary_color: "78,67,55,1",
    video_cover_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/6448e5cb3ee12200019ec838/video_cover.jpg",
    video_cover_demo_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/6448e5cb3ee12200019ec838/video.mp4",
    image:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/6448e5cb3ee12200019ec838/image.jpg",
    scene_id: "6448e5cb3ee12200019ec838",
    resource_hash: "lj_6ZsKR4VcUdus921p4I66AGhdo",
    resource_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/6448e5cb3ee12200019ec838/sound.mp3",
    resource_audio_type: "dolby",
    video_cover_hash_key: "scenes/ljUiPd6vKL_EV6aETLeDbJZWvNmw",
    video_cover_download_url:
      "https://webapp-wave.s3.ap-east-1.amazonaws.com/scenes/6448e5cb3ee12200019ec838/video.mp4",
  },
];

export default function HomePage() {
  const [homeSounds, setHomeSounds] = useState<any[]>([]);
  const homePlayerRefs = useRef<HomePlayerRef[]>([]);
  const [touchMoveDiffX, setTouchMoveDiffX] = useState(0);

  useEffect(() => {
    setHomeSounds(HOME_MOCK_DATA);
  }, []);

  const onSlideChange: SwiperProps["onSlideChange"] = (swiper) => {
    homePlayerRefs.current.forEach((player) => {
      player.reset();
    });
    // homePlayerRefs.current[swiper.activeIndex].play();
  };

  const onSlideMove: SwiperProps["onSliderMove"] = (swiper, event) => {
    // 获取滑动距离
    const currentX = swiper.touches.currentX;
    const startX = swiper.touches.startX;
    const diffX = Math.round(Math.abs(currentX - startX));
    setTouchMoveDiffX(diffX);
  };

  const slideScale = useMemo(() => {
    if (touchMoveDiffX > 0) {
      return Math.max(1 - touchMoveDiffX / 500, 0.9);
    }
    return 1;
  }, [touchMoveDiffX]);

  return (
    <div className="h-full">
      {/* content */}
      <div className="h-full relative">
        {/* welcome text */}
        <Greetings />

        {/* play area */}
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          className="h-full"
          onSlideChange={onSlideChange}
          onSliderMove={onSlideMove}
          onSlideChangeTransitionEnd={() => setTouchMoveDiffX(0)}
          onSlideResetTransitionEnd={() => setTouchMoveDiffX(0)}
        >
          {homeSounds.map((sound, index) => (
            <SwiperSlide key={sound.scene_id}>
              <HomePlayer
                className={clsx(
                  "transition-all duration-200 ease-in-out",
                  touchMoveDiffX === 0 ? "" : null
                )}
                style={{
                  scale: slideScale,
                  borderRadius: touchMoveDiffX > 0 ? "2rem" : "initial",
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
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* button area */}
        <div></div>
      </div>
    </div>
  );
}
