import { getBookmarks } from '/@/get_bookmark/get_bookmark_by_json.ts';
import { getEagleBookmarks } from '/@/get_bookmark/get_bookmark_by_eagle_api.ts';
import { notion } from './notion.ts';
const urls = Array.from(Array(5)).map(() => {
  return {
    name: 'test',
    url: 'http://localhost:github.com',
    annotation: '12',
    tags: [],
  };
});
// const bookmarks = await getBookmarks();
// const eagleBookmarks = await getEagleBookmarks();
// const fullBookmarks = [...bookmarks, ...eagleBookmarks];
// Deno.env.set('database_id', '6a52381951d24603ac13ba11f0c4558c');
function aaa(id: string, obj: any) {
  return {
    parent: {
      database_id: id,
    },
    properties: {
      Name: {
        type: 'title',
        title: [
          {
            text: { content: obj.name as string },
          },
        ],
      },
      url: {
        type: 'url',
        url: obj.url as string,
      },
      ['描述']: {
        type: 'rich_text',
        rich_text: [
          {
            text: { content: obj.annotation as string },
          },
        ],
      },
      ['tags']: {
        type: 'multi_select',
        multi_select: obj.tags.map((tag: string) => {
          return {
            name: tag,
          };
        }),
      },
    },
  };
}

await notion.batchCreate('6a52381951d24603ac13ba11f0c4558c', urls, aaa);
