import type { WizardState, GeneratedPrompt } from "../../types";

export function generateLayoutPrompt(state: WizardState): GeneratedPrompt {
  const { appShellLayout, pageLayout, font } = state;

  const shellInstructions = getShellInstructions(appShellLayout);
  const pageInstructions = getPageInstructions(pageLayout);

  const navLabel = appShellLayout === "landing" ? "랜딩페이지 (네비게이션 없음)" : appShellLayout;

  return {
    id: "layout",
    title: "레이아웃 시스템",
    description: `${navLabel} 네비게이션 + ${pageLayout} 페이지 레이아웃을 생성합니다`,
    order: 3,
    content: `# 레이아웃 시스템 구현

## 목표
네비게이션 유형(${navLabel})과 페이지 레이아웃(${pageLayout})을 구현하세요.

## root.tsx
\`\`\`
- <html lang="ko"> 에 dark 클래스 토글 지원
- <head>에 charset, viewport, Meta, Links
- <body>에 <Outlet />, <Toaster />, <ScrollRestoration />, <Scripts />
- 폰트 CDN: ${font.fontCdnUrl}
\`\`\`

## 네비게이션 유형: ${navLabel}
${shellInstructions}

## 페이지 레이아웃: ${pageLayout}
${pageInstructions}

## 다크모드 지원
- \`ThemeToggle\` 컴포넌트를 구현하세요 (\`app/shared/components/theme-toggle.tsx\`)
- html 요소의 className에 "dark" 추가/제거
- localStorage에 theme 설정 저장
- 헤더 영역에 ThemeToggle 배치

## routes.ts 구조
\`\`\`typescript
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("shared/layouts/${appShellLayout}-layout.tsx", [
    index("routes/home-page.tsx"),
    route("design-system", "routes/design-system-page.tsx"),
  ]),
  route("*", "routes/not-found-page.tsx"),
] satisfies RouteConfig;
\`\`\`

## 홈 페이지 (\`routes/home-page.tsx\`)
- "${pageLayout}" 레이아웃을 사용하는 기본 홈 페이지
- 간단한 환영 메시지와 디자인 시스템 페이지로의 링크 포함
`,
  };
}

function getShellInstructions(layout: string): string {
  switch (layout) {
    case "sidebar":
      return `### 사이드바 레이아웃 (\`app/shared/layouts/sidebar-layout.tsx\`)
- shadcn Sidebar 패턴 기반
- 좌측 260px 사이드바 + 우측 메인 콘텐츠
- 사이드바 구성:
  - 상단: 앱 로고/이름
  - 중앙: 네비게이션 메뉴 (collapsible 그룹 지원)
  - 하단: 유저 정보 영역 + ThemeToggle
- 메인 영역 상단에 breadcrumb + 페이지 제목
- 모바일: Sheet 기반 오버레이 사이드바
- SidebarProvider, SidebarTrigger 패턴 사용
- 사이드바 접기/펴기(collapse) 지원`;

    case "topnav":
      return `### 탑 네비게이션 레이아웃 (\`app/shared/layouts/topnav-layout.tsx\`)
- 상단 고정 네비게이션 바 (h-16, border-bottom)
- 네비게이션 바 구성:
  - 좌측: 앱 로고/이름
  - 중앙: Navigation Menu (수평 메뉴 아이템들)
  - 우측: ThemeToggle + 유저 메뉴 (DropdownMenu)
- 하단에 메인 콘텐츠 영역 (max-w-7xl 센터 정렬)
- 모바일: 햄버거 메뉴 → Sheet으로 네비게이션 펼침`;

    case "dock":
      return `### Dock 레이아웃 (\`app/shared/layouts/dock-layout.tsx\`)
- 메인 콘텐츠가 전체 영역 차지
- 하단에 Dock 바 (고정, 가운데 정렬)
- Dock 구성:
  - 아이콘 기반 네비게이션 (4~6개)
  - 활성 탭 하이라이트 (배경색 또는 인디케이터)
  - Tooltip으로 라벨 표시
- 상단에 미니 헤더 (앱 이름 + ThemeToggle)
- 모바일 퍼스트 디자인`;

    case "landing":
      return `### 랜딩페이지 레이아웃 (\`app/shared/layouts/landing-layout.tsx\`)
- 네비게이션 없이 풀스크린 콘텐츠 영역
- 상단에 미니 헤더 (로고 + CTA 버튼만)
- 히어로 섹션: 큰 타이틀 + 서브 텍스트 + CTA 버튼 그룹
- 특징/장점 카드 섹션 (grid 레이아웃)
- 하단 Footer 포함 가능
- 반응형: 모바일에서도 자연스러운 풀스크린 레이아웃`;

    default:
      return "";
  }
}

function getPageInstructions(layout: string): string {
  switch (layout) {
    case "simple-page":
      return `### 심플 페이지 (\`app/shared/layouts/simple-page-layout.tsx\`)
- 구조: 타이틀 + 설명 + 콘텐츠 영역
- PageHeader: 제목(h1) + 설명(p) + 선택적 우측 액션 버튼 영역
- 하단에 children으로 콘텐츠 렌더링
- max-w 제한 + 적절한 수직 패딩`;

    case "tab-page":
      return `### 탭 페이지 (\`app/shared/layouts/tab-page-layout.tsx\`)
- 구조: 타이틀 + 설명 + 탭 네비게이션 + 콘텐츠 영역
- PageHeader: 제목(h1) + 설명(p)
- Tabs 컴포넌트 (shadcn): 수평 탭 바로 섹션 구분
- 각 탭 콘텐츠는 children으로 전달
- URL searchParams와 탭 동기화`;

    case "sidebar-page":
      return `### 사이드바 페이지 (\`app/shared/layouts/sidebar-page-layout.tsx\`)
- 좌측에 서브 네비게이션 사이드바 (w-56, 메뉴 링크 목록)
- 우측은 심플 페이지 구성 (타이틀 + 설명 + 콘텐츠 영역)
- 설정, 계정 관리 등 카테고리별 콘텐츠에 적합
- 모바일: 상단 수평 탭으로 변환`;

    case "dashboard-grid":
      return `### 대시보드 그리드 (\`app/shared/layouts/dashboard-grid-layout.tsx\`)
- CSS Grid 기반 (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Card 컴포넌트와 조합하여 위젯 배치
- 통계 카드, 차트 영역, 최근 활동 목록 등의 영역 제공`;

    default:
      return "";
  }
}
