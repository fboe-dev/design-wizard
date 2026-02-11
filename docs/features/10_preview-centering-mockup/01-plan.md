# 기획: 미리보기 중앙 정렬 및 플랫폼별 목업 디자인

## 목적

Primitives 단계의 라이브 프리뷰 UX를 개선하여 사용자가 선택한 플랫폼(Web/Tablet/Mobile)에 따라 적절한 디바이스 목업을 시각적으로 구별할 수 있도록 하고, 프리뷰가 ResizablePanel의 중앙에 정렬되도록 레이아웃을 개선한다.

## 요구사항 → 파일 매핑

| REQ | 수정 파일 | 핵심 변경 |
|-----|----------|----------|
| REQ 1: 미리보기 중앙 정렬 | `primitives-step-page.tsx` (L319) | Flexbox 정렬 속성 변경: `items-start justify-start` → `items-center justify-center` |
| REQ 2: Web 플랫폼 목업 | `live-preview.tsx` (L202~230) | macOS 윈도우 크롬 추가: traffic lights(빨강/노랑/초록) + 타이틀바 (40px, `bg-muted/40`) |
| REQ 3: Tablet 플랫폼 목업 | `live-preview.tsx` (L202~230) | iPad 디바이스 프레임: 균등 베젤(16px, `bg-foreground`) + 상단 카메라 노치 (8×4px, `rounded-full`, `bg-foreground/20`) |
| REQ 4: Mobile 플랫폼 목업 | `live-preview.tsx` (L202~230) | iPhone 디바이스 프레임: 좁은 베젤(8px) + Dynamic Island(120×32px) + 홈 인디케이터(120×4px) |

## 상태 관리 변경

**불필요**: 모든 요구사항은 기존 상태(`platformTarget`, `selectedDevice`)를 조건부 렌더링에 활용하는 UI 변경만 필요. Zustand store 변경 없음.

## 파일 구조

```
app/features/wizard/
├── pages/
│   └── primitives-step-page.tsx    (REQ 1: 프리뷰 패널 Flexbox 정렬 수정)
└── components/
    └── live-preview.tsx             (REQ 2~4: 플랫폼별 목업 컴포넌트 추가)
```

## 완료 기준

| REQ | 완료 조건 |
|-----|----------|
| 1 | Primitives 단계 진입 → 스크린샷에 LivePreview 컴포넌트가 우측 ResizablePanel의 정중앙(수직수평)에 위치함 |
| 2 | Platform Target "Web" 선택 → 스크린샷에 macOS 윈도우 타이틀바와 좌측 상단 traffic lights(빨강/노랑/초록 원 3개)가 선명하게 보임 |
| 3 | Platform Target "Tablet" 선택 → 스크린샷에 iPad 디바이스 베젤(균등 두께)과 상단 중앙 카메라 노치가 선명하게 보임 |
| 4 | Platform Target "Mobile" 선택 → 스크린샷에 iPhone 디바이스 베젤, 상단 Dynamic Island, 하단 홈 인디케이터가 선명하게 보임 |

## 테스트 시나리오

| REQ | 위저드 단계 | 동작 | 기대 결과 |
|-----|------------|------|-----------|
| 1 | Primitives | 페이지 로드 (Platform Target 무관) | LivePreview가 우측 패널 정중앙에 위치. 상하좌우 여백이 균등함 |
| 2 | Primitives | Platform Target 토글을 "Web"으로 설정 | 프리뷰 최상단에 macOS 타이틀바(높이 40px, `bg-muted/40`) + 좌측 traffic lights (직경 12px, 빨강/노랑/초록 원 3개, 8px 간격) + 중앙 디바이스 라벨 표시. 전체 프레임에 `rounded-lg + shadow-xl` 적용 |
| 3 | Primitives | Platform Target 토글을 "Tablet"으로 설정 | 프리뷰 외곽에 균등 베젤(16px, `bg-foreground`) + 상단 중앙에 카메라 노치(8px 너비 × 4px 높이, `rounded-full`, `bg-foreground/20`) 표시. 전체 프레임에 `rounded-3xl + shadow-2xl` 적용 |
| 4 | Primitives | Platform Target 토글을 "Mobile"로 설정 | 프리뷰 외곽에 좁은 베젤(8px, `border-8 border-foreground`) + 상단 중앙 Dynamic Island(120px × 32px, `rounded-full`, `bg-foreground`) + 하단 중앙 홈 인디케이터(120px × 4px, `rounded-full`, `bg-foreground/30`) 표시. 전체 프레임에 `rounded-[40px] + shadow-2xl` 적용 |

## Designer 전달사항

**새로운 UI 패턴 필요 여부: 있음**

