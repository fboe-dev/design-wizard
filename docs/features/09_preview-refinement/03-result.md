# 결과: 라이브 프리뷰 정제 (Preview Refinement)

## 구현 요약

Primitives 단계의 LivePreview 컴포넌트에서 8개 REQ를 구현했다. 주요 변경 사항: 프리뷰 좌측 정렬, Web 디바이스 사이즈 정규화(1440/1280/1024), text-base 활용 확대, lg/5xl 스케일 활용 및 6xl 제거, 카드 여백 플랫폼별 조건부 적용, Progress 높이 복원, 플랫폼별 밀도 일관성 강화.

---

## REQ-1: 프리뷰 가로 스크롤 좌측 잘림 수정

### 변경 파일
- `/Users/brian/Projects/design-wizard/app/features/wizard/pages/primitives-step-page.tsx` (L319)
  - `justify-center` -> `justify-start`

### 스크린샷 서술
- **01-req1-scroll-left.png**: Web Desktop 1440 선택 상태. 프리뷰가 좌측 정렬되어 있다. 좌측 패널에 "스타일" 섹션의 디바이스 사이즈 드롭다운에 "Desktop 1440 (1440x900)"이 표시된다. 프리뷰 패널에는 사이드바의 MyApp 로고, 검색 바, "대시보드/받은편지함/사용자/설정" 네비게이션 메뉴가 완전히 보인다. 메인 영역에 "프로젝트 설정" 페이지 헤더와 폼 섹션이 표시된다. 프리뷰 좌측 끝이 잘리지 않고 완전히 노출된다.
- **02-req1-scroll-right.png**: 동일한 상태에서 스크롤 최우측. 프리뷰 오른쪽 끝의 폼 영역(카테고리 입력, 공개 토글, 68% 텍스트, 삭제 버튼)이 완전히 보인다.

---

## REQ-2: Web 디바이스 사이즈 정규화

### 변경 파일
- `/Users/brian/Projects/design-wizard/app/features/wizard/constants.ts` (L952-957)
  - `Desktop 1920 (1920x1080)` -> `Desktop 1440 (1440x900)`
  - `Laptop 1366 (1366x768)` -> `Laptop 1280 (1280x800)`
  - `Desktop 1280 (1280x720)` -> `Compact 1024 (1024x768)`
- `/Users/brian/Projects/design-wizard/app/shared/stores/useWizardStore/index.ts` (L45)
  - `selectedDevice` 기본값: `"Desktop 1920"` -> `"Desktop 1440"`

### 스크린샷 서술
- **03-req2-desktop-1440.png**: 크롬 헤더에 "Desktop 1440 -- 1440x900" 표시. 디바이스 드롭다운에 "Desktop 1440 (1440x900)" 선택됨. 프리뷰가 1440px 너비로 렌더링되어 사이드바(240px) + 메인 영역이 표시된다. 메인 영역에 SimplePageContent(프로젝트 설정 폼)가 보인다.
- **04-req2-laptop-1280.png**: 크롬 헤더에 "Laptop 1280 -- 1280x800" 표시. 디바이스 드롭다운에 "Laptop 1280 (1280x800)" 선택됨. 프리뷰 너비가 1440보다 좁아 우측 폼 영역이 약간 좁아진 것이 보인다.
- **05-req2-compact-1024.png**: 크롬 헤더에 "Compact 1024 -- 1024x768" 표시. 디바이스 드롭다운에 "Compact 1024 (1024x768)" 선택됨. 가장 좁은 Web 사이즈로, 사이드바와 메인 영역이 콤팩트하게 배치되어 있다. 폼의 프로젝트 이름/카테고리 입력 필드가 가로로 나란히 표시된다.

---

## REQ-3: Base 폰트 크기 실제 반영

