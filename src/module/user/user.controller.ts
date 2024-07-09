import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { formatRes } from 'src/utils/function';
import { CreateUserDto } from './dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
@SkipThrottle()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getUserByLimit(@Res() response, @Query() query): Promise<User[]> {
    try {
      const data = await this.userService.getUserByLimit(query);
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Get('all-user')
  async getAllUser(@Res() response): Promise<User[]> {
    try {
      const data = await this.userService.getAllUser();

      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Get('check')
  async hello(@Res() response): Promise<User[]> {
    console.log({ snv: process.env.PASSWORD_MONGO });
    console.log({ snv: process.env.USER_NAME_MONGO });
    return formatRes(response, 'hello');
  }

  @Get('/:_id')
  async getUserByID(@Res() response, @Param() params): Promise<User> {
    console.log({ params });

    const data = await this.userService.getUserByID(params);
    console.log('====================================');
    console.log({ data });
    console.log('====================================');
    return formatRes(response, data);
  }

  @Post('create')
  async createUser(@Res() response, @Body() userData: User): Promise<User> {
    try {
      const data = await this.userService.createUser(userData);
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return await this.userService.login(createUserDto.sdt, createUserDto.pass);
  }
}
