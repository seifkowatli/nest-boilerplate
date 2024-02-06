import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { TenantConnectionProvider } from 'src/tenants/tenants.provider';
import { createModelProvider } from 'src/tenants/tenants-model.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    UsersRepository,
    TenantConnectionProvider,
    createModelProvider(User.name, UserSchema)
  ],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
