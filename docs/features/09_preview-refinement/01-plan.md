# 기획: 라이브 프리뷰 정제 (Preview Refinement)

## 목적

Primitives 단계의 LivePreview 컴포넌트에서 발견된 여러 UI/UX 문제를 해결하여 사용자가 설정한 디자인 토큰(Base 폰트, 스케일, 플랫폼 등)이 미리보기에 정확히 반영되도록 개선합니다. 주요 목표는:

1. 가로 스크롤 시 좌측 잘림 방지 (중앙 정렬 → 좌측 정렬)
2. Web 플랫폼 디바이스 사이즈를 실용적 범위로 정규화 (1920/1366/1280 → 1440/1280/1024)
3. Base 폰트 크기가 실제로 미리보기에 반영되도록 text-base 사용 확대
4. 미사용 타이포그래피 스케일(lg, 5xl) 활용 및 6xl 제거
5. shadcn 디자인 시스템 기반으로 카드/탭/Progress 컴포넌트 여백/높이 정규화
6. 플랫폼별(Web/Tablet/Mobile) 레이아웃 밀도 일관성 강화

---

## 요구사항 → 파일 매핑

| REQ | 수정 파일 | 핵심 변경 |
|-----|-----------|-----------|
| REQ-1: 스크롤 좌측 잘림 | `primitives-step-page.tsx` (L319) | 프리뷰 컨테이너 `justify-center` → `justify-start` |
| REQ-2: Web 사이즈 정규화 | `constants.ts` (L953-957) | `DEVICE_OPTIONS.web` 배열 변경: 1920/1366/1280 → 1440/1280/1024 |
| REQ-2: 기본 디바이스 변경 | `useWizardStore/index.ts` (L45) | `DEFAULT_STATE.selectedDevice`: "Desktop 1920" → "Desktop 1440" |
| REQ-3: Base 폰트 반영 | `live-preview.tsx` (L292, 372, 612, 521, 659 등) | 네비게이션/카드 본문/페이지 설명 `text-sm` → `text-base` (15개 항목) |
| REQ-4: lg/5xl 활용 | `live-preview.tsx` (L658, 487) | PageHeader `text-xl` → `text-lg`, LandingShell 히어로 `text-4xl` → `text-5xl` (반응형 조건 포함) |
| REQ-4: 6xl 제거 | `scale-configurator.tsx` (L52) | `TW_SIZES` 객체에서 `"6xl": 3.75` 제거, `FIXED_LABELS` 배열에서 "6xl" 제거 |
| REQ-5: 카드 여백 정규화 | `live-preview.tsx` (L735 등) | CardContent `px-6 py-4` → `px-4 py-3` (플랫폼별 조건부 적용) |
| REQ-6: 탭 높이 조정 | `shadcn/tabs.tsx` (L29) | `tabsListVariants` h-9 유지 확인, TabsTrigger `py-1.5` → `py-1` 검토 (Designer 조사 필요) |
| REQ-7: Progress 높이 증가 | `live-preview.tsx` (L744) | `Progress` className `h-1.5` → `h-2` |
| REQ-8: 플랫폼 밀도 일관성 | `live-preview.tsx` (L400, 508 등) | Tablet/Mobile 패딩 조정: `p-6` → Tablet `p-4`, Mobile `p-3` |

---

## 상태 관리 변경

### store 필드 추가/변경
- **`selectedDevice` 기본값 변경**: "Desktop 1920" → "Desktop 1440"
  - 파일: `app/shared/stores/useWizardStore/index.ts` (L45)
  - 이유: Web 디바이스 사이즈 정규화에 따라 기본 선택 항목도 변경 필요

### 버전 마이그레이션
- **불필요**
- 이유: `selectedDevice`는 사용자가 UI에서 즉시 변경 가능한 값이며, 기존 사용자가 "Desktop 1920"을 선택한 상태라면 자동으로 목록에서 제거되어 fallback됨 (드롭다운 선택 시 첫 번째 항목인 "Desktop 1440"으로 자동 전환)
- 현재 store 버전 4 유지

### 영향받는 generators
- **영향 없음**
  - `config-generator.ts`: 디바이스 사이즈는 프리뷰 전용 상태로 생성된 프롬프트에 포함되지 않음
  - `css-generator.ts`: 타이포그래피 스케일 정의는 변경 없음 (Base size, Scale ratio만 사용)
  - `layout-generator.ts`: 앱 셸 구조는 변경 없음
  - `component-generator.ts`: 컴포넌트 선택 로직은 변경 없음

