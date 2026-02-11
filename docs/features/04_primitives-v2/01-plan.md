# 계획: Primitives UX v2

## 수정 대상 파일
- `app/features/wizard/constants.ts` — 폰트 60개 재작성 + 언어별 UI 텍스트 맵
- `app/features/wizard/types.ts` — DesignStyle/PlatformTarget 재정의 + selectedDevice 추가
- `app/features/wizard/components/font-selector.tsx` — Select 드롭다운 + 외곽선/높이 수정
- `app/features/wizard/components/scale-configurator.tsx` — 타이포 미리보기 축소 + 슬라이더 tick 정렬 + 스페이싱 cursor + 라운딩 컴포넌트 미리보기
- `app/features/wizard/components/live-preview.tsx` — 스타일별 디자인 변경 + 태블릿 레이아웃 + 언어별 텍스트 + 기기 뷰포트
- `app/features/wizard/pages/primitives-step-page.tsx` — 스타일 토글 라벨 변경 + 플랫폼 토글/드롭다운
- `app/shared/stores/useWizardStore/index.ts` — DEFAULT_STATE 업데이트 + selectedDevice

## 요구사항 → 파일 매핑

| REQ | 수정 파일 | 핵심 변경 |
|-----|-----------|-----------|
| 1 | font-selector.tsx | 횡스크롤 탭 → Select 드롭다운 |
| 2 | font-selector.tsx | ScrollArea border + h-[360px] |
| 3 | constants.ts | FONT_GROUPS 6개 언어 × 10개 = 60개 폰트 |
| 4 | constants.ts, live-preview.tsx | 언어별 UI 텍스트 맵 + LivePreview language prop |
| 5 | scale-configurator.tsx | FIXED_LABELS xs~2xl (4xl 제거) + 스케일별 텍스트 |
| 6 | scale-configurator.tsx | SliderRow tick 위치 정렬 |
| 7 | scale-configurator.tsx | Button cursor-pointer |
| 8 | scale-configurator.tsx | 라운딩 미리보기에 컴포넌트 추가 |
| 9 | types.ts, primitives-step-page.tsx, useWizardStore | DesignStyle → standard/flat/lineless |
| 10 | live-preview.tsx | 스타일별 그림자/구분선/외곽선 변경 |
| 11 | types.ts, primitives-step-page.tsx, live-preview.tsx, useWizardStore | PlatformTarget → web/tablet/mobile + 기기 드롭다운 |
| 12 | live-preview.tsx | 태블릿 레이아웃 (사이드바 축소, 부분 네비) |

## 의존 순서
1단계: REQ 1, 2, 5, 6, 7, 8 (독립)
2단계: REQ 3, 9, 11 (타입 변경 + 데이터)
3단계: REQ 4, 10, 12 (의존)
