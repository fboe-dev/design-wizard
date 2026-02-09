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
  fonts: FontPresetInfo[];
}

export const FONT_GROUPS: FontLanguageGroup[] = [
  {
    id: "korean",
    label: "한국어 Korean",
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
    ],
  },
  {
    id: "latin",
    label: "English Latin",
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
    ],
  },
  {
    id: "japanese",
    label: "日本語 Japanese",
    fonts: [
      {
        fontFamily: "Noto Sans JP",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "あいうえお 漢字 The quick brown fox",
      },
      {
        fontFamily: "M PLUS 1p",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700;800;900&display=swap",
        weights: [100, 300, 400, 500, 700, 800, 900],
        variable: false,
        specimen: "あいうえお 漢字 The quick brown fox",
      },
      {
        fontFamily: "Zen Kaku Gothic New",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap",
        weights: [300, 400, 500, 700, 900],
        variable: false,
        specimen: "あいうえお 漢字 The quick brown fox",
      },
    ],
  },
  {
    id: "chinese",
    label: "中文 Chinese",
    fonts: [
      {
        fontFamily: "Noto Sans SC",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "你好世界 设计系统 The quick brown fox",
      },
      {
        fontFamily: "Noto Sans TC",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "你好世界 設計系統 The quick brown fox",
      },
    ],
  },
  {
    id: "southeast-asian",
    label: "Southeast Asian",
    fonts: [
      {
        fontFamily: "Noto Sans Thai",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "สวัสดีครับ ภาษาไทย The quick brown fox",
      },
      {
        fontFamily: "Be Vietnam Pro",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "Xin chào thế giới The quick brown fox",
      },
    ],
  },
  {
    id: "multilingual",
    label: "다국어 Multilingual",
    fonts: [
      {
        fontFamily: "IBM Plex Sans",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700],
        variable: false,
        specimen: "The quick brown fox 다국어 你好",
      },
      {
        fontFamily: "Source Sans 3",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200..900&display=swap",
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "The quick brown fox 다국어 你好",
      },
      {
        fontFamily: "Roboto",
        fontCdnUrl: "https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        variable: true,
        specimen: "The quick brown fox 다국어 你好",
      },
    ],
  },
];

// 하위 호환용 flat 배열
export const FONT_PRESETS: FontConfig[] = FONT_GROUPS.flatMap((g) =>
  g.fonts.map(({ fontFamily, fontCdnUrl }) => ({ fontFamily, fontCdnUrl })),
);

// ── 스페이싱 밀도 프리셋 ──

export interface SpacingPreset {
  id: string;
  label: string;
  baseUnit: number;
  products: string;
  description: string;
}

