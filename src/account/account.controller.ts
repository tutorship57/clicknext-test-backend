import {
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  get(@Req() req, @Param('id') accountIdParam) {
    const accountIdJwt:string = req.user.accountId;
    if (accountIdJwt !== accountIdParam) {
      throw new UnauthorizedException();
    }
    return this.accountService.findOne({ id: accountIdParam as string });
  }
}
