# 계획: 모바일 미리보기 레이아웃

## 수정 대상 파일
- `app/features/wizard/components/live-preview.tsx` — ShellProps 확장 + 각 Shell 모바일 대응

## 요구사항 → 파일 매핑
| REQ | 핵심 변경 |
|-----|-----------|
| 1 | ShellProps에 platformTarget 추가, PreviewFrame에서 전달 |
| 2 | SidebarShell: mobile일 때 sidebar 숨김 + 햄버거 메뉴 |
| 3 | TopnavShell: mobile일 때 nav 메뉴 숨김 + 햄버거 |
| 4 | DockShell: mobile일 때 상단 아이콘 숨김 |
| 5 | LandingShell: mobile일 때 텍스트 축소 + 카드 1열 |

## 의존 순서
1 → 2, 3, 4, 5 (병렬)
