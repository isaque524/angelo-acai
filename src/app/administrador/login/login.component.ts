import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  ligarSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: Router,
    private toast: ToastrService
  ) {
    this.formLogin = this.criarFormLogin();
  }

  ngOnInit(): void {}

  public criarFormLogin(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public submitForm() {
    this.ligarSpinner = true;
    const { name, password } = this.formLogin.value;
    this.formLogin.reset();

    this.loginService.login(name, password).subscribe(
      (res) => {
        this.route.navigate(['/adm']);
      },
      (err) => {
        Swal.fire('Error ao logar!', '', 'error');
        this.ligarSpinner = false;
      }
    );
  }
}
