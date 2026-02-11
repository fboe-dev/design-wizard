# 계획: 미리보기 고도화 + 스타일 고도화

## 수정 대상 파일
- `app/features/wizard/components/live-preview.tsx` -- REQ 3/4/5/6/7 (사이즈, 목업, resizable, 스타일 헬퍼)
- `app/features/wizard/pages/primitives-step-page.tsx` -- REQ 1/2 (중앙 정렬, 도트 배경)
- `app/app.css` -- REQ 2 (dotted-glow-bg 클래스)

## 요구사항 -> 파일 매핑

| REQ | 수정 파일 | 핵심 변경 |
|-----|-----------|-----------|
| 1 | primitives-step-page.tsx | items-start -> items-center justify-center, sticky 제거 |
| 2 | app.css, primitives-step-page.tsx | .dotted-glow-bg CSS 클래스 추가, div에 클래스 적용 |
| 3 | live-preview.tsx | getPreviewSize: web 16:9, tablet 4:3, mobile 유지 |
| 4 | live-preview.tsx | MobileMockup, TabletMockup, WebMockup 컴포넌트 추가 |
| 5 | live-preview.tsx | 목업 외부 wrapper에 CSS resize 적용 |
| 6 | live-preview.tsx | cardStyle standard shadow-md, buttonShadow shadow-md, inputStyle shadow-sm |
| 7 | live-preview.tsx | lineless: bg-muted/60 shadow-inner, input bg-muted/70, hover:bg-primary/90 |

## 의존 순서
1. REQ-6 + REQ-7 (독립, 스타일 헬퍼만 수정)
2. REQ-1 + REQ-2 (레이아웃 수정)
3. REQ-3 + REQ-4 (미리보기 사이즈 + 목업)
4. REQ-5 (Resizable)
