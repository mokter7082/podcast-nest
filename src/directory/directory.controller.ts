import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DirectoryService } from './directoy.service';
import { DirectoryFilterDto } from './dto/directory.filter.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DirectoryDto } from './dto/directory.dto';

@ApiTags('Directory')
@Controller('directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Number of items per page',
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
  @Get()
  getDerectories(@Query() directoryFilterDto: DirectoryFilterDto) {
    return this.directoryService.getDirectories(directoryFilterDto);
  }

  @Post()
  saveDirectory(@Body() directoryDto: DirectoryDto): Promise<any> {
    return this.directoryService.saveDirectory(directoryDto);
  }
}