export const SPACING_PRESETS: SpacingPreset[] = [
  { id: "data-dense",   label: "Data Dense",   baseUnit: 3,   products: "Figma, Linear, Grafana",       description: "데이터 집약형 대시보드" },
  { id: "compact",      label: "Compact",      baseUnit: 3.5, products: "VS Code, Jira, Slack",         description: "도구형 SaaS, 정보 밀도 높음" },
  { id: "default",      label: "Default",      baseUnit: 4,   products: "Notion, Vercel, GitHub",       description: "범용 웹앱 — Tailwind 기본값" },
  { id: "comfortable",  label: "Comfortable",  baseUnit: 4.8, products: "Stripe Dashboard, Shopify",    description: "여유 있는 SaaS, 이커머스 어드민" },
  { id: "relaxed",      label: "Relaxed",      baseUnit: 5.6, products: "Medium, Docs 사이트",           description: "콘텐츠·문서 중심, 가독성 우선" },
  { id: "spacious",     label: "Spacious",     baseUnit: 6.4, products: "Apple, 랜딩 페이지",            description: "마케팅·브랜드, 대형 여백" },
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
  { id: "button",     name: "Button",     category: "general", description: "다양한 variant를 가진 기본 버튼",             requiredByLayout: ["sidebar", "topnav", "dock"], dependencies: [] },
  { id: "icon",       name: "Icon",       category: "general", description: "Lucide 아이콘 시스템 통합",                  requiredByLayout: ["sidebar", "topnav", "dock"], dependencies: [] },
  { id: "title",      name: "Title",      category: "general", description: "h1~h6 기반 타이틀 컴포넌트",                 requiredByLayout: [],                              dependencies: [] },
  { id: "text",       name: "Text",       category: "general", description: "본문 텍스트 컴포넌트",                         requiredByLayout: [],                              dependencies: [] },

  // ━━ Inputs ━━
  { id: "input",         name: "Input",         category: "inputs", description: "텍스트 입력 필드",                       requiredByLayout: [],                dependencies: ["label"] },
  { id: "textarea",      name: "Textarea",      category: "inputs", description: "여러 줄 텍스트 입력",                   requiredByLayout: [],                dependencies: ["label"] },
  { id: "checkbox",      name: "Checkbox",      category: "inputs", description: "체크박스 입력 요소",                    requiredByLayout: [],                dependencies: ["label"] },
  { id: "radio",         name: "Radio Group",   category: "inputs", description: "라디오 버튼 그룹",                      requiredByLayout: [],                dependencies: ["label"] },
  { id: "switch",        name: "Switch",        category: "inputs", description: "토글 스위치",                            requiredByLayout: [],                dependencies: ["label"] },
  { id: "toggle",        name: "Toggle",        category: "inputs", description: "바이너리 토글 버튼",                    requiredByLayout: [],                dependencies: [] },
  { id: "toggle-group",  name: "Toggle Group",  category: "inputs", description: "토글 버튼 그룹",                        requiredByLayout: [],                dependencies: ["toggle"] },
  { id: "select",        name: "Select",        category: "inputs", description: "드롭다운 셀렉트",                       requiredByLayout: [],                dependencies: [] },
  { id: "combobox",      name: "Combobox",      category: "inputs", description: "검색 가능한 드롭다운",                  requiredByLayout: [],                dependencies: ["command", "popover"] },
  { id: "date-picker",   name: "Date Picker",   category: "inputs", description: "날짜 선택기",                           requiredByLayout: [],                dependencies: ["calendar", "popover"] },
  { id: "time-picker",   name: "Time Picker",   category: "inputs", description: "시간 선택기",                           requiredByLayout: [],                dependencies: ["select"] },
  { id: "slider",        name: "Slider",        category: "inputs", description: "범위 슬라이더",                          requiredByLayout: [],                dependencies: [] },
  { id: "input-otp",     name: "Input OTP",     category: "inputs", description: "OTP 인증 코드 입력",                    requiredByLayout: [],                dependencies: [] },
  { id: "color-picker",  name: "Color Picker",  category: "inputs", description: "색상 선택기",                           requiredByLayout: [],                dependencies: ["popover"] },
  { id: "rate",          name: "Rate",          category: "inputs", description: "별점 평가 입력",                          requiredByLayout: [],                dependencies: [] },
  { id: "label",         name: "Label",         category: "inputs", description: "폼 필드 라벨",                           requiredByLayout: [],                dependencies: [] },

  // ━━ Data Display ━━
  { id: "avatar",       name: "Avatar",       category: "data-display", description: "사용자 아바타 + 그룹",              requiredByLayout: ["sidebar"],         dependencies: [] },
  { id: "badge",        name: "Badge",        category: "data-display", description: "라벨/태그 뱃지",                    requiredByLayout: [],                  dependencies: [] },
  { id: "card",         name: "Card",         category: "data-display", description: "카드 컨테이너",                      requiredByLayout: [],                  dependencies: [] },
  { id: "table",        name: "Table",        category: "data-display", description: "기본 HTML 테이블",                   requiredByLayout: [],                  dependencies: [] },
  { id: "data-table",   name: "DataTable",    category: "data-display", description: "정렬/필터/페이지네이션이 있는 고급 테이블", requiredByLayout: [],            dependencies: ["table", "button", "checkbox"] },
  { id: "code",         name: "Code",         category: "data-display", description: "코드 표시 + 구문 하이라이팅",        requiredByLayout: [],                  dependencies: [] },
  { id: "progress",     name: "Progress",     category: "data-display", description: "진행 표시줄",                        requiredByLayout: [],                  dependencies: [] },
  { id: "skeleton",     name: "Skeleton",     category: "data-display", description: "로딩 스켈레톤 플레이스홀더",          requiredByLayout: [],                  dependencies: [] },
  { id: "carousel",     name: "Carousel",     category: "data-display", description: "캐러셀/슬라이더",                   requiredByLayout: [],                  dependencies: ["button"] },
  { id: "timeline",     name: "Timeline",     category: "data-display", description: "시간순 이벤트 목록",                 requiredByLayout: [],                  dependencies: [] },
  { id: "descriptions", name: "Descriptions", category: "data-display", description: "키-값 쌍 설명 목록",                 requiredByLayout: [],                  dependencies: [] },
  { id: "statistic",    name: "Statistic",    category: "data-display", description: "통계 수치 표시",                     requiredByLayout: ["dock"],            dependencies: [] },
  { id: "tag",          name: "Tag",          category: "data-display", description: "태그/칩 컴포넌트",                   requiredByLayout: [],                  dependencies: [] },
  { id: "tree",         name: "Tree",         category: "data-display", description: "트리 구조 표시",                      requiredByLayout: [],                  dependencies: [] },
  { id: "empty",        name: "Empty",        category: "data-display", description: "빈 상태 표시",                       requiredByLayout: [],                  dependencies: [] },
  { id: "list",         name: "List",         category: "data-display", description: "리스트 컴포넌트",                    requiredByLayout: [],                  dependencies: [] },
  { id: "calendar",     name: "Calendar",     category: "data-display", description: "월간 달력 뷰",                       requiredByLayout: [],                  dependencies: [] },

  // ━━ Feedback ━━
  { id: "dialog",        name: "Dialog",        category: "feedback", description: "모달 다이얼로그",                      requiredByLayout: [],         dependencies: ["button"] },
  { id: "page-dialog",   name: "Page Dialog",   category: "feedback", description: "풀페이지 모달",                        requiredByLayout: [],         dependencies: ["button"] },
  { id: "alert-dialog",  name: "Alert Dialog",  category: "feedback", description: "확인/경고 다이얼로그",                 requiredByLayout: [],         dependencies: ["button"] },
  { id: "alert",         name: "Alert",         category: "feedback", description: "인라인 알림 메시지",                    requiredByLayout: [],         dependencies: [] },
  { id: "drawer",        name: "Drawer",        category: "feedback", description: "슬라이드-인 패널",                     requiredByLayout: [],         dependencies: ["button"] },
  { id: "toast",         name: "Toast",         category: "feedback", description: "토스트 알림 (Sonner)",                 requiredByLayout: [],         dependencies: [] },
  { id: "tooltip",       name: "Tooltip",       category: "feedback", description: "호버 정보 팝업",                       requiredByLayout: ["sidebar", "dock"], dependencies: [] },
  { id: "popover",       name: "Popover",       category: "feedback", description: "플로팅 팝오버 패널",                   requiredByLayout: [],         dependencies: [] },
  { id: "hover-card",    name: "Hover Card",    category: "feedback", description: "호버 시 카드 미리보기",                 requiredByLayout: [],         dependencies: [] },
  { id: "spinner",       name: "Spinner",       category: "feedback", description: "로딩 스피너",                          requiredByLayout: [],         dependencies: [] },

  // ━━ Navigation ━━
  { id: "breadcrumb",       name: "Breadcrumb",       category: "navigation", description: "경로 탐색 네비게이션",            requiredByLayout: ["topnav"],            dependencies: [] },
  { id: "dropdown-menu",    name: "Dropdown Menu",    category: "navigation", description: "드롭다운 메뉴 + 서브메뉴",       requiredByLayout: ["topnav"],            dependencies: ["button"] },
  { id: "context-menu",     name: "Context Menu",     category: "navigation", description: "우클릭 컨텍스트 메뉴",           requiredByLayout: [],                     dependencies: [] },
  { id: "navigation-menu",  name: "Navigation Menu",  category: "navigation", description: "수평 네비게이션 메뉴바",          requiredByLayout: ["topnav"],            dependencies: [] },
  { id: "menubar",          name: "Menubar",          category: "navigation", description: "데스크톱 스타일 메뉴바",          requiredByLayout: [],                     dependencies: [] },
  { id: "pagination",       name: "Pagination",       category: "navigation", description: "페이지 네비게이션",              requiredByLayout: [],                     dependencies: ["button"] },
  { id: "sidebar",          name: "Sidebar",          category: "navigation", description: "사이드바 네비게이션 패널",         requiredByLayout: ["sidebar"],           dependencies: ["button", "tooltip"] },
  { id: "steps",            name: "Steps",            category: "navigation", description: "단계 진행 표시기",               requiredByLayout: [],                     dependencies: [] },
  { id: "command",          name: "Command",          category: "navigation", description: "커맨드 팔레트 (⌘K)",             requiredByLayout: [],                     dependencies: ["dialog"] },

  // ━━ Layout ━━
  { id: "separator",     name: "Separator",     category: "layout", description: "구분선",                                   requiredByLayout: ["sidebar"],  dependencies: [] },
  { id: "resizable",     name: "Resizable",     category: "layout", description: "리사이즈 가능한 패널",                     requiredByLayout: [],           dependencies: [] },
  { id: "scroll-area",   name: "Scroll Area",   category: "layout", description: "커스텀 스크롤 영역",                      requiredByLayout: ["sidebar"],  dependencies: [] },
  { id: "sheet",         name: "Sheet",         category: "layout", description: "사이드 시트 패널",                          requiredByLayout: [],           dependencies: ["button"] },
  { id: "aspect-ratio",  name: "Aspect Ratio",  category: "layout", description: "종횡비 유지 컨테이너",                     requiredByLayout: [],           dependencies: [] },
  { id: "collapsible",   name: "Collapsible",   category: "layout", description: "접기/펼치기 컨테이너",                     requiredByLayout: ["sidebar"],  dependencies: [] },
  { id: "accordion",     name: "Accordion",     category: "layout", description: "아코디언 접이식 섹션",                     requiredByLayout: [],           dependencies: [] },
  { id: "tabs",          name: "Tabs",          category: "layout", description: "탭 인터페이스",                             requiredByLayout: [],           dependencies: [] },
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
