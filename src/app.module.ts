import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsModule } from './uploads/uploads.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PredefinedDataModule } from './predefined-data/predefined-data.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_CONNECTION, {
    connectionFactory: (connection) => {
      connection.plugin(require('mongoose-autopopulate'));
      return connection;
    },
  }),
  MulterModule.register({dest : './storage'}),
  UsersModule,
  AuthModule,
  RolesModule,
  UploadsModule,
  MailerModule,
  PredefinedDataModule,
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
