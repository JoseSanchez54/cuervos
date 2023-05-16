import cacheData from "memory-cache";
async function fetcherSWR(url, options) {
  const value = cacheData.get(url);
  if (value) {
    return value;
  } else {
    const hours = 24;
    const res = await fetch(url, options);
    const data = await res.json();
    cacheData.put(url, data, hours * 1000 * 60 * 60);
    return data;
  }
}

export default fetcherSWR;
