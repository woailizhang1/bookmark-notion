import { batchInsertUrlByNotion } from '/@/notion.ts';

const urls = Array.from(Array(100)).map(() => {
  return {
    name: 'test',
    url: 'http://localhost:github.com',
    annotation: '12',
    tags: [],
  };
});

Deno.test('batchInsertUrlByNotion', async () => {
  try {
    await batchInsertUrlByNotion(urls);
  } catch (e) {
    console.log(e);
    throw Error('EagleBookmarks err');
  }
});
