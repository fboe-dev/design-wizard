import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5178";
const SCREENSHOT_DIR = "docs/features/07_home-header-redesign/tests/test-results";

test.describe("홈 화면 및 헤더 재설계", () => {
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

  test("REQ-00: 페이지 로드 및 런타임 에러 없음", async ({ page }) => {
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

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

  test("REQ-01+02: Favicon 설정", async ({ page }) => {
    const faviconResponse = page.waitForResponse(
      (resp) => resp.url().includes("app-icon.ico"),
      { timeout: 10000 },
    ).catch(() => null);

    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    // favicon link 태그 존재 확인
    const faviconLink = await page.locator('link[rel="icon"][href="/assets/app-icon.ico"]').count();
    expect(faviconLink).toBeGreaterThanOrEqual(1);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-01-02-favicon.png` });

    const fatal = consoleErrors.filter(
      (e) => e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-03+09: 홈 페이지 로고 이미지 + 플로팅 버튼 없음", async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    // 홈 화면에 app-logo.png 이미지가 존재하는지 확인
    const logoImg = page.locator('img[alt="Design Wizard Logo"]');
    await expect(logoImg).toBeVisible();

    // 로고 이미지 width가 5120px인지 확인
    const logoWidth = await logoImg.evaluate((el) => (el as HTMLImageElement).style.width);
    expect(logoWidth).toBe("5120px");

    // REQ-09: 홈 화면에 플로팅 네비게이션 버튼이 없어야 함
    const floatingNav = await page.locator('[aria-label="이전 단계"], [aria-label="홈으로"], [aria-label="다음 단계"]').count();
    expect(floatingNav).toBe(0);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-03-09-home-logo.png`, fullPage: true });

    const fatal = consoleErrors.filter(
      (e) => e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-04+05+06: 헤더 레이아웃 재구성 (브랜드 + StepIndicator + 다크모드)", async ({ page }) => {
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");

    // REQ-04: 헤더 grid 구조 확인 (grid-cols-[auto_1fr_auto])
    const headerGrid = page.locator("header div.grid");
    await expect(headerGrid).toBeVisible();
    const gridClass = await headerGrid.getAttribute("class");
    expect(gridClass).toContain("grid-cols-[auto_1fr_auto]");

    // REQ-04: 중앙 제목(h2)이 제거되었는지 확인
    const h2 = await page.locator("header h2").count();
    expect(h2).toBe(0);

    // REQ-05: 좌측 브랜드 영역 - app-icon.png 아이콘 존재
    const brandIcon = page.locator('header img[alt="Design Wizard"]');
    await expect(brandIcon).toBeVisible();
    const iconClass = await brandIcon.getAttribute("class");
    expect(iconClass).toContain("h-8");
    expect(iconClass).toContain("w-8");

    // REQ-05: 좌측 브랜드 텍스트 "Design Wizard" 존재 (sm 이상에서 보임)
    const brandText = page.locator("header span.font-bold");
    // 기본 뷰포트(1280px)에서는 보여야 함
    await expect(brandText).toBeVisible();
    const brandContent = await brandText.textContent();
    expect(brandContent).toBe("Design Wizard");

    // REQ-05: Link to="/" 래핑 확인
    const brandLink = page.locator('header a[href="/"]');
    await expect(brandLink).toBeVisible();

    // REQ-06: 다크모드 아이콘이 outline 스타일 (lucide-react 기본)
    const darkModeButton = page.locator('header button[title="다크모드"]');
    await expect(darkModeButton).toBeVisible();

    // REQ-08: StepNavigation이 헤더에서 제거되었는지 확인 (이전/다음 텍스트가 헤더에 없어야 함)
    const headerNavButtons = await page.locator("header").getByText("이전").count();
    const headerNextButtons = await page.locator("header").getByText("다음").count();
    expect(headerNavButtons).toBe(0);
    expect(headerNextButtons).toBe(0);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-04-05-06-header.png` });

    const fatal = consoleErrors.filter(
      (e) => e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-07+08: 플로팅 네비게이션 버튼 (위저드 페이지)", async ({ page }) => {
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");

    // REQ-07: 플로팅 네비게이션 컨테이너 존재 확인
    const floatingContainer = page.locator(".fixed.bottom-8");
    await expect(floatingContainer).toBeVisible();

    // REQ-07: 원형 버튼 2개 (이전 + 다음)
    const prevButton = page.locator('button[aria-label="홈으로"]');
    const nextButton = page.locator('button[aria-label="다음 단계"]');
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // 원형인지 확인 (rounded-full)
    const prevClass = await prevButton.getAttribute("class");
    const nextClass = await nextButton.getAttribute("class");
    expect(prevClass).toContain("rounded-full");
    expect(nextClass).toContain("rounded-full");

    // 크기 확인 (h-12 w-12)
    expect(prevClass).toContain("h-12");
    expect(prevClass).toContain("w-12");
    expect(nextClass).toContain("h-12");
    expect(nextClass).toContain("w-12");

    // REQ-07: 다음 버튼이 primary 스타일
    expect(nextClass).toContain("bg-primary");

    // 컨테이너 스타일 확인
    const containerClass = await floatingContainer.getAttribute("class");
    expect(containerClass).toContain("rounded-full");
    expect(containerClass).toContain("backdrop-blur");
    expect(containerClass).toContain("shadow-lg");

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-07-08-floating-nav.png`, fullPage: true });

    const fatal = consoleErrors.filter(
      (e) => e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-07: 마지막 스텝에서 Sparkles 아이콘 표시", async ({ page }) => {
    await page.goto(`${BASE_URL}/wizard/output`);
    await page.waitForLoadState("networkidle");

    // 마지막 스텝에서는 프롬프트 생성 버튼
    const sparklesButton = page.locator('button[aria-label="프롬프트 생성"]');
    await expect(sparklesButton).toBeVisible();

    // 이전 버튼도 있어야 함
    const prevButton = page.locator('button[aria-label="이전 단계"]');
    await expect(prevButton).toBeVisible();

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-07-last-step.png`, fullPage: true });

    const fatal = consoleErrors.filter(
      (e) => e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("REQ-07: 플로팅 네비게이션 이동 동작 확인", async ({ page }) => {
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");

    // 다음 버튼 클릭 -> primitives 페이지로 이동
    const nextButton = page.locator('button[aria-label="다음 단계"]');
    await nextButton.click();
    await page.waitForURL("**/wizard/primitives");
    expect(page.url()).toContain("/wizard/primitives");

    // 이전 버튼 클릭 -> layout 페이지로 이동
    const prevButton = page.locator('button[aria-label="이전 단계"]');
    await prevButton.click();
    await page.waitForURL("**/wizard/layout");
    expect(page.url()).toContain("/wizard/layout");

    // 홈으로 버튼 클릭 -> 홈 페이지로 이동
    const homeButton = page.locator('button[aria-label="홈으로"]');
    await homeButton.click();
    await page.waitForURL(`${BASE_URL}/`);
    expect(page.url()).toBe(`${BASE_URL}/`);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/req-07-navigation.png` });

    const fatal = consoleErrors.filter(
      (e) => e.includes("is not defined") || e.includes("Cannot read properties of"),
    );
    expect(fatal).toHaveLength(0);
  });

  test("Dark Mode", async ({ page }) => {
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/dark-mode.png`, fullPage: true });
  });

  test("Mobile 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/wizard/layout`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `${SCREENSHOT_DIR}/mobile-view.png`, fullPage: true });

    // 브랜드 텍스트가 모바일에서 숨겨지는지 확인
    const brandText = page.locator("header span.font-bold");
    await expect(brandText).toBeHidden();

    // 플로팅 네비게이션이 화면 내에 있는지
    const floatingNav = page.locator(".fixed.bottom-8");
    await expect(floatingNav).toBeVisible();

    // 수평 스크롤 없음
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    const cw = await page.evaluate(() => document.documentElement.clientWidth);
    expect(sw).toBeLessThanOrEqual(cw);
  });
});
