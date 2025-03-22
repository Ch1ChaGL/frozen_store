import { Users } from '@prisma/client';

export const parseTgInitData = (initData: string): Users => {
  const { id, ...userData } = JSON.parse(initData, (key, value) => {
    if (key === 'id') {
      return value.toString(); // 👈 Преобразуем только id в строку
    }
    return value;
  });

  return {
    telegramUserId: id,
    ...userData,
  };
};
