import { Module } from "@nestjs/common";
import { TwilioModule } from "nestjs-twilio";
import { AuthModule } from "src/AuthModule/auth.module";
import { AuthService } from "src/AuthModule/auth.service";
import { JwtStrategy } from "src/AuthModule/strategy/auth.strategy";
import { PrismaService } from "src/PrismaModule/prisma.service";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
    imports: [AuthModule, TwilioModule.forRoot({
        accountSid: process.env.ACCOUNT_SID,
        authToken: process.env.AUTH_TOKEN
    })],
    controllers: [ProfileController],
    providers: [ProfileService]
})

export class ProfileModule {}