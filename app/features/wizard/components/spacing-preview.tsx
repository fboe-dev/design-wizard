import type { AppShellLayout, PageLayout } from "../types";

interface SpacingPreviewProps {
  baseUnit: number;
  appShellLayout: AppShellLayout;
  pageLayout: PageLayout;
}

export function SpacingPreview({ baseUnit, appShellLayout, pageLayout }: SpacingPreviewProps) {
  const s = (n: number) => baseUnit * n;

  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden" style={{ fontSize: "11px" }}>
      {appShellLayout === "sidebar" && (
        <div className="flex h-[360px]">
          {/* 사이드바 */}
          <SidebarMock s={s} />
          {/* 메인 */}
          <div className="flex-1 flex flex-col min-w-0 border-l border-border">
            <TopbarMock s={s} />
            <div className="flex-1 overflow-auto" style={{ padding: `${s(4)}px` }}>
              <PageContent s={s} pageLayout={pageLayout} />
            </div>
          </div>
        </div>
      )}

      {appShellLayout === "topnav" && (
        <div className="flex flex-col h-[360px]">
          <TopnavMock s={s} />
          <div className="flex-1 overflow-auto" style={{ padding: `${s(5)}px ${s(6)}px` }}>
            <PageContent s={s} pageLayout={pageLayout} />
          </div>
        </div>
      )}

      {appShellLayout === "dock" && (
        <div className="flex flex-col h-[360px]">
          <MiniHeaderMock s={s} />
          <div className="flex-1 overflow-auto" style={{ padding: `${s(4)}px` }}>
            <PageContent s={s} pageLayout={pageLayout} />
          </div>
          <DockMock s={s} />
        </div>
      )}
    </div>
  );
}

// ── 공통 미니 컴포넌트 ──

function SidebarMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="w-[160px] shrink-0 bg-muted/30 flex flex-col" style={{ padding: `${s(3)}px` }}>
      {/* 로고 */}
      <div className="flex items-center" style={{ gap: `${s(2)}px`, marginBottom: `${s(4)}px` }}>
        <div className="h-6 w-6 rounded bg-primary/20" />
        <div className="h-2.5 w-16 rounded bg-foreground/15" />
      </div>
      {/* 메뉴 그룹 1 */}
      <div className="text-[9px] font-medium text-muted-foreground/60 uppercase" style={{ marginBottom: `${s(1)}px` }}>Menu</div>
      <div className="flex flex-col" style={{ gap: `${s(1)}px` }}>
        <MenuItem s={s} active />
        <MenuItem s={s} />
        <MenuItem s={s} />
      </div>
      {/* 메뉴 그룹 2 */}
      <div className="text-[9px] font-medium text-muted-foreground/60 uppercase" style={{ marginTop: `${s(4)}px`, marginBottom: `${s(1)}px` }}>Settings</div>
      <div className="flex flex-col" style={{ gap: `${s(1)}px` }}>
        <MenuItem s={s} />
        <MenuItem s={s} />
      </div>
      {/* 유저 */}
      <div className="mt-auto flex items-center border-t border-border" style={{ gap: `${s(2)}px`, paddingTop: `${s(3)}px` }}>
        <div className="h-5 w-5 rounded-full bg-primary/20" />
        <div className="h-2 w-12 rounded bg-foreground/10" />
      </div>
    </div>
  );
}

function MenuItem({ s, active }: { s: (n: number) => number; active?: boolean }) {
  return (
    <div
      className={`flex items-center rounded ${active ? "bg-primary/10" : ""}`}
      style={{ gap: `${s(2)}px`, padding: `${s(1.5)}px ${s(2)}px` }}
    >
      <div className={`h-3 w-3 rounded ${active ? "bg-primary/40" : "bg-foreground/10"}`} />
      <div className={`h-2 w-14 rounded ${active ? "bg-primary/30" : "bg-foreground/10"}`} />
    </div>
  );
}

function TopbarMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="flex items-center justify-between border-b border-border" style={{ padding: `${s(2)}px ${s(4)}px` }}>
      <div className="flex items-center" style={{ gap: `${s(1)}px` }}>
        <div className="h-2 w-10 rounded bg-foreground/10" />
        <div className="text-muted-foreground/30">/</div>
        <div className="h-2 w-14 rounded bg-foreground/15" />
      </div>
      <div className="flex items-center" style={{ gap: `${s(2)}px` }}>
        <div className="h-4 w-4 rounded bg-foreground/8" />
        <div className="h-4 w-4 rounded bg-foreground/8" />
      </div>
    </div>
  );
}

function TopnavMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="flex items-center justify-between border-b border-border" style={{ padding: `${s(2)}px ${s(5)}px` }}>
      <div className="flex items-center" style={{ gap: `${s(4)}px` }}>
        <div className="flex items-center" style={{ gap: `${s(2)}px` }}>
          <div className="h-5 w-5 rounded bg-primary/20" />
          <div className="h-2.5 w-14 rounded bg-foreground/15" />
        </div>
        <div className="flex items-center" style={{ gap: `${s(3)}px` }}>
          <div className="h-2 w-10 rounded bg-primary/25" />
          <div className="h-2 w-10 rounded bg-foreground/10" />
          <div className="h-2 w-10 rounded bg-foreground/10" />
        </div>
      </div>
      <div className="flex items-center" style={{ gap: `${s(2)}px` }}>
        <div className="h-4 w-4 rounded bg-foreground/8" />
        <div className="h-5 w-5 rounded-full bg-primary/20" />
      </div>
    </div>
  );
}

function MiniHeaderMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="flex items-center justify-between border-b border-border" style={{ padding: `${s(2)}px ${s(3)}px` }}>
      <div className="flex items-center" style={{ gap: `${s(2)}px` }}>
        <div className="h-5 w-5 rounded bg-primary/20" />
        <div className="h-2.5 w-16 rounded bg-foreground/15" />
      </div>
      <div className="h-4 w-4 rounded bg-foreground/8" />
    </div>
  );
}

function DockMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="flex items-center justify-center border-t border-border" style={{ padding: `${s(2)}px` }}>
      <div className="flex items-center rounded-full bg-muted/50" style={{ gap: `${s(3)}px`, padding: `${s(1.5)}px ${s(4)}px` }}>
        {[true, false, false, false, false].map((active, i) => (
          <div key={i} className={`h-4 w-4 rounded-md ${active ? "bg-primary/30" : "bg-foreground/10"}`} />
        ))}
      </div>
    </div>
  );
}

// ── 페이지 콘텐츠 (pageLayout별) ──

function PageContent({ s, pageLayout }: { s: (n: number) => number; pageLayout: PageLayout }) {
  switch (pageLayout) {
    case "simple-page":
      return <SimplePageMock s={s} />;
    case "tab-page":
      return <TabPageMock s={s} />;
    case "sidebar-page":
      return <InnerSidebarMock s={s} />;
    case "dashboard-grid":
      return <DashboardGridMock s={s} />;
    default:
      return <SimplePageMock s={s} />;
  }
}

function SimplePageMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="flex flex-col" style={{ gap: `${s(4)}px` }}>
      {/* 페이지 헤더 */}
      <PageHeaderMock s={s} />
      {/* 폼 영역 */}
      <div className="rounded-md border border-border" style={{ padding: `${s(4)}px` }}>
        <div className="flex flex-col" style={{ gap: `${s(3)}px` }}>
          <InputRowMock s={s} label="이름" />
          <InputRowMock s={s} label="이메일" />
          <div className="flex" style={{ gap: `${s(2)}px` }}>
            <ButtonMock s={s} primary label="저장" />
            <ButtonMock s={s} label="취소" />
          </div>
        </div>
      </div>
      {/* 카드 목록 */}
      <div className="flex flex-col" style={{ gap: `${s(3)}px` }}>
        <CardMock s={s} />
        <CardMock s={s} />
      </div>
    </div>
  );
}

function TabPageMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="flex flex-col" style={{ gap: `${s(4)}px` }}>
      <PageHeaderMock s={s} />
      {/* 탭 바 */}
      <div className="flex border-b border-border" style={{ gap: `${s(1)}px` }}>
        {["일반", "고급", "알림"].map((tab, i) => (
          <div
            key={tab}
            className={`text-[10px] font-medium ${i === 0 ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            style={{ padding: `${s(1.5)}px ${s(3)}px` }}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* 탭 내용 */}
      <div className="flex flex-col" style={{ gap: `${s(3)}px` }}>
        <div className="rounded-md border border-border" style={{ padding: `${s(3)}px` }}>
          <div className="flex flex-col" style={{ gap: `${s(3)}px` }}>
            <InputRowMock s={s} label="프로젝트 이름" />
            <InputRowMock s={s} label="설명" />
          </div>
        </div>
        <div className="flex" style={{ gap: `${s(2)}px`, justifyContent: "flex-end" }}>
          <ButtonMock s={s} label="초기화" />
          <ButtonMock s={s} primary label="저장" />
        </div>
      </div>
    </div>
  );
}

function InnerSidebarMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="flex" style={{ gap: `${s(4)}px` }}>
      {/* 2차 사이드바 */}
      <div className="w-[100px] shrink-0 flex flex-col" style={{ gap: `${s(1)}px` }}>
        {["프로필", "보안", "알림", "연동"].map((item, i) => (
          <div
            key={item}
            className={`text-[10px] rounded ${i === 0 ? "bg-muted font-medium" : "text-muted-foreground"}`}
            style={{ padding: `${s(1.5)}px ${s(2)}px` }}
          >
            {item}
          </div>
        ))}
      </div>
      {/* 콘텐츠 */}
      <div className="flex-1 flex flex-col" style={{ gap: `${s(4)}px` }}>
        <div>
          <div className="h-3 w-20 rounded bg-foreground/15" style={{ marginBottom: `${s(1)}px` }} />
          <div className="h-2 w-40 rounded bg-foreground/8" />
        </div>
        <div className="rounded-md border border-border" style={{ padding: `${s(3)}px` }}>
          <div className="flex flex-col" style={{ gap: `${s(3)}px` }}>
            <InputRowMock s={s} label="표시 이름" />
            <InputRowMock s={s} label="이메일" />
            <div className="flex items-center" style={{ gap: `${s(2)}px` }}>
              <div className="h-3 w-3 rounded border border-border bg-primary/20" />
              <div className="h-2 w-24 rounded bg-foreground/10 text-[9px]" />
            </div>
            <ButtonMock s={s} primary label="변경 사항 저장" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardGridMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="flex flex-col" style={{ gap: `${s(4)}px` }}>
      <PageHeaderMock s={s} />
      {/* 통계 카드 */}
      <div className="grid grid-cols-3" style={{ gap: `${s(3)}px` }}>
        {["사용자", "매출", "주문"].map((label) => (
          <div key={label} className="rounded-md border border-border" style={{ padding: `${s(3)}px` }}>
            <div className="text-[9px] text-muted-foreground" style={{ marginBottom: `${s(1)}px` }}>{label}</div>
            <div className="h-3 w-12 rounded bg-foreground/15" />
          </div>
        ))}
      </div>
      {/* 차트 + 리스트 */}
      <div className="grid grid-cols-3" style={{ gap: `${s(3)}px` }}>
        <div className="col-span-2 rounded-md border border-border" style={{ padding: `${s(3)}px` }}>
          <div className="h-2.5 w-14 rounded bg-foreground/12" style={{ marginBottom: `${s(2)}px` }} />
          <div className="h-24 rounded bg-muted/50" />
        </div>
        <div className="rounded-md border border-border" style={{ padding: `${s(3)}px` }}>
          <div className="h-2.5 w-14 rounded bg-foreground/12" style={{ marginBottom: `${s(2)}px` }} />
          <div className="flex flex-col" style={{ gap: `${s(2)}px` }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center" style={{ gap: `${s(2)}px` }}>
                <div className="h-4 w-4 rounded-full bg-primary/15 shrink-0" />
                <div className="flex-1">
                  <div className="h-2 w-full rounded bg-foreground/8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 재사용 미니 컴포넌트 ──

function PageHeaderMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="h-3 w-24 rounded bg-foreground/15" style={{ marginBottom: `${s(1)}px` }} />
        <div className="h-2 w-40 rounded bg-foreground/8" />
      </div>
      <ButtonMock s={s} primary label="추가" />
    </div>
  );
}

function InputRowMock({ s, label }: { s: (n: number) => number; label: string }) {
  return (
    <div className="flex flex-col" style={{ gap: `${s(1)}px` }}>
      <div className="text-[9px] font-medium text-foreground/50">{label}</div>
      <div className="h-6 rounded-md border border-input bg-background" style={{ padding: `0 ${s(2)}px` }} />
    </div>
  );
}

function ButtonMock({ s, primary, label }: { s: (n: number) => number; primary?: boolean; label: string }) {
  return (
    <div
      className={`rounded-md text-[10px] font-medium ${primary ? "bg-primary/20 text-primary" : "border border-border text-foreground/60"}`}
      style={{ padding: `${s(1)}px ${s(3)}px` }}
    >
      {label}
    </div>
  );
}

function CardMock({ s }: { s: (n: number) => number }) {
  return (
    <div className="rounded-md border border-border" style={{ padding: `${s(3)}px` }}>
      <div className="flex items-start" style={{ gap: `${s(3)}px` }}>
        <div className="h-8 w-8 shrink-0 rounded-md bg-primary/10" />
        <div className="flex-1 flex flex-col" style={{ gap: `${s(1)}px` }}>
          <div className="h-2.5 w-24 rounded bg-foreground/12" />
          <div className="h-2 w-full rounded bg-foreground/6" />
          <div className="flex" style={{ gap: `${s(2)}px`, marginTop: `${s(1)}px` }}>
            <div className="rounded-full bg-muted text-[8px] text-muted-foreground" style={{ padding: `${s(0.5)}px ${s(1.5)}px` }}>태그</div>
            <div className="rounded-full bg-muted text-[8px] text-muted-foreground" style={{ padding: `${s(0.5)}px ${s(1.5)}px` }}>뱃지</div>
          </div>
        </div>
      </div>
    </div>
  );
}
