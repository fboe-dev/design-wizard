# 미리보기 개선

## 요구사항

### [위저드 단계: Primitives]

#### 1. 미리보기 중앙 정렬
primitives-step-page.tsx의 프리뷰 패널 레이아웃을 좌측 상단 정렬에서 수직수평 중앙 정렬로 변경.

**현재 상태:**
- 라인 319: `className="flex min-h-0 flex-1 items-start justify-start overflow-auto p-4"`
- LivePreview가 패널의 좌측 상단 모서리에 붙어서 표시됨

**변경 내용:**
- `items-start justify-start` → `items-center justify-center`로 변경
- 프리뷰 컨테이너가 ResizablePanel 중앙에 위치하도록 수정

**완료 기준:** Primitives 단계 진입 → 스크린샷에 LivePreview 컴포넌트가 우측 패널의 정중앙에 위치함

---

#### 2. Web 플랫폼 목업 디자인 적용
live-preview.tsx의 최상위 컨테이너에 macOS 스타일 윈도우 크롬 적용 (Flat 디자인).

**현재 상태:**
- 라인 202~230: 단순 border + rounded-xl + 헤더 바
- 플랫폼 구분 없이 동일한 시각적 처리

**변경 내용:**
- Web 플랫폼 선택 시: macOS 윈도우 프레임 스타일 적용
  - 상단 타이틀바: 좌측 traffic lights(빨강/노랑/초록 원형 버튼 3개)
  - 타이틀바 배경: `bg-muted/40`
  - 타이틀바 높이: 40px
  - 디바이스 라벨은 타이틀바 중앙에 표시 (현재와 동일)
  - 전체 윈도우: border + shadow-xl + rounded-lg
- Flat 스타일: 그라데이션/입체감 없이 단색 + 단순 그림자

**완료 기준:** Platform Target "Web" 선택 → 스크린샷에 macOS 윈도우 크롬(traffic lights, 타이틀바)이 보임

---

#### 3. Tablet 플랫폼 목업 디자인 적용
live-preview.tsx에 iPad 스타일 디바이스 프레임 적용 (Flat 디자인).

**현재 상태:**
- Web과 동일한 시각적 처리

**변경 내용:**
- Tablet 플랫폼 선택 시: iPad 디바이스 프레임 스타일 적용
  - 외곽 베젤: 상하좌우 균등 두께 (16px)
  - 베젤 배경: `bg-foreground` (다크모드에서 밝은 색)
  - 상단 중앙: 카메라 노치 (8px 너비, 4px 높이, rounded-full, `bg-foreground/20`)
  - 전체 프레임: rounded-3xl + shadow-2xl
- Flat 스타일: 단순 형태 + 최소한의 디테일

**완료 기준:** Platform Target "Tablet" 선택 → 스크린샷에 iPad 베젤과 상단 카메라 노치가 보임

---

#### 4. Mobile 플랫폼 목업 디자인 적용
live-preview.tsx에 iPhone 스타일 디바이스 프레임 적용 (Flat 디자인).

**현재 상태:**
- Web/Tablet과 동일한 시각적 처리

**변경 내용:**
- Mobile 플랫폼 선택 시: iPhone 디바이스 프레임 스타일 적용
  - 외곽 베젤: 좁은 테두리 (8px, `border-8 border-foreground`)
  - 상단 중앙: Dynamic Island 스타일 노치 (120px 너비, 32px 높이, rounded-full, `bg-foreground`)
  - 하단 중앙: 홈 인디케이터 (120px 너비, 4px 높이, rounded-full, `bg-foreground/30`)
  - 전체 프레임: rounded-[40px] + shadow-2xl
  - 측면: 볼륨/전원 버튼 표현 (옵션, 생략 가능)
- Flat 스타일: iPhone 15/16 Pro 형태의 단순화된 실루엣

**완료 기준:** Platform Target "Mobile" 선택 → 스크린샷에 iPhone 베젤, Dynamic Island, 홈 인디케이터가 보임

---

## 의존 관계

```
REQ 1 (중앙정렬) ← 독립 (다른 작업과 무관)
REQ 2 (Web 목업) ← 독립
REQ 3 (Tablet 목업) ← 독립
REQ 4 (Mobile 목업) ← 독립
```

모든 요구사항이 독립적으로 구현 가능. 순서 제약 없음.

---

## 스크린샷 요약

| REQ | 위저드 단계 | 스크린샷 필요 | 촬영 시점 |
|-----|------------|--------------|-----------|
| 1 | Primitives | 1장 | Platform Target 무관, 중앙정렬 확인 |
| 2 | Primitives | 1장 | Platform Target "Web" 선택 후 |
| 3 | Primitives | 1장 | Platform Target "Tablet" 선택 후 |
| 4 | Primitives | 1장 | Platform Target "Mobile" 선택 후 |

**총 스크린샷: 4장**

촬영 위치: `/wizard/primitives` 페이지

---

## 정제 근거

### 현재 구현 상태 조사 결과

**파일 구조:**
- **primitives-step-page.tsx** (라인 319): 프리뷰 패널 레이아웃 정의
  - ResizablePanel 내부에 `<div className="flex min-h-0 flex-1 items-start justify-start overflow-auto p-4">`
  - `items-start justify-start`로 인해 좌측 상단 정렬됨

- **live-preview.tsx** (961줄): 미리보기 콘텐츠 구현
  - 라인 202~230: 최상위 구조는 고정 크기 디바이스 컨테이너
  - 현재 목업 디자인 없음 - 단순 border + rounded-xl + 크롬 헤더

- **constants.ts** (라인 952~970): DEVICE_OPTIONS 정의
  - web/tablet/mobile 3가지 플랫폼별 디바이스 목록
  - 각 기기별 width/height 정의됨

### 정제 의사결정

1. **"좌측 상단에 붙어 나오는데"** → Grep으로 `items-start justify-start` 발견. Flexbox 정렬 변경으로 해결.

2. **"플렛폼별 기기 목업"** → constants.ts의 DEVICE_OPTIONS로 web/tablet/mobile 구분 확인. platformTarget 상태 기준 조건부 렌더링 필요.

3. **"실물일 필요없고 flat하게"** → 사실적 렌더링 불필요. 각 플랫폼의 핵심 식별 요소만 단순하게:
   - Web: macOS traffic lights (빨강/노랑/초록 원 3개)
   - Tablet: iPad 베젤 + 카메라 노치
   - Mobile: iPhone Dynamic Island + 홈 인디케이터

4. **목업 디자인 명세화** → 원문에 구체적 수치 없음. 일반적인 디자인 패턴 기준으로 px 단위 지정:
   - macOS 타이틀바: 40px (표준)
   - iPad 베젤: 16px (균등)
   - iPhone 베젤: 8px + Dynamic Island 120×32px
