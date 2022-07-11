import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';


// Configs 

const config: SocketIoConfig = { url: 'http://localhost:3002', options: {} };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, SocketIoModule.forRoot(config) , IonicModule.forRoot(), AppRoutingModule, HttpClientModule, CommonModule ],
  providers: [ 
    {provide: RouteReuseStrategy , useClass: IonicRouteStrategy },
    //{ provide: AuthServiceConfig,
    //useFactory: getAuthServiceConfigs}
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
