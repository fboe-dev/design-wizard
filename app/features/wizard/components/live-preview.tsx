import { useMemo, useState } from "react";
import type { WizardState, PageLayout, DesignStyle, PlatformTarget } from "../types";
import { PREVIEW_TEXTS, DEVICE_OPTIONS, type PreviewTexts } from "../constants";
import { usePreviewUI } from "@stores/useWizardStore";
import { cn } from "@libs/utils";
import { Button } from "@shadcn/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@shadcn/card";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
import { Badge } from "@shadcn/badge";
import { Progress } from "@shadcn/progress";
import { Separator } from "@shadcn/separator";
import { Avatar, AvatarFallback } from "@shadcn/avatar";
import { Checkbox } from "@shadcn/checkbox";
import { Switch } from "@shadcn/switch";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@shadcn/table";
import {
  LayoutDashboard, Inbox, Users, Settings, Search, Bell,
  Plus, Home, TrendingUp, Calendar, ChevronRight,
  CreditCard, Shield, User, Menu,
} from "lucide-react";

// ── Tailwind v4 기본값 ──
const TW_DEFAULTS = {
  spacing: 0.25,  // rem (= 4px)
  radius: 0.65,   // rem (app.css :root --radius)
  baseSize: 16,   // px
  scaleRatio: 1.0,
};

const TW_SIZES: Record<string, number> = {
  xs: 0.75, sm: 0.875, base: 1, lg: 1.125,
  xl: 1.25, "2xl": 1.5, "3xl": 1.875, "4xl": 2.25,
};
const TW_LH: Record<string, number> = {
  xs: 1 / 0.75, sm: 1.25 / 0.875, base: 1.5,
  lg: 1.75 / 1.125, xl: 1.75 / 1.25, "2xl": 2 / 1.5,
  "3xl": 2.25 / 1.875, "4xl": 2.5 / 2.25,
};

