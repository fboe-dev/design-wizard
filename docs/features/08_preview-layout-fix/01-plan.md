# 기획: Primitives 미리보기 제어 구조 개선

## 목적

Primitives 페이지 (`/wizard/primitives`)의 미리보기 제어 UI를 개선하여 사용자 경험을 향상시킨다.
- 프리뷰 헤더를 제거하고 디바이스 사이즈 선택 UI를 좌측 FormSection으로 이동
- 선택된 디바이스 사이즈와 미리보기 크기를 동기화하여 정확한 프리뷰 제공
- 플랫폼별 반응형 레이아웃(Tablet/Mobile)을 복원하여 각 플랫폼에 최적화된 미리보기 제공

## 요구사항 → 파일 매핑

| REQ | 수정 파일 | 핵심 변경 |
|-----|-----------|----------|
| REQ1 | `app/features/wizard/pages/primitives-step-page.tsx` | L314-355 프리뷰 헤더 블록 제거, L358-362 LivePreview 컨테이너만 유지 |
| REQ2 | `app/features/wizard/pages/primitives-step-page.tsx` | L305 다음에 디바이스 사이즈 Select 추가 (DEVICE_OPTIONS[platformTarget] 사용) |
| REQ3 | `app/features/wizard/components/live-preview.tsx` | L6 DEVICE_OPTIONS import, L197-225 미리보기 컨테이너 구조 변경 (overflow-auto + 고정 width/height), device.width/height 계산 추가 |
| REQ4 | `app/features/wizard/components/live-preview.tsx` | SidebarShell (L240-345), TopnavShell (L347-397), LandingShell (L452-518), 페이지 콘텐츠 (L524-837) 내부 tablet 전용 레이아웃 추가 |

## 상태 관리 변경

**변경 없음** — 기존 상태 그대로 사용:
- `platformTarget` (PlatformTarget): web/tablet/mobile
- `selectedDevice` (string): 디바이스 이름 (예: "Desktop 1920")

버전 마이그레이션: **불필요**

영향받는 generators: **없음** (미리보기 UI 개선만, 프롬프트 생성 로직 무관)

## 파일 구조

```
app/features/wizard/
  ├── pages/
  │   └── primitives-step-page.tsx   [수정] 프리뷰 헤더 제거, 디바이스 Select 추가
  ├── components/
  │   └── live-preview.tsx           [수정] 미리보기 크기 동기화, 반응형 레이아웃 복원
  └── constants.ts                   [읽기 전용] DEVICE_OPTIONS 참조

app/shared/stores/useWizardStore/
  └── index.ts                       [읽기 전용] 상태 참조만

docs/features/08_preview-layout-fix/
  ├── checklist.md                   [기존]
  ├── 01-plan.md                     [작성 중]
  └── tests/                         [구현 후 Playwright 테스트 작성]
```

## 완료 기준

1. **REQ1 (프리뷰 헤더 제거)**
   - Primitives 페이지 진입 → 우측 패널 상단에 디바이스 드롭다운과 국기 아이콘 헤더 **표시 안 됨**
   - LivePreview 컴포넌트가 패널 상단부터 표시됨 (헤더 없이 바로 크롬 헤더 시작)

2. **REQ2 (디바이스 사이즈 Select 추가)**
   - Primitives 페이지 → 좌측 FormSection 스크롤 → 스타일 섹션 하단 "타겟 플랫폼" (Web/Tablet/Mobile 칩) 아래에 "디바이스 사이즈" 라벨과 Select 드롭다운 표시
   - Web 선택 시: Desktop 1920/Laptop 1366/Desktop 1280 옵션
   - Tablet 선택 시: iPad Mini/iPad Air/iPad Pro 11/iPad Pro 12.9 옵션
   - Mobile 선택 시: iPhone SE/iPhone 12/iPhone 16 Pro/iPhone 16 Pro Max 옵션

