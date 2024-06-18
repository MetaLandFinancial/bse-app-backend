import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';
// import { EmailLoginCode } from './auth/entities/email-login-code.entity';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
		isGlobal: true, // Makes the ConfigModule global, no need to import it elsewhere
		envFilePath: '.env', // Path to your .env file
    }),
    TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService) => ({
			type: 'postgres',
			host: configService.get<string>('PG_HOST'),
			port: configService.get<number>('PG_PORT'),
			username: configService.get<string>('PG_USER'),
			password: configService.get<string>('PG_PASSWORD'),
			database: configService.get<string>('PG_DATABASE'),
			entities: [User],
			synchronize: false,
			logging: true,  // Enable logging. It shows query and error logs
			
		}),
		inject: [ConfigService],
    }),
     UserModule
  ],
  controllers: [AppController], // Add AppController here
  providers: [AppService], // Add AppService here
})

export class AppModule {}

