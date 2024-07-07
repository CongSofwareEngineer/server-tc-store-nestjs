import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { formatRes } from 'src/utils/function';
import { CreateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/check')
  async hello(@Res() response): Promise<User[]> {
    console.log({ snv: process.env.PASSWORD_MONGO });
    console.log({ snv: process.env.USER_NAME_MONGO });
    return formatRes(response, 'hello');
  }

  @Get('/:id')
  async getUserByID(@Res() response, @Param() params): Promise<User> {
    const data = await this.userService.getUserByID(params);
    return formatRes(response, data);
  }

  @Get('/all')
  async getAllUser(@Res() response): Promise<User[]> {
    try {
      const data = await this.userService.getAllUser();
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Get('/list')
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

  @Post('/create')
  async createUser(@Res() response, @Body() userData: User): Promise<User> {
    try {
      const data = await this.userService.createUser(userData);
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return await this.userService.login(createUserDto.sdt, createUserDto.pass);
  }
}
