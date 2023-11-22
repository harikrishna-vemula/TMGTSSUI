import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tenant2',
  templateUrl: './tenant2.component.html',
  styleUrls: ['./tenant2.component.scss']
})
export class Tenant2Component {

  options: string[] = ['Single', 'Couple', 'Roommates'];
  Propertys:any=['Multi-Family','Single-Family']
  options1:any=['Yes','No'];
  options2:any=['Fair/good','Poor']
}

