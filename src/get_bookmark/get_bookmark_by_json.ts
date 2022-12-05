import { readJson } from 'jsonfile/mod.ts';
import { Bookmark } from '/@/get_bookmark/type.ts';
const { cwd } = Deno;

const bookmarkJsonList: Bookmark[] = (await readJson(
  `${cwd()}/src/assets/bookmarks.json`
)) as Bookmark[];

const bookmarks = bookmarkJsonList
  .filter((item) => item.url)
  .map((item) => {
    return {
      name: item.title,
      url: item.url,
      annotation: '',
      tags: [],
    };
  });
export { bookmarks };
