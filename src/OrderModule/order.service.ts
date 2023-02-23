import { Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import { PrismaService } from "src/PrismaModule/prisma.service";

@Injectable()
export class OrderService {
    constructor(public prismaService: PrismaService) {}
    async checkout(sub, data) {
       
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: sub
            }
        })
        
        var q2 = await this.prismaService.order.create({
            data: {
                userId: q.id,
                addressId: data.addressId,
                orderedOn: new Date().toString(),
                totalMrp: data.totalMrp,
                bagDiscount: data.bagDiscount,
                couponDiscount: data.couponDiscount,
                convinienceFee: data.convenienceFee,
                orderTotal: data.total,
                paymentMode: "Cash on Delivery",
                status: "Accepted"
            }
        })

        for(var i=0;i<data.items.length;i++) {
            var q3 = await this.prismaService.productDetails.create({
                data: {
                    orderId: q2.orderId,
                    productId: data.items[i].productId,
                    size: data.items[i].size,
                    quantity: data.items[i].quantity,
                    discount: 0
                }
            })
        } 
        return {
            status: true,
            message: "Order Placed",
            data: q2.orderId
        }
    }

    async getOrders(sub, orderid) {
        var q = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: sub
            }
        })
        var q2 = await this.prismaService.order.findFirst({
            where: {
                orderId: parseInt(orderid)
            },
            include: {
                productDetails: true
            }
        })
        var obj = {}
        obj["placedOn"] = q2.orderedOn
        obj["orderNo"] = q2.orderId
        obj["total"] = q2.orderTotal
        obj["userDetails"] = null
        obj["paymentMode"] = q2.paymentMode
        var items = []
        console.log(q2)
        for(var i=0; i<q2.productDetails.length;i++) {
            var obj2 = {}
            obj2["itemId"] = q2.productDetails[i].productId
            var q3 = await this.prismaService.product.findFirst({
                where: {
                    id: q2.productDetails[i].productId
                },
                select: {
                    brand: true,
                    name: true,
                    productImage: {
                        select: {
                            imageLink: true
                        }
                    },

                }
            })
            var obj3 = {}
            obj3["brand"] = q3.brand
            obj3["name"] = q3.name
            obj3["image"] = q3.productImage[0].imageLink
            obj2["productDetails"] = obj3
            obj2["size"] = q2.productDetails[i].size
            obj2["status"] = q2.status
            items.push(obj2)
        }
        obj["itemsInThisOrder"] = items
        return {
            status: true,
            message: "Order",
            data: obj
        }
    }
}