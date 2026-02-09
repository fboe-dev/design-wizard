import { cn } from "@libs/utils";
import { Check } from "lucide-react";

interface Step {
  path: string;
  label: string;
  step: number;
}

interface StepIndicatorProps {
  steps: Step[];
  current: number;
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step.path} className="flex items-center gap-2">
          {/* 스텝 원 */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                i < current && "bg-primary text-primary-foreground",
                i === current && "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
                i > current && "bg-muted text-muted-foreground",
              )}
            >
              {i < current ? <Check className="h-4 w-4" /> : step.step}
            </div>
            <span
              className={cn(
                "hidden text-sm font-medium sm:inline",
                i === current ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </div>

          {/* 연결선 */}
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-px w-8 sm:w-12",
                i < current ? "bg-primary" : "bg-border",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
