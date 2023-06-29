
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  public login(name: string, password: string): Observable<any> {
    const url = `${environment.baseUrlBackend}/auth/login`;

    return this.httpClient
      .post(url, { name, password }, { responseType: 'json' })
      .pipe(
        map((data) => this.setTokenLocalStorage(data)),
        catchError((err) => {
          this.removerTokenLocalStorage();
          throw 'falha ao efetuar login.';
        })
      );
  }

  public logout(): void {
    return this.removerTokenLocalStorage();
  }

  public geToken(): string | null {
    return localStorage.getItem(environment.token);
  }

  private setTokenLocalStorage(response: any): void {
    const { type, token } = response;
    localStorage.setItem(environment.token, token);
  }

  private removerTokenLocalStorage(): void {
    localStorage.removeItem(environment.token);
  }
}
