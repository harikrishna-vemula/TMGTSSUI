import { Component } from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
@Component({
  selector: 'app-tmg-users',
  templateUrl: './tmg-users.component.html',
  styleUrls: ['./tmg-users.component.scss']
})
export class TmgUsersComponent {
  rowData: any;
    columnDefs: any;

    ngOnInit() {
  this.rowData = [
    { id: 1, name: 'Student 1', course: 'Math' },
    { id: 2, name: 'Student 2', course: 'Science' },
    { id: 3, name: 'Teacher 1', course: 'Physics' },
    { id: 4, name: 'Teacher 2', course: 'History' },
  ];

  this.columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Course', field: 'course' }
  ];
}
}