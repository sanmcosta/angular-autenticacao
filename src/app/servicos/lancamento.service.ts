import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import {Lancamentos} from '../models/lancamento.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  
  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }



  listarTodos(): Observable<any> {
    const id = this.httpService.obterIdUsuario();
    return this.http.get(env.apiLancamentoUrl+ id+'?sort=tipo,id&dir=ASC',this.httpService.headers());
  }

}