3. **REQ3 (미리보기 크기 동기화 및 가로 스크롤)**
   - "Desktop 1920" 선택 → 미리보기 너비 1920px (브라우저 개발자 도구로 div 너비 확인)
   - ResizablePanel 우측 패널을 1000px로 축소 → 미리보기 컨테이너 가로 스크롤 표시, 1920px 전체 콘텐츠 스크롤 가능
   - "iPad Pro 12.9" 선택 → 미리보기 너비 1024px, 높이 1366px (세로 스크롤 가능)
   - "iPhone SE" 선택 → 미리보기 너비 375px, 높이 667px

4. **REQ4 (반응형 레이아웃 복원)**
   - **Tablet - SidebarShell**: 사이드바 너비 200px, 네비게이션 라벨 text-xs, 검색창 placeholder만 표시 (아이콘 + 축소)
   - **Tablet - TopnavShell**: 네비게이션 메뉴 2개만 표시 (Dashboard, Settings), 폰트 text-xs
   - **Tablet - LandingShell**: 카드 그리드 2컬럼 (현재 web 3컬럼, mobile 1컬럼), 제목 폰트 text-3xl (web 4xl과 mobile 2xl 중간)
   - **Mobile - SidebarShell**: 사이드바 숨김, 헤더에 메뉴 버튼 표시 (현재 구현 유지)
   - **Mobile - TopnavShell**: 네비게이션 메뉴 전체 숨김, 메뉴 버튼 표시 (현재 구현 유지)
   - **Mobile - LandingShell**: 카드 그리드 1컬럼, 제목 text-2xl (현재 구현 유지)

## 테스트 시나리오

| REQ | 위저드 단계 | 동작 | 기대 결과 |
|-----|------------|------|----------|
| REQ1 | Primitives | 페이지 진입 | 우측 패널 상단 헤더 없음, LivePreview만 표시 |
| REQ2 | Primitives | 좌측 FormSection 스크롤 → 스타일 섹션 | 타겟 플랫폼 아래 "디바이스 사이즈" Select 표시 |
| REQ2 | Primitives | Web 선택 → Select 드롭다운 열기 | Desktop 1920/Laptop 1366/Desktop 1280 옵션 표시 |
| REQ2 | Primitives | Tablet 선택 → Select 드롭다운 열기 | iPad 시리즈 4개 옵션 표시 |
| REQ2 | Primitives | Mobile 선택 → Select 드롭다운 열기 | iPhone 시리즈 4개 옵션 표시 |
| REQ3 | Primitives | Desktop 1920 선택 (패널 넓음) | 미리보기 너비 1920px, 스크롤 없음 |
| REQ3 | Primitives | Desktop 1920 선택 (패널 1000px로 축소) | 미리보기 가로 스크롤 표시, 1920px 콘텐츠 스크롤 가능 |
| REQ3 | Primitives | iPad Pro 12.9 선택 | 미리보기 너비 1024px, 높이 1366px |
| REQ3 | Primitives | iPhone SE 선택 | 미리보기 너비 375px, 높이 667px |
| REQ4 | Primitives | Tablet 선택 → SidebarShell 미리보기 | 사이드바 너비 200px, 네비게이션 text-xs, 검색창 축소 |
| REQ4 | Primitives | Tablet 선택 → TopnavShell 미리보기 | 네비게이션 메뉴 2개 (Dashboard, Settings), text-xs |
| REQ4 | Primitives | Tablet 선택 → LandingShell 미리보기 | 카드 그리드 2컬럼, 제목 text-3xl |
| REQ4 | Primitives | Mobile 선택 → SidebarShell 미리보기 | 사이드바 숨김, 메뉴 버튼 표시 (기존 유지) |
| REQ4 | Primitives | Mobile 선택 → TopnavShell 미리보기 | 네비게이션 숨김, 메뉴 버튼 표시 (기존 유지) |
| REQ4 | Primitives | Mobile 선택 → LandingShell 미리보기 | 카드 1컬럼, 제목 text-2xl (기존 유지) |

