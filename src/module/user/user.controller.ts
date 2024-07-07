import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { formatRes } from 'src/utils/function';
import { CreateUserDto } from './dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async hello(@Res() response): Promise<User[]> {
    console.log({ snv: process.env.PASSWORD_MONGO });
    console.log({ snv: process.env.USER_NAME_MONGO });
    return formatRes(response, 'hello');
  }

  @Get('/user/:id')
  async getUserByID(@Res() response, @Param() params): Promise<User> {
    const data = await this.userService.getUserByID(params);
    return formatRes(response, data);
  }

  @Get('/all-user')
  async getAllUser(@Res() response): Promise<User[]> {
    try {
      const data = await this.userService.getAllUser();
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Get('/list-user')
  async getUserByLimit(@Res() response, @Query() query): Promise<User[]> {
    try {
      const page = query?.page || 1;
      const limit = query?.limit || 1;
      const data = await this.userService.getUserByLimit(page, limit);
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Post('/createUser-user')
  async createUser(@Res() response, @Body() userData: User): Promise<User> {
    try {
      const data = await this.userService.createUser(userData);
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Post('/user-login')
  async login(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return await this.userService.login(createUserDto.sdt, createUserDto.pass);
  }
}
