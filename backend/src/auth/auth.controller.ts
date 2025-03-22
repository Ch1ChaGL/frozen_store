import { BadRequestException, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as crypto from 'crypto';
import * as qs from 'querystring';
import { validateTgInitData } from 'src/utils/validateTgInitData.utils';
import { TelegramAuth } from './decorators/TelegramAuth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TelegramAuth()
  @Post('authenticate')
  async authenticate(@Headers('tg_init_data') tg_init_data: string) {
    const user = validateTgInitData(tg_init_data);
    return await this.authService.authenticateUser(user);
  }

  @Post('test')
  async test() {
    return { test: 'test' };
  }
}
