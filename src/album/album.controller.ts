import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { Album } from './dto/album.entity';
import { PaginationDto } from './dto/pagination.dto';
import { AlbumDto } from './dto/album.dto';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';

@ApiTags('Album')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT-auth')
@Controller('albums')
export class AlbumController {
  private logger = new Logger('AlbumController', { timestamp: true });
  constructor(private albumService: AlbumService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per limit',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: PaginationDto,
  })
  albums(@Query() paginationDto: PaginationDto): Promise<Album[]> {
    this.logger.verbose(`page is ${paginationDto.page}`);
    return this.albumService.albums(paginationDto);
  }
  @Post()
  album(@Body() body: AlbumDto): Promise<Album> {
    return this.albumService.album(body);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'album id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @Get(':id')
  singleAlbum(@Param('id') id: string): Promise<Album> {
    return this.albumService.singleAlbum(id);
  }

  @Put(':id')
  albumUpdate(@Param('id') id: string, @Body() albumDto: AlbumDto) {
    return this.albumService.updateAlbum(id, albumDto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'album id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @Delete(':id')
  albumDelete(@Param('id') id: string) {
    return this.albumService.albumDelete(id);
  }
}
