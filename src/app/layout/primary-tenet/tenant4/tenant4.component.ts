import { Component } from '@angular/core';

@Component({
  selector: 'app-tenant4',
  templateUrl: './tenant4.component.html',
  styleUrls: ['./tenant4.component.scss']
})
export class Tenant4Component {

  options: string[] = ['Single', 'Couple', 'Roommates'];
  Propertys:any=['Multi-Family','Single-Family']
  options1:any=['Yes','No'];
  options2:any=['Fair/good','Poor']
}
