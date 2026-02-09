import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AppShellLayout,
  PageLayout,
  FontConfig,
  TypographyScale,
  SpacingConfig,
  RadiusConfig,
  ColorConfig,
  DesignStyle,
  PlatformTarget,
  WizardState,
} from "~/features/wizard/types";

export const DEFAULT_STATE: WizardState = {
  // Step 1
  appShellLayout: "sidebar",
  pageLayout: "simple-page",

  // Step 2
  font: {
    fontFamily: "Pretendard",
    fontCdnUrl: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css",
  },
  typography: {
    baseSize: 16,      // Tailwind 기본값
    scaleRatio: 1.0,   // 1.0 = Tailwind 기본 비율 그대로
  },
  spacing: {
    baseUnit: 4,       // Tailwind 기본값 (--spacing: 0.25rem)
  },
  radius: {
    baseRadius: 0.65,  // app.css :root --radius 값과 동일
    levels: 5,
  },
  color: {
    primaryHue: 260,
    primaryChroma: 0.214,
    primaryLightness: 0.623,
    neutralBase: "neutral",
  },
  designStyle: "mixed",
  platformTarget: "web",

  // Step 3
  selectedComponents: [],
};

interface WizardActions {
  // Step 1
  setAppShellLayout: (layout: AppShellLayout) => void;
  setPageLayout: (layout: PageLayout) => void;

  // Step 2
  setFont: (font: FontConfig) => void;
  setTypography: (typography: Partial<TypographyScale>) => void;
  setSpacing: (spacing: Partial<SpacingConfig>) => void;
  setRadius: (radius: Partial<RadiusConfig>) => void;
  setColor: (color: Partial<ColorConfig>) => void;
  setDesignStyle: (style: DesignStyle) => void;
  setPlatformTarget: (target: PlatformTarget) => void;

  // Step 3
  setSelectedComponents: (ids: string[]) => void;
  toggleComponent: (id: string) => void;

  // 공통
  resetWizard: () => void;
}

// 프리뷰 다크모드 (persist 불필요 → 별도 스토어)
interface PreviewUIState {
  previewDark: boolean;
  togglePreviewDark: () => void;
}
export const usePreviewUI = create<PreviewUIState>((set) => ({
  previewDark: false,
  togglePreviewDark: () => set((s) => ({ previewDark: !s.previewDark })),
}));

export const useWizardStore = create<WizardState & WizardActions>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      // Step 1
      setAppShellLayout: (appShellLayout) => set({ appShellLayout }),
      setPageLayout: (pageLayout) => set({ pageLayout }),

      // Step 2
      setFont: (font) => set({ font }),
      setTypography: (partial) =>
        set((s) => ({ typography: { ...s.typography, ...partial } })),
      setSpacing: (partial) =>
        set((s) => ({ spacing: { ...s.spacing, ...partial } })),
      setRadius: (partial) =>
        set((s) => ({ radius: { ...s.radius, ...partial } })),
      setColor: (partial) =>
        set((s) => ({ color: { ...s.color, ...partial } })),
      setDesignStyle: (designStyle) => set({ designStyle }),
      setPlatformTarget: (platformTarget) => set({ platformTarget }),

      // Step 3
      setSelectedComponents: (selectedComponents) => set({ selectedComponents }),
      toggleComponent: (id) =>
        set((s) => ({
          selectedComponents: s.selectedComponents.includes(id)
            ? s.selectedComponents.filter((c) => c !== id)
            : [...s.selectedComponents, id],
        })),

      // 공통
      resetWizard: () => set(DEFAULT_STATE),
    }),
    {
      name: "design-wizard-state",
      version: 3,
      migrate: () => DEFAULT_STATE,
    },
  ),
);
