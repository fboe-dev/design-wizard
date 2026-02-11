# Design Wizard 에이전트 시스템

> 🔄 **순환 루프** — implementer가 구현→테스트→확인을 보일 때까지 반복
> 📡 **직접 질의** — 에이전트끼리 정보 교환

## 빠른 시작

```
"폰트 탭을 횡스크롤로 변경하고 스페이싱 미리보기를 개선해줘"
```

→ orchestrator 분석 → 에이전트 체인 자동 실행

## 아키텍처

```
orchestrator (시작: 분석 + 체인 + checklist.md)
  ↓
refiner → validator(T0) → planner → validator(T1)
  → [designer → validator(T1)] ← 조건부
  → implementer → validator(T2)
       ↑ 직접 질의: planner, designer
  ↓
orchestrator (끝: 최종 의미 검증)
  ↓
✅ 완료
```

## 에이전트

| 에이전트 | 모델 | 역할 |
|----------|------|------|
| orchestrator | opus | 시작 분석 + 끝 의미 검증 |
| refiner | sonnet | 요구사항 정제 (설계 질문 → 구체적 요구사항) |
| planner | sonnet | 파일구조/상태관리 설계 |
| designer | opus | 레퍼런스 UI 설계 (조건부) |
| implementer | opus | 코드 + E2E + 시각적 확인 루프 |
| validator | sonnet | 체크리스트 실행 + 체인 라우팅 |

## 산출물

```
docs/
├── requests.md
└── features/[번호]_[기능명]/
    ├── checklist.md               # orchestrator
    ├── 01-plan.md                 # planner
    ├── 02-design.md               # designer (조건부)
    ├── 03-result.md               # implementer (구현+테스트+의사결정 로그)
    └── tests/test-results/
```

## 프로젝트 특성

```
- 위저드 4단계: layout → primitives → components → output
- DB 없음, 인증 없음
- URL: http://localhost:5178
- @shadcn/@custom 컴포넌트, Tailwind v4, oklch
```

**상세 규칙:** `RULES.md` 참조
