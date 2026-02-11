# 기획: Primitives 페이지 레이아웃 개편

## 목적

Primitives 단계의 사용자 경험 개선 및 UI 일관성 확보. 현재 고정 너비 레이아웃을 리사이즈 가능한 구조로 전환하고, 네비게이션 공간 최적화, 미리보기 정확도 향상, 스크롤 버그 제거, 헤더 디자인 고도화를 통해 전문적이고 유연한 워크플로우를 제공.

## 요구사항 → 파일 매핑

| REQ | 수정 파일 | 핵심 변경 |
|-----|-----------|-----------|
| REQ1: LivePreview resize 클래스 제거 | `app/features/wizard/components/live-preview.tsx` | L297 `PreviewFrame` 컴포넌트의 `className`에서 `resize` 제거. ResizeObserver 로직은 유지 (REQ2의 Resizable 패널 크기 변경 감지용) |
| REQ2: shadcn Resizable 구현 | `app/features/wizard/pages/primitives-step-page.tsx` | L187-285 레이아웃을 `ResizablePanelGroup` 구조로 변경. FormSection 35% (25-50% 범위), LivePreview 65%. shadcn resizable 컴포넌트 설치 필요 |
| REQ3: 아이콘 툴바 변경 | `app/features/wizard/pages/primitives-step-page.tsx` | L158-185 앵커 사이드바 너비 `w-[160px]` → `w-14` (56px). 아이콘만 표시, Tooltip(side="right") 추가. 리셋 버튼 primary 컬러 강조 |
| REQ4: 기기 드롭다운 일치 | `app/features/wizard/components/live-preview.tsx` | L168-185 `getPreviewSize()` 로직 수정. `device.width/height` 실제 비율 반영. 웹/태블릿은 높이 600px 고정 + aspectRatio 계산, 모바일은 실제 크기 사용 (최대 700px) |
| REQ5: 최상위 스크롤 제거 | `app/features/wizard/pages/primitives-step-page.tsx` | L156 최상위 컨테이너 높이 계산 검증. ResizablePanel에 `className="h-full"` 명시. Playwright 테스트 작성 (`tests/primitives-no-scroll.spec.ts`) |
| REQ6: 헤더 디자인 고도화 | `app/features/wizard/components/wizard-shell.tsx` | L29-43 헤더 구조를 3컬럼 그리드로 변경 (`grid grid-cols-[1fr_auto_1fr]`). 중앙에 현재 스텝 제목 추가, 높이 `h-14` 고정, blur/shadow 강화 |

## 상태 관리 변경

**변경 없음.** 모든 요구사항은 UI 레이아웃 및 스타일링 변경에 한정. Zustand store 필드 추가/변경 불필요.

- store 필드 추가/변경: 없음
- 버전 마이그레이션: 불필요
- 영향받는 generators: 없음 (프롬프트 생성 로직은 store 데이터만 읽음, 레이아웃 변경과 무관)

## 파일 구조

```
app/features/wizard/
├── pages/
│   └── primitives-step-page.tsx           # REQ2, REQ3, REQ5 수정
├── components/
│   ├── wizard-shell.tsx                   # REQ6 수정
│   └── live-preview.tsx                   # REQ1, REQ4 수정
└── constants.ts                           # 변경 없음 (DEVICE_OPTIONS 참조만)

app/shared/components/shadcn/
├── resizable.tsx                          # 신규 설치 (REQ2)
├── tooltip.tsx                            # 기설치 확인 (REQ3)
└── separator.tsx                          # 기설치 확인 (REQ3)

tests/
└── primitives-no-scroll.spec.ts           # 신규 작성 (REQ5)

playwright.config.ts                        # 존재 확인됨 (git status)
```

## 완료 기준

