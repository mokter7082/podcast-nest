import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { ConfigModule } from '@nestjs/config';
import { DirectoryModule } from './directory/directory.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.stage.${process.env.STAGE}`,
    }),
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
    AlbumModule,
    ArtistModule,
    DirectoryModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
