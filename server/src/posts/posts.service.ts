import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { CreatePostDto } from './dtos/create-post.dto';
import {
  UserInsertType,
  UserSelectType,
} from 'src/drizzle/schema/users.schema';
import { posts } from 'src/drizzle/schema/posts.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly configService: ConfigService,
  ) {}

  async createPost(
    {
      address,
      color,
      date,
      description,
      imageUris,
      latitude,
      longitude,
      score,
      title,
    }: CreatePostDto,
    user: UserSelectType,
  ) {
    try {
      const post = await this.db
        .insert(posts)
        .values({
          address,
          description,
          latitude,
          longitude,
          score,
          title,
          color,
          userId: user.id,
        })
        .returning();
      return post[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getAllMarkers(user: UserInsertType) {
    try {
      const markers = await this.db
        .select({
          id: posts.id,
          latitude: posts.latitude,
          longitude: posts.longitude,
          color: posts.color,
          score: posts.score,
        })
        .from(posts)
        .where(eq(posts.userId, user.id))
        .execute();
      return markers;
    } catch (error) {
      console.log(error);
    }
  }
}
