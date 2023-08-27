import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DirectoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  parentId: number;
}
