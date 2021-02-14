import { Injectable } from '@nestjs/common';
import { AuthPayload } from './types';
import { JwtService  } from '@nestjs/jwt';
import { LoginInfo } from './types';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async validateUser (username: string, password: string) {
        return { username, password };
    }

    async login(user: AuthPayload): Promise<LoginInfo>{
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}