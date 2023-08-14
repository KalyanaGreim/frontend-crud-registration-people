import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaService } from 'src/app/service/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss'],
})
export class PessoaListComponent {
  pessoas?: any[];

  constructor(private pessoaService: PessoaService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPessoas();
  }

  getAllPessoas(): void {
    this.pessoaService.getAllPessoas().subscribe((pessoas) => {
      this.pessoas = pessoas;
    });
  }
  detalhesVisiveis: { [key: number]: boolean } = {};
  exibirDetalhesPessoa(id: number): void {
    if (this.detalhesVisiveis[id] === undefined) {
      this.pessoaService.getPessoaById(id).subscribe((pessoa) => {
        if (pessoa !== null) {
          this.detalhesVisiveis[id] = true;
          console.log('Detalhes da pessoa:', pessoa);
        }
      });
    } else {
      this.detalhesVisiveis[id] = !this.detalhesVisiveis[id];
    }
  }

  editar(id: number) {
    this.router.navigate(['/update', id]);
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.deletePessoa(id).subscribe(
        () => {
          this.getAllPessoas();
        },
        (error) => {
          console.error('Erro ao excluir pessoa:', error);
        }
      );
    }
  }
}
