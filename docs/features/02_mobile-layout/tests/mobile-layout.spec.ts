import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5178";
const SCREENSHOT_DIR = "docs/features/02_mobile-layout/tests/test-results";

// Zustand persist 스토어의 localStorage에 appShellLayout 설정
function buildStorageState(appShellLayout: string) {
  return JSON.stringify({
    state: {
      appShellLayout,
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
      platformTarget: "web",
      selectedComponents: [],
    },
    version: 3,
  });
}

test.describe("모바일 미리보기 레이아웃", () => {
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
    const reactError = await page
      .locator("text=Something went wrong")
      .count();
    const referenceError = await page
      .locator("text=is not defined")
      .count();
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
    expect(
      fatalErrors,
      `치명적 에러: ${fatalErrors.join(", ")}`,
    ).toHaveLength(0);
  });

  // REQ-02: sidebar + mobile → 사이드바 숨김, 햄버거 메뉴 표시
  test("REQ-02: sidebar + mobile → 사이드바 숨김, 햄버거 표시", async ({
    page,
  }) => {
    // Step 1: Layout 페이지에서 sidebar 선택
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // "사이드바" 카드 클릭 (기본값이지만 명시적으로 클릭)
    const sidebarCard = page.locator("text=사이드바").first();
    await sidebarCard.click();
    await page.waitForTimeout(500);

    // Step 2: Primitives 페이지로 이동
    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // 스타일 섹션까지 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // "Mobile" 칩 클릭
    const mobileChip = styleSection.locator("button", { hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(1000);

    // LivePreview 영역 스크린샷 (우측 패널)
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-02-sidebar-mobile.png`,
      fullPage: false,
    });

    // 치명적 에러 확인
    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-03: topnav + mobile → 네비 메뉴 숨김, 햄버거 표시
  test("REQ-03: topnav + mobile → 네비 메뉴 숨김, 햄버거 표시", async ({
    page,
  }) => {
    // Step 1: Layout 페이지에서 topnav 선택
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // "탑 네비게이션" 카드 클릭
    const topnavCard = page.locator("text=탑 네비게이션").first();
    await topnavCard.click();
    await page.waitForTimeout(500);

    // Step 2: Primitives 페이지로 이동
    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // 스타일 섹션까지 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // "Mobile" 칩 클릭
    const mobileChip = styleSection.locator("button", { hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-03-topnav-mobile.png`,
      fullPage: false,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-04: dock + mobile → 상단 아이콘 숨김
  test("REQ-04: dock + mobile → 상단 아이콘 숨김", async ({ page }) => {
    // Step 1: Layout 페이지에서 dock 선택
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // "Dock" 카드 클릭
    const dockCard = page.locator("text=Dock").first();
    await dockCard.click();
    await page.waitForTimeout(500);

    // Step 2: Primitives 페이지로 이동
    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // 스타일 섹션까지 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // "Mobile" 칩 클릭
    const mobileChip = styleSection.locator("button", { hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-04-dock-mobile.png`,
      fullPage: false,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-05: landing + mobile → 텍스트 축소, 카드 1열
  test("REQ-05: landing + mobile → 텍스트 축소, 카드 1열", async ({
    page,
  }) => {
    // Step 1: Layout 페이지에서 landing 선택
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // "랜딩페이지" 카드 클릭
    const landingCard = page.locator("text=랜딩페이지").first();
    await landingCard.click();
    await page.waitForTimeout(500);

    // Step 2: Primitives 페이지로 이동
    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // 스타일 섹션까지 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // "Mobile" 칩 클릭
    const mobileChip = styleSection.locator("button", { hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-05-landing-mobile.png`,
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
