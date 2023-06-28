import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import Swal from 'sweetalert2';
import { EventEmitterService } from 'src/app/services/event-emitir.service';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css'],
})
export class AdmComponent {
  constructor(private loginService: LoginService) {
    EventEmitterService.get('esconder header').emit('');
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
