import { cn } from "@libs/utils";
import { SPACING_PRESETS } from "../constants";

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  unit?: string;
  ticks?: number[];
}

function SliderRow({ label, value, min, max, step, onChange, unit = "", ticks }: SliderRowProps) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <label className="w-24 shrink-0 text-sm text-muted-foreground">{label}</label>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        />
        <span className="w-16 text-right text-sm font-medium tabular-nums">
          {value}{unit}
        </span>
      </div>
      {ticks && (
        <div className="flex gap-4">
          <div className="w-24 shrink-0" />
          <div className="flex flex-1 justify-between px-0.5">
            {ticks.map((t) => (
              <span key={t} className="text-[9px] text-muted-foreground/60">{t}</span>
            ))}
          </div>
          <div className="w-16 shrink-0" />
        </div>
      )}
    </div>
  );
}

// ── Tailwind v4 기본 폰트 크기 (rem) ──
const TW_SIZES: Record<string, number> = {
  xs: 0.75, sm: 0.875, base: 1, lg: 1.125,
  xl: 1.25, "2xl": 1.5, "3xl": 1.875, "4xl": 2.25,
  "5xl": 3,
};

// ── 타이포그래피 스케일 라벨 ──
const LABELS_UP = ["lg", "xl", "2xl", "3xl", "4xl", "5xl"];
const LABELS_DOWN = ["sm", "xs"];

// ── 타이포그래피 스케일 설정 ──
// 고정 범위: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
const FIXED_LABELS = ["5xl", "4xl", "3xl", "2xl", "xl", "lg", "base", "sm", "xs"];

interface TypographyConfigProps {
  baseSize: number;
  scaleRatio: number;
  onChange: (partial: Record<string, number>) => void;
}

export function TypographyConfig({
  baseSize,
  scaleRatio,
  onChange,
}: TypographyConfigProps) {
  const sizeMultiplier = baseSize / 16;
  const sizes = FIXED_LABELS.map((label) => {
    const defaultRem = TW_SIZES[label] ?? 1;
    return {
      label,
      size: sizeMultiplier * Math.pow(defaultRem, scaleRatio) * 16,
      isBase: label === "base",
    };
  });

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <SliderRow label="Base 크기" value={baseSize} min={12} max={20} step={1} onChange={(v) => onChange({ baseSize: v })} unit="px" ticks={[12, 14, 16, 18, 20]} />
        <SliderRow label="스케일 대비" value={scaleRatio} min={0.8} max={1.5} step={0.05} onChange={(v) => onChange({ scaleRatio: v })} ticks={[0.8, 1.0, 1.2, 1.5]} />
      </div>

      {/* 스케일 미리보기 */}
      <div className="rounded-lg border border-border p-4">
        <p className="mb-3 text-xs font-medium text-muted-foreground">스케일 미리보기</p>
        <div className="space-y-1">
          {sizes.map((s) => (
            <div key={s.label} className={cn("flex items-baseline gap-3", s.isBase && "bg-primary/5 -mx-2 px-2 py-1 rounded")}>
              <span className={cn("w-12 shrink-0 text-right text-xs font-mono", s.isBase ? "text-primary font-semibold" : "text-muted-foreground")}>
                {s.label}
              </span>
              <span
                className="truncate font-medium"
                style={{ fontSize: `${Math.round(s.size)}px` }}
              >
                디자인 시스템 Aa
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {Math.round(s.size)}px
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 스페이싱 설정 (밀도 프리셋) ──
interface SpacingConfigProps {
  baseUnit: number;
  onChange: (partial: Record<string, number>) => void;
}

const PREVIEW_TOKENS = [1, 2, 3, 4, 6, 8, 12, 16];

export function SpacingConfig({ baseUnit, onChange }: SpacingConfigProps) {
  const matchingPreset = SPACING_PRESETS.find((p) => Math.abs(p.baseUnit - baseUnit) < 0.05);

  return (
    <div className="space-y-4">
      {/* 밀도 프리셋 카드 */}
      <div className="grid grid-cols-2 gap-2">
        {SPACING_PRESETS.map((preset) => {
          const isSelected = matchingPreset?.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange({ baseUnit: preset.baseUnit })}
              className={cn(
                "cursor-pointer rounded-lg border p-3 text-left transition-colors",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{preset.label}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{preset.baseUnit}px</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">{preset.description}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground/60">{preset.products}</p>
              <div className="mt-2 flex items-center gap-1">
                {[1, 2, 4, 8].map((token) => (
                  <div
                    key={token}
                    className="h-2 rounded-sm bg-primary/20"
                    style={{ width: `${Math.round(token * preset.baseUnit)}px` }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* 미세 조정 */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">미세 조정</p>
        <SliderRow
          label="Base unit"
          value={Math.round(baseUnit * 10) / 10}
          min={2}
          max={8}
          step={0.1}
          onChange={(v) => onChange({ baseUnit: Math.round(v * 10) / 10 })}
          unit="px"
          ticks={[2, 3, 4, 5, 6, 7, 8]}
        />
      </div>

      {/* 스케일 미리보기 */}
      <div className="rounded-lg border border-border p-4">
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          스케일 미리보기 <span className="text-muted-foreground/60">— --spacing: {(baseUnit / 16).toFixed(4)}rem</span>
        </p>
        <div className="space-y-2">
          {PREVIEW_TOKENS.map((token) => {
            const px = Math.round(token * baseUnit * 10) / 10;
            return (
              <div key={token} className="flex items-center gap-3">
                <span className="w-8 shrink-0 text-right text-xs font-mono text-muted-foreground">
                  {token}
                </span>
                <div
                  className="h-3 rounded-sm bg-primary/20"
                  style={{ width: `${px}px` }}
                />
                <span className="text-xs text-muted-foreground">{px}px</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 라운딩 설정 ──
interface RadiusConfigProps {
  baseRadius: number;
  onChange: (partial: Record<string, number>) => void;
}

export function RadiusConfig({ baseRadius, onChange }: RadiusConfigProps) {
  const radiusLevels = [
    { label: "none", value: 0 },
    { label: "sm", value: Math.max(baseRadius - 0.25, 0) },
    { label: "base", value: baseRadius },
    { label: "md", value: baseRadius + 0.25 },
    { label: "lg", value: baseRadius + 0.5 },
    { label: "xl", value: baseRadius + 0.75 },
    { label: "full", value: 9999 },
  ];

  return (
    <div className="space-y-4">
      <SliderRow label="Base radius" value={baseRadius} min={0} max={1.5} step={0.05} onChange={(v) => onChange({ baseRadius: v })} unit="rem" ticks={[0, 0.5, 1.0, 1.5]} />

      {/* 라운딩 미리보기 */}
      <div className="rounded-lg border border-border p-4">
        <p className="mb-4 text-xs font-medium text-muted-foreground">스케일 미리보기</p>
        <div className="flex flex-wrap gap-4">
          {radiusLevels.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div
                className="h-12 w-12 border border-border bg-primary/10"
                style={{ borderRadius: r.value === 9999 ? "9999px" : `${r.value}rem` }}
              />
              <div className="text-center">
                <p className="text-xs font-medium">{r.label}</p>
                <p className="text-[10px] text-muted-foreground">
                  {r.value === 9999 ? "full" : `${r.value.toFixed(2)}rem`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
