import { Injectable, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TwilioService } from "nestjs-twilio";
import { PrismaService } from "src/PrismaModule/prisma.service";

@Injectable()
export class AuthService {
    constructor(public prismaService: PrismaService, public twilioService: TwilioService,public jwt: JwtService) {}

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
            body: `Myntra: Your OTP is ${otp}`,
            from: process.env.TWILIO_NUMBER,
            to: phoneNumber
        })
    }

    getToken1(phoneNumber,otp) {
        var payload = {
           sub: phoneNumber,otp
        }
        return this.jwt.signAsync(payload,{
            expiresIn: process.env.EXPIRY,
            secret: process.env.SECRET
        })
    }

    async checkNumberExists(phoneNumber) {
        const qres = await this.prismaService.user.findMany({where: {mobileNumber: phoneNumber}})
        
        if(qres.length>0) return true
        else return false
    }

    async checkEmailExists(email) {
        const qres = await this.prismaService.user.findMany({where: {email: email}})
        
        if(qres.length>0) return true
        else return false
    }

    async register(dto) {
        var emailQuery = await this.prismaService.user.findFirst({
            where: {email: dto.email}
        })
        if(emailQuery!=null) {
            return {
                status: false,
                message: "Email exists",
                data: null
            }
        }
        const user = await this.prismaService.user.create({
            data: {
                mobileNumber : dto.mobileNumber,
                fullName    : dto.fullName,
                password    : dto.password,
                email       : dto.email,
                gender      : dto.gender,
                alternateMobileNumber : "",
                hintName    :  dto.hintName,
            }, 
        })
        
        
        var token =  await this.getToken1(dto.mobileNumber,dto.password)
        return {
            status: true,
            message: "Registered successfully",
            data: {
                jwt: token
            }
        }
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
        
        var qres = await this.verifyOTP(data)
        
        if(qres.otp == data.otp) {
            
            var userExistance = await this.checkNumberExists(data.phoneNumber)
            
            if(userExistance) {
                
                var token = await this.getToken1(data.phoneNumber,data.otp)
                
                
                return {
                    status: true,
                    message: "Existing User",
                    data: {
                        jwt: token
                    }
                }
                
            }
            else {
                return {
                    status: true,
                    message: "New User",
                    data: null
                }
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

    async loginpass(data) {
        var exists = this.checkNumberExists(data.userId)
        if(exists) {
                var qres = await this.prismaService.user.findFirst({
                where: {mobileNumber: data.userId, password: data.password}
            })  
            if(qres!=null)
            return true
        }
        exists = this.checkEmailExists(data.userId)
        if(exists) {
                var qres = await this.prismaService.user.findFirst({
                where: {email: data.userId, password: data.password}
            })  
            if(qres!=null) return true
        }
        return false 
    }

    async loginPass(data) {
       
        var temp = await this.loginpass(data);
        
        if(temp) {
            var token =  await this.getToken1(data.userId,data.password)
            return {
                status: true,
                message: "Login Successful",
                data: {
                    jwt: token
                }
            }
        }
        else {
            return {
                status: false,
                message: "Incorrect Credentials",
                data: null
            }
        }
    }

    async forgotPasswordOTP(data) {
        var getPhoneNumber = await this.prismaService.user.findFirst({
            where: {
                email: data.userId
            }
        })
        if(getPhoneNumber!=null) {
            data.userId=getPhoneNumber.mobileNumber
        }
        if(this.sendOTP(data.phoneNumber)) return {
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

    async forgotPasswordVerifyOTP(data) {
        var qres = await this.verifyOTP(data)
        
        if(qres.otp == data.otp) {
            
            var userExistance = await this.checkNumberExists(data.phoneNumber)
            
            if(userExistance) {
                
               return {
                status: true,
                message: "OTP is verified",
                data: null
               }    
            }
            else {
                return {
                    status: false,
                    message: "Account doesnt exist",
                    data: null
                }
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

    async forgotPassword(data) {
        var qres = this.prismaService.user.updateMany({
            data: {
                password: data.password
            },
            where: {
                mobileNumber: data.mobileNumber
            }
       
        })
        return {
            status: true,
            message: "Password updated successfully",
            data: null
        }
    }
    
}