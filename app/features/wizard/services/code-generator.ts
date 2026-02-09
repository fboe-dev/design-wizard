import type { WizardState, GeneratedOutput, GeneratedPrompt } from "../types";
import { generateDesignSystemPrompt } from "./generators/css-generator";
import { generateLayoutPrompt } from "./generators/layout-generator";
import { generateComponentPrompts } from "./generators/component-generator";
import { generateConfigPrompt } from "./generators/config-generator";

/**
 * 위저드 상태를 기반으로 클로드 서브에이전트용 프롬프트 세트를 생성합니다.
 * 각 프롬프트는 독립적으로 실행 가능하며, 순서(order)에 따라 실행됩니다.
 */
export function generatePrompts(state: WizardState): GeneratedOutput {
  const prompts: GeneratedPrompt[] = [];

  // 1. 프로젝트 설정 프롬프트 (package.json, tsconfig, vite.config 등)
  prompts.push(generateConfigPrompt(state));

  // 2. 디자인 시스템 프롬프트 (app.css, 컬러 팔레트, 타이포그래피, 스페이싱)
  prompts.push(generateDesignSystemPrompt(state));

  // 3. 레이아웃 프롬프트 (root.tsx, app shell, page layout)
  prompts.push(generateLayoutPrompt(state));

  // 4. 컴포넌트 프롬프트들 (카테고리별로 그룹화)
  prompts.push(...generateComponentPrompts(state));

  // 5. 디자인 시스템 미리보기 페이지 프롬프트
  prompts.push(generatePreviewPagePrompt(state));

  // 순서 부여
  prompts.forEach((p, i) => (p.order = i + 1));

  const summary = buildSummary(state, prompts);

  return { prompts, summary };
}

function generatePreviewPagePrompt(state: WizardState): GeneratedPrompt {
  const componentList = state.selectedComponents.join(", ");

  return {
    id: "preview-page",
    title: "디자인 시스템 미리보기 페이지",
    description: "선택된 모든 컴포넌트를 쇼케이스하는 미리보기 페이지를 생성합니다",
    order: 0,
    content: `# 디자인 시스템 미리보기 페이지 구현

## 목표
선택된 모든 컴포넌트를 한 페이지에서 확인할 수 있는 디자인 시스템 쇼케이스 페이지를 구현하세요.

## 라우팅
- 경로: \`/design-system\`
- 파일: \`app/routes/design-system-page.tsx\`
- routes.ts에 추가: \`route("design-system", "routes/design-system-page.tsx")\`

## 페이지 구조
좌측에 컴포넌트 카테고리 네비게이션, 우측에 컴포넌트 예제를 보여주는 레이아웃입니다.

### 포함할 컴포넌트
${componentList}

### 각 컴포넌트 섹션
- 컴포넌트 이름과 간단한 설명
- 다양한 variant와 상태를 보여주는 실제 동작하는 예제
- Light/Dark 모드 모두 정상 표시 확인

### 상단 컬러 팔레트 섹션
- 현재 디자인 토큰의 모든 컬러를 시각적으로 표시
- primary, secondary, muted, accent, destructive 등

### 타이포그래피 섹션
- Title/Text 스케일을 시각적으로 표시
- 각 단계의 크기, 행간, 글꼴 무게 확인

## 기술 요구사항
- 모든 컴포넌트는 \`@components/\` 경로에서 import
- 실제 인터랙션이 동작해야 함 (Dialog 열기, Toast 표시, Toggle 전환 등)
- 반응형 레이아웃 (모바일에서는 세로 스택)
`,
  };
}

function buildSummary(state: WizardState, prompts: GeneratedPrompt[]): string {
  return `# Design Wizard 생성 요약

## 설정
- **App Shell**: ${state.appShellLayout}
- **Page Layout**: ${state.pageLayout}
- **Font**: ${state.font.fontFamily}
- **Primary Color**: oklch(${state.color.primaryLightness} ${state.color.primaryChroma} ${state.color.primaryHue})
- **Design Style**: ${state.designStyle}
- **Platform**: ${state.platformTarget}
- **Typography**: Base ${state.typography.baseSize}px, Scale ${state.typography.scaleRatio}
- **Spacing**: ${state.spacing.baseUnit}px base (--spacing: ${(state.spacing.baseUnit / 16).toFixed(4)}rem)
- **Radius**: ${state.radius.baseRadius}rem

## 선택된 컴포넌트 (${state.selectedComponents.length}개)
${state.selectedComponents.map((c) => `- ${c}`).join("\n")}

## 프롬프트 (${prompts.length}개)
${prompts.map((p) => `${p.order}. **${p.title}** — ${p.description}`).join("\n")}

## 실행 방법
1. 프로젝트 폴더를 생성합니다
2. 각 프롬프트를 순서대로 클로드에게 전달하여 실행합니다
3. 프롬프트 1번(프로젝트 설정)을 먼저 실행하고 \`npm install\`을 수행합니다
4. 나머지 프롬프트는 병렬로 실행 가능합니다 (단, 2번 디자인 시스템은 3번 이후보다 먼저)
5. 마지막으로 미리보기 페이지 프롬프트를 실행합니다
`;
}
