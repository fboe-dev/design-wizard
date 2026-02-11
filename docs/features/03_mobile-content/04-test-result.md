# 테스트 결과: 모바일 내부 콘텐츠 레이아웃

## 런타임 에러 검사
| 검사 항목 | 결과 |
|-----------|------|
| Vite 에러 오버레이 | ✅ 없음 |
| React 에러 바운더리 | ✅ 없음 |
| 치명적 콘솔 에러 | ✅ 0개 |

## 요구사항 시각적 검증
| # | 요구사항 | 스크린샷 | 시각적 확인 내용 | 결과 |
|---|----------|----------|-----------------|------|
| REQ-00 | 페이지 로드 | req-00-page-load.png | 스크린샷 확인: /wizard/primitives 페이지가 정상 로드됨. 좌측에 폰트/컬러/타이포 등 컨트롤 패널, 우측에 Web 미리보기(SidebarShell + simple-page)가 에러 없이 표시됨. Vite 에러 오버레이, React 에러 바운더리, 콘솔 치명적 에러 모두 없음 | PASS |
| REQ-02 | FormSection 1열 | req-02-form-mobile.png | 스크린샷 확인: Mobile (375px) 프리뷰에서 simple-page 레이아웃의 FormSection이 표시됨. "프로젝트 이름" 인풋이 위에, "카테고리" 인풋이 아래에 세로 1열로 배치됨 (가로 2열 아님). 각 인풋이 전체 너비를 사용하여 375px 모바일에서 적절한 크기로 표시됨. 하단에 이메일 알림 체크박스, 공개 스위치, 진행률 바, 버튼들도 정상 표시 | PASS |
| REQ-03 | StatsCards 1열 | req-03-stats-mobile.png | 스크린샷 확인: Mobile (375px) 프리뷰에서 tab-page 레이아웃의 StatsCards가 표시됨. "총 사용자" (2,847 / +12.5%), "활성 프로젝트" (24 / +3), "예정 일정" (7 / 이번 주) 세 개의 통계 카드가 세로 1열로 배치됨 (가로 3열 아님). 각 카드가 전체 너비를 사용하여 라벨, 값, 아이콘이 충분한 공간으로 표시됨 | PASS |
| REQ-04 | DashboardGrid 1열 | req-04-dashboard-mobile.png | 스크린샷 확인: Mobile (375px) 프리뷰에서 dashboard-grid 레이아웃을 스크롤하여 ProjectCards 영역이 표시됨. "예정 일정" 통계 카드 아래에 "디자인 시스템" (68%), "API 리팩토링" (42%) 프로젝트 카드가 전체 너비로 세로 1열 배치됨. 각 카드의 제목/설명이 위에, 진행률 바가 아래에 표시됨. ProjectCards가 전체 너비를 차지하므로 MembersTable도 그 아래에 1열로 배치됨을 확인 (grid-cols-2가 아닌 flex-col) | PASS |
| REQ-05 | SidebarPage 사이드바 숨김 | req-05-sidebar-page-mobile.png | 스크린샷 확인: Mobile (375px) 프리뷰에서 sidebar-page 레이아웃이 표시됨. 180px 내부 사이드바(일반/프로필/알림/보안/결제 메뉴)가 숨겨지고, 대신 설정 아이콘 + "일반" + 화살표로 구성된 간략한 브레드크럼이 표시됨. 콘텐츠 영역("일반 설정" 헤더 + FormSection)이 전체 너비를 사용함. "프로젝트 이름"과 "카테고리" 인풋도 세로 1열 배치됨 | PASS |
| REQ-06 | MembersTable 이메일 숨김 | req-06-members-mobile.png | 스크린샷 확인: Mobile (375px) 프리뷰에서 tab-page 레이아웃의 "멤버" 탭이 선택됨. 테이블 헤더에 "이름"과 "역할" 2열만 표시되고 "이메일" 컬럼이 숨겨짐. Brian/관리자, Yuna/편집자, Minho/뷰어 3명의 멤버가 이름(아바타+텍스트)과 역할(뱃지) 2열로만 표시됨. 이메일 주소(brian@example.com 등)는 어디에도 보이지 않음 | PASS |
| REQ-07 | ProjectCards 세로 배치 | req-07-projects-mobile.png | 스크린샷 확인: Mobile (375px) 프리뷰에서 tab-page 레이아웃의 "개요" 탭이 표시됨. 프리뷰를 스크롤하여 ProjectCards 영역이 보임. "디자인 시스템" 카드에서 제목+뱃지("진행중")와 설명이 위에, 진행률 바(68%)가 아래에 전체 너비로 세로 배치됨. "API 리팩토링" 카드도 동일하게 제목+뱃지("검토중")와 설명 위에, 진행률 바(42%)가 아래에 세로 배치됨. 가로 나란히 배치가 아닌 세로(flex-col) 배치 확인됨 | PASS |

## 수정 이력
| 회차 | REQ | 문제 | 수정 내용 | 재확인 |
|------|-----|------|----------|--------|
| 1 | REQ-04, REQ-07 | 스크린샷에서 ProjectCards 영역이 보이지 않음 (스크롤 부족) | 프리뷰 내부 overflow-auto 컨테이너를 scrollTop으로 스크롤하여 ProjectCards 영역이 보이도록 테스트 수정 | REQ-04: ProjectCards가 전체 너비로 1열 배치 확인, REQ-07: 각 카드 내부가 세로 배치 확인 |

## 결과
✅ 7 passed, 0 failed
- 런타임 에러: 0개
- 요구사항 스크린샷: 7개 (시각적 확인 완료)
