import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get('POSTGRES_HOST')|| 'localhost',
        port: ConfigService.get('POSTGRES_PORT') || 5433,
        username: ConfigService.get('POSTGRES_USER')|| 'postgres',
        password: ConfigService.get('POSTGRES_PASSWORD')|| 'postgres',
        database: ConfigService.get('POSTGRES_DB')|| 'postgres',
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize:true
      })
    }),
    TransactionModule,
    CitiesModule,
    UserModule,
    AuthModule,
    AuthModule,
  ],
})
export class AppModule {}




//useFactory: (ConfigService: ConfigService) => {
//   const host = ConfigService.get('POSTGRES_HOST') || 'localhost';
//   const port = ConfigService.get('POSTGRES_PORT');
//   const username = ConfigService.get('POSTGRES_USER');
//   const password = ConfigService.get('POSTGRES_PASSWORD');
//   const database = ConfigService.get('POSTGRES_DB');

//   console.log('Database Config:', { host, port, username, password, database });

//   return {
//     type: 'postgres',
//     host,
//     port,
//     username,
//     password,
//     database,
//     entities: [join(process.cwd(), 'dist/**/*.entity.js')],
//     synchronize: true,
//   };
// }



















