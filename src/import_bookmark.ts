import { getBookmarks } from '/@/get_bookmark/get_bookmark_by_json.ts';
import { getEagleBookmarks } from '/@/get_bookmark/get_bookmark_by_eagle_api.ts';
import { notion } from './notion.ts';
import { TEST_Database_Notion_Id } from '/@/notion_id.ts';
import { createBatchPropertiesList } from '/@/node_template.ts';
const bookmarks = await getBookmarks();
const eagleBookmarks = await getEagleBookmarks();
const url = [...bookmarks, ...eagleBookmarks];
await notion.batchCreate(
  createBatchPropertiesList(TEST_Database_Notion_Id, url)
);
