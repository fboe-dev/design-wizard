# 기획: 미리보기 개선

## 목적

Step 2 (Primitives) 단계의 라이브 프리뷰 목업의 UX/UI 문제를 개선한다.
1. 웹 목업 스크롤 시 좌측 잘림 현상 해결
2. 모바일 목업 Dynamic Island가 UI를 가리는 문제 해결
3. 모바일 스크롤바 숨김 처리 (네이티브 스타일)
4. 과도한 그림자 최소화 (flat 스타일)
5. 모바일 목업 베젤 디자인 개선 (단순 border에서 세련된 베젤로)
6. 사이드 이펙트 방지 (변경 범위를 목업 레이아웃에만 한정)

## 요구사항 → 파일 매핑

| REQ | 수정 파일 | 핵심 변경 |
|-----|----------|----------|
| 1. 웹 목업 스크롤 정렬 | `primitives-step-page.tsx` line 319 | `justify-center` → `justify-start`, 목업이 작을 때는 중앙 정렬 유지 |
| 2. 모바일 Dynamic Island | `live-preview.tsx` line 287-294 | `-mt-12` 제거, 콘텐츠 상단 padding 추가, sticky 위치 조정 |
| 3. 모바일 스크롤바 숨김 | `live-preview.tsx` line 283 | `[&::-webkit-scrollbar]:hidden` 추가, `scrollbar-width: none` 처리 |
| 4. 목업 그림자 최소화 | `live-preview.tsx` line 204, 244, 277 | `shadow-xl`, `shadow-2xl` → `shadow-md`로 일괄 변경 |
| 5. 모바일 베젤 디자인 | `live-preview.tsx` line 277-303 | `border-8 border-foreground` → 이중 테두리/그라데이션 베젤 디테일 추가 |
| 6. 사이드 이펙트 방지 | 전체 | 앱 셸/페이지 콘텐츠/토큰 계산 로직은 수정 금지, 목업 스타일만 변경 |

## 상태 관리 변경

- store 필드 추가/변경: **없음**
- 버전 마이그레이션: **불필요**
- 영향받는 generators: **없음**

이 작업은 순수 UI/레이아웃 개선으로, Zustand store 상태나 프롬프트 생성 파이프라인에는 영향을 주지 않는다.

## 파일 구조

```
app/features/wizard/
├── components/
│   └── live-preview.tsx         # 목업 컴포넌트 수정 (REQ-2,3,4,5)
│                                # - WebMockup: shadow 변경
│                                # - TabletMockup: shadow 변경
│                                # - MobileMockup: Dynamic Island, 스크롤바, shadow, 베젤 디자인
└── pages/
    └── primitives-step-page.tsx # 프리뷰 컨테이너 정렬 수정 (REQ-1)
```

## 완료 기준

**완료 기준:** REQ-1 — Web 플랫폼 선택 → 브라우저 창 좁게 조정 → 스크롤바 생성 시 스크롤을 좌측 끝으로 당기지 않아도 스크린샷에 traffic lights가 보여야 함
**완료 기준:** REQ-2 — Mobile 플랫폼 → Sidebar/Topnav/Dock 앱 셸 각각 선택 → 스크린샷에서 앱 헤더가 Dynamic Island에 가려지지 않고 완전히 보여야 함
**완료 기준:** REQ-3 — Mobile 플랫폼 → 콘텐츠 스크롤 가능 → 스크린샷에 스크롤바가 보이지 않아야 함 (기능은 작동)
**완료 기준:** REQ-4 — Web/Tablet/Mobile 플랫폼 → 스크린샷에서 목업 그림자가 희미하고 부드럽게 보여야 함 (shadow-md 수준)
**완료 기준:** REQ-5 — Mobile 플랫폼 → 스크린샷에서 목업 베젤이 단순 검은 테두리가 아닌 디테일 있는 베젤로 보여야 함 (flat 스타일 유지)
**완료 기준:** REQ-6 — 모든 플랫폼/앱 셸/페이지 레이아웃 조합 테스트 → 스크린샷에서 기존 동작 유지, 목업 스타일만 변경