| 번호 | 기준 | 검증 방법 |
|------|------|-----------|
| 1 | LivePreview 컨테이너에 `resize` 클래스 미포함 | 브라우저 개발자 도구로 className 검사, 우하단 리사이즈 핸들 미표시 |
| 2 | FormSection/LivePreview 경계선 드래그 가능, 비율 조정 정상 작동 | ResizableHandle 드래그 → 양쪽 콘텐츠 리플로우 확인, 스크린샷 2장 (드래그 중, 드래그 후) |
| 3 | 앵커 사이드바 너비 56px, 아이콘만 표시, 호버 시 우측 툴팁 등장 | 각 버튼 호버 → 툴팁 확인, 리셋 버튼 primary 컬러 스타일 차별화, 스크린샷 2장 (리셋 버튼, 일반 버튼) |
| 4 | 기기 드롭다운 변경 시 미리보기 크기 일치 | "Desktop 1920" 선택 → 너비 1067px (600*16/9), "iPad Pro 12.9" 선택 → 너비 450px (600*1024/1366), 개발자 도구로 PreviewFrame 크기 확인 |
| 5 | Primitives 페이지 최상위 스크롤 없음 | Playwright 테스트 `scrollHeight === clientHeight` 통과, 브라우저에서 수직 스크롤바 미표시 |
| 6 | 헤더 높이 56px 고정, 3컬럼 그리드, 중앙에 현재 스텝 제목 표시 | 개발자 도구로 grid 레이아웃 확인, blur/shadow 효과 육안 검증, 스크린샷 1장 |

## 테스트 시나리오

| REQ | 위저드 단계 | 동작 | 기대 결과 |
|-----|------------|------|-----------|
| 1 | Primitives | 페이지 로드 후 LivePreview 컨테이너 검사 | `resize` 클래스 미포함, 리사이즈 핸들 미표시 |
| 2 | Primitives | FormSection/LivePreview 경계선 드래그 (좌우) | ResizableHandle이 부드럽게 이동, 양쪽 패널 크기 비율 변경, 콘텐츠 정상 렌더링 |
| 3 | Primitives | 앵커 사이드바 각 버튼 호버 | 우측에 툴팁 등장 (예: "폰트", "컬러"), 리셋 버튼은 primary 컬러 강조 |
| 4 | Primitives | 타겟 플랫폼 Web 선택 → 기기 드롭다운 "Desktop 1920" 선택 → "Laptop 1366"로 변경 | 미리보기 목업 너비가 1067px → 912px로 변경 (높이 600px 고정, aspectRatio 반영) |
| 4 | Primitives | 타겟 플랫폼 Tablet 선택 → "iPad Pro 12.9" 선택 | 미리보기 목업 너비 450px (600*1024/1366), 태블릿 목업 크롬 표시 |
| 4 | Primitives | 타겟 플랫폼 Mobile 선택 → "iPhone 16 Pro Max" 선택 | 미리보기 목업 너비 430px, 높이 700px (device.height 932 제한), 모바일 목업 크롬 (노치, 홈 인디케이터) 표시 |
| 5 | Primitives | 페이지 로드 후 최상위 컨테이너 scrollHeight/clientHeight 비교 | Playwright 테스트 통과 (두 값 동일), 브라우저에서 수직 스크롤바 미표시 |
| 5 | Primitives | FormSection 스크롤 (폰트 → 스타일 섹션 이동) | FormSection 내부만 스크롤, 최상위 컨테이너는 고정 |
| 6 | 모든 단계 | 위저드 헤더 검사 (Layout/Primitives/Components/Output) | 각 단계에서 중앙 제목 변경 ("레이아웃", "디자인 프리미티브", "컴포넌트", "생성"), 3컬럼 그리드 유지 |
| 6 | 모든 단계 | 브라우저 창 리사이즈 (1024px → 768px) | 헤더 높이 56px 유지, 반응형 스타일 적용 (sm 이하에서 StepIndicator 라벨 숨김) |

## Designer 전달사항

### 새로운 UI 패턴 필요 여부: 있음

**REQ3: 아이콘 툴바**
- 현재: 텍스트 라벨이 있는 와이드 버튼 (w-[160px])
- 변경 후: 아이콘만 표시하는 컴팩트 툴바 (w-14, 56px)
- 디자인 요구사항:
  - 일반 섹션 버튼: 아이콘 중앙 정렬, `text-muted-foreground` 기본, 호버 시 `bg-background/50`
  - 리셋 버튼: `border-primary/30 bg-primary/5 text-primary` 기본, 호버 시 `bg-primary/10`
  - 툴팁: 우측으로 등장 (`side="right"`), shadcn/ui Tooltip 컴포넌트 사용
  - 리셋 버튼과 섹션 버튼 사이 Separator 추가
- 참고: 기존 컴포넌트에 없는 새로운 레이아웃 패턴. Designer가 스타일 세부 조정 필요 (간격, 패딩, 활성 상태 표시 등)