// ── CSS 토큰 계산 ──
// 핵심 원칙: 기본값일 때는 CSS 변수를 오버라이드하지 않음 → :root 값 그대로 상속
function usePreviewTokens(state: WizardState, dark: boolean) {
  return useMemo(() => {
    const { color, radius, font, typography, spacing } = state;
    const h = color.primaryHue;
    const c = color.primaryChroma;
    const l = color.primaryLightness;

    // 컬러는 항상 설정 (다크모드 토글 + 커스텀 컬러)
    const colorTokens = dark
      ? {
          "--background": `oklch(0.141 0.005 ${h})`,
          "--foreground": "oklch(0.985 0 0)",
          "--card": `oklch(0.21 0.006 ${h})`,
          "--card-foreground": "oklch(0.985 0 0)",
          "--popover": `oklch(0.21 0.006 ${h})`,
          "--popover-foreground": "oklch(0.985 0 0)",
          "--primary": `oklch(${Math.min(l + 0.1, 0.85)} ${c} ${h})`,
          "--primary-foreground": "oklch(1 0 0)",
          "--secondary": `oklch(0.274 0.006 ${h})`,
          "--secondary-foreground": "oklch(0.985 0 0)",
          "--muted": `oklch(0.274 0.006 ${h})`,
          "--muted-foreground": `oklch(0.705 0.015 ${h})`,
          "--accent": `oklch(0.274 0.006 ${h})`,
          "--accent-foreground": "oklch(0.985 0 0)",
          "--destructive": "oklch(0.704 0.191 22.216)",
          "--border": "oklch(1 0 0 / 10%)",
          "--input": "oklch(1 0 0 / 15%)",
          "--ring": `oklch(${Math.max(l - 0.13, 0.4)} ${c} ${h})`,
          "--sidebar": `oklch(0.18 0.005 ${h})`,
          "--sidebar-foreground": "oklch(0.985 0 0)",
          "--sidebar-primary": `oklch(${Math.min(l + 0.1, 0.85)} ${c} ${h})`,
          "--sidebar-primary-foreground": "oklch(1 0 0)",
          "--sidebar-accent": `oklch(0.274 0.006 ${h})`,
          "--sidebar-accent-foreground": "oklch(0.985 0 0)",
          "--sidebar-border": "oklch(1 0 0 / 10%)",
          "--sidebar-ring": `oklch(${Math.max(l - 0.13, 0.4)} ${c} ${h})`,
        }
      : {
          "--background": "oklch(1 0 0)",
          "--foreground": `oklch(0.141 0.005 ${h})`,
          "--card": "oklch(1 0 0)",
          "--card-foreground": `oklch(0.141 0.005 ${h})`,
          "--popover": "oklch(1 0 0)",
          "--popover-foreground": `oklch(0.141 0.005 ${h})`,
          "--primary": `oklch(${l} ${c} ${h})`,
          "--primary-foreground": `oklch(0.97 0.014 ${h})`,
          "--secondary": `oklch(0.967 0.001 ${h})`,
          "--secondary-foreground": `oklch(0.21 0.006 ${h})`,
          "--muted": `oklch(0.967 0.001 ${h})`,
          "--muted-foreground": `oklch(0.552 0.016 ${h})`,
          "--accent": `oklch(0.967 0.001 ${h})`,
          "--accent-foreground": `oklch(0.21 0.006 ${h})`,
          "--destructive": "oklch(0.577 0.245 27.325)",
          "--border": `oklch(0.92 0.004 ${h})`,
          "--input": `oklch(0.92 0.004 ${h})`,
          "--ring": `oklch(${l} ${c} ${h})`,
          "--sidebar": "oklch(0.985 0 0)",
          "--sidebar-foreground": `oklch(0.141 0.005 ${h})`,
          "--sidebar-primary": `oklch(${l} ${c} ${h})`,
          "--sidebar-primary-foreground": `oklch(0.97 0.014 ${h})`,
          "--sidebar-accent": `oklch(0.967 0.001 ${h})`,
          "--sidebar-accent-foreground": `oklch(0.21 0.006 ${h})`,
          "--sidebar-border": `oklch(0.92 0.004 ${h})`,
          "--sidebar-ring": `oklch(${l} ${c} ${h})`,
        };

    const tokens: Record<string, string> = { ...colorTokens };

    // 타이포그래피: 기본값과 다를 때만 오버라이드
    const { baseSize, scaleRatio } = typography;
    if (baseSize !== TW_DEFAULTS.baseSize || scaleRatio !== TW_DEFAULTS.scaleRatio) {
      const sizeMultiplier = baseSize / 16;
      for (const [name, defaultRem] of Object.entries(TW_SIZES)) {
        const adjustedRem = sizeMultiplier * Math.pow(defaultRem, scaleRatio);
        tokens[`--text-${name}`] = `${adjustedRem.toFixed(4)}rem`;
        if (TW_LH[name]) {
          tokens[`--text-${name}--line-height`] = `${TW_LH[name]}`;
        }
      }
    }

    // 스페이싱: 기본값(4px = 0.25rem)과 다를 때만 오버라이드
    const spacingRem = spacing.baseUnit / 16;
    if (Math.abs(spacingRem - TW_DEFAULTS.spacing) > 0.001) {
      tokens["--spacing"] = `${spacingRem}rem`;
    }

    // 라운딩: 기본값(0.65rem)과 다를 때만 오버라이드
    if (Math.abs(radius.baseRadius - TW_DEFAULTS.radius) > 0.001) {
      tokens["--radius"] = `${radius.baseRadius}rem`;
    }

    // 폰트: 항상 설정 (사용자 선택 폰트)
    tokens["--font-sans"] = `"${font.fontFamily}", system-ui, sans-serif`;

    return tokens as React.CSSProperties;
  }, [state.color, state.radius, state.font, state.typography, state.spacing, dark]);
}

// ── 디자인 스타일 헬퍼 ──

function cardStyle(style: DesignStyle) {
  if (style === "standard") return "shadow-md";
  if (style === "flat") return "shadow-none";
  return "border-0 bg-muted/60 shadow-none"; // lineless
}

function inputStyle(style: DesignStyle) {
  if (style === "standard") return "";
  if (style === "flat") return "shadow-none";
  return "border-0 bg-muted/70 shadow-none focus:bg-muted/80"; // lineless
}

function btnVariant(style: DesignStyle) {
  return style === "standard" ? "default" as const : "outline" as const;
}

function badgeVariant(style: DesignStyle) {
  return style === "lineless" ? "secondary" as const : "default" as const;
}

function buttonShadow(style: DesignStyle) {
  return style === "standard" ? "shadow-md" : "";
}

