import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriarSaborNovo, ResultadoSabores, Sabores } from '../model/sabores';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class SaboresService {


  constructor(private http: HttpClient) { }

  httpOptions = {

    headers: new HttpHeaders({
      'apiKey':`${environment.apiKey}`
    })

   };

    //Sabores
  public getSabores(): Observable<Sabores> {
    return this.http.get<Sabores>(`${environment.apiUrl}/sabores`,
     {headers: this.httpOptions.headers})
   };

   public getSaboresSorvete(): Observable<Sabores> {
    return this.http.get<Sabores>(`${environment.apiUrl}/sabores?tipo=sorvete`,
     {headers: this.httpOptions.headers})
   };


   public getSaboresAcai(): Observable<Sabores> {
    return this.http.get<Sabores>(`${environment.apiUrl}/sabores?tipo=açaí`,
     {headers: this.httpOptions.headers})
   };

   public postSabores(request:CriarSaborNovo){
      return this.http.post<ResultadoSabores>(`${environment.apiUrl}/sabores`,request,{headers: this.httpOptions.headers});
  };

   public atualizar(id: string, request:CriarSaborNovo):Observable<Sabores>{
    const _url = `${environment.apiUrl}/sabores/${id}`
    return this.http.put<Sabores>(_url,request,{headers: this.httpOptions.headers});
  }


   public deletar(id: string): Observable<Sabores>{
    const _url = `${environment.apiUrl}/sabores/${id}`
    return this.http.delete<Sabores>(_url,{headers: this.httpOptions.headers})
  }


}
