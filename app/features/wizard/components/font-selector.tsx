import { useState } from "react";
import { cn } from "@libs/utils";
import { FONT_GROUPS } from "../constants";
import { Check } from "lucide-react";
import { ScrollArea } from "@shadcn/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/select";
import type { FontConfig } from "../types";

interface FontSelectorProps {
  value: FontConfig;
  onChange: (font: FontConfig) => void;
  onLanguageChange?: (languageId: string) => void;
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

export function FontSelector({ value, onChange, onLanguageChange }: FontSelectorProps) {
  // 현재 선택된 폰트가 속한 그룹을 기본 활성 그룹으로
  const initialGroup = FONT_GROUPS.find((g) =>
    g.fonts.some((f) => f.fontFamily === value.fontFamily),
  );
  const [activeGroupId, setActiveGroupId] = useState(initialGroup?.id ?? FONT_GROUPS[0].id);

  const activeGroup = FONT_GROUPS.find((g) => g.id === activeGroupId)!;

  function handleGroupChange(groupId: string) {
    setActiveGroupId(groupId);
    onLanguageChange?.(groupId);
  }

  return (
    <div className="space-y-3">
      {/* 언어 그룹 Select 드롭다운 */}
      <Select value={activeGroupId} onValueChange={handleGroupChange}>
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FONT_GROUPS.map((group) => {
            const hasSelected = group.fonts.some((f) => f.fontFamily === value.fontFamily);
            return (
              <SelectItem key={group.id} value={group.id}>
                <span className="flex items-center gap-2">
                  <span>{group.flag}</span>
                  {group.label}
                  {hasSelected && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* 선택된 그룹의 폰트 목록 — 고정 높이 ScrollArea + 외곽선 */}
      <ScrollArea className="h-[360px] border border-muted rounded-lg">
      <div className="space-y-2 p-3">
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
      </ScrollArea>
    </div>
  );
}
