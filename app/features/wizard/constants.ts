import type { ComponentOption, FontConfig } from "./types";

// ── 폰트 프리셋 (언어별 그룹) ──

export interface FontPresetInfo {
  fontFamily: string;
  fontCdnUrl: string;
  weights: number[];
  variable: boolean;
  specimen: string;
}

export interface FontLanguageGroup {
  id: string;
  label: string;
  flag: string;
  fonts: FontPresetInfo[];
}

export const FONT_GROUPS: FontLanguageGroup[] = [
  {
    id: "korean",
    label: "한국어 Korean",
    flag: "🇰🇷",
    fonts: [
      {
        fontFamily: "Pretendard",
        fontCdnUrl: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "가나다라마바사 The quick brown fox",
      },
      {
        fontFamily: "Noto Sans KR",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "가나다라마바사 The quick brown fox",
      },
      {
        fontFamily: "SUIT",
        fontCdnUrl: "https://cdn.jsdelivr.net/gh/sun-typeface/SUIT/fonts/variable/woff2/SUIT-Variable.css",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "가나다라마바사 The quick brown fox",
      },
      {
        fontFamily: "Spoqa Han Sans Neo",
        fontCdnUrl: "https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css",
        weights: [100, 300, 400, 500, 700],
        variable: false,
        specimen: "가나다라마바사 The quick brown fox",
      },
      {
        fontFamily: "Nanum Gothic",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap",
        weights: [400, 700, 800],
        variable: false,
        specimen: "가나다라마바사 The quick brown fox",
      },
      {
        fontFamily: "Noto Serif KR",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap",
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "가나다라마바사 The quick brown fox",
      },
      {
        fontFamily: "IBM Plex Sans KR",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700],
        variable: false,
        specimen: "가나다라마바사 The quick brown fox",
      },
      {
        fontFamily: "Gowun Dodum",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap",
        weights: [400],
        variable: false,
        specimen: "가나다라마바사 The quick brown fox",
      },
      {
        fontFamily: "Black Han Sans",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap",
        weights: [400],
        variable: false,
        specimen: "가나다라마바사 The quick brown fox",
      },
      {
        fontFamily: "Jua",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Jua&display=swap",
        weights: [400],
        variable: false,
        specimen: "가나다라마바사 The quick brown fox",
      },
    ],
  },
  {
    id: "english",
    label: "English",
    flag: "🇺🇸",
    fonts: [
      {
        fontFamily: "Inter",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
      {
        fontFamily: "Geist",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
      {
        fontFamily: "Plus Jakarta Sans",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap",
        weights: [200, 300, 400, 500, 600, 700, 800],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
      {
        fontFamily: "DM Sans",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..1000&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
      {
        fontFamily: "Manrope",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
        weights: [200, 300, 400, 500, 600, 700, 800],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
      {
        fontFamily: "Space Grotesk",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap",
        weights: [300, 400, 500, 600, 700],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
      {
        fontFamily: "Outfit",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
      {
        fontFamily: "Sora",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
      {
        fontFamily: "Archivo",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
      {
        fontFamily: "Work Sans",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "The quick brown fox jumps over the lazy dog",
      },
    ],
  },
  {
    id: "japanese",
    label: "\u65E5\u672C\u8A9E Japanese",
    flag: "🇯🇵",
    fonts: [
      {
        fontFamily: "Noto Sans JP",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
      {
        fontFamily: "M PLUS 1p",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700;800;900&display=swap",
        weights: [100, 300, 400, 500, 700, 800, 900],
        variable: false,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
      {
        fontFamily: "Zen Kaku Gothic New",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap",
        weights: [300, 400, 500, 700, 900],
        variable: false,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
      {
        fontFamily: "Zen Maru Gothic",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&display=swap",
        weights: [300, 400, 500, 700, 900],
        variable: false,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
      {
        fontFamily: "Noto Serif JP",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&display=swap",
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
      {
        fontFamily: "M PLUS Rounded 1c",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap",
        weights: [100, 300, 400, 500, 700, 800, 900],
        variable: false,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
      {
        fontFamily: "Shippori Mincho",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&display=swap",
        weights: [400, 500, 600, 700, 800],
        variable: false,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
      {
        fontFamily: "Kosugi Maru",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap",
        weights: [400],
        variable: false,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
      {
        fontFamily: "Sawarabi Gothic",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Sawarabi+Gothic&display=swap",
        weights: [400],
        variable: false,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
      {
        fontFamily: "Yusei Magic",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap",
        weights: [400],
        variable: false,
        specimen: "\u3042\u3044\u3046\u3048\u304A \u6F22\u5B57 The quick brown fox",
      },
    ],
  },
  {
    id: "chinese",
    label: "\u4E2D\u6587 Chinese",
    flag: "🇨🇳",
    fonts: [
      {
        fontFamily: "Noto Sans SC",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "\u4F60\u597D\u4E16\u754C \u8BBE\u8BA1\u7CFB\u7EDF The quick brown fox",
      },
      {
        fontFamily: "Noto Sans TC",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "\u4F60\u597D\u4E16\u754C \u8A2D\u8A08\u7CFB\u7D71 The quick brown fox",
      },
      {
        fontFamily: "Noto Serif SC",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&display=swap",
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "\u4F60\u597D\u4E16\u754C \u8BBE\u8BA1\u7CFB\u7EDF The quick brown fox",
      },
      {
        fontFamily: "Noto Serif TC",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200..900&display=swap",
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "\u4F60\u597D\u4E16\u754C \u8A2D\u8A08\u7CFB\u7D71 The quick brown fox",
      },
      {
        fontFamily: "ZCOOL XiaoWei",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap",
        weights: [400],
        variable: false,
        specimen: "\u4F60\u597D\u4E16\u754C \u8BBE\u8BA1\u7CFB\u7EDF The quick brown fox",
      },
      {
        fontFamily: "Long Cang",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Long+Cang&display=swap",
        weights: [400],
        variable: false,
        specimen: "\u4F60\u597D\u4E16\u754C \u8BBE\u8BA1\u7CFB\u7EDF The quick brown fox",
      },
      {
        fontFamily: "Ma Shan Zheng",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap",
        weights: [400],
        variable: false,
        specimen: "\u4F60\u597D\u4E16\u754C \u8BBE\u8BA1\u7CFB\u7EDF The quick brown fox",
      },
      {
        fontFamily: "ZCOOL QingKe HuangYou",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap",
        weights: [400],
        variable: false,
        specimen: "\u4F60\u597D\u4E16\u754C \u8BBE\u8BA1\u7CFB\u7EDF The quick brown fox",
      },
      {
        fontFamily: "Liu Jian Mao Cao",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&display=swap",
        weights: [400],
        variable: false,
        specimen: "\u4F60\u597D\u4E16\u754C \u8BBE\u8BA1\u7CFB\u7EDF The quick brown fox",
      },
      {
        fontFamily: "Zhi Mang Xing",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap",
        weights: [400],
        variable: false,
        specimen: "\u4F60\u597D\u4E16\u754C \u8BBE\u8BA1\u7CFB\u7EDF The quick brown fox",
      },
    ],
  },
  {
    id: "thai",
    label: "\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 Thai",
    flag: "🇹🇭",
    fonts: [
      {
        fontFamily: "Noto Sans Thai",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
      {
        fontFamily: "Noto Serif Thai",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
      {
        fontFamily: "Prompt",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600;700;800;900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: false,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
      {
        fontFamily: "Sarabun",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Sarabun:wght@100;200;300;400;500;600;700;800&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800],
        variable: false,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
      {
        fontFamily: "Kanit",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: false,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
      {
        fontFamily: "Bai Jamjuree",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@200;300;400;500;600;700&display=swap",
        weights: [200, 300, 400, 500, 600, 700],
        variable: false,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
      {
        fontFamily: "Krub",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Krub:wght@200;300;400;500;600;700&display=swap",
        weights: [200, 300, 400, 500, 600, 700],
        variable: false,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
      {
        fontFamily: "Mitr",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap",
        weights: [200, 300, 400, 500, 600, 700],
        variable: false,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
      {
        fontFamily: "Taviraj",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Taviraj:wght@100;200;300;400;500;600;700;800;900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: false,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
      {
        fontFamily: "Charm",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Charm:wght@400;700&display=swap",
        weights: [400, 700],
        variable: false,
        specimen: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 The quick brown fox",
      },
    ],
  },
  {
    id: "vietnamese",
    label: "Ti\u1EBFng Vi\u1EC7t Vietnamese",
    flag: "🇻🇳",
    fonts: [
      {
        fontFamily: "Be Vietnam Pro",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
      {
        fontFamily: "Nunito Sans",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..900&display=swap",
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
      {
        fontFamily: "Quicksand",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap",
        weights: [300, 400, 500, 600, 700],
        variable: true,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
      {
        fontFamily: "Lexend",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
      {
        fontFamily: "Mulish",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Mulish:wght@200..900&display=swap",
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
      {
        fontFamily: "Barlow",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600;700;800;900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: false,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
      {
        fontFamily: "Comfortaa",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap",
        weights: [300, 400, 500, 600, 700],
        variable: true,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
      {
        fontFamily: "Exo 2",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Exo+2:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
      {
        fontFamily: "Signika",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap",
        weights: [300, 400, 500, 600, 700],
        variable: true,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
      {
        fontFamily: "Red Hat Display",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300..900&display=swap",
        weights: [300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "Xin ch\u00E0o th\u1EBF gi\u1EDBi The quick brown fox",
      },
    ],
  },
];

// 하위 호환용 flat 배열
export const FONT_PRESETS: FontConfig[] = FONT_GROUPS.flatMap((g) =>
  g.fonts.map(({ fontFamily, fontCdnUrl }) => ({ fontFamily, fontCdnUrl })),
);

// ── 언어별 미리보기 텍스트 (REQ 4) ──

export interface PreviewTexts {
  dashboard: string;
  projectSettings: string;
  projectName: string;
  save: string;
  cancel: string;
  reset: string;
  delete: string;
  search: string;
  home: string;
  inbox: string;
  users: string;
  settings: string;
  category: string;
  categoryValue: string;
  emailNotify: string;
  public: string;
  progress: string;
  projectOverview: string;
  projectOverviewDesc: string;
  overview: string;
  members: string;
  newProject: string;
  totalUsers: string;
  activeProjects: string;
  scheduledEvents: string;
  thisWeek: string;
  designSystem: string;
  designSystemDesc: string;
  apiRefactoring: string;
  apiRefactoringDesc: string;
  mobileAppV2: string;
  mobileAppV2Desc: string;
  inProgress: string;
  reviewing: string;
  waiting: string;
  teamMembers: string;
  teamMembersDesc: string;
  name: string;
  email: string;
  role: string;
  admin: string;
  editor: string;
  viewer: string;
  generalSettings: string;
  generalSettingsDesc: string;
  general: string;
  profile: string;
  notifications: string;
  security: string;
  billing: string;
  fastBuild: string;
  fastBuildDesc: string;
  perfectCustom: string;
  perfectCustomDesc: string;
  codeGeneration: string;
  codeGenerationDesc: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  startFree: string;
  learnMore: string;
  getStarted: string;
}

export const PREVIEW_TEXTS: Record<string, PreviewTexts> = {
  korean: {
    dashboard: "\uB300\uC2DC\uBCF4\uB4DC",
    projectSettings: "\uD504\uB85C\uC81D\uD2B8 \uC124\uC815",
    projectName: "\uD504\uB85C\uC81D\uD2B8 \uC774\uB984",
    save: "\uC800\uC7A5",
    cancel: "\uCDE8\uC18C",
    reset: "\uCD08\uAE30\uD654",
    delete: "\uC0AD\uC81C",
    search: "\uAC80\uC0C9...",
    home: "\uD648",
    inbox: "\uBC1B\uC740\uD3B8\uC9C0\uD568",
    users: "\uC0AC\uC6A9\uC790",
    settings: "\uC124\uC815",
    category: "\uCE74\uD14C\uACE0\uB9AC",
    categoryValue: "\uB514\uC790\uC778",
    emailNotify: "\uC774\uBA54\uC77C \uC54C\uB9BC \uBC1B\uAE30",
    public: "\uACF5\uAC1C",
    progress: "\uC9C4\uD589\uB960",
    projectOverview: "\uD504\uB85C\uC81D\uD2B8 \uD604\uD669\uC744 \uD655\uC778\uD558\uC138\uC694",
    projectOverviewDesc: "\uD504\uB85C\uC81D\uD2B8 \uD604\uD669\uC744 \uD55C\uB208\uC5D0 \uD655\uC778\uD558\uC138\uC694",
    overview: "\uAC1C\uC694",
    members: "\uBA64\uBC84",
    newProject: "\uC0C8 \uD504\uB85C\uC81D\uD2B8",
    totalUsers: "\uCD1D \uC0AC\uC6A9\uC790",
    activeProjects: "\uD65C\uC131 \uD504\uB85C\uC81D\uD2B8",
    scheduledEvents: "\uC608\uC815 \uC77C\uC815",
    thisWeek: "\uC774\uBC88 \uC8FC",
    designSystem: "\uB514\uC790\uC778 \uC2DC\uC2A4\uD15C",
    designSystemDesc: "\uCEF4\uD3EC\uB10C\uD2B8 \uB77C\uC774\uBE0C\uB7EC\uB9AC \uBC0F \uB514\uC790\uC778 \uD1A0\uD070 \uC815\uC758",
    apiRefactoring: "API \uB9AC\uD329\uD1A0\uB9C1",
    apiRefactoringDesc: "REST \u2192 GraphQL \uB9C8\uC774\uADF8\uB808\uC774\uC158",
    mobileAppV2: "\uBAA8\uBC14\uC77C \uC571 v2",
    mobileAppV2Desc: "React Native \uAE30\uBC18 \uC2E0\uADDC \uC571",
    inProgress: "\uC9C4\uD589\uC911",
    reviewing: "\uAC80\uD1A0\uC911",
    waiting: "\uB300\uAE30",
    teamMembers: "\uD300 \uBA64\uBC84",
    teamMembersDesc: "\uD504\uB85C\uC81D\uD2B8\uC5D0 \uCC38\uC5EC \uC911\uC778 \uBA64\uBC84 \uBAA9\uB85D",
    name: "\uC774\uB984",
    email: "\uC774\uBA54\uC77C",
    role: "\uC5ED\uD560",
    admin: "\uAD00\uB9AC\uC790",
    editor: "\uD3B8\uC9D1\uC790",
    viewer: "\uBDF0\uC5B4",
    generalSettings: "\uC77C\uBC18 \uC124\uC815",
    generalSettingsDesc: "\uD504\uB85C\uC81D\uD2B8 \uAE30\uBCF8 \uC124\uC815\uC744 \uAD00\uB9AC\uD569\uB2C8\uB2E4",
    general: "\uC77C\uBC18",
    profile: "\uD504\uB85C\uD544",
    notifications: "\uC54C\uB9BC",
    security: "\uBCF4\uC548",
    billing: "\uACB0\uC81C",
    fastBuild: "\uBE60\uB978 \uAD6C\uCD95",
    fastBuildDesc: "5\uBD84 \uC548\uC5D0 \uB514\uC790\uC778 \uC2DC\uC2A4\uD15C \uC644\uC131",
    perfectCustom: "\uC644\uBCBD\uD55C \uCEE4\uC2A4\uD140",
    perfectCustomDesc: "\uBE0C\uB79C\uB4DC\uC5D0 \uB9DE\uB294 \uC138\uBC00\uD55C \uC870\uC815",
    codeGeneration: "\uCF54\uB4DC \uC0DD\uC131",
    codeGenerationDesc: "\uD504\uB85C\uB355\uC158 \uB808\uB514 \uCF54\uB4DC \uC790\uB3D9 \uCD9C\uB825",
    heroTitle1: "\uB354 \uBE60\uB974\uAC8C, ",
    heroTitle2: "\uB354 \uC544\uB984\uB2F5\uAC8C",
    heroDesc: "\uB514\uC790\uC778 \uC2DC\uC2A4\uD15C\uC744 \uBA87 \uBD84 \uB9CC\uC5D0 \uAD6C\uCD95\uD558\uC138\uC694. \uCEF4\uD3EC\uB10C\uD2B8\uBD80\uD130 \uD1A0\uD070\uAE4C\uC9C0 \uC790\uB3D9\uC73C\uB85C \uC0DD\uC131\uD569\uB2C8\uB2E4.",
    startFree: "\uBB34\uB8CC\uB85C \uC2DC\uC791",
    learnMore: "\uB354 \uC54C\uC544\uBCF4\uAE30",
    getStarted: "\uC2DC\uC791\uD558\uAE30",
  },
  english: {
    dashboard: "Dashboard",
    projectSettings: "Project Settings",
    projectName: "Project Name",
    save: "Save",
    cancel: "Cancel",
    reset: "Reset",
    delete: "Delete",
    search: "Search...",
    home: "Home",
    inbox: "Inbox",
    users: "Users",
    settings: "Settings",
    category: "Category",
    categoryValue: "Design",
    emailNotify: "Receive email notifications",
    public: "Public",
    progress: "Progress",
    projectOverview: "Check project status",
    projectOverviewDesc: "View project status at a glance",
    overview: "Overview",
    members: "Members",
    newProject: "New Project",
    totalUsers: "Total Users",
    activeProjects: "Active Projects",
    scheduledEvents: "Scheduled",
    thisWeek: "This week",
    designSystem: "Design System",
    designSystemDesc: "Component library and design tokens",
    apiRefactoring: "API Refactoring",
    apiRefactoringDesc: "REST to GraphQL migration",
    mobileAppV2: "Mobile App v2",
    mobileAppV2Desc: "React Native based new app",
    inProgress: "In Progress",
    reviewing: "Reviewing",
    waiting: "Waiting",
    teamMembers: "Team Members",
    teamMembersDesc: "Members participating in the project",
    name: "Name",
    email: "Email",
    role: "Role",
    admin: "Admin",
    editor: "Editor",
    viewer: "Viewer",
    generalSettings: "General Settings",
    generalSettingsDesc: "Manage project basic settings",
    general: "General",
    profile: "Profile",
    notifications: "Notifications",
    security: "Security",
    billing: "Billing",
    fastBuild: "Fast Build",
    fastBuildDesc: "Complete design system in 5 minutes",
    perfectCustom: "Perfect Custom",
    perfectCustomDesc: "Fine-tuned adjustments for your brand",
    codeGeneration: "Code Generation",
    codeGenerationDesc: "Auto-generate production-ready code",
    heroTitle1: "Faster, ",
    heroTitle2: "More Beautiful",
    heroDesc: "Build your design system in minutes. Components to tokens, auto-generated.",
    startFree: "Start Free",
    learnMore: "Learn More",
    getStarted: "Get Started",
  },
  japanese: {
    dashboard: "\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9",
    projectSettings: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u8A2D\u5B9A",
    projectName: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u540D",
    save: "\u4FDD\u5B58",
    cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB",
    reset: "\u30EA\u30BB\u30C3\u30C8",
    delete: "\u524A\u9664",
    search: "\u691C\u7D22...",
    home: "\u30DB\u30FC\u30E0",
    inbox: "\u53D7\u4FE1\u30C8\u30EC\u30A4",
    users: "\u30E6\u30FC\u30B6\u30FC",
    settings: "\u8A2D\u5B9A",
    category: "\u30AB\u30C6\u30B4\u30EA\u30FC",
    categoryValue: "\u30C7\u30B6\u30A4\u30F3",
    emailNotify: "\u30E1\u30FC\u30EB\u901A\u77E5\u3092\u53D7\u3051\u53D6\u308B",
    public: "\u516C\u958B",
    progress: "\u9032\u6357",
    projectOverview: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u72B6\u6CC1\u3092\u78BA\u8A8D",
    projectOverviewDesc: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u72B6\u6CC1\u3092\u4E00\u76EE\u3067\u78BA\u8A8D",
    overview: "\u6982\u8981",
    members: "\u30E1\u30F3\u30D0\u30FC",
    newProject: "\u65B0\u898F\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8",
    totalUsers: "\u7DCF\u30E6\u30FC\u30B6\u30FC\u6570",
    activeProjects: "\u30A2\u30AF\u30C6\u30A3\u30D6\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8",
    scheduledEvents: "\u4E88\u5B9A\u30A4\u30D9\u30F3\u30C8",
    thisWeek: "\u4ECA\u9031",
    designSystem: "\u30C7\u30B6\u30A4\u30F3\u30B7\u30B9\u30C6\u30E0",
    designSystemDesc: "\u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u30E9\u30A4\u30D6\u30E9\u30EA\u3068\u30C7\u30B6\u30A4\u30F3\u30C8\u30FC\u30AF\u30F3",
    apiRefactoring: "API\u30EA\u30D5\u30A1\u30AF\u30BF\u30EA\u30F3\u30B0",
    apiRefactoringDesc: "REST\u304B\u3089GraphQL\u3078\u306E\u79FB\u884C",
    mobileAppV2: "\u30E2\u30D0\u30A4\u30EB\u30A2\u30D7\u30EA v2",
    mobileAppV2Desc: "React Native\u30D9\u30FC\u30B9\u306E\u65B0\u30A2\u30D7\u30EA",
    inProgress: "\u9032\u884C\u4E2D",
    reviewing: "\u30EC\u30D3\u30E5\u30FC\u4E2D",
    waiting: "\u5F85\u6A5F",
    teamMembers: "\u30C1\u30FC\u30E0\u30E1\u30F3\u30D0\u30FC",
    teamMembersDesc: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u53C2\u52A0\u30E1\u30F3\u30D0\u30FC\u4E00\u89A7",
    name: "\u540D\u524D",
    email: "\u30E1\u30FC\u30EB",
    role: "\u5F79\u5272",
    admin: "\u7BA1\u7406\u8005",
    editor: "\u7DE8\u96C6\u8005",
    viewer: "\u95B2\u89A7\u8005",
    generalSettings: "\u4E00\u822C\u8A2D\u5B9A",
    generalSettingsDesc: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306E\u57FA\u672C\u8A2D\u5B9A\u3092\u7BA1\u7406",
    general: "\u4E00\u822C",
    profile: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB",
    notifications: "\u901A\u77E5",
    security: "\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3",
    billing: "\u8ACB\u6C42",
    fastBuild: "\u9AD8\u901F\u69CB\u7BC9",
    fastBuildDesc: "5\u5206\u3067\u30C7\u30B6\u30A4\u30F3\u30B7\u30B9\u30C6\u30E0\u5B8C\u6210",
    perfectCustom: "\u5B8C\u74A7\u306A\u30AB\u30B9\u30BF\u30E0",
    perfectCustomDesc: "\u30D6\u30E9\u30F3\u30C9\u306B\u5408\u308F\u305B\u305F\u7D30\u304B\u306A\u8ABF\u6574",
    codeGeneration: "\u30B3\u30FC\u30C9\u751F\u6210",
    codeGenerationDesc: "\u30D7\u30ED\u30C0\u30AF\u30B7\u30E7\u30F3\u30EC\u30C7\u30A3\u306A\u30B3\u30FC\u30C9\u3092\u81EA\u52D5\u51FA\u529B",
    heroTitle1: "\u3082\u3063\u3068\u901F\u304F\u3001",
    heroTitle2: "\u3082\u3063\u3068\u7F8E\u3057\u304F",
    heroDesc: "\u6570\u5206\u3067\u30C7\u30B6\u30A4\u30F3\u30B7\u30B9\u30C6\u30E0\u3092\u69CB\u7BC9\u3002\u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u304B\u3089\u30C8\u30FC\u30AF\u30F3\u307E\u3067\u81EA\u52D5\u751F\u6210\u3002",
    startFree: "\u7121\u6599\u3067\u59CB\u3081\u308B",
    learnMore: "\u8A73\u3057\u304F\u898B\u308B",
    getStarted: "\u59CB\u3081\u308B",
  },
  chinese: {
    dashboard: "\u4EEA\u8868\u677F",
    projectSettings: "\u9879\u76EE\u8BBE\u7F6E",
    projectName: "\u9879\u76EE\u540D\u79F0",
    save: "\u4FDD\u5B58",
    cancel: "\u53D6\u6D88",
    reset: "\u91CD\u7F6E",
    delete: "\u5220\u9664",
    search: "\u641C\u7D22...",
    home: "\u9996\u9875",
    inbox: "\u6536\u4EF6\u7BB1",
    users: "\u7528\u6237",
    settings: "\u8BBE\u7F6E",
    category: "\u5206\u7C7B",
    categoryValue: "\u8BBE\u8BA1",
    emailNotify: "\u63A5\u6536\u90AE\u4EF6\u901A\u77E5",
    public: "\u516C\u5F00",
    progress: "\u8FDB\u5EA6",
    projectOverview: "\u67E5\u770B\u9879\u76EE\u72B6\u6001",
    projectOverviewDesc: "\u4E00\u89C8\u9879\u76EE\u72B6\u6001",
    overview: "\u6982\u89C8",
    members: "\u6210\u5458",
    newProject: "\u65B0\u9879\u76EE",
    totalUsers: "\u603B\u7528\u6237\u6570",
    activeProjects: "\u6D3B\u8DC3\u9879\u76EE",
    scheduledEvents: "\u8BA1\u5212\u4E8B\u4EF6",
    thisWeek: "\u672C\u5468",
    designSystem: "\u8BBE\u8BA1\u7CFB\u7EDF",
    designSystemDesc: "\u7EC4\u4EF6\u5E93\u548C\u8BBE\u8BA1\u4EE4\u724C",
    apiRefactoring: "API\u91CD\u6784",
    apiRefactoringDesc: "REST\u5230GraphQL\u8FC1\u79FB",
    mobileAppV2: "\u79FB\u52A8\u5E94\u7528 v2",
    mobileAppV2Desc: "\u57FA\u4E8EReact Native\u7684\u65B0\u5E94\u7528",
    inProgress: "\u8FDB\u884C\u4E2D",
    reviewing: "\u5BA1\u6838\u4E2D",
    waiting: "\u7B49\u5F85",
    teamMembers: "\u56E2\u961F\u6210\u5458",
    teamMembersDesc: "\u53C2\u4E0E\u9879\u76EE\u7684\u6210\u5458\u5217\u8868",
    name: "\u59D3\u540D",
    email: "\u90AE\u7BB1",
    role: "\u89D2\u8272",
    admin: "\u7BA1\u7406\u5458",
    editor: "\u7F16\u8F91\u8005",
    viewer: "\u67E5\u770B\u8005",
    generalSettings: "\u5E38\u89C4\u8BBE\u7F6E",
    generalSettingsDesc: "\u7BA1\u7406\u9879\u76EE\u57FA\u672C\u8BBE\u7F6E",
    general: "\u5E38\u89C4",
    profile: "\u4E2A\u4EBA\u8D44\u6599",
    notifications: "\u901A\u77E5",
    security: "\u5B89\u5168",
    billing: "\u8BA1\u8D39",
    fastBuild: "\u5FEB\u901F\u6784\u5EFA",
    fastBuildDesc: "5\u5206\u949F\u5B8C\u6210\u8BBE\u8BA1\u7CFB\u7EDF",
    perfectCustom: "\u5B8C\u7F8E\u5B9A\u5236",
    perfectCustomDesc: "\u4E3A\u54C1\u724C\u7CBE\u7EC6\u8C03\u6574",
    codeGeneration: "\u4EE3\u7801\u751F\u6210",
    codeGenerationDesc: "\u81EA\u52A8\u8F93\u51FA\u751F\u4EA7\u5C31\u7EEA\u4EE3\u7801",
    heroTitle1: "\u66F4\u5FEB\uFF0C",
    heroTitle2: "\u66F4\u7F8E",
    heroDesc: "\u51E0\u5206\u949F\u5185\u6784\u5EFA\u8BBE\u8BA1\u7CFB\u7EDF\u3002\u4ECE\u7EC4\u4EF6\u5230\u4EE4\u724C\uFF0C\u81EA\u52A8\u751F\u6210\u3002",
    startFree: "\u514D\u8D39\u5F00\u59CB",
    learnMore: "\u4E86\u89E3\u66F4\u591A",
    getStarted: "\u5F00\u59CB",
  },
  thai: {
    dashboard: "\u0E41\u0E14\u0E0A\u0E1A\u0E2D\u0E23\u0E4C\u0E14",
    projectSettings: "\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23",
    projectName: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23",
    save: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01",
    cancel: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01",
    reset: "\u0E23\u0E35\u0E40\u0E0B\u0E47\u0E15",
    delete: "\u0E25\u0E1A",
    search: "\u0E04\u0E49\u0E19\u0E2B\u0E32...",
    home: "\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01",
    inbox: "\u0E01\u0E25\u0E48\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21",
    users: "\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49",
    settings: "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32",
    category: "\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48",
    categoryValue: "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A",
    emailNotify: "\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E17\u0E32\u0E07\u0E2D\u0E35\u0E40\u0E21\u0E25",
    public: "\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E30",
    progress: "\u0E04\u0E27\u0E32\u0E21\u0E04\u0E37\u0E1A\u0E2B\u0E19\u0E49\u0E32",
    projectOverview: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23",
    projectOverviewDesc: "\u0E14\u0E39\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23\u0E43\u0E19\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21",
    overview: "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21",
    members: "\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01",
    newProject: "\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E21\u0E48",
    totalUsers: "\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
    activeProjects: "\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
    scheduledEvents: "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E01\u0E32\u0E23",
    thisWeek: "\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E19\u0E35\u0E49",
    designSystem: "\u0E23\u0E30\u0E1A\u0E1A\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A",
    designSystemDesc: "\u0E04\u0E25\u0E31\u0E07\u0E04\u0E2D\u0E21\u0E42\u0E1E\u0E40\u0E19\u0E19\u0E15\u0E4C\u0E41\u0E25\u0E30\u0E42\u0E17\u0E40\u0E04\u0E19\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A",
    apiRefactoring: "\u0E1B\u0E23\u0E31\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07 API",
    apiRefactoringDesc: "\u0E22\u0E49\u0E32\u0E22\u0E08\u0E32\u0E01 REST \u0E44\u0E1B GraphQL",
    mobileAppV2: "\u0E41\u0E2D\u0E1B\u0E21\u0E37\u0E2D\u0E16\u0E37\u0E2D v2",
    mobileAppV2Desc: "\u0E41\u0E2D\u0E1B\u0E43\u0E2B\u0E21\u0E48\u0E1A\u0E19 React Native",
    inProgress: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23",
    reviewing: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A",
    waiting: "\u0E23\u0E2D",
    teamMembers: "\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01\u0E17\u0E35\u0E21",
    teamMembersDesc: "\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01\u0E43\u0E19\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23",
    name: "\u0E0A\u0E37\u0E48\u0E2D",
    email: "\u0E2D\u0E35\u0E40\u0E21\u0E25",
    role: "\u0E1A\u0E17\u0E1A\u0E32\u0E17",
    admin: "\u0E1C\u0E39\u0E49\u0E14\u0E39\u0E41\u0E25",
    editor: "\u0E1A\u0E23\u0E23\u0E13\u0E32\u0E18\u0E34\u0E01\u0E32\u0E23",
    viewer: "\u0E1C\u0E39\u0E49\u0E0A\u0E21",
    generalSettings: "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B",
    generalSettingsDesc: "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19",
    general: "\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B",
    profile: "\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C",
    notifications: "\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19",
    security: "\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22",
    billing: "\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E40\u0E07\u0E34\u0E19",
    fastBuild: "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E23\u0E47\u0E27",
    fastBuildDesc: "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E30\u0E1A\u0E1A\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E43\u0E19 5 \u0E19\u0E32\u0E17\u0E35",
    perfectCustom: "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E2D\u0E07\u0E2A\u0E21\u0E1A\u0E39\u0E23\u0E13\u0E4C",
    perfectCustomDesc: "\u0E1B\u0E23\u0E31\u0E1A\u0E41\u0E15\u0E48\u0E07\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E43\u0E2B\u0E49\u0E40\u0E02\u0E49\u0E32\u0E01\u0E31\u0E1A\u0E41\u0E1A\u0E23\u0E19\u0E14\u0E4C",
    codeGeneration: "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E42\u0E04\u0E49\u0E14",
    codeGenerationDesc: "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E42\u0E04\u0E49\u0E14\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34",
    heroTitle1: "\u0E40\u0E23\u0E47\u0E27\u0E02\u0E36\u0E49\u0E19, ",
    heroTitle2: "\u0E2A\u0E27\u0E22\u0E02\u0E36\u0E49\u0E19",
    heroDesc: "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E30\u0E1A\u0E1A\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E43\u0E19\u0E44\u0E21\u0E48\u0E01\u0E35\u0E48\u0E19\u0E32\u0E17\u0E35 \u0E08\u0E32\u0E01\u0E04\u0E2D\u0E21\u0E42\u0E1E\u0E40\u0E19\u0E19\u0E15\u0E4C\u0E16\u0E36\u0E07\u0E42\u0E17\u0E40\u0E04\u0E19 \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34",
    startFree: "\u0E40\u0E23\u0E34\u0E48\u0E21\u0E1F\u0E23\u0E35",
    learnMore: "\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49\u0E40\u0E1E\u0E34\u0E48\u0E21",
    getStarted: "\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19",
  },
  vietnamese: {
    dashboard: "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n",
    projectSettings: "C\u00E0i \u0111\u1EB7t d\u1EF1 \u00E1n",
    projectName: "T\u00EAn d\u1EF1 \u00E1n",
    save: "L\u01B0u",
    cancel: "H\u1EE7y",
    reset: "\u0110\u1EB7t l\u1EA1i",
    delete: "X\u00F3a",
    search: "T\u00ECm ki\u1EBFm...",
    home: "Trang ch\u1EE7",
    inbox: "H\u1ED9p th\u01B0",
    users: "Ng\u01B0\u1EDDi d\u00F9ng",
    settings: "C\u00E0i \u0111\u1EB7t",
    category: "Danh m\u1EE5c",
    categoryValue: "Thi\u1EBFt k\u1EBF",
    emailNotify: "Nh\u1EADn th\u00F4ng b\u00E1o qua email",
    public: "C\u00F4ng khai",
    progress: "Ti\u1EBFn \u0111\u1ED9",
    projectOverview: "Ki\u1EC3m tra tr\u1EA1ng th\u00E1i d\u1EF1 \u00E1n",
    projectOverviewDesc: "Xem t\u1ED5ng quan d\u1EF1 \u00E1n",
    overview: "T\u1ED5ng quan",
    members: "Th\u00E0nh vi\u00EAn",
    newProject: "D\u1EF1 \u00E1n m\u1EDBi",
    totalUsers: "T\u1ED5ng ng\u01B0\u1EDDi d\u00F9ng",
    activeProjects: "D\u1EF1 \u00E1n ho\u1EA1t \u0111\u1ED9ng",
    scheduledEvents: "S\u1EF1 ki\u1EC7n",
    thisWeek: "Tu\u1EA7n n\u00E0y",
    designSystem: "H\u1EC7 th\u1ED1ng thi\u1EBFt k\u1EBF",
    designSystemDesc: "Th\u01B0 vi\u1EC7n component v\u00E0 design token",
    apiRefactoring: "T\u00E1i c\u1EA5u tr\u00FAc API",
    apiRefactoringDesc: "Di chuy\u1EC3n t\u1EEB REST sang GraphQL",
    mobileAppV2: "\u1EE8ng d\u1EE5ng mobile v2",
    mobileAppV2Desc: "\u1EE8ng d\u1EE5ng m\u1EDBi tr\u00EAn React Native",
    inProgress: "\u0110ang ti\u1EBFn h\u00E0nh",
    reviewing: "\u0110ang xem x\u00E9t",
    waiting: "Ch\u1EDD",
    teamMembers: "Th\u00E0nh vi\u00EAn nh\u00F3m",
    teamMembersDesc: "Danh s\u00E1ch th\u00E0nh vi\u00EAn tham gia d\u1EF1 \u00E1n",
    name: "T\u00EAn",
    email: "Email",
    role: "Vai tr\u00F2",
    admin: "Qu\u1EA3n tr\u1ECB",
    editor: "Bi\u00EAn t\u1EADp",
    viewer: "Xem",
    generalSettings: "C\u00E0i \u0111\u1EB7t chung",
    generalSettingsDesc: "Qu\u1EA3n l\u00FD c\u00E0i \u0111\u1EB7t c\u01A1 b\u1EA3n c\u1EE7a d\u1EF1 \u00E1n",
    general: "Chung",
    profile: "H\u1ED3 s\u01A1",
    notifications: "Th\u00F4ng b\u00E1o",
    security: "B\u1EA3o m\u1EADt",
    billing: "Thanh to\u00E1n",
    fastBuild: "X\u00E2y d\u1EF1ng nhanh",
    fastBuildDesc: "Ho\u00E0n th\u00E0nh h\u1EC7 th\u1ED1ng thi\u1EBFt k\u1EBF trong 5 ph\u00FAt",
    perfectCustom: "T\u00F9y ch\u1EC9nh ho\u00E0n h\u1EA3o",
    perfectCustomDesc: "\u0110i\u1EC1u ch\u1EC9nh chi ti\u1EBFt ph\u00F9 h\u1EE3p v\u1EDBi th\u01B0\u01A1ng hi\u1EC7u",
    codeGeneration: "T\u1EA1o m\u00E3",
    codeGenerationDesc: "T\u1EF1 \u0111\u1ED9ng xu\u1EA5t m\u00E3 s\u1EB5n s\u00E0ng s\u1EA3n xu\u1EA5t",
    heroTitle1: "Nhanh h\u01A1n, ",
    heroTitle2: "\u0110\u1EB9p h\u01A1n",
    heroDesc: "X\u00E2y d\u1EF1ng h\u1EC7 th\u1ED1ng thi\u1EBFt k\u1EBF trong v\u00E0i ph\u00FAt. T\u1EEB component \u0111\u1EBFn token, t\u1EF1 \u0111\u1ED9ng t\u1EA1o.",
    startFree: "B\u1EAFt \u0111\u1EA7u mi\u1EC5n ph\u00ED",
    learnMore: "T\u00ECm hi\u1EC3u th\u00EAm",
    getStarted: "B\u1EAFt \u0111\u1EA7u",
  },
};

// ── 기기 옵션 (REQ 11) ──

export interface DeviceOption {
  name: string;
  width: number;
  height: number;
}

export const DEVICE_OPTIONS: Record<string, DeviceOption[]> = {
  web: [
    { name: "Desktop 1440", width: 1440, height: 900 },
    { name: "Laptop 1280", width: 1280, height: 800 },
    { name: "Compact 1024", width: 1024, height: 768 },
  ],
  tablet: [
    { name: "iPad Mini", width: 768, height: 1024 },
    { name: "iPad Air", width: 820, height: 1180 },
    { name: "iPad Pro 11", width: 834, height: 1194 },
    { name: "iPad Pro 12.9", width: 1024, height: 1366 },
  ],
  mobile: [
    { name: "iPhone SE", width: 375, height: 667 },
    { name: "iPhone 12", width: 390, height: 844 },
    { name: "iPhone 16 Pro", width: 393, height: 852 },
    { name: "iPhone 16 Pro Max", width: 430, height: 932 },
  ],
};

// ── 스페이싱 밀도 프리셋 ──

export interface SpacingPreset {
  id: string;
  label: string;
  baseUnit: number;
  products: string;
  description: string;
}

export const SPACING_PRESETS: SpacingPreset[] = [
  { id: "data-dense",   label: "Data Dense",   baseUnit: 3,   products: "Figma, Linear, Grafana",       description: "\uB370\uC774\uD130 \uC9D1\uC57D\uD615 \uB300\uC2DC\uBCF4\uB4DC" },
  { id: "compact",      label: "Compact",      baseUnit: 3.5, products: "VS Code, Jira, Slack",         description: "\uB3C4\uAD6C\uD615 SaaS, \uC815\uBCF4 \uBC00\uB3C4 \uB192\uC74C" },
  { id: "default",      label: "Default",      baseUnit: 4,   products: "Notion, Vercel, GitHub",       description: "\uBC94\uC6A9 \uC6F9\uC571 \u2014 Tailwind \uAE30\uBCF8\uAC12" },
  { id: "comfortable",  label: "Comfortable",  baseUnit: 4.8, products: "Stripe Dashboard, Shopify",    description: "\uC5EC\uC720 \uC788\uB294 SaaS, \uC774\uCEE4\uBA38\uC2A4 \uC5B4\uB4DC\uBBFC" },
  { id: "relaxed",      label: "Relaxed",      baseUnit: 5.6, products: "Medium, Docs \uC0AC\uC774\uD2B8",           description: "\uCF58\uD150\uCE20\u00B7\uBB38\uC11C \uC911\uC2EC, \uAC00\uB3C5\uC131 \uC6B0\uC120" },
  { id: "spacious",     label: "Spacious",     baseUnit: 6.4, products: "Apple, \uB79C\uB529 \uD398\uC774\uC9C0",            description: "\uB9C8\uCF00\uD305\u00B7\uBE0C\uB79C\uB4DC, \uB300\uD615 \uC5EC\uBC31" },
];

// ── 컬러 프리셋 ──
export const COLOR_PRESETS = [
  { name: "Blue",    hue: 260, chroma: 0.214, lightness: 0.623 },
  { name: "Violet",  hue: 293, chroma: 0.2,   lightness: 0.58  },
  { name: "Purple",  hue: 304, chroma: 0.19,  lightness: 0.55  },
  { name: "Rose",    hue: 350, chroma: 0.2,   lightness: 0.58  },
  { name: "Red",     hue: 27,  chroma: 0.245, lightness: 0.577 },
  { name: "Orange",  hue: 55,  chroma: 0.2,   lightness: 0.65  },
  { name: "Yellow",  hue: 85,  chroma: 0.189, lightness: 0.828 },
  { name: "Green",   hue: 160, chroma: 0.17,  lightness: 0.6   },
  { name: "Teal",    hue: 185, chroma: 0.118, lightness: 0.6   },
  { name: "Cyan",    hue: 210, chroma: 0.15,  lightness: 0.62  },
  { name: "Slate",   hue: 264, chroma: 0.015, lightness: 0.55  },
  { name: "Zinc",    hue: 286, chroma: 0.005, lightness: 0.55  },
] as const;

// ── 컴포넌트 카탈로그 (6그룹 60개) ──
export const COMPONENT_CATALOG: ComponentOption[] = [
  // ━━ General ━━
  { id: "button",     name: "Button",     category: "general", description: "\uB2E4\uC591\uD55C variant\uB97C \uAC00\uC9C4 \uAE30\uBCF8 \uBC84\uD2BC",             requiredByLayout: ["sidebar", "topnav", "dock"], dependencies: [] },
  { id: "icon",       name: "Icon",       category: "general", description: "Lucide \uC544\uC774\uCF58 \uC2DC\uC2A4\uD15C \uD1B5\uD569",                  requiredByLayout: ["sidebar", "topnav", "dock"], dependencies: [] },
  { id: "title",      name: "Title",      category: "general", description: "h1~h6 \uAE30\uBC18 \uD0C0\uC774\uD2C0 \uCEF4\uD3EC\uB10C\uD2B8",                 requiredByLayout: [],                              dependencies: [] },
  { id: "text",       name: "Text",       category: "general", description: "\uBCF8\uBB38 \uD14D\uC2A4\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8",                         requiredByLayout: [],                              dependencies: [] },

  // ━━ Inputs ━━
  { id: "input",         name: "Input",         category: "inputs", description: "\uD14D\uC2A4\uD2B8 \uC785\uB825 \uD544\uB4DC",                       requiredByLayout: [],                dependencies: ["label"] },
  { id: "textarea",      name: "Textarea",      category: "inputs", description: "\uC5EC\uB7EC \uC904 \uD14D\uC2A4\uD2B8 \uC785\uB825",                   requiredByLayout: [],                dependencies: ["label"] },
  { id: "checkbox",      name: "Checkbox",      category: "inputs", description: "\uCCB4\uD06C\uBC15\uC2A4 \uC785\uB825 \uC694\uC18C",                    requiredByLayout: [],                dependencies: ["label"] },
  { id: "radio",         name: "Radio Group",   category: "inputs", description: "\uB77C\uB514\uC624 \uBC84\uD2BC \uADF8\uB8F9",                      requiredByLayout: [],                dependencies: ["label"] },
  { id: "switch",        name: "Switch",        category: "inputs", description: "\uD1A0\uAE00 \uC2A4\uC704\uCE58",                            requiredByLayout: [],                dependencies: ["label"] },
  { id: "toggle",        name: "Toggle",        category: "inputs", description: "\uBC14\uC774\uB108\uB9AC \uD1A0\uAE00 \uBC84\uD2BC",                    requiredByLayout: [],                dependencies: [] },
  { id: "toggle-group",  name: "Toggle Group",  category: "inputs", description: "\uD1A0\uAE00 \uBC84\uD2BC \uADF8\uB8F9",                        requiredByLayout: [],                dependencies: ["toggle"] },
  { id: "select",        name: "Select",        category: "inputs", description: "\uB4DC\uB86D\uB2E4\uC6B4 \uC140\uB809\uD2B8",                       requiredByLayout: [],                dependencies: [] },
  { id: "combobox",      name: "Combobox",      category: "inputs", description: "\uAC80\uC0C9 \uAC00\uB2A5\uD55C \uB4DC\uB86D\uB2E4\uC6B4",                  requiredByLayout: [],                dependencies: ["command", "popover"] },
  { id: "date-picker",   name: "Date Picker",   category: "inputs", description: "\uB0A0\uC9DC \uC120\uD0DD\uAE30",                           requiredByLayout: [],                dependencies: ["calendar", "popover"] },
  { id: "time-picker",   name: "Time Picker",   category: "inputs", description: "\uC2DC\uAC04 \uC120\uD0DD\uAE30",                           requiredByLayout: [],                dependencies: ["select"] },
  { id: "slider",        name: "Slider",        category: "inputs", description: "\uBC94\uC704 \uC2AC\uB77C\uC774\uB354",                          requiredByLayout: [],                dependencies: [] },
  { id: "input-otp",     name: "Input OTP",     category: "inputs", description: "OTP \uC778\uC99D \uCF54\uB4DC \uC785\uB825",                    requiredByLayout: [],                dependencies: [] },
  { id: "color-picker",  name: "Color Picker",  category: "inputs", description: "\uC0C9\uC0C1 \uC120\uD0DD\uAE30",                           requiredByLayout: [],                dependencies: ["popover"] },
  { id: "rate",          name: "Rate",          category: "inputs", description: "\uBCC4\uC810 \uD3C9\uAC00 \uC785\uB825",                          requiredByLayout: [],                dependencies: [] },
  { id: "label",         name: "Label",         category: "inputs", description: "\uD3FC \uD544\uB4DC \uB77C\uBCA8",                           requiredByLayout: [],                dependencies: [] },

  // ━━ Data Display ━━
  { id: "avatar",       name: "Avatar",       category: "data-display", description: "\uC0AC\uC6A9\uC790 \uC544\uBC14\uD0C0 + \uADF8\uB8F9",              requiredByLayout: ["sidebar"],         dependencies: [] },
  { id: "badge",        name: "Badge",        category: "data-display", description: "\uB77C\uBCA8/\uD0DC\uADF8 \uBF43\uC9C0",                    requiredByLayout: [],                  dependencies: [] },
  { id: "card",         name: "Card",         category: "data-display", description: "\uCE74\uB4DC \uCEE8\uD14C\uC774\uB108",                      requiredByLayout: [],                  dependencies: [] },
  { id: "table",        name: "Table",        category: "data-display", description: "\uAE30\uBCF8 HTML \uD14C\uC774\uBE14",                   requiredByLayout: [],                  dependencies: [] },
  { id: "data-table",   name: "DataTable",    category: "data-display", description: "\uC815\uB82C/\uD544\uD130/\uD398\uC774\uC9C0\uB124\uC774\uC158\uC774 \uC788\uB294 \uACE0\uAE09 \uD14C\uC774\uBE14", requiredByLayout: [],            dependencies: ["table", "button", "checkbox"] },
  { id: "code",         name: "Code",         category: "data-display", description: "\uCF54\uB4DC \uD45C\uC2DC + \uAD6C\uBB38 \uD558\uC774\uB77C\uC774\uD305",        requiredByLayout: [],                  dependencies: [] },
  { id: "progress",     name: "Progress",     category: "data-display", description: "\uC9C4\uD589 \uD45C\uC2DC\uC904",                        requiredByLayout: [],                  dependencies: [] },
  { id: "skeleton",     name: "Skeleton",     category: "data-display", description: "\uB85C\uB529 \uC2A4\uCF08\uB808\uD1A4 \uD50C\uB808\uC774\uC2A4\uD640\uB354",          requiredByLayout: [],                  dependencies: [] },
  { id: "carousel",     name: "Carousel",     category: "data-display", description: "\uCE90\uB7EC\uC140/\uC2AC\uB77C\uC774\uB354",                   requiredByLayout: [],                  dependencies: ["button"] },
  { id: "timeline",     name: "Timeline",     category: "data-display", description: "\uC2DC\uAC04\uC21C \uC774\uBCA4\uD2B8 \uBAA9\uB85D",                 requiredByLayout: [],                  dependencies: [] },
  { id: "descriptions", name: "Descriptions", category: "data-display", description: "\uD0A4-\uAC12 \uC30D \uC124\uBA85 \uBAA9\uB85D",                 requiredByLayout: [],                  dependencies: [] },
  { id: "statistic",    name: "Statistic",    category: "data-display", description: "\uD1B5\uACC4 \uC218\uCE58 \uD45C\uC2DC",                     requiredByLayout: ["dock"],            dependencies: [] },
  { id: "tag",          name: "Tag",          category: "data-display", description: "\uD0DC\uADF8/\uCE69 \uCEF4\uD3EC\uB10C\uD2B8",                   requiredByLayout: [],                  dependencies: [] },
  { id: "tree",         name: "Tree",         category: "data-display", description: "\uD2B8\uB9AC \uAD6C\uC870 \uD45C\uC2DC",                      requiredByLayout: [],                  dependencies: [] },
  { id: "empty",        name: "Empty",        category: "data-display", description: "\uBE48 \uC0C1\uD0DC \uD45C\uC2DC",                       requiredByLayout: [],                  dependencies: [] },
  { id: "list",         name: "List",         category: "data-display", description: "\uB9AC\uC2A4\uD2B8 \uCEF4\uD3EC\uB10C\uD2B8",                    requiredByLayout: [],                  dependencies: [] },
  { id: "calendar",     name: "Calendar",     category: "data-display", description: "\uC6D4\uAC04 \uB2EC\uB825 \uBDF0",                       requiredByLayout: [],                  dependencies: [] },

  // ━━ Feedback ━━
  { id: "dialog",        name: "Dialog",        category: "feedback", description: "\uBAA8\uB2EC \uB2E4\uC774\uC5BC\uB85C\uADF8",                      requiredByLayout: [],         dependencies: ["button"] },
  { id: "page-dialog",   name: "Page Dialog",   category: "feedback", description: "\uD480\uD398\uC774\uC9C0 \uBAA8\uB2EC",                        requiredByLayout: [],         dependencies: ["button"] },
  { id: "alert-dialog",  name: "Alert Dialog",  category: "feedback", description: "\uD655\uC778/\uACBD\uACE0 \uB2E4\uC774\uC5BC\uB85C\uADF8",                 requiredByLayout: [],         dependencies: ["button"] },
  { id: "alert",         name: "Alert",         category: "feedback", description: "\uC778\uB77C\uC778 \uC54C\uB9BC \uBA54\uC2DC\uC9C0",                    requiredByLayout: [],         dependencies: [] },
  { id: "drawer",        name: "Drawer",        category: "feedback", description: "\uC2AC\uB77C\uC774\uB4DC-\uC778 \uD328\uB110",                     requiredByLayout: [],         dependencies: ["button"] },
  { id: "toast",         name: "Toast",         category: "feedback", description: "\uD1A0\uC2A4\uD2B8 \uC54C\uB9BC (Sonner)",                 requiredByLayout: [],         dependencies: [] },
  { id: "tooltip",       name: "Tooltip",       category: "feedback", description: "\uD638\uBC84 \uC815\uBCF4 \uD31D\uC5C5",                       requiredByLayout: ["sidebar", "dock"], dependencies: [] },
  { id: "popover",       name: "Popover",       category: "feedback", description: "\uD50C\uB85C\uD305 \uD31D\uC624\uBC84 \uD328\uB110",                   requiredByLayout: [],         dependencies: [] },
  { id: "hover-card",    name: "Hover Card",    category: "feedback", description: "\uD638\uBC84 \uC2DC \uCE74\uB4DC \uBBF8\uB9AC\uBCF4\uAE30",                 requiredByLayout: [],         dependencies: [] },
  { id: "spinner",       name: "Spinner",       category: "feedback", description: "\uB85C\uB529 \uC2A4\uD53C\uB108",                          requiredByLayout: [],         dependencies: [] },

  // ━━ Navigation ━━
  { id: "breadcrumb",       name: "Breadcrumb",       category: "navigation", description: "\uACBD\uB85C \uD0D0\uC0C9 \uB124\uBE44\uAC8C\uC774\uC158",            requiredByLayout: ["topnav"],            dependencies: [] },
  { id: "dropdown-menu",    name: "Dropdown Menu",    category: "navigation", description: "\uB4DC\uB86D\uB2E4\uC6B4 \uBA54\uB274 + \uC11C\uBE0C\uBA54\uB274",       requiredByLayout: ["topnav"],            dependencies: ["button"] },
  { id: "context-menu",     name: "Context Menu",     category: "navigation", description: "\uC6B0\uD074\uB9AD \uCEE8\uD14D\uC2A4\uD2B8 \uBA54\uB274",           requiredByLayout: [],                     dependencies: [] },
  { id: "navigation-menu",  name: "Navigation Menu",  category: "navigation", description: "\uC218\uD3C9 \uB124\uBE44\uAC8C\uC774\uC158 \uBA54\uB274\uBC14",          requiredByLayout: ["topnav"],            dependencies: [] },
  { id: "menubar",          name: "Menubar",          category: "navigation", description: "\uB370\uC2A4\uD06C\uD1B1 \uC2A4\uD0C0\uC77C \uBA54\uB274\uBC14",          requiredByLayout: [],                     dependencies: [] },
  { id: "pagination",       name: "Pagination",       category: "navigation", description: "\uD398\uC774\uC9C0 \uB124\uBE44\uAC8C\uC774\uC158",              requiredByLayout: [],                     dependencies: ["button"] },
  { id: "sidebar",          name: "Sidebar",          category: "navigation", description: "\uC0AC\uC774\uB4DC\uBC14 \uB124\uBE44\uAC8C\uC774\uC158 \uD328\uB110",         requiredByLayout: ["sidebar"],           dependencies: ["button", "tooltip"] },
  { id: "steps",            name: "Steps",            category: "navigation", description: "\uB2E8\uACC4 \uC9C4\uD589 \uD45C\uC2DC\uAE30",               requiredByLayout: [],                     dependencies: [] },
  { id: "command",          name: "Command",          category: "navigation", description: "\uCEE4\uB9E8\uB4DC \uD314\uB808\uD2B8 (\u2318K)",             requiredByLayout: [],                     dependencies: ["dialog"] },

  // ━━ Layout ━━
  { id: "separator",     name: "Separator",     category: "layout", description: "\uAD6C\uBD84\uC120",                                   requiredByLayout: ["sidebar"],  dependencies: [] },
  { id: "resizable",     name: "Resizable",     category: "layout", description: "\uB9AC\uC0AC\uC774\uC988 \uAC00\uB2A5\uD55C \uD328\uB110",                     requiredByLayout: [],           dependencies: [] },
  { id: "scroll-area",   name: "Scroll Area",   category: "layout", description: "\uCEE4\uC2A4\uD140 \uC2A4\uD06C\uB864 \uC601\uC5ED",                      requiredByLayout: ["sidebar"],  dependencies: [] },
  { id: "sheet",         name: "Sheet",         category: "layout", description: "\uC0AC\uC774\uB4DC \uC2DC\uD2B8 \uD328\uB110",                          requiredByLayout: [],           dependencies: ["button"] },
  { id: "aspect-ratio",  name: "Aspect Ratio",  category: "layout", description: "\uC885\uD6A1\uBE44 \uC720\uC9C0 \uCEE8\uD14C\uC774\uB108",                     requiredByLayout: [],           dependencies: [] },
  { id: "collapsible",   name: "Collapsible",   category: "layout", description: "\uC811\uAE30/\uD3BC\uCE58\uAE30 \uCEE8\uD14C\uC774\uB108",                     requiredByLayout: ["sidebar"],  dependencies: [] },
  { id: "accordion",     name: "Accordion",     category: "layout", description: "\uC544\uCF54\uB514\uC5B8 \uC811\uC774\uC2DD \uC139\uC158",                     requiredByLayout: [],           dependencies: [] },
  { id: "tabs",          name: "Tabs",          category: "layout", description: "\uD0ED \uC778\uD130\uD398\uC774\uC2A4",                             requiredByLayout: [],           dependencies: [] },
];

// 카테고리 메타데이터
export const CATEGORY_META = {
  general:      { label: "General",      icon: "Shapes" },
  inputs:       { label: "Inputs",       icon: "FormInput" },
  "data-display": { label: "Data Display", icon: "Eye" },
  feedback:     { label: "Feedback",     icon: "Bell" },
  navigation:   { label: "Navigation",   icon: "Navigation" },
  layout:       { label: "Layout",       icon: "Layout" },
} as const;
