# 디자인: Primitives 페이지 레이아웃 개편 (REQ3 + REQ6)

## 1. 레퍼런스 리서치

| # | URL | 핵심 패턴 | 참고 포인트 |
|---|-----|-----------|-------------|
| 1 | https://dribbble.com/shots/17122423-Dashboard-Sidebar-Navigation-Tooltip-Dark-Light | 아이콘 전용 사이드바 + 우측 툴팁, 라이트/다크 모드 대응 | 56px 너비의 아이콘 전용 사이드바, 호버 시 우측 툴팁 등장, 활성 상태 좌측 인디케이터 바, 액션 버튼(하단)과 네비게이션 버튼(상단) 시각적 분리 |
| 2 | https://dribbble.com/shots/18111119-Collapsing-Sidebar-Navigation-Light-and-Dark-mode | 접이식 사이드바 아이콘 모드, 라이트/다크 전환 | 축소 상태에서 아이콘만 표시(~56px), 활성 항목에 배경색 강조, 구분선으로 기능 그룹 분리, 컴팩트한 패딩 구조 |
| 3 | https://dribbble.com/shots/14559212-Progress-Bar-Modal-Wizard-Stepped-Walkthrough | 위저드 스텝 진행 바, 중앙 정렬 제목, 좌우 네비게이션 | 3컬럼 구조 헤더(뒤로/제목/다음), 진행 상태 시각적 표현, 중앙 제목이 현재 단계를 명확히 표시 |
| 4 | https://www.figma.com/community/file/1344038523808556624/150-free-stepper-wizard-component-types | 150+ 스테퍼 위저드 컴포넌트, 헤더 내 스텝 표시 패턴 다수 | 3컬럼 그리드 헤더 패턴(좌: 진행 표시, 중앙: 제목, 우: 액션), 고정 높이 헤더, blur 배경 효과 |

## 2. Spacing 설계

### REQ3: 아이콘 툴바

| 요소 | 값 | Tailwind | 비고 |
|------|-----|----------|------|
| 툴바 전체 너비 | 56px | `w-14` | 기존 160px에서 축소, 아이콘+패딩 최적 |
| 툴바 세로 패딩 | 12px | `py-3` | 상하 여백 |
| 툴바 가로 패딩 | 0px | - | items-center로 중앙 정렬 |
| 버튼 크기 (일반) | 40x40px | `h-10 w-10` | 터치 타겟 44px 충족 근접, 시각적 균형 |
| 버튼 크기 (리셋) | 36x36px | `h-9 w-9` | 일반 버튼보다 약간 작게, 기능 차별화 |
| 버튼 아이콘 크기 | 16x16px | `h-4 w-4` | 기존 아이콘 크기 유지 |
| 버튼 간 간격 | 4px | `gap-1` | nav 내 섹션 버튼 간격 |
| 버튼 라운딩 | 8px | `rounded-lg` | 기존 패턴 유지 |
| 리셋-섹션 간 구분선 여백 | 8px 상하 | `my-2` | Separator 상하 마진 |
| 활성 인디케이터 | 좌측 2px bar | `before:absolute before:left-0 before:h-5 before:w-0.5 before:rounded-full before:bg-primary` | 레퍼런스 #1 참고, 활성 상태 좌측 바 |
| 툴팁 offset | 4px | `sideOffset={4}` | 버튼과 툴팁 사이 간격 |

### REQ6: 헤더 디자인

| 요소 | 값 | Tailwind | 비고 |
|------|-----|----------|------|
| 헤더 높이 | 56px | `h-14` | 기존 py-3 가변 -> 고정 높이 |
| 헤더 가로 패딩 | 24px | `px-6` | 기존 유지 |
| 그리드 갭 | 16px | `gap-4` | 3컬럼 간 간격 |
| 중앙 제목 텍스트 | 14px/semibold | `text-sm font-semibold` | 정보 전달 목적, 과하지 않은 크기 |
| max-width | 제거 | - | 기존 `max-w-5xl` 제거, 전체 너비 활용 |
| 하단 테두리 투명도 | 50% | `border-border/50` | 시각적 무게 경감 |
| 배경 투명도 | 95% | `bg-background/95` | 콘텐츠 가독성 + blur 효과 |
| 배경 blur | md (12px) | `backdrop-blur-md` | 기존 sm(4px) -> md(12px) 강화 |
| 그림자 | sm | `shadow-sm` | 은은한 깊이감 |