**REQ6: 헤더 디자인 고도화**
- 현재: `justify-between` 2컬럼 레이아웃 (좌: StepIndicator, 우: 다크모드 + StepNavigation)
- 변경 후: 3컬럼 그리드 레이아웃 (좌: StepIndicator, 중앙: 현재 스텝 제목, 우: 다크모드 + StepNavigation)
- 디자인 요구사항:
  - 그리드: `grid grid-cols-[1fr_auto_1fr]`
  - 높이: `h-14` (56px) 고정
  - 배경: `bg-background/95 backdrop-blur-md` (기존 `/80` → `/95` 강화)
  - 테두리: `border-b border-border/50` (투명도 추가)
  - 그림자: `shadow-sm` 추가
  - 중앙 제목: `text-sm font-semibold text-foreground/80`
- 참고: 웹 조사 기반 디자인 개선. Designer가 시각적 균형 검토 필요 (StepIndicator 너비와 중앙 제목 위치 조율)

## Implementer 전달사항

### 구현 순서

1. **REQ2 사전 작업: shadcn resizable 설치**
   ```bash
   npx shadcn@latest add resizable
   ```
   - 설치 위치 확인: `app/shared/components/shadcn/resizable.tsx`
   - 기설치 컴포넌트: tooltip, separator (REQ3에서 사용)

2. **REQ1 → REQ2 (순차 의존)**
   - REQ1: `live-preview.tsx` L297 `resize` 클래스 제거
   - REQ2: `primitives-step-page.tsx` L187-285 ResizablePanelGroup 래핑
   - 이유: REQ1 완료 후 REQ2 진행 시, ResizeObserver가 Resizable 드래그 이벤트를 정상 감지

3. **REQ3, REQ4 (병렬 가능)**
   - REQ3: `primitives-step-page.tsx` L158-185 아이콘 툴바 변경
   - REQ4: `live-preview.tsx` L168-185 `getPreviewSize()` 로직 수정

4. **REQ6 (독립적, 언제든 가능)**
   - `wizard-shell.tsx` L29-43 헤더 구조 변경
   - 다른 REQ와 독립적이지만, REQ5 검증 전 완료 권장 (헤더 높이 변경이 전체 레이아웃에 영향)

5. **REQ5 (최종 검증)**
   - REQ1-4, REQ6 완료 후 진행
   - Playwright 테스트 작성 → 실행 → 스크린샷 첨부

### 주의사항

**다크모드**
- 현재 `previewDark` 상태는 `usePreviewUI()` 훅으로 관리 (wizard-shell.tsx L19-24에서 `<html>` 클래스 토글)
- REQ6 헤더 스타일 변경 시, 다크모드에서도 시각적 일관성 유지 (`border-border/50`, `bg-background/95` 등 oklch 기반 토큰 사용)

**oklch**
- 컬러 토큰은 `live-preview.tsx` L47-138 `usePreviewTokens()`에서 oklch 색공간으로 계산
- 새로운 스타일 추가 시 oklch 형식 준수 (예: `oklch(0.623 0.214 260)`)

**store 마이그레이션**
- 이번 작업은 store 변경 없음
- 현재 버전: 4 (useWizardStore/index.ts L121)
- 향후 store 필드 추가 필요 시, 버전 증가 + migrate 로직 업데이트 필수

**ResizablePanel 주의**
- `ResizablePanel`의 `defaultSize`는 퍼센트 단위 (35 = 35%)
- `minSize`/`maxSize`로 극단적 크기 방지 (FormSection: 25-50%, LivePreview: 50-75%)
- 드래그 핸들은 `ResizableHandle withHandle` prop으로 시각적 표시

**getPreviewSize() 로직 (REQ4)**
- 기존: platformTarget만 고려, 고정 비율 반환
- 변경: DEVICE_OPTIONS에서 device 객체 조회 → `device.width/height` 실제 비율 반영
- 웹: 높이 600px 고정, 너비는 `device.width / device.height * 600`
- 태블릿: 높이 600px 고정, 너비는 `device.width / device.height * 600`
- 모바일: device.width/height 그대로 사용, 단 height는 700px 제한
- 폴백: device 미발견 시 기존 로직 유지 (web: 800x600, mobile: 375x667)

**Playwright 테스트 (REQ5)**
- 테스트 파일: `tests/primitives-no-scroll.spec.ts`
- 로컬 서버 실행 필요: `npm run dev` (포트 5178)
- 테스트 실행: `npx playwright test primitives-no-scroll.spec.ts`
- 스크린샷 경로: `tests/screenshots/primitives-no-scroll.png`

