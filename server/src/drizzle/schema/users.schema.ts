import { relations } from 'drizzle-orm';
import { pgTable, serial, text, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { posts } from './posts.schema';

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
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export type UserSelectType = typeof users.$inferSelect;
export type UserInsertType = typeof users.$inferInsert;
