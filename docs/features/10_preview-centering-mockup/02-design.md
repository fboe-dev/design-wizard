# 디자인: 미리보기 중앙 정렬 및 플랫폼별 목업 디자인

## 1. 레퍼런스 리서치

| # | URL | 핵심 패턴 | 참고 포인트 |
|---|-----|----------|------------|
| 1 | https://daisyui.com/components/mockup-window/ | daisyUI mockup-window: macOS 창 모양의 컨테이너. `::before` pseudo-element로 traffic lights 3개를 CSS-only로 표현. 배경은 `border-base-300` 단색 | Flat 스타일 traffic lights의 크기/간격 비율. 타이틀바 내 좌측 정렬 패턴. 단순 border + rounded로 창 프레임 표현 |
| 2 | https://tailwindflex.com/@manon-daniel/mac-terminal-mockup | Tailwind CSS mac terminal mockup: 3개 원형 div (`bg-red-500`, `bg-yellow-500`, `bg-green-500`)를 `flex gap-2`로 배치. 헤더 바에 `bg-gray-200 rounded-t-lg` 적용 | Traffic lights를 개별 div로 구현하는 패턴. 헤더와 콘텐츠의 분리 구조. Tailwind 클래스만으로 완성 가능 |
| 3 | https://www.figma.com/community/file/1161518833995153231/flat-design-device-mockups-iphone-android-tablet-browser-community | Flat Design Device Mockups (Figma Community): iPhone, Android, Tablet, Browser를 모두 flat 스타일로 제공. 베젤은 단색 사각형, 카메라/센서는 원형/캡슐 형태 | 3종 디바이스의 flat 목업 비율 및 디테일 수준 기준. 베젤 두께 대비 스크린 비율. 홈 인디케이터/Dynamic Island의 단순화 수준 |
| 4 | https://www.figma.com/community/file/887305488325104522/flat-ipad-mini-air-and-pro-mockup | Flat iPad Mini, Air, Pro Mockup (Figma Community): 균등 베젤 + 상단 카메라 노치를 최소 디테일로 표현. 프레임은 rounded rectangle, 베젤 색상은 단색(검정/흰색) | iPad 베젤의 균등 두께 비율. 카메라 노치의 크기(베젤 대비 매우 작음). rounded-3xl 수준의 모서리 라운딩 |
| 5 | https://www.shadcn.io/components/device-mocks/iphone-15-pro | shadcn.io iPhone 15 Pro device mock: SVG 기반 iPhone 프레임. Dynamic Island, 볼륨/전원 버튼, 홈 인디케이터 포함. React 컴포넌트로 제공 | Dynamic Island의 위치(상단 중앙, 스크린 내부). 홈 인디케이터의 위치(하단 중앙, 스크린 내부). SVG가 아닌 div로 flat 구현 시의 단순화 기준 |
| 6 | https://dribbble.com/shots/2276226-24-Free-Flat-Vector-Mockups-of-All-Apple-Devices | 24 Flat Vector Mockups of All Apple Devices: 전체 Apple 기기 라인업을 flat vector로 제공. 3가지 테마(White, Black, Outlined) | 디바이스 테마 전환 패턴(밝은/어두운 베젤). 우리의 다크모드 대응과 유사한 접근 — `foreground` 토큰으로 라이트 시 검정 베젤, 다크 시 흰색 베젤 자동 전환 |

## 2. Spacing 설계

### REQ 1: 프리뷰 중앙 정렬

| 요소 | 값 | Tailwind |
|------|---|---------|
| 프리뷰 패널 정렬 (수직) | center | `items-center` |
| 프리뷰 패널 정렬 (수평) | center | `justify-center` |
| 패딩 | 기존 유지 (16px) | `p-4` |

### REQ 2: Web 플랫폼 목업 (macOS Window)

| 요소 | 값 | Tailwind / CSS |
|------|---|---------------|
| 타이틀바 높이 | 40px | `h-10` |
| 타이틀바 좌측 패딩 | 16px | `pl-4` |
| 타이틀바 우측 패딩 | 16px | `pr-4` |
| Traffic light 직경 | 12px | `h-3 w-3` |
| Traffic light 간격 | 8px | `gap-2` |
| 타이틀바 라벨 | 중앙 정렬 | `absolute left-1/2 -translate-x-1/2` |
| 프레임 라운딩 | rounded-lg | `rounded-lg` |
| 프레임 그림자 | shadow-xl | `shadow-xl` |
| 콘텐츠 높이 | previewHeight - 40 | `style={{ height: previewHeight - 40 }}` |

### REQ 3: Tablet 플랫폼 목업 (iPad)

| 요소 | 값 | Tailwind / CSS |
|------|---|---------------|
| 베젤 두께 (상하좌우) | 16px | `p-4` (inner padding on bezel container) |
| 카메라 노치 너비 | 8px | `w-2` |
| 카메라 노치 높이 | 4px | `h-1` |
| 카메라 노치 라운딩 | full | `rounded-full` |
| 프레임 라운딩 | rounded-3xl | `rounded-3xl` |
| 프레임 그림자 | shadow-2xl | `shadow-2xl` |
| 스크린 라운딩 | rounded-lg | `rounded-lg` |
| 콘텐츠 높이 | previewHeight - 32 | `style={{ height: previewHeight - 32 }}` |
| 콘텐츠 너비 | previewWidth - 32 | `style={{ width: previewWidth - 32 }}` |

### REQ 4: Mobile 플랫폼 목업 (iPhone)

| 요소 | 값 | Tailwind / CSS |
|------|---|---------------|
| 베젤 두께 | 8px | `border-8` |
| Dynamic Island 너비 | 120px | `w-[120px]` |
| Dynamic Island 높이 | 32px | `h-8` |
| Dynamic Island 라운딩 | full | `rounded-full` |
| Dynamic Island 상단 마진 | 8px | `mt-2` |
| 홈 인디케이터 너비 | 120px | `w-[120px]` |
| 홈 인디케이터 높이 | 4px | `h-1` |
| 홈 인디케이터 라운딩 | full | `rounded-full` |
| 홈 인디케이터 하단 마진 | 8px (스크린 하단으로부터) | `mb-2` |
| 프레임 라운딩 | 40px | `rounded-[40px]` |
| 프레임 그림자 | shadow-2xl | `shadow-2xl` |
| 스크린 라운딩 | 32px | `rounded-[32px]` |
| 콘텐츠 높이 | previewHeight - 16 | `style={{ height: previewHeight - 16 }}` |
| 콘텐츠 너비 | previewWidth - 16 | `style={{ width: previewWidth - 16 }}` |

## 3. 컴포넌트 설계

### 사용할 @shadcn/* 컴포넌트

- 없음 (목업 프레임은 순수 HTML div + Tailwind 클래스로 구현)

### 사용할 @custom/* 컴포넌트

- 없음

### 새로 만들 컴포넌트

모두 `live-preview.tsx` 내부에 로컬 컴포넌트로 정의 (export 불필요).

#### 3-1. `WebMockup` (macOS Window Frame)

```tsx
function WebMockup({
  children,
  width,
  height,
  deviceLabel,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
  deviceLabel: string;
}) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-lg border border-border shadow-xl"
      style={{ width, minHeight: height }}
    >
      {/* macOS 타이틀바 */}
      <div className="relative flex h-10 items-center border-b border-border bg-muted/40 pl-4">
        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
        </div>
        {/* 디바이스 라벨 (중앙) */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-muted-foreground">
          {deviceLabel}
        </span>
      </div>

      {/* 콘텐츠 영역 */}
      <div
        className="overflow-auto bg-background font-sans text-foreground"
        style={{ height: height - 40 }}
      >
        {children}
      </div>
    </div>
  );
}
```

**JSX 계층:**
```
div.rounded-lg.border.shadow-xl          ← 전체 프레임
  div.h-10.bg-muted/40                   ← 타이틀바 (40px)
    div.flex.gap-2                        ← Traffic Lights 컨테이너
      div.rounded-full [#FF5F57]          ← 닫기 버튼
      div.rounded-full [#FEBC2E]          ← 최소화 버튼
      div.rounded-full [#28C840]          ← 최대화 버튼
    span.absolute.left-1/2               ← 디바이스 라벨
  div.overflow-auto                       ← 콘텐츠 (앱 셸 + 페이지)
```

#### 3-2. `TabletMockup` (iPad Frame)

```tsx
function TabletMockup({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
}) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-3xl bg-foreground shadow-2xl"
      style={{ width, minHeight: height }}
    >
      {/* 상단 베젤 + 카메라 노치 */}
      <div className="flex h-4 items-center justify-center bg-foreground">
        <div className="h-1 w-2 rounded-full bg-foreground/20" />
      </div>

      {/* 스크린 (좌우 + 하단 베젤은 padding으로) */}
      <div className="px-4 pb-4">
        <div
          className="overflow-auto rounded-lg bg-background font-sans text-foreground"
          style={{ height: height - 32 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
```

**JSX 계층:**
```
div.rounded-3xl.bg-foreground.shadow-2xl  ← 전체 프레임 (베젤 색상)
  div.h-4.justify-center                  ← 상단 베젤 (16px)
    div.h-1.w-2.rounded-full              ← 카메라 노치
  div.px-4.pb-4                           ← 좌우/하단 베젤 (16px)
    div.rounded-lg.bg-background          ← 스크린 영역
      {children}                          ← 콘텐츠 (앱 셸 + 페이지)
```

**다크모드 대응:**
- `bg-foreground`는 라이트모드에서 `oklch(0.141 0.005 285.823)` (거의 검정) → 검정 베젤
- `bg-foreground`는 다크모드에서 `oklch(0.985 0 0)` (거의 흰색) → 흰색 베젤
- `bg-foreground/20`은 베젤 위의 반투명 카메라 노치 → 두 모드에서 자연스럽게 구분

#### 3-3. `MobileMockup` (iPhone Frame)

```tsx
function MobileMockup({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
}) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-[40px] border-8 border-foreground shadow-2xl"
      style={{ width, minHeight: height }}
    >
      {/* 스크린 영역 */}
      <div
        className="relative overflow-auto rounded-[32px] bg-background font-sans text-foreground"
        style={{ height: height - 16 }}
      >
        {/* Dynamic Island */}
        <div className="pointer-events-none sticky top-0 z-10 flex justify-center pt-2">
          <div className="h-8 w-[120px] rounded-full bg-foreground" />
        </div>

        {/* 콘텐츠 (Dynamic Island 높이만큼 네거티브 마진) */}
        <div className="-mt-12">
          {children}
        </div>

        {/* 홈 인디케이터 */}
        <div className="pointer-events-none sticky bottom-0 z-10 flex justify-center pb-2">
          <div className="h-1 w-[120px] rounded-full bg-foreground/30" />
        </div>
      </div>
    </div>
  );
}
```

**JSX 계층:**
```
div.rounded-[40px].border-8.border-foreground.shadow-2xl  ← 전체 프레임 (베젤)
  div.relative.rounded-[32px].bg-background               ← 스크린 영역
    div.sticky.top-0.z-10                                  ← Dynamic Island 컨테이너
      div.h-8.w-[120px].rounded-full.bg-foreground         ← Dynamic Island
    div.-mt-12                                             ← 콘텐츠 (앱 셸 + 페이지)
    div.sticky.bottom-0.z-10                               ← 홈 인디케이터 컨테이너
      div.h-1.w-[120px].rounded-full.bg-foreground/30      ← 홈 인디케이터
```

**다크모드 대응:**
- `border-foreground`: 라이트 → 검정 베젤, 다크 → 흰색 베젤
- `bg-foreground` (Dynamic Island): 라이트 → 검정 알약, 다크 → 흰색 알약
- `bg-foreground/30` (홈 인디케이터): 반투명으로 두 모드에서 자연스럽게 표시

### 기존 LivePreview 컴포넌트 수정 계획

현재 `LivePreview` (L202~231)의 단일 컨테이너를 `platformTarget` 기준 3개 목업으로 분기:

