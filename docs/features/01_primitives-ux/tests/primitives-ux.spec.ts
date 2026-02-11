import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5178";
const SCREENSHOT_DIR =
  "docs/features/01_primitives-ux/tests/test-results";

test.describe("Primitives UX 개선", () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(`[PAGE_ERROR] ${error.message}`);
    });

    // 인증 불필요 — 바로 위저드 페이지로 이동
    await page.goto(`${BASE_URL}/wizard/primitives`);
    await page.waitForLoadState("networkidle");
  });

  // 🔴 최우선: 페이지 로드 + 런타임 에러 검사
  test("REQ-00: 페이지 로드 및 런타임 에러 없음", async ({ page }) => {
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

  // REQ-01: 폰트 언어 그룹 탭이 횡스크롤로 동작하는지
  test("REQ-01: 폰트 언어 그룹 탭 횡스크롤", async ({ page }) => {
    await page.waitForTimeout(1000);

    // 폰트 섹션이 보이도록 스크롤
    const fontSection = page.locator("#section-font");
    await fontSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 탭 컨테이너 확인: flex-nowrap overflow-x-auto
    const tabContainer = fontSection.locator(
      ".flex.flex-nowrap.overflow-x-auto",
    );
    await expect(tabContainer).toBeVisible();

    // 탭 버튼이 여러 개 있는지 확인
    const tabButtons = tabContainer.locator("button");
    const tabCount = await tabButtons.count();
    expect(tabCount).toBeGreaterThanOrEqual(3);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-01-font-tabs.png`,
    });

    // 치명적 에러 확인
    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-02: 폰트 목록이 ScrollArea 내에서 스크롤되는지
  test("REQ-02: 폰트 목록 ScrollArea 스크롤", async ({ page }) => {
    await page.waitForTimeout(1000);

    const fontSection = page.locator("#section-font");
    await fontSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // ScrollArea 컴포넌트 확인 (data-slot="scroll-area" 또는 h-[400px] 클래스)
    const scrollArea = fontSection.locator(
      '[data-slot="scroll-area"], [data-radix-scroll-area-viewport]',
    );
    await expect(scrollArea.first()).toBeVisible();

    // 스크롤 가능한 영역인지 확인 (높이 제한)
    const scrollAreaParent = fontSection.locator(".h-\\[400px\\]");
    await expect(scrollAreaParent).toBeVisible();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-02-font-scroll.png`,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-03: 컬러 Light/Dark 미리보기가 칩 위에 표시되는지
  test("REQ-03: 컬러 Light/Dark 미리보기 상단 배치", async ({
    page,
  }) => {
    await page.waitForTimeout(1000);

    // 컬러 섹션으로 스크롤
    const colorSection = page.locator("#section-color");
    await colorSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Light/Dark 미리보기 확인: grid grid-cols-2 → "Light"/"Dark" 레이블
    const lightLabel = colorSection.locator("text=Light").first();
    const darkLabel = colorSection.locator("text=Dark").first();
    await expect(lightLabel).toBeVisible();
    await expect(darkLabel).toBeVisible();

    // 프리셋 칩 확인 (flex flex-wrap gap-3 내부의 원형 버튼들)
    const chipContainer = colorSection.locator(".flex.flex-wrap.gap-3");
    await expect(chipContainer).toBeVisible();

    // Light 미리보기의 Y 좌표가 칩보다 위에 있는지 확인
    const lightBox = await lightLabel.boundingBox();
    const chipBox = await chipContainer.boundingBox();

    // 미리보기가 칩보다 위에 있어야 함 (Y좌표가 더 작아야 함)
    expect(lightBox!.y).toBeLessThan(chipBox!.y);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-03-color-preview.png`,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-04: 타이포그래피 스케일 미리보기가 7개 이하인지
  test("REQ-04: 타이포그래피 스케일 미리보기 7개 이하", async ({
    page,
  }) => {
    await page.waitForTimeout(1000);

    // 타이포그래피 섹션으로 스크롤
    const typoSection = page.locator("#section-typography");
    await typoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 스케일 미리보기 항목 확인: "스케일 미리보기" 라벨 아래의 행들
    const previewContainer = typoSection.locator(
      ".rounded-lg.border.border-border.p-4",
    );
    await expect(previewContainer).toBeVisible();

    // 미리보기 행 수 세기 (각 행은 flex items-baseline gap-3)
    const previewRows = previewContainer.locator(
      ".flex.items-baseline.gap-3",
    );
    const rowCount = await previewRows.count();

    // 7개 이하여야 함 (3xl, 5xl 제거됨)
    expect(rowCount).toBeLessThanOrEqual(7);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-04-typo-scale.png`,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-06: 스페이싱 미리보기에 실제 Button/Input/Menu 컴포넌트가 보이는지
  test("REQ-06: 스페이싱 미리보기 실제 컴포넌트", async ({ page }) => {
    await page.waitForTimeout(1000);

    // 스페이싱 섹션으로 스크롤
    const spacingSection = page.locator("#section-spacing");
    await spacingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 컴포넌트 미리보기 영역 확인
    const previewContainer = spacingSection
      .locator(".rounded-lg.border.border-border.p-4")
      .last();
    await expect(previewContainer).toBeVisible();

    // Button 컴포넌트 확인
    const buttons = previewContainer.locator("button");
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThanOrEqual(1);

    // Input 컴포넌트 확인
    const inputs = previewContainer.locator("input");
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThanOrEqual(1);

    // Menu 컴포넌트 확인 (대시보드/프로젝트/설정 텍스트)
    const menuItem = previewContainer.locator("text=대시보드");
    await expect(menuItem).toBeVisible();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-06-spacing-components.png`,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-07: 라운딩 미리보기가 단일 박스만 표시하는지
  test("REQ-07: 라운딩 미리보기 단일 박스", async ({ page }) => {
    await page.waitForTimeout(1000);

    // 라운딩 섹션으로 스크롤
    const radiusSection = page.locator("#section-radius");
    await radiusSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 미리보기 영역 확인
    const previewContainer = radiusSection.locator(
      ".rounded-lg.border.border-border.p-4",
    );
    await expect(previewContainer).toBeVisible();

    // 미리보기 내 박스 수 확인 (h-20 w-20 border 스타일)
    const previewBoxes = previewContainer.locator(
      ".h-20.w-20",
    );
    const boxCount = await previewBoxes.count();

    // 단일 박스만 있어야 함
    expect(boxCount).toBe(1);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-07-radius-single.png`,
    });

    const fatal = consoleErrors.filter(
      (e) =>
        e.includes("is not defined") ||
        e.includes("Cannot read properties of"),
    );
    expect(fatal, "테스트 중 치명적 에러").toHaveLength(0);
  });

  // REQ-08: designStyle 토글 시 LivePreview 전체가 변경되는지
  test("REQ-08: designStyle 토글 시 LivePreview 변경", async ({
    page,
  }) => {
    await page.waitForTimeout(1000);

    // 스타일 섹션으로 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // "Line" 클릭
    const lineChip = styleSection.locator("button", {
      hasText: "Line",
    });
    await lineChip.click();
    await page.waitForTimeout(800);

    // Line 상태 스크린샷 - LivePreview 영역을 포함하여 와이드 캡처
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-08-design-style.png`,
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

  // REQ-09: platformTarget 토글 시 LivePreview 크기가 변경되는지
  test("REQ-09: platformTarget 토글 시 LivePreview 크기 변경", async ({
    page,
  }) => {
    await page.waitForTimeout(1000);

    // 스타일 섹션으로 스크롤
    const styleSection = page.locator("#section-style");
    await styleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // "Mobile" 클릭
    const mobileChip = styleSection.locator("button", {
      hasText: "Mobile",
    });
    await mobileChip.click();
    await page.waitForTimeout(800);

    // Mobile 상태 스크린샷
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/req-09-platform-target.png`,
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
});
