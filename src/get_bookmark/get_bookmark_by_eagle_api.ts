import { Bookmark } from '/@/get_bookmark/type.ts';

const jsonResponse = await fetch('http://localhost:41595/api/item/list', {
  headers: {
    'content-type': 'application/json; charset=utf-8',
  },
});

type EagleBookmark = {};

const jsonData = await jsonResponse.json();
const list = jsonData.data;
const urls = list.filter((item: any) => item.ext === 'url');

export { urls };