### 변경 파일
- `/Users/brian/Projects/design-wizard/app/features/wizard/components/live-preview.tsx`
  - SidebarShell 네비게이션 항목: `isTablet ? "text-xs" : "text-sm"` -> `"text-base"` (L291)
  - TopnavShell 네비게이션: `text-sm` -> `text-base`, `isTablet && "text-xs"` 조건 제거 (L372-376)
  - SidebarPageContent 메뉴: `text-sm` -> `text-base` (L612)
  - PageHeader description: `text-sm` -> `text-base` (L659)
  - Breadcrumb 영역: `text-sm` -> `text-base` (L323)
  - ProjectCards 타이틀: `text-sm` -> `text-base` (L738)
  - ProjectCards 설명: `text-xs` -> `text-sm` (L741)
  - LandingShell 카드 타이틀: `text-sm` -> `text-base` (L518)
  - LandingShell 카드 설명: `text-xs` -> `text-sm` (L521)
  - FormSection 진행률 표시: `text-sm` -> `text-base` (L788)

### 스크린샷 서술
- **06-req3-base-14px.png**: Base 크기 14px 설정. 좌측 타이포그래피 섹션에서 Base 슬라이더가 14px에 위치하고, 스케일 미리보기에서 base가 14px, sm이 12px, xs가 11px으로 표시된다. 프리뷰의 사이드바 메뉴("대시보드/받은편지함/사용자/설정") 텍스트가 기본 16px보다 작게 렌더링되어 있다. 메인 영역의 "프로젝트 설정" 헤더와 폼 레이블도 작아져 있다. 6xl 항목이 스케일 미리보기에 없고 5xl(42px)까지만 표시된다.
- **07-req3-base-18px.png**: Base 크기 18px 설정. Base 슬라이더가 18px에 위치하고, 스케일 미리보기에서 base가 18px, sm이 16px으로 표시된다. 프리뷰의 "MyApp" 로고 옆 텍스트, 사이드바 메뉴, 검색 바 텍스트가 14px 대비 확연히 커져 있다. 5xl이 54px로 크게 표시된다. 메인 영역의 "프로젝트 설정" 헤더와 "프로젝트 기본 설정을 관리합니다" 설명 텍스트가 커져서 시각적으로 차이가 명확하다.

---

## REQ-4: 미사용 타이포그래피 스케일 활용 (lg, 5xl)

### 변경 파일
- `/Users/brian/Projects/design-wizard/app/features/wizard/components/live-preview.tsx`
  - PageHeader h1: `text-xl` -> `text-lg` (L658)
  - DashboardGridContent h1: `text-xl` -> `text-lg` (L636)
  - LandingShell 히어로: `text-2xl/text-3xl/text-4xl` -> `text-3xl/text-4xl/text-5xl` (반응형) (L487)
- `/Users/brian/Projects/design-wizard/app/features/wizard/components/scale-configurator.tsx`
  - TW_SIZES에서 `"6xl": 3.75` 제거 (L52)

### 스크린샷 서술
- **08-req4-ratio-08.png**: Landing 레이아웃, Scale Ratio 0.8 설정. 스케일 미리보기에서 5xl이 39px, base가 16px으로 표시된다. 프리뷰에 Landing 페이지가 보이며, "New Release" 배지 아래의 히어로 타이틀이 상대적으로 작게 렌더링되어 있다. "무료로 시작" 버튼이 보인다. 비율이 0.8이라 전체적으로 스케일 간 차이가 적다.
- **09-req4-ratio-15.png**: Scale Ratio 1.5 설정. 스케일 미리보기에서 5xl이 83px, 4xl이 54px로 매우 크게 표시된다. 프리뷰의 Landing 히어로 타이틀("더 빠르게,")이 매우 크게 렌더링되어 화면 대부분을 차지한다. "New Release" 배지와 "무료로 시작" 버튼 사이의 크기 대비가 극적이다. base(16px)와 5xl(83px) 사이의 스케일 차이가 확연하다.

---

## REQ-5: 카드 여백 정규화

### 변경 파일
- `/Users/brian/Projects/design-wizard/app/features/wizard/components/live-preview.tsx`
  - ProjectCards: `isMobile` 변수 추가 (L725), CardContent `px-6 py-4` -> 조건부 `isMobile ? "px-3 py-2" : "px-4 py-3"` (L735)

