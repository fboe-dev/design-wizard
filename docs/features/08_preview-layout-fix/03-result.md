# 구현 결과: Primitives 미리보기 제어 구조 개선

## 수정 파일

| 파일 | 변경 내용 |
|------|---------|
| `app/features/wizard/pages/primitives-step-page.tsx` | REQ1: 프리뷰 헤더 제거, REQ2: 디바이스 사이즈 Select 추가 |
| `app/features/wizard/components/live-preview.tsx` | REQ3: 미리보기 크기 동기화 + 스크롤, REQ4: 반응형 레이아웃 |

## 빌드 / 타입체크

- `npm run build`: 성공 (client + server 빌드 완료)
- `npm run typecheck`: 성공 (에러 0개)
- 보안 grep (`eval`, `dangerouslySetInnerHTML`): 발견 없음

## REQ별 구현 + 스크린샷 검증

### REQ1: 프리뷰 헤더 제거

**구현**: `primitives-step-page.tsx` L314-355 영역의 프리뷰 헤더 블록(디바이스 Select + 언어 국기 아이콘) 전체 제거. LivePreview 컨테이너(`div.flex.min-h-0.flex-1`)와 LivePreview 컴포넌트는 유지. 미사용 상수 `LANGUAGE_OPTIONS` 및 미사용 import (`SelectGroup`, `SelectLabel`) 제거.

**스크린샷 검증** (`req-01-no-preview-header.png`):
우측 ResizablePanel 상단에 디바이스 드롭다운과 국기 아이콘 헤더가 표시되지 않음. LivePreview 컴포넌트가 패딩(p-4) 안에서 바로 시작됨. 크롬 헤더("Desktop 1920 -- 1920x1080")가 미리보기 최상단에 위치.

### REQ2: 타겟 플랫폼 섹션에 디바이스 사이즈 Select 추가

**구현**: `primitives-step-page.tsx`의 `#section-style` 내 타겟 플랫폼 ToggleChip 아래에 "디바이스 사이즈" 라벨 + Select 컴포넌트 추가. `DEVICE_OPTIONS[platformTarget]`으로 현재 플랫폼에 해당하는 디바이스 목록만 표시. `selectedDevice`/`setSelectedDevice` store 상태와 양방향 바인딩.

**스크린샷 검증**:
- `req-02-device-select-web.png`: Web 플랫폼 선택 상태에서 드롭다운 열림. "Desktop 1920 (1920x1080)" 체크 표시, "Laptop 1366 (1366x768)", "Desktop 1280 (1280x720)" 3개 옵션 표시.
- `req-02-device-select-tablet.png`: Tablet 플랫폼 선택 상태에서 드롭다운 열림. "iPad Mini (768x1024)" 체크 표시, "iPad Air (820x1180)", "iPad Pro 11 (834x1194)", "iPad Pro 12.9 (1024x1366)" 4개 옵션 표시.
- `req-02-device-select-mobile.png`: Mobile 플랫폼 선택 상태에서 드롭다운 열림. "iPhone SE (375x667)" 체크 표시, "iPhone 12 (390x844)", "iPhone 16 Pro (393x852)", "iPhone 16 Pro Max (430x932)" 4개 옵션 표시.

### REQ3: 미리보기 크기 디바이스 사이즈 동기화 + 가로 스크롤

**구현**: `live-preview.tsx`에서 `DEVICE_OPTIONS[platform].find()` 로 현재 `selectedDevice`에 해당하는 device 객체를 조회하여 `previewWidth`/`previewHeight` 계산. 최외곽 컨테이너 구조 변경: 기존 `overflow-hidden` div 제거, 미리보기 div에 `shrink-0` + `style={{ width: previewWidth, minHeight: previewHeight, ...cssTokens }}` 적용. 부모 div (`primitives-step-page.tsx`)는 `overflow-auto`로 유지되어 가로 스크롤 지원. 프리뷰 콘텐츠 height는 `previewHeight - 40` (크롬 헤더 높이 제외).

