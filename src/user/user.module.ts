import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.registerAsync({
        imports:[ConfigModule],
        useFactory:(ConfigService:ConfigService) => ({
          secret: ConfigService.get('JWT_SECRET'),
          signOptions:{expiresIn: '1d'}
      }),
      inject:[ConfigService],
      })
    ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
