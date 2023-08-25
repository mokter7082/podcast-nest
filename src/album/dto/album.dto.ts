import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AlbumStatus } from 'src/utils/status';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  description: string;
  @IsEnum(AlbumStatus)
  @ApiProperty({
    enum: AlbumStatus,
  })
  status: AlbumStatus;
}
