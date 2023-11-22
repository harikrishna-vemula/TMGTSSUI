import { Component } from '@angular/core';

@Component({
  selector: 'app-tenant3',
  templateUrl: './tenant3.component.html',
  styleUrls: ['./tenant3.component.scss']
})
export class Tenant3Component {

  options: string[] = ['Single', 'Couple', 'Roommates'];
  Propertys:any=['Multi-Family','Single-Family']
  options1:any=['Yes','No'];
  options2:any=['Fair/good','Poor']
}
