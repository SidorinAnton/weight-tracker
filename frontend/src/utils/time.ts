export const toTimestamp = (strDate: string): number => {
  const date = new Date(strDate).getTime();
  return date / 1000;
};