## Designer 전달사항

**새로운 UI 패턴 필요 여부: 없음**

이유:
- 디바이스 사이즈 Select는 기존 shadcn Select 컴포넌트 재사용 (프리뷰 헤더에서 사용하던 것과 동일)
- 반응형 레이아웃은 기존 Tailwind 클래스 조합으로 구현 (text-xs, grid-cols-2, width 조정)
- 다크모드 고려: 기존 CSS 변수 (--background, --foreground 등) 그대로 사용하여 자동 대응
- oklch 컬러: 상태 변경 없으므로 영향 없음

## Implementer 전달사항

### 구현 순서

1. **primitives-step-page.tsx** (REQ1 → REQ2 순차)
   - REQ1: L314-355 프리뷰 헤더 블록 전체 제거 (div.className="flex items-center justify-between border-b...")
   - REQ1: L358-362 LivePreview 컨테이너는 유지 (부모 div + LivePreview 컴포넌트)
   - REQ2: L305 닫는 태그 다음에 디바이스 사이즈 섹션 추가:
     ```tsx
     <div className="space-y-2">
       <p className="text-sm font-medium">디바이스 사이즈</p>
       <Select value={selectedDevice} onValueChange={setSelectedDevice}>
         <SelectTrigger className="w-full">
           <SelectValue />
         </SelectTrigger>
         <SelectContent>
           {DEVICE_OPTIONS[platformTarget].map((device) => (
             <SelectItem key={device.name} value={device.name}>
               {device.name} ({device.width}×{device.height})
             </SelectItem>
           ))}
         </SelectContent>
       </Select>
     </div>
     ```

2. **live-preview.tsx** (REQ3 → REQ4 독립적, 병렬 가능)
   - REQ3: L6에 `import { DEVICE_OPTIONS } from "../constants";` 추가
   - REQ3: L190 LivePreview 함수 내부에 디바이스 크기 계산 로직 추가:
     ```tsx
     const device = DEVICE_OPTIONS[platform].find(d => d.name === state.selectedDevice)
       ?? DEVICE_OPTIONS[platform][0];
     const previewWidth = device.width;
     const previewHeight = device.height;
     ```
   - REQ3: L197-225 전체 구조 변경:
     - 최외곽 `<div className="overflow-hidden rounded-xl border border-border">` 제거
     - L210-213 컨테이너를 `overflow-auto` 부모 + 고정 크기 내부 div로 변경:
       ```tsx
       <div className="flex min-h-0 flex-1 items-start justify-center overflow-auto p-4">
         <div
           className="shrink-0 overflow-hidden rounded-xl border border-border bg-background font-sans text-foreground"
           style={{ width: previewWidth, minHeight: previewHeight, ...cssTokens }}
         >
           {/* 기존 L202-224 내용 (크롬 헤더 + 프리뷰 콘텐츠) */}
         </div>
       </div>
       ```
   - REQ3: L202-207 크롬 헤더 레이블은 현재 `getDeviceLabel()` 사용 중, 그대로 유지

   - REQ4: **SidebarShell** (L240-345)
     - L244 `isTablet` 변수 실제 사용: 사이드바 너비 200px, 네비게이션 라벨 text-xs
     - L270-274 검색창: `isTablet`일 때 placeholder 없음 또는 짧게 변경 (optional, 시각적으로 축소 효과)
     - L277-294 네비게이션 아이템: `isTablet`일 때 `text-xs` 추가
     ```tsx
     <button
       className={cn(
         "flex w-full items-center gap-2.5 rounded-md px-3 py-2 transition-colors",
         isTablet ? "text-xs" : "text-sm",
         active === item.id ? "..." : "..."
       )}
     >
       <item.icon className="h-4 w-4" />
       {item.label}
     </button>
     ```

   - REQ4: **TopnavShell** (L347-397)
     - L348 `isTablet` 변수 추가: `const isTablet = platform === "tablet";`
     - L362-369 네비게이션 메뉴: `!isMobile`을 `!isMobile && !isTablet`로 변경하거나, tablet일 때 2개만 표시:
     ```tsx
     {!isMobile && (
       <nav className="flex items-center gap-6 text-sm">
         <span className={cn("cursor-pointer font-semibold text-foreground", isTablet && "text-xs")}>
           {t.dashboard}
         </span>
         {!isTablet && <span className="cursor-pointer text-muted-foreground">{t.overview}</span>}
         {!isTablet && <span className="cursor-pointer text-muted-foreground">{t.members}</span>}
         <span className={cn("cursor-pointer text-muted-foreground", isTablet && "text-xs")}>
           {t.settings}
         </span>
       </nav>
     )}
     ```

   - REQ4: **LandingShell** (L452-518)
     - L453 `isTablet` 변수 추가: `const isTablet = platform === "tablet";`
     - L477 제목 폰트: `isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"`
     - L498 카드 그리드: `isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"`

   - REQ4: **페이지 콘텐츠** (L524-837)
     - L663 StatsCards: `platform === "mobile" ? "grid-cols-1" : platform === "tablet" ? "grid-cols-2" : "grid-cols-3"`
     - L747 FormSection 내부 grid: `platform === "mobile" ? "grid-cols-1" : "grid-cols-2"` (tablet도 2컬럼으로 통일)
     - L593 SidebarPageContent 네비게이션 너비: `isTablet`일 때 `w-[140px]` (현재 web 기본 180px)

