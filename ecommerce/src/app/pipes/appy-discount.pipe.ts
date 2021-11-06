import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'applyDiscount'
})
export class ApplyDiscountPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    const discount = Math.round(value - (value * args[0])/100);
    return discount;
  }

}
