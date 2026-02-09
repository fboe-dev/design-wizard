import { useWizardStore } from "@stores/useWizardStore";
import { OptionCard } from "../components/option-card";
import { PanelLeft, Monitor, Dock, Globe } from "lucide-react";
import type { AppShellLayout, PageLayout } from "../types";

// ── 네비게이션 유형 와이어프레임 ──
function SidebarPreview() {
  return (
    <div className="flex h-20 gap-1">
      <div className="w-6 rounded bg-foreground/15" />
      <div className="flex flex-1 flex-col gap-1">
        <div className="h-3 rounded bg-foreground/10" />
        <div className="flex-1 rounded bg-foreground/5" />
      </div>
    </div>
  );
}
function TopnavPreview() {
  return (
    <div className="flex h-20 flex-col gap-1">
      <div className="h-4 rounded bg-foreground/15" />
      <div className="flex-1 rounded bg-foreground/5" />
    </div>
  );
}
function DockPreview() {
  return (
    <div className="flex h-20 flex-col gap-1">
      <div className="flex-1 rounded bg-foreground/5" />
      <div className="mx-auto flex h-4 w-24 items-center justify-center gap-1 rounded-full bg-foreground/15">
        <div className="h-2 w-2 rounded-full bg-foreground/30" />
        <div className="h-2 w-2 rounded-full bg-foreground/30" />
        <div className="h-2 w-2 rounded-full bg-foreground/30" />
        <div className="h-2 w-2 rounded-full bg-foreground/30" />
      </div>
    </div>
  );
}
function LandingPreview() {
  return (
    <div className="flex h-20 flex-col gap-1">
      <div className="flex-1 rounded bg-foreground/5 flex flex-col items-center justify-center gap-1">
        <div className="h-3 w-20 rounded bg-foreground/15" />
        <div className="h-2 w-14 rounded bg-foreground/8" />
        <div className="mt-1 h-3 w-10 rounded-full bg-foreground/20" />
      </div>
    </div>
  );
}

// ── 페이지 레이아웃 와이어프레임 ──
// 1. 심플: 타이틀 + 설명 + 콘텐츠
function SimplePagePreview() {
  return (
    <div className="flex h-16 flex-col gap-0.5 p-1">
      <div className="h-2.5 w-14 rounded bg-foreground/20" />
      <div className="h-1.5 w-20 rounded bg-foreground/8" />
      <div className="mt-0.5 flex-1 rounded bg-foreground/5" />
    </div>
  );
}
// 2. 탭: 타이틀 + 설명 + 탭 + 콘텐츠
function TabPagePreview() {
  return (
    <div className="flex h-16 flex-col gap-0.5 p-1">
      <div className="h-2.5 w-14 rounded bg-foreground/20" />
      <div className="h-1.5 w-20 rounded bg-foreground/8" />
      <div className="mt-0.5 flex gap-0.5">
        <div className="h-2 w-6 rounded bg-foreground/20" />
        <div className="h-2 w-6 rounded bg-foreground/8" />
        <div className="h-2 w-6 rounded bg-foreground/8" />
      </div>
      <div className="flex-1 rounded bg-foreground/5" />
    </div>
  );
}
// 3. 측면 사이드바: 왼쪽 사이드바 + 오른쪽 심플페이지
function SidebarPagePreview() {
  return (
    <div className="flex h-16 gap-1 p-1">
      <div className="w-8 shrink-0 space-y-0.5 rounded bg-foreground/5 p-1">
        <div className="h-1.5 w-full rounded bg-foreground/20" />
        <div className="h-1.5 w-full rounded bg-foreground/10" />
        <div className="h-1.5 w-full rounded bg-foreground/10" />
        <div className="h-1.5 w-full rounded bg-foreground/10" />
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <div className="h-2 w-12 rounded bg-foreground/15" />
        <div className="h-1.5 w-16 rounded bg-foreground/8" />
        <div className="flex-1 rounded bg-foreground/5" />
      </div>
    </div>
  );
}
// 4. 대시보드 그리드
function DashboardGridPreview() {
  return (
    <div className="flex h-16 flex-col gap-0.5 p-1">
      <div className="h-2.5 w-14 rounded bg-foreground/20" />
      <div className="mt-0.5 grid flex-1 grid-cols-3 gap-0.5">
        <div className="rounded bg-foreground/10" />
        <div className="rounded bg-foreground/10" />
        <div className="rounded bg-foreground/10" />
        <div className="col-span-2 rounded bg-foreground/6" />
        <div className="rounded bg-foreground/6" />
      </div>
    </div>
  );
}

