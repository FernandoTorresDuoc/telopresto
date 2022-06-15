import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArriendoArrendatarioPageRoutingModule } from './arriendo-arrendatario-routing.module';

import { ArriendoArrendatarioPage } from './arriendo-arrendatario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArriendoArrendatarioPageRoutingModule
  ],
  declarations: [ArriendoArrendatarioPage]
})
export class ArriendoArrendatarioPageModule {}
