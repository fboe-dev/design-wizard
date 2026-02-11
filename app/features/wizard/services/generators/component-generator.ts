import { COMPONENT_CATALOG, CATEGORY_META } from "../../constants";
import type { WizardState, GeneratedPrompt, ComponentCategory } from "../../types";

/**
 * 카테고리별로 그룹화된 컴포넌트 생성 프롬프트를 반환합니다.
 * 각 카테고리가 하나의 프롬프트가 되어 서브에이전트로 병렬 실행 가능합니다.
 */
export function generateComponentPrompts(state: WizardState): GeneratedPrompt[] {
  const { selectedComponents, appShellLayout, designStyle } = state;

  // 레이아웃 필수 컴포넌트 + 의존성 자동 해결
  const allRequired = new Set<string>();

  // 레이아웃 필수
  for (const comp of COMPONENT_CATALOG) {
    if (comp.requiredByLayout.includes(appShellLayout)) {
      allRequired.add(comp.id);
    }
  }

  // 사용자 선택
  for (const id of selectedComponents) {
    allRequired.add(id);
  }

  // 의존성 해결
  function resolveDeps(id: string) {
    const comp = COMPONENT_CATALOG.find((c) => c.id === id);
    if (!comp) return;
    for (const dep of comp.dependencies) {
      if (!allRequired.has(dep)) {
        allRequired.add(dep);
        resolveDeps(dep);
      }
    }
  }
  for (const id of [...allRequired]) {
    resolveDeps(id);
  }

  // 카테고리별 그룹화
  const byCategory = new Map<ComponentCategory, string[]>();
  for (const id of allRequired) {
    const comp = COMPONENT_CATALOG.find((c) => c.id === id);
    if (!comp) continue;
    const list = byCategory.get(comp.category) || [];
    list.push(id);
    byCategory.set(comp.category, list);
  }

  const prompts: GeneratedPrompt[] = [];

  for (const [category, ids] of byCategory) {
    const meta = CATEGORY_META[category];
    const components = ids
      .map((id) => COMPONENT_CATALOG.find((c) => c.id === id)!)
      .filter(Boolean);

    const componentDetails = components
      .map((comp) => {
        const depStr = comp.dependencies.length > 0
          ? `\n  - 의존성: ${comp.dependencies.join(", ")}`
          : "";
        return `### ${comp.name} (\`${comp.id}.tsx\`)
- ${comp.description}${depStr}
- ${getComponentSpec(comp.id, designStyle)}`;
      })
      .join("\n\n");

    prompts.push({
      id: `components-${category}`,
      title: `${meta.label} 컴포넌트`,
      description: `${meta.label} 카테고리의 ${components.length}개 컴포넌트를 생성합니다`,
      order: 0, // 오케스트레이터에서 재설정
      content: `# ${meta.label} 컴포넌트 구현

## 목표
${meta.label} 카테고리의 컴포넌트들을 구현하세요.
모든 컴포넌트는 \`app/shared/components/\` 디렉토리에 생성합니다.

## 공통 규칙
- shadcn/ui new-york 스타일 기반
- cva (class-variance-authority)로 variant 관리
- cn() 유틸리티로 클래스 병합
- Radix UI primitive 기반 (해당되는 경우)
- 디자인 스타일: **${designStyle}** (${designStyle === "standard" ? "그림자 + 보더 기본 스타일" : designStyle === "flat" ? "그림자 없음, 1px 보더, 플랫 UI" : "보더 없음, 배경색으로 구분하는 미니멀 스타일"})
- forwardRef 대신 React 19의 ref prop 사용
- TypeScript strict 모드 호환
- 반드시 export 해야 하는 것들을 빠뜨리지 마세요

## 컴포넌트 목록

${componentDetails}
`,
    });
  }

  return prompts;
}

