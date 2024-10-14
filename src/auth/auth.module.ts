import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtGuard } from './jwt.guard';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, JwtGuard],
  controllers: [AuthController],
  exports: [JwtGuard],
})
export class AuthModule {}
