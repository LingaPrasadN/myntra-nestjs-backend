import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";


@Controller('loginorsignup')
export class AuthController {

    constructor(public authService: AuthService) {}

    @Post('forgotpasswordotp') 
    forgotPasswordOTP(@Body() data) {
        return this.authService.forgotPasswordOTP(data)
    }

    @Post('forgotPasswordverifyotp')
    forgotPasswordVerifyOTP(@Body() data) {
        return this.authService.forgotPasswordVerifyOTP(data)
    }

    @Post('forgotpassword')
    forgotPassword(@Body() data) {
        return this.authService.forgotPassword(data)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('verifyJwt')
    guardedPath(@Req() req) {
        return req.user.sub
    }

    @Post('sendotp') 
    loginOrSignup(@Body() data) {
        if(this.authService.sendOTP(data.phoneNumber)) return {
            status : true,
            message : "OTP Sent",
            data : null
        }
        else return {
            status : false,
            message : "Failed to send OTP",
            data : null
        }
    }

    @Post('verifyotp')
    verifyotp(@Body() data) {
        return this.authService.verifyotp(data)
    }

    @Post('password') 
    loginPass(@Body() data) {
        return this.authService.loginPass(data)
    }

    @Post('getjwt')
    getJWT(@Body() data) {
        return this.authService.getToken1(data.arg1,data.arg2)
    }

}