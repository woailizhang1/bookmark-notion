async function getEagleBookmarks() {
  const jsonResponse = await fetch('http://localhost:41595/api/item/list');
  const jsonData = await jsonResponse.json();
  const list = jsonData.data;
  return list.filter((item: any) => item.ext === 'url');
}

export { getEagleBookmarks };
