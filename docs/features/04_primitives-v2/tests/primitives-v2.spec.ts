import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5178";
const SCREENSHOT_DIR = "docs/features/04_primitives-v2/tests/test-results";

test.describe("Primitives UX v2", () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(`[PAGE_ERROR] ${error.message}`);
    });

    // Clear localStorage to start fresh
    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState("networkidle");
  });

  // REQ-00: Page load + runtime error check
  test("REQ-00: 페이지 로드 및 런타임 에러 없음", async ({ page }) => {
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

  // REQ-01: Language group Select dropdown
  test("REQ-01: 언어 그룹 탭을 Select 드롭다운으로 교체", async ({ page }) => {
    // Font section should have a Select trigger (not horizontal scroll tabs)
    const selectTrigger = page.locator("#section-font button[role='combobox']");
    await expect(selectTrigger).toBeVisible();

    // Click Select to open dropdown
    await selectTrigger.click();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-01-select-dropdown.png`,
    });

    // Check that dropdown has language options
    const options = page.locator("[role='option']");
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(6);

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-02: ScrollArea border and height
  test("REQ-02: 폰트 ScrollArea에 외곽선 추가 및 높이 수정", async ({ page }) => {
    // Check ScrollArea has border
    const scrollArea = page.locator("#section-font [data-slot='scroll-area']");
    await expect(scrollArea).toBeVisible();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-02-scrollarea-border.png`,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-03: 60 fonts across 6 languages
  test("REQ-03: 언어별 폰트 목록 10개씩 총 60개", async ({ page }) => {
    // Count fonts in current language (Korean default)
    const fontButtons = page.locator("#section-font [data-slot='scroll-area'] button");
    const koreanCount = await fontButtons.count();
    expect(koreanCount).toBe(10);

    // Switch to English
    const selectTrigger = page.locator("#section-font button[role='combobox']");
    await selectTrigger.click();
    await page.waitForTimeout(200);

    // Find and click English option
    await page.locator("[role='option']").filter({ hasText: "English" }).click();
    await page.waitForTimeout(300);

    const englishCount = await page.locator("#section-font [data-slot='scroll-area'] button").count();
    expect(englishCount).toBe(10);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-03-english-fonts.png`,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-04: Language-based preview text
  test("REQ-04: 언어 변경 시 미리보기 텍스트 변경", async ({ page }) => {
    // Switch to Japanese
    const selectTrigger = page.locator("#section-font button[role='combobox']");
    await selectTrigger.click();
    await page.waitForTimeout(200);
    await page.locator("[role='option']").filter({ hasText: /日本語/ }).click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-04-japanese-preview.png`,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-05: Typography scale xs~2xl (no 4xl)
  test("REQ-05: 타이포그래피 스케일 미리보기 xs~2xl", async ({ page }) => {
    // Scroll to typography section
    await page.locator("#section-typography").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-05-typography-scale.png`,
    });

    // Check that 4xl is NOT in the scale preview
    const scaleSection = page.locator("#section-typography");
    const text4xl = await scaleSection.locator("text=4xl").count();
    expect(text4xl, "4xl should not appear").toBe(0);

    // Check that these labels exist
    for (const label of ["2xl", "xl", "lg", "base", "sm", "xs"]) {
      const labelEl = scaleSection.locator(`text=${label}`).first();
      await expect(labelEl, `${label} should be visible`).toBeVisible();
    }

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-06: Slider tick label alignment
  test("REQ-06: 슬라이더 하단 tick 레이블 위치 정렬", async ({ page }) => {
    await page.locator("#section-typography").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-06-slider-ticks.png`,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-07: Spacing preview button cursor-pointer
  test("REQ-07: 스페이싱 미리보기 버튼 cursor-pointer", async ({ page }) => {
    await page.locator("#section-spacing").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Check cursor style on buttons in spacing preview
    const previewButton = page.locator("#section-spacing button").filter({ hasText: "Default" }).first();
    const cursor = await previewButton.evaluate((el) => getComputedStyle(el).cursor);
    expect(cursor).toBe("pointer");

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-07-cursor-pointer.png`,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-08: Radius preview with multiple components
  test("REQ-08: 라운딩 미리보기 확장 (Button, Input, Card)", async ({ page }) => {
    await page.locator("#section-radius").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-08-radius-preview.png`,
    });

    // Check that radius section has Button, Input, Card previews
    const radiusSection = page.locator("#section-radius");
    await expect(radiusSection.locator("text=Button").first()).toBeVisible();
    await expect(radiusSection.locator("text=Input").first()).toBeVisible();
    await expect(radiusSection.locator("text=Card").first()).toBeVisible();

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-09: DesignStyle = standard/flat/lineless
  test("REQ-09: DesignStyle을 standard/flat/lineless로 재정의", async ({ page }) => {
    await page.locator("#section-style").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Check three style toggles exist
    const styleSection = page.locator("#section-style");
    await expect(styleSection.locator("button").filter({ hasText: "Standard" })).toBeVisible();
    await expect(styleSection.locator("button").filter({ hasText: "Flat" })).toBeVisible();
    await expect(styleSection.locator("button").filter({ hasText: "Lineless" })).toBeVisible();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-09-design-style.png`,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-10: Design style affects preview (3 screenshots)
  test("REQ-10: 스타일에 따라 미리보기 디자인 변경 - Standard", async ({ page }) => {
    await page.locator("#section-style").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Standard is default
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-10-standard-preview.png`,
      fullPage: true,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  test("REQ-10: 스타일에 따라 미리보기 디자인 변경 - Flat", async ({ page }) => {
    await page.locator("#section-style").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Click Flat
    await page.locator("#section-style button").filter({ hasText: "Flat" }).click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-10-flat-preview.png`,
      fullPage: true,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  test("REQ-10: 스타일에 따라 미리보기 디자인 변경 - Lineless", async ({ page }) => {
    await page.locator("#section-style").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Click Lineless
    await page.locator("#section-style button").filter({ hasText: "Lineless" }).click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-10-lineless-preview.png`,
      fullPage: true,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-11: Platform target with device dropdown
  test("REQ-11: PlatformTarget web/tablet/mobile + 기기 드롭다운", async ({ page }) => {
    await page.locator("#section-style").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const styleSection = page.locator("#section-style");

    // Check three platform toggles
    await expect(styleSection.locator("button").filter({ hasText: "Web" })).toBeVisible();
    await expect(styleSection.locator("button").filter({ hasText: "Tablet" })).toBeVisible();
    await expect(styleSection.locator("button").filter({ hasText: "Mobile" })).toBeVisible();

    // Click Mobile
    await styleSection.locator("button").filter({ hasText: "Mobile" }).click();
    await page.waitForTimeout(300);

    // Check device dropdown appears
    const deviceSelect = styleSection.locator("button[role='combobox']");
    await expect(deviceSelect).toBeVisible();

    // Open device dropdown
    await deviceSelect.click();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-11-platform-device.png`,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-12: Tablet layout (3 screenshots)
  test("REQ-12: Tablet/Web/Mobile 각 플랫폼 레이아웃 - Web", async ({ page }) => {
    // Web is default
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-12-web-layout.png`,
      fullPage: true,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  test("REQ-12: Tablet/Web/Mobile 각 플랫폼 레이아웃 - Tablet", async ({ page }) => {
    await page.locator("#section-style").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Click Tablet
    await page.locator("#section-style button").filter({ hasText: "Tablet" }).click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-12-tablet-layout.png`,
      fullPage: true,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  test("REQ-12: Tablet/Web/Mobile 각 플랫폼 레이아웃 - Mobile", async ({ page }) => {
    await page.locator("#section-style").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Click Mobile
    await page.locator("#section-style button").filter({ hasText: "Mobile" }).click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-12-mobile-layout.png`,
      fullPage: true,
    });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // Design validation
  test("Light Mode", async ({ page }) => {
    await page.screenshot({ path: `${SCREENSHOT_DIR}/light-mode.png`, fullPage: true });
  });

  test("Dark Mode", async ({ page }) => {
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/dark-mode.png`, fullPage: true });
  });
});
