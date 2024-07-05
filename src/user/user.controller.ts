import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CarateUserLoginDto } from './dto';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/all-user')
  getAllUser(): string {
    return this.appService.getAllUser();
  }

  @Post('/user-login')
  async login(
    @Body() carateUserLoginDto: CarateUserLoginDto,
  ): Promise<Array<Record<string, any>>> {
    return await this.appService.login(
      carateUserLoginDto.sdt,
      carateUserLoginDto.pass,
    );
  }
}
