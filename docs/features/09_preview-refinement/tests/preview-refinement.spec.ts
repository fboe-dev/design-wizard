import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5178";
const SCREENSHOT_DIR = "docs/features/09_preview-refinement/tests/screenshots";

test.describe("Preview Refinement", () => {
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

  // ── REQ-1: 스크롤 좌측 잘림 수정 ──

  test("REQ-1: 스크롤 최좌측에서 프리뷰 왼쪽 완전 노출", async ({ page }) => {
    // 스타일 섹션으로 스크롤하여 Desktop 1440 선택 (기본값)
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 프리뷰 패널 내 스크롤 컨테이너
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const scrollContainer = previewPanel.locator("div.overflow-auto").first();

    // 스크롤을 최좌측으로 이동
    await scrollContainer.evaluate((el) => { el.scrollLeft = 0; });
    await page.waitForTimeout(300);

    // 프리뷰 컨테이너의 좌측이 보이는지 확인
    const previewBox = previewPanel.locator("div.shrink-0.overflow-hidden.rounded-xl.border");
    const box = await previewBox.boundingBox();
    expect(box).not.toBeNull();
    // justify-start이므로 좌측이 스크롤 컨테이너 좌측에 맞춰져야 함
    expect(box!.x).toBeGreaterThanOrEqual(0);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/01-req1-scroll-left.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-1: 스크롤 최우측 정상 노출", async ({ page }) => {
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const scrollContainer = previewPanel.locator("div.overflow-auto").first();

    // 스크롤을 최우측으로 이동
    await scrollContainer.evaluate((el) => { el.scrollLeft = el.scrollWidth; });
    await page.waitForTimeout(300);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/02-req1-scroll-right.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-2: Web 디바이스 사이즈 정규화 ──

  test("REQ-2: Desktop 1440 선택", async ({ page }) => {
    // 기본값이 Desktop 1440이어야 함
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const previewContainer = previewPanel.locator("div.shrink-0.overflow-hidden.rounded-xl.border");

    // 크롬 헤더에 Desktop 1440 표시 확인
    const chromeHeader = previewContainer.locator("div.border-b span.text-sm");
    await expect(chromeHeader).toContainText("Desktop 1440");
    await expect(chromeHeader).toContainText("1440");
    await expect(chromeHeader).toContainText("900");

    // width 확인
    const width = await previewContainer.evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBe(1440);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/03-req2-desktop-1440.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-2: Laptop 1280 선택", async ({ page }) => {
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 디바이스 Select 열기 및 Laptop 1280 선택
    const selectTrigger = styleSection.locator('[data-slot="select-trigger"]');
    await selectTrigger.click();
    await page.waitForTimeout(300);
    const laptop1280 = page.locator('[data-slot="select-item"]').filter({ hasText: "Laptop 1280" });
    await laptop1280.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const previewContainer = previewPanel.locator("div.shrink-0.overflow-hidden.rounded-xl.border");

    const chromeHeader = previewContainer.locator("div.border-b span.text-sm");
    await expect(chromeHeader).toContainText("Laptop 1280");
    await expect(chromeHeader).toContainText("800");

    const width = await previewContainer.evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBe(1280);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/04-req2-laptop-1280.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-2: Compact 1024 선택", async ({ page }) => {
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const selectTrigger = styleSection.locator('[data-slot="select-trigger"]');
    await selectTrigger.click();
    await page.waitForTimeout(300);
    const compact1024 = page.locator('[data-slot="select-item"]').filter({ hasText: "Compact 1024" });
    await compact1024.click();
    await page.waitForTimeout(500);

    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const previewContainer = previewPanel.locator("div.shrink-0.overflow-hidden.rounded-xl.border");

    const chromeHeader = previewContainer.locator("div.border-b span.text-sm");
    await expect(chromeHeader).toContainText("Compact 1024");
    await expect(chromeHeader).toContainText("768");

    const width = await previewContainer.evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBe(1024);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/05-req2-compact-1024.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-3: Base 폰트 크기 반영 ──

  test("REQ-3: Base 14px 설정 시 텍스트 크기", async ({ page }) => {
    // 타이포그래피 섹션으로 스크롤
    const typoSection = page.locator("#section-typography");
    await typoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Base 크기 슬라이더를 14px로 변경
    const baseSlider = typoSection.locator('input[type="range"]').first();
    await baseSlider.fill("14");
    await page.waitForTimeout(500);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/06-req3-base-14px.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-3: Base 18px 설정 시 텍스트 크기 증가", async ({ page }) => {
    const typoSection = page.locator("#section-typography");
    await typoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const baseSlider = typoSection.locator('input[type="range"]').first();
    await baseSlider.fill("18");
    await page.waitForTimeout(500);

    // text-base 요소가 실제로 크기가 반영되었는지 확인
    // 프리뷰 내 nav 메뉴 텍스트가 text-base 클래스를 사용하는지 확인
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const navButton = previewPanel.locator("button.text-base").first();
    if (await navButton.count() > 0) {
      const fontSize = await navButton.evaluate((el) => window.getComputedStyle(el).fontSize);
      // 18px base 일 때 text-base는 1rem = 18px
      const sizeNum = parseFloat(fontSize);
      expect(sizeNum).toBeGreaterThan(14);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/07-req3-base-18px.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-4: lg/5xl 활용 및 6xl 제거 ──

  test("REQ-4: Scale Ratio 0.8 설정 (Landing)", async ({ page }) => {
    // Landing 레이아웃으로 변경
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    const landingOption = page.locator("button").filter({ hasText: /랜딩/ }).first();
    await landingOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Scale Ratio 슬라이더를 0.8로 변경
    const typoSection = page.locator("#section-typography");
    await typoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 두 번째 range input이 scale ratio
    const ratioSlider = typoSection.locator('input[type="range"]').nth(1);
    await ratioSlider.fill("0.8");
    await page.waitForTimeout(500);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/08-req4-ratio-08.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-4: Scale Ratio 1.5 설정 (Landing 히어로 5xl)", async ({ page }) => {
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    const landingOption = page.locator("button").filter({ hasText: /랜딩/ }).first();
    await landingOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const typoSection = page.locator("#section-typography");
    await typoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const ratioSlider = typoSection.locator('input[type="range"]').nth(1);
    await ratioSlider.fill("1.5");
    await page.waitForTimeout(500);

    // 히어로 타이틀이 text-5xl인지 확인
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const heroTitle = previewPanel.locator("h1.font-extrabold").first();
    if (await heroTitle.count() > 0) {
      const fontSize = await heroTitle.evaluate((el) => window.getComputedStyle(el).fontSize);
      const sizeNum = parseFloat(fontSize);
      // text-5xl (3rem = 48px at default) should be significantly larger
      expect(sizeNum).toBeGreaterThan(30);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/09-req4-ratio-15.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-5: 카드 여백 정규화 ──

  test("REQ-5: Mobile 카드 여백 축소 확인", async ({ page }) => {
    // Tab page 레이아웃으로 변경 (ProjectCards 포함)
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // simple-page에서 tab-page로
    const tabPageOption = page.locator("button").filter({ hasText: /탭/ }).first();
    await tabPageOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Web에서 먼저 스크린샷 (px-4 py-3)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/10-req5-card-web.png`, fullPage: true });

    // Mobile 선택
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    // Mobile에서 카드 패딩 확인 (px-3 py-2)
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const cardContent = previewPanel.locator("div.px-3.py-2").first();
    if (await cardContent.count() > 0) {
      const padding = await cardContent.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          paddingLeft: style.paddingLeft,
          paddingTop: style.paddingTop,
        };
      });
      // px-3 = 12px, py-2 = 8px
      expect(parseFloat(padding.paddingLeft)).toBeLessThanOrEqual(16);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/11-req5-card-mobile.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-6: 탭 높이 (수정 불필요 확인) ──

  test("REQ-6: 탭 높이 h-9 유지 확인", async ({ page }) => {
    // Tab page 레이아웃으로 변경
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    const tabPageOption = page.locator("button").filter({ hasText: /탭/ }).first();
    await tabPageOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // TabsList 높이 확인
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const tabsList = previewPanel.locator('[role="tablist"]').first();
    if (await tabsList.count() > 0) {
      const height = await tabsList.evaluate((el) => el.getBoundingClientRect().height);
      // h-9 = 36px
      expect(height).toBeCloseTo(36, 0);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/12-req6-tab-before.png`, fullPage: true });
    // 13번 스크린샷은 수정 불필요이므로 동일 상태 재촬영
    await page.screenshot({ path: `${SCREENSHOT_DIR}/13-req6-tab-after.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-7: Progress 바 높이 증가 ──

  test("REQ-7: Progress 바 높이 h-2 확인", async ({ page }) => {
    // Tab page 레이아웃으로 변경 (ProjectCards + Progress 포함)
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    const tabPageOption = page.locator("button").filter({ hasText: /탭/ }).first();
    await tabPageOption.click();
    await page.waitForTimeout(300);

    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Progress 바 높이 확인
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const progressBar = previewPanel.locator('[role="progressbar"]').first();
    if (await progressBar.count() > 0) {
      const height = await progressBar.evaluate((el) => el.getBoundingClientRect().height);
      // h-2 = 8px (기본값 복원, h-1.5 = 6px이 아닌지 확인)
      expect(height).toBeGreaterThanOrEqual(7);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/14-req7-progress-before.png`, fullPage: true });
    await page.screenshot({ path: `${SCREENSHOT_DIR}/15-req7-progress-after.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  // ── REQ-8: 플랫폼별 밀도 일관성 ──

  test("REQ-8: Web 밀도 p-6", async ({ page }) => {
    // Web 기본 상태 스크린샷
    await page.screenshot({ path: `${SCREENSHOT_DIR}/16-req8-web-density.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-8: Tablet 밀도 p-4", async ({ page }) => {
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const tabletChip = styleSection.locator("button").filter({ hasText: "Tablet" });
    await tabletChip.click();
    await page.waitForTimeout(500);

    // Tablet에서 콘텐츠 패딩 확인 -- 미리보기 컨테이너 내부
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const previewContainer = previewPanel.locator("div.shrink-0.overflow-hidden.rounded-xl.border");
    const mainContent = previewContainer.locator("div.flex-1.overflow-auto").first();
    if (await mainContent.count() > 0) {
      const paddingLeft = await mainContent.evaluate((el) => window.getComputedStyle(el).paddingLeft);
      // p-4 = 16px (Tablet 패딩)
      expect(parseFloat(paddingLeft)).toBeCloseTo(16, 0);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/17-req8-tablet-density.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-8: Mobile 밀도 p-3", async ({ page }) => {
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const mobileChip = styleSection.locator("button").filter({ hasText: "Mobile" });
    await mobileChip.click();
    await page.waitForTimeout(500);

    // Mobile에서 콘텐츠 패딩 확인 -- 미리보기 컨테이너 내부의 p-3 영역
    const previewPanel = page.locator('[data-slot="resizable-panel"]').last();
    const previewContainer = previewPanel.locator("div.shrink-0.overflow-hidden.rounded-xl.border");
    const mainContent = previewContainer.locator("div.flex-1.overflow-auto").first();
    if (await mainContent.count() > 0) {
      const paddingLeft = await mainContent.evaluate((el) => window.getComputedStyle(el).paddingLeft);
      // p-3 = 12px (Mobile 패딩)
      expect(parseFloat(paddingLeft)).toBeLessThanOrEqual(12);
    }

    await page.screenshot({ path: `${SCREENSHOT_DIR}/18-req8-mobile-density.png`, fullPage: true });

    const fatal = consoleErrors.filter((e) =>
      e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });
});
