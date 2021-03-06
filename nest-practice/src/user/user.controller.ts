import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  Res,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { Cookie } from '../common/decorators/cookie.decorator';

@Controller('user')
export class UserController implements OnModuleInit, OnApplicationBootstrap {
  constructor(private userService: UserService) {}

  @Get('/one')
  async getOne(
    @Query('id') id: number,
    @Res({ passthrough: true }) res: Response,
    @Cookie('username') username,
  ) {
    const data = await this.userService.findOne(id);
    !username && res.cookie('username', data.username);
    return data;
  }

  @Get('/all')
  async getAll() {
    return await this.userService.findAll();
  }

  @Post('/insert')
  async insert(@Body('userData') userData: UserEntity) {
    await this.userService.insert(userData);
    return { code: 0, message: 'OK' };
  }

  onModuleInit() {
    console.log('模块初始化完成--控制器');
  }

  onApplicationBootstrap() {
    console.log('应用启动完成--控制器');
  }
}
