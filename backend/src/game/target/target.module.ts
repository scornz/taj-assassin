import { Module, forwardRef } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Target, TargetSchema } from './target.schema';
import { UserModule } from 'user/user.module';
import { GameModule } from 'game/game.module';
import { PlayerModule } from 'game/player/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Target.name, schema: TargetSchema }]),
    UserModule,
    forwardRef(() => GameModule),
    PlayerModule,
  ],
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
