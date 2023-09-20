// Modules
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Utilities
import { getConnectUrl } from './utils/mongo';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri: getConnectUrl(config), // Loaded from .ENV
        };
      },
    }),
    UserModule,
    GameModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