## 테스트 시나리오

| REQ | 위저드 단계 | 동작 | 기대 결과 |
|-----|------------|------|-----------|
| 1 | Primitives | Web 플랫폼 선택 → 브라우저 창 너비 좁게 조정 → 스크롤바 생성 | 스크롤 초기 위치에서 traffic lights가 보임 (좌측 잘림 없음) |
| 2-1 | Primitives | Mobile 플랫폼 → Sidebar 앱 셸 선택 | 사이드바 헤더가 Dynamic Island에 가려지지 않고 전체 보임 |
| 2-2 | Primitives | Mobile 플랫폼 → Topnav 앱 셸 선택 | Topnav 바가 Dynamic Island에 가려지지 않고 전체 보임 |
| 2-3 | Primitives | Mobile 플랫폼 → Dock 앱 셸 선택 | 페이지 헤더가 Dynamic Island에 가려지지 않고 전체 보임 |
| 3 | Primitives | Mobile 플랫폼 → Simple Page 선택 → 스크롤 | 스크롤바가 보이지 않음, 스크롤 기능은 작동 |
| 4-1 | Primitives | Web 플랫폼 선택 | 목업 그림자가 shadow-md 수준으로 희미함 |
| 4-2 | Primitives | Tablet 플랫폼 선택 | 목업 그림자가 shadow-md 수준으로 희미함 |
| 4-3 | Primitives | Mobile 플랫폼 선택 | 목업 그림자가 shadow-md 수준으로 희미함 |
| 5 | Primitives | Mobile 플랫폼 선택 | 베젤이 이중 테두리/디테일로 세련되게 보임 (flat 스타일 유지) |
| 6-1 | Primitives | Web → Sidebar → Dashboard Grid | 기존과 동일하게 작동, 레이아웃 정상 |
| 6-2 | Primitives | Tablet → Topnav → Tab Page | 기존과 동일하게 작동, 레이아웃 정상 |
| 6-3 | Primitives | Mobile → Dock → Sidebar Page | 기존과 동일하게 작동, 레이아웃 정상 |

**총 스크린샷: 12장**

## Designer 전달사항

- 새로운 UI 패턴 필요 여부: **없음**
- 기존 목업 디자인을 수정하는 작업으로, 새로운 UI 컴포넌트나 패턴은 도입하지 않음
- Designer 단계 생략 가능

## Implementer 전달사항

### 구현 순서

1. **REQ-4: 그림자 최소화** (독립적, 가장 간단)
   - `live-preview.tsx`의 WebMockup, TabletMockup, MobileMockup에서 `shadow-xl`, `shadow-2xl` → `shadow-md` 일괄 변경

2. **REQ-1: 웹 스크롤 정렬** (독립적)
   - `primitives-step-page.tsx` line 319: `justify-center` → `justify-start`로 변경
   - 단, 목업이 컨테이너보다 작을 때는 중앙 정렬 유지하도록 조건부 처리 고려
   - 또는 컨테이너는 `justify-start`로 두고, 목업 자체에 `mx-auto`를 조건부로 적용

3. **REQ-3: 모바일 스크롤바 숨김** (독립적)
   - `live-preview.tsx` line 283 MobileMockup의 스크린 영역 className에 추가:
   - `[&::-webkit-scrollbar]:hidden` (Webkit 브라우저)
   - `scrollbar-width-none` (Firefox, Tailwind v4에서 지원 확인 필요)
   - 만약 Tailwind v4에 `scrollbar-width-none` 유틸리티가 없으면 커스텀 CSS 추가 고려

