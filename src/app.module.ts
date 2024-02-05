import { MailerModule } from '@nestjs-modules/mailer';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PredefinedDataModule } from './predefined-data/predefined-data.module';
import { RolesModule } from './roles/roles.module';
import { TenantsMiddleware } from './tenants/tenants.middleware';
import { TenantsModule } from './tenants/tenants.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    MulterModule.register({ dest: './storage' }),
    UsersModule,
    AuthModule,
    RolesModule,
    UploadsModule,
    MailerModule,
    PredefinedDataModule,
    TenantsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantsMiddleware).exclude( 'tenants', 'tenants/(.*)').forRoutes('*');
  }
}
