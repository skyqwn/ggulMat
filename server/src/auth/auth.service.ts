import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { users } from 'src/drizzle/schema/users.schema';

@Injectable()
export class AuthService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

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
}
