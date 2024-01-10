import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from "@angular/router";
import { UsersService } from './users.service';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-button-renderer',
  template: `
  <span>
  <button mat-button (click)="open()" style="background-color: #2ba8ce !important;">Open</button>
  <span style="margin-left: 10px;"></span>
  <button mat-button (click)="edit()" style="background-color: #2ba8ce !important;">Edit</button>
  <span style="margin-left: 10px;"></span> <!-- Add space between buttons -->
  <button  mat-raised-button *ngIf="showLinkButton"  style="background-color: #2ba8ce !important;" (click)="copyText('http://localhost:4200/primarytenant/')" value="click to copy">Copy Link</button>
</span>

  `,
  styles: ['a { cursor:pointer; }']
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  
  constructor(private router: Router, private _http: UsersService) { }
  // refresh(params: ICellRendererParams<any, any, any>): boolean {
  //   throw new Error('Method not implemented.');
  // }
  abcd: boolean = true; 
  params: any;
  id: any;
  _mode: any;
  showLinkButton:boolean = true; 

  agInit(params: any): void {
    this.params = params;
    this.id = params.data.id;
    this._mode = params.mode; 
  }

  open() {
    if (this._mode === 'scoresheet') {
      this.router.navigate(['/primarytenant', this.id]);
    } else if (this._mode === 'editusers') {
      this.router.navigate(['/editusers', this.id]);
    } else if (this._mode === 'coversheet') {
      this.router.navigate(['/coversheet']);
    } else {
      console.error('Invalid mode or route.');
    }
    // Open your external link here
    window.open('/primarytenant');
  }

  edit() {
    if (this._mode === 'scoresheet') {
      this.router.navigate(['/primarytenant', this.id]);
    } else if (this._mode === 'editusers') {
      this.router.navigate(['/editusers', this.id]);
    } else if (this._mode === 'coversheet') {
      this.router.navigate(['/coversheet', this.id]);
    } else {
      console.error('Invalid mode or route.');
    }
  }

  ngOnInit() {
    this.abcd = this.shouldShowSubmitButton();
    if (this._mode === 'scoresheet') {
      this.showLinkButton = true;
    }
    else {
      this.showLinkButton = false;
}

  }

  isSubmitDisabled(): boolean {
    // Disable the button when the route contains 'user'
    return !this.shouldShowSubmitButton();
  }
  shouldShowSubmitButton(): boolean {
    const currentRoute = this.router.url;
    // Check if the current route contains 'user' to disable the button
    return !currentRoute.includes('user');
  }
  // if(this._mode === 'editusers'){

  // }

  copyText(val: string) {
    val = val + this.id 
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


  openExternalLink() {
    if (this._mode === 'scoresheet') {
      this.router.navigate(['/primarytenant', this.id]);
    } else if (this._mode === 'editusers') {
      this.router.navigate(['/editusers', this.id]);
    } else if (this._mode === 'coversheet') {
      this.router.navigate(['/coversheet']);
    } else {
      console.error('Invalid mode or route.');
    }
    // Open your external link here
    window.open('/primarytenant');
  }

  refresh(): boolean {
    return false;
  }
  }