function shellBorderStyle(style: DesignStyle) {
  return style === "lineless" ? "border-transparent" : "";
}

function separatorStyle(style: DesignStyle) {
  return style === "lineless" ? "bg-transparent" : "";
}

// ── 디바이스 이름 조회 ──

function getDeviceLabel(platform: PlatformTarget, selectedDevice: string) {
  const devices = DEVICE_OPTIONS[platform] ?? DEVICE_OPTIONS.web;
  const device = devices.find((d) => d.name === selectedDevice) ?? devices[0];
  return `${device.name} — ${device.width}×${device.height}`;
}

// ── 플랫폼별 목업 컴포넌트 ──

function WebMockup({
  children,
  width,
  height,
  deviceLabel,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
  deviceLabel: string;
}) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-lg border border-border shadow-md"
      style={{ width, minHeight: height }}
      data-testid="web-mockup"
    >
      {/* macOS 타이틀바 */}
      <div className="relative flex h-10 items-center border-b border-border bg-muted/40 pl-4">
        {/* Traffic Lights */}
        <div className="flex items-center gap-2" data-testid="traffic-lights">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
        </div>
        {/* 디바이스 라벨 (중앙) */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-muted-foreground">
          {deviceLabel}
        </span>
      </div>

      {/* 콘텐츠 영역 */}
      <div
        className="overflow-auto bg-background font-sans text-foreground [&_button]:cursor-pointer [&_[role=checkbox]]:cursor-pointer [&_[role=switch]]:cursor-pointer [&_[role=tab]]:cursor-pointer [&_label]:cursor-pointer [&_input]:cursor-text"
        style={{ height: height - 40 }}
      >
        {children}
      </div>
    </div>
  );
}

