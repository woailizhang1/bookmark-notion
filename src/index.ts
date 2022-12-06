import { getBookmarks } from '/@/get_bookmark/get_bookmark_by_json.ts';
import { getEagleBookmarks } from '/@/get_bookmark/get_bookmark_by_eagle_api.ts';
import { batchInsertUrlByNotion } from './notion.ts';

const bookmarks = await getBookmarks();
const eagleBookmarks = await getEagleBookmarks();
const fullBookmarks = [...bookmarks, ...eagleBookmarks];

await batchInsertUrlByNotion(fullBookmarks);
