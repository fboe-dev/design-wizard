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
import type { DesignStyle, PlatformTarget } from "../types";
import { cn } from "@libs/utils";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    font, setFont,
    typography, setTypography,
    spacing, setSpacing,
    radius, setRadius,
    color, setColor,
    designStyle, setDesignStyle,
    platformTarget, setPlatformTarget,
  } = store;

  // IntersectionObserver to track visible section
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const sectionEls = SECTIONS.map((s) =>
      scrollContainer.querySelector(`#section-${s.id}`),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
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
    const el = scrollRef.current?.querySelector(`#section-${id}`);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  function handleResetPrimitives() {
    setFont(DEFAULT_STATE.font);
    setTypography(DEFAULT_STATE.typography);
    setSpacing(DEFAULT_STATE.spacing);
    setRadius(DEFAULT_STATE.radius);
    setColor(DEFAULT_STATE.color);
    setDesignStyle(DEFAULT_STATE.designStyle);
    setPlatformTarget(DEFAULT_STATE.platformTarget);
  }

  return (
    <div className="flex h-[calc(100dvh-57px)]">
      {/* 왼쪽 앵커 사이드바 */}
      <aside className="flex w-[160px] shrink-0 flex-col border-r border-border bg-muted/30 p-3">
        <button
          type="button"
          onClick={handleResetPrimitives}
          className="mb-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3" />
          기본값
        </button>
        <nav className="space-y-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                activeSection === section.id
                  ? "bg-background font-medium text-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
              )}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* 가운데 컨트롤 컬럼 */}
      <div
        ref={scrollRef}
        className="w-[480px] shrink-0 overflow-y-auto border-r border-border p-6 space-y-10"
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
                { value: "line" as DesignStyle, label: "Line" },
                { value: "fill" as DesignStyle, label: "Fill" },
                { value: "mixed" as DesignStyle, label: "Mixed" },
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
                { value: "mobile" as PlatformTarget, label: "Mobile" },
                { value: "both" as PlatformTarget, label: "Both" },
              ]).map((opt) => (
                <ToggleChip key={opt.value} selected={platformTarget === opt.value} onClick={() => setPlatformTarget(opt.value)}>
                  {opt.label}
                </ToggleChip>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 오른쪽 LivePreview — sticky */}
      <div className="flex min-w-0 flex-1 items-start p-6">
        <div className="sticky top-6 w-full">
          <LivePreview state={store} />
        </div>
      </div>
    </div>
  );
}
