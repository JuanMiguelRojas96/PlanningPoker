import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './components/pages/create-game/create-game.component';
import { GameComponent } from './components/pages/game/game.component';

const routes: Routes = [
  {path:'create-game', component: CreateGameComponent},
  {path:'game', component: GameComponent},
  {path:'**', redirectTo: 'create-game', pathMatch: 'full'},
  {path:'', redirectTo: 'create-game', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
