# UI Improvements - 계획서

## 개요

**기능명**: UI Improvements (위저드 UI 개선)
**티어**: Tier 0 (검증 단계)
**요청 문서**: `/Users/brian/Projects/design-wizard/docs/requests.md`

## 작업 요약

위저드 UI의 8가지 개선사항을 구체적 요구사항으로 정제:

1. Dock 플로팅 처리 (live-preview.tsx)
2. 미리보기 스크롤 처리 (live-preview.tsx)
3. 라운딩 미리보기 개선 (scale-configurator.tsx)
4. 기기 선택 드롭다운 추가 (primitives-step-page.tsx)
5. 미리보기 비율 반영 (live-preview.tsx)
6. Resizable 드래그 작동 (primitives-step-page.tsx)
7. 랜딩 페이지 선택 시 비활성화 (layout-step-page.tsx)
8. 대시보드 그리드 차별화 (live-preview.tsx)

## 정제 결과

### 핵심 발견사항

1. **타겟 플랫폼 드롭다운 "불일치"** → 실제로는 드롭다운 자체가 존재하지 않음
   - `selectedDevice` 상태는 있으나 UI 없음
   - DEVICE_OPTIONS 정의되었으나 미사용
   - 드롭다운 추가 + 미리보기 비율 반영 2개 작업으로 분리

2. **라운딩 미리보기 "Card 제거"** → Card 컴포넌트 실제로 없음
   - 원문은 오해로 판단
   - 미리보기 블록 시각적 개선으로 재해석

3. **DesignStyle 타입 불일치 발견** (정제 로그 #8)
   - types.ts: "standard"/"flat"/"lineless"
   - 실제 사용: "line"/"fill"/"mixed"
   - 별도 작업 필요 (본 작업 범위 외)

### 의존 관계

```
Tier 1 (독립):
  - REQ-7 (랜딩 비활성화)
  - REQ-3 (라운딩 미리보기)

Tier 2 (순차):
  - REQ-1 (Dock 플로팅) → REQ-2 (스크롤)
  - REQ-8 (대시보드 차별화)

Tier 3 (연쇄):
  - REQ-4 (기기 드롭다운) → REQ-5 (미리보기 비율)
  - REQ-6 (Resizable)
```

### 완료 기준

모든 요구사항에 구체적 완료 기준 명시:
- 스크린샷 촬영 시점
- 검증 포인트
- 총 8장의 스크린샷 필요

## 다음 단계

validator 호출 → Tier 1 구현 → Tier 2 구현 → Tier 3 구현
