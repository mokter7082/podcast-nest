import { Module } from '@nestjs/common';
import { DirectoryService } from './directoy.service';
import { DirectoryController } from './directory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directory } from './dto/directory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Directory])],
  providers: [DirectoryService],
  controllers: [DirectoryController],
})
export class DirectoryModule {}