---

## 파일 구조

```
app/features/wizard/
  pages/
    primitives-step-page.tsx        # REQ-1: 프리뷰 컨테이너 정렬 변경
  components/
    live-preview.tsx                # REQ-3,4,5,7,8: 타이포/여백/Progress/플랫폼 밀도
    scale-configurator.tsx          # REQ-4: 6xl 제거
  constants.ts                      # REQ-2: Web 디바이스 사이즈 정규화

app/shared/stores/useWizardStore/
  index.ts                          # REQ-2: selectedDevice 기본값 변경

app/shared/components/shadcn/
  card.tsx                          # REQ-5: shadcn 기본 여백 조사 (Designer)
  tabs.tsx                          # REQ-6: shadcn 기본 높이 조사 (Designer)
  progress.tsx                      # REQ-7: 기본 높이 h-2 확인 (이미 h-2)
```

### 수정 우선순위
1. **Tier A (단순 변경)**: REQ-1, REQ-2, REQ-7 — 한 줄 변경 수준
2. **Tier B (반복 작업)**: REQ-3, REQ-4, REQ-5, REQ-8 — live-preview.tsx 다수 위치 수정
3. **Tier C (Designer 조사 필요)**: REQ-6 — shadcn 공식 문서/예제 비교 후 결정

---

## 완료 기준

1. **REQ-1**: Web Desktop 1920 선택 시 스크롤 최좌측에서 sidebar 로고/메뉴가 스크린샷에 완전히 보임
2. **REQ-2**: 디바이스 선택 콤보박스에 "Desktop 1440", "Laptop 1280", "Compact 1024" 표시, 크롬 헤더에 "Desktop 1440 — 1440×900" 표시
3. **REQ-3**: Base 크기를 14px → 18px 변경 시 네비게이션 메뉴, 폼 레이블, 카드 설명 텍스트가 스크린샷에서 명확히 커짐 (4px 차이 인식 가능)
4. **REQ-4**: Scale Ratio 0.8 → 1.5 변경 시 랜딩 히어로(text-5xl)와 페이지 헤더(text-lg) 크기 차이가 스크린샷에서 확연함
5. **REQ-5**: 카드 내 여백이 줄어들어 콘텐츠가 더 많이 보임 (카드 테두리와 텍스트 간격이 육안으로 구분 가능)
6. **REQ-6**: TabPageContent에서 탭 높이가 스크린샷에서 감소 (Designer 조사 후 수정 여부 결정)
7. **REQ-7**: FormSection 프로그레스 바가 스크린샷에서 명확히 보임 (h-1.5 → h-2, 2px 두께 증가)
8. **REQ-8**: Web/Tablet/Mobile 스크린샷을 나란히 놓았을 때 패딩/간격 밀도 차이가 명확히 구분됨

---

## 테스트 시나리오

| REQ | 위저드 단계 | 동작 | 기대 결과 |
|-----|-------------|------|-----------|
| REQ-1 | Primitives | Web 플랫폼 → Desktop 1920 선택 → 프리뷰 패널 가로 스크롤 최좌측으로 이동 | 스크린샷에 sidebar 왼쪽 끝, 로고, 첫 번째 메뉴 항목이 완전히 보임 (잘림 없음) |
| REQ-1 | Primitives | 위 상태에서 스크롤을 최우측으로 이동 | 프리뷰 오른쪽 끝까지 정상 노출 (기존과 동일) |
| REQ-2 | Primitives | Web 플랫폼 선택 → 디바이스 콤보박스 클릭 | 목록에 "Desktop 1440 (1440x900)", "Laptop 1280 (1280x800)", "Compact 1024 (1024x768)" 표시 |
| REQ-2 | Primitives | Desktop 1440 선택 | 크롬 헤더에 "Desktop 1440 — 1440×900" 표시, 프리뷰 너비 1440px |
| REQ-3 | Primitives | Base 크기 슬라이더를 14px → 18px로 변경 | 네비게이션 메뉴 텍스트, 카드 본문, 페이지 설명이 스크린샷에서 확연히 커짐 (text-base 사용 항목들) |
| REQ-4 | Primitives | Scale Ratio 슬라이더를 0.8 → 1.5로 변경 | 랜딩 페이지 히어로 타이틀(text-5xl)이 스크린샷에서 매우 커지고, 페이지 헤더(text-lg)가 섹션 타이틀(text-base)보다 한 단계 큼 |
| REQ-4 | Primitives | 타이포그래피 섹션 스케일 미리보기 확인 | 6xl 항목 없음, 5xl까지만 표시 |
| REQ-5 | Primitives | Mobile 플랫폼 선택 → 카드 3개 세로 나열 확인 | 카드 내 여백이 줄어들어 콘텐츠가 더 많이 보임 (px-6 → px-3, py-4 → py-2 효과) |
| REQ-6 | Primitives | Tab Page 레이아웃 선택 → TabsList 높이 측정 | 탭 높이가 Designer 조사 결과에 따라 조정됨 (수정 전/후 비교 스크린샷) |
| REQ-7 | Primitives | FormSection 포함 레이아웃 선택 → Progress 바 확인 | 프로그레스 바가 명확히 보임 (h-1.5 → h-2, 68% 진행률 구분 가능) |
| REQ-8 | Primitives | Web → Tablet → Mobile 순서로 플랫폼 전환 | Web (p-6), Tablet (p-4), Mobile (p-3) 패딩 차이가 스크린샷에서 명확히 구분됨 |

