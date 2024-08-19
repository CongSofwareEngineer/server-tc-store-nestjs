import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { formatRes } from 'src/utils/function';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/services/cloudinary';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
@ApiTags('user')
@SkipThrottle()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getUserByLimit(@Res() response, @Query() query): Promise<User[]> {
    try {
      const data = await this.userService.getUserByLimit(query);
      return formatRes(response, data);
    } catch (error) {
      return formatRes(response, null, true);
    }
  }

  @Get('check')
  async upload(@Res() response, @Query() query): Promise<User[]> {
    try {
      console.log('check');

      const data = await CloudinaryService.uploadImgSystem();
      console.log('====================================');
      console.log({ CloudinaryService: data });
      console.log('====================================');
      return formatRes(response, data);
    } catch (error) {
      console.log('====================================');
      console.log({ error });
      console.log('====================================');
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

  @ApiParam({
    name: '_id',
    required: true,
    description: '_id',
  })
  @Get('detail/:_id')
  async getUserByID(@Res() response, @Param() params): Promise<User | null> {
    const data = await this.userService.getUserByID(params);
    return formatRes(response, data);
  }

  @ApiParam({
    name: '_id',
    required: true,
    description: '_id',
  })
  @Get('check-user/:sdt')
  async getExitedUser(@Res() response, @Param() params): Promise<User | null> {
    const data = await this.userService.findOne(params.sdt);
    return formatRes(response, { exit: !!data });
  }

  @ApiParam({
    name: '_id',
    required: true,
    description: '_id',
  })
  @Delete('delete/:_id')
  async deleteUserByID(@Res() response, @Param() params): Promise<User | null> {
    const data = await this.userService.deleteUserByID(params._id);
    return formatRes(response, data);
  }

  @Post('register')
  async createUser(@Res() response, @Body() userData): Promise<User> {
    const data = await this.userService.createUser(userData);
    return formatRes(response, data);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiBody({
    description: 'Login User',
    required: true,
    type: Object,
  })
  @Post('login')
  async login(@Res() response, @Body() body): Promise<User | null> {
    const data = await this.userService.login(body);
    return formatRes(response, data);
  }

  @ApiBody({
    description: 'Login User',
    required: true,
    type: Object,
  })
  @Post('login/refresh')
  async loginRefresh(
    @Res() response,
    @Body() createUserDto,
  ): Promise<User | null> {
    const data = await this.userService.loginRefresh(
      createUserDto.sdt,
      createUserDto.pass,
    );
    return formatRes(response, data);
  }

  @ApiBody({
    description: 'update User',
    required: true,
    type: Object,
  })
  @Post('update/:_id')
  async updateUser(
    @Res() response,
    @Body() body,
    @Param() param,
  ): Promise<User | null> {
    const data = await this.userService.updateUser(param, body);
    return formatRes(response, data);
  }

  @ApiBody({
    description: 'update User',
    required: true,
    type: Object,
  })
  @Post('update-avatar/:_id')
  @UseInterceptors(AnyFilesInterceptor())
  async updateAvatarUser(
    @Res() response,
    @Body() body,
    @Param() param,
  ): Promise<User | null> {
    const data = await this.userService.updateAvatarUser(param, body);
    return formatRes(response, data);
  }
}
