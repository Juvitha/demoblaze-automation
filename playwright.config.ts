import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();   // read the .env file

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  expect: { timeout: 15000 },
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.CI ? true : false,   // hidden browser on Jenkins, visible on your PC
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
});