# 디자인: 라이브 프리뷰 정제 (Preview Refinement)

## 1. 레퍼런스 리서치

| # | URL | 핵심 패턴 | 참고 포인트 |
|---|-----|-----------|-------------|
| 1 | https://dribbble.com/shots/24468573-Admin-Dashboard-Panel-UI-Shadcn-UI-Horizon-UI | shadcn/ui 기반 Admin Dashboard. 카드 내부 여백 16px(px-4), 탭 높이 36px(h-9), 프로그레스 바 8px(h-2). 전체적으로 compact한 밀도. | shadcn/ui 기반 대시보드에서 카드 여백이 px-6이 아닌 px-4 수준으로 compact하게 사용됨. 탭은 h-9 유지. 프로그레스 바는 h-2 이상 사용하여 시인성 확보. |
| 2 | https://dribbble.com/shots/25292734-Project-Management-Dashboard | 프로젝트 관리 대시보드. 카드 내 통계/프로젝트 목록이 compact 패딩(12-16px)으로 구성. 탭 바가 얇고 밀도 높음. 프로그레스 바가 4-8px 높이로 명확히 보임. | 카드 내부 콘텐츠가 px-4 py-3 수준. 모바일에서는 px-3 py-2로 더 줄어듦. 프로그레스 바는 최소 h-2(8px) 이상이어야 진행률 구분 가능. |
| 3 | https://dribbble.com/shots/15261147-Dashboard-Card-Stats-Metrics-TailwindCSS-Component | Tailwind CSS 기반 Stats Card. 카드 헤더-콘텐츠 간격 gap-4(16px), 내부 여백 p-4(16px). 깔끔한 계층 구조. | Tailwind 기반 카드에서 p-4(16px) 사용이 표준. p-6(24px)은 넓은 카드 전용. 대시보드 compact 카드는 p-3~p-4가 일반적. |
| 4 | https://www.pinterest.com/usemuzli/350+-dashboard-ui-inspiration-2025/ | 350+ 대시보드 UI 컬렉션(2025). 카드 여백 12-16px, 탭 높이 32-40px, 프로그레스 바 6-10px가 주류. | 2025 대시보드 트렌드: compact 밀도(여백 축소), 명확한 시각 계층(타이포 스케일 활용), 플랫폼별 적응형 패딩. |
| 5 | https://mobbin.com/explore/web/screens/dashboard | Mobbin 웹 대시보드 패턴. 실제 서비스(Notion, Linear, Vercel 등) 기반. 카드 여백 12-20px, 탭 높이 36px 전후, 진행 바 8px. | 실제 프로덕션 서비스에서 카드 여백은 px-4~px-5(16-20px) 범위. 모바일은 px-3(12px)으로 축소. |

---

## 2. shadcn 기본 스타일 조사 결과

### 2-1. 프로젝트 내 shadcn 컴포넌트 실제 코드

아래는 `app/shared/components/shadcn/` 디렉토리의 실제 코드에서 추출한 기본값이다.

#### Card (`card.tsx`)

| 서브컴포넌트 | 기본 클래스 | 패딩/여백 분석 |
|-------------|-----------|---------------|
| `Card` | `flex flex-col gap-6 rounded-xl border py-6` | **gap-6 (24px)**: 자식 간 수직 간격. **py-6 (24px)**: 상하 패딩. 좌우 패딩 없음(자식이 개별 px-6 사용). |
| `CardHeader` | `grid ... gap-2 px-6` | **px-6 (24px)**: 좌우 패딩. 수직 패딩 없음(부모 gap-6이 간격 담당). |
| `CardContent` | `px-6` | **px-6 (24px)**: 좌우 패딩만. 수직 패딩 없음. |
| `CardFooter` | `flex items-center px-6` | **px-6 (24px)**: 좌우 패딩만. |

