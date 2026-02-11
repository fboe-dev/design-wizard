# 디자인: 헤더 재구성 + 플로팅 네비게이션

## 1. 레퍼런스 리서치

| # | URL | 핵심 패턴 | 참고 포인트 |
|---|-----|-----------|-------------|
| 1 | https://m3.material.io/components/floating-action-button/guidelines | Material Design 3 FAB 가이드라인 — 원형 버튼, 그림자, 크기 체계(Small 40dp / Regular 56dp / Large 96dp), 컨테이너 색상 | FAB 크기를 48px(Small~Regular 사이)로 결정. 그림자 레벨(elevation 3=shadow-lg). 컨테이너는 primary 색상이 아닌 surface+border로 적용하여 콘텐츠 위 부유 효과 강조 |
| 2 | https://dribbble.com/tags/floating-navigation | Dribbble 플로팅 네비게이션 갤러리 — 하단 중앙 고정, 필(pill) 형태 컨테이너 내 버튼 그룹, backdrop-blur 배경, 둥근 모서리 | 두 버튼을 감싸는 pill 컨테이너(rounded-full + bg-card/80 + backdrop-blur) 패턴 채택. 개별 버튼이 떠있는 것보다 시각적 응집력 우수 |
| 3 | https://mobbin.com/glossary/top-navigation-bar | Mobbin 탑 네비게이션 바 — 좌(브랜드 로고+텍스트), 중앙(탭/스텝), 우(액션 아이콘) 3컬럼 구조 | 헤더 3컬럼 구조의 표준 패턴 확인. 좌측 브랜드는 auto 폭, 중앙 영역 1fr로 유연 확장, 우측 액션 auto 폭 |
| 4 | https://dribbble.com/search/step-wizard-ui | Dribbble 위저드 스텝 UI — 헤더 내 수평 스테퍼, 원형 번호+연결선, 현재 스텝 강조 링 | 기존 StepIndicator 패턴이 업계 표준과 일치함을 확인. 중앙 배치 시 justify-center 필수 |

## 2. Spacing 설계

### REQ-4: 헤더 레이아웃

| 요소 | 값 | Tailwind | 비고 |
|------|-----|---------|------|
| 헤더 높이 | 56px | `h-14` | 기존 유지 |
| 헤더 좌우 패딩 | 24px | `px-6` | 기존 유지 |
| 그리드 갭 | 16px | `gap-4` | 기존 유지 |
| 그리드 컬럼 | auto / 1fr / auto | `grid-cols-[auto_1fr_auto]` | 좌(브랜드) 최소, 중앙(StepIndicator) 확장, 우(다크모드) 최소 |
| 브랜드 아이콘 크기 | 32x32px | `h-8 w-8` | 요구사항 명시 |
| 브랜드 텍스트-아이콘 간격 | 8px | `gap-2` | 아이콘과 텍스트 사이 |
| 브랜드 텍스트 | font-bold, text-sm | `text-sm font-bold` | 헤더 높이 대비 적절한 텍스트 크기 |
| 다크모드 버튼 크기 | 32x32px | `h-8 w-8` | 기존 유지 |

### REQ-7: 플로팅 네비게이션

| 요소 | 값 | Tailwind | 비고 |
|------|-----|---------|------|
| 컨테이너 위치 (bottom) | 32px | `bottom-8` | 콘텐츠 하단에서 충분한 거리 |
| 컨테이너 정렬 | 수평 중앙 | `left-1/2 -translate-x-1/2` | 화면 중앙 고정 |
| 컨테이너 패딩 | 6px | `p-1.5` | pill 내부 여백 |
| 컨테이너 둥글기 | 9999px | `rounded-full` | pill 형태 |
| 컨테이너 배경 | card/80% + blur | `bg-card/80 backdrop-blur-lg` | 반투명 글래스모피즘 |
| 컨테이너 보더 | 1px border | `border border-border/50` | 미묘한 경계선 |
| 컨테이너 그림자 | shadow-lg | `shadow-lg` | MD3 elevation 3 수준 |
| 버튼 크기 | 48x48px | `h-12 w-12` | MD3 Small FAB(40) ~ Regular(56) 사이. 터치 타겟 48px 충족 |
| 버튼 둥글기 | 9999px | `rounded-full` | 완전 원형 |
| 버튼 간 간격 | 8px | `gap-2` | pill 내부에서 자연스러운 간격 |
| 아이콘 크기 | 20x20px | `h-5 w-5` | 48px 버튼 내 적절한 비율 (약 42%) |
| "이전" 버튼 스타일 | ghost variant | `bg-transparent hover:bg-accent` | 보조 액션 |
| "다음" 버튼 스타일 | primary | `bg-primary text-primary-foreground` | 주요 액션 강조 |
| 다크모드 컨테이너 | card/80% (dark card) | 자동 적용 | oklch 다크 테마 변수 활용 |

## 3. 컴포넌트 설계

### 사용할 @shadcn/* 컴포넌트
- `@shadcn/button` -- FloatingNavigation의 버튼에 `Button` 컴포넌트 활용. `size="icon-lg"` variant + `rounded-full` 오버라이드, 또는 직접 스타일링

