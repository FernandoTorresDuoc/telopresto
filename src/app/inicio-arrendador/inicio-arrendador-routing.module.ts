import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioArrendadorPage } from './inicio-arrendador.page';

const routes: Routes = [
  {
    path: '',
    component: InicioArrendadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioArrendadorPageRoutingModule {}
