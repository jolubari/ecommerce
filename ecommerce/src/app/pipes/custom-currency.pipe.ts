import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
@Pipe({
    name: 'mycurrency',
  })
  export class MycurrencyPipe implements PipeTransform {
    transform(
        value: number,
        currencyCode: string = 'EUR',
        digitsInfo: string = '3.2-2',
    ): string | null {
        return formatCurrency(
          value,
          'es-ES',
          getCurrencySymbol(currencyCode, 'wide'),
          currencyCode,
          digitsInfo,
        );
    }
}