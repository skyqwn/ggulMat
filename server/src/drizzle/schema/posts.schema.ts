import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { favorite } from './favorite.schema';

export const colorTypeEnum = pgEnum('post_color', [
  'RED',
  'BLUE',
  'GREEN',
  'PURPLE',
  'YELLOW',
]);

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  color: colorTypeEnum('post_color'),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  address: text('address').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  score: integer('score').notNull(),
  date: timestamp('date').defaultNow(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
  userId: integer('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  favorite: many(favorite),
}));

export type PostSelectType = typeof posts.$inferSelect;
export type PostInsertType = typeof posts.$inferInsert;
