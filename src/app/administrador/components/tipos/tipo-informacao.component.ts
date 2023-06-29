import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcaiSorveteService } from 'src/app/services/tipos.service';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-informacao',
  templateUrl: './tipo-informacao.component.html',
  styleUrls: ['./tipo-informacao.component.css'],
})
export class Tipos implements OnInit {
  resultados: any = [];
  acaiForm!: FormGroup;
  acaiModel!: any;
  acaiCopo!: any;
  acaiSundae!: any;
  acaiBarca!: any;
  acaiMilkShake!: any;
  acaiBanana!: any;
  ativarAddBtn: boolean = true;
  ativarUpdateBtn: boolean = false;
  public spinner: boolean = false;

  constructor(
    private api: AcaiSorveteService,
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
      capacidade: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      qtd_adicionais: ['', [Validators.required]],
      qtd_sabores: ['', [Validators.required]],
      estoque: [false, [Validators.required]],
      url_imagem: ['', [Validators.required]],
    });
  }

  inicializador() {
    this.PegarTodosCopos();
    this.PegarTodasBananaSplit();
    this.PegarTodosSundae();
    this.PegarTodasBarca();
    this.PegarTodosMilkShake();
  }

  PegarTodosCopos() {
    this.api.getAcaiSorveteCopo().subscribe(
      (res) => {
        this.acaiCopo = res.resultados;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  PegarTodasBananaSplit() {
    this.api.getAcaiSorveteBananaSplit().subscribe(
      (res) => {
        this.acaiBanana = res.resultados;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  PegarTodosSundae() {
    this.api.getAcaiSorveteSundae().subscribe(
      (res) => {
        this.acaiSundae = res.resultados;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  PegarTodasBarca() {
    this.api.getAcaiSorveteBarca().subscribe(
      (res) => {
        this.acaiBarca = res.resultados;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  PegarTodosMilkShake() {
    this.api.getAcaiSorveteMilkShake().subscribe(
      (res) => {
        this.acaiMilkShake = res.resultados;
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
    this.api.postAcaiSorvete(this.acaiModel).subscribe(
      (res) => {
        let close = document.getElementById('close');
        close?.click();
        this.criarTipo();
        this.inicializador();
        Swal.fire('Adicionado!', '', 'success');
      },
      (err) => {
        Swal.fire('Error ao adiciona!', '', 'error');
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
        Swal.fire('Error ao deletar!', '', 'error');
      }
    );
  }

  edit(tipoId: any, tipoEdit: any) {
    this.ativarAddBtn = false;
    this.ativarUpdateBtn = true;
    this.acaiForm.controls['_id'].setValue(tipoId);
    this.acaiForm.controls['tipo'].setValue(tipoEdit.tipo);
    this.acaiForm.controls['capacidade'].setValue(tipoEdit.capacidade);
    this.acaiForm.controls['preco'].setValue(tipoEdit.preco);
    this.acaiForm.controls['qtd_adicionais'].setValue(tipoEdit.qtd_adicionais);
    this.acaiForm.controls['qtd_sabores'].setValue(tipoEdit.qtd_sabores);
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
