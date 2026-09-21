import { test, expect } from '../fixtures/baseTest';
import testData from '../testdata/testData.json';
import { takeScreenshot } from '../utils/commonUtils';

// After every test: if it failed, take a screenshot
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await takeScreenshot(page, testInfo.title);
  }
});

test('E2E-01: New customer can sign up, log in and purchase a product', async ({
  homePage, signUpPage, loginPage, productPage, cartPage, orderPage, user,
}) => {
  const data = testData.e2e01;

  // 1. Open the website
  await homePage.open();
  await homePage.verifyHomePageOpened();

  // 2. Sign up
  await homePage.clickSignUp();
  const signUpMessage = await signUpPage.signUp(user.username, user.password);
  expect(signUpMessage).toContain('Sign up successful');

  // 3. Log in
  await homePage.open();
  await homePage.clickLogin();
  await loginPage.login(user.username, user.password);
  await homePage.verifyWelcome(user.username);

  // 4. Choose category and product
  await homePage.selectCategory(data.category);
  await homePage.openProduct(data.productName);
  await productPage.verifyProductPage(data.productName);
  const price = await productPage.getPrice();

  // 5. Add to cart
  const addMessage = await productPage.addToCart();
  expect(addMessage).toContain('Product added');

  // 6. Open the cart
  await homePage.openCart();
  await cartPage.verifyProductInCart(data.productName);
  await cartPage.verifyTotal(price);

  // 7. Place the order
  await cartPage.clickPlaceOrder();
  await orderPage.fillOrderForm(testData.order);
  await orderPage.clickPurchase();

  // 8. Verify the confirmation
  await orderPage.verifyPurchaseSuccess(price);
  await orderPage.clickOk();
  await homePage.verifyHomeShown();
});