import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wallet',
  standalone: true,
})
export class WalletPipe implements PipeTransform {
  transform(value: string): string {
    const splitValue = value.split('').reduce((acc, res, i) => {
      return acc + res + ((i + 1) % 4 === 0 ? ' ' : '');
    }, '');
    return splitValue;
  }
}