4. **REQ-2: 모바일 Dynamic Island 간섭 제거** (MobileMockup 구조 변경)
   - `live-preview.tsx` line 287-294:
     - Dynamic Island: `sticky top-0` 유지, `pointer-events-none` 유지
     - 콘텐츠 래퍼의 `-mt-12` 제거
     - 대신 콘텐츠 래퍼에 `pt-12` 또는 `pt-[48px]` 추가 (Dynamic Island 높이 + 여백)
     - Home Indicator도 마찬가지로 콘텐츠에 `pb-8` 정도 추가하여 하단 여백 확보

5. **REQ-5: 모바일 베젤 디자인 개선** (선택적, REQ-2 이후)
   - `live-preview.tsx` line 277 MobileMockup:
     - 현재: `border-8 border-foreground`
     - 개선안 1: 이중 테두리 효과
       ```tsx
       className="shrink-0 overflow-hidden rounded-[40px] border-8 border-zinc-800/90 shadow-md ring-2 ring-zinc-700/50"
       ```
     - 개선안 2: 외곽 베젤 + 내부 인셋 그림자
       ```tsx
       className="shrink-0 overflow-hidden rounded-[40px] border-8 border-zinc-800 shadow-md"
       // 스크린 영역에 추가:
       className="... shadow-inner"
       ```
     - Dynamic Island 색상: `bg-foreground` → `bg-black`으로 고정 (라이트 모드에서도 검정)
     - Dynamic Island 크기 조정: `w-[120px] h-8` → `w-[100px] h-7` (약간 작게)

6. **REQ-6: 사이드 이펙트 검증**
   - 변경 후 여러 조합 테스트 (Web/Tablet/Mobile × Sidebar/Topnav/Dock/Landing × Simple/Tab/Sidebar/Dashboard)
   - 기존 기능이 정상 작동하는지 확인
   - 특히 다크모드 토글, 폰트/컬러 변경 시에도 미리보기가 정상적으로 업데이트되는지 확인

### 주의사항

1. **다크모드 대응**
   - 모바일 베젤 색상: `border-foreground`는 라이트/다크에서 자동 전환됨
   - 개선안에서 `border-zinc-800` 등 고정 색상을 사용하면 다크모드에서 어색할 수 있음
   - 다크모드에도 자연스러운 색상 사용:
     ```tsx
     border-zinc-800 dark:border-zinc-200
     ```
   - 또는 CSS 변수 활용:
     ```tsx
     border-[rgb(var(--foreground)/0.9)]
     ```

2. **oklch 색공간**
   - 이 작업에서는 oklch를 직접 다루지 않음 (목업 스타일만 변경)
   - `usePreviewTokens`는 수정하지 않음

3. **Tailwind CSS v4**
   - `scrollbar-width-none` 유틸리티가 Tailwind v4에 존재하는지 확인 필요
   - 없으면 `app.css`에 커스텀 CSS 추가:
     ```css
     .scrollbar-none {
       scrollbar-width: none;
     }
     .scrollbar-none::-webkit-scrollbar {
       display: none;
     }
     ```

4. **스크롤 정렬 조건부 처리**
   - `justify-start`로 변경하면 목업이 작을 때 좌측으로 치우쳐 보일 수 있음
   - 해결책:
     - 목업 wrapper에 `mx-auto` 추가 (컨테이너 내에서 중앙 정렬)
     - 또는 JavaScript로 ResizeObserver 사용하여 조건부 클래스 적용
   - 단순한 방법: 컨테이너는 `justify-start`, 목업 wrapper(`<div style={wrapperStyle}>`)에 `mx-auto` 추가

5. **E2E 테스트 업데이트 필요 여부**
   - 기존 테스트가 목업 스타일에 의존하는 경우 업데이트 필요
   - 예: 그림자 클래스 확인, Dynamic Island 위치 확인 등
   - 하지만 대부분의 테스트는 기능적 동작만 확인하므로 영향 없을 가능성 높음

