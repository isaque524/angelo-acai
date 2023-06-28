import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, take } from 'rxjs';

import { Resultado, Tipo, criarTipo } from '../model/tipos';
import { environment } from 'src/environments/enviroment';


@Injectable({
  providedIn: 'root',
})
export class AcaiSorveteService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      apiKey: `${environment.apiKey}`,
    }),
  };

  //Açaí e Sorvete//

  public getAcaiSorveteTodosTipos(): Observable<Tipo> {
    return this.http.get<Tipo>(`${environment.apiUrl}/compartimentos/`, {
      headers: this.httpOptions.headers,
    });
  }

  public getAcaiSorveteCopo(): Observable<Tipo> {
    return this.http.get<Tipo>(
      `${environment.apiUrl}/compartimentos/?tipo=copo`,
      { headers: this.httpOptions.headers }
    );
  }

  public getAcaiSorveteBananaSplit(): Observable<Tipo> {
    return this.http.get<Tipo>(
      `${environment.apiUrl}/compartimentos/?tipo=banana_split`,
      { headers: this.httpOptions.headers }
    );
  }

  public getAcaiSorveteSundae(): Observable<Tipo> {
    return this.http.get<Tipo>(
      `${environment.apiUrl}/compartimentos/?tipo=taça`,
      { headers: this.httpOptions.headers }
    );
  }

  public getAcaiSorveteBarca(): Observable<Tipo> {
    return this.http.get<Tipo>(
      `${environment.apiUrl}/compartimentos/?tipo=barca`,
      { headers: this.httpOptions.headers }
    );
  }

  public getAcaiSorveteMilkShake(): Observable<Tipo> {
    return this.http.get<Tipo>(
      `${environment.apiUrl}/compartimentos/?tipo=milk_shake`,
      { headers: this.httpOptions.headers }
    );
  }

  public pesquisarPorId(id: string): Observable<Resultado> {
    const _url = `${environment.apiUrl}/compartimentos/${id}`;
    return this.http.get<Resultado>(_url, {
      headers: this.httpOptions.headers,
    });
  }

  public atualizar(id: string, request: criarTipo): Observable<Tipo> {
    const _url = `${environment.apiUrl}/compartimentos/${id}`;
    return this.http.put<Tipo>(_url, request, {
      headers: this.httpOptions.headers,
    });
  }

  public deletar(id: string): Observable<Tipo> {
    const _url = `${environment.apiUrl}/compartimentos/${id}`;
    return this.http.delete<Tipo>(_url, { headers: this.httpOptions.headers });
  }

  public postAcaiSorvete(request: criarTipo) {
    console.log(request);
    return this.http.post<Resultado>(
      `${environment.apiUrl}/compartimentos`,
      request,
      { headers: this.httpOptions.headers }
    );
  }
}
