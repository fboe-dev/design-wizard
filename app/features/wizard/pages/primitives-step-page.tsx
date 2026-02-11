import { useEffect, useRef, useState } from "react";
import { useWizardStore, DEFAULT_STATE } from "@stores/useWizardStore";
import { FontSelector } from "../components/font-selector";
import { ColorPicker } from "../components/color-picker";
import {
  TypographyConfig,
  SpacingConfig as SpacingConfigurator,
  RadiusConfig as RadiusConfigurator,
} from "../components/scale-configurator";
import { LivePreview } from "../components/live-preview";
import { DEVICE_OPTIONS } from "../constants";
import type { DesignStyle, PlatformTarget } from "../types";
import { cn } from "@libs/utils";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@shadcn/resizable";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@shadcn/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/select";
import {
  Type,
  Palette,
  ALargeSmall,
  Space,
  Circle,
  Paintbrush,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

const SECTIONS = [
  { id: "font", label: "폰트", icon: Type },
  { id: "color", label: "컬러", icon: Palette },
  { id: "typography", label: "타이포그래피", icon: ALargeSmall },
  { id: "spacing", label: "스페이싱", icon: Space },
  { id: "radius", label: "라운딩", icon: Circle },
  { id: "style", label: "스타일", icon: Paintbrush },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ToggleChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
        selected
          ? "border-primary bg-primary/5 text-primary"
          : "border-border text-muted-foreground hover:border-primary/50",
      )}
    >
      {children}
    </button>
  );
}

export default function PrimitivesStepPage() {
  const store = useWizardStore();
  const [activeSection, setActiveSection] = useState<SectionId>("font");
  const [language, setLanguage] = useState("korean");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const {
    font, setFont,
    typography, setTypography,
    spacing, setSpacing,
    radius, setRadius,
    color, setColor,
    designStyle, setDesignStyle,
    platformTarget, setPlatformTarget,
    selectedDevice, setSelectedDevice,
  } = store;

  // IntersectionObserver for scroll spy
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const sectionEls = SECTIONS.map((s) =>
      scrollContainer.querySelector(`#section-${s.id}`),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("section-", "") as SectionId;
            setActiveSection(id);
          }
        }
      },
      {
        root: scrollContainer,
        rootMargin: "-10% 0px -80% 0px",
        threshold: 0,
      },
    );

    for (const el of sectionEls) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  function scrollToSection(id: SectionId) {
    isScrollingRef.current = true;
    setActiveSection(id);
    const el = scrollRef.current?.querySelector(`#section-${id}`);
    el?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  }

  function handleResetPrimitives() {
    setFont(DEFAULT_STATE.font);
    setTypography(DEFAULT_STATE.typography);
    setSpacing(DEFAULT_STATE.spacing);
    setRadius(DEFAULT_STATE.radius);
    setColor(DEFAULT_STATE.color);
    setDesignStyle(DEFAULT_STATE.designStyle);
    setPlatformTarget(DEFAULT_STATE.platformTarget);
    setSelectedDevice(DEFAULT_STATE.selectedDevice);
  }

  // 플랫폼 변경 시 디바이스 자동 선택
  function handlePlatformChange(target: PlatformTarget) {
    setPlatformTarget(target);
    const devices = DEVICE_OPTIONS[target];
    if (devices && devices.length > 0) {
      setSelectedDevice(devices[0].name);
    }
  }

  return (
    <TooltipProvider>
      <div className="flex h-[calc(100dvh-57px)]">
        {/* 아이콘 사이드바 */}
        <aside className="flex w-14 shrink-0 flex-col items-center border-r border-border bg-muted/30 py-3">
          <nav className="flex flex-1 flex-col items-center gap-1">
            {SECTIONS.map((section) => (
              <Tooltip key={section.id}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors",
                      activeSection === section.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
                    )}
                  >
                    <section.icon className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">{section.label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleResetPrimitives}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">기본값</TooltipContent>
          </Tooltip>
        </aside>

        {/* 리사이즈 가능한 컨트롤 + 프리뷰 */}
        <ResizablePanelGroup orientation="horizontal">
          {/* 컨트롤 패널 */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto p-6 pb-24 space-y-10"
            >
              <section id="section-font" className="space-y-4">
                <SectionHeader icon={Type} title="폰트" description="프로젝트에 사용할 기본 서체를 선택하세요" />
                <FontSelector value={font} onChange={setFont} />
              </section>

              <section id="section-color" className="space-y-4">
                <SectionHeader icon={Palette} title="컬러" description="브랜드 Primary 컬러를 선택하세요" />
                <ColorPicker value={color} onChange={setColor} />
              </section>

              <section id="section-typography" className="space-y-4">
                <SectionHeader icon={ALargeSmall} title="타이포그래피" description="텍스트 크기 스케일을 설정하세요" />
                <TypographyConfig
                  baseSize={typography.baseSize}
                  scaleRatio={typography.scaleRatio}
                  onChange={(partial) => setTypography(partial as any)}
                />
              </section>

              <section id="section-spacing" className="space-y-4">
                <SectionHeader icon={Space} title="스페이싱" description="간격 밀도를 선택하세요" />
                <SpacingConfigurator
                  baseUnit={spacing.baseUnit}
                  onChange={(partial) => setSpacing(partial as any)}
                />
              </section>

              <section id="section-radius" className="space-y-4">
                <SectionHeader icon={Circle} title="라운딩" description="모서리 둥근 정도를 설정하세요" />
                <RadiusConfigurator
                  baseRadius={radius.baseRadius}
                  onChange={(partial) => setRadius(partial as any)}
                />
              </section>

              <section id="section-style" className="space-y-4">
                <SectionHeader icon={Paintbrush} title="스타일" description="UI 스타일과 타겟 플랫폼을 선택하세요" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">디자인 스타일</p>
                  <div className="flex gap-2">
                    {([
                      { value: "standard" as DesignStyle, label: "Standard" },
                      { value: "flat" as DesignStyle, label: "Flat" },
                      { value: "lineless" as DesignStyle, label: "Lineless" },
                    ]).map((opt) => (
                      <ToggleChip key={opt.value} selected={designStyle === opt.value} onClick={() => setDesignStyle(opt.value)}>
                        {opt.label}
                      </ToggleChip>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">타겟 플랫폼</p>
                  <div className="flex gap-2">
                    {([
                      { value: "web" as PlatformTarget, label: "Web" },
                      { value: "tablet" as PlatformTarget, label: "Tablet" },
                      { value: "mobile" as PlatformTarget, label: "Mobile" },
                    ]).map((opt) => (
                      <ToggleChip key={opt.value} selected={platformTarget === opt.value} onClick={() => handlePlatformChange(opt.value)}>
                        {opt.label}
                      </ToggleChip>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">디바이스 사이즈</p>
                  <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEVICE_OPTIONS[platformTarget].map((device) => (
                        <SelectItem key={device.name} value={device.name}>
                          {device.name} ({device.width}x{device.height})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </section>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* 프리뷰 패널 */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="flex h-full flex-col">
              {/* 프리뷰 콘텐츠 */}
              <div className="flex min-h-0 flex-1 items-center overflow-auto p-4">
                <LivePreview state={store} language={language} />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  );
}
