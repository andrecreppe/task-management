import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);
  
    if(!username) {
      //do not say what is wrong (password or user), just say it is wrong
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username }; //here you can add roles
    const accessToken = await this.jwtService.sign(payload);
    //This is a bad idea, just for test purpouse
    this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`)

    return { accessToken };
  }
}
