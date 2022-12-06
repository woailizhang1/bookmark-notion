import { batchInsertNotion } from '/@/notion.ts';
import 'dotenv/load.ts';

const urls = Array.from(Array(5)).map(() => {
  return {
    name: 'test',
    url: 'http://localhost:github.com',
    annotation: '12',
    tags: [],
  };
});

Deno.test('batchInsertUrlByNotion', async () => {
  Deno.env.set('database_id', '6a52381951d24603ac13ba11f0c4558c');
  try {
    await batchInsertNotion(urls);
  } catch (e) {
    console.log(e);
    throw Error('EagleBookmarks err');
  }
});
