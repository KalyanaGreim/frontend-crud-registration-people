import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaListComponent } from './pages/pessoa-list/pessoa-list.component';
import { PessoaNewComponent } from './pages/pessoa-new/pessoa-new.component';
import { HttpClientModule } from '@angular/common/http';
import { PessoaService } from './service/pessoa.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PessoaListComponent,
    PessoaNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
