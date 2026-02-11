import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5178";
const SCREENSHOT_DIR = "docs/features/03_mobile-content/tests/test-results";

// Zustand persist 스토어의 localStorage 설정 헬퍼
function buildStorageState(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    state: {
      appShellLayout: "sidebar",
      pageLayout: "simple-page",
      font: {
        fontFamily: "Pretendard",
        fontCdnUrl:
          "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css",
      },
      typography: { baseSize: 16, scaleRatio: 1.0 },
      spacing: { baseUnit: 4 },
      radius: { baseRadius: 0.65, levels: 5 },
      color: {
        primaryHue: 260,
        primaryChroma: 0.214,
        primaryLightness: 0.623,
        neutralBase: "neutral",
      },
      designStyle: "mixed",
      platformTarget: "mobile",
      selectedComponents: [],
      ...overrides,
    },
    version: 3,
  });
}

// 공통: primitives 페이지로 이동 후 Mobile 플랫폼이 선택된 상태에서 미리보기 확인
async function setupMobilePreview(
  page: import("@playwright/test").Page,
  pageLayout: string,
) {
  // localStorage에 pageLayout + platformTarget=mobile 설정
  await page.addInitScript(
    (args: { storageState: string }) => {
      localStorage.setItem("design-wizard-state", args.storageState);
    },
    { storageState: buildStorageState({ pageLayout, platformTarget: "mobile" }) },
  );

  await page.goto(`${BASE_URL}/wizard/primitives`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
}

// 프리뷰 프레임 내부의 스크롤 가능한 콘텐츠 영역을 아래로 스크롤
async function scrollPreviewContent(page: import("@playwright/test").Page, scrollY: number) {
  // LivePreview 내부의 overflow-auto 컨테이너를 찾아서 스크롤
  const previewScrollable = page.locator(".overflow-hidden.rounded-xl.border .overflow-auto").first();
  await previewScrollable.evaluate((el, y) => {
    el.scrollTop = y;
  }, scrollY);
  await page.waitForTimeout(500);
}

test.describe("모바일 내부 콘텐츠 레이아웃", () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(`[PAGE_ERROR] ${error.message}`);
    });
  });

  // REQ-00: 페이지 로드 + 런타임 에러 없음
  test("REQ-00: 페이지 로드 및 런타임 에러 없음", async ({ page }) => {
    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    const errorOverlay = await page.locator("vite-error-overlay").count();
    const reactError = await page.locator("text=Something went wrong").count();
    const referenceError = await page.locator("text=is not defined").count();
    const fatalErrors = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of") ||
        e.includes("is not a function") ||
        e.includes("Unexpected token") ||
        e.includes("ChunkLoadError"),
    );

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-00-page-load.png`,
      fullPage: true,
    });

    expect(errorOverlay, "Vite 에러 오버레이").toBe(0);
    expect(reactError, "React 에러 바운더리").toBe(0);
    expect(referenceError, "'is not defined' 에러").toBe(0);
    expect(fatalErrors, `치명적 에러: ${fatalErrors.join(", ")}`).toHaveLength(0);
  });

  // REQ-02: FormSection 모바일 (simple-page) - 인풋 세로 1열 배치
  test("REQ-02: FormSection 모바일 - 인풋 세로 1열 배치", async ({ page }) => {
    await setupMobilePreview(page, "simple-page");

    // 스타일 섹션까지 스크롤하여 Mobile 프리뷰 확인
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-02-form-mobile.png`,
      fullPage: false,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-03: StatsCards 모바일 (tab-page) - 통계 카드 세로 1열 배치
  test("REQ-03: StatsCards 모바일 - 통계 카드 세로 1열 배치", async ({ page }) => {
    await setupMobilePreview(page, "tab-page");

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-03-stats-mobile.png`,
      fullPage: false,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-04: DashboardGridContent 모바일 (dashboard-grid) - ProjectCards/MembersTable 세로 1열
  test("REQ-04: DashboardGridContent 모바일 - 세로 1열 배치", async ({ page }) => {
    await setupMobilePreview(page, "dashboard-grid");

    // 프리뷰 내부를 스크롤해서 StatsCards 아래의 ProjectCards/MembersTable 영역이 보이게 함
    await scrollPreviewContent(page, 400);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-04-dashboard-mobile.png`,
      fullPage: false,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-05: SidebarPageContent 모바일 (sidebar-page) - 내부 사이드바 숨김
  test("REQ-05: SidebarPageContent 모바일 - 내부 사이드바 숨김", async ({ page }) => {
    await setupMobilePreview(page, "sidebar-page");

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-05-sidebar-page-mobile.png`,
      fullPage: false,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-06: MembersTable 모바일 (tab-page 멤버 탭) - 이메일 컬럼 숨김
  test("REQ-06: MembersTable 모바일 - 이메일 컬럼 숨김", async ({ page }) => {
    await setupMobilePreview(page, "tab-page");

    // 미리보기 내부의 "멤버" 탭 클릭
    const previewFrame = page.locator(".overflow-hidden.rounded-xl.border");
    const membersTab = previewFrame.locator("button[role='tab']", { hasText: "멤버" });
    await membersTab.click();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-06-members-mobile.png`,
      fullPage: false,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-07: ProjectCards 모바일 (tab-page 개요 탭) - 제목/설명 위, 진행률 바 아래
  test("REQ-07: ProjectCards 모바일 - 세로 배치", async ({ page }) => {
    await setupMobilePreview(page, "tab-page");

    // 개요 탭은 기본 선택 상태이므로 별도 클릭 불필요
    // 프리뷰 내부를 스크롤해서 StatsCards 아래의 ProjectCards 영역이 보이게 함
    await scrollPreviewContent(page, 350);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-07-projects-mobile.png`,
      fullPage: false,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });
});
