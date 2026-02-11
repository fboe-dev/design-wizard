# 요구사항: 미리보기 개선

## 기능 폴더
`docs/features/11_preview-improvements/`

## 원문 요청 (사용자)
1. 웹 플랫폼의 사이즈보다 미리보기 페이지의 사이즈가 좁을 경우, 가로 스크롤이 나오나 가로 스크롤이 왼쪽 끝에 있어도 왼쪽이 잘려있음. 오른쪽은 정상. 미리보기 컴포넌트 쉐도우 강하지 들어가 있음 최소로 변경.
2. 모바일 목업 디자인(내부 헤더 중앙)에 의해 UI들이 가려져 있음. 목업 디자인을 신경써서 가리거나 잘리거나 하지않도록 능력이 부족하면 웹조사를 통해서 진행. 모바일 플랫폼에 스크롤 바를 보이고 있는 시점부터 에이전트가 얼마나 생각없이 디자인하고 있다는게 반증임. 기획 단계서부터 모든 모바일 대응 기초 개념부터 제대로 작성할 것.
3. 목업을 까만 테두리로만 하는게 최선임? flat하게 만들라고 했지 대충하라는 말이 아님.
4. 제발 하라는 것만 할 것. 사이드 이팩트 내지말고.

## 정제된 요구사항

### 1. 웹 목업 스크롤 정렬 수정
- **현재 상태**: `primitives-step-page.tsx` line 319에서 프리뷰 컨테이너가 `justify-center`로 중앙 정렬되어, 목업이 컨테이너보다 클 경우 좌측이 잘림.
- **변경 내용**: 프리뷰 컨테이너 정렬 방식 변경. `justify-center` 제거 → `justify-start` 또는 조건부 처리.
- **완료 기준**: Web 플랫폼 선택 후 브라우저 창을 좁게 조정 → 스크롤바가 생겼을 때 스크롤을 좌측 끝으로 당기지 않아도 목업 좌측 끝(traffic lights)이 보여야 함

### 2. 모바일 목업 Dynamic Island 간섭 제거
- **현재 상태**: MobileMockup (line 287-294)에서 Dynamic Island가 `sticky top-0 z-10`으로 고정, 콘텐츠에 `-mt-12` 네거티브 마진 적용 → 앱 헤더가 Dynamic Island에 가려짐.
- **변경 내용**: Dynamic Island를 콘텐츠와 분리. `-mt-12` 제거, 콘텐츠 상단 padding 추가.
- **완료 기준**: Mobile 플랫폼 선택, Sidebar/Topnav/Dock 앱 셸 전환 → 스크린샷에서 앱 헤더(breadcrumb, 로고 등)가 Dynamic Island에 가려지지 않고 완전히 보여야 함

### 3. 모바일 스크롤바 숨김 (네이티브 스타일)
- **현재 상태**: MobileMockup 스크린 영역 `overflow-auto` → 브라우저 기본 스크롤바 표시.
- **변경 내용**: 스크린 영역에 스크롤바 숨김 CSS 추가 (`[&::-webkit-scrollbar]:hidden` 등).
- **완료 기준**: Mobile 플랫폼 선택 → 콘텐츠를 스크롤해도 스크린샷에 스크롤바가 보이지 않아야 함. 실제로는 스크롤 가능해야 함 (마우스 휠/터치 제스처).

### 4. 모든 목업 그림자 최소화
- **현재 상태**: WebMockup `shadow-xl`, TabletMockup/MobileMockup `shadow-2xl`.
- **변경 내용**: 모든 목업의 그림자를 `shadow-md`로 변경.
- **완료 기준**: Web/Tablet/Mobile 플랫폼 전환 → 스크린샷에서 목업 주변 그림자가 희미하고 부드럽게 보여야 함. `shadow-xl`, `shadow-2xl` 수준의 진한 그림자가 없어야 함.

### 5. 모바일 목업 디자인 개선 (선택적 개선)
- **현재 상태**: MobileMockup `border-8 border-foreground` (단순 굵은 테두리).
- **변경 내용**: 베젤 디테일 추가. 그라데이션 또는 이중 테두리 효과. Dynamic Island/Home Indicator 디테일 개선.
- **완료 기준**: Mobile 플랫폼 선택 → 스크린샷에서 목업이 단순한 검은 테두리가 아닌, 디테일 있는 베젤로 보여야 함. 하지만 과하지 않고 flat한 스타일 유지.

### 6. 사이드 이펙트 방지 점검
- **현재 상태**: 없음 (작업 전).
- **변경 내용**: 변경 범위를 `live-preview.tsx`와 `primitives-step-page.tsx`의 프리뷰 레이아웃에만 한정. 앱 셸/페이지 콘텐츠/토큰 계산 등은 수정하지 않음.
- **완료 기준**: 작업 후 플랫폼/앱 셸/페이지 레이아웃 조합을 여러 가지 테스트 → 기존 동작이 그대로 유지되어야 함. 미리보기 레이아웃/스크롤/그림자만 변경.

## 스크린샷 계획
- REQ-1: Web 플랫폼, 스크롤바 생성 → traffic lights 보임 (1장)
- REQ-2: Mobile 플랫폼, Sidebar/Topnav/Dock → 앱 헤더 가려지지 않음 (3장)
- REQ-3: Mobile 플랫폼, 스크롤 → 스크롤바 없음 (1장)
- REQ-4: Web/Tablet/Mobile → 그림자 희미 (3장)
- REQ-5: Mobile → 베젤 디테일 (1장)
- REQ-6: 여러 조합 테스트 → 기존 동작 유지 (3장)

**총 12장**

## 주요 파일
- `app/features/wizard/components/live-preview.tsx` (목업 컴포넌트)
- `app/features/wizard/pages/primitives-step-page.tsx` (프리뷰 레이아웃)

## 정제 의사결정
1. "가로 스크롤이 왼쪽 끝에 있어도 왼쪽이 잘려있음" → 코드 조사 결과 `justify-center` 문제 확인 → REQ-1
2. "쉐도우 강하지" → `shadow-xl`, `shadow-2xl` 확인 → REQ-4
3. "모바일 목업 디자인(내부 헤더 중앙)에 의해 UI들이 가려져 있음" → Dynamic Island `-mt-12` 확인 → REQ-2
4. "스크롤 바를 보이고 있는 시점부터..." → 모바일에 스크롤바 숨김 없음 확인 → REQ-3
5. "까만 테두리로만 하는게 최선임?" → `border-8 border-foreground` 확인 → REQ-5
6. "하라는 것만 할 것. 사이드 이팩트 내지말고" → 명시적 범위 제한 → REQ-6
