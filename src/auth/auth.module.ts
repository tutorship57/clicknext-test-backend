import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { SecurityModule } from '../common/security/security.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [UserModule, SecurityModule, AccountModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
