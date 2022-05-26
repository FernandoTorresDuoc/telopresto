import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Configs 


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ],
  providers: [ 
    {provide: RouteReuseStrategy , useClass: IonicRouteStrategy }, 
    //{ provide: AuthServiceConfig,
    //useFactory: getAuthServiceConfigs}
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
