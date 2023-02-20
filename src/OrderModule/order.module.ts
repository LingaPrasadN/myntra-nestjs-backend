import { Module } from "@nestjs/common";
import { AuthModule } from "src/AuthModule/auth.module";
import { PrismaModule } from "src/PrismaModule/prisma.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports: [AuthModule, PrismaModule],
    providers: [OrderService],
    controllers: [OrderController]
})

export class OrderModule {

}