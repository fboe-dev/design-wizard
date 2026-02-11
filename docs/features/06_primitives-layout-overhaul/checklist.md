# 작업별 체크리스트: 06_primitives-layout-overhaul

## 체인
refiner → validator(T0) → planner → validator(T1) → designer → validator(T1) → implementer → validator(T2) → orchestrator

## Tier 1 조정
- Designer: **필요** — #3 아이콘 툴바 (기존에 없는 UI 패턴), #6 헤더 디자인 고도화 (웹 조사 기반)

## Tier 2 추가 항목
- ResizablePanelGroup이 FormSection과 LivePreview 사이에 정상 작동하는지 확인
- 아이콘 툴바 호버 시 툴팁이 오른쪽으로 등장하는지 확인
- 디바이스 드롭다운 변경 시 미리보기 사이즈가 동기화되는지 확인
- 최상위 컨테이너에 스크롤이 발생하지 않는지 확인
- 헤더 정렬 규칙이 일관성 있게 적용되었는지 확인
