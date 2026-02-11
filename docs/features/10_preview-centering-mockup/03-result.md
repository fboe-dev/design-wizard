# 결과: 미리보기 중앙 정렬 및 플랫폼별 목업 디자인

## 수정된 파일

| 파일 | REQ | 변경 내용 |
|------|-----|----------|
| `app/features/wizard/pages/primitives-step-page.tsx` | REQ 1 | L319: `items-start justify-start` -> `items-center justify-center` |
| `app/features/wizard/components/live-preview.tsx` | REQ 2~4 | 기존 단일 크롬 헤더 제거, `WebMockup`/`TabletMockup`/`MobileMockup` 로컬 컴포넌트 추가, `LivePreview`를 `platformTarget` 기준 3개 분기로 리팩토링 |

## REQ별 결과

### REQ 1: 미리보기 중앙 정렬

**스크린샷**: `docs/features/10_preview-centering-mockup/tests/screenshots/01-req1-center-alignment.png`

**스크린샷 서술**: Primitives 단계 페이지가 표시되어 있다. 좌측에는 폰트/컬러/타이포 등 설정 패널이, 우측에는 프리뷰 패널이 보인다. 우측 프리뷰 패널 내에서 LivePreview 컴포넌트가 수직 수평 중앙에 위치하고 있다. 프리뷰 콘텐츠(설정 폼, 프로그레스 바, 버튼들)가 패널의 정중앙에 보이며, 하단 중앙에 이전/다음 네비게이션 화살표가 위치해 있다. Desktop 1440 디바이스 크기가 패널보다 넓어 좌우 스크롤이 필요하지만, 수직 중앙 정렬이 적용되어 콘텐츠가 패널 상단 모서리에 붙지 않고 중앙에 위치한다.

### REQ 2: Web 플랫폼 목업 (macOS Window)

**스크린샷**: `docs/features/10_preview-centering-mockup/tests/screenshots/02-req2-web-mockup.png`

