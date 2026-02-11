import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Moon, Sun } from "lucide-react";
import { usePreviewUI } from "@stores/useWizardStore";
import { StepIndicator } from "./step-indicator";
import { FloatingNavigation } from "./floating-navigation";
import appIconUrl from "~/assets/app-icon.png";

const STEPS = [
  { path: "/wizard/layout",     label: "레이아웃",     step: 1 },
  { path: "/wizard/primitives", label: "디자인 프리미티브", step: 2 },
  { path: "/wizard/components", label: "컴포넌트",     step: 3 },
  { path: "/wizard/output",     label: "생성",         step: 4 },
];

export default function WizardShell() {
  const { pathname } = useLocation();
  const currentIndex = STEPS.findIndex((s) => pathname.startsWith(s.path));
  const current = currentIndex === -1 ? 0 : currentIndex;
  const { previewDark, togglePreviewDark } = usePreviewUI();

  // 시스템 전체 다크모드: <html>에 dark 클래스 토글
  useEffect(() => {
    document.documentElement.classList.toggle("dark", previewDark);
  }, [previewDark]);

  return (
    <div className="flex min-h-dvh flex-col">
      {/* 헤더: 브랜드 + StepIndicator + 다크모드 토글 */}
      <header className="sticky top-0 z-50 h-14 border-b border-border/50 bg-background/95 shadow-sm backdrop-blur-md">
        <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 px-6">
          {/* 좌: 브랜드 (로고 + 텍스트) */}
          <Link to="/" className="flex items-center gap-2">
            <img src={appIconUrl} alt="Design Wizard" className="h-8 w-8" />
            <span className="hidden text-sm font-bold text-foreground sm:inline">
              Design Wizard
            </span>
          </Link>

          {/* 중앙: StepIndicator */}
          <div className="flex items-center justify-center">
            <StepIndicator steps={STEPS} current={current} />
          </div>

          {/* 우: 다크모드 토글 */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={togglePreviewDark}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              title="다크모드"
            >
              {previewDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* 컨텐츠 영역 */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 플로팅 네비게이션 */}
      <FloatingNavigation steps={STEPS} current={current} />
    </div>
  );
}
