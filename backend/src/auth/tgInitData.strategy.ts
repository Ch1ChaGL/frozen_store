import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { validateTgInitData } from 'src/utils/validateTgInitData.utils';

@Injectable()
export class TgInitDataAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const initData = request.headers['tg_init_data']; // Берём initData из заголовков

    if (!initData) {
      throw new UnauthorizedException('InitData is missing');
    }

    try {
      // Проверяем initData и получаем пользователя
      const user = await this.authService.authenticateUser(
        validateTgInitData(initData),
      );

      if (!user) {
        throw new UnauthorizedException('User not found or invalid initData');
      }

      request.user = user; // Сохраняем пользователя в request
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
