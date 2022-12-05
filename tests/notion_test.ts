import { assertEquals } from './deps.ts';

import { batchInsertUrlByNotion } from '/@/notion.ts';
const urls = [
  {
    name: 'test',
    url: 'http://localhost:github.com',
    annotation: '12',
    tags: [],
  },
];

Deno.test('batchInsertUrlByNotion', async () => {
  const rea = await batchInsertUrlByNotion(urls);
  assertEquals(rea, true);
});
