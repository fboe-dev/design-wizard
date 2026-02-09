import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@libs/utils";

interface Step {
  path: string;
  label: string;
  step: number;
}

interface StepNavigationProps {
  steps: Step[];
  current: number;
}

export function StepNavigation({ steps, current }: StepNavigationProps) {
  const navigate = useNavigate();
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  return (
    <div className="flex items-center justify-between">
      {/* 뒤로 */}
      <button
        onClick={() => {
          if (isFirst) {
            navigate("/");
          } else {
            navigate(steps[current - 1].path);
          }
        }}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "cursor-pointer text-muted-foreground",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        {isFirst ? "홈으로" : "이전"}
      </button>

      {/* 앞으로 */}
      {isLast ? (
        <button
          onClick={() => {
            // 생성 로직은 output 페이지에서 처리
          }}
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          <Sparkles className="h-4 w-4" />
          프롬프트 생성
        </button>
      ) : (
        <button
          onClick={() => navigate(steps[current + 1].path)}
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          다음
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
