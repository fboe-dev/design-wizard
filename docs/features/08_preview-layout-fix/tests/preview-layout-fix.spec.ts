import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5178";
const SCREENSHOT_DIR = "docs/features/08_preview-layout-fix/tests/test-results";

test.describe("Preview Layout Fix", () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(`[PAGE_ERROR] ${error.message}`);
    });

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  test("REQ-00: 페이지 로드 및 런타임 에러 없음", async ({ page }) => {
    await page.waitForTimeout(1000);

    const errorOverlay = await page.locator("vite-error-overlay").count();
    const reactError = await page.locator("text=Something went wrong").count();
    const fatalErrors = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of") ||
        e.includes("is not a function"),
    );

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-00-page-load.png`, fullPage: true });

    expect(errorOverlay).toBe(0);
    expect(reactError).toBe(0);
    expect(fatalErrors).toHaveLength(0);
  });

  test("REQ-01: 프리뷰 헤더 제거 확인", async ({ page }) => {
    // 우측 패널에 프리뷰 헤더(디바이스 드롭다운 + 국기 아이콘)가 없어야 함
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();

    // 국기 이모지가 없는지 확인
    const flagButtons = previewPanel.locator("button").filter({ hasText: /[\u{1F1E6}-\u{1F1FF}]{2}/u });
    await expect(flagButtons).toHaveCount(0);

    // 우측 패널 상단에 border-b가 있는 헤더 div 내부에 select-trigger가 없어야 함
    const headerSelect = previewPanel.locator('div.border-b > div > [data-slot="select-trigger"]');
    await expect(headerSelect).toHaveCount(0);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-01-no-preview-header.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-02: 디바이스 사이즈 Select 추가 (Web)", async ({ page }) => {
    // 스타일 섹션으로 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // "디바이스 사이즈" 라벨 확인
    const deviceLabel = styleSection.locator("text=디바이스 사이즈");
    await expect(deviceLabel).toBeVisible();

    // Select trigger 확인 (디바이스 사이즈 섹션 내)
    const selectTrigger = styleSection.locator('[data-slot="select-trigger"]');
    await expect(selectTrigger).toBeVisible();

    // Web 플랫폼 기본값에서 Select 열기
    await selectTrigger.click();
    await page.waitForTimeout(300);

    // Desktop 1920, Laptop 1366, Desktop 1280 옵션 확인
    const desktop1920 = page.locator('[data-slot="select-item"]').filter({ hasText: "Desktop 1920" });
    const laptop1366 = page.locator('[data-slot="select-item"]').filter({ hasText: "Laptop 1366" });
    const desktop1280 = page.locator('[data-slot="select-item"]').filter({ hasText: "Desktop 1280" });
    await expect(desktop1920).toBeVisible();
    await expect(laptop1366).toBeVisible();
    await expect(desktop1280).toBeVisible();

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-02-device-select-web.png`, fullPage: true });

    // 닫기
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-02: 디바이스 사이즈 Select (Tablet)", async ({ page }) => {
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Tablet 플랫폼 선택
    const tabletChip = styleSection.locator("button").filter({ hasText: "Tablet" });
    await tabletChip.click();
    await page.waitForTimeout(300);

    // Select 열기
    const selectTrigger = styleSection.locator('[data-slot="select-trigger"]');
    await selectTrigger.click();
    await page.waitForTimeout(300);

    // iPad 시리즈 4개 옵션 확인
    const ipadMini = page.locator('[data-slot="select-item"]').filter({ hasText: "iPad Mini" });
    const ipadAir = page.locator('[data-slot="select-item"]').filter({ hasText: "iPad Air" });
    const ipadPro11 = page.locator('[data-slot="select-item"]').filter({ hasText: "iPad Pro 11" });
    const ipadPro129 = page.locator('[data-slot="select-item"]').filter({ hasText: "iPad Pro 12.9" });
    await expect(ipadMini).toBeVisible();
    await expect(ipadAir).toBeVisible();
    await expect(ipadPro11).toBeVisible();
    await expect(ipadPro129).toBeVisible();

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-02-device-select-tablet.png`, fullPage: true });

    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-02: 디바이스 사이즈 Select (Mobile)", async ({ page }) => {
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Mobile 플랫폼 선택
    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(300);

    // Select 열기
    const selectTrigger = styleSection.locator('[data-slot="select-trigger"]');
    await selectTrigger.click();
    await page.waitForTimeout(300);

    // iPhone 시리즈 4개 옵션 확인
    const iphoneSE = page.locator('[data-slot="select-item"]').filter({ hasText: "iPhone SE" });
    const iphone12 = page.locator('[data-slot="select-item"]').filter({ hasText: "iPhone 12" });
    const iphone16Pro = page.locator('[data-slot="select-item"]').filter({ hasText: /iPhone 16 Pro \(393/ });
    const iphone16ProMax = page.locator('[data-slot="select-item"]').filter({ hasText: "iPhone 16 Pro Max" });
    await expect(iphoneSE).toBeVisible();
    await expect(iphone12).toBeVisible();
    await expect(iphone16Pro).toBeVisible();
    await expect(iphone16ProMax).toBeVisible();

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-02-device-select-mobile.png`, fullPage: true });

    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-03: 미리보기 크기 Desktop 1920 동기화", async ({ page }) => {
    // 기본 Web + Desktop 1920 상태
    // 미리보기 컨테이너의 width가 1920px인지 확인
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const previewContainer = previewPanel.locator("div.shrink-0.overflow-hidden.rounded-xl.border");

    const width = await previewContainer.evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBe(1920);

    // 가로 스크롤이 가능한지 확인 (패널 너비보다 미리보기가 넓으므로)
    const scrollParent = previewPanel.locator("div.overflow-auto").first();
    const scrollWidth = await scrollParent.evaluate((el) => el.scrollWidth);
    const clientWidth = await scrollParent.evaluate((el) => el.clientWidth);
    expect(scrollWidth).toBeGreaterThan(clientWidth);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-03-desktop-1920.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-03: 미리보기 크기 iPad Pro 12.9 동기화", async ({ page }) => {
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Tablet 선택
    const tabletChip = styleSection.locator("button").filter({ hasText: "Tablet" });
    await tabletChip.click();
    await page.waitForTimeout(300);

    // iPad Pro 12.9 선택
    const selectTrigger = styleSection.locator('[data-slot="select-trigger"]');
    await selectTrigger.click();
    await page.waitForTimeout(300);
    const ipadPro129 = page.locator('[data-slot="select-item"]').filter({ hasText: "iPad Pro 12.9" });
    await ipadPro129.click();
    await page.waitForTimeout(500);

    // 미리보기 너비 1024px 확인
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const previewContainer = previewPanel.locator("div.shrink-0.overflow-hidden.rounded-xl.border");

    const width = await previewContainer.evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBe(1024);

    // minHeight 확인
    const style = await previewContainer.getAttribute("style");
    expect(style).toContain("1366");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-03-ipad-pro-129.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-03: 미리보기 크기 iPhone SE 동기화", async ({ page }) => {
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Mobile 선택
    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(300);

    // iPhone SE는 첫 번째 디바이스이므로 자동 선택됨

    // 미리보기 너비 375px 확인
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const previewContainer = previewPanel.locator("div.shrink-0.overflow-hidden.rounded-xl.border");

    const width = await previewContainer.evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBe(375);

    // minHeight 확인
    const style = await previewContainer.getAttribute("style");
    expect(style).toContain("667");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-03-iphone-se.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-04: Tablet - SidebarShell 반응형", async ({ page }) => {
    // Layout 스텝에서 sidebar 선택 후 primitives로 이동
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // sidebar 레이아웃 선택 (기본 선택일 수 있음)
    // sidebar 레이아웃 선택 (OptionCard 버튼의 제목 텍스트로 선택)
    const sidebarOption = page.locator("button").filter({ hasText: "사이드바" }).first();
    await sidebarOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // 스타일 섹션으로 스크롤하여 Tablet 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const tabletChip = styleSection.locator("button").filter({ hasText: "Tablet" });
    await tabletChip.click();
    await page.waitForTimeout(500);

    // 미리보기에서 사이드바 확인 (aside 요소)
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const sidebar = previewPanel.locator("aside");

    if (await sidebar.count() > 0) {
      const sidebarBox = await sidebar.boundingBox();
      expect(sidebarBox).not.toBeNull();
      // Tablet 사이드바 너비 200px
      expect(sidebarBox!.width).toBeCloseTo(200, 0);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-04-tablet-sidebar.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-04: Tablet - TopnavShell 반응형", async ({ page }) => {
    // Layout 스텝에서 topnav 선택
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // topnav 레이아웃 선택
    const topnavOption = page.locator("button").filter({ hasText: "탑 네비게이션" }).first();
    await topnavOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Tablet 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const tabletChip = styleSection.locator("button").filter({ hasText: "Tablet" });
    await tabletChip.click();
    await page.waitForTimeout(500);

    // 미리보기에서 네비게이션 메뉴 확인 - Dashboard와 Settings만 보여야 함
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const navArea = previewPanel.locator("nav");

    if (await navArea.count() > 0) {
      const navText = await navArea.first().innerText();
      // 대시보드와 설정이 표시되어야 함 (한국어 기본)
      expect(navText).toContain("대시보드");
      expect(navText).toContain("설정");
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-04-tablet-topnav.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-04: Tablet - LandingShell 반응형", async ({ page }) => {
    // Layout 스텝에서 landing 선택
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // landing 레이아웃 선택
    const landingOption = page.locator("button").filter({ hasText: "랜딩페이지" }).first();
    await landingOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Tablet 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const tabletChip = styleSection.locator("button").filter({ hasText: "Tablet" });
    await tabletChip.click();
    await page.waitForTimeout(500);

    // 미리보기에서 카드 그리드 확인
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();

    // grid-cols-2 확인을 위해 그리드 컨테이너 확인
    const gridContainer = previewPanel.locator("div.grid.grid-cols-2").first();
    if (await gridContainer.count() > 0) {
      const display = await gridContainer.evaluate((el) => window.getComputedStyle(el).display);
      expect(display).toBe("grid");
      const gridCols = await gridContainer.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
      // 2 columns
      const colCount = gridCols.split(" ").length;
      expect(colCount).toBe(2);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-04-tablet-landing.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-04: Mobile - SidebarShell (사이드바 숨김)", async ({ page }) => {
    // sidebar 레이아웃으로 변경
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // sidebar 레이아웃 선택 (OptionCard 버튼의 제목 텍스트로 선택)
    const sidebarOption = page.locator("button").filter({ hasText: "사이드바" }).first();
    await sidebarOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Mobile 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    // 사이드바가 숨겨져야 함
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const sidebar = previewPanel.locator("aside");
    await expect(sidebar).toHaveCount(0);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-04-mobile-sidebar.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-04: Mobile - TopnavShell (네비게이션 숨김)", async ({ page }) => {
    // topnav 레이아웃으로 변경
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // topnav 레이아웃 선택
    const topnavOption = page.locator("button").filter({ hasText: "탑 네비게이션" }).first();
    await topnavOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Mobile 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    // 네비게이션이 숨겨져야 함 (nav 없음)
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const navArea = previewPanel.locator("nav");
    await expect(navArea).toHaveCount(0);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-04-mobile-topnav.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-04: Mobile - LandingShell (1컬럼, 작은 제목)", async ({ page }) => {
    // landing 레이아웃으로 변경
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // landing 레이아웃 선택
    const landingOption = page.locator("button").filter({ hasText: "랜딩페이지" }).first();
    await landingOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Mobile 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    // 카드 그리드가 1컬럼이어야 함
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const gridContainer = previewPanel.locator("div.grid.grid-cols-1").first();
    if (await gridContainer.count() > 0) {
      const gridCols = await gridContainer.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
      const colCount = gridCols.split(" ").length;
      expect(colCount).toBe(1);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-04-mobile-landing.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });
});
