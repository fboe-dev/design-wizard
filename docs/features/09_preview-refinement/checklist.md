# 09_preview-refinement 체크리스트

## 원문 요약

미리보기(live-preview) 전반 개선: 가로 스크롤 잘림 수정, 웹 플랫폼 레이아웃 정상화, 타이포그래피 규칙 준수, shadcn 기반 스케일/여백 보정

## 작업 항목

| # | 항목 | 상태 |
|---|------|------|
| 1 | 가로 스크롤 시 미리보기 왼쪽 잘림 수정 | ⬜ |
| 2 | 웹 플랫폼 미리보기 사이즈 정상화 | ⬜ |
| 3 | 미리보기 타이포그래피를 FormSection 규칙에 맞게 수정 (base font 반영) | ⬜ |
| 4 | shadcn 디자인 시스템 기반 스케일/여백/레이아웃 보정 (designer 조사) | ⬜ |

## 체인

```
refiner → validator(T0) → planner → validator(T1) → designer → validator(T1) → implementer → validator(T2) → orchestrator(최종)
```

## Designer 필요 여부

필요 — 원문 명시: "디자인 에이전트가 shadcn 디자인 시스템을 조사해서 과도하게 벗어난 스타일들을 찾아내서 보정"