### 스크린샷 서술
- **10-req5-card-web.png**: Web Tab Page 레이아웃. "대시보드" 페이지에 "개요/멤버/설정" 탭이 보이고, "총 사용자 2,847 +12.5%" 통계 카드가 표시된다. 아래에 "디자인 시스템 / 진행중" 프로젝트 카드가 보이며 카드 내부 좌우 여백이 px-4(16px) 수준으로 콤팩트하다. 카드 본문 "컴포넌트 라이브러리 및 디자인 토큰 정의"가 text-sm으로 표시된다. "API 리팩토링 / 검토중" 카드도 보인다.
- **11-req5-card-mobile.png**: Mobile Tab Page 레이아웃. iPhone SE (375x667) 디바이스. 사이드바가 숨겨지고 햄버거 메뉴가 표시된다. "대시보드" 헤더와 "+ 새 프로젝트" 버튼이 보인다. 통계 카드가 1열 세로 배치되어 "총 사용자 2,847 +12.5%", "활성 프로젝트 24 +3" 순으로 표시된다. 카드 내부 여백이 px-3(12px) py-2(8px)로 더 좁아져 모바일 화면에서 콘텐츠가 더 많이 보인다.

---

## REQ-6: 탭 높이 조정

### 변경 사항
- **수정 불필요** (02-design.md 결론)
- TabsList h-9(36px), TabsTrigger py-1(4px) 이미 shadcn 최신 기본값

### 스크린샷 서술
- **12-req6-tab-before.png**: Web Tab Page 레이아웃. "개요/멤버/설정" 탭이 h-9(36px) 높이로 렌더링되어 있다. 탭 아래 통계 카드와 프로젝트 카드가 표시된다. 탭의 높이가 주변 콘텐츠와 비례하여 자연스러운 수준이다.
- **13-req6-tab-after.png**: 동일 상태 (수정 없으므로). 탭 높이가 h-9(36px)을 유지하며 shadcn 기본값과 일치한다.

---

## REQ-7: Progress 바 높이 증가

### 변경 파일
- `/Users/brian/Projects/design-wizard/app/features/wizard/components/live-preview.tsx`
  - ProjectCards Progress: `className="h-1.5"` 오버라이드 제거 (기본값 h-2 복원) (L744)

### 스크린샷 서술
- **14-req7-progress-before.png**: 이 스크린샷은 수정 후 상태이다 (수정 전 스크린샷은 별도 촬영하지 못함). Web Tab Page 레이아웃에서 "디자인 시스템" 프로젝트 카드 오른쪽에 Progress 바가 파란색으로 표시되어 있다. h-2(8px) 높이로 진행률이 명확하게 구분 가능하다. "API 리팩토링" 카드의 Progress 바도 동일한 높이로 42% 진행률을 보여준다.
- **15-req7-progress-after.png**: 동일한 상태. Progress 바가 h-2(8px) 높이로 렌더링되어 h-1.5(6px) 대비 33% 두꺼워졌다. 진행률 구분이 육안으로 명확하다.

---

## REQ-8: 플랫폼별 밀도 일관성 강화

### 변경 파일
- `/Users/brian/Projects/design-wizard/app/features/wizard/components/live-preview.tsx`
  - SidebarShell 메인 콘텐츠: `p-6` -> `isMobile ? "p-3" : isTablet ? "p-4" : "p-6"` (L347)
  - TopnavShell 콘텐츠: `isMobile ? "px-4 py-4" : "px-8 py-6"` -> `isMobile ? "p-3" : isTablet ? "p-4" : "px-8 py-6"` (L398-400)
  - DockShell 콘텐츠: `p-6 pb-20` -> `platform === "mobile" ? "p-3" : platform === "tablet" ? "p-4" : "p-6"` + `pb-20` 유지 (L433)

