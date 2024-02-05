import { TenantsService } from "./tenants.service";
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { GeneralUtils } from "src/utils/general.util";

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
  constructor(private readonly tenantsService: TenantsService) {}

  async use(req: any, res: any, next: () => void) {
    const tenantName = req.header("tenant");

    if (GeneralUtils.isEmpty(tenantName))
      throw new BadRequestException("Tenant is not provided");

    //check if tenant exists in the database
    const tenant = await this.tenantsService.findByName(tenantName);

    if (GeneralUtils.isEmpty(tenant))
      throw new BadRequestException("Invalid Tenant");

    req["tenant"] = tenant;

    next();
  }
}
