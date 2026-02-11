# 08_preview-layout-fix 체크리스트

## 원문 요약

이전 에이전트에 의해 잘못 구현된 부분 수정 (Step 2 Primitives 미리보기)

## 작업 항목

| # | 항목 | 상태 |
|---|------|------|
| 1 | 미리보기 페이지 상단 헤더 제거 (플랫폼/사이즈 드롭다운 + 국기 아이콘 메뉴) | ⬜ |
| 2 | 왼쪽 FormSection 스타일 섹션 내 타겟 플랫폼에 플랫폼별 사이즈 콤보박스 배치 | ⬜ |
| 3 | 콤보박스 사이즈 ↔ 미리보기 크기 동기화 + 가로 스크롤 처리 | ⬜ |
| 4 | 타블렛/모바일 반응형 레이아웃 복원 | ⬜ |

## 체인

```
refiner → validator(T0) → planner → validator(T1) → implementer → validator(T2) → orchestrator(최종)
```

## Designer 필요 여부

불필요 — 기존 미리보기/드롭다운/레이아웃 패턴 수정
