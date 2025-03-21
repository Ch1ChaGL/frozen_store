import { BadRequestException, Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import * as crypto from 'crypto';
import * as qs from 'querystring';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  private BOT_TOKEN = '7772822863:AAGdOyT3LuwsjhrpaJbmaXAl7-IGjZiCyFw'; // Токен твоего бота

  @Get('getHello')
  getHello(): any {
    return { message: this.appService.getHello() };
  }

  @Get('getUserData')
  getUserData(@Headers('initData') initData: string) {
    if (!initData) {
      throw new BadRequestException('Init data is missing');
    }

    // Разбираем строку initData в объект
    const params = qs.parse(initData);
    if (!params.hash || !params.auth_date || !params.user) {
      throw new BadRequestException('Invalid init data format');
    }

    // Создаём строку для проверки
    const sortedKeys = Object.keys(params)
      .filter((key) => key !== 'hash') // Исключаем сам хеш
      .sort();
    const dataCheckString = sortedKeys
      .map((key) => `${key}=${params[key]}`)
      .join('\n');

    // Генерируем секретный ключ
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(this.BOT_TOKEN)
      .digest();

    // Проверяем подпись
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
    if (hmac !== params.hash) {
      throw new BadRequestException('Invalid hash: data may be forged');
    }

    // Преобразуем user в объект
    const user = JSON.parse(params.user as string);

    return { user };
  }
}
