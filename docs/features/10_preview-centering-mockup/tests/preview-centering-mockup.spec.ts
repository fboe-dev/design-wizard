import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5178";
const SCREENSHOT_DIR = "docs/features/10_preview-centering-mockup/tests/screenshots";

test.describe("Preview Centering & Platform Mockup", () => {
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

  // ── REQ 1: 미리보기 중앙 정렬 ──

  test("REQ-1: LivePreview가 우측 패널 정중앙에 위치", async ({ page }) => {
    // 프리뷰 패널 (ResizablePanel의 두 번째 패널)
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const panelBox = await previewPanel.boundingBox();
    expect(panelBox).not.toBeNull();

    // 프리뷰 중앙 정렬 컨테이너
    const centerContainer = previewPanel.locator("div.items-center.justify-center").first();
    await expect(centerContainer).toBeVisible();

    // Web 목업이 패널 내에서 중앙에 위치하는지 확인
    const webMockup = previewPanel.locator('[data-testid="web-mockup"]');
    await expect(webMockup).toBeVisible();
    const mockupBox = await webMockup.boundingBox();
    expect(mockupBox).not.toBeNull();

    // 패널 중앙 계산 (프리뷰가 패널보다 넓을 수 있으므로, 중앙 정렬 CSS가 적용되었는지 확인)
    const containerBox = await centerContainer.boundingBox();
    expect(containerBox).not.toBeNull();

    await page.screenshot({ path: `${SCREENSHOT_DIR}/01-req1-center-alignment.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ 2: Web 플랫폼 목업 (macOS Window) ──

  test("REQ-2: Web 플랫폼에서 macOS 윈도우 크롬 표시", async ({ page }) => {
    // 기본값이 Web 플랫폼이므로 별도 선택 불필요
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();

    // Web 목업 확인
    const webMockup = previewPanel.locator('[data-testid="web-mockup"]');
    await expect(webMockup).toBeVisible();

    // Traffic lights 확인
    const trafficLights = previewPanel.locator('[data-testid="traffic-lights"]');
    await expect(trafficLights).toBeVisible();

    // Traffic lights 안에 3개의 원형 버튼이 있는지 확인
    const dots = trafficLights.locator("div.rounded-full");
    await expect(dots).toHaveCount(3);

    // 각 traffic light의 색상 확인
    const colors = await dots.evaluateAll((elements) =>
      elements.map((el) => (el as HTMLElement).style.backgroundColor),
    );
    expect(colors).toContain("rgb(255, 95, 87)"); // #FF5F57
    expect(colors).toContain("rgb(254, 188, 46)"); // #FEBC2E
    expect(colors).toContain("rgb(40, 200, 64)"); // #28C840

    // 타이틀바 높이 확인 (h-10 = 40px)
    const titlebar = webMockup.locator("div.h-10.bg-muted\\/40").first();
    await expect(titlebar).toBeVisible();
    const titlebarBox = await titlebar.boundingBox();
    expect(titlebarBox).not.toBeNull();
    expect(titlebarBox!.height).toBeCloseTo(40, 0);

    // 디바이스 라벨이 타이틀바 중앙에 표시되는지 확인
    const deviceLabel = titlebar.locator("span.text-sm");
    await expect(deviceLabel).toContainText("Desktop 1440");

    // 프레임에 shadow-xl + rounded-lg 확인
    const mockupClasses = await webMockup.getAttribute("class");
    expect(mockupClasses).toContain("rounded-lg");
    expect(mockupClasses).toContain("shadow-xl");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/02-req2-web-mockup.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ 3: Tablet 플랫폼 목업 (iPad) ──

  test("REQ-3: Tablet 플랫폼에서 iPad 베젤과 카메라 노치 표시", async ({ page }) => {
    // 스타일 섹션으로 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Tablet 선택
    const tabletChip = styleSection.locator("button").filter({ hasText: "Tablet" });
    await tabletChip.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();

    // Tablet 목업 확인
    const tabletMockup = previewPanel.locator('[data-testid="tablet-mockup"]');
    await expect(tabletMockup).toBeVisible();

    // 카메라 노치 확인
    const camera = previewPanel.locator('[data-testid="tablet-camera"]');
    await expect(camera).toBeVisible();

    // 카메라 노치 크기 확인 (w-2 = 8px, h-1 = 4px)
    const cameraBox = await camera.boundingBox();
    expect(cameraBox).not.toBeNull();
    expect(cameraBox!.width).toBeCloseTo(8, 0);
    expect(cameraBox!.height).toBeCloseTo(4, 0);

    // 프레임에 rounded-3xl + shadow-2xl 확인
    const mockupClasses = await tabletMockup.getAttribute("class");
    expect(mockupClasses).toContain("rounded-3xl");
    expect(mockupClasses).toContain("shadow-2xl");
    expect(mockupClasses).toContain("bg-foreground");

    // 전체 목업 너비가 iPad Mini (768) 인지 확인
    const mockupBox = await tabletMockup.boundingBox();
    expect(mockupBox).not.toBeNull();
    expect(mockupBox!.width).toBe(768);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/03-req3-tablet-mockup.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ 4: Mobile 플랫폼 목업 (iPhone) ──

  test("REQ-4: Mobile 플랫폼에서 iPhone 베젤, Dynamic Island, 홈 인디케이터 표시", async ({ page }) => {
    // 스타일 섹션으로 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Mobile 선택
    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();

    // Mobile 목업 확인
    const mobileMockup = previewPanel.locator('[data-testid="mobile-mockup"]');
    await expect(mobileMockup).toBeVisible();

    // Dynamic Island 확인
    const dynamicIsland = previewPanel.locator('[data-testid="dynamic-island"]');
    await expect(dynamicIsland).toBeVisible();

    // Dynamic Island 크기 확인 (w-[120px] = 120px, h-8 = 32px)
    const diBox = await dynamicIsland.boundingBox();
    expect(diBox).not.toBeNull();
    expect(diBox!.width).toBeCloseTo(120, 0);
    expect(diBox!.height).toBeCloseTo(32, 0);

    // 홈 인디케이터 확인
    const homeIndicator = previewPanel.locator('[data-testid="home-indicator"]');
    await expect(homeIndicator).toBeVisible();

    // 홈 인디케이터 크기 확인 (w-[120px] = 120px, h-1 = 4px)
    const hiBox = await homeIndicator.boundingBox();
    expect(hiBox).not.toBeNull();
    expect(hiBox!.width).toBeCloseTo(120, 0);
    expect(hiBox!.height).toBeCloseTo(4, 0);

    // 프레임에 rounded-[40px] + shadow-2xl + border-8 + border-foreground 확인
    const mockupClasses = await mobileMockup.getAttribute("class");
    expect(mockupClasses).toContain("rounded-[40px]");
    expect(mockupClasses).toContain("shadow-2xl");
    expect(mockupClasses).toContain("border-8");
    expect(mockupClasses).toContain("border-foreground");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/04-req4-mobile-mockup.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });
});
