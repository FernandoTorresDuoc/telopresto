import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarServicioPage } from './ingresar-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarServicioPageRoutingModule {}
