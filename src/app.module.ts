import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MusicTitleModule } from './music-title/music-title.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgre',
      database: 'podcast',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    MusicTitleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
