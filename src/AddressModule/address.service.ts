import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/PrismaModule/prisma.service";

@Injectable()
export class AddressService {

    constructor(public prismaService: PrismaService) {}

    async addressSave(data, user) {

        var getPhoneNumber = await this.prismaService.user.findFirst({
            where: {
                email: user
            }
        })

        if(getPhoneNumber!=null) {
            user=getPhoneNumber.mobileNumber
        }

        var qres3 = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: user
            }
        })
        
        var qres = this.prismaService.addresses.create({
            data: {
                userId: qres3.id,
                name: data.name,
                mobileNumber: data.mobileNumber,
                pincode: data.pincode,
                address: data.address,
                locality: data.locality,
                city: data.city,
                state: data.state,
                typeOfAddress: data.typeOfAddress,
                satOpen: data.open.includes("Saturday"),
                sunOpen: data.open.includes("Sunday"),
                defaultAddr: data.defaultAddr
            }
        })

        return qres;

    }

    async getAddresses(user) {
        
        var getPhoneNumber = await this.prismaService.user.findFirst({
            where: {
                email: user
            }
        })

        if(getPhoneNumber!=null) {
            user=getPhoneNumber.mobileNumber
        }

        var uId = await this.prismaService.user.findFirst({
            where: {
                mobileNumber: user
            }
        })
        
        var addresses = await this.prismaService.addresses.findMany({
            where: {
                userId : uId.id
            }
        })

        return {
            status: true,
            message: "Address",
            data: addresses
        }

    }

    async addressUpdate(data,user) {

        var getPhoneNumber = await this.prismaService.user.findFirst({
            where: {
                email: user
            }
        })

        if(getPhoneNumber!=null) {
            user=getPhoneNumber.mobileNumber
        }

        var qres2 = await this.prismaService.user.findFirst({
            where: {mobileNumber: user}
        })

        var qres = await this.prismaService.addresses.update({
            data: {
                id: parseInt(data.id),
                userId: qres2.id,
                name: data.name,
                mobileNumber: data.mobileNumber,
                pincode: data.pincode,
                address: data.address,
                locality: data.locality,
                city: data.city,
                state: data.state,
                typeOfAddress: data.typeOfAddress,
                satOpen: data.open.includes("Saturday"),
                sunOpen: data.open.includes("Sunday"),
                defaultAddr: data.defaultAddr
            },
            where: {id: parseInt(data.id)}
        })

        return {
            status: true,
            message: "Address Updated",
            data: null
        }

    }

    async deleteAddress(aid) {

        try {
            var qres = await this.prismaService.addresses.delete({
                where: {
                    id: parseInt(aid)
                }
            })
        }
        catch(err) {
            console.log(err)
            return {
                status: false,
                message: "Address with specified id not found",
                data: "null"
            }
        }
        
        return {
            status: true,
            message: "Address removed",
            data: null
        }

    }

}