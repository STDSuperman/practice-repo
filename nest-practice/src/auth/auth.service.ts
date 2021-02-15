import { Injectable } from '@nestjs/common';
import { AuthPayload } from './types';
import { JwtService  } from '@nestjs/jwt';
import { LoginInfo, Profile } from './types';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async validateUser (username: string, password: string) {
        return { username, password };
    }

    async login(user: AuthPayload): Promise<LoginInfo>{
        const payload = { username: user.username, sub: user.password };
        return {
            access_token: this.jwtService.sign(payload),
            userId: Math.random().toString(),
        }
    }

    async getProfile(userId): Promise<Profile> {
        return { username: '43', avatar: 'https://i0.hdslb.com/bfs/face/3a6ed50a536c9765c107edd12e7d166fae40cc44.jpg@96w_96h_1c.webp' }
    }
}