핵심 발견: shadcn 최신 버전(프로젝트에 설치된 버전)은 Card에 `py-6`과 `gap-6`을 사용하고, 자식 컴포넌트는 `px-6`만 사용한다. 이전 버전의 `p-6`(전방향 24px) 구조에서 변경됨.

#### Tabs (`tabs.tsx`)

| 서브컴포넌트 | 기본 클래스 | 높이/패딩 분석 |
|-------------|-----------|---------------|
| `TabsList` | `rounded-lg p-[3px] group-data-[orientation=horizontal]/tabs:h-9` | **h-9 (36px)**: horizontal 탭 높이. **p-[3px]**: 내부 패딩 3px. |
| `TabsTrigger` | `... px-2 py-1 text-sm ...` | **px-2 (8px)**: 좌우 패딩. **py-1 (4px)**: 상하 패딩. **text-sm**: 폰트 크기. |
| `TabsContent` | `flex-1 outline-none` | 패딩 없음(사용처에서 지정). |

핵심 발견: TabsList는 **h-9 (36px)**이 공식 기본값. TabsTrigger는 **py-1 (4px)**이 기본값. 이미 compact한 수준이다.

#### Progress (`progress.tsx`)

| 서브컴포넌트 | 기본 클래스 | 높이 분석 |
|-------------|-----------|----------|
| `Progress (Root)` | `bg-primary/20 relative h-2 w-full overflow-hidden rounded-full` | **h-2 (8px)**: 기본 높이. |
| `Indicator` | `bg-primary h-full w-full flex-1 transition-all` | 부모 높이 상속. |

핵심 발견: Progress 기본값은 **h-2 (8px)**. live-preview.tsx에서 `h-1.5`로 오버라이드하여 6px로 축소한 것이 문제.

---

### 2-2. shadcn 기본값 vs live-preview.tsx 현재값 비교

| 컴포넌트 | 속성 | shadcn 기본값 | live-preview 현재값 | 차이 | 권장 변경 |
|---------|------|-------------|--------------------|----|----------|
| **Card** | 구조 | `py-6 gap-6` + 자식 `px-6` | N/A (Card는 기본 사용) | 일치 | 변경 없음 |
| **CardContent** (ProjectCards L735) | padding | `px-6` (수직 패딩 없음) | `px-6 py-4` | **py-4 추가됨** (불필요한 수직 패딩) | `px-4 py-3` (Web/Tablet), `px-3 py-2` (Mobile) |
| **CardContent** (FormSection L757) | padding | `px-6` | `pt-6` (gap 대체용) | 합당한 오버라이드 | 유지 |
| **CardHeader** (StatsCards L680) | padding-bottom | 부모 gap-6 사용 | `pb-2` | compact화 (합당) | 유지 |
| **CardHeader** (MembersTable L814) | padding-bottom | 부모 gap-6 사용 | `pb-3` | compact화 (합당) | 유지 |
| **CardHeader** (ChartCard L703) | padding-bottom | 부모 gap-6 사용 | `pb-2` | compact화 (합당) | 유지 |
| **TabsList** | height | `h-9` (36px) | `h-9` (기본 사용) | 일치 | **h-9 유지** |
| **TabsTrigger** | padding | `px-2 py-1` | `py-1` (기본 사용) | 일치 | **py-1 유지** |
| **Progress** (ProjectCards L744) | height | `h-2` (8px) | `h-1.5` (6px) | **기본값 대비 25% 축소** | `h-2` (shadcn 기본값 복원) |
| **Progress** (FormSection L790) | height | `h-2` (8px) | 기본값 사용 | 일치 | 변경 없음 |

---

## 3. Spacing 설계

### 3-1. 카드 여백 (CardContent) - 플랫폼별

