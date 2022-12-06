import { assertEquals } from './deps.ts';
import { getBookmarks } from '/@/get_bookmark/get_bookmark_by_json.ts';
import { getEagleBookmarks } from '/@/get_bookmark/get_bookmark_by_eagle_api.ts';

Deno.test('test #1', () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

Deno.test('bookmarks not 0', async () => {
  const bookmarks = await getBookmarks();
  if (bookmarks.length === 0) {
    throw Error('bookmarks not 0');
  }
});

Deno.test('eagleBookmarks not 0', async () => {
  try {
    await getEagleBookmarks();
  } catch (e) {
    console.log(e);
    throw Error('EagleBookmarks err');
  }
});
