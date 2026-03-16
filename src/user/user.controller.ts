import { Controller, Req, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  proflie(@Req() req) {
    const userId: string = req.user.sub;
    const userEmail: string = req.user.email;
    const accountId: string = req.user.accountId;
    return {
      userId: userId,
      email: userEmail,
      accountId: accountId,
    };
  }
}
