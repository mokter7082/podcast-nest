import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Directory } from './dto/directory.entity';
import { Repository } from 'typeorm';
import { DirectoryFilterDto } from './dto/directory.filter.dto';
import { DirectoryDto } from './dto/directory.dto';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectRepository(Directory)
    private readonly directoryReposeitory: Repository<Directory>,
  ) {}
  async getDirectories(directoryFilterDto: DirectoryFilterDto): Promise<any> {
    return await this.directoryReposeitory.findAndCount();
  }
  async saveDirectory(directoryDto: DirectoryDto): Promise<any> {
    try {
      const { title, parentId } = directoryDto;
      const directory = this.directoryReposeitory.create({
        title,
        parentId,
      });
      const result = await this.directoryReposeitory.save(directory);
      return {
        isSuccess: true,
        message: 'Directory saved',
        data: result,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Title already exists');
      }
    }
  }
}
