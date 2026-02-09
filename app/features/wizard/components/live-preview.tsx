import { useMemo, useState } from "react";
import type { WizardState, PageLayout, DesignStyle } from "../types";
import { usePreviewUI } from "@stores/useWizardStore";
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
  CreditCard, Shield, User,
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

// ── 메인 컴포넌트 ──
export function LivePreview({ state }: { state: WizardState }) {
  const { previewDark } = usePreviewUI();
  const cssTokens = usePreviewTokens(state, previewDark);

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* 프리뷰 전체 — 디자인 토큰 적용 (헤더 포함) */}
      <div
        className="overflow-hidden bg-background font-sans text-foreground [&_button]:cursor-pointer [&_[role=checkbox]]:cursor-pointer [&_[role=switch]]:cursor-pointer [&_[role=tab]]:cursor-pointer [&_label]:cursor-pointer [&_input]:cursor-text"
        style={cssTokens}
      >
        {/* 크롬 헤더 */}
        <div className="flex items-center border-b border-border bg-muted/30 px-4 py-2">
          <span className="text-sm font-medium text-muted-foreground">Live Preview</span>
        </div>

        {/* 프리뷰 콘텐츠 */}
        <div className="overflow-hidden" style={{ height: 480 }}>
        {state.appShellLayout === "sidebar" ? (
          <SidebarShell pageLayout={state.pageLayout} designStyle={state.designStyle} />
        ) : state.appShellLayout === "topnav" ? (
          <TopnavShell pageLayout={state.pageLayout} designStyle={state.designStyle} />
        ) : state.appShellLayout === "dock" ? (
          <DockShell pageLayout={state.pageLayout} designStyle={state.designStyle} />
        ) : (
          <LandingShell designStyle={state.designStyle} />
        )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// 네비게이션 쉘
// ══════════════════════════════════════

interface ShellProps {
  pageLayout: PageLayout;
  designStyle: DesignStyle;
}

function SidebarShell({ pageLayout, designStyle }: ShellProps) {
  const [active, setActive] = useState("dashboard");
  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "대시보드" },
    { id: "inbox", icon: Inbox, label: "받은편지함" },
    { id: "users", icon: Users, label: "사용자" },
    { id: "settings", icon: Settings, label: "설정" },
  ];

  return (
    <div className="flex h-full">
      {/* 사이드바 */}
      <aside className="flex w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2.5 px-5 py-4">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary" />
          <span className="text-base font-bold">MyApp</span>
        </div>

        <div className="px-4 pb-3">
          <div className="flex cursor-pointer items-center gap-2 rounded-md border border-sidebar-border bg-background px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>검색...</span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                active === item.id
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <Separator className="bg-sidebar-border" />
        <div className="flex cursor-pointer items-center gap-2.5 px-5 py-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-primary text-xs text-sidebar-primary-foreground">B</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">Brian</div>
            <div className="truncate text-xs text-sidebar-foreground/60">admin</div>
          </div>
        </div>
      </aside>

      {/* 메인 영역 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground">홈</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">대시보드</span>
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

        <div className="flex-1 overflow-auto p-6">
          <PageContent pageLayout={pageLayout} designStyle={designStyle} />
        </div>
      </div>
    </div>
  );
}

function TopnavShell({ pageLayout, designStyle }: ShellProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border bg-card px-8 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-base font-bold">MyApp</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <span className="cursor-pointer font-semibold text-foreground">대시보드</span>
            <span className="cursor-pointer text-muted-foreground">프로젝트</span>
            <span className="cursor-pointer text-muted-foreground">팀</span>
            <span className="cursor-pointer text-muted-foreground">설정</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
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

      <div className="flex-1 overflow-auto px-8 py-6">
        <PageContent pageLayout={pageLayout} designStyle={designStyle} />
      </div>
    </div>
  );
}

function DockShell({ pageLayout, designStyle }: ShellProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const dockItems = [Home, Inbox, Plus, User, Settings];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
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

      <div className="flex-1 overflow-auto p-6">
        <PageContent pageLayout={pageLayout} designStyle={designStyle} />
      </div>

      <div className="flex items-center justify-center border-t border-border bg-card py-2.5">
        <div className="flex items-center gap-1 rounded-full bg-muted px-4 py-1.5">
          {dockItems.map((Icon, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`rounded-lg p-2.5 transition-colors ${
                i === activeIdx
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingShell({ designStyle }: { designStyle: DesignStyle }) {
  const btnVariant = designStyle === "line" ? "outline" : "default";

  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="text-base font-bold">MyApp</span>
        </div>
        <Button size="sm" variant={btnVariant}>시작하기</Button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <Badge className="mb-5">New Release</Badge>
        <h1 className="max-w-[500px] text-4xl font-extrabold leading-tight">
          더 빠르게, <span className="text-primary">더 아름답게</span> 만드세요
        </h1>
        <p className="mt-4 max-w-[400px] text-base leading-relaxed text-muted-foreground">
          디자인 시스템을 몇 분 만에 구축하세요. 컴포넌트부터 토큰까지 자동으로 생성합니다.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Button size="lg" variant={btnVariant}>무료로 시작</Button>
          <Button variant="outline" size="lg">더 알아보기</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 px-8 pb-6">
        {[
          { title: "빠른 구축", desc: "5분 안에 디자인 시스템 완성" },
          { title: "완벽한 커스텀", desc: "브랜드에 맞는 세밀한 조정" },
          { title: "코드 생성", desc: "프로덕션 레디 코드 자동 출력" },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
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

function PageContent({ pageLayout, designStyle }: { pageLayout: PageLayout; designStyle: DesignStyle }) {
  switch (pageLayout) {
    case "tab-page":
      return <TabPageContent designStyle={designStyle} />;
    case "sidebar-page":
      return <SidebarPageContent designStyle={designStyle} />;
    case "dashboard-grid":
      return <DashboardGridContent />;
    default:
      return <SimplePageContent designStyle={designStyle} />;
  }
}

function SimplePageContent({ designStyle }: { designStyle: DesignStyle }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="프로젝트 설정" description="프로젝트 기본 정보를 관리합니다" />
      <FormSection designStyle={designStyle} />
    </div>
  );
}

function TabPageContent({ designStyle }: { designStyle: DesignStyle }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="대시보드"
        description="프로젝트 현황을 확인하세요"
        action={<Button size="sm"><Plus className="mr-1.5 h-4 w-4" /> 새 프로젝트</Button>}
      />
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="members">멤버</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4 flex flex-col gap-4">
          <StatsCards />
          <ProjectCards />
        </TabsContent>
        <TabsContent value="members" className="mt-4">
          <MembersTable />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <FormSection designStyle={designStyle} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SidebarPageContent({ designStyle }: { designStyle: DesignStyle }) {
  const [active, setActive] = useState("general");
  const menuItems = [
    { id: "general", icon: Settings, label: "일반" },
    { id: "profile", icon: User, label: "프로필" },
    { id: "notifications", icon: Bell, label: "알림" },
    { id: "security", icon: Shield, label: "보안" },
    { id: "billing", icon: CreditCard, label: "결제" },
  ];

  return (
    <div className="flex gap-6">
      <nav className="flex w-[180px] shrink-0 flex-col gap-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
              active === item.id
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <PageHeader title="일반 설정" description="프로젝트 기본 설정을 관리합니다" />
        <FormSection designStyle={designStyle} />
      </div>
    </div>
  );
}

function DashboardGridContent() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="대시보드"
        description="프로젝트 현황을 한눈에 확인하세요"
        action={<Button size="sm"><Plus className="mr-1.5 h-4 w-4" /> 새 프로젝트</Button>}
      />
      <StatsCards />
      <div className="grid grid-cols-2 gap-4">
        <ProjectCards />
        <MembersTable />
      </div>
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
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

function StatsCards() {
  const stats = [
    { label: "총 사용자", value: "2,847", change: "+12.5%", icon: Users },
    { label: "활성 프로젝트", value: "24", change: "+3", icon: TrendingUp },
    { label: "예정 일정", value: "7", change: "이번 주", icon: Calendar },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
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

function ProjectCards() {
  const projects = [
    { title: "디자인 시스템", desc: "컴포넌트 라이브러리 및 디자인 토큰 정의", tag: "진행중", variant: "default" as const, progress: 68 },
    { title: "API 리팩토링", desc: "REST → GraphQL 마이그레이션", tag: "검토중", variant: "secondary" as const, progress: 42 },
    { title: "모바일 앱 v2", desc: "React Native 기반 신규 앱", tag: "대기", variant: "outline" as const, progress: 10 },
  ];

  return (
    <div className="flex flex-col gap-3">
      {projects.map((p) => (
        <Card key={p.title} className="cursor-pointer">
          <CardContent className="flex items-center gap-4 px-6 py-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{p.title}</span>
                <Badge variant={p.variant} className="text-[10px]">{p.tag}</Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.desc}</p>
            </div>
            <div className="w-24 shrink-0">
              <Progress value={p.progress} className="h-1.5" />
              <p className="mt-1 text-right text-[10px] text-muted-foreground">{p.progress}%</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FormSection({ designStyle }: { designStyle: DesignStyle }) {
  const primaryBtnVariant = designStyle === "line" ? "outline" : "default";

  return (
    <Card>
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="pv-name">프로젝트 이름</Label>
            <Input id="pv-name" defaultValue="My Design System" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="pv-category">카테고리</Label>
            <Input id="pv-category" defaultValue="디자인" />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="pv-notify" defaultChecked />
            <Label htmlFor="pv-notify" className="font-normal">이메일 알림 받기</Label>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="pv-public" className="font-normal text-muted-foreground">공개</Label>
            <Switch id="pv-public" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label>진행률</Label>
            <span className="text-sm text-muted-foreground">68%</span>
          </div>
          <Progress value={68} />
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant={primaryBtnVariant}>저장</Button>
          <Button variant="outline" size="sm">취소</Button>
          <Button variant="ghost" size="sm">초기화</Button>
          <div className="flex-1" />
          <Button variant="destructive" size="sm">삭제</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MembersTable() {
  const members = [
    { name: "Brian", email: "brian@example.com", role: "관리자", initial: "B" },
    { name: "Yuna", email: "yuna@example.com", role: "편집자", initial: "Y" },
    { name: "Minho", email: "minho@example.com", role: "뷰어", initial: "M" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">팀 멤버</CardTitle>
        <CardDescription className="text-xs">프로젝트에 참여 중인 멤버 목록</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">이름</TableHead>
              <TableHead className="text-xs">이메일</TableHead>
              <TableHead className="text-xs">역할</TableHead>
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
                <TableCell className="py-2"><Badge variant="secondary" className="text-[10px]">{m.role}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
