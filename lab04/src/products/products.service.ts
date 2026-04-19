import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const saved = await this.productsRepo.save(product);
    return { message: 'Product created successfully', data: saved };
  }

  async findAll() {
    const data = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });
    return { message: 'All products fetched', count: data.length, data };
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return { message: 'Product fetched successfully', data: product };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    await this.findOne(id); // throws 404 if not found
    await this.productsRepo.update(id, dto);
    const updated = await this.productsRepo.findOne({ where: { id } });
    return { message: 'Product updated (patch)', data: updated };
  }

  async replace(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    await this.productsRepo.update(id, dto);
    const updated = await this.productsRepo.findOne({ where: { id } });
    return { message: 'Product replaced (put)', data: updated };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productsRepo.delete(id);
    return { message: 'Product deleted successfully', id };
  }

  async findByCategory(category: string) {
    const data = await this.productsRepo.find({ where: { category } });
    return { message: `Products in "${category}"`, count: data.length, data };
  }

  async search(keyword: string) {
    const data = await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) },
    });
    return { message: `Search results for "${keyword}"`, count: data.length, data };
  }

  async toggleActive(id: number) {
    const { data: product } = await this.findOne(id);
    product.isActive = !product.isActive;
    const saved = await this.productsRepo.save(product);
    return { message: `Product isActive toggled to ${saved.isActive}`, data: saved };
  }
}