import { Module, forwardRef } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { GameModule } from 'game/game.module';
import { UserModule } from 'user/user.module';
import { Player, PlayerSchema } from './player.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PlayerModule,
    forwardRef(() => GameModule),
    UserModule,
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
