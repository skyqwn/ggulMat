import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { users, UserSelectType } from 'src/drizzle/schema/users.schema';
import { eq } from 'drizzle-orm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    try {
      const { email, password, passwordConfirm } = createUserDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.db
        .insert(users)
        .values({
          email,
          password: hashedPassword,
          loginType: 'email',
        })
        .returning();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }

      throw new InternalServerErrorException(
        '회원가입 도중 에러가 발생했습니다.',
      );
    }
  }

  private async getTokens(payload: { email: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signin(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException('유저가 존재하지 않습니다.');
    }

    const checked = await bcrypt.compare(password, user.password);

    if (!checked) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const { accessToken, refreshToken } = await this.getTokens({ email });
    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  private async updateHashedRefreshToken(id: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    try {
      await this.db
        .update(users)
        .set({ hashedRefreshToken })
        .where(eq(users.id, id));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  getProfile(user: UserSelectType) {
    const { password, hashedRefreshToken, ...rest } = user;

    return { ...rest };
  }

  async deleteRefreshToken(user: UserSelectType) {
    try {
      await this.db
        .update(users)
        .set({ hashedRefreshToken: null })
        .where(eq(users.id, user.id));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async refreshToken(user: Pick<UserSelectType, 'email'>) {
    const { email } = user;
    const { accessToken, refreshToken } = await this.getTokens({ email });

    return { accessToken, refreshToken };
  }
}
