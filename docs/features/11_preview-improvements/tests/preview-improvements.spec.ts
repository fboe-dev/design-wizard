import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5178";
const SCREENSHOT_DIR = "docs/features/11_preview-improvements/tests/screenshots";

test.describe("Preview Improvements - Step 2 Primitives", () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(`[PAGE_ERROR] ${error.message}`);
    });

    // localStorage 초기화하여 기본값 사용
    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.evaluate(() => localStorage.removeItem("design-wizard-state"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  // ── REQ-1: 웹 스크롤 정렬 ──

  test("REQ-1: Web 목업이 좁은 패널에서 좌측 잘림 없이 표시", async ({ page }) => {
    // 기본 Web 플랫폼에서 프리뷰 패널 확인
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const webMockup = previewPanel.locator('[data-testid="web-mockup"]');
    await expect(webMockup).toBeVisible();

    // Traffic lights가 보이는지 확인 (좌측 잘림 없음)
    const trafficLights = previewPanel.locator('[data-testid="traffic-lights"]');
    await expect(trafficLights).toBeVisible();

    // Traffic lights의 bounding box 확인 -- 화면 좌측 경계 안에 있어야 함
    const tlBox = await trafficLights.boundingBox();
    expect(tlBox).not.toBeNull();
    expect(tlBox!.x).toBeGreaterThanOrEqual(0);

    // 프리뷰 컨테이너에 justify-center가 없어야 함 (overflow 시 좌측 잘림 방지)
    const previewContainer = previewPanel.locator("div.overflow-auto.items-center").first();
    await expect(previewContainer).toBeVisible();
    const containerClasses = await previewContainer.getAttribute("class");
    expect(containerClasses).not.toContain("justify-center");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/01-req1-web-scroll-alignment.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-2: 모바일 Dynamic Island 간섭 제거 ──

  test("REQ-2-1: Mobile + Sidebar 앱 셸에서 헤더가 Dynamic Island에 가려지지 않음", async ({ page }) => {
    // 스타일 섹션으로 스크롤하여 Mobile 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const mobileMockup = previewPanel.locator('[data-testid="mobile-mockup"]');
    await expect(mobileMockup).toBeVisible();

    // Dynamic Island
    const dynamicIsland = previewPanel.locator('[data-testid="dynamic-island"]');
    await expect(dynamicIsland).toBeVisible();
    const diBox = await dynamicIsland.boundingBox();
    expect(diBox).not.toBeNull();

    // 콘텐츠에 네거티브 마진이 없어야 함 (-mt-12 제거 확인)
    // 스크린 영역의 모든 직접 자식 div에 -mt 클래스가 없어야 함
    const screenArea = mobileMockup.locator("div.relative.overflow-auto").first();
    const childDivs = screenArea.locator(":scope > div");
    const childCount = await childDivs.count();
    for (let i = 0; i < childCount; i++) {
      const cls = await childDivs.nth(i).getAttribute("class");
      if (cls) {
        expect(cls).not.toContain("-mt-");
      }
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/02-req2-mobile-sidebar.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-2-2: Mobile + Topnav 앱 셸에서 헤더가 Dynamic Island에 가려지지 않음", async ({ page }) => {
    // 스타일 섹션으로 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Mobile 선택
    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    // layout step에서 topnav 설정 필요 -- store 직접 설정
    await page.evaluate(() => {
      const raw = localStorage.getItem("design-wizard-state");
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.state.appShellLayout = "topnav";
        localStorage.setItem("design-wizard-state", JSON.stringify(parsed));
      }
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Mobile 다시 선택 (reload 후)
    const styleSectionAgain = page.locator("#section-style");
    await styleSectionAgain.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const mobileChipAgain = styleSectionAgain.locator("button").filter({ hasText: "Mobile" });
    await mobileChipAgain.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const mobileMockup = previewPanel.locator('[data-testid="mobile-mockup"]');
    await expect(mobileMockup).toBeVisible();

    const dynamicIsland = previewPanel.locator('[data-testid="dynamic-island"]');
    await expect(dynamicIsland).toBeVisible();

    await page.screenshot({ path: `${SCREENSHOT_DIR}/03-req2-mobile-topnav.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-2-3: Mobile + Dock 앱 셸에서 헤더가 Dynamic Island에 가려지지 않음", async ({ page }) => {
    // 스타일 섹션으로 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Mobile 선택
    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    // Dock 셸 설정
    await page.evaluate(() => {
      const raw = localStorage.getItem("design-wizard-state");
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.state.appShellLayout = "dock";
        localStorage.setItem("design-wizard-state", JSON.stringify(parsed));
      }
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Mobile 다시 선택
    const styleSectionAgain = page.locator("#section-style");
    await styleSectionAgain.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const mobileChipAgain = styleSectionAgain.locator("button").filter({ hasText: "Mobile" });
    await mobileChipAgain.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const mobileMockup = previewPanel.locator('[data-testid="mobile-mockup"]');
    await expect(mobileMockup).toBeVisible();

    await page.screenshot({ path: `${SCREENSHOT_DIR}/04-req2-mobile-dock.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-3: 모바일 스크롤바 숨김 ──

  test("REQ-3: Mobile 목업에서 스크롤바가 숨겨져 있음", async ({ page }) => {
    // 스타일 섹션으로 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Mobile 선택
    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const mobileMockup = previewPanel.locator('[data-testid="mobile-mockup"]');
    await expect(mobileMockup).toBeVisible();

    // 스크린 영역에 scrollbar 숨김 CSS가 적용되어 있는지 확인
    const screenArea = mobileMockup.locator("div.relative.overflow-auto").first();
    await expect(screenArea).toBeVisible();

    // scrollbar-width: none 확인 (Firefox 용)
    const scrollbarWidth = await screenArea.evaluate(
      (el) => window.getComputedStyle(el).scrollbarWidth,
    );
    expect(scrollbarWidth).toBe("none");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/05-req3-mobile-scrollbar-hidden.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-4: 그림자 최소화 ──

  test("REQ-4-1: Web 목업 그림자가 shadow-md로 최소화", async ({ page }) => {
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const webMockup = previewPanel.locator('[data-testid="web-mockup"]');
    await expect(webMockup).toBeVisible();

    const classes = await webMockup.getAttribute("class");
    expect(classes).toContain("shadow-md");
    expect(classes).not.toContain("shadow-xl");
    expect(classes).not.toContain("shadow-2xl");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/06-req4-web-shadow.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-4-2: Tablet 목업 그림자가 shadow-md로 최소화", async ({ page }) => {
    // Tablet 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const tabletChip = styleSection.locator("button").filter({ hasText: "Tablet" });
    await tabletChip.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const tabletMockup = previewPanel.locator('[data-testid="tablet-mockup"]');
    await expect(tabletMockup).toBeVisible();

    const classes = await tabletMockup.getAttribute("class");
    expect(classes).toContain("shadow-md");
    expect(classes).not.toContain("shadow-2xl");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/07-req4-tablet-shadow.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-4-3: Mobile 목업 그림자가 shadow-md로 최소화", async ({ page }) => {
    // Mobile 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const mobileMockup = previewPanel.locator('[data-testid="mobile-mockup"]');
    await expect(mobileMockup).toBeVisible();

    const classes = await mobileMockup.getAttribute("class");
    expect(classes).toContain("shadow-md");
    expect(classes).not.toContain("shadow-2xl");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/08-req4-mobile-shadow.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-5: 모바일 베젤 디자인 개선 ──

  test("REQ-5: Mobile 목업 베젤이 세련된 디자인으로 개선", async ({ page }) => {
    // Mobile 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const mobileMockup = previewPanel.locator('[data-testid="mobile-mockup"]');
    await expect(mobileMockup).toBeVisible();

    // 베젤이 border-zinc-800 (dark: border-zinc-200)로 변경
    const classes = await mobileMockup.getAttribute("class");
    expect(classes).toContain("border-zinc-800");
    expect(classes).not.toContain("border-foreground");

    // ring 효과 존재
    expect(classes).toContain("ring-1");

    // Dynamic Island가 bg-black으로 고정
    const dynamicIsland = previewPanel.locator('[data-testid="dynamic-island"]');
    await expect(dynamicIsland).toBeVisible();
    const diClasses = await dynamicIsland.getAttribute("class");
    expect(diClasses).toContain("bg-black");
    expect(diClasses).not.toContain("bg-foreground");

    // Dynamic Island 크기 확인 (w-[100px] h-7 = 100px x 28px)
    const diBox = await dynamicIsland.boundingBox();
    expect(diBox).not.toBeNull();
    expect(diBox!.width).toBeCloseTo(100, 0);
    expect(diBox!.height).toBeCloseTo(28, 0);

    // Home indicator 크기 확인 (w-[100px])
    const homeIndicator = previewPanel.locator('[data-testid="home-indicator"]');
    await expect(homeIndicator).toBeVisible();
    const hiBox = await homeIndicator.boundingBox();
    expect(hiBox).not.toBeNull();
    expect(hiBox!.width).toBeCloseTo(100, 0);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/09-req5-mobile-bezel.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-6: 사이드 이펙트 방지 검증 ──

  test("REQ-6-1: Web + Sidebar + Dashboard Grid 조합이 정상 작동", async ({ page }) => {
    // Sidebar + Dashboard Grid 설정
    await page.evaluate(() => {
      const raw = localStorage.getItem("design-wizard-state");
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.state.appShellLayout = "sidebar";
        parsed.state.pageLayout = "dashboard-grid";
        localStorage.setItem("design-wizard-state", JSON.stringify(parsed));
      }
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const webMockup = previewPanel.locator('[data-testid="web-mockup"]');
    await expect(webMockup).toBeVisible();

    // 런타임 에러 없음 확인
    await page.screenshot({ path: `${SCREENSHOT_DIR}/10-req6-web-sidebar-dashboard.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-6-2: Tablet + Topnav + Tab Page 조합이 정상 작동", async ({ page }) => {
    // 스타일 섹션으로 스크롤하여 Tablet 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const tabletChip = styleSection.locator("button").filter({ hasText: "Tablet" });
    await tabletChip.click();
    await page.waitForTimeout(500);

    // store에서 appShellLayout과 pageLayout을 변경
    await page.evaluate(() => {
      const raw = localStorage.getItem("design-wizard-state");
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.state.appShellLayout = "topnav";
        parsed.state.pageLayout = "tab-page";
        localStorage.setItem("design-wizard-state", JSON.stringify(parsed));
      }
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Tablet 다시 선택 (reload 후 기본값으로 돌아감 방지)
    const styleSectionAgain = page.locator("#section-style");
    await styleSectionAgain.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const tabletChipAgain = styleSectionAgain.locator("button").filter({ hasText: "Tablet" });
    await tabletChipAgain.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const tabletMockup = previewPanel.locator('[data-testid="tablet-mockup"]');
    await expect(tabletMockup).toBeVisible();

    await page.screenshot({ path: `${SCREENSHOT_DIR}/11-req6-tablet-topnav-tabpage.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-6-3: Mobile + Dock + Sidebar Page 조합이 정상 작동", async ({ page }) => {
    // 스타일 섹션으로 스크롤하여 Mobile 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    // store에서 appShellLayout과 pageLayout을 변경
    await page.evaluate(() => {
      const raw = localStorage.getItem("design-wizard-state");
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.state.appShellLayout = "dock";
        parsed.state.pageLayout = "sidebar-page";
        localStorage.setItem("design-wizard-state", JSON.stringify(parsed));
      }
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Mobile 다시 선택
    const styleSectionAgain = page.locator("#section-style");
    await styleSectionAgain.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const mobileChipAgain = styleSectionAgain.locator("button").filter({ hasText: "Mobile" });
    await mobileChipAgain.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const mobileMockup = previewPanel.locator('[data-testid="mobile-mockup"]');
    await expect(mobileMockup).toBeVisible();

    await page.screenshot({ path: `${SCREENSHOT_DIR}/12-req6-mobile-dock-sidebarpage.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });
});
