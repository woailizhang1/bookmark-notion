import { readJson } from 'jsonfile/mod.ts';
import { Bookmark } from '/@/get_bookmark/type.ts';
const { cwd } = Deno;

async function getBookmarks(): Promise<Bookmark[]> {
  const bookmarkJsonList: Bookmark[] = (await readJson(
    `${cwd()}/src/assets/bookmarks.json`
  )) as Bookmark[];
  return bookmarkJsonList
    .filter((item) => item.url)
    .map((item) => {
      return {
        name: item.title,
        url: item.url,
        annotation: '',
        tags: [],
      };
    });
}

export { getBookmarks };
