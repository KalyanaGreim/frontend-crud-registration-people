import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { PessoaService } from 'src/app/service/pessoa.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoa-new',
  templateUrl: './pessoa-new.component.html',
  styleUrls: ['./pessoa-new.component.scss'],
})
export class PessoaNewComponent implements OnInit {
  form: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required),
    contatos: new FormArray([]),
  });
  showValidation: boolean = false;
  isEditable: boolean = false;
  @Input() pessoaId: number | null = null;

  get contatosFormArray(): FormArray {
    return this.form.get('contatos') as FormArray;
  }

  addContatoFormGroup() {
    const contatoFormGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      telefone: new FormControl('', Validators.required),
    });

    this.contatosFormArray.push(contatoFormGroup);
  }

  constructor(
    private http: HttpClient,
    private pessoaService: PessoaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addContatoFormGroup();

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const pessoaId = params.get('id');
          if (pessoaId !== null) {
            const numericPessoaId = Number(pessoaId);
            if (!isNaN(numericPessoaId)) {
              return this.pessoaService.getPessoaById(numericPessoaId);
            }
          }
          return of(null);
        })
      )
      .subscribe((pessoa) => {
        if (pessoa !== null) {
          this.isEditable = true;
          console.log(pessoa)
          this.form.patchValue({
            nome: pessoa.nome,
            cpf: pessoa.cpf,
            dataNascimento: pessoa.dataNascimento,
          });
          pessoa.contatos.forEach((contato: any) => {
            this.addContatoFormGroup();
            const index = this.contatosFormArray.length - 1;
            this.contatosFormArray.at(index).patchValue(contato);
          });
        }
      });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.showValidation = true;
    } else {
      const formData = this.form.value;
      if (this.isEditable) {
        const pessoaId = this.pessoaId;
        if (pessoaId !== null) {
          this.pessoaService
            .updatePessoa(pessoaId, formData)
            .pipe(
              catchError((error) => {
                console.error('Error updating pessoa:', error);
                return of(null);
              }),
              finalize(() => {
                alert('ATUALIZADO');
              })
            )
            .subscribe((response) => {
              if (response !== null) {
                console.log('Pessoa updated:', response);
              }
            });
        }
      } else {
        this.pessoaService
          .createPessoa(formData)
          .pipe(
            catchError((error) => {
              console.error('Error creating pessoa:', error);
              return of(null);
            }),
            finalize(() => {
              alert('SALVO');
            })
          )
          .subscribe((response) => {
            if (response !== null) {
              console.log('Pessoa created:', response);
            }
          });
      }
    }
  }



}
