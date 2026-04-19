import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'zobayerhossain',
      password: '', 
      database: 'product_inventory_db',
      autoLoadEntities: true,
      synchronize: true, // dev only
    }),
    ProductsModule,
  ],
})
export class AppModule {}