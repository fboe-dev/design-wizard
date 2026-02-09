import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Moon, Sun } from "lucide-react";
import { usePreviewUI } from "@stores/useWizardStore";
import { StepIndicator } from "./step-indicator";
import { StepNavigation } from "./step-navigation";

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
      {/* 헤더: 스텝 인디케이터 + 다크모드 토글 + 네비게이션 */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <StepIndicator steps={STEPS} current={current} />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePreviewDark}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              title="다크모드"
            >
              {previewDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <StepNavigation steps={STEPS} current={current} />
          </div>
        </div>
      </header>

      {/* 컨텐츠 영역 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
