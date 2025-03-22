import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async authenticateUser(telegram_user: Users): Promise<Users> {
    const existingUser = await this.prisma.users.findUnique({
      where: { telegramUserId: telegram_user.telegramUserId },
    });

    if (existingUser) {
      // Проверяем, изменились ли данные
      const hasChanges =
        existingUser.first_name !== telegram_user.first_name ||
        existingUser.last_name !== telegram_user.last_name ||
        existingUser.username !== telegram_user.username ||
        existingUser.language_code !== telegram_user.language_code ||
        existingUser.allows_write_to_pm !== telegram_user.allows_write_to_pm ||
        existingUser.photo_url !== telegram_user.photo_url;

      if (hasChanges) {
        return this.prisma.users.update({
          where: { telegramUserId: telegram_user.telegramUserId },
          data: {
            first_name: telegram_user.first_name,
            last_name: telegram_user.last_name,
            username: telegram_user.username,
            language_code: telegram_user.language_code,
            allows_write_to_pm: telegram_user.allows_write_to_pm,
            photo_url: telegram_user.photo_url,
          },
        });
      }

      return existingUser;
    }

    // Если пользователя нет, создаем его
    return await this.prisma.users.create({
      data: {
        ...telegram_user,
        isAdmin: false,
      },
    });
  }
}
