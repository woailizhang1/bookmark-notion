import { CreatePageBodyParameters } from 'notion/api-endpoints.ts';
export function createBatchPropertiesList(
  id: string,
  list: any[]
): CreatePageBodyParameters[] {
  return list.map((obj) => {
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
  });
}
