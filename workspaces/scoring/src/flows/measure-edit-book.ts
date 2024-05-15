import { calculateFlowScore, measureFlow } from '../helpers';
import type { MeasureResult } from '../types/measure-result';

const meta = {
  max: 50,
  name: '[Admin] 作品の情報を編集する',
};

export const measureEditBook = async (baseUrl: string): Promise<MeasureResult> => {
  const startTime = Date.now()
  const logTime = (message: string) => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`${message}: ${elapsed} seconds`);
  };

  logTime('Start')
  await fetch(new URL('/api/v1/initialize', baseUrl));
  const url = new URL('/admin', baseUrl);

  try {
    console.group('Measuring edit book flow');
    const startTime = Date.now(); // 開始時刻を記録
    const logTime = (message: string) => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`${message}: ${elapsed} seconds`);
    };

    const result = await measureFlow(url.href, async (page, flow) => {
      logTime('Start measureFlow');
      const emailTextBox = await page.waitForSelector('input[name="email"]');
      await emailTextBox!.type('administrator@example.com');
      logTime('Typed email');

      const passwordTextBox = await page.waitForSelector('input[name="password"]');
      await passwordTextBox!.type('pa5sW0rd!');
      logTime('Typed password');

      const button = await page.waitForSelector('button ::-p-text(ログイン)');
      await button!.focus();
      await button!.click();
      logTime('Clicked login button');

      await flow.navigate(new URL('/admin/books', baseUrl).href);
      logTime('Navigated to /admin/books');

      await flow.startTimespan();
      logTime('Started timespan');

      const detailsButton = await page.waitForSelector('button ::-p-text(詳細)');
      await detailsButton!.click();
      logTime('Clicked details button');

      const editButton = await page.waitForSelector('section[aria-label="作品詳細"] button ::-p-text(編集)');
      await editButton!.click();
      logTime('Clicked edit button');

      const titleTextBox = await page.waitForSelector('input[name="nameRuby"]');
      await titleTextBox!.evaluate((element) => (element.value = ''));
      await titleTextBox!.type('やがてあなたになる');
      logTime('Typed new title');

      const submitButton = await page.waitForSelector('button ::-p-text(決定)');
      await submitButton!.click();
      logTime('Clicked submit button');

      await page.waitForSelector('section[aria-label="作品詳細"] ::-p-text(やがてあなたになる)');
      logTime('Verified new title');

      await flow.endTimespan();
      logTime('Ended timespan');
    });
    console.log('Result:', result);

    return {
      ...meta,
      score: calculateFlowScore(result),
      type: 'success',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      ...meta,
      reason: String(error),
      type: 'failure',
    };
  } finally {
    console.groupEnd();
  }
};
