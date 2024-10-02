import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
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

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export type PostSelectType = typeof posts.$inferSelect;
export type PostInsertType = typeof posts.$inferInsert;
