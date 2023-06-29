import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaboresService } from 'src/app/services/sabores.service';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-sabores',
  templateUrl: './sabores.component.html',
  styleUrls: ['./sabores.component.css'],
})
export class SaboresComponent {
  resultados: any = [];
  acaiForm!: FormGroup;
  acaiModel!: any;
  saborSorvete!: any;
  saborAcai!: any;
  ativarAddBtn: boolean = true;
  ativarUpdateBtn: boolean = false;
  spinner: boolean = false;

  constructor(
    private api: SaboresService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    setTimeout(() => {
      this.criarTipo();
      this.inicializador();
    }, 2000);
    setTimeout(() => {
      this.spinner = true;
    }, 4000);
  }

  ngOnInit(): void {}

  criarTipo() {
    this.acaiForm = this.fb.group({
      _id: ['', []],
      tipo: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      estoque: [false, [Validators.required]],
      url_imagem: ['', [Validators.required]],
    });
  }

  inicializador() {
    this.PegarTodosSorvetes();
    this.PegarTodosAcai();
  }

  PegarTodosSorvetes() {
    this.api.getSaboresSorvete().subscribe(
      (res) => {
        this.saborSorvete = res.resultados;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  PegarTodosAcai() {
    this.api.getSaboresAcai().subscribe(
      (res) => {
        this.saborAcai = res.resultados;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onAddClick() {
    this.ativarAddBtn = true;
    this.ativarUpdateBtn = false;
  }

  enviarTipo() {
    this.acaiModel = Object.assign({}, this.acaiForm.value);
    this.api.postSabores(this.acaiModel).subscribe(
      (res) => {
        let close = document.getElementById('close');
        close?.click();
        this.criarTipo();
        this.inicializador();
        Swal.fire('Adicionado!', '', 'success');
      },
      (err) => {
        Swal.fire('Error!', '', 'error');
      }
    );
  }

  deletarTipo(id: any) {
    this.api.deletar(id).subscribe(
      (res) => {
        this.inicializador();
        Swal.fire('Deletado!', '', 'success');
      },
      (err) => {
        Swal.fire('Falha ao deletar!', '', 'error');
      }
    );
  }

  edit(tipoId: any, tipoEdit: any) {
    this.ativarAddBtn = false;
    this.ativarUpdateBtn = true;
    this.acaiForm.controls['_id'].setValue(tipoId);
    this.acaiForm.controls['tipo'].setValue(tipoEdit.tipo);
    this.acaiForm.controls['nome'].setValue(tipoEdit.nome);
    this.acaiForm.controls['estoque'].setValue(tipoEdit.estoque);
    this.acaiForm.controls['url_imagem'].setValue(tipoEdit.url_imagem);
  }

  alterarTipo() {
    this.acaiModel = Object.assign({}, this.acaiForm.value);
    this.api.atualizar(this.acaiModel._id, this.acaiModel).subscribe(
      (res) => {
        let close = document.getElementById('close');
        close?.click();
        this.criarTipo();
        this.inicializador();
        Swal.fire('Alterado!', '', 'success');
      },
      (err) => {
        Swal.fire('Falha ao alterar!', '', 'error');
      }
    );
  }

  reset() {
    this.criarTipo();
  }

  public sair() {
    Swal.fire({
      title: 'Tem certeza que deseja Sair?',
      text: 'Ao clicar em sair você será deslogado',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sair',
      confirmButtonColor: '#DD6B55',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
        window.location.reload();
      }
    });
  }
}
