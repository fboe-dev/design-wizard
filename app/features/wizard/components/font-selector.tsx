import { useState } from "react";
import { cn } from "@libs/utils";
import { FONT_GROUPS } from "../constants";
import { Check } from "lucide-react";
import type { FontConfig } from "../types";

interface FontSelectorProps {
  value: FontConfig;
  onChange: (font: FontConfig) => void;
}

const WEIGHT_NAMES: Record<number, string> = {
  100: "Thin",
  200: "ExtraLight",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "SemiBold",
  700: "Bold",
  800: "ExtraBold",
  900: "Black",
  1000: "Ultra",
};

const DISPLAY_WEIGHTS = [300, 400, 600, 700];

export function FontSelector({ value, onChange }: FontSelectorProps) {
  // 현재 선택된 폰트가 속한 그룹을 기본 활성 그룹으로
  const initialGroup = FONT_GROUPS.find((g) =>
    g.fonts.some((f) => f.fontFamily === value.fontFamily),
  );
  const [activeGroupId, setActiveGroupId] = useState(initialGroup?.id ?? FONT_GROUPS[0].id);

  const activeGroup = FONT_GROUPS.find((g) => g.id === activeGroupId)!;

  return (
    <div className="space-y-3">
      {/* 언어 그룹 탭 */}
      <div className="flex flex-wrap gap-1.5">
        {FONT_GROUPS.map((group) => {
          const isActive = group.id === activeGroupId;
          const hasSelected = group.fonts.some((f) => f.fontFamily === value.fontFamily);
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroupId(group.id)}
              className={cn(
                "cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : hasSelected
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {group.label}
              {hasSelected && !isActive && (
                <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 그룹의 폰트 목록 */}
      <div className="space-y-2">
        {activeGroup.fonts.map((font) => {
          const selected = value.fontFamily === font.fontFamily;
          const weightRange = font.variable
            ? `${font.weights[0]}–${font.weights[font.weights.length - 1]}`
            : font.weights.join(", ");
          return (
            <button
              key={font.fontFamily}
              type="button"
              onClick={() => onChange({ fontFamily: font.fontFamily, fontCdnUrl: font.fontCdnUrl })}
              className={cn(
                "w-full cursor-pointer rounded-lg border p-4 text-left transition-colors",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{font.fontFamily}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground/60 font-mono">
                    {font.variable ? `Variable ${weightRange}` : `Weights: ${weightRange}`}
                  </span>
                  {selected && <Check className="h-4 w-4 text-primary" />}
                </div>
              </div>
              <p className="mt-2 text-xl" style={{ fontFamily: font.fontFamily }}>
                {font.specimen}
              </p>
              <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                {DISPLAY_WEIGHTS.map((w) => {
                  const closest = font.weights.reduce((prev, curr) =>
                    Math.abs(curr - w) < Math.abs(prev - w) ? curr : prev,
                  );
                  return (
                    <span
                      key={w}
                      style={{ fontFamily: font.fontFamily, fontWeight: closest }}
                    >
                      {WEIGHT_NAMES[closest] ?? closest}({closest})
                    </span>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