### 스크린샷 촬영 계획 (총 18장)

#### REQ-1 (2장)
1. `01-req1-scroll-left.png`: Web Desktop 1920, 스크롤 최좌측, sidebar 왼쪽 끝 완전 노출
2. `02-req1-scroll-right.png`: 위 상태에서 스크롤 최우측

#### REQ-2 (3장)
3. `03-req2-desktop-1440.png`: Desktop 1440 선택, 크롬 헤더 "Desktop 1440 — 1440×900"
4. `04-req2-laptop-1280.png`: Laptop 1280 선택
5. `05-req2-compact-1024.png`: Compact 1024 선택

#### REQ-3 (2장)
6. `06-req3-base-14px.png`: Base 크기 14px, 네비게이션/카드 텍스트 작음
7. `07-req3-base-18px.png`: Base 크기 18px, 명확히 커진 텍스트

#### REQ-4 (2장)
8. `08-req4-ratio-08.png`: Scale Ratio 0.8, 랜딩 히어로/페이지 헤더 작음
9. `09-req4-ratio-15.png`: Scale Ratio 1.5, 랜딩 히어로(5xl)/페이지 헤더(lg) 크기 차이 확연

#### REQ-5 (2장)
10. `10-req5-card-before.png`: Mobile 플랫폼, 수정 전 카드 여백 (px-6 py-4)
11. `11-req5-card-after.png`: 수정 후 카드 여백 (px-3 py-2)

#### REQ-6 (2장)
12. `12-req6-tab-before.png`: Tab Page, 수정 전 탭 높이
13. `13-req6-tab-after.png`: 수정 후 탭 높이 (Designer 조사 후)

#### REQ-7 (2장)
14. `14-req7-progress-before.png`: FormSection, Progress h-1.5 (거의 안 보임)
15. `15-req7-progress-after.png`: Progress h-2 (명확히 보임)

#### REQ-8 (3장)
16. `16-req8-web-density.png`: Web 플랫폼, p-6 패딩
17. `17-req8-tablet-density.png`: Tablet 플랫폼, p-4 패딩
18. `18-req8-mobile-density.png`: Mobile 플랫폼, p-3 패딩

---

## Designer 전달사항

### 새로운 UI 패턴 필요 여부
**없음** — 기존 컴포넌트 스타일 보정만 필요

### Designer 작업 범위
1. **shadcn 디자인 시스템 조사** (필수)
   - 파일 조사: `app/shared/components/shadcn/card.tsx`, `tabs.tsx`, `progress.tsx`
   - 공식 문서: https://ui.shadcn.com/docs/components/card (Card, Tabs, Progress 각 페이지)
   - 비교 항목:
     - **Card**: `CardHeader`, `CardContent`, `CardFooter` 기본 패딩 (`px-*`, `py-*`)
     - **Tabs**: `TabsList` 기본 높이 (`h-*`), `TabsTrigger` 세로 패딩 (`py-*`)
     - **Progress**: 기본 높이 (`h-*`, 현재 h-2로 이미 정의됨)