```tsx
export function LivePreview({ state, language }: { state: WizardState; language?: string }) {
  const { previewDark } = usePreviewUI();
  const cssTokens = usePreviewTokens(state, previewDark);
  const t = PREVIEW_TEXTS[language ?? "korean"] ?? PREVIEW_TEXTS.korean;
  const platform = state.platformTarget;

  const device = DEVICE_OPTIONS[platform].find(d => d.name === state.selectedDevice)
    ?? DEVICE_OPTIONS[platform][0];
  const previewWidth = device.width;
  const previewHeight = device.height;
  const deviceLabel = getDeviceLabel(platform, state.selectedDevice);

  // 앱 셸 콘텐츠 (공통)
  const shellContent = (
    <>
      {state.appShellLayout === "sidebar" ? (
        <SidebarShell ... />
      ) : state.appShellLayout === "topnav" ? (
        <TopnavShell ... />
      ) : state.appShellLayout === "dock" ? (
        <DockShell ... />
      ) : (
        <LandingShell ... />
      )}
    </>
  );

  // cssTokens를 최상위 wrapper에 적용
  const wrapperStyle = { ...cssTokens };

  // 플랫폼별 목업 분기
  if (platform === "web") {
    return (
      <div style={wrapperStyle}>
        <WebMockup width={previewWidth} height={previewHeight} deviceLabel={deviceLabel}>
          {shellContent}
        </WebMockup>
      </div>
    );
  }

  if (platform === "tablet") {
    return (
      <div style={wrapperStyle}>
        <TabletMockup width={previewWidth} height={previewHeight}>
          {shellContent}
        </TabletMockup>
      </div>
    );
  }

  // mobile
  return (
    <div style={wrapperStyle}>
      <MobileMockup width={previewWidth} height={previewHeight}>
        {shellContent}
      </MobileMockup>
    </div>
  );
}
```

## 4. 색상 (oklch)

### 기존 테마 변수 활용

| 용도 | 토큰 | 라이트 모드 값 | 다크 모드 값 |
|------|------|--------------|------------|
| 프레임 배경/타이틀바 배경 | `bg-muted/40` | oklch(0.967 0.001 286.375) / 40% | oklch(0.274 0.006 286.033) / 40% |
| 프레임 테두리 | `border-border` | oklch(0.92 0.004 286.32) | oklch(1 0 0 / 10%) |
| 베젤 색상 | `bg-foreground` | oklch(0.141 0.005 285.823) (검정 계열) | oklch(0.985 0 0) (흰색 계열) |
| 카메라 노치 | `bg-foreground/20` | 검정 20% 불투명도 | 흰색 20% 불투명도 |
| Dynamic Island | `bg-foreground` | 검정 | 흰색 |
| 홈 인디케이터 | `bg-foreground/30` | 검정 30% 불투명도 | 흰색 30% 불투명도 |
| 타이틀바 텍스트 | `text-muted-foreground` | oklch(0.552 0.016 285.938) | oklch(0.705 0.015 286.067) |
| 스크린 배경 | `bg-background` | oklch(1 0 0) | oklch(0.141 0.005 285.823) |

### 새 색상 (HEX 고정 - macOS Traffic Lights)

| 용도 | 색상 | 적용 방식 |
|------|------|----------|
| 닫기 버튼 | #FF5F57 | `style={{ backgroundColor: '#FF5F57' }}` |
| 최소화 버튼 | #FEBC2E | `style={{ backgroundColor: '#FEBC2E' }}` |
| 최대화 버튼 | #28C840 | `style={{ backgroundColor: '#28C840' }}` |

Traffic lights는 macOS 브랜드 컬러이므로 다크모드에서도 동일 색상 유지 (실제 macOS 동작과 일치).

## 5. Implementer 전달사항

### 구현 순서

1. **REQ 1** (독립): `primitives-step-page.tsx` L319에서 `items-start justify-start` -> `items-center justify-center` 변경
2. **REQ 2**: `WebMockup` 로컬 컴포넌트 생성 + `LivePreview` 분기 로직
3. **REQ 3**: `TabletMockup` 로컬 컴포넌트 생성
4. **REQ 4**: `MobileMockup` 로컬 컴포넌트 생성
5. 기존 크롬 헤더 (L207~212) 완전 제거

