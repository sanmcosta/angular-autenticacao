import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LancamentoService } from 'src/app/servicos/lancamento.service';
import {Lancamentos} from 'src/app/models/lancamento.model';
import { HttpService } from 'src/app/servicos/http.service';
import { DataHoraService } from 'src/app/servicos/data-hora.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit,OnDestroy {

  constructor(private router: Router,
              private lancamentoService: LancamentoService,
              private httpService: HttpService,
              private dataHoraService : DataHoraService) { }

  lancamentos: Lancamentos[] = [];
  dataHoraAtual = '';
  dataHoraAtualSub: Subscription | undefined;
  dataTempoReal = '';
  dataTempoRealSub: Subscription | undefined;


  ngOnDestroy(): void {
      this.dataHoraAtualSub?.unsubscribe();
      this.dataTempoRealSub?.unsubscribe();
  }

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
    this.dataHoraAtualSub = this.dataHoraService.dataHora.subscribe(
      dataHora => this.dataHoraAtual = dataHora
    );
    this.dataTempoRealSub = this.dataHoraService.dataHoraTempoReal.subscribe(
      dataHora => this.dataTempoReal = dataHora
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

  atualizarDataHora(){
    this.dataHoraService.atualizarDataHora();
  }

  downloadCSV() {
    this.lancamentoService.downloadCSV(this.lancamentos);
  }

  pos = this.httpService.dadosUsuario.sub?.indexOf("@");
  Usuario = this.httpService.dadosUsuario.sub?.substring(0,this.pos); 
}
