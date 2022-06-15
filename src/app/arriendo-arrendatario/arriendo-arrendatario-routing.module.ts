import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArriendoArrendatarioPage } from './arriendo-arrendatario.page';

const routes: Routes = [
  {
    path: '',
    component: ArriendoArrendatarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArriendoArrendatarioPageRoutingModule {}
