const API_URL = import.meta.env.VITE_API_URL;

const getUrl = (url: string): string => {
  const updatedUrl = new URL(`${API_URL}${url}`);
  updatedUrl.searchParams.set("app_id", import.meta.env.VITE_API_APP_ID);

  return updatedUrl.toString();
};

export default getUrl;
