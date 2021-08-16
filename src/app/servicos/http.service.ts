import { Injectable } from '@angular/core';
import { DadosUsuario } from '../models/dados-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  dadosUsuario: DadosUsuario = new DadosUsuario();
  token = localStorage['token'];
  
  constructor() { }

  obterIdUsuario() {
    return this.dadosUsuario.id;
  }

  autenticado(): boolean {
  	if (!localStorage['token']) {
  	  return false;
  	}
    try {
      const dadosUsuario = JSON.parse(atob(localStorage['token'].split('.')[1]));
      if (!dadosUsuario) {
        return false;
      }
      this.dadosUsuario = dadosUsuario;
    	return parseInt(dadosUsuario.id) > 0;
    } catch (error) {
      return false;
    }
  }
  headers() {
    const header = {headers: { 'Authorization': 'Bearer ' +this.token }}
    return header;
  }
}