## 3. 컴포넌트 설계

### 사용할 @shadcn/* 컴포넌트

| 컴포넌트 | 경로 | 용도 | 상태 |
|----------|------|------|------|
| `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | `@shadcn/tooltip` | REQ3 아이콘 버튼 호버 툴팁 | 기설치 |
| `Separator` | `@shadcn/separator` | REQ3 리셋 버튼과 섹션 버튼 구분 | 기설치 |

### 사용할 @custom/* 컴포넌트

- 해당 없음

### 새로 만들 컴포넌트

- 해당 없음. 기존 `primitives-step-page.tsx` 내부 JSX를 직접 수정하여 구현. 툴바는 독립 컴포넌트로 분리할 만큼 복잡하지 않으므로 인라인 구현.

## 4. 색상 (oklch)

### 기존 테마 변수 활용

모든 색상은 기존 CSS 변수를 활용한다. 새로운 oklch 값 추가 불필요.

| 용도 | 라이트 모드 변수 | 다크 모드 변수 | Tailwind 클래스 |
|------|-----------------|---------------|----------------|
| 리셋 버튼 배경 | `--primary` 5% opacity | `--primary` 5% opacity | `bg-primary/5` |
| 리셋 버튼 호버 배경 | `--primary` 10% opacity | `--primary` 10% opacity | `hover:bg-primary/10` |
| 리셋 버튼 테두리 | `--primary` 30% opacity | `--primary` 30% opacity | `border-primary/30` |
| 리셋 버튼 텍스트 | `--primary` | `--primary` | `text-primary` |
| 일반 버튼 비활성 텍스트 | `--muted-foreground` | `--muted-foreground` | `text-muted-foreground` |
| 일반 버튼 호버 배경 | `--background` 50% opacity | `--background` 50% opacity | `hover:bg-background/50` |
| 일반 버튼 활성 배경 | `--background` | `--background` | `bg-background` |
| 활성 인디케이터 바 | `--primary` | `--primary` | `bg-primary` |
| 툴바 배경 | `--muted` 30% opacity | `--muted` 30% opacity | `bg-muted/30` |
| 헤더 배경 | `--background` 95% opacity | `--background` 95% opacity | `bg-background/95` |
| 헤더 테두리 | `--border` 50% opacity | `--border` 50% opacity | `border-border/50` |
| 중앙 제목 텍스트 | `--foreground` 80% opacity | `--foreground` 80% opacity | `text-foreground/80` |

## 5. Implementer 전달사항

### REQ3: 아이콘 툴바 구현 상세

**1. 전체 구조**

```tsx
<aside className="flex w-14 shrink-0 flex-col items-center border-r border-border bg-muted/30 py-3">
  <TooltipProvider delayDuration={0}>
    {/* 리셋 버튼 */}
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleResetPrimitives}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-primary/30 bg-primary/5 text-primary transition-colors hover:bg-primary/10"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={4}>
        기본값으로 초기화
      </TooltipContent>
    </Tooltip>

    {/* 구분선 */}
    <Separator className="my-2 w-8" />

    {/* 섹션 네비게이션 */}
    <nav className="flex flex-col items-center gap-1">
      {SECTIONS.map((section) => (
        <Tooltip key={section.id}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors",
                activeSection === section.id
                  ? "bg-background text-foreground shadow-sm before:absolute before:left-0 before:top-1/2 before:h-5 before:-translate-y-1/2 before:w-0.5 before:rounded-full before:bg-primary"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
              )}
            >
              <section.icon className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={4}>
            {section.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </nav>
  </TooltipProvider>
</aside>
```

**2. 핵심 스타일링 결정**

- `TooltipProvider`를 `<aside>` 내부 최상위에 1개만 배치 (`delayDuration={0}`). 개별 `Tooltip`마다 Provider를 감싸지 않는다.
- 리셋 버튼은 `h-9 w-9` (36px), 섹션 버튼은 `h-10 w-10` (40px). 리셋 버튼이 약간 작아 시각적 위계를 형성한다.
- 활성 섹션은 `before` 의사요소로 좌측 2px 인디케이터 바를 표시한다 (레퍼런스 #1 패턴).
- `Separator`는 `w-8`로 너비를 제한하여 양쪽 여백을 확보한다.
- 활성 상태 버튼에 `shadow-sm`을 추가하여 미세한 깊이감을 준다.

**3. import 추가**

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shadcn/tooltip";
import { Separator } from "@shadcn/separator";
```

**4. 다크모드 대응**

- 모든 색상이 CSS 변수 기반이므로 `.dark` 클래스 토글 시 자동 전환된다.
- `bg-primary/5`, `border-primary/30` 등 투명도 기반 값은 라이트/다크 모드 모두에서 자연스럽게 작동한다.
- `shadow-sm`은 다크모드에서 거의 보이지 않으나 라이트모드에서 미세한 깊이감을 제공한다.

### REQ6: 헤더 디자인 고도화 구현 상세

**1. 전체 구조**

```tsx
<header className="sticky top-0 z-50 h-14 border-b border-border/50 bg-background/95 shadow-sm backdrop-blur-md">
  <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
    {/* 좌: StepIndicator */}
    <div className="flex items-center justify-start">
      <StepIndicator steps={STEPS} current={current} />
    </div>

    {/* 중앙: 현재 스텝 제목 */}
    <div className="flex items-center justify-center">
      <h2 className="text-sm font-semibold text-foreground/80">
        {STEPS[current].label}
      </h2>
    </div>

    {/* 우: 다크모드 + 네비게이션 */}
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={togglePreviewDark}
        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        title="다크모드"
      >
        {previewDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      <StepNavigation steps={STEPS} current={current} />
    </div>
  </div>
</header>
```

**2. 핵심 스타일링 결정**

- `max-w-5xl` 제거: 위저드는 전체 너비를 사용하는 레이아웃이므로 (Primitives 페이지가 3컬럼 전체 너비), 헤더도 전체 너비를 활용한다.
- `grid-cols-[1fr_auto_1fr]`: 중앙 제목이 정확히 가운데에 위치하도록 좌우를 1fr로 균등 분할. `auto`는 중앙 제목의 자연스러운 너비.
- `h-14` (56px) 고정: 기존 `py-3` (패딩 기반 가변 높이 약 57px)를 고정 높이로 변경. 1px 차이이므로 `primitives-step-page.tsx`의 `h-[calc(100dvh-57px)]`를 `h-[calc(100dvh-56px)]`로 조정 필요. 다른 스텝 페이지도 동일 조정.
- `backdrop-blur-md` (12px): 기존 `backdrop-blur-sm` (4px)에서 강화. 콘텐츠 위로 스크롤될 때 blur 효과가 더 명확히 보인다.
- `shadow-sm`: 헤더가 콘텐츠 위에 떠 있는 느낌을 주되, 과하지 않은 그림자.
- `border-border/50`: 테두리 투명도를 50%로 낮춰 시각적 무게를 줄인다. 그림자와 함께 사용하여 부드러운 분리감을 만든다.

**3. 높이 변경 영향**

- 헤더 높이가 57px(approx) -> 56px로 변경되므로 Primitives 페이지의 컨테이너 높이 계산을 업데이트해야 한다.
- `h-[calc(100dvh-57px)]` -> `h-[calc(100dvh-56px)]`
- 다른 위저드 페이지에서도 헤더 높이를 참조하는 곳이 있다면 동일하게 조정한다.

**4. 반응형 고려사항**

- StepIndicator의 라벨은 기존대로 `hidden sm:inline`으로 모바일에서 숨긴다.
- 중앙 제목은 모든 화면에서 표시된다. 모바일에서 StepIndicator 라벨이 숨겨질 때 중앙 제목이 현재 단계를 명확히 전달하는 역할을 한다.
- 3컬럼 그리드는 모든 화면 크기에서 유지된다 (1fr/auto/1fr 비율은 자연스럽게 조정됨).

## 6. 디자인 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|-----------|-----------|-------------|-----------|
| 1 | 활성 섹션 표시 방법 | 좌측 2px 인디케이터 바 (`before` 의사요소) + 배경색 + shadow-sm | (A) 배경색만 변경, (B) 전체 좌측 보더, (C) 아이콘 색상만 변경 | 레퍼런스 #1(Dribbble 17122423)에서 좌측 인디케이터 바 패턴이 컴팩트한 아이콘 툴바에서 활성 상태를 가장 명확하게 전달. 배경색 + shadow와 조합하여 깊이감 확보. |
| 2 | 리셋 버튼과 섹션 버튼 크기 차이 | 리셋 36px / 섹션 40px | (A) 동일 크기 40px, (B) 리셋만 32px으로 더 작게 | 리셋은 보조 액션이므로 약간 작게 하되, 터치 타겟 최소 36px 유지. 레퍼런스 #2에서 기능 그룹 간 크기 차이를 두는 패턴 확인. |
| 3 | 리셋 버튼 색상 | primary 계열 (border-primary/30 bg-primary/5 text-primary) | (A) destructive 계열 (빨간색), (B) muted-foreground (일반과 동일) | "기본값 복원"은 파괴적 행위가 아니라 안전한 복원 행위. primary 색상으로 "주요 도구" 느낌 전달. destructive는 삭제/위험 행위에 예약. |
| 4 | 헤더 max-width 제거 여부 | 제거 (전체 너비 사용) | (A) max-w-5xl 유지, (B) max-w-7xl로 확대 | Primitives 페이지는 전체 뷰포트를 3컬럼(사이드바+폼+프리뷰)으로 분할한다. 헤더만 max-w-5xl로 제한하면 시각적 불일치 발생. 전체 너비 사용으로 레이아웃 일관성 확보. |
| 5 | 헤더 중앙 콘텐츠 | 현재 스텝 제목 텍스트만 | (A) 스텝 번호 + 제목, (B) 프로그레스 바, (C) 브레드크럼 | StepIndicator가 이미 좌측에서 번호와 진행 상태를 표시하므로 중앙은 제목만으로 충분. 프로그레스 바는 StepIndicator와 기능 중복. 레퍼런스 #3에서 중앙에 텍스트 제목만 배치하는 패턴이 가장 깔끔. |
| 6 | 헤더 그리드 vs flex | `grid grid-cols-[1fr_auto_1fr]` | (A) flex + justify-between + 중앙 absolute, (B) grid grid-cols-3 균등 분할 | 1fr/auto/1fr 그리드는 중앙 제목이 정확히 뷰포트 중앙에 위치하도록 보장. absolute 배치는 좌우 콘텐츠와 겹침 위험. 균등 분할(grid-cols-3)은 중앙 컬럼이 불필요하게 넓어짐. |
| 7 | Tooltip delayDuration | 0ms (즉시 표시) | (A) 200ms 지연, (B) 500ms 지연 | 아이콘 전용 툴바에서 라벨이 없으므로 사용자가 각 버튼의 기능을 빠르게 파악해야 한다. 지연 없이 즉시 표시하여 학습 부담 최소화. shadcn Tooltip 기본값도 0ms. |
| 8 | Separator 너비 | `w-8` (32px, 패딩 포함 56px 중 중앙 영역) | (A) `w-full` (전체 너비), (B) `w-6` (24px) | 전체 너비 구분선은 시각적으로 무겁다. 32px로 제한하여 양쪽 12px 여백을 확보, 미니멀한 구분감 유지. |
| 9 | 배경 blur 강도 | backdrop-blur-md (12px) | (A) backdrop-blur-sm (4px, 기존), (B) backdrop-blur-lg (16px) | sm은 스크롤 시 blur 효과가 거의 인지되지 않음. lg는 과도하게 흐려져 콘텐츠 가독성 저하. md는 적절한 깊이감을 제공하면서 가독성 유지. |
