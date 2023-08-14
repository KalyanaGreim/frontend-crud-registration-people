import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaListComponent } from './pages/pessoa-list/pessoa-list.component';
import { PessoaNewComponent } from './pages/pessoa-new/pessoa-new.component';

const routes: Routes = [
  { path: '', redirectTo: 'pessoas', pathMatch: 'full' },
  { path: 'pessoas', component: PessoaListComponent },
  { path: 'create', component: PessoaNewComponent },
  { path: 'update/:id', component: PessoaNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