const NAV_TYPES: {
  value: AppShellLayout;
  title: string;
  description: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
}[] = [
  {
    value: "sidebar",
    title: "사이드바",
    description: "좌측 사이드바 + 콘텐츠 영역. 가장 일반적인 대시보드 레이아웃",
    icon: <PanelLeft className="h-5 w-5" />,
    preview: <SidebarPreview />,
  },
  {
    value: "topnav",
    title: "탑 네비게이션",
    description: "상단 네비게이션 바 + 콘텐츠 영역. 마케팅/콘텐츠 사이트에 적합",
    icon: <Monitor className="h-5 w-5" />,
    preview: <TopnavPreview />,
  },
  {
    value: "dock",
    title: "Dock",
    description: "하단 Dock 네비게이션. 모바일 또는 미니멀 앱에 적합",
    icon: <Dock className="h-5 w-5" />,
    preview: <DockPreview />,
  },
  {
    value: "landing",
    title: "랜딩페이지",
    description: "네비게이션 없이 풀스크린 콘텐츠. 랜딩/프로모션 페이지에 적합",
    icon: <Globe className="h-5 w-5" />,
    preview: <LandingPreview />,
  },
];

const PAGE_LAYOUTS: {
  value: PageLayout;
  title: string;
  description: string;
  preview: React.ReactNode;
}[] = [
  {
    value: "simple-page",
    title: "심플 페이지",
    description: "타이틀 + 설명 + 콘텐츠 영역. 가장 기본적인 구성",
    preview: <SimplePagePreview />,
  },
  {
    value: "tab-page",
    title: "탭 페이지",
    description: "타이틀 + 설명 + 탭 네비게이션 + 콘텐츠 영역",
    preview: <TabPagePreview />,
  },
  {
    value: "sidebar-page",
    title: "사이드바 페이지",
    description: "좌측 서브 메뉴 + 우측 심플 페이지 구성. 설정 화면에 적합",
    preview: <SidebarPagePreview />,
  },
  {
    value: "dashboard-grid",
    title: "대시보드 그리드",
    description: "통계 카드와 위젯을 그리드로 배치하는 대시보드",
    preview: <DashboardGridPreview />,
  },
];

export default function LayoutStepPage() {
  const { appShellLayout, setAppShellLayout, pageLayout, setPageLayout } =
    useWizardStore();

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 space-y-10">
      {/* 네비게이션 유형 */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">네비게이션 유형</h2>
          <p className="text-sm text-muted-foreground">
            앱의 기본 네비게이션 구조를 선택하세요
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NAV_TYPES.map((nav) => (
            <OptionCard
              key={nav.value}
              selected={appShellLayout === nav.value}
              onClick={() => setAppShellLayout(nav.value)}
              title={nav.title}
              description={nav.description}
              icon={nav.icon}
              preview={nav.preview}
            />
          ))}
        </div>
      </section>

      {/* 페이지 레이아웃 */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">페이지 레이아웃</h2>
          <p className="text-sm text-muted-foreground">
            페이지 내부 콘텐츠의 기본 구성을 선택하세요
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAGE_LAYOUTS.map((layout) => (
            <OptionCard
              key={layout.value}
              selected={pageLayout === layout.value}
              onClick={() => setPageLayout(layout.value)}
              title={layout.title}
              description={layout.description}
              preview={layout.preview}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
