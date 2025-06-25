export const setLocalStorageItem = (key: string, value: string): void => {
  window.localStorage.setItem(key, value);
};

export const getLocalStorageItem = (key: string) => {
  const data = window.localStorage.getItem(key) as string;
  try {
    return JSON.parse(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return data;
  }
};

export const deleteLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
};

export const truncateText = (
  text: string | number,
  maxLength: number
): string => {
  if (typeof text === "number") return text.toString();
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};
