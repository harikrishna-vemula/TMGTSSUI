import { Component } from '@angular/core';

@Component({
  selector: 'app-cosigner',
  templateUrl: './cosigner.component.html',
  styleUrls: ['./cosigner.component.scss']
})
export class CosignerComponent {
  options: string[] = ['Single', 'Couple', 'Roommates'];
  Propertys:any=['Multi-Family','Single-Family']
  options1:any=['Yes','No'];
  options2:any=['Fair/good','Poor']
}
