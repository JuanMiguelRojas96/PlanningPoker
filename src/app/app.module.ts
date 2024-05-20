import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { InputComponent } from './components/atomic_design/atoms/input/input.component';
import { ROOT_REDUCERS } from './state/app.state';
import { ButtonComponent } from './components/atomic_design/atoms/button/button.component';
import { CreateGameComponent } from './components/pages/create-game/create-game.component';
import { LoadingModalComponent } from './components/atomic_design/molecules/loading-modal/loading-modal.component';
import { EffectsModule } from '@ngrx/effects';
import { LoadingModalEffect } from './state/effects/loading-modal.effect';
import { LoginComponent } from './components/atomic_design/molecules/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    CreateGameComponent,
    LoadingModalComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([LoadingModalEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