### 사용할 @custom/* 컴포넌트
- 없음

### 새로 만들 컴포넌트

#### `FloatingNavigation` (`app/features/wizard/components/floating-navigation.tsx`)

**구조:**
```
<div fixed container (pill)>
  <Button "이전" (ghost, rounded-full, icon-only)>
    <ChevronLeft />
  </Button>
  <Button "다음" (primary, rounded-full, icon-only)>
    <ChevronRight />
  </Button>
</div>
```

**Props:**
```typescript
interface FloatingNavigationProps {
  steps: Step[];
  current: number;
}
```

**동작:**
- `isFirst` (current === 0): 이전 버튼 클릭 시 `navigate("/")`로 홈 이동
- `isLast` (current === steps.length - 1): 다음 버튼 숨김 또는 비활성 (output 페이지에서는 프롬프트 생성 별도 처리)
- 그 외: 이전 `navigate(steps[current - 1].path)`, 다음 `navigate(steps[current + 1].path)`

**마지막 스텝 처리:**
- Output(생성) 페이지에서는 "다음" 버튼을 Sparkles 아이콘 + primary 스타일로 유지하되, 기존 StepNavigation과 동일하게 빈 onClick (output 페이지 내부 로직 사용)

**접근성:**
- `aria-label="이전 단계"` / `aria-label="다음 단계"`
- `title` 속성으로 툴팁 제공

### 기존 컴포넌트 수정

#### `wizard-shell.tsx` 헤더 영역
- 좌측: `<Link to="/">` 감싸기 + `<img>` (app-icon.png, h-8 w-8) + `<span>` ("Design Wizard", font-bold text-sm text-foreground)
- 중앙: `<StepIndicator>` 이동 (justify-center)
- 우측: 다크모드 토글만 (StepNavigation 제거)
- 중앙 제목 `<h2>` 제거

## 4. 색상 (oklch)

### 기존 테마 변수 활용 (새 색상 불필요)

| 용도 | 변수 | Light 값 | Dark 값 |
|------|------|-----------|---------|
| "다음" 버튼 배경 | `--primary` | `oklch(0.623 0.214 259.815)` | `oklch(0.546 0.245 262.881)` |
| "다음" 버튼 텍스트 | `--primary-foreground` | `oklch(0.97 0.014 254.604)` | `oklch(1 0 0)` |
| "이전" 버튼 hover | `--accent` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` |
| 컨테이너 배경 | `--card` | `oklch(1 0 0)` | `oklch(0.21 0.006 285.885)` |
| 컨테이너 보더 | `--border` | `oklch(0.92 0.004 286.32)` | `oklch(1 0 0 / 10%)` |
| 브랜드 텍스트 | `--foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` |

새 oklch 값 추가 불필요. 기존 테마 시스템으로 light/dark 모드 자동 대응.

## 5. Implementer 전달사항

### REQ-7: FloatingNavigation 구현 상세

1. **파일 위치:** `app/features/wizard/components/floating-navigation.tsx`
2. **컨테이너 CSS:** `fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/50 bg-card/80 p-1.5 shadow-lg backdrop-blur-lg`
3. **"이전" 버튼 CSS:** `h-12 w-12 rounded-full` + Button variant="ghost" 또는 직접: `inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground`
4. **"다음" 버튼 CSS:** `inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90`
5. **아이콘:** ChevronLeft / ChevronRight (lucide-react), `h-5 w-5`. 마지막 스텝은 Sparkles 아이콘
6. **z-index:** `z-40` (헤더 z-50보다 낮게, 콘텐츠 위)
7. **콘텐츠 하단 여백:** `<main>` 영역에 `pb-24` 추가하여 플로팅 버튼과 콘텐츠 겹침 방지

### REQ-4: 헤더 레이아웃 구현 상세

1. **그리드 변경:** `grid-cols-[1fr_auto_1fr]` -> `grid-cols-[auto_1fr_auto]`
2. **좌측 셀:** `<Link to="/" className="flex items-center gap-2">` + `<img src={appIconUrl} alt="Design Wizard" className="h-8 w-8" />` + `<span className="text-sm font-bold text-foreground">Design Wizard</span>`
3. **app-icon.png import:** `import appIconUrl from "~/assets/app-icon.png"` (Vite asset import)
4. **중앙 셀:** `<div className="flex items-center justify-center">` + `<StepIndicator />`
5. **우측 셀:** 다크모드 토글 버튼만 (기존 스타일 유지, `justify-end`)
6. **중앙 제목 제거:** 기존 `<h2>{STEPS[current].label}</h2>` JSX 블록 삭제
7. **StepNavigation import 및 사용 제거**

### 반응형 고려사항

- 플로팅 네비게이션: 모바일에서도 동일 크기 유지 (48px 터치 타겟은 모바일 최소 기준)
- StepIndicator 중앙 배치: sm 이하에서 레이블 숨김은 기존 로직 유지 (`hidden sm:inline`)
- 브랜드 텍스트: sm 이하에서 숨김 고려 (`hidden sm:inline`) -- 아이콘만 표시하여 StepIndicator 공간 확보

### 다크모드 검증 포인트

- 플로팅 컨테이너가 다크 배경에서 충분히 구분되는지 (card/80 + border)
- "이전" 버튼 hover 시 accent 색상이 다크 모드에서 보이는지
- 그림자(shadow-lg)가 다크 모드에서 과하지 않은지

## 6. 디자인 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|-----------|-----------|-------------|-----------|
| 1 | 플로팅 버튼 크기 | 48px (`h-12 w-12`) | 40px (`h-10 w-10`), 56px (`h-14 w-14`) | MD3 FAB 가이드라인에서 Small(40dp)~Regular(56dp) 범위. 48px는 WCAG 터치 타겟 최소 44px 충족하면서 헤더 높이(56px)와 조화. 56px는 pill 컨테이너가 과도하게 커짐 |
| 2 | 버튼 배치 방식 | pill 컨테이너 내 그룹 | 개별 버튼 2개 분리 배치 | Dribbble 플로팅 네비게이션 레퍼런스에서 pill 형태가 시각적 응집력 우수. 분리 배치 시 두 버튼의 관계가 모호하고, 화면 양쪽 끝에 배치하면 시선 분산 |
| 3 | 컨테이너 배경 | `bg-card/80 backdrop-blur-lg` (글래스모피즘) | `bg-card` (불투명), `bg-primary/10` (컬러 틴트) | 기존 헤더가 `bg-background/95 backdrop-blur-md`를 사용. 동일한 글래스모피즘 언어 유지. 불투명 배경은 콘텐츠 위 부유감 부족 |
| 4 | "이전" 버튼 스타일 | ghost (투명 배경) | outline (보더), secondary (회색 배경) | "다음"이 primary여서 시각적 위계 필요. ghost는 pill 컨테이너 내에서 자연스럽게 녹아들면서 hover 시만 배경 표시. 기존 StepNavigation의 "이전" 버튼도 동일한 ghost 패턴 |
| 5 | "다음" 버튼 스타일 | primary (bg-primary) | outline, ghost | 기존 StepNavigation에서 "다음" 버튼이 primary 스타일. 일관성 유지. 원형으로 변경해도 primary 컬러로 주요 액션 강조 |
| 6 | 아이콘 크기 | 20px (`h-5 w-5`) | 16px (`h-4 w-4`), 24px (`h-6 w-6`) | 48px 버튼 대비 20px 아이콘은 약 42% 비율. MD3 권장 비율(아이콘/컨테이너)에 근접. 16px는 너무 작아 시인성 저하, 24px는 버튼 대비 과대 |
| 7 | 하단 고정 위치 | `bottom-8` (32px) | `bottom-6` (24px), `bottom-10` (40px) | 32px는 콘텐츠와 충분한 거리를 확보하면서 화면 하단에서 접근성 양호. 24px는 모바일 제스처 영역과 충돌 가능, 40px는 콘텐츠 가용 공간 과도한 침범 |
| 8 | 헤더 그리드 구조 | `grid-cols-[auto_1fr_auto]` | `flex justify-between`, `grid-cols-3` | Mobbin 레퍼런스 패턴. auto-1fr-auto는 좌/우 콘텐츠 크기가 다를 때 중앙 요소가 정확히 가운데 정렬됨. flex justify-between은 중앙 정렬 불안정. grid-cols-3 균등 분할은 좌/우 영역에 불필요한 공간 낭비 |
| 9 | 브랜드 영역 링크 | `<Link to="/">` 래핑 | 링크 없는 정적 표시 | 브랜드 로고 클릭 시 홈 이동은 웹 표준 패턴. 사용자 기대에 부합. 기존 "홈으로" 버튼이 플로팅으로 이동하므로, 헤더 브랜드 클릭 홈 이동은 보조 네비게이션으로 유용 |
| 10 | z-index 설정 | `z-40` (플로팅 네비게이션) | `z-50` (헤더와 동일), `z-30` | 헤더(z-50)보다 낮아야 시각적 계층 유지. z-30은 popover/dropdown(보통 z-50)과 혼재 시 가려질 위험. z-40은 콘텐츠 위, 헤더 아래로 적절한 계층 |
| 11 | 콘텐츠 하단 여백 | `pb-24` (96px) | `pb-20` (80px), `pb-28` (112px) | pill 컨테이너 높이(약 48+12=60px) + bottom-8(32px) = 92px. pb-24(96px)로 약간의 여유 확보. pb-20은 겹침 위험, pb-28은 과도한 빈 공간 |
| 12 | 브랜드 텍스트 모바일 표시 | `hidden sm:inline` (모바일 숨김) | 항상 표시, 항상 숨김 | StepIndicator가 중앙에 위치하면서 4스텝+연결선으로 넓은 공간 필요. sm 미만에서 브랜드 텍스트 숨기면 아이콘만 표시되어 공간 절약. 항상 표시 시 StepIndicator 영역 압축 |
