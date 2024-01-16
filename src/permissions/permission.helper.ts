import { Permission } from './permission.enum';

export class PermissionHelper {
  private static getPermissionsArray(roles): Permission[] {
    let permissionSet: Set<Permission> = new Set<Permission>();

    for (const role of roles) {
      role.permissions.forEach((rolesPermission) =>
        permissionSet.add(rolesPermission),
      );
    }
    return Array.from(permissionSet);
  }

  public static userHavePermission(
    roles,
    requiredPermissions: Permission[],
  ): boolean {
    const permissionsArray: Permission[] = this.getPermissionsArray(roles);

    return requiredPermissions.every((requiredPermission) =>
      permissionsArray.includes(requiredPermission),
    );
  }
}
