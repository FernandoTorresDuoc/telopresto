import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPassPageRoutingModule } from './modificar-pass-routing.module';

import { ModificarPassPage } from './modificar-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPassPageRoutingModule
  ],
  declarations: [ModificarPassPage]
})
export class ModificarPassPageModule {}