### 주의사항

1. **다크모드**: 모든 UI 요소는 CSS 변수 (--background, --foreground 등) 사용하여 다크모드 자동 대응. inline style 추가 시 oklch 컬러 변수 사용 금지 (cssTokens에 이미 계산됨)

2. **oklch**: REQ3에서 `style` prop에 `width`, `minHeight` 추가 시 기존 `cssTokens` 스프레드 연산자 유지 필요:
   ```tsx
   style={{ width: previewWidth, minHeight: previewHeight, ...cssTokens }}
   ```

3. **store 마이그레이션**: 상태 변경 없으므로 버전 업그레이드 불필요. `version: 4` 그대로 유지.

4. **DEVICE_OPTIONS 참조**: `primitives-step-page.tsx` L11에서 이미 import됨. `live-preview.tsx`에서 추가 import 필요.

5. **REQ1 구현 시 주의**: L314-355 전체 블록 제거하되, L312-364 구조에서 헤더 div만 제거하고 부모 `<div className="flex h-full flex-col">` (L313)와 LivePreview 컨테이너 (L358-362)는 반드시 유지.

6. **REQ3 스크롤 처리**: 부모 div에 `overflow-auto` 적용 시 ResizablePanel의 flex 레이아웃과 충돌 방지를 위해 `flex-1` 클래스 유지 필요. 내부 미리보기 div는 `shrink-0`로 고정 크기 보장.

7. **반응형 레이아웃 테스트**: Tablet 레이아웃은 Web과 Mobile 중간 단계이므로, 각 쉘에서 isTablet 분기를 추가하되 기존 isMobile 로직과 충돌하지 않도록 조건 순서 확인 (isMobile → isTablet → web 순).

