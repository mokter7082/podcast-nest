import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-.dto';
import { User } from './dto/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './dto/current-user';

@ApiTags('Users ')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 201,
    schema: {
      $ref: getSchemaPath(CreateUserDto),
    },
  })
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }
  @Post('/signin')
  login(@Body() signInUser: SignInUserDto): Promise<SignInUserDto> {
    if (!signInUser) {
      throw new UnauthorizedException();
    }
    return this.authService.signIn(signInUser);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT-auth')
  @Post('/test')
  test(@CurrentUser() user: User) {
    return user;
  }
}
