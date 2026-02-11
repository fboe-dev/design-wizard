import type { WizardState, GeneratedPrompt } from "../../types";

export function generateDesignSystemPrompt(state: WizardState): GeneratedPrompt {
  const { color, font, typography, spacing, radius } = state;

  // oklch 팔레트 계산
  const h = color.primaryHue;
  const c = color.primaryChroma;
  const l = color.primaryLightness;

  // 타이포그래피 스케일 생성
  const typographyScale = buildTypographyScale(typography);
  const spacingScale = buildSpacingScale(spacing);
  const radiusScale = buildRadiusScale(radius);

  return {
    id: "design-system",
    title: "디자인 시스템 (CSS + 토큰)",
    description: "app.css, 컬러 팔레트, 타이포그래피, 스페이싱, 라운딩 토큰을 생성합니다",
    order: 2,
    content: `# 디자인 시스템 구현

## 목표
oklch 기반 컬러 시스템과 디자인 토큰을 포함하는 app.css를 구현하세요.

## app.css 요구사항

### 폰트
- 폰트: **${font.fontFamily}**
- CDN: \`${font.fontCdnUrl}\`
- @import로 상단에 포함

### Tailwind CSS v4 설정
\`\`\`css
@import "tailwindcss";
@import "tw-animate-css";
@custom-variant dark (&:is(.dark *));
\`\`\`

### @theme 블록
\`--font-sans\`에 "${font.fontFamily}"을 첫 번째로 지정하고, 시스템 폰트 fallback을 추가하세요.

### @theme inline 블록
shadcn/ui 호환을 위한 CSS 변수 매핑:
- \`--color-background: var(--background)\`
- \`--color-foreground: var(--foreground)\`
- \`--color-primary: var(--primary)\`
- (전체 shadcn 토큰 매핑)
- radius: sm, md, lg, xl

### :root (Light 모드) 컬러 토큰
oklch 기반으로 다음 토큰을 생성하세요:

| 토큰 | 값 |
|------|-----|
| --background | oklch(1 0 0) |
| --foreground | oklch(0.141 0.005 ${h}) |
| --primary | oklch(${l} ${c} ${h}) |
| --primary-foreground | oklch(0.97 0.014 ${h}) |
| --secondary | oklch(0.967 0.001 ${h}) |
| --secondary-foreground | oklch(0.21 0.006 ${h}) |
| --muted | oklch(0.967 0.001 ${h}) |
| --muted-foreground | oklch(0.552 0.016 ${h}) |
| --accent | oklch(0.967 0.001 ${h}) |
| --accent-foreground | oklch(0.21 0.006 ${h}) |
| --destructive | oklch(0.577 0.245 27.325) |
| --border | oklch(0.92 0.004 ${h}) |
| --input | oklch(0.92 0.004 ${h}) |
| --ring | oklch(${l} ${c} ${h}) |
| --radius | ${radius.baseRadius}rem |

### .dark 모드 컬러 토큰
Light 토큰의 lightness를 반전시킨 Dark 모드 버전:
- --background: 어둡게 (0.141)
- --foreground: 밝게 (0.985)
- --primary: lightness를 약간 낮춤 (${Math.max(l - 0.08, 0.4)})
- --border: oklch(1 0 0 / 10%)
- --input: oklch(1 0 0 / 15%)

### sidebar 토큰
sidebar-*, sidebar-primary-*, sidebar-accent-*, sidebar-border, sidebar-ring 토큰도 포함하세요.
primary와 동일한 hue를 사용합니다.

### @layer base
\`\`\`css
@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
\`\`\`

## 타이포그래피 스케일
${typographyScale}

## 스페이싱 스케일
${spacingScale}

## 라운딩 스케일
${radiusScale}

## Typography 컴포넌트 (\`app/shared/components/typography.tsx\`)
연속 스케일 기반의 Typography 컴포넌트를 구현하세요:

### Typography
- props: \`size\` (${buildSizeLabels()})
- 기본값: "base"
- cva 패턴 사용
- \`weight\` prop: "normal" | "medium" | "semibold" | "bold"
- \`muted\` prop: text-muted-foreground 적용
- \`as\` prop: HTML 태그 변경 (기본값 size에 따라 자동 결정 — xl 이상은 h 태그, base 이하는 p/span)
`,
  };
}

const FIXED_LABELS = ["2xl", "xl", "lg", "base", "sm", "xs"];

const TW_SIZES_GEN: Record<string, number> = {
  xs: 0.75, sm: 0.875, base: 1, lg: 1.125,
  xl: 1.25, "2xl": 1.5, "3xl": 1.875, "4xl": 2.25,
  "5xl": 3,
};

function buildTypographyScale(t: { baseSize: number; scaleRatio: number }): string {
  const sizeMultiplier = t.baseSize / 16;
  return FIXED_LABELS.map((label) => {
    const defaultRem = TW_SIZES_GEN[label] ?? 1;
    const size = Math.round(sizeMultiplier * Math.pow(defaultRem, t.scaleRatio) * 16);
    const weight = label === "2xl" ? 800 : label === "xl" ? 700 : label === "lg" ? 600 : 400;
    return `- ${label}: ${size}px (font-weight: ${weight})`;
  }).join("\n");
}

function buildSizeLabels(): string {
  return FIXED_LABELS.map((l) => `"${l}"`).join(" | ");
}

function buildSpacingScale(s: { baseUnit: number }): string {
  const tokens = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40];
  const lines = tokens.map((t) => `- spacing-${t}: ${Math.round(s.baseUnit * t * 10) / 10}px`);
  lines.unshift(`- --spacing: ${(s.baseUnit / 16).toFixed(4)}rem (${s.baseUnit}px)`);
  return lines.join("\n");
}

function buildRadiusScale(r: { baseRadius: number; levels: number }): string {
  return `- radius-sm: ${(r.baseRadius * 0.5).toFixed(2)}rem
- radius-md: ${(r.baseRadius * 0.75).toFixed(2)}rem
- radius-lg: ${r.baseRadius.toFixed(2)}rem
- radius-xl: ${(r.baseRadius * 1.5).toFixed(2)}rem
- radius-full: 9999px`;
}
