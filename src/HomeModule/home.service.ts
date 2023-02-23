import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/PrismaModule/prisma.service";

@Injectable()
export class HomeService {
    constructor(public prismaService: PrismaService) {}
    async getCategories() {
        var q = await this.prismaService.categories.findMany({
            /*
            include: {
                subCat: {
                    include: {
                        superSubCategories: true
                    }
                }
            }
            */
           select: {
            categoryName: true,
            subCat: {
                select: {
                    subCatName: true,
                    superSubCategories: {
                        select: {
                            childCategoryId: true,
                            childCategoryName: true
                        }
                    }
                }
            }
           },
        })
        var arr = q
        var arr2 = arr.map(obj=>obj.categoryName)
        var arr3 = arr.map(obj=>obj.subCat)
        var arr4 = []
        for(var i=0;i<arr3.length;i++) {
            var temp = []
            for (var j=0;j<arr3[i].length;j++) {
                var obj = {}
                obj[arr3[i][j].subCatName]=[]
                for(var k=0; k<arr3[i][j].superSubCategories.length;k++) {
                    obj[arr3[i][j].subCatName].push(arr3[i][j].superSubCategories[k])
                }
                temp.push(obj)
            }
            arr4.push(temp)
        }
        var res = {}
        for(var i=0;i<arr2.length;i++) {
            res[arr2[i]]=arr4[i]
        }
        
        return {
            status: true,
            message: "categories",
            data: res
        }
        
    }
    async getCategoriesM() {
        var q = await this.prismaService.categories.findMany({
          
        })
        return {
            status: true,
            message: "Categories",
            data: q
        }
    }
    async shopByCategoriesM() {
        var q = await this.prismaService.categories.findMany({
            include: {
                subCat: {
                    include: {
                        superSubCategories: true
                    }
                }
            }
        })
        var arr = q
        var arr2= []
        for(var i=0;i<arr.length;i++) {
            var obj = {}
            obj["categoryName"] = arr[i].categoryName
            obj["image"] = arr[i].image
            var q2 = await this.prismaService.subCategories.findMany({
                where: {
                    categoryId: arr[i].categoryId
                },
                include: {
                    superSubCategories: true
                }
            })
            var obj3 ={}
            for(var j=0;j<q2.length;j++) {
                var temp = []
                for(var k=0; k<q2[j].superSubCategories.length;k++) {
                    var obj2 = {}
                    obj2["childCategoryId"]=q2[j].superSubCategories[k].childCategoryId
                    obj2["childCategoryName"]=q2[j].superSubCategories[k].childCategoryName
                    temp.push(obj2)
                }
                
                obj3[q2[j].subCatName] = temp

            }
            
            obj["subCategory"]=obj3
            arr2.push(obj)
        }
        return {
            status: true,
            message: "Shop By Categories",
            data: arr2
        }
    }
    async homePage() {
        var res = {}
        //BEST OF MYNTRA EXCLUSIVE BRANDS
        var q = await this.prismaService.productImage.findMany({
            
        })
        var arr = []
        for(var i=0;i<q.length;i++) {
            var obj = {}
            obj["imageId"] = q[i].imageId
            obj["url"] = q[i].imageLink
            var q2 = await this.prismaService.product.findFirst({
                where: {
                    id: q[i].imageId
                },
                select: {
                    childCategoryId: true
                }
            }) 
            if(q2!=null)
            obj["homeCategoryId"] = q2.childCategoryId
            arr.push(obj)
        }
        res["BEST OF MYNTRA EXCLUSIVE BRANDS"] = arr

        //Deal of the day
        var q = await this.prismaService.productImage.findMany({
            
        })
        var arr2 = []
        for(var i=0;i<q.length;i++) {
            var obj = {}
            obj["imageId"] = q[i].imageId
            obj["url"] = q[i].imageLink
            var q2 = await this.prismaService.product.findFirst({
                where: {
                    id: q[i].imageId
                },
                select: {
                    childCategoryId: true
                }
            }) 
            if(q2!=null)
            obj["homeCategoryId"] = q2.childCategoryId
            arr2.push(obj)
        }
        res["Deal of the day"] = arr2

        //CATEGORIES TO BAG
        var q = await this.prismaService.productImage.findMany({
            
        })
        var arr3 = []
        for(var i=0;i<q.length;i++) {
            var obj = {}
            obj["imageId"] = q[i].imageId
            obj["url"] = q[i].imageLink
            var q2 = await this.prismaService.product.findFirst({
                where: {
                    id: q[i].imageId
                },
                select: {
                    childCategoryId: true
                }
            }) 
            if(q2!=null)
            obj["homeCategoryId"] = q2.childCategoryId
            arr3.push(obj)
        }
        res["CATEGORIES TO BAG"] = arr3

        //TOP PICKS
        var q = await this.prismaService.productImage.findMany({
            
        })
        var arr4 = []
        for(var i=0;i<q.length;i++) {
            var obj = {}
            obj["imageId"] = q[i].imageId
            obj["url"] = q[i].imageLink
            var q2 = await this.prismaService.product.findFirst({
                where: {
                    id: q[i].imageId
                },
                select: {
                    childCategoryId: true
                }
            }) 
            if(q2!=null)
            obj["homeCategoryId"] = q2.childCategoryId
            arr4.push(obj)
        }
        res["TOP PICKS"] = arr4

        return {
            status: true,
            message: "Home Page",
            data: res
        }
    }
}