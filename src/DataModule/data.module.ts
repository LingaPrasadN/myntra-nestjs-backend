import { Module } from "@nestjs/common";
import { AuthModule } from "src/AuthModule/auth.module";
import { PrismaModule } from "src/PrismaModule/prisma.module";
import { DataController } from "./data.controller";
import { DataService } from "./data.service";

@Module({
    imports: [AuthModule,PrismaModule],
    providers: [DataService],
    controllers: [DataController]
})

export class DataModule {

}