| 플랫폼 | 현재값 | 권장값 | Tailwind | 근거 |
|--------|--------|--------|---------|------|
| Web | `px-6 py-4` | `px-4 py-3` | `px-4 py-3` | 레퍼런스 #1,#3: 대시보드 카드 내부 여백 16px(px-4)이 표준. py-3(12px)으로 수직 여백 축소. |
| Tablet | `px-6 py-4` | `px-4 py-3` | `px-4 py-3` | Web과 동일. 태블릿 화면(768-1024px)에서 px-6은 과다. |
| Mobile | `px-6 py-4` | `px-3 py-2` | `px-3 py-2` | 375px 화면 기준 px-6(48px)은 콘텐츠 영역의 12.8% 점유. px-3(24px)으로 절반 축소. |

### 3-2. 전체 콘텐츠 패딩 - 플랫폼별

| 플랫폼 | 요소 | 현재값 | 권장값 | Tailwind |
|--------|------|--------|--------|---------|
| Web | 메인 콘텐츠 영역 | `p-6` | `p-6` | `p-6` (유지) |
| Tablet | 메인 콘텐츠 영역 | `p-6` | `p-4` | `p-4` |
| Mobile | 메인 콘텐츠 영역 | `p-6` (`px-4 py-4` 혼재) | `p-3` | `p-3` |

### 3-3. Progress 바

| 요소 | 현재값 | 권장값 | Tailwind | 근거 |
|------|--------|--------|---------|------|
| ProjectCards Progress | `h-1.5` (6px) | `h-2` (8px) | `h-2` | shadcn 기본값 복원. 레퍼런스 #2: 최소 8px 이상이어야 진행률 시인성 확보. |
| FormSection Progress | `h-2` (기본) | `h-2` (유지) | 변경 없음 | 이미 기본값 사용 중. |

---

## 4. 컴포넌트 설계

### 사용할 @shadcn/* 컴포넌트
- `@shadcn/card` (Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter)
- `@shadcn/tabs` (Tabs, TabsList, TabsTrigger, TabsContent)
- `@shadcn/progress` (Progress)
- 기타 기존 사용 컴포넌트 유지 (Button, Input, Label, Badge, Avatar, Table, Checkbox, Switch, Separator)

### 사용할 @custom/* 컴포넌트
- 없음 (기존 컴포넌트 스타일 보정만 수행)

### 새로 만들 컴포넌트
- 없음

### shadcn 컴포넌트 수정 여부

| 컴포넌트 | 수정 여부 | 이유 |
|---------|----------|------|
| `tabs.tsx` | **수정 불필요** | TabsList h-9, TabsTrigger py-1 모두 이미 shadcn 최신 기본값. 01-plan.md에서 h-10 -> h-9 언급이 있었으나 실제 코드는 이미 h-9. |
| `card.tsx` | **수정 불필요** | Card 구조(py-6, gap-6, px-6)는 shadcn 최신 구조와 일치. live-preview.tsx에서 className 오버라이드로 조정. |
| `progress.tsx` | **수정 불필요** | 기본값 h-2는 정확. live-preview.tsx의 오버라이드(h-1.5) 제거만 하면 됨. |

---

## 5. 색상 (oklch)

- 기존 테마 변수 활용: 모든 컬러는 `usePreviewTokens` 훅이 생성하는 oklch CSS 변수 그대로 사용.
- 새 색상 필요: **없음**. 이번 작업은 spacing/sizing 보정만 해당.

---

## 6. Implementer 전달사항

### 6-1. 수정이 필요한 파일 및 라인 번호

#### `live-preview.tsx` - CardContent 여백 보정

| 라인 | 현재 코드 | 권장 변경 | REQ |
|------|----------|----------|-----|
| L735 | `<CardContent className="flex items-center gap-4 px-6 py-4">` | 플랫폼별 조건부: Web/Tablet `px-4 py-3`, Mobile `px-3 py-2` | REQ-5 |

구현 예시:
```tsx
<CardContent className={cn(
  "flex items-center gap-4",
  isMobile ? "px-3 py-2" : "px-4 py-3",
)}>
```

참고: `ProjectCards` 함수는 현재 `platform` prop을 받고 있지만 `isMobile` 변수가 내부에 없으므로, 함수 상단에 `const isMobile = platform === "mobile";` 추가 필요.

