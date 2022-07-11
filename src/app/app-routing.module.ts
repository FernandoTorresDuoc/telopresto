import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    redirectTo: 'inicio',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    redirectTo: 'registrar',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar',
    redirectTo: 'recuperar',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'modificar-pass',
    redirectTo: 'modificar-pass',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio-arrendador',
    redirectTo: 'inicio-arrendador',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'servicios-arrendador',
    redirectTo: 'servicios-arrendador',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'arriendo-arrendatario',
    redirectTo: 'arriendo-arrendatario',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'ingresar-servicio',
    redirectTo: 'ingresar-servicio',
    pathMatch: 'full'
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'e404',
    loadChildren: () => import('./e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'modificar-pass',
    loadChildren: () => import('./modificar-pass/modificar-pass.module').then( m => m.ModificarPassPageModule)
  },
  {
    path: 'inicio-arrendador',
    loadChildren: () => import('./inicio-arrendador/inicio-arrendador.module').then( m => m.InicioArrendadorPageModule)
  },
  {
    path: 'servicios-arrendador',
    loadChildren: () => import('./servicios-arrendador/servicios-arrendador.module').then( m => m.ServiciosArrendadorPageModule)
  },
  {
    path: 'arriendo-arrendatario',
    loadChildren: () => import('./arriendo-arrendatario/arriendo-arrendatario.module').then( m => m.ArriendoArrendatarioPageModule)
  },
  {
    path: 'ingresar-servicio',
    loadChildren: () => import('./ingresar-servicio/ingresar-servicio.module').then( m => m.IngresarServicioPageModule)
  },

  // {
  //   path: 'tab1',
  //   loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  // },
  //  {
  //   path: 'tab2',
  //   loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  // },
  //  {
  //   path: 'tab3',
  //   loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