**헤더 높이 계산 (REQ6)**
- 기존: `py-3` (패딩 기반, 높이 가변)
- 변경: `h-14` (56px 고정)
- Primitives 페이지 최상위 컨테이너: `h-[calc(100dvh-57px)]` (L156)
- REQ6 완료 후, 헤더 높이가 56px로 변경되면 Primitives 페이지도 `h-[calc(100dvh-56px)]`로 조정 필요
- 단, 기존 57px와 1px 차이라 레이아웃 영향 미미. REQ5 테스트에서 검증

## 설계 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|-----------|-----------|-------------|-----------|
| 1 | REQ1 resize 제거 방법 | `className`에서 `resize` 제거, ResizeObserver 로직 유지 | (1) ResizeObserver 제거, (2) resize를 `resize-x` 또는 `resize-y`로 변경 | shadcn Resizable이 드래그 시 컨테이너 크기를 변경하므로, ResizeObserver가 scale 재계산에 필요. 브라우저 네이티브 resize 핸들만 제거하면 됨. |
| 2 | REQ2 ResizablePanel 비율 | FormSection 35% (25-50%), LivePreview 65% (50-75%) | (1) 50-50 균등 분할, (2) FormSection 40% / LivePreview 60% | 기존 w-[480px]/flex-1 비율 (뷰포트 1440px 기준 약 33-67%)을 근사. 35-65%가 가장 유사하고, minSize/maxSize로 유연성 제공. |
| 3 | REQ3 아이콘 툴바 너비 | w-14 (56px) | (1) w-12 (48px), (2) w-16 (64px) | 아이콘 h-4 w-4 (16px) + 패딩 p-2.5 (10px * 2) = 36px 최소 필요. 56px는 터치 타겟 최소 크기(44px) 초과 + 시각적 여유 제공. |
| 4 | REQ3 리셋 버튼 스타일 차별화 | border-primary/30 bg-primary/5 text-primary | (1) destructive 컬러 사용, (2) 일반 버튼과 동일 스타일 + 아이콘만 변경 | 리셋은 primary 액션이 아니지만, 기본값 복원이라는 명확한 의미 전달을 위해 primary 컬러 사용. destructive는 삭제 액션용으로 부적합. |
| 5 | REQ4 getPreviewSize() 로직 | device.width/height 비율 반영, 플랫폼별 maxHeight 설정 | (1) 모든 플랫폼에 device 크기 그대로 사용, (2) 플랫폼 무시하고 device 크기만 사용 | 웹/태블릿은 가로 화면이 넓어 LivePreview 영역을 초과할 수 있으므로, 높이 600px 고정 + aspectRatio 계산. 모바일은 세로 화면이므로 실제 크기 사용 (높이만 700px 제한). |
| 6 | REQ5 스크롤 버그 조사 방법 | Playwright 자동 테스트 + 스크린샷 | (1) 개발자 도구 수동 검증만, (2) Cypress E2E 테스트 | 프로젝트에 playwright.config.ts 존재 확인 (git status). Playwright가 설정 완료 상태이므로, 추가 설정 없이 테스트 작성 가능. 자동화로 재현성 확보. |
| 7 | REQ6 헤더 중앙 제목 내용 | 현재 스텝 label (`STEPS[current].label`) | (1) 프로젝트 이름 표시, (2) 로고 + 제목 조합 | 위저드 진행 상황을 명확히 전달하는 것이 핵심. StepIndicator만으로는 모바일에서 라벨 숨김 시 현재 위치 파악 어려움. 중앙 제목으로 현재 단계 강조. |
| 8 | REQ6 헤더 그리드 구조 | grid grid-cols-[1fr_auto_1fr] | (1) flex justify-between + 중앙 absolute 배치, (2) grid grid-cols-3 (균등 분할) | 중앙 제목 길이가 가변적 (예: "레이아웃" 4자, "디자인 프리미티브" 9자)이므로 `auto` 사용. 좌우 패널은 1fr로 균등 분할하여 중앙 정렬 보장. |
| 9 | shadcn resizable 설치 타이밍 | implementer가 REQ2 직전 설치 | (1) planner가 사전 설치, (2) designer가 설치 | planner는 설계만 담당, 구현 도구 설치는 implementer 역할. 설치 명령어와 확인 방법을 plan 문서에 명시. |
| 10 | store 버전 마이그레이션 필요성 | 불필요 | - | 모든 요구사항이 UI 레이아웃/스타일링 변경에 한정. store 필드 추가/변경 없음. 현재 버전 4 유지. |

