import { FC } from 'react';
import style from './Card.module.css';
import { IUsers } from '../../types/Users/Users.interface';

const Card: FC<IUsers> = ({
  telegramUserId,
  isAdmin,
  first_name,
  last_name,
  username,
  language_code,
  allows_write_to_pm,
  photo_url,
  is_premium,
}) => {
  return (
    <div className={style.card}>
      <div className={style.avatarContainer}>
        <img
          className={style.avatar}
          src={photo_url}
          alt={`${first_name} ${last_name}`}
        />
        {is_premium && <div className={style.premiumBadge}>🔥</div>}
      </div>
      <div className={style.userInfo}>
        <h3 className={style.name}>
          {first_name} {last_name}
        </h3>
        <p className={style.username}>@{username}</p>
        <p className={style.details}>
          <span className={style.telegramId}>ID: {telegramUserId}</span>
          {isAdmin && <span className={style.adminBadge}>Admin</span>}
        </p>
        <p className={style.language}>Language: {language_code}</p>
        <p className={style.pmStatus}>
          {allows_write_to_pm ? 'Can write to PM' : 'Cannot write to PM'}
        </p>
      </div>
    </div>
  );
};

export default Card;
