import { RolesRepository } from './roles.repository';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesRepository.create(createRoleDto);
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find({ is_editable: true }, { is_editable: 0 });
  }

  findOne(id: string): Promise<Role> {
    return this.rolesRepository.findOne(
      { _id: id, is_editable: true },
      { is_editable: 0 },
    );
  }

  update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.rolesRepository.findOneAndUpdate(
      { _id: id, is_editable: true },
      updateRoleDto,
    );
  }

  remove(id: string): Promise<number> {
    return this.rolesRepository.deleteMany({ _id: id });
  }
}
