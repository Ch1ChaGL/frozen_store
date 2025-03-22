import { BadRequestException } from '@nestjs/common';
import { Users } from '@prisma/client';
import * as crypto from 'crypto';
import * as qs from 'querystring';

export const validateTgInitData = (initData: string): Users => {
  const botToken = process.env.BOT_TOKEN;

  if (!initData) {
    throw new BadRequestException('Init data is missing');
  }

  const params = qs.parse(initData);
  if (!params.hash || !params.auth_date || !params.user) {
    throw new BadRequestException('Invalid init data format');
  }

  const sortedKeys = Object.keys(params)
    .filter(key => key !== 'hash')
    .sort();
  const dataCheckString = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join('\n');

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();
  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  if (hmac !== params.hash) {
    throw new BadRequestException('Invalid hash: data may be forged');
  }

  const { id, ...userData } = JSON.parse(params.user as string);

  return {
    telegramUserId: id,
    ...userData,
  };
};
