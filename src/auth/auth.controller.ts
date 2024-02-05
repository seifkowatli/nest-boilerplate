import { ResetPasswordDto } from './dto/reset-password.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/permissions/permissoins.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Permission } from 'src/permissions/permission.enum';
import { Permissions } from 'src/permissions/permissions.decorater';
import { LoginUserDto } from './dto/login.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}


  @ApiBearerAuth()
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req): any {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Permissions(Permission.DASHBOARD_LOGIN)
  @Get('permissions')
  getAllPermissions() {
    return Permission;
  }


  @ApiBody({ type: LoginUserDto , required: true})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): any {
    //TODO check what type should be added in here
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): any {
    //TODO figure out how to set a type instead of any in here
    return this.authService.register(createUserDto);
  }  
 
  @Post('verify-token')
  verifyToken(@Body() verifyTokenDto: VerifyTokenDto): any {
    return this.authService.verifyToken(verifyTokenDto);
  }

  @Post('reset-password-request')
  resetPasswordRequest(@Body() resetPasswordRequestDto: ResetPasswordRequestDto): unknown {
    return this.authService.resetPasswordRequest(resetPasswordRequestDto);
  }

  @Post('update-password')
  updatePassword(@Body() resetPasswordDto : ResetPasswordDto): any {
    return this.authService.updatePassword(resetPasswordDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Permissions(Permission.PASSWORD_RESET)
  @Post('update-password-admin')
  updatePasswordByAdmin(@Body() resetPasswordDto : ResetPasswordDto): any {
    return this.authService.updatePasswordByAdmin(resetPasswordDto);
  }
  
}
