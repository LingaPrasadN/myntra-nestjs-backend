import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TwilioModule } from "nestjs-twilio";
import { PrismaService } from "src/PrismaModule/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/auth.strategy";

@Module({
    imports: [
        JwtModule.register({}), 
        TwilioModule.forRoot({
            accountSid: process.env.ACCOUNT_SID,
            authToken: process.env.AUTH_TOKEN
        })
    ],
    providers: [AuthService, PrismaService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, PrismaService, JwtStrategy]
})

export class AuthModule {
    
}