import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DataService } from "./data.service";

@Controller('data')
export class DataController {
    constructor(public dataService: DataService) {}
    @Get() 
    get() {
        return "OK"
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('addtowish')
    addToWish(@Req() req) {
        return this.dataService.addToWish(req.productId,req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('movedtowish')
    movedToWish(@Req() req) {
        return this.dataService.addToWish(req.productId,req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('wishlist')
    getWishlist(@Req() req) {
        return this.dataService.getWishlist(req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('wishlist')
    deleteFromWishlist(@Body() data, @Req() req) {
        return this.dataService.deleteFromWishList(data, req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('addtobag')
    addToBag(@Req() req) {
        return this.dataService.addToBag(req)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('movetobag') 
    moveToBag(@Req() req) {
        return this.dataService.moveToBag(req)
    }

    @UseGuards(AuthGuard('jwt')) 
    @Get('bag')
    getBag(@Req() req) {
        return this.dataService.getBag(req)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('bag')
    deleteFromBag(@Body() data, @Req() req) {
        return this.dataService.deleteFromBag(data, req)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('bag')
    updateInBag(@Req() req) {
        return this.dataService.updateInBag(req)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('coupon')
    getCoupon(@Req() req) {
        return this.dataService.getCoupon(req)
    }

    
}