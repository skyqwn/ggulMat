import { pgTable, serial, text, pgEnum } from 'drizzle-orm/pg-core';

export const loginTypeEnum = pgEnum('users_loginType', [
  'email',
  'kakao',
  'apple',
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  loginType: loginTypeEnum('users_loginType').default('email').notNull(),
  nickname: text('nickname'),
  imageUri: text('imageUri'),
  kakaoImageUri: text('kakaoImageUri'),
  hashedRefreshToken: text('hashedRefreshToken'),
});

export type UserSelectType = typeof users.$inferSelect;
export type UserInsertType = typeof users.$inferInsert;
