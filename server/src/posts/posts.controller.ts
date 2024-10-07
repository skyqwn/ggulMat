import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserSelectType } from 'src/drizzle/schema/users.schema';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/')
  createPost(@Body() body: CreatePostDto, @GetUser() user: UserSelectType) {
    return this.postsService.createPost(body, user);
  }
  @Get('/markers/my')
  getAllMarkers(@GetUser() user: UserSelectType) {
    return this.postsService.getAllMarkers(user);
  }
}
