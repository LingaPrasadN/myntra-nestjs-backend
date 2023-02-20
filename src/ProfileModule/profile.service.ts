import { Injectable } from "@nestjs/common";
import { TwilioService } from "nestjs-twilio";
import { AuthService } from "src/AuthModule/auth.service";
import { PrismaService } from "src/PrismaModule/prisma.service";

@Injectable()
export class ProfileService {
    constructor(public authService: AuthService, public prismaService: PrismaService, public twilioService: TwilioService) {}

    async updateProfile(data,user) {
        var getPhoneNumber = await this.prismaService.user.findFirst({
            where: {
                email: user
            }
        })
        if(getPhoneNumber!=null) {
            user=getPhoneNumber.mobileNumber
        }
        var qres = this.prismaService.user.updateMany({
            data: {
                mobileNumber: data.mobileNumber, 
                email: data.email,
                gender: data.gender,
                alternateMobileNumber: data.altMobileNumber,
                hintName: data.hintName,
                fullName: data.fullName
            },
            where: {mobileNumber: data.mobileNumber}
        })
        return {
            status: true,
            message: "Updated Successfully",
            data: null
        }
    }

    async getDetails(sub) {
        var getPhoneNumber = await this.prismaService.user.findFirst({
            where: {
                email: sub
            }
        })
        if(getPhoneNumber!=null) {
            sub=getPhoneNumber.mobileNumber
        }
        var qres = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: sub
            }
        })
        console.log(qres)
        return {
            status: true,
            message: "user details",
            data: qres
        }
    } 

    async changePassword(data,user) {
        console.log('Here')
        var getPhoneNumber = await this.prismaService.user.findFirst({
            where: {
                email: user
            }
        })
        if(getPhoneNumber!=null) {
            user=getPhoneNumber.mobileNumber
        }
        var qres = await this.prismaService.user.findFirst({
            where: {mobileNumber: user}
        })
        if(qres.password != data.oldPassword) {
            console.log("incorrect")
            return {
                status: false,
                message: "Incorrect Old Password",
                data: null
            }
        } 
        console.log('correct')
        var qres2 = await this.prismaService.user.updateMany({
            data: {password: data.newPassword} ,
            where: {mobileNumber: user}
        }) 
        console.log('updated')
        return {
            status: true,
            message: "Password updated",
            data: null
        }
    }

    async checkNumber(data) {
        var qres = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: data.phoneNumber
            }
        })
        if(qres!=null) {
            return {
                status: false,
                message: "Already Exists",
                data: null
            }
        }
        return {
            status: true,
            message: "Doesn't exists",
            data: null
        }
    }

    sendOTP(phoneNumber) {
        var otp =  Math.floor((Math.random() * 1000)+1000).toString()
        
        try {
            var qres = this.storeOtp(phoneNumber, otp)
            try {
                var otpRes = this.sendSMS(phoneNumber,otp)
            }
            catch(err2) {
                console.log(err2)
                return false
            }
            return true
        }
        catch(err) {
            return false 
        }
    }

    sendSMS(phoneNumber, otp) {
        return this.twilioService.client.messages.create({
            body: `Myntra: Your OTP to update Number is ${otp}`,
            from: process.env.TWILIO_NUMBER,
            to: phoneNumber
        })
    }

    async storeOtp(phoneNumber, otp) {
        var res = await this.prismaService.otpTable.findMany({
            where: {
                mobileNumber: phoneNumber
            }
        })
        if(res.length>0) {
            var qres = await this.prismaService.otpTable.update({
                
                data: {otp:otp},
                where: {mobileNumber: phoneNumber}
            })
            return qres
        }
        else {
            var qres = await this.prismaService.otpTable.create({
                data: {
                    mobileNumber: phoneNumber,
                    otp: otp
                }
            })
            return qres
        }
        
    }

    async verifyotp(data) {
        console.log("came here")
        var qres = await this.verifyOTP(data)
        
        if(qres.otp == data.otp) {
                
                return {
                    status: true,
                    message: "OTP is correct",
                    data: null
                }
                
            }
           
        else {
            
            return {
                status: false,
                message: "Incorrect OTP",
                data: null
            }

        }
        
    }

    verifyOTP(data) {
        var qres = this.prismaService.otpTable.findFirst({
            where: {mobileNumber: data.phoneNumber}
        })
        return qres
    }

    async updateNumber(data) {
        var qres = await this.prismaService.user.updateMany({
            data: {mobileNumber: data.newNumber},
            where: {mobileNumber: data.oldNumber}
        })
        console.log(qres)
        
        var qres2 = await this.prismaService.user.findFirst({
            where: {mobileNumber: data.newNumber}
        })
        var token = await this.authService.getToken1(data.newNumber,qres2.password)

        return {
            status: true,
            message: "Number updated",
            data: {
                jwt: token
            }
        }
    }    

}