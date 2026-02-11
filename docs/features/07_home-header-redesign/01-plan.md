# 기획: 홈 화면 및 헤더 재설계

## 목적

Design Wizard의 브랜드 아이덴티티를 강화하고 위저드 네비게이션 UX를 개선한다.
- 홈 화면에 서비스 로고 추가 (app-logo.png, 5120px)
- Favicon 설정으로 브라우저 탭 아이콘 표시
- 헤더 레이아웃 재구성: 좌(브랜드) 중앙(StepIndicator) 우(다크모드)
- 이전/다음 버튼을 플로팅 네비게이션으로 전환 (원형 디자인, 페이지 하단 고정)

## 요구사항 → 파일 매핑

| REQ | 수정 파일 | 핵심 변경 |
|-----|-----------|-----------|
| REQ-1 | `public/assets/app-icon.ico` (신규) | app-icon.png 기반 favicon 파일 생성 |
| REQ-2 | `app/root.tsx` | `<head>` 내 `<link rel="icon" href="/assets/app-icon.ico" />` 추가 |
| REQ-3 | `app/routes/home-page.tsx` | Hero 섹션 상단에 app-logo.png 추가 (`width: 5120px`) |
| REQ-4 | `app/features/wizard/components/wizard-shell.tsx` | 헤더 grid 구조 변경 (`grid-cols-[auto_1fr_auto]`), 중앙 제목 제거 |
| REQ-5 | `app/features/wizard/components/wizard-shell.tsx` | 헤더 좌측에 app-icon.png (h-8 w-8) + "Design Wizard" Bold 텍스트 추가 |
| REQ-6 | `app/features/wizard/components/wizard-shell.tsx` | 다크모드 아이콘 outline 스타일 확인 (lucide-react 기본 스타일) |
| REQ-7 | `app/features/wizard/components/floating-navigation.tsx` (신규) | 원형 이전/다음 버튼 컴포넌트 (페이지 하단 고정, StepNavigation 로직 재사용) |
| REQ-8 | `app/features/wizard/components/wizard-shell.tsx` | StepNavigation 제거, `<main>` 하단에 FloatingNavigation 추가 |
| REQ-9 | N/A (검증만) | 홈 화면 (`/`)에서 플로팅 네비게이션이 나타나지 않는지 확인 |

## 상태 관리 변경

**변경 없음.** 이번 작업은 UI 레이아웃만 수정하며 Zustand store를 건드리지 않음.

- store 필드 추가/변경: 없음
- 버전 마이그레이션: 불필요
- 영향받는 generators: 없음

## 파일 구조

```
app/
├── assets/
│   ├── app-icon.png (기존)
│   └── app-logo.png (기존)
├── features/wizard/components/
│   ├── wizard-shell.tsx (수정: REQ-4,5,6,8)
│   ├── step-indicator.tsx (변경 없음)
│   ├── step-navigation.tsx (참조만, REQ-8 이후 미사용)
│   └── floating-navigation.tsx (신규: REQ-7)
├── routes/
│   └── home-page.tsx (수정: REQ-3)
├── root.tsx (수정: REQ-2)
public/ (신규)
└── assets/
    └── app-icon.ico (신규: REQ-1)
```

**주의:** Vite는 `public/` 디렉토리를 자동으로 정적 파일로 서빙함. vite.config.ts에 별도 설정 불필요.

## 완료 기준

1. **REQ-1:** `public/assets/app-icon.ico` 파일이 존재
2. **REQ-2:** 브라우저 개발자도구 Network 탭에서 `app-icon.ico` 요청이 200 응답
3. **REQ-3:** 홈 화면 스크린샷에 app-logo.png가 가로 5120px 크기로 표시
4. **REQ-4:** 헤더 스크린샷에서 좌(로고+텍스트) 중앙(StepIndicator) 우(다크모드) 배치 확인
5. **REQ-5:** 헤더 좌측에 app-icon.png (h-8 w-8) + "Design Wizard" Bold 텍스트가 나란히 표시
6. **REQ-6:** 헤더 우측 다크모드 아이콘이 outline 스타일로 표시
7. **REQ-7:** 위저드 페이지 스크린샷에서 페이지 하단 중앙에 원형 플로팅 버튼 2개 표시
8. **REQ-8:** 위저드 페이지 헤더에 이전/다음 버튼이 사라짐
9. **REQ-9:** 홈 화면 스크린샷에 플로팅 네비게이션 버튼이 없음

## 테스트 시나리오

