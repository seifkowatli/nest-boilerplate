import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Tenant } from './schemas/tenants.schema';
import { Permissions } from 'src/permissions/permissions.decorater';
import { Permission } from 'src/permissions/permission.enum';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Permissions(Permission.TENANT_CREATE)
  @Post()
  create(@Body() createTenantDto: CreateTenantDto) : Promise<Tenant> {
    return this.tenantsService.create(createTenantDto);
  }

  @Permissions(Permission.TENANT_FIND)
  @Get()
  findAll() :Promise<Tenant[]>{
    return this.tenantsService.findAll();
  }
  
  @Permissions(Permission.TENANT_FIND)
  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Tenant> {
    return this.tenantsService.findOne(id);
  }
  
  @Permissions(Permission.TENANT_UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) : Promise<Tenant> {
    return this.tenantsService.update(id, updateTenantDto);
  }
  
  @Permissions(Permission.TENANT_DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) : Promise<number> {
    return this.tenantsService.remove(id);
  }
}