## 설계 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|----------|----------|-----------|----------|
| 1 | 프리뷰 헤더 제거 후 디바이스 Select 위치 | FormSection 스타일 섹션 하단에 추가 | (a) 프리뷰 패널 내부 유지 (b) 별도 floating UI | FormSection은 모든 디자인 설정이 모여있는 논리적 위치. 타겟 플랫폼 선택과 디바이스 사이즈가 밀접하게 연관되어 있어 같은 섹션에 배치하면 사용자 인지 부담 감소. floating UI는 패널 크기 변경 시 위치 계산 복잡도 증가. |
| 2 | 미리보기 크기 동기화 방식 | CSS `width`/`minHeight` 직접 설정 + 부모 `overflow-auto` | (a) CSS transform scale() (b) iframe 사용 | transform scale()은 레이아웃 계산 복잡 + 텍스트 흐림 현상. iframe은 CSS 변수 상속 문제 + 스타일 전달 오버헤드. 직접 크기 설정은 실제 디바이스 픽셀 정확히 재현 + 스크롤 자연스러움. |
| 3 | 가로 스크롤 처리 | 부모 패널에 `overflow-auto`, 내부 미리보기 `shrink-0` | (a) 미리보기 자체에 overflow (b) 가로 스크롤 금지, 축소 표시 | 부모 overflow는 ResizablePanel 전체 영역을 스크롤 가능하게 하여 사용자 경험 자연스러움. 미리보기 자체 overflow는 이중 스크롤 발생. 축소 표시는 요구사항에서 명시한 "선택된 가로 길이대로" 표시 원칙 위반. |
| 4 | Tablet 반응형 레이아웃 기준 | Web과 Mobile 중간 단계 (사이드바 축소 200px, 그리드 2컬럼, 메뉴 축소) | (a) Web과 동일 (b) Mobile과 동일 | 원문에서 "이전 반응형 레이아웃이 git으로 되돌려졌다"고 언급 → 이전 구현 의도 불명. 일반적인 웹 디자인 모범 사례: Tablet은 터치 UI + 중간 해상도 고려, 사이드바 유지하되 공간 절약 (축소), 그리드는 2컬럼 (1컬럼은 너무 단조, 3컬럼은 좁음). |
| 5 | 디바이스 사이즈 Select 옵션 표시 | 현재 platformTarget에 맞는 디바이스만 표시 | (a) 모든 플랫폼 디바이스 그룹화 표시 (기존 프리뷰 헤더 방식) | 요구사항에서 "제거했던 플랫폼별 사이즈를 선택할 수 있는 콤보박스"라고 명시 → 플랫폼별로 필터링하여 표시하는 것이 사용자 인지 부담 감소. Web 선택 시 iPad 옵션 보이면 혼란. 기존 프리뷰 헤더는 모든 플랫폼 표시했으나, FormSection 이동 시 타겟 플랫폼 선택과 연동하여 현재 플랫폼만 표시하는 것이 일관성 높음. |
| 6 | 크롬 헤더 유지 여부 | 유지 (기존 L202-207) | (a) 제거 (b) 디바이스 목업 프레임 추가 | 요구사항에서 "프리뷰 헤더 제거"는 L314-355 드롭다운+국기 아이콘 헤더를 의미. 크롬 헤더 (L202-207)는 미리보기 콘텐츠의 일부로, 디바이스 정보 표시 역할. 제거 시 사용자가 현재 어떤 디바이스를 보고 있는지 알기 어려움. 목업 프레임 (macOS 윈도우, iPad 프레임) 추가는 요구사항 범위 초과 + 구현 복잡도 증가. |
| 7 | REQ4 반응형 레이아웃 적용 범위 | SidebarShell, TopnavShell, LandingShell, 페이지 콘텐츠 (StatsCards, FormSection, SidebarPageContent) | (a) 쉘만 수정 (b) 모든 콘텐츠 개별 수정 | 원문에서 "타블렛과 모바일 레이아웃을 해상도에 맞는 반응형 레이아웃을 수정"이라고 명시 → 전체 미리보기 경험 개선 의도. 쉘만 수정하면 내부 콘텐츠가 잘리거나 레이아웃 깨짐. 페이지 콘텐츠 (그리드, 폼) 포함하여 전체 반응형 적용해야 사용자가 실제 디바이스 경험 정확히 미리볼 수 있음. |
