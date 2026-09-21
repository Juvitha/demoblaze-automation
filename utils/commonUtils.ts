import { Page } from '@playwright/test';

// nila -> nila1726000000000 (a new username every run)
export function makeUniqueUsername(prefix: string) {
  return prefix + Date.now();
}

// Saves a screenshot in the "screenshots" folder
export async function takeScreenshot(page: Page, testName: string) {
  const fileName = testName.replace(/[^a-zA-Z0-9]/g, '_');
  await page.screenshot({ path: 'screenshots/' + fileName + '.png', fullPage: true });
}