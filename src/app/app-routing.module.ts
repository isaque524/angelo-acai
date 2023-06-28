import { HomeComponent } from './home/home.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AdmComponent } from './administrador/adm/adm.component';
import { AuthGuard } from './administrador/auth.guard';
import { SaboresComponent } from './administrador/components/sabores/sabores.component';
import { Tipos } from './administrador/components/tipos/tipo-informacao.component';
import { LoginComponent } from './administrador/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: HomeComponent },
  { path: 'cart', component: CartComponent },
   {path:'login', component:LoginComponent},
  {path:'adm',component:AdmComponent,canActivate:[AuthGuard],},
  {path:'sabores',component:SaboresComponent,canActivate:[AuthGuard],},
  {path:'tipos',component:Tipos,canActivate:[AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
