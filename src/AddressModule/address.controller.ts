import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AddressService } from "./address.service";

@Controller('address')
export class AddressController {
    constructor(public addressService: AddressService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Post('save')
    addressSave(@Body() data, @Req() req) {
        return this.addressService.addressSave(data,req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get() 
    addressGet(@Req() req) {
        return this.addressService.getAddresses(req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('edit') 
    addressUpdate(@Body() data, @Req() req) {
        return this.addressService.addressUpdate(data,req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('remove/:aid')
    deleteAddress(@Param() params) {
        console.log(params.aid)
        return this.addressService.deleteAddress(params.aid)
    }

}