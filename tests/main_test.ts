import { assertEquals } from './deps.ts';
import { bookmarks } from '/@/get_bookmark/get_bookmark_by_json.ts';
import { urls } from '/@/get_bookmark/get_bookmark_by_eagle_api.ts';

Deno.test('test #1', () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

Deno.test('bookmarks as 286', () => {
  assertEquals(bookmarks.length, 286);
});

Deno.test('urls', () => {
  assertEquals(urls.length, 115);
});

Deno.test('urls  ss', () => {
  assertEquals(urls.length, 115);
});
