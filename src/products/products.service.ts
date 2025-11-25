import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

   findOne(id: string) {
    const product=this.productRepository.findOneBy({
      id:id,
    })
    if(!product) throw new NotFoundException()
    return product;
  }

  findByProvider(id: string){
  return "OK"
}

  async update(id: string, updateProductDto: UpdateProductDto){
    const productToUpdate=await this.productRepository.preload({
      id:id,
      ...updateProductDto
    })
    if(!productToUpdate) throw new NotFoundException()
    this.productRepository.save(productToUpdate)
    return productToUpdate
  }

  remove(productId: string) {
    this.findOne(productId)
  return this.productRepository.delete({
    id:productId,
  })
  return {
    message: `Objeto con id ${productId} eliminado`
  }
}

}

