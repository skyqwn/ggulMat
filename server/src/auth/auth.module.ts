import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [DrizzleModule],
})
export class AuthModule {}
