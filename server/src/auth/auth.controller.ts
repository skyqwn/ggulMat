import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { UserSelectType } from 'src/drizzle/schema/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('/signin')
  signin(@Body() createUserDto: CreateUserDto) {
    return this.authService.signin(createUserDto);
  }

  @Get('/refresh')
  @UseGuards(AuthGuard())
  refresh(@GetUser() user: Pick<UserSelectType, 'email'>) {
    return this.authService.refreshToken(user);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: UserSelectType) {
    return this.authService.getProfile(user);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  logout(@GetUser() user: UserSelectType) {
    return this.authService.deleteRefreshToken(user);
  }
}
