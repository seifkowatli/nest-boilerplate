import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(receiver: string, title, content) {
    try {
      this.mailerService.sendMail({
        to: receiver,
        from: process.env.MAIL_FROM,
        subject: 'test',
        template: 'default',
        context: { title, content },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  

}