function TabletMockup({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
}) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-3xl bg-foreground shadow-md"
      style={{ width, minHeight: height }}
      data-testid="tablet-mockup"
    >
      {/* 상단 베젤 + 카메라 노치 */}
      <div className="flex h-4 items-center justify-center bg-foreground">
        <div className="h-1 w-2 rounded-full bg-foreground/20" data-testid="tablet-camera" />
      </div>

      {/* 스크린 (좌우 + 하단 베젤은 padding으로) */}
      <div className="px-4 pb-4">
        <div
          className="overflow-auto rounded-lg bg-background font-sans text-foreground [&_button]:cursor-pointer [&_[role=checkbox]]:cursor-pointer [&_[role=switch]]:cursor-pointer [&_[role=tab]]:cursor-pointer [&_label]:cursor-pointer [&_input]:cursor-text"
          style={{ height: height - 32 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function MobileMockup({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
}) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-[40px] border-[6px] border-zinc-800 shadow-md ring-1 ring-zinc-700/30 dark:border-zinc-200 dark:ring-zinc-300/30"
      style={{ width, minHeight: height }}
      data-testid="mobile-mockup"
    >
      {/* 스크린 영역 */}
      <div
        className="relative overflow-auto rounded-[32px] bg-background font-sans text-foreground [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [&_button]:cursor-pointer [&_[role=checkbox]]:cursor-pointer [&_[role=switch]]:cursor-pointer [&_[role=tab]]:cursor-pointer [&_label]:cursor-pointer [&_input]:cursor-text"
        style={{ height: height - 12 }}
      >
        {/* Dynamic Island */}
        <div className="pointer-events-none sticky top-0 z-10 flex justify-center pt-2 pb-1">
          <div className="h-7 w-[100px] rounded-full bg-black" data-testid="dynamic-island" />
        </div>

        {/* 콘텐츠 */}
        <div>
          {children}
        </div>

        {/* 홈 인디케이터 */}
        <div className="pointer-events-none sticky bottom-0 z-10 flex justify-center pb-2">
          <div className="h-1 w-[100px] rounded-full bg-foreground/30" data-testid="home-indicator" />
        </div>
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ──
export function LivePreview({ state, language }: { state: WizardState; language?: string }) {
  const { previewDark } = usePreviewUI();
  const cssTokens = usePreviewTokens(state, previewDark);
  const t = PREVIEW_TEXTS[language ?? "korean"] ?? PREVIEW_TEXTS.korean;
  const platform = state.platformTarget;

  // 디바이스 크기 계산
  const device = DEVICE_OPTIONS[platform].find(d => d.name === state.selectedDevice)
    ?? DEVICE_OPTIONS[platform][0];
  const previewWidth = device.width;
  const previewHeight = device.height;
  const deviceLabel = getDeviceLabel(platform, state.selectedDevice);

  // 앱 셸 콘텐츠 (공통)
  const shellContent = (
    <>
      {state.appShellLayout === "sidebar" ? (
        <SidebarShell pageLayout={state.pageLayout} designStyle={state.designStyle} platform={platform} t={t} />
      ) : state.appShellLayout === "topnav" ? (
        <TopnavShell pageLayout={state.pageLayout} designStyle={state.designStyle} platform={platform} t={t} />
      ) : state.appShellLayout === "dock" ? (
        <DockShell pageLayout={state.pageLayout} designStyle={state.designStyle} platform={platform} t={t} />
      ) : (
        <LandingShell designStyle={state.designStyle} platform={platform} t={t} />
      )}
    </>
  );

  // cssTokens를 최상위 wrapper에 적용
  const wrapperStyle: React.CSSProperties = { ...cssTokens };

  // 플랫폼별 목업 분기
  if (platform === "web") {
    return (
      <div className="mx-auto" style={wrapperStyle}>
        <WebMockup width={previewWidth} height={previewHeight} deviceLabel={deviceLabel}>
          {shellContent}
        </WebMockup>
      </div>
    );
  }

  if (platform === "tablet") {
    return (
      <div className="mx-auto" style={wrapperStyle}>
        <TabletMockup width={previewWidth} height={previewHeight}>
          {shellContent}
        </TabletMockup>
      </div>
    );
  }

  // mobile
  return (
    <div className="mx-auto" style={wrapperStyle}>
      <MobileMockup width={previewWidth} height={previewHeight}>
        {shellContent}
      </MobileMockup>
    </div>
  );
}

// ══════════════════════════════════════
// 네비게이션 쉘
// ══════════════════════════════════════

interface ShellProps {
  pageLayout: PageLayout;
  designStyle: DesignStyle;
  platform: PlatformTarget;
  t: PreviewTexts;
}

function SidebarShell({ pageLayout, designStyle, platform, t }: ShellProps) {
  const [active, setActive] = useState("dashboard");
  const isMobile = platform === "mobile";
  const isTablet = platform === "tablet";
  const sidebarWidth = isMobile ? 0 : isTablet ? 200 : 240;

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: t.dashboard },
    { id: "inbox", icon: Inbox, label: t.inbox },
    { id: "users", icon: Users, label: t.users },
    { id: "settings", icon: Settings, label: t.settings },
  ];

  return (
    <div className="flex h-full">
      {/* 사이드바 — mobile이면 숨김 */}
      {!isMobile && (
        <aside
          className={cn(
            "flex shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground",
            shellBorderStyle(designStyle),
            separatorStyle(designStyle) ? "border-sidebar-border/0" : "border-sidebar-border",
          )}
          style={{ width: sidebarWidth }}
        >
          <div className="flex items-center gap-2.5 px-5 py-4">
            <div className="h-8 w-8 rounded-lg bg-sidebar-primary" />
            <span className="text-base font-bold">MyApp</span>
          </div>

          <div className="px-4 pb-3">
            <div className={cn(
              "flex cursor-pointer items-center gap-2 rounded-md border border-sidebar-border bg-background text-muted-foreground",
              isTablet ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm",
            )}>
              <Search className="h-4 w-4 shrink-0" />
              {!isTablet && <span>{t.search}</span>}
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-base transition-colors",
                  active === item.id
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <Separator className={cn("bg-sidebar-border", separatorStyle(designStyle))} />
          <div className="flex cursor-pointer items-center gap-2.5 px-5 py-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-sidebar-primary text-xs text-sidebar-primary-foreground">B</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">Brian</div>
              <div className="truncate text-xs text-sidebar-foreground/60">{t.admin}</div>
            </div>
          </div>
        </aside>
      )}

      {/* 메인 영역 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className={cn(
          "flex items-center justify-between border-b border-border px-6 py-3",
          shellBorderStyle(designStyle),
        )}>
          <div className="flex items-center gap-2 text-base text-muted-foreground">
            {isMobile && (
              <Button variant="ghost" size="icon" className="mr-1 h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <span className="cursor-pointer hover:text-foreground">{t.home}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">{t.dashboard}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-xs text-primary-foreground">B</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className={cn(
          "flex-1 overflow-auto",
          isMobile ? "p-3" : isTablet ? "p-4" : "p-6",
        )}>
          <PageContent pageLayout={pageLayout} designStyle={designStyle} platform={platform} t={t} />
        </div>
      </div>
    </div>
  );
}

function TopnavShell({ pageLayout, designStyle, platform, t }: ShellProps) {
  const isMobile = platform === "mobile";
  const isTablet = platform === "tablet";

  return (
    <div className="flex h-full flex-col">
      <div className={cn(
        "flex items-center justify-between border-b border-border bg-card",
        isMobile ? "px-4 py-3" : "px-8 py-3",
        shellBorderStyle(designStyle),
      )}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-base font-bold">MyApp</span>
          </div>
          {!isMobile && (
            <nav className="flex items-center gap-6 text-base">
              <span className="cursor-pointer font-semibold text-foreground">{t.dashboard}</span>
              {!isTablet && <span className="cursor-pointer text-muted-foreground">{t.overview}</span>}
              {!isTablet && <span className="cursor-pointer text-muted-foreground">{t.members}</span>}
              <span className="cursor-pointer text-muted-foreground">{t.settings}</span>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">B</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className={cn(
        "flex-1 overflow-auto",
        isMobile ? "p-3" : isTablet ? "p-4" : "px-8 py-6",
      )}>
        <PageContent pageLayout={pageLayout} designStyle={designStyle} platform={platform} t={t} />
      </div>
    </div>
  );
}

function DockShell({ pageLayout, designStyle, platform, t }: ShellProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const dockItems = [Home, Inbox, Plus, User, Settings];

  return (
    <div className="relative flex h-full flex-col">
      <div className={cn(
        "flex items-center justify-between border-b border-border bg-card px-5 py-3",
        shellBorderStyle(designStyle),
      )}>
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="text-base font-bold">MyApp</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 콘텐츠 영역 — pb-20으로 Dock 공간 확보 */}
      <div className={cn(
        "flex-1 overflow-auto pb-20",
        platform === "mobile" ? "p-3" : platform === "tablet" ? "p-4" : "p-6",
      )}>
        <PageContent pageLayout={pageLayout} designStyle={designStyle} platform={platform} t={t} />
      </div>

      {/* 플로팅 Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full bg-muted/80 px-4 py-1.5 shadow-lg backdrop-blur-md">
          {dockItems.map((Icon, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={cn(
                "rounded-lg p-2.5 transition-colors",
                i === activeIdx
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingShell({ designStyle, platform, t }: { designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts }) {
  const isMobile = platform === "mobile";
  const isTablet = platform === "tablet";

  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className={cn(
        "flex items-center justify-between py-3",
        isMobile ? "px-4" : "px-8",
      )}>
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="text-base font-bold">MyApp</span>
        </div>
        <Button size="sm" variant={btnVariant(designStyle)} className={buttonShadow(designStyle)}>
          {t.getStarted}
        </Button>
      </div>

      <div className={cn(
        "flex flex-1 flex-col items-center justify-center text-center",
        isMobile ? "px-4" : "px-8",
      )}>
        <Badge variant={badgeVariant(designStyle)} className="mb-5">New Release</Badge>
        <h1 className={cn(
          "font-extrabold leading-tight",
          isMobile ? "max-w-[320px] text-3xl" : isTablet ? "max-w-[450px] text-4xl" : "max-w-[500px] text-5xl",
        )}>
          {t.heroTitle1}<span className="text-primary">{t.heroTitle2}</span>
        </h1>
        <p className={cn(
          "mt-4 leading-relaxed text-muted-foreground",
          isMobile ? "max-w-[300px] text-sm" : "max-w-[400px] text-base",
        )}>
          {t.heroDesc}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Button size={isMobile ? "default" : "lg"} variant={btnVariant(designStyle)} className={buttonShadow(designStyle)}>
            {t.startFree}
          </Button>
          <Button variant="outline" size={isMobile ? "default" : "lg"}>
            {t.learnMore}
          </Button>
        </div>
      </div>

      <div className={cn(
        "grid gap-4 pb-6",
        isMobile ? "grid-cols-1 px-4" : isTablet ? "grid-cols-2 px-8" : "grid-cols-3 px-8",
      )}>
        {[
          { title: t.fastBuild, desc: t.fastBuildDesc },
          { title: t.perfectCustom, desc: t.perfectCustomDesc },
          { title: t.codeGeneration, desc: t.codeGenerationDesc },
        ].map((item) => (
          <Card key={item.title} className={cardStyle(designStyle)}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// 페이지 레이아웃
// ══════════════════════════════════════

function PageContent({ pageLayout, designStyle, platform, t }: {
  pageLayout: PageLayout; designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts;
}) {
  switch (pageLayout) {
    case "tab-page":
      return <TabPageContent designStyle={designStyle} platform={platform} t={t} />;
    case "sidebar-page":
      return <SidebarPageContent designStyle={designStyle} platform={platform} t={t} />;
    case "dashboard-grid":
      return <DashboardGridContent designStyle={designStyle} platform={platform} t={t} />;
    default:
      return <SimplePageContent designStyle={designStyle} platform={platform} t={t} />;
  }
}

function SimplePageContent({ designStyle, platform, t }: { designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={t.projectSettings} description={t.generalSettingsDesc} />
      <FormSection designStyle={designStyle} platform={platform} t={t} />
    </div>
  );
}

function TabPageContent({ designStyle, platform, t }: { designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t.dashboard}
        description={t.projectOverview}
        action={
          <Button size="sm" variant={btnVariant(designStyle)} className={buttonShadow(designStyle)}>
            <Plus className="mr-1.5 h-4 w-4" /> {t.newProject}
          </Button>
        }
      />
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="members">{t.members}</TabsTrigger>
          <TabsTrigger value="settings">{t.settings}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4 flex flex-col gap-4">
          <StatsCards designStyle={designStyle} platform={platform} t={t} />
          <ProjectCards designStyle={designStyle} platform={platform} t={t} />
        </TabsContent>
        <TabsContent value="members" className="mt-4">
          <MembersTable designStyle={designStyle} platform={platform} t={t} />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <FormSection designStyle={designStyle} platform={platform} t={t} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SidebarPageContent({ designStyle, platform, t }: { designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts }) {
  const [active, setActive] = useState("general");
  const menuItems = [
    { id: "general", icon: Settings, label: t.general },
    { id: "profile", icon: User, label: t.profile },
    { id: "notifications", icon: Bell, label: t.notifications },
    { id: "security", icon: Shield, label: t.security },
    { id: "billing", icon: CreditCard, label: t.billing },
  ];

  const isTablet = platform === "tablet";

  return (
    <div className="flex gap-6">
      <nav className={cn("flex shrink-0 flex-col gap-1", isTablet ? "w-[140px]" : "w-[180px]")}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-base transition-colors",
              active === item.id
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <PageHeader title={t.generalSettings} description={t.generalSettingsDesc} />
        <FormSection designStyle={designStyle} platform={platform} t={t} />
      </div>
    </div>
  );
}

function DashboardGridContent({ designStyle, platform, t }: { designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold tracking-tight">{t.dashboard}</h1>
      </div>
      <StatsCards designStyle={designStyle} platform={platform} t={t} />
      <div className="grid grid-cols-2 gap-4">
        <ChartCard designStyle={designStyle} />
        <ProjectCards designStyle={designStyle} platform={platform} t={t} />
      </div>
      <MembersTable designStyle={designStyle} platform={platform} t={t} />
    </div>
  );
}

// ══════════════════════════════════════
// 공통 콘텐츠 블록
// ══════════════════════════════════════

function PageHeader({ title, description, action }: {
  title: string; description: string; action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-lg font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-base text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

function StatsCards({ designStyle, platform, t }: { designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts }) {
  const stats = [
    { label: t.totalUsers, value: "2,847", change: "+12.5%", icon: Users },
    { label: t.activeProjects, value: "24", change: "+3", icon: TrendingUp },
    { label: t.scheduledEvents, value: "7", change: t.thisWeek, icon: Calendar },
  ];

  return (
    <div className={cn(
      "grid gap-4",
      platform === "mobile" ? "grid-cols-1" : platform === "tablet" ? "grid-cols-2" : "grid-cols-3",
    )}>
      {stats.map((stat) => (
        <Card key={stat.label} className={cardStyle(designStyle)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-xs">{stat.label}</CardDescription>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ChartCard({ designStyle }: { designStyle: DesignStyle }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const values = [40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95];
  const maxVal = Math.max(...values);

  return (
    <Card className={cardStyle(designStyle)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Activity</CardTitle>
        <CardDescription className="text-xs">Monthly overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1" style={{ height: 120 }}>
          {months.map((m, i) => (
            <div key={m} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-sm bg-primary/80"
                style={{ height: `${(values[i] / maxVal) * 100}%` }}
              />
              <span className="text-[8px] text-muted-foreground">{m}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectCards({ designStyle, platform, t }: { designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts }) {
  const isMobile = platform === "mobile";
  const projects = [
    { title: t.designSystem, desc: t.designSystemDesc, tag: t.inProgress, variant: badgeVariant(designStyle), progress: 68 },
    { title: t.apiRefactoring, desc: t.apiRefactoringDesc, tag: t.reviewing, variant: "secondary" as const, progress: 42 },
    { title: t.mobileAppV2, desc: t.mobileAppV2Desc, tag: t.waiting, variant: "outline" as const, progress: 10 },
  ];

  return (
    <div className="flex flex-col gap-3">
      {projects.map((p) => (
        <Card key={p.title} className={cn("cursor-pointer", cardStyle(designStyle))}>
          <CardContent className={cn(
            "flex items-center gap-4",
            isMobile ? "px-3 py-2" : "px-4 py-3",
          )}>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold">{p.title}</span>
                <Badge variant={p.variant} className="text-[10px]">{p.tag}</Badge>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{p.desc}</p>
            </div>
            <div className="w-24 shrink-0">
              <Progress value={p.progress} />
              <p className="mt-1 text-right text-[10px] text-muted-foreground">{p.progress}%</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FormSection({ designStyle, platform, t }: { designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts }) {
  return (
    <Card className={cardStyle(designStyle)}>
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className={cn(
          "grid gap-4",
          platform === "mobile" ? "grid-cols-1" : "grid-cols-2",
        )}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="pv-name">{t.projectName}</Label>
            <Input id="pv-name" defaultValue="My Design System" className={inputStyle(designStyle)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="pv-category">{t.category}</Label>
            <Input id="pv-category" defaultValue={t.categoryValue} className={inputStyle(designStyle)} />
          </div>
        </div>

        <Separator className={separatorStyle(designStyle)} />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="pv-notify" defaultChecked />
            <Label htmlFor="pv-notify" className="font-normal">{t.emailNotify}</Label>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="pv-public" className="font-normal text-muted-foreground">{t.public}</Label>
            <Switch id="pv-public" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label>{t.progress}</Label>
            <span className="text-base text-muted-foreground">68%</span>
          </div>
          <Progress value={68} />
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant={btnVariant(designStyle)} className={buttonShadow(designStyle)}>{t.save}</Button>
          <Button variant="outline" size="sm">{t.cancel}</Button>
          <Button variant="ghost" size="sm">{t.reset}</Button>
          <div className="flex-1" />
          <Button variant="destructive" size="sm">{t.delete}</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MembersTable({ designStyle, platform, t }: { designStyle: DesignStyle; platform: PlatformTarget; t: PreviewTexts }) {
  const members = [
    { name: "Brian", email: "brian@example.com", role: t.admin, initial: "B" },
    { name: "Yuna", email: "yuna@example.com", role: t.editor, initial: "Y" },
    { name: "Minho", email: "minho@example.com", role: t.viewer, initial: "M" },
  ];

  return (
    <Card className={cardStyle(designStyle)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{t.teamMembers}</CardTitle>
        <CardDescription className="text-xs">{t.teamMembersDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">{t.name}</TableHead>
              <TableHead className="text-xs">{t.email}</TableHead>
              <TableHead className="text-xs">{t.role}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.name} className="cursor-pointer">
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary text-[10px] text-primary-foreground">{m.initial}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{m.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2 text-xs text-muted-foreground">{m.email}</TableCell>
                <TableCell className="py-2">
                  <Badge variant={badgeVariant(designStyle)} className="text-[10px]">{m.role}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
