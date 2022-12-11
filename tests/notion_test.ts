import { notion } from '/@/notion.ts';
import { TEST_Database_Notion_Id } from '/@/notion_id.ts';
import { createBatchPropertiesList } from '/@/node_template.ts';
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
  try {
    await notion.batchCreate(
      createBatchPropertiesList(TEST_Database_Notion_Id, urls)
    );
  } catch (e) {
    console.log(e);
    throw Error('EagleBookmarks err');
  }
});

Deno.test('get notion dataset', async () => {
  try {
    const databases = await notion.databases.query({
      database_id: TEST_Database_Notion_Id,
    });
    console.log(databases.results.map((dat: any) => dat.properties));
  } catch (e) {
    console.log(e);
    throw Error('EagleBookmarks err');
  }
});
