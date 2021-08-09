import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParrillaComponent } from './parrilla/parrilla.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReservasComponent } from './reservas/reservas.component';
import { SaldoComponent } from './saldo/saldo.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'parrilla', component: ParrillaComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'saldo', component: SaldoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