#### `live-preview.tsx` - Progress 높이 복원

| 라인 | 현재 코드 | 권장 변경 | REQ |
|------|----------|----------|-----|
| L744 | `<Progress value={p.progress} className="h-1.5" />` | `<Progress value={p.progress} className="h-2" />` 또는 className 오버라이드 제거 | REQ-7 |

기본값이 h-2이므로 className 오버라이드를 제거하는 것이 가장 깔끔:
```tsx
<Progress value={p.progress} />
```

#### `live-preview.tsx` - 플랫폼별 콘텐츠 패딩

| 라인 | 현재 코드 | 권장 변경 | REQ |
|------|----------|----------|-----|
| L347 | `<div className="flex-1 overflow-auto p-6">` (SidebarShell) | `p-6` -> 플랫폼별: Web `p-6`, Tablet `p-4`, Mobile `p-3` | REQ-8 |
| L398-400 | `isMobile ? "px-4 py-4" : "px-8 py-6"` (TopnavShell) | Tablet 조건 추가: `isMobile ? "p-3" : isTablet ? "p-4" : "px-8 py-6"` | REQ-8 |
| L433 | `<div className="flex-1 overflow-auto p-6 pb-20">` (DockShell) | `p-6` -> 플랫폼별 + `pb-20` 유지 | REQ-8 |

SidebarShell 구현 예시 (L347):
```tsx
<div className={cn(
  "flex-1 overflow-auto",
  isMobile ? "p-3" : isTablet ? "p-4" : "p-6",
)}>
```

DockShell 구현 예시 (L433):
```tsx
<div className={cn(
  "flex-1 overflow-auto pb-20",
  platform === "mobile" ? "p-3" : platform === "tablet" ? "p-4" : "p-6",
)}>
```

### 6-2. 탭 관련 결정 사항 (REQ-6)

**결론: shadcn/tabs.tsx 수정 불필요**

- TabsList: `h-9` (36px) -- 이미 shadcn 최신 기본값. 변경 불필요.
- TabsTrigger: `py-1` (4px) -- 이미 shadcn 최신 기본값. 변경 불필요.
- 01-plan.md에서 "h-10 -> h-9" 언급이 있었으나, 실제 코드 확인 결과 **이미 h-9**이다.
- 탭 자체가 과도하게 높아 보이는 것은 탭 높이 문제가 아니라, 주변 카드/콘텐츠 여백이 과다하여 상대적으로 탭이 두꺼워 보이는 시각적 착시. 카드 여백(REQ-5)과 콘텐츠 패딩(REQ-8) 보정 후 전체 밀도가 개선되면 탭 높이도 자연스러워진다.

### 6-3. 전체 수정 위치 요약

| # | 파일 | 라인 | 변경 내용 | REQ |
|---|------|------|----------|-----|
| 1 | `live-preview.tsx` | L735 | CardContent `px-6 py-4` -> 플랫폼별 조건부 | REQ-5 |
| 2 | `live-preview.tsx` | L744 | Progress `className="h-1.5"` 제거 (기본값 h-2 복원) | REQ-7 |
| 3 | `live-preview.tsx` | L347 | SidebarShell 메인 콘텐츠 `p-6` -> 플랫폼별 조건부 | REQ-8 |
| 4 | `live-preview.tsx` | L398-400 | TopnavShell 콘텐츠 패딩 Tablet 조건 추가 | REQ-8 |
| 5 | `live-preview.tsx` | L433 | DockShell 콘텐츠 `p-6` -> 플랫폼별 조건부 | REQ-8 |
| 6 | `shadcn/tabs.tsx` | -- | **수정 없음** (h-9, py-1 이미 기본값) | REQ-6 |

### 6-4. 추가 고려사항

1. **ProjectCards 함수 내 isMobile 변수**: L724의 `ProjectCards` 함수는 `platform` prop을 받지만 내부에 `isMobile` 선언이 없다. REQ-5 적용 시 함수 상단에 `const isMobile = platform === "mobile";` 추가 필요.

