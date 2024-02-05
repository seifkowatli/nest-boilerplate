import { Connection, Model } from 'mongoose';
import { TENANT_PROVIDER } from './tenants.provider';

interface ModelProvider {
  provide: string;
  useFactory: (tenantConnection: Connection) => Promise<Model<any>>;
  inject: string[];
}

export const createModelProvider = (
  entityName: string,
  entitySchema: any,
): ModelProvider => ({
  provide: `${entityName}_MODEL`,
  useFactory: async (tenantConnection: Connection) => {
    return tenantConnection.model(entityName, entitySchema);
  },
  inject: [TENANT_PROVIDER],
});
