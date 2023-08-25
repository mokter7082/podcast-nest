import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-.dto';
import { User } from './dto/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name, email, address, password } = createUserDto;
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const user = this.userRepo.create({
        name,
        email,
        address,
        password: hashedPassword,
      });
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async signIn(signInUser: SignInUserDto): Promise<any> {
    try {
      const { email, password }: any = signInUser;
      const user = await this.userRepo.findOne({ where: { email } });

      if (user && (await bcrypt.compare(password, user.password))) {
        const payload = { name: user.name, email: user.email };
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException('Please check credential');
      }
    } catch (error) {
      return error;
    }
  }
}

