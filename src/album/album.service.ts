import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './dto/album.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async albums(paginationDto: PaginationDto): Promise<any> {
    try {
      const page = parseInt(paginationDto.page) || 1;
      const limit = parseInt(paginationDto.limit) || 10;
      const skip = (page - 1) * limit;
      const [data, totalItems] = await this.albumRepository.findAndCount({
        skip,
        take: limit,
      });

      return {
        data,
        limit,
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      };
    } catch (error) {
      return error;
    }
  }
  async album(body: AlbumDto): Promise<any> {
    try {
      const { name, description, status } = body;
      const album = this.albumRepository.create({
        name,
        description,
        status,
      });
      const result = await this.albumRepository.save(album);
      return {
        isSuccess: true,
        message: 'Album saved',
        data: result,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Name already exists');
      }
    }
  }

  async singleAlbum(id: string): Promise<Album> {
    try {
      const data = await this.albumRepository.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Data with ID ${id} not found`);
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async updateAlbum(id: string, albumDto: AlbumDto): Promise<Album> {
    const data = await this.albumRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }

    // Update fields with provided values
    Object.assign(data, albumDto);

    // Save the updated data
    await this.albumRepository.save(data);

    return data;
  }
  async albumDelete(id: string): Promise<any> {
    const data = await this.albumRepository.delete(id);
    if (data?.affected) {
      return {
        message: 'Delete Successfull',
      };
    }
  }
}