2. **live-preview.tsx 스타일 보정 기준 제시**
   - 현재 구현:
     - Card: `px-6 py-4` (live-preview.tsx L735 등)
     - Tabs: `h-9` (shadcn/tabs.tsx L29), `py-1` (L67)
     - Progress: `h-1.5` (live-preview.tsx L744)
   - 제공 정보:
     - shadcn 기본값과 live-preview 현재값 비교표
     - 플랫폼별(Web/Tablet/Mobile) 권장 여백 (예: Web px-6 → px-4, Mobile px-6 → px-3)
     - 수정이 필요한 라인 번호 목록

3. **의사결정 로그 작성**
   - shadcn 기본 스타일을 채택한 근거
   - 플랫폼별 조정이 필요한 이유 (예: Mobile에서 px-6은 과다 여백)
   - 변경하지 않기로 결정한 항목 (예: TabsList h-9 유지)

### Designer 산출물 (02-design.md)
```markdown
# shadcn 스타일 보정 기준

## 조사 결과
| 컴포넌트 | shadcn 기본값 | live-preview 현재값 | 권장 변경 |
|---------|--------------|---------------------|----------|
| CardContent | px-6 | px-6 py-4 | px-4 (Web/Tablet), px-3 (Mobile) |
| TabsList | h-10 | h-9 | h-9 유지 (이미 최적화) |
| Progress | h-2 | h-1.5 | h-2 (shadcn 기본값 복원) |

## 수정 파일 및 라인
- live-preview.tsx:
  - L735: `px-6 py-4` → 플랫폼별 조건부 적용
  - L744: `h-1.5` → `h-2`
  - L814: CardHeader `pb-3` 유지 확인
  - (전체 15개 위치 목록 제공)

## 의사결정 로그
...
```

---

## Implementer 전달사항

### 구현 순서
1. **Phase 1 — 단순 변경 (REQ-1, REQ-2, REQ-7)**
   - `primitives-step-page.tsx` L319: `justify-center` → `justify-start`
   - `constants.ts` L953-957: DEVICE_OPTIONS.web 배열 변경
   - `useWizardStore/index.ts` L45: selectedDevice 기본값 변경
   - `live-preview.tsx` L744: Progress `h-1.5` → `h-2`
   - 테스트: npm run dev → Primitives 단계 → 스크롤/디바이스/Progress 확인

2. **Phase 2 — 타이포그래피 (REQ-3, REQ-4)**
   - `scale-configurator.tsx` L52: TW_SIZES에서 "6xl": 3.75 제거, FIXED_LABELS에서 "6xl" 제거
   - `live-preview.tsx` 타이포 클래스 변경:
     - text-sm → text-base 변경 위치 (15개): L292, 372, 612, 521, 659, 741 등
     - text-xl → text-lg 변경: L658 (PageHeader)
     - text-4xl → text-5xl 변경: L487 (LandingShell 히어로, 반응형 조건 포함)
   - 테스트: Base 크기 14/18px, Scale Ratio 0.8/1.5 변경 후 육안 확인

3. **Phase 3 — Designer 산출물 기반 여백/높이 조정 (REQ-5, REQ-6, REQ-8)**
   - Designer가 제공한 02-design.md의 "수정 파일 및 라인" 목록 참조
   - `live-preview.tsx` 카드 여백 조정 (플랫폼별 조건부 적용)
   - `live-preview.tsx` 패딩 조정 (Tablet p-4, Mobile p-3)
   - `shadcn/tabs.tsx` 필요시 수정 (Designer 권장 사항 있을 경우만)
   - 테스트: Web/Tablet/Mobile 전환하며 밀도 비교

4. **Phase 4 — 통합 테스트 및 스크린샷 촬영**
   - 18개 스크린샷 촬영 (위 "스크린샷 촬영 계획" 참조)
   - Playwright 테스트 작성 (선택 사항, orchestrator 판단)
   - npm run build 성공 확인

### 주의사항
1. **다크모드 호환성**
   - 모든 변경 사항은 `usePreviewUI().previewDark` 토글 시에도 정상 작동해야 함
   - 특히 Progress 바 색상(`bg-primary`)이 다크모드에서 명확히 보이는지 확인

2. **oklch 색공간 유지**
   - 컬러 관련 변경 없음 (이번 작업 범위 아님)
   - 기존 `usePreviewTokens` 훅 로직 변경 금지

3. **Store 마이그레이션 불필요**
   - `selectedDevice` 기본값 변경만으로 충분
   - 버전 4 유지, migrate 함수 수정 불필요

