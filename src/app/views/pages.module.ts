import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { IntroductionModule } from './introduction/introduction.module';
import { SignOnModule } from './sign-on/sign-on.module';


@NgModule({
  exports: [
    CommonModule,
    HomeModule,
    AuthModule,
    IntroductionModule,
    SignOnModule,
  ]
})
export class PagesModule { }