2. **LandingShell 하단 카드 여백**: L507-525의 LandingShell 하단 feature 카드들도 CardContent가 기본 px-6을 사용 중. 이 카드들은 설명 텍스트만 포함하므로 현재 구조 유지해도 무방하나, 일관성을 위해 동일하게 조정 가능 (Implementer 판단).

3. **DockShell pb-20 유지**: Dock 플로팅 영역을 위한 `pb-20`은 플랫폼별 패딩 변경과 별도로 반드시 유지해야 함.

---

## 7. 디자인 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|-----------|-----------|-------------|-----------|
| 1 | CardContent 여백 기준 | Web/Tablet: `px-4 py-3`, Mobile: `px-3 py-2` | A) shadcn 기본값 유지 (px-6만) B) 모든 플랫폼 px-4 py-3 통일 C) Web px-5, Tablet px-4, Mobile px-3 (3단계) | A는 py가 없어 Card gap-6에 의존하지만 live-preview에서 직접 CardContent를 사용하는 구조에서는 py 명시 필요. B는 Mobile에서 여전히 과다. C는 px-5가 Tailwind에서 20px이라 8pt 그리드에 맞지 않음. 채택안은 8pt 그리드(16px/12px) 준수하며 레퍼런스 #1,#3과 일치. |
| 2 | TabsList 높이 변경 여부 | h-9 유지 (변경 없음) | A) h-8로 축소 B) h-10으로 확대 | 실제 코드 확인 결과 이미 h-9(36px)이며 shadcn 공식 최신 기본값과 일치. 탭이 두꺼워 보이는 원인은 탭 자체가 아니라 주변 여백 과다로 인한 상대적 착시. REQ-5,8 적용 후 자연스러운 비율 확보. |
| 3 | TabsTrigger 패딩 변경 여부 | py-1 유지 (변경 없음) | A) py-0.5로 축소 B) py-1.5로 확대 | py-1(4px)은 shadcn 최신 기본값. 최소 터치/클릭 영역(h-[calc(100%-1px)]로 부모 높이 채움)이 확보되어 있어 추가 조정 불필요. |
| 4 | Progress 높이 복원 방법 | className 오버라이드 제거 (기본값 h-2 사용) | A) h-2 명시적 지정 B) h-2.5로 더 키움 | shadcn progress.tsx가 이미 h-2를 기본값으로 정의하므로, 오버라이드를 제거하는 것이 가장 shadcn 일관적. h-2.5(10px)는 카드 내 프로그레스 바로는 과도. |
| 5 | 플랫폼별 콘텐츠 패딩 기준 | Web p-6, Tablet p-4, Mobile p-3 | A) Web p-8, Tablet p-6, Mobile p-4 B) 모든 플랫폼 p-4 통일 | A는 Web에서 과다 여백. B는 Mobile에서 과다. 채택안은 레퍼런스 #4(Mobbin 실제 서비스 분석) 기반: 데스크톱 24px, 태블릿 16px, 모바일 12px이 프로덕션 표준. |
| 6 | Card 내부 gap 조정 여부 | 조정하지 않음 (Card 기본 gap-6 유지) | A) Card에 className="gap-4" 오버라이드 | Card의 gap-6은 CardHeader/CardContent 사이 간격을 담당. CardContent에 py를 별도 지정하는 live-preview 구조에서는 gap이 중복되지 않으므로 유지. 불필요한 오버라이드 추가는 shadcn 기본 구조 파괴. |
| 7 | LandingShell 하단 카드 여백 조정 | Implementer 판단에 위임 | A) ProjectCards와 동일하게 조건부 적용 B) 현재 상태 유지 | LandingShell 하단 카드는 제목+설명만 포함하는 단순 구조. Card 기본 py-6 + CardContent px-6으로 충분한 여백. 단, Implementer가 전체 일관성을 위해 조정 가능. |