4. **반응형 조건부 로직 주의**
   - `isMobile`, `isTablet` 변수 활용하여 플랫폼별 스타일 적용
   - 기존 반응형 로직 파괴하지 않도록 주의 (예: 그리드 컬럼, 버튼 크기)

5. **타이포 클래스 일괄 변경 주의**
   - text-sm → text-base 변경 시 모든 text-sm을 변경하는 것이 아님
   - 네비게이션, 카드 본문, 페이지 설명만 선택적 변경
   - 보조 텍스트(카드 헤더 타이틀, 브레드크럼, 시간 정보)는 text-sm 유지
   - 캡션, 배지, 테이블 헤더는 text-xs 유지

6. **Tailwind v4 클래스 사용**
   - `cn()` 유틸리티 필수 사용
   - 조건부 클래스는 템플릿 리터럴 내에서 삼항 연산자 활용

7. **코드 스타일 일관성**
   - 기존 코드 포맷 유지 (2-space indent, 세미콜론 사용)
   - 주석은 한국어로 작성 (예: `// 네비게이션 메뉴 — base 사이즈로 변경`)

---

## 설계 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|-----------|-----------|-------------|-----------|
| 1 | 스크롤 좌측 잘림 해결 방법 | `justify-center` → `justify-start` | 1) `overflow-x: scroll` 스크롤 초기 위치 JS 제어 2) 프리뷰를 컨테이너 중앙에 배치하되 스크롤 위치만 조정 | justify-start가 가장 단순하고 CSS만으로 해결 가능. 스크롤 초기 위치를 최좌측으로 자연스럽게 보장 |
| 2 | Web 디바이스 사이즈 선택 기준 | 1440/1280/1024 | 1) 1920/1536/1280 (고해상도 중심) 2) 1600/1280/1024 (중간 범위) | 1440px는 MacBook Pro 기본 해상도이며, 1280/1024는 실무에서 가장 많이 사용되는 브레이크포인트. 60% 프리뷰 패널(≈960px)에서 1280px 선택 시 스크롤이 발생하지만 확인 가능한 적정 범위 |
| 3 | selectedDevice 기본값 변경 시 마이그레이션 여부 | 마이그레이션 불필요 | 1) 버전 5로 올리고 마이그레이션 함수 수정 2) 기존 값 유지 | "Desktop 1920"이 목록에서 제거되면 사용자가 드롭다운 선택 시 자동으로 "Desktop 1440"으로 변경됨. 강제 마이그레이션 불필요 (사용자 액션으로 자연스럽게 전환) |
| 4 | text-base 적용 범위 | 네비게이션, 카드 본문, 페이지 설명, 폼 레이블 (15개 항목) | 1) 모든 text-sm을 text-base로 변경 2) 네비게이션만 변경 | 타이포그래피 위계 유지가 중요. 보조 텍스트(카드 헤더, 메타데이터)는 text-sm, 캡션/배지는 text-xs 유지하여 시각적 구분 명확히 함 |
| 5 | lg/5xl 활용 방법 | PageHeader(lg), LandingShell 히어로(5xl) | 1) 모든 섹션 타이틀을 lg로 2) 랜딩 히어로만 5xl 추가 | lg는 페이지 레벨 헤더(H1 급)에만 사용하고, 5xl은 히어로 타이틀에만 사용하여 스케일 계층 명확화. 과도한 큰 폰트 사용 방지 |
| 6 | 6xl 제거 방법 | scale-configurator.tsx에서만 제거 | 1) live-preview.tsx TW_SIZES에서도 제거 2) constants.ts에 별도 정의 추가 후 제거 | live-preview.tsx의 TW_SIZES는 이미 5xl까지만 정의됨 (L36-39). scale-configurator.tsx만 6xl을 정의하고 있으므로 해당 파일만 수정 |
| 7 | 카드 여백 플랫폼별 조정 기준 | Web/Tablet: px-4 py-3, Mobile: px-3 py-2 | 1) 모든 플랫폼 동일 여백 2) shadcn 기본값(px-6) 유지 | Mobile에서 px-6은 화면 대비 과다 여백 (375px 화면에서 좌우 48px 손실). Tablet은 중간 값, Web은 shadcn 기본에 가깝게 조정 |
| 8 | Progress 높이 변경 방법 | live-preview.tsx에서 className 오버라이드 | 1) shadcn/progress.tsx 기본값 변경 2) CSS 변수로 전역 조정 | shadcn/progress.tsx는 이미 h-2를 기본값으로 정의. live-preview.tsx에서만 h-1.5로 오버라이드하고 있었으므로 해당 오버라이드 제거가 정답 |
| 9 | 플랫폼 밀도 조정 범위 | 패딩(p-*), 카드 여백만 조정 | 1) 폰트 크기도 조건부 조정 2) 그리드 간격(gap-*)도 조정 | 기존 코드에 폰트 크기 조건부 로직(`isTablet ? "text-xs" : "text-sm"`)이 있지만, REQ-3에서 text-base로 변경하므로 조건부 제거. 그리드 간격은 플랫폼 무관하게 일관성 유지 |
| 10 | Designer 에이전트 필요 여부 | 필수 (REQ-6 탭 높이 조사) | 1) Implementer가 직접 shadcn 문서 확인 2) 현재 값 유지 | 원문에 "디자인 에이전트가 shadcn 디자인 시스템을 조사" 명시. Designer가 공식 문서와 기존 구현을 비교하여 보정 기준 제시 필요 |
| 11 | 탭 높이 조정 여부 (REQ-6) | Designer 조사 후 결정 | 1) h-9 → h-8로 변경 2) 현재 h-9 유지 | shadcn/tabs.tsx는 이미 h-9로 정의되어 있고, TabsTrigger는 py-1 사용 중. Designer가 shadcn 공식 예제와 비교하여 과도한 높이인지 판단 필요 |
| 12 | 스크린샷 촬영 시점 | Implementer 완료 후 | 1) Designer 완료 후 중간 촬영 2) 각 REQ 완료마다 촬영 | Phase 1-3 모두 완료 후 한 번에 촬영하는 것이 효율적 (총 18장). 단, REQ-5/6/7은 수정 전/후 비교 스크린샷이므로 Implementer가 수정 전 상태를 먼저 촬영 필요 |
| 13 | DEVICE_OPTIONS 변경 시 height 값 | 1440×900, 1280×800, 1024×768 | 1) 16:9 비율 유지 (1440×810, 1280×720, 1024×576) 2) 실제 디바이스 비율 (1440×900, 1280×800 등) | 1440×900은 MacBook Pro 기본 해상도 비율(16:10), 1280×800은 13인치 노트북 표준. 16:9보다 실제 디바이스 비율이 사용자 익숙도 높음 |
| 14 | Zustand store 버전 정책 | 버전 4 유지, migrate 함수 변경 없음 | 1) 버전 5로 상향 2) selectedDevice를 제외한 다른 필드 추가 | 이번 작업은 UI 표시 로직만 변경. store 스키마 변경 없으므로 버전 유지. selectedDevice 기본값 변경은 새 사용자에게만 영향 |
| 15 | 반응형 타이포 조건 제거 여부 | 제거 (text-base로 통일) | 1) isTablet일 때 text-sm, 아니면 text-base 유지 | REQ-3 목적이 Base 폰트를 실제 반영하는 것이므로, 플랫폼 무관하게 text-base 사용. 사용자가 설정한 baseSize가 모든 플랫폼에 동일하게 적용되어야 일관성 확보 |

