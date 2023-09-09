import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaSerrvice: MediaService) {}
  @Get()
  getAllMedia() {}
}
