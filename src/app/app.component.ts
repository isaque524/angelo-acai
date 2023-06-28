import { Component } from '@angular/core';
import { EventEmitterService } from './services/event-emitir.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-acai';
  headerVisivel: boolean = true;

  constructor() {
    EventEmitterService.get('Esconder header').subscribe((data) => {
      this.headerVisivel = false;
    });

    EventEmitterService.get('Amostra header').subscribe((data) => {
      this.headerVisivel = true;
    });
  }
}
