# 계획: Primitives UX 개선

## 수정 대상 파일

- `app/features/wizard/components/font-selector.tsx` — 탭 횡스크롤 + ScrollArea 적용
- `app/features/wizard/components/color-picker.tsx` — Light/Dark 미리보기 위치 이동
- `app/features/wizard/components/scale-configurator.tsx` — 타이포 스케일 축소, 스페이싱 컴포넌트 미리보기, 라운딩 단일 박스
- `app/features/wizard/components/live-preview.tsx` — designStyle 전체 적용 + platformTarget 크기 반영
- `app/features/wizard/services/generators/css-generator.ts` — FIXED_LABELS 동기화

## 요구사항 → 파일 매핑

| REQ | 수정 파일 | 핵심 변경 |
|-----|-----------|-----------|
| 1 | font-selector.tsx | flex-wrap → flex-nowrap overflow-x-auto |
| 2 | font-selector.tsx | ScrollArea h-[400px] 적용 |
| 3 | color-picker.tsx | 미리보기 JSX를 칩 위로 이동 |
| 4 | scale-configurator.tsx, css-generator.ts | FIXED_LABELS 9→7개 |
| 6 | scale-configurator.tsx | 막대 → Button/Input/Menu 컴포넌트 |
| 7 | scale-configurator.tsx | 7단계 → 단일 박스 |
| 8 | live-preview.tsx | designStyle을 모든 Button/Badge/Card에 전파 |
| 9 | live-preview.tsx | platformTarget에 따라 프리뷰 크기 변경 |

## 의존 순서

1→2 (같은 파일) → 3 → 4 → 6 → 7 → 8 → 9