**스크린샷 검증**:
- `req-03-desktop-1920.png`: Web + Desktop 1920 선택. 미리보기 컨테이너 너비 1920px 확인 (테스트에서 `getBoundingClientRect().width === 1920` 통과). 패널 너비보다 넓어서 `scrollWidth > clientWidth` 확인 (가로 스크롤 가능). 스크린샷에서 우측 패널 오른쪽으로 콘텐츠가 잘려나가며 스크롤 영역 존재.
- `req-03-ipad-pro-129.png`: Tablet + iPad Pro 12.9 선택. 디바이스 사이즈 Select에 "iPad Pro 12.9 (1024x1366)" 표시. 크롬 헤더에 "4x1366" (잘린 텍스트) 표시. 미리보기 너비 1024px 확인 (테스트 통과). style 속성에 `min-height: 1366px` 포함 확인.
- `req-03-iphone-se.png`: Mobile + iPhone SE 선택. 크롬 헤더 "iPhone SE -- 375x667" 표시. 미리보기 너비 375px 확인. style 속성에 `min-height: 667px` 포함 확인. 모바일 레이아웃: 사이드바 숨김, 햄버거 메뉴, 1컬럼 폼.

### REQ4: 타블렛/모바일 반응형 레이아웃 복원

**구현**:

1. **SidebarShell**: `isTablet` 조건으로 검색창 축소(아이콘만, 텍스트 제거, `px-2 py-1.5 text-xs`), 네비게이션 라벨 `text-xs` 적용. 사이드바 너비 200px (기존 isTablet 분기 유지).

2. **TopnavShell**: `isTablet` 변수 추가. 네비게이션 메뉴에서 `{!isTablet && ...}` 조건으로 "개요"/"멤버" 숨김. "대시보드"와 "설정"만 표시하며 `text-xs` 적용.

3. **LandingShell**: `isTablet` 변수 추가. 제목 `text-3xl` (mobile 2xl, web 4xl 중간). 카드 그리드 `grid-cols-2` (mobile 1, web 3 중간).

4. **StatsCards**: `platform === "tablet" ? "grid-cols-2" : ...` 조건 추가.

5. **SidebarPageContent**: `isTablet` 추가, 네비게이션 너비 `w-[140px]` (web 180px에서 축소).

**스크린샷 검증**:
- `req-04-tablet-sidebar.png`: Tablet + SidebarShell. 사이드바 표시(너비 200px, 테스트에서 `boundingBox.width ~= 200` 통과). 검색창에 돋보기 아이콘만 표시(텍스트 라벨 없음). 네비게이션 항목 "대시보드", "받은편지함", "사용자", "설정" 작은 폰트로 표시.
- `req-04-tablet-topnav.png`: Tablet + TopnavShell. 상단 네비게이션에 "대시보드"와 "설정" 2개만 표시. "개요"와 "멤버" 숨김 확인. 테스트에서 innerText에 "대시보드", "설정" 포함 확인 통과.
- `req-04-tablet-landing.png`: Tablet + LandingShell. 제목 "더 빠르게, 더 아름답게" text-3xl 크기로 표시. 카드 영역은 스크롤 아래에 위치하여 직접 보이지 않으나, 테스트에서 `grid-cols-2` 클래스 존재 및 2컬럼 gridTemplateColumns 확인 통과.
- `req-04-mobile-sidebar.png`: Mobile + SidebarShell. 사이드바 완전 숨김 (aside 요소 0개, 테스트 통과). 상단에 햄버거 메뉴 아이콘 표시. 폼 1컬럼.
- `req-04-mobile-topnav.png`: Mobile + TopnavShell. 네비게이션 메뉴 완전 숨김 (nav 요소 0개, 테스트 통과). 상단에 햄버거 메뉴 아이콘 표시. 폼 1컬럼.
- `req-04-mobile-landing.png`: Mobile + LandingShell. 제목 text-2xl 크기. 카드 3장이 세로로 1컬럼 배치 ("빠른 구축", "완벽한 커스텀", "코드 생성" 순서대로 쌓여있음).

## 테스트

14개 테스트 전체 통과 (`npx playwright test docs/features/08_preview-layout-fix/tests/`):

