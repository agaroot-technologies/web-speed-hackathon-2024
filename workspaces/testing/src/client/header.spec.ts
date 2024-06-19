import { expect, test } from '@playwright/test';

const BOOK_ID = 'bf0fffef-517b-4969-9a2c-3adcfacac17e';
const EPISODE_ID = 'c03dae65-2eee-4dbd-a796-0bc5dee54716';
const AUTHOR_ID = '2ab0aca5-7dc2-4543-ac98-e23fdaca0739';

const pages = [
  { name: '作者ページ', path: `/authors/${AUTHOR_ID}` },
  { name: '作品ページ', path: `/books/${BOOK_ID}` },
  { name: 'エピソードページ', path: `/books/${BOOK_ID}/episodes/${EPISODE_ID}` },
  { name: '検索ページ', path: '/search' },
];

for (const { name, path } of pages) {
  test.describe(`${name} のヘッダー`, () => {
    test.beforeEach(async ({ page }) => {
      // Given
      await page.goto(path);
    });

    test('トップへ戻るボタンが表示されていること', async ({ page }) => {
      // Then
      const header = page.getByRole('banner');
      const button = header.getByRole('link', { name: 'トップへ戻る' });
      await expect(button).toBeVisible();
      await expect(header).toHaveScreenshot(`${name}-header.png`);
    });

    test('トップへ戻るボタンを押すと、トップページに遷移すること', async ({ page }) => {
      // When
      const header = page.getByRole('banner');
      const button = header.getByRole('link', { name: 'トップへ戻る' });
      await button.click();

      // Then
      await expect(page).toHaveURL('/');
    });
  });
}
