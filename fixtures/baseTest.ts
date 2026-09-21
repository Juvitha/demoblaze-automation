import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { OrderPage } from '../pages/OrderPage';
import { makeUniqueUsername } from '../utils/commonUtils';
import testData from '../testdata/testData.json';

type MyFixtures = {
  homePage: HomePage;
  signUpPage: SignUpPage;
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  orderPage: OrderPage;
  user: { username: string; password: string };
};

export const test = base.extend<MyFixtures>({

  // ---------- page objects ----------
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },

  // ---------- new user details (a new username for every test) ----------
  user: async ({}, use) => {
    const newUser = {
      username: makeUniqueUsername(testData.user.usernamePrefix),
      password: testData.user.password,
    };
    await use(newUser);
  },
});

export { expect } from '@playwright/test';