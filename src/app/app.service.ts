import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private http: HttpClient;
  private baseurl = environment.apiUrl;

  constructor(
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  // config api
  public weCallYou(nome: string, telefone: string): Observable<any>{
    const emailto = 'gestores_renner@atmatec.com.br';
    
    return this.http.get<any>(`${this.baseurl}email/?nome=${nome}&telefone=${telefone}&emailto=${emailto}`)
  }
  
  public scheduleCallYou(nome: string, telefone: string, dataAgendamento: any): Observable<any>{
    const emailto = 'gestores_renner@atmatec.com.br';
    return this.http.get<any>(`${this.baseurl}email/?nome=${nome}&telefone=${telefone}&datahora=${dataAgendamento}&emailto=${emailto}`)
  }

}