6. **범위 제한 (사이드 이펙트 방지)**
   - 다음 항목은 절대 수정하지 않음:
     - 앱 셸(SidebarShell, TopnavShell, DockShell, LandingShell) 내부 레이아웃
     - 페이지 콘텐츠(SimplePageContent, TabPageContent, SidebarPageContent, DashboardGridContent)
     - `usePreviewTokens` 훅 (토큰 계산 로직)
     - 컨트롤 패널 컴포넌트 (FontSelector, ColorPicker, ScaleConfigurator 등)
     - `useWizardStore` 상태 관리

## 설계 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|----------|----------|------------|----------|
| 1 | 웹 스크롤 정렬 방식 | 컨테이너 `justify-start` + 목업 wrapper `mx-auto` | (A) 조건부 `justify-center`/`justify-start`, (B) JavaScript ResizeObserver | 단순하고 CSS만으로 해결 가능. 목업이 컨테이너보다 크면 좌측부터 표시, 작으면 자동 중앙 정렬. |
| 2 | 모바일 Dynamic Island 위치 | `sticky top-0` 유지 + 콘텐츠 `pt-12` 추가 | (A) sticky 제거 + absolute 배치, (B) 네거티브 마진 유지 + z-index 조정 | 실제 iPhone처럼 Dynamic Island가 상단에 고정되어야 자연스러움. 네거티브 마진은 콘텐츠를 가리므로 제거하고 padding으로 대체. |
| 3 | 스크롤바 숨김 방식 | Tailwind 유틸리티 `[&::-webkit-scrollbar]:hidden` + 커스텀 CSS `scrollbar-width: none` | (A) JavaScript로 커스텀 스크롤 구현, (B) `overflow: hidden` + 스크롤 불가능 | CSS만으로 해결 가능. JavaScript 불필요. 스크롤 기능은 유지하되 시각적으로만 숨김. |
| 4 | 그림자 강도 | `shadow-md` 일괄 적용 | (A) `shadow-sm`, (B) `shadow-none`, (C) 플랫폼별 차등 적용 | `shadow-sm`은 너무 약함, `shadow-none`은 depth 없음. `shadow-md`가 flat하면서도 약간의 입체감 유지. 모든 플랫폼에 일관되게 적용. |
| 5 | 모바일 베젤 디자인 | `border-8 border-zinc-800 dark:border-zinc-200` + Dynamic Island `bg-black` 고정 | (A) `border-foreground` 유지, (B) 그라데이션 베젤, (C) 이중 테두리 | `border-foreground`는 다크모드에서 흰색이 되어 어색함. `border-zinc-800 dark:border-zinc-200`는 실제 iPhone 베젤 색상과 유사. Dynamic Island는 라이트/다크 모두 검정으로 고정. 단순하고 flat. |
| 6 | 변경 범위 제한 | 목업 컴포넌트 + 프리뷰 컨테이너 레이아웃만 수정 | (A) 앱 셸 레이아웃도 함께 개선, (B) 토큰 계산 로직도 리팩토링 | 사용자가 "하라는 것만 할 것"이라고 명시. 사이드 이펙트 방지가 최우선. 목업 UX 개선에만 집중. |
| 7 | Dynamic Island 크기 | `w-[100px] h-7` (약간 축소) | (A) `w-[120px] h-8` 유지, (B) `w-[80px] h-6` (더 작게) | 현재 크기(`w-[120px] h-8`)는 약간 큼. 실제 iPhone 14 Pro 비율 참고하여 약간 축소. 너무 작으면 디테일이 없어 보임. |
| 8 | 스크롤바 숨김 Tailwind 클래스 | `[&::-webkit-scrollbar]:hidden` (Arbitrary variants) | (A) `scrollbar-hide` (커스텀 유틸리티), (B) inline style | Tailwind v4는 arbitrary variants 지원. 커스텀 유틸리티 추가 불필요. Firefox는 `scrollbar-width: none` 필요하므로 해당 부분만 커스텀 CSS 추가. |