| REQ | 위저드 단계 | 동작 | 기대 결과 |
|-----|-------------|------|-----------|
| REQ-1 | 공통 | 파일 시스템 확인 | `public/assets/app-icon.ico` 존재 |
| REQ-2 | 공통 | 브라우저 탭 확인 | Favicon 아이콘 표시됨 |
| REQ-3 | 홈 (`/`) | 홈 화면 접속 | Hero 섹션 상단에 app-logo.png 표시 (width: 5120px) |
| REQ-4 | Layout (`/wizard/layout`) | 헤더 확인 | 좌(브랜드) 중앙(StepIndicator) 우(다크모드) 배치, 중앙 제목 없음 |
| REQ-5 | Layout | 헤더 좌측 확인 | app-icon.png (32x32px) + "Design Wizard" Bold 텍스트 |
| REQ-6 | Layout | 헤더 우측 확인 | 다크모드 아이콘이 outline 스타일 (Moon/Sun) |
| REQ-7 | Layout | 페이지 하단 확인 | 원형 플로팅 버튼 2개 (이전/다음) 중앙 고정 |
| REQ-8 | Layout | 헤더 우측 확인 | StepNavigation 컴포넌트 제거됨 |
| REQ-9 | 홈 (`/`) | 페이지 하단 확인 | 플로팅 네비게이션 버튼 없음 |

## Designer 전달사항

**새로운 UI 패턴 필요 여부: 있음**

### REQ-7: 플로팅 네비게이션 디자인
- **기존 패턴:** 헤더 우측의 직사각형 버튼 (rounded-lg, px-4 py-2)
- **신규 패턴:** 페이지 하단 고정 원형 버튼 (rounded-full)
- **요청사항:**
  - 원형 버튼 크기 (w-12 h-12 또는 w-14 h-14)
  - 버튼 간 간격 (gap-4 또는 gap-6)
  - 배경색 (bg-primary vs bg-card with border)
  - 그림자 효과 (shadow-lg vs shadow-xl)
  - 아이콘 크기 (h-5 w-5 vs h-6 w-6)
  - 하단 고정 위치 (bottom-8 vs bottom-6)
  - 반응형 동작 (모바일에서 크기 축소 여부)

### REQ-4: 헤더 레이아웃 재구성
- **기존:** `grid-cols-[1fr_auto_1fr]` (좌/중앙/우 균등)
- **신규:** `grid-cols-[auto_1fr_auto]` (좌 최소, 중앙 확장, 우 최소)
- **요청사항:**
  - 브랜드 영역(좌) 패딩/간격
  - StepIndicator가 중앙에서 너무 치우치지 않도록 justify-center 필요 여부
  - 헤더 전체 높이 유지 (h-14) 또는 조정 필요 여부

## Implementer 전달사항

### 구현 순서
1. **병렬 가능 (순서 무관):**
   - REQ-1, REQ-2 (Favicon 설정)
   - REQ-3 (홈 화면 로고)
   - REQ-7 (FloatingNavigation 컴포넌트 생성)

2. **순차 필수 (REQ-4 → REQ-5, REQ-6, REQ-8):**
   - REQ-4: wizard-shell.tsx 헤더 grid 구조 변경
   - REQ-5: 헤더 좌측에 브랜드 영역 추가 (REQ-4 이후)
   - REQ-6: 다크모드 아이콘 확인 (REQ-4와 동시 가능)
   - REQ-8: StepNavigation 제거 + FloatingNavigation 추가 (REQ-7 완료 후)

3. **검증:**
   - REQ-9: 홈 화면 접속하여 플로팅 버튼 미표시 확인

### 주의사항

#### 1. Public 디렉토리 생성
- `public/` 디렉토리는 프로젝트 루트에 생성 (절대 금지 규칙 예외)
- Vite는 `public/` 내용을 빌드 시 dist/ 루트로 복사
- 경로: `/assets/app-icon.ico` (public/ 제외)

#### 2. Favicon 변환
- app-icon.png (94KB, PNG) → app-icon.ico 변환 필요
- ImageMagick, online converter, 또는 기존 ICO 파일 사용
- 크기: 16x16, 32x32, 48x48 (multi-resolution ICO 권장)

#### 3. 다크모드 아이콘
- lucide-react의 Moon/Sun 아이콘은 기본 outline 스타일
- 현재 코드 확인: `strokeWidth` 명시 없음 → 기본값 (outline)
- 추가 작업 불필요, 단 시각적 확인만 필요

#### 4. 홈 화면 로고 크기
- 요구사항: "가로 사이즈 5120px로 사용"
- 해석: 원본 크기 그대로 표시 (반응형 아님)
- `<img src="/assets/app-logo.png" alt="Design Wizard" style={{ width: '5120px' }} />`
- 화면에서 잘릴 수 있으므로 컨테이너에 `overflow-x: auto` 또는 `max-width: 100%` 고려
- **Implementer가 Designer에게 질의 필요:** 실제 의도 확인 (5120px 고정 vs 반응형)

#### 5. FloatingNavigation 로직 재사용
- StepNavigation.tsx의 로직 복사:
  - `isFirst` → "홈으로" / "이전"
  - `isLast` → "프롬프트 생성" / "다음"
  - navigate() 사용
- 스타일 변경:
  - `rounded-lg` → `rounded-full`
  - `px-4 py-2` → `w-12 h-12` (또는 Designer 지정 크기)
  - `fixed bottom-8 left-1/2 -translate-x-1/2` (중앙 정렬)
  - `flex gap-4` (버튼 간 간격)