1. **macOS Traffic Lights 디자인 (REQ 2)**
   - 빨강(#FF5F57), 노랑(#FEBC2E), 초록(#28C840) 원형 버튼 3개
   - 각 버튼 직경: 12px
   - 버튼 간 간격: 8px
   - 타이틀바 왼쪽 여백 기준: 12px
   - Flat 스타일: 단색 원형, 그라데이션 없음

2. **iPad 베젤 + 카메라 노치 디자인 (REQ 3)**
   - 베젤: 상하좌우 균등 16px, `bg-foreground` (다크모드 대응)
   - 카메라 노치: 8px × 4px, `rounded-full`, `bg-foreground/20`, 상단 베젤 중앙 정렬
   - 전체 프레임: `rounded-3xl` (프리미엄 태블릿 느낌)

3. **iPhone Dynamic Island + 홈 인디케이터 디자인 (REQ 4)**
   - 베젤: 8px, `border-8 border-foreground`
   - Dynamic Island: 120px × 32px, `rounded-full`, `bg-foreground`, 상단 중앙 정렬
   - 홈 인디케이터: 120px × 4px, `rounded-full`, `bg-foreground/30`, 하단 중앙 정렬 (베젤 위로부터 8px 상단 여백)
   - 전체 프레임: `rounded-[40px]` (현대적 스마트폰 형태)

**디자인 제약사항**
- 모든 목업은 **Flat 디자인**: 그라데이션, 입체감, 광택 불필요. 단순 형태 + 단색 + 최소 그림자만 사용
- 다크모드 대응: `bg-foreground`, `bg-muted`, `border-border` 등 시맨틱 토큰 사용 필수
- 기존 `live-preview.tsx`의 크롬 헤더 (L208~212)는 제거. 각 플랫폼별로 전혀 다른 구조로 대체

## Implementer 전달사항

### 구현 순서

1. **REQ 1: 프리뷰 중앙 정렬 (독립 작업)**
   - `primitives-step-page.tsx` L319 수정
   - `items-start justify-start` → `items-center justify-center`
   - 단순 클래스 변경, 다른 요구사항과 무관

2. **REQ 2~4: 플랫폼별 목업 구조 설계 (의존성: Designer 완료 후)**
   - `live-preview.tsx` 최상위 구조 리팩토링
   - 기존 단일 컨테이너 → `platformTarget` 기준 3개 분기 컴포넌트 설계
     - `WebMockup` (macOS 윈도우 크롬)
     - `TabletMockup` (iPad 베젤 + 노치)
     - `MobileMockup` (iPhone 베젤 + Dynamic Island + 홈 인디케이터)
   - 각 목업 컴포넌트는 children으로 기존 프리뷰 콘텐츠(앱 셸 + 페이지 레이아웃)를 감싸는 Wrapper 패턴

3. **개별 목업 구현**
   - REQ 2: `WebMockup` 컴포넌트 구현 → Designer 제공 traffic lights 디자인 적용
   - REQ 3: `TabletMockup` 컴포넌트 구현 → Designer 제공 베젤 + 노치 디자인 적용
   - REQ 4: `MobileMockup` 컴포넌트 구현 → Designer 제공 Dynamic Island + 홈 인디케이터 디자인 적용

### 주의사항

1. **다크모드 대응 (필수)**
   - Traffic lights는 고정 색상 사용 가능 (macOS 표준 컬러)
   - 베젤, 노치, 인디케이터는 반드시 `bg-foreground`, `bg-foreground/20`, `bg-foreground/30` 등 시맨틱 토큰 사용
   - 라이트모드: `foreground` = 어두운 회색 → 베젤이 검은색 계열로 표시
   - 다크모드: `foreground` = 밝은 회색 → 베젤이 흰색 계열로 표시 (실제 기기처럼)

2. **기존 크롬 헤더 제거**
   - `live-preview.tsx` L208~212의 현재 헤더 바는 완전히 제거
   - 디바이스 라벨(`getDeviceLabel`)은 각 목업 컴포넌트 내부로 이동
     - Web: 타이틀바 중앙에 표시
     - Tablet/Mobile: 목업 하단 외부에 작게 표시 (선택사항, 생략 가능)

3. **프리뷰 콘텐츠 높이 계산 수정**
   - 현재 L217: `style={{ height: previewHeight - 40 }}` (헤더 40px 제외)
   - 변경 후: 각 목업 컴포넌트 내부에서 목업 크롬 높이를 고려하여 콘텐츠 영역 높이 재계산
     - Web: `previewHeight - 40` (타이틀바 높이)
     - Tablet: `previewHeight - 32` (상하 베젤 16px × 2)
     - Mobile: `previewHeight - 16` (상하 베젤 8px × 2)

4. **레이아웃 독립성 보장**
   - REQ 1 (중앙 정렬)과 REQ 2~4 (목업)는 완전히 독립
   - REQ 1을 먼저 구현하고 스크린샷 촬영 가능
   - REQ 2~4는 Designer 산출물 확인 후 착수

5. **oklch 토큰 사용**
   - 색상 지정 시 하드코딩된 HEX/RGB 대신 CSS 변수 우선 사용
   - 예외: macOS traffic lights는 #FF5F57, #FEBC2E, #28C840 고정 사용 가능 (브랜드 컬러)

6. **반응형 고려 불필요**
   - 이 작업은 Step 2의 프리뷰 패널 내부만 수정
   - 프리뷰 자체가 고정 디바이스 크기(`DEVICE_OPTIONS`)로 렌더링되므로 미디어 쿼리 불필요

## 설계 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|----------|----------|-----------|----------|
| 1 | 프리뷰 중앙 정렬 구현 방법 | Flexbox `items-center justify-center` 변경 | (1) margin auto 사용 (2) absolute positioning + transform | Flexbox가 가장 단순하고 ResizablePanel 크기 변경 시 자동 대응. 기존 코드 구조와 일관성 유지 |
| 2 | 플랫폼별 목업 구조 설계 | `platformTarget` 기준 조건부 렌더링으로 3개 Mockup 컴포넌트 분기 | (1) 단일 컴포넌트 내부에서 조건부 스타일링 (2) CSS 클래스로 변형 적용 | 각 플랫폼의 구조가 완전히 다름 (Web: 타이틀바, Tablet: 베젤, Mobile: 베젤 + 2개 UI 요소). 컴포넌트 분리가 가독성/유지보수성 우수 |
| 3 | 기존 크롬 헤더 처리 | 완전 제거 후 각 목업 내부로 디바이스 라벨 이동 | (1) 헤더 유지하고 목업 추가 (2) 헤더를 목업 위에 오버레이 | 요구사항 명세(01-request.md L27~28)에서 "단순 border + rounded-xl + 헤더 바"를 "플랫폼별 목업"으로 대체 명시. 중복 UI 제거 필요 |
| 4 | 디바이스 라벨 위치 | Web은 타이틀바 중앙, Tablet/Mobile은 생략 또는 하단 외부 | (1) 모든 플랫폼에서 목업 상단에 라벨 표시 (2) 라벨 완전 제거 | Web은 타이틀바가 자연스럽게 라벨 공간 제공. Tablet/Mobile은 베젤에 텍스트 삽입 시 시각적 혼란. 디바이스 선택은 좌측 컨트롤에서 이미 확인 가능하므로 목업에서는 생략 가능 |
| 5 | macOS traffic lights 색상 | 고정 HEX 색상 (#FF5F57, #FEBC2E, #28C840) | (1) 시맨틱 토큰으로 테마 대응 (2) oklch로 변환 | macOS traffic lights는 브랜드 아이덴티티 컬러로 고정값 사용이 표준. 다크모드에서도 동일 색상 유지 (실제 macOS 윈도우 동작과 일치) |
| 6 | 목업 크기 제약 | 기존 `DEVICE_OPTIONS`의 width/height를 최대 크기로 사용, 목업 크롬은 내부 콘텐츠 영역 차지 | (1) 목업 크롬을 외곽에 추가하여 전체 크기 증가 (2) 콘텐츠 영역만 `DEVICE_OPTIONS` 크기 유지 | 기존 디바이스 크기 정의는 "디바이스 전체 크기"를 의미. 목업 크롬(베젤 등)은 디바이스의 일부이므로 전체 크기 내부에 포함되어야 자연스러움 |
| 7 | 다크모드 베젤 색상 | `bg-foreground` 시맨틱 토큰 | (1) 고정 회색 (2) `bg-border` | 실제 기기는 다크모드에서 밝은 베젤(예: 화이트 iPad), 라이트모드에서 어두운 베젤(블랙 iPhone)을 가짐. `foreground`는 라이트모드에서 어두움, 다크모드에서 밝음 → 실제 기기 동작과 일치 |
| 8 | 목업 디자인 스타일 | Flat (단색 + 최소 그림자) | (1) Skeuomorphic (사실적 렌더링) (2) Wireframe (회색 아웃라인만) | 요구사항 명세(01-request.md L133)에서 "실물일 필요없고 flat하게" 명시. 사용자는 플랫폼 구분만 필요하며, 과도한 사실성은 프리뷰 콘텐츠보다 목업이 더 눈에 띄는 부작용 발생 |
| 9 | REQ 1과 REQ 2~4 구현 순서 | REQ 1 먼저 구현 (독립 작업), REQ 2~4는 Designer 완료 후 착수 | (1) 모든 요구사항 동시 구현 (2) REQ 2~4 먼저 구현 | 요구사항 명세(01-request.md L86)에서 "모든 요구사항이 독립적으로 구현 가능"이지만, REQ 2~4는 새로운 UI 패턴(목업 디자인)이 필요하므로 Designer 산출물 대기 필요. REQ 1은 단순 CSS 변경으로 즉시 가능 |
| 10 | 스크린샷 촬영 수량 | 총 4장 (REQ당 1장) | (1) REQ 1과 REQ 2를 통합하여 3장 (2) 플랫폼별 다크모드 추가하여 7장 | 요구사항 명세(01-request.md L94~101)에서 "총 스크린샷: 4장" 명시. 각 요구사항의 완료 기준을 독립적으로 검증하기 위해 1:1 매핑 필요 |

