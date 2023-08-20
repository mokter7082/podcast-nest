import { Module } from '@nestjs/common';
import { MusicTitleService } from './music-title.service';
import { MusicTitleController } from './music-title.controller';

@Module({
  providers: [MusicTitleService],
  controllers: [MusicTitleController]
})
export class MusicTitleModule {}
