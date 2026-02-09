import { cn } from "@libs/utils";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  preview?: ReactNode;
  className?: string;
}

export function OptionCard({
  selected,
  onClick,
  title,
  description,
  icon,
  preview,
  className,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex cursor-pointer flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors",
        "hover:border-primary/50 hover:bg-accent/50",
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-card",
        className,
      )}
    >
      {/* 선택 표시 */}
      {selected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </div>
      )}

      {/* 미리보기 */}
      {preview && (
        <div className="w-full rounded-lg bg-muted/50 p-3">{preview}</div>
      )}

      {/* 아이콘 + 텍스트 */}
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <p className="text-sm font-semibold">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}
