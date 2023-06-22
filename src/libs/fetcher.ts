export const fetcher = (url, ...args) => {
  return fetch(import.meta.env.VITE_API_URL + url, ...args).then((res) =>
    res.json()
  );
};
