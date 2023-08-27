import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ArtistStatus } from './artist.status';

export class ArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;
  @IsEnum(ArtistStatus)
  @ApiProperty({
    enum: ArtistStatus,
  })
  status: ArtistStatus;
}
