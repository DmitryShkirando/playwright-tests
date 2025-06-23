import { test, expect } from '@playwright/test';

const elements = [
  {
    locator: (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'API' }),
    name: 'API link',
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node link',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub icon',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord icon',
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Dark mode icon',
  },
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
      'Playwright',
    );
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect.soft(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect.soft(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
    await expect.soft(page.getByRole('link', { name: 'Community' })).toContainText('Community');
  });

  test('Проверка атрибутов href элемнтов навигации хэдера', async ({ page }) => {
    await expect
      .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
      .toHaveAttribute('href', '/');
    await expect
      .soft(page.getByRole('link', { name: 'Docs' }))
      .toHaveAttribute('href', '/docs/intro');
    await expect
      .soft(page.getByRole('link', { name: 'API' }))
      .toHaveAttribute('href', '/docs/api/class-playwright');
    await expect
      .soft(page.getByRole('link', { name: 'Community' }))
      .toHaveAttribute('href', '/community/welcome');
    await expect
      .soft(page.getByRole('link', { name: 'GitHub repository' }))
      .toHaveAttribute('href', 'https://github.com/microsoft/playwright');
    await expect
      .soft(page.getByRole('link', { name: 'Discord server' }))
      .toHaveAttribute('href', 'https://aka.ms/playwright/discord');
  });

  test('Проверка переключения dark mode', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Проверка заголовка страницы', async ({ page }) => {
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toBeVisible();
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
  });

  test('Проверка кнопки Get Started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });
});
