import { Module }  from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule   } from '@nestjs/jwt';
import { secret } from './jwt.constants';

@Module({
    imports: [PassportModule, JwtModule.register({
        secret: secret,
        signOptions: { expiresIn: '60s' },
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy]
})
export default class AuthModule {}