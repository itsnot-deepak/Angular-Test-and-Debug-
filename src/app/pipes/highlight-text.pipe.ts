import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlightText' // should be named camel case  
})
export class HighlightTextPipe implements PipeTransform {

    transform(value: string, filter: string): string {
        if (filter.length === 0) {
            return value;
        }

        const search = new RegExp(filter, 'ig'); // here we are making regex exp and then giving the filter as the pattern also we are giving i- which is to ignore the case sensitivity and then we give g which is the global 
        // by default the regex matches just the first occurence but this makes it match all the occurrence throught the system 

        // here we are using the replace function to replace the matched values 
        // so we send the matched instance in the match variable and then we wrap/return an span tag around it which will use the highlight-text class to highlight the matched value 
        return value.replace(search, (match) => {
            return `<span class="highlight-text">${match}</span>`;
        });
    }

} 
