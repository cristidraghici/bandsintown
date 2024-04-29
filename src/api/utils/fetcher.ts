import getUrl from "./getUrl";

const fetcher = async <T>([url, options = {}]: [
  string,
  RequestInit?
]): Promise<T> => {
  const res = await fetch(getUrl(url), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return json as T;
};

export default fetcher;
