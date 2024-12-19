import { PartialType } from '@nestjs/mapped-types';
import { CreateAllDto } from './create-all.dto';

export class UpdateAllDto extends PartialType(CreateAllDto) {}
