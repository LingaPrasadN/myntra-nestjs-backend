import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('product')
export class DataController {

    constructor(public productService: ProductService) {} 

   
    @Get('all/:sscid')
    getProducts(@Param('sscid') sscid) {
        return this.productService.getProducts(sscid)
    }   

    @Get('/:pid')
    getProduct(@Param('pid') pid) {
        return this.productService.getProduct(pid)
    }

    @Get('getproductsm/:sscid') 
    getProductsM(@Param('sscid') sscid) {
        return this.productService.getProductsM(sscid)
    }    


}