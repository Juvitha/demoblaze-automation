import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { LoginPage } from '../pages/LoginPage';

// Creates a new account and logs in. Used by every test that needs a logged-in customer.
export async function signUpAndLogin(
  homePage: HomePage,
  signUpPage: SignUpPage,
  loginPage: LoginPage,
  user: { username: string; password: string }
) {
  await homePage.open();
  await homePage.clickSignUp();
  const message = await signUpPage.signUp(user.username, user.password);
  expect(message).toContain('Sign up successful');

  await homePage.open();   // reload the page to close the sign up pop-up
  await homePage.clickLogin();
  await loginPage.login(user.username, user.password);
  await homePage.verifyWelcome(user.username);
}