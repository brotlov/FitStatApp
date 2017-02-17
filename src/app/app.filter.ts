import {Pipe, Injectable, PipeTransform} from "@angular/core";

@Pipe({name: 'filter', pure: false})

@Injectable()
export class FilterPipe implements PipeTransform {

    transform(items: any, args: any): any {
        if (args === undefined) return items;
        return items.filter(item => Object.keys(item).some(k => item[k].toString().toLowerCase().includes(args.toLowerCase())));
    }
};