### 핵심 주의사항

1. **cssTokens 적용 위치**: `usePreviewTokens`가 반환하는 CSS 변수들을 목업의 최상위 wrapper `div`에 `style`로 적용해야 함. 목업 프레임 내부의 `bg-background`, `text-foreground` 등이 이 변수를 참조하므로 반드시 상위에 위치해야 함

2. **font-sans 클래스**: 각 목업의 콘텐츠 영역(스크린)에 `font-sans text-foreground` 클래스 필수. 현재 코드의 최상위 div에 있던 것을 각 콘텐츠 영역으로 이동

3. **cursor 스타일 유지**: 현재 L216의 `[&_button]:cursor-pointer` 등 cursor 오버라이드 클래스를 각 목업의 콘텐츠 영역에 유지

4. **Dynamic Island / 홈 인디케이터 오버레이 전략**: `sticky` 포지셔닝 대신 `absolute` 포지셔닝이 더 안정적일 수 있음. 스크롤 시 Dynamic Island이 콘텐츠 위에 떠 있어야 하므로 구현 시 테스트 필요. 최종 결정은 Implementer에게 위임

5. **콘텐츠 높이 계산**:
   - Web: `previewHeight - 40` (타이틀바 40px)
   - Tablet: `previewHeight - 32` (상하 베젤 16px x 2)
   - Mobile: `previewHeight - 16` (border-8은 양쪽 합산 16px)

6. **previewWidth 계산 (Tablet/Mobile)**:
   - Tablet: 콘텐츠 영역 너비 = `previewWidth - 32` (좌우 베젤 16px x 2)
   - Mobile: `border-8`은 CSS box model에서 자동 처리되므로 별도 계산 불필요

7. **Tablet 스크린 영역의 카메라 노치와 베젤**: 카메라 노치(h-1, w-2)는 상단 베젤 내부 중앙에 위치. 베젤과 같은 `bg-foreground` 배경 위에 `bg-foreground/20`으로 미묘하게 표현

8. **기존 `getDeviceLabel` 함수 유지**: WebMockup 타이틀바에서 사용. Tablet/Mobile에서는 사용하지 않음 (삭제하지 말 것)