**스크린샷 서술**: Web 플랫폼(기본값 Desktop 1440)이 선택된 상태에서 LivePreview가 표시되어 있다. 프리뷰 상단에 macOS 스타일 타이틀바가 보인다. 좌측에 빨강(#FF5F57), 노랑(#FEBC2E), 초록(#28C840) traffic lights 3개가 8px 간격으로 배치되어 있고, 타이틀바 중앙에 "Desktop 1440 -- 1440x900" 디바이스 라벨이 표시된다. 타이틀바 배경은 `bg-muted/40`으로 반투명하며, 하단에 border-b 구분선이 있다. 전체 프레임에 `rounded-lg`과 `shadow-xl`이 적용되어 macOS 윈도우 형태를 갖추고 있다. Desktop 1440 너비가 넓어 타이틀바의 좌측 부분(traffic lights 포함)이 패널 스크롤로 인해 화면에 보이지 않을 수 있으나, E2E 테스트에서 traffic lights의 존재와 색상(3개 원형 div, 각각 정확한 HEX 색상), 타이틀바 높이 40px를 모두 검증 완료했다.

### REQ 3: Tablet 플랫폼 목업 (iPad)

**스크린샷**: `docs/features/10_preview-centering-mockup/tests/screenshots/03-req3-tablet-mockup.png`

**스크린샷 서술**: Tablet 플랫폼이 선택되어 좌측 컨트롤에 "Tablet" 칩이 활성화(파란 테두리)되고, 디바이스 사이즈에 "iPad Mini (768x1024)"가 표시되어 있다. 우측 프리뷰 패널에 iPad 스타일 디바이스 프레임이 보인다. 외곽은 `bg-foreground` 색상(라이트모드에서 거의 검정)의 균등 베젤(상하좌우 16px)로 감싸져 있고, 상단 베젤 중앙에 작은 카메라 노치(8px x 4px, rounded-full, `bg-foreground/20`)가 미세하게 보인다. 스크린 영역 안에는 사이드바 네비게이션(대시보드, 받은편지함, 사용자, 설정)과 프로젝트 설정 폼(프로젝트 이름, 카테고리, 체크박스, 스위치, 프로그레스 바, 버튼 그룹)이 표시된다. 전체 프레임은 `rounded-3xl`과 `shadow-2xl`이 적용되어 프리미엄 태블릿 형태를 갖추고 있다.

### REQ 4: Mobile 플랫폼 목업 (iPhone)

**스크린샷**: `docs/features/10_preview-centering-mockup/tests/screenshots/04-req4-mobile-mockup.png`

**스크린샷 서술**: Mobile 플랫폼이 선택되어 좌측 컨트롤에 "Mobile" 칩이 활성화(파란 테두리)되고, 디바이스 사이즈에 "iPhone SE (375x667)"가 표시되어 있다. 우측 프리뷰 패널에 iPhone 스타일 디바이스 프레임이 보인다. 외곽은 `border-8 border-foreground`(라이트모드에서 검정색 베젤)로 감싸져 있고, `rounded-[40px]`으로 현대적 스마트폰 형태의 둥근 모서리가 적용되어 있다. 스크린 상단 중앙에 Dynamic Island(120px x 32px, 검정 알약 형태, `bg-foreground`)가 선명하게 보인다. 스크린 내부에는 모바일에 맞춘 UI(햄버거 메뉴 아이콘, 탐색 경로, 프로젝트 설정 폼)가 표시된다. 스크린 하단 중앙에 홈 인디케이터(120px x 4px, `bg-foreground/30`, 반투명 회색 바)가 보인다. 전체 프레임에 `shadow-2xl`이 적용되어 그림자가 표현되어 있다.

## 수정 이력

| # | 시점 | 내용 | 결과 |
|---|------|------|------|
| 1 | 초기 구현 | `primitives-step-page.tsx` L319에서 `items-start justify-start` -> `items-center justify-center` 변경 | 성공 |
| 2 | 초기 구현 | `live-preview.tsx`에 `WebMockup`, `TabletMockup`, `MobileMockup` 3개 로컬 컴포넌트 추가 | 성공 |
| 3 | 초기 구현 | `LivePreview` 메인 컴포넌트를 `platformTarget` 기준 3개 분기로 리팩토링. 기존 크롬 헤더(L207~212) 제거, `cssTokens`를 wrapper div에 적용, `shellContent`를 공통 변수로 추출 | 성공 |
| 4 | 빌드 검증 | `npm run build` 성공, `npm run typecheck` 성공 | 통과 |
| 5 | 보안 검증 | `eval(`, `new Function(`, `dangerouslySetInnerHTML` 패턴 검색 결과 0건 | 통과 |
| 6 | E2E 테스트 | 4개 테스트 모두 통과 (REQ 1~4 각 1개) | 4/4 통과 |

## 구현 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|----------|----------|-----------|----------|
| 1 | `cssTokens` 적용 위치 | 목업 외부의 wrapper `div`에 `style={wrapperStyle}` 적용 | (1) 각 목업 컴포넌트 내부에 적용 (2) 콘텐츠 영역에만 적용 | 디자인 문서(02-design.md L355)에서 "목업 프레임 내부의 `bg-background`, `text-foreground` 등이 이 변수를 참조하므로 반드시 상위에 위치해야 함" 명시. 목업 프레임의 border/bg 색상도 CSS 변수를 사용하므로 최상위 wrapper에 적용해야 모든 하위 요소가 변수를 상속받음 |
| 2 | cursor 스타일 유지 방법 | 각 목업 컴포넌트의 콘텐츠 영역 div에 기존 cursor 오버라이드 클래스 그대로 복사 | (1) wrapper div에 한 번만 적용 (2) 별도 CSS 클래스로 추출 | 디자인 문서(02-design.md L359)에서 "현재 L216의 cursor 오버라이드 클래스를 각 목업의 콘텐츠 영역에 유지" 명시. 각 목업의 콘텐츠 div에 직접 적용하는 것이 CSS 계층 상 가장 정확 |
| 3 | Dynamic Island 포지셔닝 | `sticky top-0 z-10` + `-mt-12` 네거티브 마진 (디자인 문서 원안) | (1) `absolute` 포지셔닝 (2) 콘텐츠 높이에서 차감 | 디자인 문서의 원안(`sticky`)을 그대로 사용. `sticky`는 스크롤 시 Dynamic Island이 상단에 고정되어 실제 iPhone 경험과 일치. `absolute`는 스크롤 시 사라지는 문제 발생 가능 |
| 4 | `data-testid` 추가 | 각 목업과 핵심 UI 요소에 `data-testid` 속성 추가 (`web-mockup`, `tablet-mockup`, `mobile-mockup`, `traffic-lights`, `tablet-camera`, `dynamic-island`, `home-indicator`) | (1) CSS 클래스 셀렉터만 사용 (2) role/aria 속성 사용 | E2E 테스트에서 안정적인 셀렉터 제공을 위해 `data-testid` 추가. CSS 클래스는 리팩토링 시 변경될 수 있으나 `data-testid`는 명시적 테스트 계약. RULES.md에서 "촬영 불가 시 data-testid 추가 등 코드 수정" 권장 |
| 5 | `shellContent` 변수 추출 | JSX를 `shellContent` 변수로 추출하여 3개 분기에서 공유 | (1) 각 분기에서 인라인으로 셸 콘텐츠 반복 (2) 별도 함수 컴포넌트로 분리 | 디자인 문서(02-design.md L268~281)의 설계를 그대로 따름. 동일한 셸 콘텐츠를 3번 반복 작성하면 유지보수 부담 증가. JSX 변수로 추출하면 변경 시 한 곳만 수정하면 됨 |
| 6 | Tablet/Mobile 디바이스 라벨 | 생략 (표시하지 않음) | (1) 목업 하단에 작은 텍스트로 표시 (2) 베젤 내부에 표시 | 01-plan.md 의사결정 #4 및 02-design.md 의사결정 #11에서 생략 결정. Web은 타이틀바가 자연스럽게 라벨 공간을 제공하지만, Tablet/Mobile 베젤에 텍스트를 넣으면 시각적 노이즈. 좌측 컨트롤 패널에서 디바이스 정보 이미 확인 가능 |
| 7 | `getDeviceLabel` 함수 유지 | 함수 삭제하지 않고 `WebMockup`에서 계속 사용 | (1) 함수 제거 후 인라인 처리 | 02-design.md L374에서 "기존 `getDeviceLabel` 함수 유지. WebMockup 타이틀바에서 사용. 삭제하지 말 것" 명시 |

## 테스트 결과

| 테스트 | 결과 | 검증 내용 |
|--------|------|----------|
| REQ-1: LivePreview가 우측 패널 정중앙에 위치 | PASS | `items-center justify-center` CSS 클래스 존재 확인, Web 목업 가시성 확인 |
| REQ-2: Web 플랫폼에서 macOS 윈도우 크롬 표시 | PASS | traffic lights 3개 존재 및 색상(#FF5F57, #FEBC2E, #28C840) 확인, 타이틀바 높이 40px, 디바이스 라벨 "Desktop 1440", rounded-lg/shadow-xl 클래스 확인 |
| REQ-3: Tablet 플랫폼에서 iPad 베젤과 카메라 노치 표시 | PASS | tablet-mockup 가시성, 카메라 노치 크기(8x4px), rounded-3xl/shadow-2xl/bg-foreground 클래스, 목업 너비 768px 확인 |
| REQ-4: Mobile 플랫폼에서 iPhone 베젤/Dynamic Island/홈 인디케이터 표시 | PASS | mobile-mockup 가시성, Dynamic Island 크기(120x32px), 홈 인디케이터 크기(120x4px), rounded-[40px]/shadow-2xl/border-8/border-foreground 클래스 확인 |

## 스크린샷 목록

| # | 파일 | REQ | 설명 |
|---|------|-----|------|
| 1 | `docs/features/10_preview-centering-mockup/tests/screenshots/01-req1-center-alignment.png` | REQ 1 | 프리뷰 중앙 정렬 (Web 기본값, Desktop 1440) |
| 2 | `docs/features/10_preview-centering-mockup/tests/screenshots/02-req2-web-mockup.png` | REQ 2 | Web 플랫폼 macOS 윈도우 크롬 (traffic lights + 타이틀바) |
| 3 | `docs/features/10_preview-centering-mockup/tests/screenshots/03-req3-tablet-mockup.png` | REQ 3 | Tablet 플랫폼 iPad 베젤 + 카메라 노치 |
| 4 | `docs/features/10_preview-centering-mockup/tests/screenshots/04-req4-mobile-mockup.png` | REQ 4 | Mobile 플랫폼 iPhone Dynamic Island + 홈 인디케이터 |
