import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShorter'
})
export class TextShorterPipe implements PipeTransform {

  transform(text: string, length: number): string {
    if(text.length <= length) {
      return text
    }  
    return text.slice(0, length) + '...';
  }

}
