import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// PATCH — all fields optional
export class PartialUpdateProductDto extends PartialType(CreateProductDto) {}