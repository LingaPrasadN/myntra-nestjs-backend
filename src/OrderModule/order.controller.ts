import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OrderService } from "./order.service";

@Controller('order')
export class OrderController {
    constructor(public orderService: OrderService) {
        
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('checkout')
    checkout(@Req() req, @Body() body) {
        return this.orderService.checkout(req.user.sub, body)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('details/:orderid')
    getOrders(@Req() req, @Param('orderid') orderid) {
        return this.orderService.getOrders(req.user.sub, orderid)
    }
}