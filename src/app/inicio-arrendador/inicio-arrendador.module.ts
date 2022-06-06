import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioArrendadorPageRoutingModule } from './inicio-arrendador-routing.module';

import { InicioArrendadorPage } from './inicio-arrendador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioArrendadorPageRoutingModule
  ],
  declarations: [InicioArrendadorPage]
})
export class InicioArrendadorPageModule {}