function getComponentSpec(id: string, style: string): string {
  const specs: Record<string, string> = {
    // General
    button: `Variants: default, secondary, outline, ghost, destructive, link
Sizes: sm, default, lg, icon
icon prop 지원, asChild (Slot) 패턴 지원`,
    icon: `Lucide React 기반 아이콘 래퍼. size prop (sm/md/lg), className 전달`,
    title: `size prop으로 제목 크기 제어. as prop으로 HTML 태그 변경 가능 (h1~h6)`,
    text: `size prop (base/sm/xs 등). muted prop. as prop (p/span/div)`,

    // Inputs
    input: `Variants: default, ghost. Sizes: sm, default, lg. prefix/suffix 아이콘 슬롯`,
    textarea: `autoResize prop 지원. 최소/최대 높이 설정 가능`,
    checkbox: `Radix Checkbox 기반. label과 조합. indeterminate 상태 지원`,
    radio: `Radix RadioGroup 기반. RadioGroupItem과 함께 사용`,
    switch: `Radix Switch 기반. sizes: sm, default, lg`,
    toggle: `Radix Toggle 기반. variant: default, outline`,
    "toggle-group": `Radix ToggleGroup 기반. type: single, multiple`,
    select: `Radix Select 기반. SelectTrigger, SelectContent, SelectItem 구조`,
    combobox: `Command + Popover 조합. 검색 필터링, 빈 상태 메시지`,
    "date-picker": `Calendar + Popover 조합. 날짜 포맷 표시`,
    "time-picker": `시/분 선택 Select 조합`,
    slider: `Radix Slider 기반. range 모드 지원`,
    "input-otp": `6자리 입력 필드. 자동 포커스 이동`,
    "color-picker": `프리셋 컬러 칩 + 커스텀 hex 입력`,
    rate: `별 아이콘 5개. 호버 미리보기. 반별(0.5) 지원`,
    label: `Radix Label 기반. htmlFor 연결`,

    // Data Display
    avatar: `Radix Avatar 기반. AvatarGroup 컴포넌트 포함. sizes: sm, default, lg`,
    badge: `Variants: default, secondary, outline, destructive. 커스텀 컬러 지원`,
    card: `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 구조. variants: default, ghost, outline`,
    table: `Table, TableHeader, TableBody, TableRow, TableHead, TableCell 구조`,
    "data-table": `Table 기반. 정렬, 필터링, 페이지네이션, 행 선택, 컬럼 리사이즈 지원`,
    code: `CodeBlock + CodeHeader 구조. 언어 표시. 복사 버튼`,
    progress: `Radix Progress 기반. 라벨과 값 표시 옵션`,
    skeleton: `Skeleton, SkeletonText, SkeletonAvatar 등 유틸리티 컴포넌트`,
    carousel: `Embla Carousel 기반 (embla-carousel-react 사용). 이전/다음 버튼`,
    timeline: `세로 타임라인. TimelineItem, TimelineDot, TimelineContent 구조`,
    descriptions: `키-값 쌍 표시. DescriptionItem 구조. column prop으로 열 수 조절`,
    statistic: `큰 숫자 + 라벨 + 추세 표시 (증가/감소 아이콘)`,
    tag: `Badge와 유사하나 닫기(X) 버튼 포함. onClose 이벤트`,
    tree: `트리 구조 표시. 접기/펼치기. 선택 가능. TreeNode 재귀 구조`,
    empty: `빈 상태 일러스트 + 메시지 + 선택적 액션 버튼`,
    list: `List, ListItem 구조. avatar, actions 슬롯 지원`,
    calendar: `월간 달력 뷰. react-day-picker 또는 커스텀. 날짜 선택 이벤트`,

    // Feedback
    dialog: `Radix Dialog 기반. DialogHeader, DialogBody, DialogFooter 구조. sizes: sm, md, lg, xl`,
    "page-dialog": `전체 화면 모달. 헤더 + 스크롤 가능한 바디 + 닫기 버튼`,
    "alert-dialog": `Radix AlertDialog 기반. 확인/취소 버튼. 위험한 액션 확인용`,
    alert: `인라인 알림. Variants: default, destructive, warning, success. 아이콘 자동 매칭`,
    drawer: `Vaul 또는 커스텀 기반. 방향: top, bottom, left, right. DrawerHeader, DrawerBody, DrawerFooter`,
    toast: `Sonner 기반. toast() 함수로 호출. 제목, 설명, 액션 버튼 지원`,
    tooltip: `Radix Tooltip 기반. TooltipProvider 필요. delayDuration 설정`,
    popover: `Radix Popover 기반. PopoverTrigger, PopoverContent 구조`,
    "hover-card": `Radix HoverCard 기반. 호버 시 미리보기 카드 표시`,
    spinner: `SVG 기반 로딩 스피너. sizes: sm, default, lg. animate-spin`,

    // Navigation
    breadcrumb: `BreadcrumbItem, BreadcrumbSeparator 구조. 현재 페이지 강조`,
    "dropdown-menu": `Radix DropdownMenu 기반. 서브메뉴, 단축키 표시, 체크/라디오 아이템`,
    "context-menu": `Radix ContextMenu 기반. 우클릭 트리거`,
    "navigation-menu": `Radix NavigationMenu 기반. 수평 메뉴바 + 드롭다운 패널`,
    menubar: `Radix Menubar 기반. 데스크톱 스타일 메뉴바`,
    pagination: `이전/다음 버튼 + 페이지 번호. ellipsis 표시. PaginationInfo 포함`,
    sidebar: `shadcn Sidebar 패턴. SidebarProvider, SidebarContent, SidebarGroup 등. 접기/펴기 지원`,
    steps: `수평/수직 단계 표시기. 현재/완료/대기 상태. StepItem 구조`,
    command: `Radix 기반 Command 팔레트. CommandInput, CommandList, CommandItem, CommandGroup`,

    // Layout
    separator: `Radix Separator 기반. 수평/수직. decorative 옵션`,
    resizable: `ResizablePanelGroup, ResizablePanel, ResizableHandle 구조`,
    "scroll-area": `Radix ScrollArea 기반. 커스텀 스크롤바 스타일`,
    sheet: `Dialog 변형. 방향: top, right, bottom, left. SheetHeader, SheetBody`,
    "aspect-ratio": `Radix AspectRatio 기반. ratio prop (16/9, 4/3, 1)`,
    collapsible: `Radix Collapsible 기반. CollapsibleTrigger, CollapsibleContent`,
    accordion: `Radix Accordion 기반. type: single, multiple. AccordionItem, AccordionTrigger, AccordionContent`,
    tabs: `Radix Tabs 기반. TabsList, TabsTrigger, TabsContent. 애니메이션 전환`,
  };

  return specs[id] || "shadcn/ui 표준 패턴을 따라 구현";
}