| # | 테스트 | 결과 |
|---|--------|------|
| 1 | REQ-00: 페이지 로드 및 런타임 에러 없음 | PASS |
| 2 | REQ-01: 프리뷰 헤더 제거 확인 | PASS |
| 3 | REQ-02: 디바이스 사이즈 Select 추가 (Web) | PASS |
| 4 | REQ-02: 디바이스 사이즈 Select (Tablet) | PASS |
| 5 | REQ-02: 디바이스 사이즈 Select (Mobile) | PASS |
| 6 | REQ-03: 미리보기 크기 Desktop 1920 동기화 | PASS |
| 7 | REQ-03: 미리보기 크기 iPad Pro 12.9 동기화 | PASS |
| 8 | REQ-03: 미리보기 크기 iPhone SE 동기화 | PASS |
| 9 | REQ-04: Tablet - SidebarShell 반응형 | PASS |
| 10 | REQ-04: Tablet - TopnavShell 반응형 | PASS |
| 11 | REQ-04: Tablet - LandingShell 반응형 | PASS |
| 12 | REQ-04: Mobile - SidebarShell (사이드바 숨김) | PASS |
| 13 | REQ-04: Mobile - TopnavShell (네비게이션 숨김) | PASS |
| 14 | REQ-04: Mobile - LandingShell (1컬럼, 작은 제목) | PASS |

## 수정 이력

| # | 시점 | 수정 내용 | 사유 |
|---|------|---------|------|
| 1 | 테스트 작성 초기 | `data-testid="option-card-*"` 셀렉터를 텍스트 기반 셀렉터로 변경 | OptionCard 컴포넌트에 data-testid 속성 없음. 한국어 제목 텍스트("사이드바", "탑 네비게이션", "랜딩페이지")로 버튼 선택 |
| 2 | 테스트 1차 실행 | iPhone 16 Pro 셀렉터 regex `/iPhone 16 Pro\b/`를 `/iPhone 16 Pro \(393/`로 변경 | `\b` word boundary가 "iPhone 16 Pro"와 "iPhone 16 Pro Max" 모두 매칭하여 strict mode violation 발생. 크기 정보를 포함한 regex로 고유 매칭 보장 |
| 3 | 테스트 1차 실행 | TopnavShell 테스트에서 "Dashboard"/"Settings"를 "대시보드"/"설정"으로 변경 | 기본 language가 "korean"이므로 PREVIEW_TEXTS.korean의 한국어 텍스트가 렌더링됨 |

## 구현 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|----------|----------|-----------|----------|
| 1 | REQ1에서 LANGUAGE_OPTIONS 상수 제거 | 미사용 상수 및 import 제거 | 향후 사용을 위해 유지 | 프리뷰 헤더가 제거되면서 LANGUAGE_OPTIONS를 참조하는 코드가 없어짐. 미사용 코드 제거가 코드 품질에 유리. language state는 LivePreview prop으로 전달되므로 유지 |
| 2 | REQ3에서 프리뷰 콘텐츠 height 계산 | `previewHeight - 40` (크롬 헤더 높이 제외) | (a) 고정 480px 유지 (b) 100% height | 크롬 헤더(py-2 + text-sm + border-b)가 약 40px를 차지하므로, minHeight에서 이를 제외해야 프리뷰 콘텐츠가 정확한 디바이스 높이에 맞음. 고정 480px는 디바이스 크기와 무관하여 동기화 목적에 부적합 |
| 3 | REQ3에서 최외곽 래퍼 구조 | LivePreview 자체가 shrink-0 div로 고정 크기, 부모(primitives-step-page의 overflow-auto div)가 스크롤 담당 | (a) LivePreview 내부에 overflow-auto 추가 | 계획서 지침대로 부모 div에 overflow-auto, 내부 미리보기 div는 shrink-0. 이중 스크롤 방지를 위해 LivePreview 내부가 아닌 부모 레벨에서 스크롤 처리 |
| 4 | REQ4 SidebarShell 검색창 | isTablet일 때 검색 아이콘만 표시 (텍스트 라벨 숨김) | (a) placeholder를 짧은 텍스트로 변경 (b) 검색창 자체 숨김 | 200px 사이드바에서 검색창 + 텍스트는 공간 부족. 아이콘만 표시하면 검색 기능은 유지하면서 공간 절약. 계획서에서 "검색창 placeholder만 표시 또는 축소"를 권장 |
| 5 | REQ4 TopnavShell 메뉴 축소 방식 | `{!isTablet && ...}` 조건으로 overview/members 숨김 | (a) 모든 메뉴를 드롭다운으로 축소 (b) 메뉴 전체 숨김 | 계획서에서 "메뉴 2개만 (Dashboard, Settings)" 명시. 조건부 렌더링이 가장 단순하며 기존 isMobile 패턴과 일관성 유지 |
