import 'dotenv/load.ts';
import { Client } from 'notion/mod.ts';
import { Bookmark } from '/@/get_bookmark/type.ts';
import { delay } from '/#/async/delay.ts';
const notion = new Client({
  auth: Deno.env.get('notion_integration_token'),
});

// deno-lint-ignore no-explicit-any
async function insertUrlByNotion(url: any): Promise<Bookmark> {
  return await notion.pages
    .create({
      parent: {
        database_id: Deno.env.get('database_id') as string,
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
    })
    .then(() => {
      return url;
    })
    .catch(() => {
      return url;
    });
}
export async function batchInsertUrlByNotion(
  urls: Bookmark[],
  continuousMax = 10,
  space = 1000
): Promise<Bookmark[][]> {
  const normalList: Bookmark[] = [];
  const errList: Bookmark[] = [];
  for (let i = 0; i < urls.length; i++) {
    (() => {
      const index = i;
      return insertUrlByNotion(urls[index])
        .then(() => {
          normalList.push(...urls);
        })
        .catch(() => {
          errList.push(...urls);
        })
        .finally(() => {
          console.log(`总书签${urls.length},已经上传到${index}`);
        });
    })();
    await delay(100);
    if (i % continuousMax === 0 && i !== 0) {
      await delay(space);
    }
  }
  return [normalList, errList];
}
