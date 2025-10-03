import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  private products: CreateProductDto[]=[
    {
    id: uuid(),
    productName: "Sabritas Limón",
    price: 20,
    countSeal: 3,
    provider: uuid()
    },
    {
    id: uuid(),
    productName: "Chips Moradas",
    price: 26,
    countSeal: 2,
    provider: uuid()
    },
    {
    id: uuid(),
    productName: "FuzTea",
    price: 30,
    countSeal: 3,
    provider: uuid()
    }
  ]
  create(createProductDto: CreateProductDto) {
    createProductDto.id=uuid()
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound=this.products.filter((product)=>product.id==id)[0]
    if(!productFound) throw new NotFoundException()
    return productFound;
  }

  findByProvider(id: string){
  const productsFound = this.products.filter((product)=>product.provider === id);
  if(productsFound.length==0) throw new NotFoundException();
  return productsFound;
}

  update(id: string, updateProductDto: UpdateProductDto){
    let product= this.findOne(id)
    product={
      ...product,
      ...updateProductDto
    }
    return product
  }

  remove(productId: string) {
    const {id}=this.findOne(productId)
    this.products=this.products.filter((product) => product.id !== id)
    return this.products;
  }
}
