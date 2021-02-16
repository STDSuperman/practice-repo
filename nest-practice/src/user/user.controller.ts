import { Controller, Get, Query, Body, Post } from '@nestjs/common'
import { UserService } from './user.service';
import { UserEntity } from './user.entity'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/one')
    async getOne(@Query('id') id: number) {
        return await this.userService.findOne(id);
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
}