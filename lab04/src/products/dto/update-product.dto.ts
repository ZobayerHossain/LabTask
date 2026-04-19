import { CreateProductDto } from './create-product.dto';

// PUT — all fields required (inherits CreateProductDto as-is)
export class UpdateProductDto extends CreateProductDto {}