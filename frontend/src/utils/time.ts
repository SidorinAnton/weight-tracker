/**
 * Возвращает timestamp в миллисекундах
 * @param strDate Дата с бека в виде строки (ex: 2023-01-19)
 */
export const toTimestamp = (strDate: string): number => {
  return new Date(strDate).getTime();
};

export const toBackendDate = (date: Date | null): string | undefined => {
  if (!date) {
    return undefined;
  }
  return date.toISOString().split("T")[0];
};
