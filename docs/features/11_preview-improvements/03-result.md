# 결과: 미리보기 개선

## 수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `app/features/wizard/components/live-preview.tsx` | REQ-2,3,4,5: MobileMockup 베젤/Dynamic Island/스크롤바/그림자, WebMockup/TabletMockup 그림자, LivePreview 래퍼에 mx-auto |
| `app/features/wizard/pages/primitives-step-page.tsx` | REQ-1: 프리뷰 컨테이너 `justify-center` 제거 |

## REQ별 결과

### REQ-1: 웹 스크롤 정렬

**변경**: `primitives-step-page.tsx` 프리뷰 컨테이너에서 `justify-center` 제거. `live-preview.tsx`의 목업 래퍼에 `mx-auto` 추가.

**스크린샷 01**: Web 목업이 프리뷰 패널 내에서 좌측부터 정렬되어 표시됨. Traffic lights(빨강/노랑/초록 원)가 좌측에 완전히 보이며, 사이드바 내비게이션과 콘텐츠 영역이 잘림 없이 표시됨. 목업이 컨테이너보다 작을 때는 mx-auto에 의해 중앙 정렬 유지.

### REQ-2: 모바일 Dynamic Island 간섭 제거

**변경**: `-mt-12` 네거티브 마진 제거. Dynamic Island의 `sticky top-0` 유지하되, 콘텐츠가 자연스럽게 아래에 배치되도록 수정. Dynamic Island 래퍼에 `pb-1` 추가하여 콘텐츠와 간격 확보.

**스크린샷 02 (Sidebar)**: Sidebar 앱 셸에서 breadcrumb 내비게이션("..." > "대시보드")과 검색/알림 아이콘이 Dynamic Island 아래에 완전히 보임. 콘텐츠(프로젝트 설정 폼)도 가려지지 않고 정상 표시.

**스크린샷 03 (Topnav)**: Topnav 앱 셸에서 MyApp 로고, 햄버거 메뉴, 검색/알림/아바타 아이콘이 Dynamic Island 아래에 완전히 보임. 폼 콘텐츠 정상 표시.

**스크린샷 04 (Dock)**: Dock 앱 셸에서 MyApp 헤더 바가 Dynamic Island 아래에 완전히 보임. 하단에 플로팅 Dock(5개 아이콘)이 정상 표시.

### REQ-3: 모바일 스크롤바 숨김

**변경**: MobileMockup 스크린 영역에 `[&::-webkit-scrollbar]:hidden` (Webkit) + `[scrollbar-width:none]` (Firefox) 추가. 스크롤 기능은 유지, 시각적으로만 숨김.

**스크린샷 05**: 모바일 목업의 스크린 영역에 스크롤바가 보이지 않음. 콘텐츠가 스크린을 초과하더라도 브라우저 기본 스크롤바 대신 깔끔한 화면 표시. 실제 iPhone처럼 스크롤바 없이 터치/휠로 스크롤 가능.

### REQ-4: 그림자 최소화

**변경**: WebMockup `shadow-xl` -> `shadow-md`, TabletMockup `shadow-2xl` -> `shadow-md`, MobileMockup `shadow-2xl` -> `shadow-md`.

**스크린샷 06 (Web)**: Web 목업 프레임 주위의 그림자가 희미하고 부드러움. 이전의 shadow-xl 대비 상당히 줄어든 상태.

**스크린샷 07 (Tablet)**: Tablet 목업(iPad Mini) 주위의 그림자가 shadow-md 수준으로 최소화. 사이드바와 콘텐츠가 정상 표시.

**스크린샷 08 (Mobile)**: Mobile 목업 주위의 그림자가 shadow-md 수준. 베젤 외곽에 은은한 그림자만 표시.

### REQ-5: 모바일 베젤 디자인 개선

**변경**:
- 베젤: `border-8 border-foreground` -> `border-[6px] border-zinc-800 dark:border-zinc-200 ring-1 ring-zinc-700/30 dark:ring-zinc-300/30`
- Dynamic Island: `bg-foreground` -> `bg-black` (고정), `w-[120px] h-8` -> `w-[100px] h-7` (약간 축소)
- Home Indicator: `w-[120px]` -> `w-[100px]` (Dynamic Island와 통일)
- 스크린 높이: `height - 16` -> `height - 12` (border-[6px] 반영)

**스크린샷 09**: 모바일 베젤이 짙은 회색(zinc-800)으로 표시되며, 외곽에 ring-1 효과로 미세한 이중 테두리 느낌. Dynamic Island는 검정 라운드 필로 100px 너비, 28px 높이. Home Indicator는 하단에 작은 바로 100px 너비. 이전의 단순 검정 border-8 대비 세련된 flat 디자인.

### REQ-6: 사이드 이펙트 방지

**검증**: 다양한 플랫폼/앱 셸/페이지 레이아웃 조합 테스트.

**스크린샷 10 (Web + Sidebar + Dashboard Grid)**: 웹 목업에 사이드바와 대시보드 그리드가 정상 렌더링. 프로젝트 설정 폼, 체크박스, 프로그레스 바, 버튼 등 모든 UI 요소 정상.

