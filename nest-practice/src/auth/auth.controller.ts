import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { of, Observable } from 'rxjs'
import { LoginInfo } from './types';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user): Promise<Observable<LoginInfo>> {
        return of(await this.authService.login(user))
    }
}