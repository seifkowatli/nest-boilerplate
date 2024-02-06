import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export const TENANT_PROVIDER: string = 'TENANT_PROVIDER';

export const TenantConnectionProvider = {
  provide: TENANT_PROVIDER,
  useFactory: async (request, connection: Connection) => {
    return connection.useDb(`tenant_${request.tenant.name}`);
  },
  inject: [REQUEST, getConnectionToken()],
};
