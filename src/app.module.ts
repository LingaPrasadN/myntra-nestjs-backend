import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from 'nestjs-stripe';
import { AddressModule } from './AddressModule/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './AuthModule/auth.module';
import { DataModule } from './DataModule/data.module';
import { HomeModule } from './HomeModule/home.module';
import { OrderModule } from './OrderModule/order.module';
import { ProductModule } from './ProductModule/product.module';
import { ProfileModule } from './ProfileModule/profile.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  
  AuthModule, ProfileModule, ProductModule, AddressModule, HomeModule, DataModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
