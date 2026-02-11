# 테스트 결과: Primitives UX v2

## 런타임 에러 검사
| 검사 항목 | 결과 |
|-----------|------|
| Vite 에러 오버레이 | 통과 - 없음 |
| React 에러 바운더리 | 통과 - 없음 |
| 치명적 콘솔 에러 | 통과 - 0개 |

## 요구사항 시각적 검증
| # | 요구사항 | 스크린샷 | 시각적 확인 내용 | 결과 |
|---|----------|----------|-----------------|------|
| 1 | 언어 그룹 탭을 Select 드롭다운으로 교체 | req-01-select-dropdown.png | 스크린샷 확인: 폰트 섹션 상단에 shadcn Select 드롭다운이 표시됨. 드롭다운 열림 상태에서 6개 언어 옵션(한국어 Korean, English, 日本語 Japanese, 中文 Chinese, ภาษาไทย Thai, Tieng Viet Vietnamese)이 모두 나열됨. 한국어 Korean 옆에 파란 점(선택 표시)이 보임. 횡스크롤 탭은 완전히 제거됨. | 통과 |
| 2 | 폰트 ScrollArea에 외곽선 추가 및 높이 수정 | req-02-scrollarea-border.png | 스크린샷 확인: 폰트 목록 ScrollArea에 1px muted 색상 외곽선(border)이 적용됨. rounded-lg로 모서리 둥글게 처리. 높이는 360px로 설정되어 3개 폰트 카드가 보이며 스크롤 가능한 영역 확인. | 통과 |
| 3 | 언어별 폰트 목록 10개씩 총 60개 | req-03-english-fonts.png | 스크린샷 확인: Select에서 English 선택 후 영어 폰트 목록 표시. Inter, Geist, Plus Jakarta Sans 등 10개 영어 폰트가 목록에 나열됨. 각 폰트에 specimen 텍스트("The quick brown fox jumps over the lazy dog")가 해당 폰트로 표시됨. 우측 미리보기도 영어로 전환(Dashboard, Project Settings, Save, Cancel 등). | 통과 |
| 4 | 언어 변경 시 미리보기 텍스트 변경 | req-04-japanese-preview.png | 스크린샷 확인: Select에서 日本語 Japanese 선택 후 우측 미리보기의 모든 텍스트가 일본어로 변경됨. 사이드바 메뉴: ダッシュボード, 受信トレイ, ユーザー, 設定. 폼 섹션: プロジェクト設定, プロジェクト名, カテゴリー, デザイン, メール通知を受け取る, 公開, 進捗, 保存, キャンセル, リセット, 削除. 상단 네비: ホーム > ダッシュボード. 검색: 検索... | 통과 |
| 5 | 타이포그래피 스케일 미리보기 xs~2xl | req-05-typography-scale.png | 스크린샷 확인: 스케일 미리보기에 6개 항목만 표시 - 2xl(Title, 24px), xl(Heading, 20px), lg(Subtitle, 18px), base(Body text, 16px, 파란색 하이라이트), sm(Secondary, 14px), xs(Label, 12px). 4xl 항목은 완전히 제거됨. 각 항목이 서로 다른 의미있는 텍스트로 표시. base 행이 primary/5 배경으로 강조됨. | 통과 |
| 6 | 슬라이더 하단 tick 레이블 위치 정렬 | req-06-slider-ticks.png | 스크린샷 확인: Base 크기 슬라이더 하단에 tick 레이블(12, 14, 16, 18, 20)이 absolute 포지셔닝으로 배치됨. 슬라이더 thumb가 16 위치에 있을 때 "16" 레이블 바로 위에 정확히 위치함. 스케일 대비 슬라이더도 tick(0.8, 1, 1.2, 1.5)이 올바른 비율 위치에 배치됨. | 통과 |
| 7 | 스페이싱 미리보기 버튼 cursor-pointer | req-07-cursor-pointer.png | 스크린샷 확인: 스페이싱 컴포넌트 미리보기에 Small, Default, Large 3개 버튼이 표시됨. 테스트에서 Default 버튼의 computed cursor 스타일이 "pointer"임을 확인(expect(cursor).toBe("pointer") 통과). 모든 버튼에 cursor-pointer 클래스가 적용됨. | 통과 |
| 8 | 라운딩 미리보기 확장 (Button, Input, Card) | req-08-radius-preview.png | 스크린샷 확인: 라운딩 섹션 미리보기에 기존 단일 박스(0.65rem, 10px) 외에 추가 컴포넌트 포함. Button 섹션: Small(outline)과 Default(primary) 2개 버튼에 borderRadius 적용. Input 섹션: "텍스트 입력" placeholder Input에 borderRadius 적용. Card 섹션: "카드 제목"/"카드 설명 텍스트" 내용의 Card에 borderRadius 적용. | 통과 |
| 9 | DesignStyle을 standard/flat/lineless로 재정의 | req-09-design-style.png | 스크린샷 확인: 스타일 섹션에 "디자인 스타일" 라벨 아래 Standard, Flat, Lineless 3개 토글 표시. Standard가 현재 선택됨(파란색 테두리 + primary/5 배경). 하단에 "타겟 플랫폼" 라벨 아래 Web, Tablet, Mobile 3개 토글. Web 선택됨. 기기 드롭다운에 "Desktop 1920 (1920x1080)" 표시. | 통과 |
| 10-a | Standard 스타일 미리보기 | req-10-standard-preview.png | 스크린샷 확인: Standard 스타일 선택 상태. 우측 미리보기에서 Card에 border + shadow 표시, FormSection의 Input에 border 표시, 구분선(Separator) 보임, 버튼에 기본 그림자 유지. sidebar와 content 영역 사이에 border 구분선 존재. | 통과 |
| 10-b | Flat 스타일 미리보기 | req-10-flat-preview.png | 스크린샷 확인: Flat 토글이 선택됨(파란색). 우측 미리보기에서 Standard와 비교 시 그림자가 제거됨. Card는 border만 유지. Input도 border만 유지, shadow 없음. 1px 선으로만 구분되는 Flat UI 스타일. | 통과 |
| 10-c | Lineless 스타일 미리보기 | req-10-lineless-preview.png | 스크린샷 확인: Lineless 토글이 선택됨(파란색). 우측 미리보기에서 FormSection의 Card border가 제거되고 bg-muted 배경으로만 구분됨. 취소 버튼이 fill 스타일로 변경(border 없음). Input도 border 없이 배경색으로만 표시. 검색 Input의 border도 약해짐. 전체적으로 선 없이 면으로만 구분하는 미니멀 스타일. | 통과 |
| 11 | PlatformTarget web/tablet/mobile + 기기 드롭다운 | req-11-platform-device.png | 스크린샷 확인: Mobile 플랫폼 선택 후 기기 드롭다운이 열린 상태. 4개 기기 옵션 표시: iPhone SE (375x667, 체크 표시로 현재 선택), iPhone 12 (390x844), iPhone 16 Pro (393x852), iPhone 16 Pro Max (430x932). 우측 미리보기가 모바일 레이아웃(사이드바 숨김, 햄버거 메뉴, 세로 폼 레이아웃)으로 전환됨. 상단 라벨에 "iPhone SE (375x667)" 표시. | 통과 |
| 12-a | Web 레이아웃 | req-12-web-layout.png | 스크린샷 확인: Web 플랫폼 기본 상태. Desktop 1920 (1920x1080) 뷰포트. 사이드바 전체 표시(대시보드, 받은편지함, 사용자, 설정 + 아이콘), 검색 Input, 우측 FormSection에 2열 그리드(프로젝트 이름/카테고리). 하단에 사용자 프로필(Brian, admin). | 통과 |
| 12-b | Tablet 레이아웃 | req-12-tablet-layout.png | 스크린샷 확인: Tablet 플랫폼 선택, iPad Mini (768x1024) 뷰포트. 사이드바가 축소됨(검색 Input 없음, 아이콘+라벨만 표시, 폭 200px). FormSection은 2열 그리드 유지(프로젝트 이름/카테고리). 전체적으로 Web보다 좁지만 Mobile보다 여유있는 레이아웃. 하단 사용자 프로필 축소 표시. | 통과 |
| 12-c | Mobile 레이아웃 | req-12-mobile-layout.png | 스크린샷 확인: Mobile 플랫폼 선택, iPhone SE (375x667) 뷰포트. 사이드바 완전히 숨겨지고 상단에 햄버거 메뉴 아이콘 표시. FormSection이 세로 1열 레이아웃으로 변경(프로젝트 이름, 카테고리가 세로 배치). 버튼도 세로 정렬. 전체적으로 좁은 모바일 화면에 최적화된 레이아웃. | 통과 |

## 디자인 검증
| 모드 | 스크린샷 | 결과 |
|------|----------|------|
| Light | light-mode.png | 통과 - 밝은 배경에 모든 UI 요소 정상 표시, 텍스트 가독성 양호 |
| Dark | dark-mode.png | 통과 - 어두운 배경으로 전환, 사이드바/폰트 목록/미리보기 모두 다크 테마 적용, 컬러 대비 정상 |

## 수정 이력
| 회차 | REQ | 문제 | 수정 내용 | 재확인 |
|------|-----|------|----------|--------|
| - | - | - | 수정 없이 전 항목 통과 | - |

## 결과
통과: 19 passed, 0 failed
- 런타임 에러: 0개
- 요구사항 스크린샷: 15개 (REQ 1-12, REQ 10은 3장, REQ 12는 3장) + 디자인 검증 2장 + 페이지 로드 1장 = 총 18개 스크린샷 (시각적 확인 완료)