---

## 참고 자료

### 현재 구현 상태
- **프리뷰 컨테이너**: `primitives-step-page.tsx` L319
  ```tsx
  <div className="flex min-h-0 flex-1 items-start justify-center overflow-auto p-4">
  ```
- **DEVICE_OPTIONS**: `constants.ts` L952-970
  ```typescript
  export const DEVICE_OPTIONS: Record<string, DeviceOption[]> = {
    web: [
      { name: "Desktop 1920", width: 1920, height: 1080 },
      { name: "Laptop 1366", width: 1366, height: 768 },
      { name: "Desktop 1280", width: 1280, height: 720 },
    ],
    // ...
  }
  ```
- **타이포그래피 사용 현황** (live-preview.tsx):
  - text-sm: 20회 이상 (네비게이션, 카드 타이틀, 레이블 등)
  - text-base: 0회
  - text-lg: 0회
  - text-5xl: 0회 (조건부 최대값은 text-4xl)

### shadcn 컴포넌트 기본값
- **Card** (`shadcn/card.tsx`):
  - CardHeader: `px-6` (L23)
  - CardContent: `px-6` (L68)
  - CardFooter: `px-6` (L78)
- **Tabs** (`shadcn/tabs.tsx`):
  - TabsList: `h-9` (L29, horizontal 기준)
  - TabsTrigger: `py-1` (L67)