### 스크린샷 서술
- **16-req8-web-density.png**: Web Desktop 1440 SidebarShell. 메인 콘텐츠 영역에 p-6(24px) 패딩이 적용되어 있다. "프로젝트 설정" 헤더와 폼 카드 사이에 넉넉한 간격이 있다. 사이드바 240px 너비에 "대시보드/받은편지함/사용자/설정" 메뉴가 text-base로 표시된다.
- **17-req8-tablet-density.png**: Tablet iPad Mini (768x1024) SidebarShell. 사이드바 200px 너비. 메인 콘텐츠 영역에 p-4(16px) 패딩이 적용되어 Web(24px) 대비 좁아졌다. "프로젝트 설정" 헤더와 폼 카드가 더 가깝게 배치되어 태블릿 화면에 맞는 밀도를 보여준다. 검색 바가 아이콘만 표시되는 콤팩트 모드이다.
- **18-req8-mobile-density.png**: Mobile iPhone SE (375x667). 사이드바 숨김, 햄버거 메뉴 표시. 메인 콘텐츠 영역에 p-3(12px) 패딩이 적용되어 가장 좁은 밀도이다. "프로젝트 설정" 헤더 아래 폼이 1열 배치되며 프로젝트 이름/카테고리가 세로로 배치된다. 이메일 알림/공개 토글, 진행률 68%, 저장/취소/초기화/삭제 버튼이 모두 한 화면에 보인다.

---

## 수정 이력

| # | 시점 | 파일 | 변경 내용 | 결과 |
|---|------|------|----------|------|
| 1 | Phase 1 | `primitives-step-page.tsx` L319 | `justify-center` -> `justify-start` | 성공 |
| 2 | Phase 1 | `constants.ts` L952-957 | DEVICE_OPTIONS.web 3개 항목 변경 | 성공 |
| 3 | Phase 1 | `useWizardStore/index.ts` L45 | selectedDevice 기본값 변경 | 성공 |
| 4 | Phase 1 | `live-preview.tsx` L744 | Progress `className="h-1.5"` 제거 | 성공 |
| 5 | Phase 2 | `scale-configurator.tsx` L52 | TW_SIZES에서 `"6xl": 3.75` 제거 | 성공 |
| 6 | Phase 2 | `live-preview.tsx` 10개 위치 | text-sm -> text-base, text-xs -> text-sm | 성공 |
| 7 | Phase 2 | `live-preview.tsx` L658, L636 | PageHeader/DashboardGrid h1 text-xl -> text-lg | 성공 |
| 8 | Phase 2 | `live-preview.tsx` L487 | LandingShell 히어로 text-2xl/3xl/4xl -> text-3xl/4xl/5xl | 성공 |
| 9 | Phase 3 | `live-preview.tsx` L725, L735 | ProjectCards isMobile 추가, CardContent 조건부 패딩 | 성공 |
| 10 | Phase 3 | `live-preview.tsx` L347 | SidebarShell 메인 콘텐츠 p-6 -> 플랫폼별 조건부 | 성공 |
| 11 | Phase 3 | `live-preview.tsx` L398-400 | TopnavShell 콘텐츠 Tablet 조건 추가 | 성공 |
| 12 | Phase 3 | `live-preview.tsx` L433 | DockShell 콘텐츠 p-6 -> 플랫폼별 조건부 + pb-20 유지 | 성공 |
| 13 | Phase 4 | 테스트 파일 | REQ-8 Mobile 테스트 locator 수정 (previewContainer 기준으로 변경) | 1차 실패 후 수정하여 통과 |

---

## 의사결정 로그

