import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './administrador/auth.guard';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { EventEmitterService } from './services/event-emitir.service';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { AdmComponent } from './administrador/adm/adm.component';
import { SaboresComponent } from './administrador/components/sabores/sabores.component';
import { Tipos } from './administrador/components/tipos/tipo-informacao.component';
import { LoginComponent } from './administrador/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
    AdmComponent,
    LoginComponent,
    Tipos,
    SaboresComponent,
    SpinnerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard, EventEmitterService, SpinnerComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
