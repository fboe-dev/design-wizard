// ── 레이아웃 ──
export type AppShellLayout = "sidebar" | "topnav" | "dock" | "landing";
export type PageLayout = "simple-page" | "tab-page" | "sidebar-page" | "dashboard-grid";

// ── 디자인 프리미티브 ──
export interface FontConfig {
  fontFamily: string;
  fontCdnUrl: string;
}

export interface TypographyScale {
  baseSize: number;
  scaleRatio: number;
}

export interface SpacingConfig {
  baseUnit: number;
}

export interface RadiusConfig {
  baseRadius: number;
  levels: number;
}

export interface ColorConfig {
  primaryHue: number;
  primaryChroma: number;
  primaryLightness: number;
  neutralBase: string;
}

export type DesignStyle = "standard" | "flat" | "lineless";
export type PlatformTarget = "web" | "tablet" | "mobile";

// ── 컴포넌트 ──
export interface ComponentOption {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  requiredByLayout: AppShellLayout[];
  dependencies: string[];
}

export type ComponentCategory =
  | "general"
  | "inputs"
  | "data-display"
  | "feedback"
  | "navigation"
  | "layout";

// ── 위저드 상태 ──
export interface WizardState {
  // Step 1
  appShellLayout: AppShellLayout;
  pageLayout: PageLayout;

  // Step 2
  font: FontConfig;
  typography: TypographyScale;
  spacing: SpacingConfig;
  radius: RadiusConfig;
  color: ColorConfig;
  designStyle: DesignStyle;
  platformTarget: PlatformTarget;
  selectedDevice: string;

  // Step 3
  selectedComponents: string[];
}

// ── 생성 결과 ──
export interface GeneratedPrompt {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
}

export interface GeneratedOutput {
  prompts: GeneratedPrompt[];
  summary: string;
}
