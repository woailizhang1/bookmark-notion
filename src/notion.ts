import 'dotenv/load.ts';
import { CreatePageBodyParameters } from 'notion/api-endpoints.ts';
import { Client } from 'notion/mod.ts';
import { ClientOptions } from 'notion/Client.ts';
import { Bookmark } from '/@/get_bookmark/type.ts';
import { delay } from '/#/async/delay.ts';

export async function batchApi<T>(
  spaceRunFuncList: any[],
  continuousMax = 10,
  space = 1000
): Promise<T[][]> {
  const normalList: T[] = [];
  const errList: T[] = [];
  const promiseList: Promise<T>[] = [];
  for (let i = 0; i < spaceRunFuncList.length; i++) {
    promiseList.push(spaceRunFuncList[i]());
    await delay(100);
    if (i % continuousMax === 0 && i !== 0) {
      await delay(space);
    }
  }
  await Promise.all(promiseList);
  return [normalList, errList];
}

interface CreatePageBodyParametersList {
  (id: string, data: any): CreatePageBodyParameters;
}
class NotionDatabaseClient extends Client {
  constructor(options?: ClientOptions) {
    super(options);
  }
  batchCreate(
    id: string,
    data: any,
    createBatchProperties: CreatePageBodyParametersList
  ) {
    const batchPropertiesList: CreatePageBodyParameters[] = data.map(
      (item: any) => {
        return createBatchProperties(id, item);
      }
    );
    return batchApi(
      batchPropertiesList.map((properties: CreatePageBodyParameters) => {
        return () => this.pages.create(properties);
      })
    );
  }
}
const notion = new NotionDatabaseClient({
  auth: Deno.env.get('notion_integration_token'),
});

export { notion };
