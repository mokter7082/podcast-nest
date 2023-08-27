import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { DirectoryModule } from './directory/directory.module';
import { MediaModule } from './media/media.module';

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
    AlbumModule,
    ArtistModule,
    DirectoryModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
