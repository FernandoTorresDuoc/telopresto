import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarServicioPageRoutingModule } from './ingresar-servicio-routing.module';

import { IngresarServicioPage } from './ingresar-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarServicioPageRoutingModule
  ],
  declarations: [IngresarServicioPage]
})
export class IngresarServicioPageModule {}
