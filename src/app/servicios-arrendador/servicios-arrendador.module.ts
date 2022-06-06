import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosArrendadorPageRoutingModule } from './servicios-arrendador-routing.module';

import { ServiciosArrendadorPage } from './servicios-arrendador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosArrendadorPageRoutingModule
  ],
  declarations: [ServiciosArrendadorPage]
})
export class ServiciosArrendadorPageModule {}
