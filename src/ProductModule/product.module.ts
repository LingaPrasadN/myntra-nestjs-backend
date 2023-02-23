import { Module } from "@nestjs/common";
import { PrismaModule } from "src/PrismaModule/prisma.module";
import { DataController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [PrismaModule],
    controllers: [DataController],
    providers: [ProductService]
})

export class ProductModule {

}