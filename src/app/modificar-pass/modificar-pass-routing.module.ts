import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarPassPage } from './modificar-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarPassPageRoutingModule {}
