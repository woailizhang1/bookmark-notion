import { Client } from 'notion/mod.ts';
import { Bookmark } from '/@/get_bookmark/type.ts';
const notion = new Client({
  auth: 'auth',
});

// deno-lint-ignore no-explicit-any
async function insertUrlByNotion(url: any) {
  return await notion.pages.create({
    parent: {
      database_id: 'database_id',
    },
    properties: {
      Name: {
        type: 'title',
        title: [
          {
            text: { content: url.name },
          },
        ],
      },
      url: {
        type: 'url',
        url: url.url,
      },
      ['描述']: {
        type: 'rich_text',
        rich_text: [
          {
            text: { content: url.annotation },
          },
        ],
      },
      ['tags']: {
        type: 'multi_select',
        multi_select: url.tags.map((tag: string) => {
          return {
            name: tag,
          };
        }),
      },
    },
  });
}
export async function batchInsertUrlByNotion(urls: Bookmark[], max = 1) {
  for (
    let index = 0;
    index < urls.length && (max === -1 || index < max);
    index++
  ) {
    const url = urls[index];
    await insertUrlByNotion(url).then(() => {
      console.log(`总共书签数:${urls.length},已经插入:${index + 1}`);
    });
  }
  return true;
}
