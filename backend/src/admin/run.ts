import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GameService } from 'game/game.service';
import { TargetService } from 'game/target/target.service';
import { AppModule } from 'app.module';
import { MongoId } from 'utils/mongo';

async function bootstrap() {
  // const app = await NestFactory.createApplicationContext(AppModule);
  // // application logic...
  // const gme = app.get(GameService);
  // const trgt = app.get(TargetService);
  // const cfg = app.get(ConfigService);
  // const gameId = new MongoId(cfg.get<string>('ACTIVE_GAME_ID'));
  // // console.log('Matching players...');
  // // await trgt.matchPlayers(gameId);
  // // console.log('Done!');
  // // Marking target complete
  // await trgt.killTarget(gameId, new MongoId('650b17268969da82694ec5fc'));
}
bootstrap();
