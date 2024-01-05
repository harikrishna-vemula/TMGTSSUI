import { Component } from '@angular/core';

@Component({
  selector: 'app-action-renderer',
  template: `
  <div>
  <button (click)="onAddClick()">Add</button>
  <button (click)="onEditClick()">Edit</button>
</div>
  `,
  styles: []
})
export class ActionRendererComponent {
  agInit(params: any): void {
    console.log(params.data, "buttons component"); // Check the console for row-specific data
  }

  onAddClick() {
    // Handle Add button click logic here
    console.log('Add button clicked');
  }

  onEditClick() {
    // Handle Edit button click logic here
    console.log('Edit button clicked');
  }
}