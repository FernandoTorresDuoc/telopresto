import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosArrendadorPage } from './servicios-arrendador.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosArrendadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosArrendadorPageRoutingModule {}
