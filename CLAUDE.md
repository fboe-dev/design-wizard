# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev          # 개발 서버 (0.0.0.0:5178, strict port)
npm run build        # 프로덕션 빌드 (react-router build)
npm run typecheck    # 타입 체크 (react-router typegen && tsc)
```

### E2E 테스트 (Playwright)

테스트 파일은 `docs/features/*/tests/*.spec.ts`에 위치. 개발 서버(`npm run dev`)가 실행 중이어야 함.

```bash
npx playwright test                                          # 전체 E2E 테스트
npx playwright test docs/features/01_primitives-ux/tests/    # 특정 기능 테스트
npx playwright test --headed                                 # 브라우저 표시
```

## 아키텍처

Design Wizard는 **클로드 서브에이전트용 프롬프트 세트**를 생성하는 웹 앱. 코드나 ZIP이 아닌, 4단계 위저드를 통해 디자인 시스템을 설정하면 클로드에게 순서대로 전달할 프롬프트가 출력됨.

### 기술 스택

React 19 + React Router v7 + Tailwind CSS v4 + Vite 6 + TypeScript. 상태 관리는 Zustand `persist` 미들웨어 (localStorage). 애니메이션은 Motion (Framer Motion 후속). 리사이즈 패널은 react-resizable-panels.

### 경로 별칭 (tsconfig)

| 별칭 | 경로 |
|------|------|
| `@shared/*` | `app/shared/*` |
| `@components/*` | `app/shared/components/*` |
| `@shadcn/*` | `app/shared/components/shadcn/*` |
| `@custom/*` | `app/shared/components/custom/*` |
| `@hooks/*` | `app/shared/hooks/*` |
| `@libs/*` | `app/shared/libs/*` |
| `@stores/*` | `app/shared/stores/*` |
| `~/*` | `app/*` |

### 위저드 흐름

| 단계 | 라우트 | 페이지 | 역할 |
|------|--------|--------|------|
| 1 | `/wizard/layout` | `layout-step-page.tsx` | 앱 셸 (sidebar/topnav/dock/landing) + 페이지 레이아웃 선택 |
| 2 | `/wizard/primitives` | `primitives-step-page.tsx` | 폰트, 컬러(oklch), 타이포, 스페이싱, 라운딩, 디자인 스타일, 플랫폼 |
| 3 | `/wizard/components` | `components-step-page.tsx` | 6개 카테고리 60개 컴포넌트 선택 |
| 4 | `/wizard/output` | `output-step-page.tsx` | 생성된 프롬프트 확인 및 복사 |

모든 위저드 라우트는 `wizard-shell.tsx` 레이아웃 하위에 중첩 (`routes.ts`에서 `layout()` + `prefix("wizard")` 사용). 스텝 인디케이터 헤더와 시스템 전체 다크모드 토글 제공.

### 주요 디렉토리

- **`app/features/wizard/`** — 위저드 기능 모듈 (pages, components, services, types, constants)
- **`app/features/wizard/services/generators/`** — 프롬프트 생성기. 각 생성기는 마크다운 내용이 담긴 `GeneratedPrompt`를 반환
- **`app/features/wizard/constants.ts`** — 폰트 그룹 (21개 폰트, 6개 언어 그룹), 스페이싱 프리셋 (6단계 밀도), 컬러 프리셋, 컴포넌트 카탈로그 (6그룹 60개)
- **`app/shared/stores/useWizardStore/`** — Zustand persist 스토어 + 프리뷰 UI 스토어
- **`app/shared/components/shadcn/`** — shadcn/ui 컴포넌트 (Radix UI 기반)
- **`docs/features/`** — 기능별 계획서, Playwright E2E 테스트, 테스트 결과 스크린샷

### 상태 관리

**`useWizardStore`** — Zustand persist (이름: `design-wizard-state`, 현재 버전: **4**). 마이그레이션은 핵 전략 (항상 `DEFAULT_STATE`로 리셋). 리셋용 `DEFAULT_STATE` export.

주요 상태:
- Step 1: `appShellLayout` (sidebar/topnav/dock/landing), `pageLayout` (simple-page/tab-page/sidebar-page/dashboard-grid)
- Step 2: `font`, `typography` (baseSize, scaleRatio), `spacing` (baseUnit), `radius` (baseRadius, levels), `color` (primaryHue/Chroma/Lightness, neutralBase), `designStyle` (standard/flat/lineless), `platformTarget` (web/tablet/mobile), `selectedDevice`
- Step 3: `selectedComponents` (string[])

**`usePreviewUI`** — 별도 비영속 스토어. `previewDark` 토글 (다크모드 미리보기용). `wizard-shell.tsx`에서 `<html>` 클래스 토글에 사용.

### 프롬프트 생성 파이프라인

`code-generator.ts`가 5개 생성기를 순서대로 조합:
1. **Config** (`config-generator.ts`) — package.json, tsconfig, vite.config. 선택된 컴포넌트에서 필요한 Radix 패키지를 자동 해석
2. **Design System** (`css-generator.ts`) — app.css, oklch 팔레트, 타이포/스페이싱/라운딩 스케일, light/dark 토큰
3. **Layout** (`layout-generator.ts`) — root.tsx, 앱 셸 컴포넌트, ThemeToggle
4. **Components** (`component-generator.ts`) — 선택된 컴포넌트를 카테고리별로 그룹화한 프롬프트 (배열 반환). 의존성 자동 해석 + 레이아웃 필수 컴포넌트 자동 포함
5. **Preview Page** (`preview-generator.ts`) — /design-system 쇼케이스 라우트

### 라이브 프리뷰

`live-preview.tsx` (~960줄)는 Step 2에서 실시간 미리보기를 제공. 핵심 구조:
- **플랫폼 목업**: Web(macOS 윈도우), Tablet(iPad), Mobile(iPhone) 디바이스 프레임
- **앱 셸 구현**: SidebarShell, TopnavShell, DockShell, LandingShell 각각 완전 구현
- **페이지 레이아웃**: SimplePageContent, TabPageContent, SidebarPageContent, DashboardGridContent
- **디자인 스타일**: standard/flat/lineless에 따라 그림자, 테두리, 배경 변형
- **자동 스케일링**: ResizeObserver + CSS `scale()` transform으로 컨테이너에 맞춤
- `usePreviewTokens` 훅이 상태에서 oklch CSS 변수를 실시간 계산하여 `style` prop으로 주입

### 디자인 토큰 시스템

컬러는 **oklch** 색공간 사용. Primary 컬러는 hue(0-360°), chroma(0-0.3), lightness(0-1)로 정의. 다크모드는 lightness를 반전. 타이포그래피는 base size × scale ratio로 연속 스케일(xs→5xl) 계산. 스페이싱은 base unit에 고정 Tailwind 토큰(1,2,3...40)을 곱함.

### 스타일링 규칙

- Tailwind CSS v4, `@custom-variant dark (&:is(.dark *))` 클래스 기반 다크모드
- `cn()` 유틸리티 (`@libs/utils`, clsx + tailwind-merge)
- CVA (class-variance-authority)로 컴포넌트 variant 관리
- `app.css`에 shadcn/ui 호환 CSS 변수 테마 (`@theme inline` 블록으로 Tailwind v4에 매핑)
- 다크모드는 `<html>` 요소에 `.dark` 클래스 토글

### 언어

UI 텍스트는 한국어. 코드 주석은 한국어/영어 혼용.
