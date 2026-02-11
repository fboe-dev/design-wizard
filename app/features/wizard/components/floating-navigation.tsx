import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@libs/utils";

interface Step {
  path: string;
  label: string;
  step: number;
}

interface FloatingNavigationProps {
  steps: Step[];
  current: number;
}

export function FloatingNavigation({ steps, current }: FloatingNavigationProps) {
  const navigate = useNavigate();
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  return (
    <div className="fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/50 bg-card/80 p-1.5 shadow-lg backdrop-blur-lg">
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={() => {
          if (isFirst) {
            navigate("/");
          } else {
            navigate(steps[current - 1].path);
          }
        }}
        className={cn(
          "inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
        )}
        aria-label={isFirst ? "홈으로" : "이전 단계"}
        title={isFirst ? "홈으로" : "이전"}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* 다음 버튼 */}
      {isLast ? (
        <button
          type="button"
          onClick={() => {
            // 생성 로직은 output 페이지에서 처리
          }}
          className={cn(
            "inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
          aria-label="프롬프트 생성"
          title="프롬프트 생성"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate(steps[current + 1].path)}
          className={cn(
            "inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
          aria-label="다음 단계"
          title="다음"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
