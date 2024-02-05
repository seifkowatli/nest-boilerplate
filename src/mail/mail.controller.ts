import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('testMail')
  testMail() {
    try {
      this.mailService.sendMail(
        'salkowatli@getgroup.com',
        'this is a test email',
        'this is the email content',
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return 'done';
  }
  
}