#### 6. wizard-shell.tsx 구조 변경
```tsx
// Before (REQ-4 이전)
<header>
  <div className="grid grid-cols-[1fr_auto_1fr]">
    <div>StepIndicator</div>
    <div><h2>{STEPS[current].label}</h2></div>
    <div>다크모드 + StepNavigation</div>
  </div>
</header>

// After (REQ-4, 5, 6, 8 완료 후)
<header>
  <div className="grid grid-cols-[auto_1fr_auto]">
    <div>
      <img src="/assets/app-icon.png" className="h-8 w-8" />
      <span className="font-bold">Design Wizard</span>
    </div>
    <div className="flex items-center justify-center">
      <StepIndicator />
    </div>
    <div>다크모드 (단독)</div>
  </div>
</header>
<main>
  <Outlet />
  <FloatingNavigation />
</main>
```

#### 7. 에셋 경로
- app-icon.png: `/assets/app-icon.png` (Vite의 app/assets/ → /assets/)
- app-logo.png: `/assets/app-logo.png`
- app-icon.ico: `/assets/app-icon.ico` (public/assets/ → /assets/)

#### 8. 다크모드 시각적 검증
- Light mode에서 스크린샷 1장
- Dark mode에서 스크린샷 1장
- 플로팅 버튼이 배경과 구분되는지 확인 (shadow 필요 여부)

#### 9. 홈 레이아웃 독립성
- home-page.tsx는 wizard-shell.tsx를 거치지 않음 (React Router routes 구조)
- 플로팅 네비게이션은 wizard-shell.tsx의 `<main>` 내부에만 렌더링
- 자동으로 홈 화면에서 숨겨짐 (추가 코드 불필요)

## 설계 의사결정 로그

| # | 결정 사항 | 채택한 안 | 검토한 대안 | 채택 근거 |
|---|-----------|-----------|-------------|-----------|
| 1 | Favicon 경로 | `public/assets/app-icon.ico` | `app/assets/app-icon.ico` | Vite는 public/ 디렉토리를 빌드 시 dist/ 루트로 복사. root.tsx에서 `/assets/app-icon.ico` 경로로 참조 가능. app/assets/는 번들러가 처리하므로 import 필요. |
| 2 | 홈 로고 크기 | `width: 5120px` 고정 | `max-width: 100%` 반응형 | 요구사항 원문 "가로 사이즈 5120px로 사용"을 문자 그대로 해석. 실용성 검증은 Designer/Implementer 단계에서 진행. |
| 3 | 헤더 grid 구조 | `grid-cols-[auto_1fr_auto]` | `flex justify-between` | 기존 grid 구조 유지하되 컬럼 비율만 변경. StepIndicator가 중앙에 위치하려면 justify-center 필요 (flex는 균등 배분 어려움). |
| 4 | 플로팅 버튼 위치 | `fixed bottom-8 left-1/2 -translate-x-1/2` | `absolute bottom-8` | fixed는 스크롤 시에도 고정, absolute는 컨테이너 기준. wizard-shell의 main은 flex-1이므로 fixed가 더 안정적. |
| 5 | StepNavigation 제거 방식 | import 삭제 + JSX 제거 | 주석 처리 | 미사용 코드는 완전 제거. 향후 참조 필요 시 git history 활용. |
| 6 | FloatingNavigation 컴포넌트 파일 위치 | `app/features/wizard/components/floating-navigation.tsx` | `app/shared/components/custom/` | 위저드 전용 컴포넌트이므로 features/wizard/components/ 아래 배치. shared는 범용 컴포넌트 전용. |
| 7 | 다크모드 아이콘 스타일 | 확인만 (변경 없음) | strokeWidth 명시적 설정 | lucide-react 아이콘은 기본 outline. 현재 코드에 strokeWidth 없으므로 이미 outline. 시각적 검증만 필요. |
| 8 | 브랜드 영역 컴포넌트화 | 인라인 JSX (wizard-shell.tsx 내부) | 별도 컴포넌트 (header-brand.tsx) | 단순 이미지+텍스트이므로 오버엔지니어링 방지. 재사용 필요 시 추후 리팩토링. |
| 9 | 홈 화면 플로팅 버튼 숨김 방식 | 자동 (라우트 구조 활용) | 조건부 렌더링 (pathname 체크) | wizard-shell.tsx는 /wizard/* 전용 레이아웃. home-page.tsx는 독립 레이아웃이므로 추가 코드 불필요. |
| 10 | REQ-3 로고 배치 위치 | Hero 섹션 상단 (Wand2 배지 위) | Hero 섹션 하단 (텍스트 아래) | 요구사항 "홈페이지에 해당 로고를 사용"을 Hero 최상단으로 해석. 시각적 계층: 로고 → 배지 → 제목 → 설명 → CTA. |
