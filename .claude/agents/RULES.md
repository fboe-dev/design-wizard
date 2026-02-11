# 공통 규칙 (모든 에이전트 필수 준수)

## 🚨 절대 금지

### 1. ROOT에 폴더/파일 생성 금지

```
❌ /tests/ /test-results/ /screenshots/ /scripts/
✅ docs/features/[번호]_[기능명]/ 또는 기존 app/ 하위
```

⚠️ **ROOT 오염이 발생하는 주요 원인:**
```
1. playwright.config.ts에 outputDir 누락
   → Playwright가 CWD(프로젝트 ROOT)에 test-results/ 자동 생성
2. 프로젝트 ROOT에서 npx playwright test 실행
   → config 내 상대경로가 ROOT 기준으로 해석됨
3. reporter outputFolder만 설정하고 outputDir는 미설정
   → HTML 리포트만 제어됨, 테스트 아티팩트는 여전히 ROOT

→ playwright.config.ts에 반드시 outputDir: "./test-results" 명시
→ 테스트 실행 후 반드시 ROOT 오염 검사 실행 (implementer.md 참조)
```

### 2. 테스트: HEADLESS만

```
❌ --headed, --ui, headed: true
✅ --headed=false
```

### 3. 추측 완료 금지

### 4. 속성 전용 테스트 금지

### 5. 파괴적 Git 명령어 금지

```
❌ git checkout -- [파일]
❌ git reset --hard
❌ git clean -fd
❌ git stash drop

✅ 되돌리기 → Edit으로 해당 부분만 수정
✅ 이전 상태 확인 → git diff, git log, git show만
```

### 6. orchestrator 직접 구현 금지

```
❌ orchestrator가 직접 코드 수정
❌ orchestrator가 직접 npm run build 수행

✅ orchestrator는 시작(분석+체인) + 끝(의미 검증)만
✅ 코드 변경은 반드시 implementer를 통해서만
✅ Small 작업이라도 implementer를 호출해야 함
```

---

## 📡 에이전트 간 소통 규칙

### 직접 질의 (허용)

```
✅ implementer → planner: "이 상태를 store에 추가해도 돼?"
✅ implementer → designer: "이 탭 spacing 얼마?"
```

### validator 체인 (자동)

```
refiner → validator(T0) → planner
planner → validator(T1) → [designer 또는 implementer]
designer → validator(T1) → implementer
implementer → validator(T2) → orchestrator(최종)
```

### 월권 금지

### 순차 실행 (필수)

```
requests.md는 단일 공유 파일이다.
복수 작업이 있으면 반드시 순차 실행한다.

❌ 2개 이상의 작업 체인 동시 실행 (refiner 2개 병렬 등)
✅ 작업 A 완료 보고 → 작업 B 시작
✅ "모두 진행" = 순차 완료
```

---

## 👁️ 시각적 검증 원칙

```
"스크린샷에 보이지 않으면 작동하지 않는 것이다"

안 보이면 → 구현 코드 수정 → 재촬영 → 보일 때까지 반복 (최대 10회)

⚠️ 스크린샷 촬영 불가 시:
→ 촬영 가능하도록 코드 수정 (data-testid 추가 등)
→ 어떤 경우에도 스크린샷 없이 통과 불가. 예외 없음.

🚫 금지 표현 (전부):
  "코드 확인으로 검증" / "코드로 검증" / "로직 확인"
  "구현 확인" / "코드베이스 확인" / "소스 확인"
→ validator가 즉시 실패 처리.
```

### 관찰 가능성 (모든 에이전트 필수)

```
refiner — 정제 의사결정 로그
planner — 설계 의사결정 로그
designer — 디자인 의사결정 로그
implementer — 수정 이력 + 구현 의사결정 로그

비어있으면 validator가 실패 처리.
```

---

## 🔍 3-Tier 검증 체계

**Tier 2 — 03-result.md + 코드**

```
□ npm run build 성공 / ROOT 오염 없음
□ 스크린샷 수 = 요구사항 수
□ 시각적 서술 구체적 + 우회 표현 0개
□ 런타임 에러 0개
□ 수정 이력 + 의사결정 로그
□ 보안 grep (eval, dangerouslySetInnerHTML)
□ 파괴적 git 명령어 사용 흔적 0개
□ spec에 .catch(() => {}) 패턴 0개 (추측 셀렉터 금지)
□ spec의 경로/셀렉터가 실제 코드와 일치 (routes.ts, 컴포넌트 확인)
```

---

## 🛠️ 기술 스택

```
경로: @shadcn/*, @custom/*, @hooks/*, @libs/*, @stores/*
스타일: Tailwind v4, cn(), CVA, oklch, .dark
상태: Zustand persist (변경 시 버전 마이그레이션)
```

### 위저드 흐름

| 단계 | 라우트             |
| ---- | ------------------ |
| 1    | /wizard/layout     |
| 2    | /wizard/primitives |
| 3    | /wizard/components |
| 4    | /wizard/output     |

## 환경

```
URL: http://localhost:5178
인증 없음
npm run dev / npm run build / npm run typecheck
```

## 완료 판정

```
1. validator Tier 2 통과
2. 스크린샷 직접 Read로 열어 의미 일치 확인
3. 의사결정 로그 기록됨
```
