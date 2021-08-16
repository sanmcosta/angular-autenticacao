import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LancamentoService } from 'src/app/servicos/lancamento.service';
import {Lancamentos} from 'src/app/models/lancamento.model';
import { HttpService } from 'src/app/servicos/http.service';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {

  constructor(private router: Router,
              private lancamentoService: LancamentoService,
              private httpService: HttpService) { }

  lancamentos: Lancamentos[] = [];

  ngOnInit(): void {
    this.lancamentoService.listarTodos().subscribe(
      dados =>{
        /*localStorage['qtdLancamentos'] = dados.data.totalElements;
        localStorage['Lancamentos'] = JSON.stringify(dados.data.content);
        console.table(dados.data.content);*/
        this.lancamentos = dados.data.content;
      },
      erro => { 'Erro ao listar lançamentos'}
    );
  }

  sair() {
    delete localStorage['token'];
    delete localStorage['qtdLancamentos'];
    delete localStorage['Lancamentos']; 
    this.router.navigate(['/login']);
  }

  urlLocalizacao(localizacao: string) {
    return "https://www.google.com/maps/search/?api=1&query=" + localizacao;
  }
  pos = this.httpService.dadosUsuario.sub?.indexOf("@");
  Usuario = this.httpService.dadosUsuario.sub?.substring(0,this.pos); 
}