## 6. 디자인 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|----------|----------|-----------|----------|
| 1 | macOS traffic lights 구현 방식 | 개별 div 3개 + inline style로 HEX 색상 적용 | (1) CSS `::before` pseudo-element (daisyUI 방식) (2) SVG 아이콘 사용 | 개별 div가 가장 직관적이고, JSX에서 `::before` 스타일링은 Tailwind와 어색함. SVG는 flat 스타일에 과잉. 3개 div + `flex gap-2`가 레퍼런스(tailwindflex Mac terminal)와 동일한 패턴 |
| 2 | Traffic lights 색상 적용 방식 | `style={{ backgroundColor }}` inline | (1) Tailwind arbitrary value `bg-[#FF5F57]` (2) CSS 변수 정의 후 사용 | Inline style이 가장 명시적. Tailwind arbitrary value도 가능하나, HEX 고정 색상 3개에 CSS 변수 오버헤드는 불필요. 01-plan.md 의사결정 #5에서 고정 HEX 사용 확정 |
| 3 | 타이틀바 디바이스 라벨 정렬 | `absolute left-1/2 -translate-x-1/2` (중앙 고정) | (1) `flex-1 text-center` (2) `justify-center`를 부모에 적용 | Traffic lights가 좌측에 있으므로 flex 중앙 정렬 시 시각적 편향 발생. absolute 포지셔닝으로 traffic lights 존재와 무관하게 정확히 중앙 배치 |
| 4 | iPad 베젤 구현 방식 | `bg-foreground` 배경 div + 내부 padding으로 베젤 표현 | (1) `border-[16px] border-foreground` (2) 중첩 div로 베젤과 스크린 분리 | Padding 방식이 카메라 노치를 배치하기 쉬움. border 방식은 border 위에 요소를 올리기 어려움. 상단 베젤을 별도 div로 분리하여 노치를 자연스럽게 중앙 배치 |
| 5 | iPad 카메라 노치 크기 (8x4px) | 01-plan.md 명세대로 8x4px (`w-2 h-1`) | (1) 더 크게 (16x6px) (2) 생략 | 01-plan.md에서 8x4px 명시. flat 디자인에서 카메라 노치는 존재감만 보여주면 됨. 레퍼런스(Flat iPad Figma)에서도 최소 크기로 표현 |
| 6 | iPhone 베젤 구현 방식 | `border-8 border-foreground` CSS border 사용 | (1) padding + 배경색 (iPad와 동일) (2) 중첩 rounded div | 01-plan.md에서 `border-8 border-foreground` 명시. 8px border가 iPhone의 얇은 베젤을 잘 표현. iPad(16px)와의 시각적 차이로 플랫폼 구분 강화 |
| 7 | Dynamic Island 위치 | 스크린 내부 상단 중앙 (콘텐츠 위에 오버레이) | (1) 베젤 위에 위치 (2) 스크린 영역 높이에서 차감 | 실제 iPhone에서 Dynamic Island은 스크린 내부에 위치 (레퍼런스: shadcn iPhone 15 Pro mock). 콘텐츠 위에 오버레이되어야 실제 기기 경험과 일치 |
| 8 | 홈 인디케이터 위치 | 스크린 내부 하단 중앙 (콘텐츠 위에 오버레이) | (1) 베젤 하단에 위치 (2) 스크린 외부 | 실제 iPhone의 홈 인디케이터는 스크린 내부 하단에 항상 표시됨. `bg-foreground/30`의 반투명 처리로 콘텐츠와 자연스럽게 공존 |
| 9 | 목업 프레임의 최상위 라운딩 값 차별화 | Web: rounded-lg (8px), Tablet: rounded-3xl (24px), Mobile: rounded-[40px] | (1) 모든 플랫폼 동일 라운딩 (2) 더 작은 라운딩 | 각 디바이스의 실제 물리적 형태를 반영. 모니터(작은 라운딩) < 태블릿(중간) < 스마트폰(큰 라운딩). 레퍼런스(Flat Design Device Mockups Figma)에서도 이 비율 확인. 01-plan.md 명세와 일치 |
| 10 | 다크모드 베젤 색상 전략 | `bg-foreground` / `border-foreground` 시맨틱 토큰 단일 사용 | (1) 다크모드별 별도 색상 지정 (2) `bg-neutral-900 dark:bg-neutral-100` 하드코딩 | 프로젝트의 oklch 토큰 시스템에서 `foreground`는 이미 라이트/다크 반전이 정의됨 (라이트: 0.141 어두움, 다크: 0.985 밝음). 별도 다크모드 분기 불필요하며, 프리뷰의 `usePreviewTokens`가 이미 이 값을 동적으로 계산 |
| 11 | Tablet/Mobile에서 디바이스 라벨 표시 여부 | 생략 (표시하지 않음) | (1) 목업 하단 외부에 작은 텍스트로 표시 (2) 베젤 내부에 표시 | 01-plan.md 의사결정 #4 참조. Web은 타이틀바가 라벨 공간을 자연스럽게 제공하나, Tablet/Mobile 베젤에 텍스트를 넣으면 시각적 노이즈. 디바이스 선택 UI가 좌측 패널에 이미 존재하므로 목업 내 라벨 중복 불필요 |
| 12 | 목업 컴포넌트 파일 위치 | `live-preview.tsx` 내부 로컬 함수 | (1) 별도 파일 `web-mockup.tsx`, `tablet-mockup.tsx`, `mobile-mockup.tsx` (2) `@custom/device-mockup/` 디렉토리 | 목업 컴포넌트는 LivePreview 전용이며 재사용 가능성 없음. 기존 `live-preview.tsx`에 SidebarShell, TopnavShell 등도 로컬 함수로 정의되어 있어 동일 패턴 유지. 파일 수 증가 방지 |
