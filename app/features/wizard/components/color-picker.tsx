import { cn } from "@libs/utils";
import { COLOR_PRESETS } from "../constants";
import { Check } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@components/shadcn/tooltip";
import type { ColorConfig } from "../types";

interface ColorPickerProps {
  value: ColorConfig;
  onChange: (color: Partial<ColorConfig>) => void;
}

function oklchToCSS(l: number, c: number, h: number) {
  return `oklch(${l} ${c} ${h})`;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const isSelected = (preset: (typeof COLOR_PRESETS)[number]) =>
    value.primaryHue === preset.hue &&
    value.primaryChroma === preset.chroma &&
    value.primaryLightness === preset.lightness;

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Light/Dark 미리보기 — 상단 배치 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Light</p>
            <div className="rounded-lg border border-border bg-white p-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-md"
                  style={{
                    backgroundColor: oklchToCSS(
                      value.primaryLightness,
                      value.primaryChroma,
                      value.primaryHue,
                    ),
                  }}
                />
                <div className="space-y-1">
                  <div className="h-2 w-20 rounded bg-gray-900" />
                  <div className="h-2 w-32 rounded bg-gray-400" />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <div
                  className="rounded-md px-3 py-1 text-xs font-medium text-white"
                  style={{
                    backgroundColor: oklchToCSS(
                      value.primaryLightness,
                      value.primaryChroma,
                      value.primaryHue,
                    ),
                  }}
                >
                  Primary
                </div>
                <div className="rounded-md border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  Secondary
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Dark</p>
            <div className="rounded-lg border border-white/10 bg-gray-950 p-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-md"
                  style={{
                    backgroundColor: oklchToCSS(
                      Math.min(value.primaryLightness + 0.1, 0.85),
                      value.primaryChroma,
                      value.primaryHue,
                    ),
                  }}
                />
                <div className="space-y-1">
                  <div className="h-2 w-20 rounded bg-white" />
                  <div className="h-2 w-32 rounded bg-gray-500" />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <div
                  className="rounded-md px-3 py-1 text-xs font-medium text-white"
                  style={{
                    backgroundColor: oklchToCSS(
                      Math.min(value.primaryLightness + 0.1, 0.85),
                      value.primaryChroma,
                      value.primaryHue,
                    ),
                  }}
                >
                  Primary
                </div>
                <div className="rounded-md border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-gray-300">
                  Secondary
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 프리셋 컬러 칩 */}
        <div className="flex flex-wrap gap-3">
          {COLOR_PRESETS.map((preset) => (
            <Tooltip key={preset.name}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      primaryHue: preset.hue,
                      primaryChroma: preset.chroma,
                      primaryLightness: preset.lightness,
                    })
                  }
                  className={cn(
                    "group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all",
                    "ring-offset-2 ring-offset-background hover:scale-110",
                    isSelected(preset) && "ring-2 ring-primary",
                  )}
                  style={{
                    backgroundColor: oklchToCSS(
                      preset.lightness,
                      preset.chroma,
                      preset.hue,
                    ),
                  }}
                >
                  {isSelected(preset) && (
                    <Check className="h-4 w-4 text-white drop-shadow-sm" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>{preset.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
