import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ProfileService } from "./profile.service";

@Controller('profile')
export class ProfileController {
    constructor(public profileService: ProfileService) {}
    
    @Post('register')
    register(@Body() dto) {
        return this.profileService.authService.register(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('update') 
    update(@Body() data, @Req() req) {
        return this.profileService.updateProfile(data,req.user.sub)
    }

    @UseGuards(AuthGuard('jwt')) 
    @Get('getuserdetails')
    getDetails(@Req() req) {
        return this.profileService.getDetails(req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('changePassword')
    changePassword(@Body() data, @Req() req) {
        return this.profileService.changePassword(data,req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('checknumber')
    checkNumber(@Body() data) {
        return this.profileService.checkNumber(data)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('update/sendotp')
    sendOTP(@Body() data) {
        var qres =  this.profileService.sendOTP(data.phoneNumber)
        if(qres) return {
            status: true,
            message: "OTP Sent",
            data: null
        }
        else return {
            status: false,
            message: "Failed to send OTP",
            data: null
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('update/verifyotp')
    verifyOTP(@Body() data) {
        return this.profileService.verifyotp(data)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('updatenumber')
    updateNumber(@Body() data) {
        return this.profileService.updateNumber(data)
    }

}