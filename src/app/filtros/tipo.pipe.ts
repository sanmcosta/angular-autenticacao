import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let tipo = '';
    switch (value) {
      case 'INICIO_TRABALHO':
        tipo = 'Entrada';
        break;
      case 'INICIO_PAUSA':
        tipo = 'Pausa ini';
        break;
      case 'INICIO_ALMOCO':
        tipo = 'Almoço ini';
        break;
      case 'TERMINO_TRABALHO':
        tipo = 'Saída';
        break;
      case 'TERMINO_PAUSA':
        tipo = 'Pausa fim';
        break;
      case 'TERMINO_ALMOCO':
        tipo = 'Almoço fim';
        break;
      default:
        tipo = value;
    }
    return tipo;
  }

}
