import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {UserEffect} from "./share/store/effect/user-effect";
import {UserReducer} from "./share/store/reducer";
import {HttpService} from "./share/service/http/http.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({userList: UserReducer}, {}),
    EffectsModule.forRoot([UserEffect])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