- **Progress** (`shadcn/progress.tsx`):
  - 기본 높이: `h-2` (L15)

### 문서 링크
- shadcn Card: https://ui.shadcn.com/docs/components/card
- shadcn Tabs: https://ui.shadcn.com/docs/components/tabs
- shadcn Progress: https://ui.shadcn.com/docs/components/progress
- Tailwind CSS v4 Typography: https://tailwindcss.com/docs/font-size

---

## 변경 영향 분석

### 사용자 경험 개선
1. **즉각적 피드백**: Base 폰트 크기 변경 시 미리보기에서 실시간 반영 → 사용자가 설정 효과를 바로 확인 가능
2. **실용적 디바이스 사이즈**: 1440/1280/1024는 실무에서 가장 많이 사용하는 해상도 → 실제 프로젝트 적용 시 예측 가능성 향상
3. **명확한 시각적 계층**: text-base(주요), text-sm(보조), text-xs(캡션) 구분 → 정보 우선순위 명확

### 코드 유지보수성
1. **shadcn 일관성**: 공식 디자인 시스템 기본값과 일치 → 향후 shadcn 업데이트 시 충돌 최소화
2. **플랫폼별 조건부 로직 명확화**: 패딩/여백은 플랫폼별 조정, 폰트는 플랫폼 무관 → 반응형 로직 이해 용이
3. **미사용 스케일 제거**: 6xl 제거 → 코드 복잡도 감소, 사용자 혼란 방지

### 성능 영향
- **없음**: 모든 변경 사항은 CSS 클래스 변경만으로 구현. 렌더링 성능 영향 없음
- **번들 크기**: 변화 없음 (코드 추가 없이 기존 클래스명만 변경)

### 하위 호환성
- **Breaking Change 없음**:
  - `selectedDevice` 기본값 변경은 새 사용자에게만 영향
  - 기존 사용자는 localStorage에 저장된 값 유지 → 드롭다운 선택 시 fallback
  - store 버전 4 유지 → 마이그레이션 트리거 없음

---

## 후속 작업 제안 (선택 사항)

1. **타이포그래피 프리셋 추가** (향후 기능)
   - "Compact" (base 14px, ratio 1.1) / "Standard" (base 16px, ratio 1.0) / "Comfortable" (base 18px, ratio 0.9)
   - 사용자가 프리셋 선택 → Base/Ratio 자동 설정

2. **플랫폼별 미리보기 동시 보기** (향후 기능)
   - 3-panel 레이아웃: Web | Tablet | Mobile 동시 미리보기
   - 반응형 레이아웃 비교 용이

3. **스케일 미리보기 인터랙티브 강화** (향후 기능)
   - 각 스케일 항목 클릭 → 해당 스케일을 사용하는 실제 UI 요소 하이라이트
   - 예: "text-lg" 클릭 → PageHeader 깜빡임

---

## 체크리스트 (Implementer용)

- [ ] REQ-1: `primitives-step-page.tsx` justify-start 변경
- [ ] REQ-2: `constants.ts` DEVICE_OPTIONS.web 변경
- [ ] REQ-2: `useWizardStore/index.ts` selectedDevice 기본값 변경
- [ ] REQ-3: `live-preview.tsx` text-sm → text-base (15개 항목)
- [ ] REQ-4: `live-preview.tsx` text-xl → text-lg (1개)
- [ ] REQ-4: `live-preview.tsx` text-4xl → text-5xl (반응형 조건)
- [ ] REQ-4: `scale-configurator.tsx` 6xl 제거
- [ ] REQ-5: `live-preview.tsx` 카드 여백 조정 (플랫폼별)
- [ ] REQ-6: `shadcn/tabs.tsx` 탭 높이 조정 (Designer 지시 있을 경우)
- [ ] REQ-7: `live-preview.tsx` Progress h-2 변경
- [ ] REQ-8: `live-preview.tsx` 플랫폼별 패딩 조정
- [ ] npm run dev 테스트 성공
- [ ] npm run build 테스트 성공
- [ ] 다크모드 토글 테스트 (previewDark)
- [ ] 스크린샷 18장 촬영 완료
- [ ] 03-result.md 작성 (수정 이력 + 의사결정 로그)

---

**기획 완료일**: 2026-02-11
**다음 단계**: Designer 에이전트 호출 → validator(Tier 1) 검증
