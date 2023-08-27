import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { PaginationDto } from './dto/pagination.dto';
import { Artist } from './dto/artist.entity';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ArtistDto } from './dto/artist.dto';
import { ArtistStatus } from './dto/artist.status';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
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
  @ApiQuery({
    name: 'keyword',
    type: String,
    required: false,
    description: 'Search keyword',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Slect Status',
    enum: ArtistStatus,
  })
  getArtist(@Query() paginationDto: PaginationDto) {
    return this.artistService.getArtist(paginationDto);
  }
  @Post()
  saveArtist(@Body() artistDto: ArtistDto) {
    return this.artistService.saveArtist(artistDto);
  }
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Artist id',
    schema: { oneOf: [{ type: 'string' }] },
  })
  @Get(':id')
  singleAlbum(@Param('id') id: string) {
    return this.artistService.getSingleArtist(id);
  }

  @Put(':id')
  artistUpdate(@Param('id') id: string, @Body() albumDto: ArtistDto) {
    return this.artistService.updateArtist(id, albumDto);
  }

  @Delete(':id')
  artistDelete(@Param('id') id: string) {
    return this.artistService.artistDelete(id);
  }
}
