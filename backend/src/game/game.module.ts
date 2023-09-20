import { Module, forwardRef } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TargetModule } from './target/target.module';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './game.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => PlayerModule),
    forwardRef(() => TargetModule),
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    ConfigModule,
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
