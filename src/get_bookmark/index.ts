import { bookmarks } from '/@/get_bookmark/get_bookmark_by_json.ts';
import { urls } from '/@/get_bookmark/get_bookmark_by_eagle_api.ts';
const bookmar = [...bookmarks, ...urls];