| # | 결정 사항 | 채택한 안 | 근거 |
|---|-----------|-----------|------|
| 1 | TopnavShell nav의 isTablet && text-xs 조건 제거 | text-base 통일 | REQ-3 목적이 Base 폰트를 실제 반영하는 것. 플랫폼 무관하게 text-base 사용하여 baseSize 변경 시 모든 플랫폼에서 동일하게 반영 |
| 2 | ProjectCards 설명 text-xs -> text-sm (text-base 아님) | text-sm 유지 | 카드 본문 설명은 보조 텍스트이므로 타이틀(text-base)보다 한 단계 아래. 타이포 위계: text-base(주요) > text-sm(보조) > text-xs(캡션) |
| 3 | DashboardGridContent h1도 text-lg로 변경 | PageHeader와 동일하게 text-lg | DashboardGridContent도 페이지 레벨 헤더이므로 PageHeader와 동일한 스케일 적용. 일관성 확보 |
| 4 | LandingShell 하단 카드 타이틀 text-sm -> text-base | text-base 적용 | 02-design.md 6-2항 "Implementer 판단"에 따라 일관성을 위해 text-base 적용. 카드 타이틀은 주요 텍스트 |
| 5 | DockShell pb-20과 p-3/p-4/p-6의 동시 적용 | cn() 내에서 pb-20을 별도 첫 인자로 유지 | Tailwind v4에서 pb-20이 p-* 이후 선언되면 padding-bottom을 오버라이드. cn()에서 pb-20을 첫 번째에 넣고 p-* 조건을 두 번째로 배치하되, p-*의 padding-bottom은 pb-20이 후속 적용되도록 구조 유지 |
| 6 | REQ-6 탭 수정 불필요 판단 수용 | Designer 결론 수용 | 02-design.md에서 "TabsList h-9, TabsTrigger py-1 이미 shadcn 최신 기본값"으로 결론. 실제 코드 확인 결과 동일하여 수정하지 않음 |
| 7 | Store 버전 4 유지 | 마이그레이션 불필요 | selectedDevice 기본값만 변경. 기존 사용자가 "Desktop 1920"을 저장한 경우 드롭다운에서 해당 옵션이 없으므로 첫 번째 항목(Desktop 1440)으로 자동 fallback |

---

## 빌드 결과

```
npm run build: 성공 (vite build, SSR bundle 포함)
npm run typecheck: 성공 (react-router typegen + tsc)
보안 grep (eval, dangerouslySetInnerHTML): 0건
파괴적 git 명령어: 사용하지 않음
```

## 테스트 결과

```
15 tests passed, 0 failed (Playwright chromium)
스크린샷 18장 촬영 완료
```

## 스크린샷 목록

| # | 파일명 | REQ | 내용 |
|---|--------|-----|------|
| 1 | 01-req1-scroll-left.png | REQ-1 | 스크롤 최좌측, 프리뷰 왼쪽 완전 노출 |
| 2 | 02-req1-scroll-right.png | REQ-1 | 스크롤 최우측, 프리뷰 오른쪽 정상 |
| 3 | 03-req2-desktop-1440.png | REQ-2 | Desktop 1440 선택, 크롬 헤더 표시 |
| 4 | 04-req2-laptop-1280.png | REQ-2 | Laptop 1280 선택 |
| 5 | 05-req2-compact-1024.png | REQ-2 | Compact 1024 선택 |
| 6 | 06-req3-base-14px.png | REQ-3 | Base 14px, 스케일 미리보기+프리뷰 |
| 7 | 07-req3-base-18px.png | REQ-3 | Base 18px, 텍스트 확연히 커짐 |
| 8 | 08-req4-ratio-08.png | REQ-4 | Ratio 0.8, Landing 히어로 작음 |
| 9 | 09-req4-ratio-15.png | REQ-4 | Ratio 1.5, Landing 히어로 매우 큼 |
| 10 | 10-req5-card-web.png | REQ-5 | Web 카드 여백 px-4 py-3 |
| 11 | 11-req5-card-mobile.png | REQ-5 | Mobile 카드 여백 px-3 py-2 |
| 12 | 12-req6-tab-before.png | REQ-6 | 탭 h-9 유지 (수정 불필요) |
| 13 | 13-req6-tab-after.png | REQ-6 | 탭 h-9 유지 (동일) |
| 14 | 14-req7-progress-before.png | REQ-7 | Progress h-2 복원 |
| 15 | 15-req7-progress-after.png | REQ-7 | Progress h-2 (동일 상태) |
| 16 | 16-req8-web-density.png | REQ-8 | Web p-6 패딩 |
| 17 | 17-req8-tablet-density.png | REQ-8 | Tablet p-4 패딩 |
| 18 | 18-req8-mobile-density.png | REQ-8 | Mobile p-3 패딩 |

---

**구현 완료일**: 2026-02-11
