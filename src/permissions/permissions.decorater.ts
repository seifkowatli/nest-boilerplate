import { SetMetadata } from "@nestjs/common";
import { Permission } from "./permission.enum";


export const PERMISSION_KEY = 'permissions';
export const Permissions = (...permissions: Permission[]) => SetMetadata(PERMISSION_KEY, permissions);


