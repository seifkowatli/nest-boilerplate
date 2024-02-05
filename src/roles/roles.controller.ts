import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permission } from 'src/permissions/permission.enum';
import { Permissions } from 'src/permissions/permissions.decorater';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
import { Role } from './schemas/role.schema';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Permissions(Permission.ROLE_CREATE)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Permissions(Permission.ROLE_FIND)
  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Permissions(Permission.ROLE_FIND)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Permissions(Permission.ROLE_UPDATE)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Permissions(Permission.ROLE_DELETE)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.rolesService.remove(id);
  }
}
