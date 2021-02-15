import { Module }  from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule   } from '@nestjs/jwt';
import { secret } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [PassportModule, JwtModule.register({
        secret: secret,
        signOptions: { expiresIn: `${10 * 60}s` },
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export default class AuthModule {}