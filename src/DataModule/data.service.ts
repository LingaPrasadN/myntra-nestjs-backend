import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/PrismaModule/prisma.service";

@Injectable()
export class DataService {
    constructor(public prismaService: PrismaService) {}
    async addToWish(productId, sub) {
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: sub
            }
        })
        try {
            var q2 = await this.prismaService.wishList.create({
                data: {
                    userId: q.id,
                    productId: parseInt(productId)
                }
            })
        }
        catch(err) {
            
        }
        
        return {
            status: true,
            message: "Added to wishlist",
            data: null
        }
    }

    async movedToWish(productId, sub) {
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: sub
            }
        })
        try {
            var q2 = await this.prismaService.wishList.create({
                data: {
                    userId: q.id,
                    productId: parseInt(productId)
                }
            })
        }
        catch(err) {
            
        }
        
        return {
            status: true,
            message: "Added to wishlist",
            data: null
        }
    }

    async getWishlist(sub) {
        var obj = {}
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: sub
            }
        })
        var q2 = await this.prismaService.wishList.findMany({
            where: {
                userId: q.id
            }
        })
        var items = []
        for(var i=0;i<q2.length;i++) {
            var q3 = await this.prismaService.product.findFirst({
                where: {
                    id: q2[i].productId
                },
                include: {
                    productImage: true
                }
            })
            var obj2 = {}
            obj2["productId"] = q3.id
            obj2["brand"] = q3.brand
            obj2["productName"] = q3.name
            obj2["mrp"] = q3.mrp
            obj2["discount"] = q3.discount
            if(q3.productImage[0]!=null)
            obj2["image"] = q3.productImage[0].imageLink
            else 
            obj2["image"] = ""
            obj2["ratings"] = q3.ratings
            obj2["star"] = q3.star
            obj2["seller"] = q3.seller
            items.push(obj2)
        }
        obj["items"] = items
        obj["countOfItems"] = items.length
        return {
            status: true,
            message: "Wish List",
            data: obj
        }
    }

    async deleteFromWishList(data,sub) {
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: sub
            }
        })
        for(var i=0;i<data.productIds.length;i++) {
            var q2 = await this.prismaService.wishList.deleteMany({
                where: {
                    userId: q.id,
                    productId: data.productIds[i]
                }
            })
        }
        return {
            status: true,
            message: "Removed items from wish list",
            data: null
        }
    }
    async addToBag(req) {
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: req.user.sub
            }
        })
        var avaialability = await this.prismaService.sizes.findFirst({
            where: {
                productId: req.productId
            }
        })
        switch(req.size) {
            case "XS":
                if(avaialability.xsavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "S":
                if(avaialability.savailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break
            case "M":
                if(avaialability.mavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "L":
                if(avaialability.lavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "XL":
                if(avaialability.xlavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "XXL":
                if(avaialability.xxlavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break  
        }
        try {
            var q2 = await this.prismaService.bag.create({
                data: {
                    productId: req.productId,
                    userId: q.id,
                    size: req.size
                }
            })
            return {
                status: true,
                message: "Added to bag",
                data: null
            }
        }
        catch(err) {
            var q3 = await this.prismaService.bag.findFirst({
               where: {
                userId: q.id,
                productId: req.productId,
                size: req.size
               }
            })
            var q4 = await this.prismaService.bag.updateMany({
                where: {
                    userId: q.id,
                    productId: req.productId,
                    size: req.size
                },
                data: {
                    quantity: q3.quantity+1
                }
            })
            return {
                status: true,
                message: "Product already exists, quantity increased by 1",
                data: null
            }
        }
        
    }
    async moveToBag(req) {
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: req.user.sub
            }
        })
        var avaialability = await this.prismaService.sizes.findFirst({
            where: {
                productId: req.productId
            }
        })
        switch(req.size) {
            case "XS":
                if(avaialability.xsavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "S":
                if(avaialability.savailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break
            case "M":
                if(avaialability.mavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "L":
                if(avaialability.lavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "XL":
                if(avaialability.xlavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "XXL":
                if(avaialability.xxlavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break  
        }
        try {
            var q2 = await this.prismaService.bag.create({
                data: {
                    productId: req.productId,
                    userId: q.id,
                    size: req.size
                }
            })
            
        }
        catch(err) {
            var q3 = await this.prismaService.bag.findFirst({
               where: {
                userId: q.id,
                productId: req.productId,
                size: req.size
               }
            })
            var q4 = await this.prismaService.bag.updateMany({
                where: {
                    userId: q.id,
                    productId: req.productId,
                    size: req.size
                },
                data: {
                    quantity: q3.quantity+1
                }
            })
        }
        return {
            status: true,
            message: "Moved to bag",
            data: null
        }
    }
    async getBag(req) {
        var obj = {}
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: req.user.sub
            }
        })
        
        var q2 = await this.prismaService.bag.findMany({
            where: {
                userId: q.id,
            }
        })
       
        var items = []
        var itemsCount = 0
        var selectedCount = 0
        var mrp = 0
        var bagDiscount = 0
        for(var i=0;i<q2.length;i++) {
            var q3 = await this.prismaService.product.findFirst({
                where: {
                    id: q2[i].productId
                },
                include: {
                    productImage: true,
                    sizes: true
                }
            })
            var obj2 = {}
            obj2["productId"] = q3.id
            obj2["brand"] = q3.brand
            obj2["productName"] = q3.name
            obj2["mrp"] = q3.mrp
            mrp+=q3.mrp
            obj2["discount"] = q3.discount
            bagDiscount += (q3.mrp-q3.price)
            if(q3.productImage[0]!=null)
            obj2["image"] = q3.productImage[0].imageLink
            else 
            obj2["image"] = ""
            obj2["size"] = q3.sizes
            obj2["selectedSize"] = q2[i].size
            obj2["quantity"] = q2[i].quantity
            obj2["selected"] = q2[i].selected
            if(q2[i].selected) {
                mrp+=(q3.mrp*q2[i].quantity)
                bagDiscount+=((q3.mrp-q3.price)*q2[i].quantity)
                selectedCount+=(q2[i].quantity)
            }
            itemsCount+=q2[i].quantity
            items.push(obj2)
        }
        var convinienceFee = mrp/100
        var temp = mrp-bagDiscount
        var total = mrp-bagDiscount+convinienceFee
        obj["items"] = items
        obj["selectedItemsCount"] = selectedCount
        obj["itemsCount"] = itemsCount
        var tempString = temp.toString()
        var coupon = await this.prismaService.coupon.findFirst({
            where: {
               AND: [
                {
                    expiryDate: {
                        gte: new Date()
                    }
                },
                {
                    minPurchase: {
                        gte: Math.floor((temp/Math.pow(10,tempString.length-1)))*Math.pow(10,tempString.length-1),
                        lt: Math.floor((temp/Math.pow(10,tempString.length-1))+1)*Math.pow(10,tempString.length-1)
                    }
                }
               ]
            }
        })
        if(coupon!=null)
        obj["coupon"] = coupon
        else
        obj["coupon"] = null
        obj["totalMrp"] = mrp
        obj["bagDiscount"] = bagDiscount
        if(coupon!=null)
        obj["couponDiscount"] = coupon.discount
        else 
        obj["couponDiscount"] = 0
        obj["convinienceFee"] = convinienceFee
        if(coupon!=null) 
        obj["total"] = Math.floor((total-(temp*coupon.discount)/100))
        else 
        obj["total"] = Math.floor(total)
        return {
            status: true,
            message: "Bag",
            data: obj
        }
    }
    async deleteFromBag(data, req) {
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: req.use.sub
            }
        })
        for(var i=0;i<data.list.length;i++) {
            var q2 = await this.prismaService.bag.deleteMany({
                where: {
                    userId: q.id,
                    productId: data.list[i].productId,
                    size: data.list[i].size
                }
            })
        }
        return {
            status: true,
            message: "Removed items from bag",
            data: null
        }
    }
    async updateInBag(req) {
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: req.use.sub
            }
        })
        var avaialability = await this.prismaService.sizes.findFirst({
            where: {
                productId: req.productId
            }
        })
        switch(req.size) {
            case "XS":
                if(avaialability.xsavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "S":
                if(avaialability.savailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break
            case "M":
                if(avaialability.mavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "L":
                if(avaialability.lavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "XL":
                if(avaialability.xlavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break 
            case "XXL":
                if(avaialability.xxlavailable<0) return {
                    status:false,
                    message: "Size not available",
                    data: null
                }
                break  
        }
        var q2 = await this.prismaService.bag.findMany({
            where: {
                userId: q.id,
                productId: req.productId,
                size: req.size
            }
        })
        var q3 = await this.prismaService.bag.updateMany({
            where: {
                userId: q.id,
                productId: req.productId,
                size: req.size
            },
            data: {
                size: req.newSize
            }
        })
        return {
            status: true,
            message: "Edited item from bag",
            data: null
        }
    }
    async getCoupon(req) {
        var q = await this.prismaService.coupon.findMany({
        })
        for(var i=0;i<q.length;i++) {
            if(q[i].expiryDate.getTime()-new Date().getTime()>0) {
                var obj ={}
                obj["couponId"]=q[i].id
                obj["couponCode"]=q[i].code
                obj["minimumPurchase"]=q[i].minPurchase
                obj["discountPercentage"]=q[i].discount
                obj["expiryDate"]=q[i].expiryDate.toISOString()
                obj["expiryTime"]=q[i].expiryTime.toTimeString()
                return {
                    status: true,
                    message: "Coupon",
                    data: obj
                }
            }
        }
        return {
            status: false,
            message: "No Coupons found",
            data: null
        }
    }
}