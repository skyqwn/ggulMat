import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { posts } from './posts.schema';

export const favorite = pgTable('favorite', {
  id: serial('id').primaryKey(),
  postId: integer('postId').notNull(),
  userId: integer('userId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
});

export const favoriteRelations = relations(favorite, ({ one }) => ({
  user: one(users, {
    fields: [favorite.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [favorite.postId],
    references: [posts.id],
  }),
}));

export type FavoriteSelectType = typeof favorite.$inferSelect;
export type FavoriteInsertType = typeof favorite.$inferInsert;
