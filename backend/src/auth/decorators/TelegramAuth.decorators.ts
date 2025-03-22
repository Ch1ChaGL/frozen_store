import { UseGuards } from '@nestjs/common';
import { TgInitDataAuthGuard } from '../tgInitData.strategy';

export const TelegramAuth = () => UseGuards(TgInitDataAuthGuard);
