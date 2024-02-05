import { PartialType } from '@nestjs/swagger';
import { CreatePredefinedDatumDto } from './create-predefined-datum.dto';

export class UpdatePredefinedDatumDto extends PartialType(CreatePredefinedDatumDto) {}
