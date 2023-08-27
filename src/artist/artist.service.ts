import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './dto/artist.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async getArtist(paginationDto: PaginationDto): Promise<any> {
    try {
      const keyword = paginationDto.keyword;
      const status = paginationDto.status;
      const page = parseInt(paginationDto.page) || 1;
      const limit = parseInt(paginationDto.limit) || 10;

      const skip = (page - 1) * limit;

      const queryBuilder = this.artistRepository
        .createQueryBuilder('artist')
        .skip(skip)
        .take(limit);

      if (keyword) {
        queryBuilder.where('artist.name LIKE :search', {
          search: `%${keyword}%`,
        });
      }
      if (status) {
        queryBuilder.where('artist.status = :status', { status });
      }
      const [data, total] = await queryBuilder.getManyAndCount();
      return {
        data,
        limit,
        totalItems: total,
        page,
        totalPages: Math.ceil(page / limit),
      };
    } catch (error) {}
  }

  async saveArtist(artistDto: ArtistDto): Promise<any> {
    try {
      const { name, description, status } = artistDto;
      const album = this.artistRepository.create({
        name,
        description,
        status,
      });
      const result = await this.artistRepository.save(album);
      return {
        isSuccess: true,
        message: 'Artist saved',
        data: result,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Name already exists');
      }
    }
  }
  async getSingleArtist(id: string): Promise<Artist> {
    try {
      const data = await this.artistRepository.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Data with ID ${id} not found`);
      }
      return data;
    } catch (error) {
      return error;
    }
  }
  async updateArtist(id: string, albumDto: ArtistDto): Promise<Artist> {
    const data = await this.artistRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }
    // Update fields with provided values
    Object.assign(data, albumDto);

    // Save the updated data
    await this.artistRepository.save(data);

    return data;
  }

  async artistDelete(id: string): Promise<any> {
    try {
      const data = await this.artistRepository.delete(id);
      if (data?.affected === 0) {
        throw new NotFoundException();
      }
      return {
        isSuccess: true,
        message: 'Delete Success',
      };
    } catch (error) {
      return error;
    }
  }
}
