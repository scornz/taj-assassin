import { Module, forwardRef } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { GameModule } from 'game/game.module';
import { UserModule } from 'user/user.module';
import { Player, PlayerSchema } from './player.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PlayerModule,
    forwardRef(() => GameModule),
    UserModule,
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
    ConfigModule,
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
