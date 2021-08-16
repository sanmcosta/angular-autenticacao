import { AutenticacaoGuard } from './autenticacao.guard';
import { LoginComponent } from './componentes/login/login.component';
import { LancamentosComponent } from './componentes/lancamentos/lancamentos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: LancamentosComponent, 
    canActivate: [AutenticacaoGuard]
  },
  {
    path:"login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
