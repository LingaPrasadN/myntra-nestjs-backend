import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/PrismaModule/prisma.service";

@Injectable()
export class ProductService {
    constructor(public prismaService: PrismaService) {}
    

    async getProduct(pid) {
        var obj = {}
        var q = await this.prismaService.product.findFirst({
            where: {
                id: parseInt(pid)
            } 
        })
        obj["product"]=q
        var q2=await this.prismaService.sizes.findFirst({
            where: {
                productId: q.id
            }
        })
        obj["size"]=q2
        var q3=await this.prismaService.specification.findFirst({
            where: {
                productId: q.id
            }
        })
        obj["specification"]=q3
        var q4 = await this.prismaService.productImage.findMany({
            where: {
                productId: q.id
            }
        })
        obj["isWishListed"] = q.isWishlisted
        var images = []
        for(var i=0;i<q4.length;i++) {
            images.push(q4[i].imageLink)
        }
        obj["images"] = images
        return {
            status: true,
            message: "Product",
            data: obj
        }
    }

    async getProducts(sscid) {
        var q = await this.prismaService.product.findMany({
           
           where: {
                childCategoryId: parseInt(sscid)
           }
           
        })
        var arr = q
        var arr2 = []
        for(var i=0;i<arr.length;i++) {
            var obj = {}
            obj["product"] = arr[i]
            arr2.push(obj)
        }
        for(var i=0; i<arr.length;i++) {
            var q2 = await this.prismaService.productImage.findMany({
                where: {
                    productId: arr[i].id
                }
            })
            var images = []
            for(var j=0; j<q2.length;j++) {
                images.push(q2[j].imageLink)
            }
            arr2[i]["images"] = images
        }

        return {
            status: true,
            message: "Products",
            data: arr2
        }
    }
    
    

    async getProductsM(sscid) {
        var q = await this.prismaService.product.findMany({
           
            where: {
                 childCategoryId : parseInt(sscid)
            }
            
         })
         var arr = q
         var arr2 = []
         
         for(var i=0;i<arr.length;i++) {
             var obj = {}
             obj["product"] = arr[i]
             arr2.push(obj)
         }
         for(var i=0; i<arr.length;i++) {
             var q2 = await this.prismaService.productImage.findFirst({
                 where: {
                     productId: arr[i].id
                 }
             })
             if(q2!=null)
             arr2[i]["imageUrl"] = q2.imageLink
         }
        return {
            status: true,
            message: "Products",
            data: arr2
        }
    }

   

}