**스크린샷 11 (Tablet + Topnav + Tab Page)**: 태블릿 목업에 Topnav와 Tab Page가 정상 렌더링. 탭(개요/멤버/설정), Stats Cards(총 사용자 2,847, 활성 프로젝트 24, 예정 일정 7), 프로젝트 카드(디자인 시스템, API 리팩토링, 모바일 앱 v2) 정상 표시.

**스크린샷 12 (Mobile + Dock + Sidebar Page)**: 모바일 목업에 Dock과 Sidebar Page가 정상 렌더링. 설정 메뉴(일반, 프로필, 알림, 보안, 결제)와 폼이 모바일 크기에 맞게 표시. 하단 Dock 5개 아이콘 정상.

## 수정하지 않은 항목 (REQ-6 범위 제한)

- SidebarShell, TopnavShell, DockShell, LandingShell 내부 레이아웃: 수정 없음
- SimplePageContent, TabPageContent, SidebarPageContent, DashboardGridContent: 수정 없음
- usePreviewTokens 훅: 수정 없음
- FontSelector, ColorPicker, ScaleConfigurator 등 컨트롤 패널: 수정 없음
- useWizardStore 상태 관리: 수정 없음

## 테스트

- 파일: `docs/features/11_preview-improvements/tests/preview-improvements.spec.ts`
- 12개 테스트 전부 통과
- 12개 스크린샷 생성 (`docs/features/11_preview-improvements/tests/screenshots/`)

## 빌드/타입체크

- `npm run build`: 성공
- `npm run typecheck`: 성공
- 보안 grep (eval, dangerouslySetInnerHTML): 0건

## 구현 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|----------|----------|------------|----------|
| 1 | 스크롤 정렬 | `justify-center` 제거 + 래퍼에 `mx-auto` | (A) JS ResizeObserver, (B) 조건부 justify | CSS만으로 해결. 목업이 크면 좌측 정렬(스크롤 시 좌측부터), 작으면 mx-auto로 중앙 정렬 |
| 2 | Dynamic Island 간섭 | `-mt-12` 제거 + sticky 유지 + pb-1 간격 | (A) absolute 배치, (B) z-index만 조정 | sticky 유지로 스크롤 시에도 Dynamic Island 고정. 네거티브 마진 제거로 콘텐츠 가림 문제 해결 |
| 3 | 스크롤바 숨김 | `[&::-webkit-scrollbar]:hidden` + `[scrollbar-width:none]` | (A) 커스텀 CSS 유틸리티, (B) JS 커스텀 스크롤 | Tailwind v4 arbitrary variants와 arbitrary properties로 CSS만으로 해결. 추가 파일 수정 불필요 |
| 4 | 그림자 강도 | `shadow-md` 일괄 | (A) shadow-sm, (B) shadow-none | shadow-sm은 너무 약함, shadow-none은 depth 없음. shadow-md가 flat하면서 약간의 입체감 유지 |
| 5 | 베젤 border 두께 | `border-[6px]` | (A) border-8 유지, (B) border-4 | border-8은 약간 두꺼움. border-[6px]이 실제 iPhone 비율에 더 가깝고 세련됨 |
| 6 | 베젤 색상 | `border-zinc-800 dark:border-zinc-200` | (A) border-foreground 유지, (B) border-neutral-800 | border-foreground는 다크모드에서 흰색이 되어 실제 폰과 다름. zinc-800/200은 라이트/다크 모두 자연스러운 디바이스 색상 |
| 7 | Dynamic Island 색상 | `bg-black` 고정 | (A) bg-foreground, (B) bg-zinc-900 | 실제 iPhone Dynamic Island는 항상 검정. bg-foreground는 라이트모드에서 어둡지만 다크모드에서는 흰색이 됨 |
| 8 | 스크린 높이 계산 | `height - 12` (border-[6px] 반영) | (A) height - 16 유지 | border-8(16px)에서 border-[6px](12px)로 변경했으므로 높이 계산도 맞춰야 콘텐츠가 정확하게 맞음 |

## 수정 이력

| # | 시점 | 내용 | 결과 |
|---|------|------|------|
| 1 | 초기 구현 | REQ-4 shadow 일괄 변경, REQ-1 justify-center 제거 + mx-auto, REQ-3 스크롤바 숨김 CSS, REQ-2 -mt-12 제거, REQ-5 베젤 디자인 개선 | 빌드/타입체크 통과 |
| 2 | 1차 테스트 | 12개 테스트 중 3개 실패 | REQ-2-1: selector 불일치 (null class), REQ-6-2/6-3: localStorage 조작 타이밍 문제 |
| 3 | 테스트 수정 | REQ-2-1: 콘텐츠 래퍼 selector를 스크린 영역 자식 순회로 변경. REQ-6-2/6-3: UI 클릭으로 플랫폼 선택 후 localStorage 수정 + reload 방식으로 변경 | 12개 테스트 전부 통과 |
