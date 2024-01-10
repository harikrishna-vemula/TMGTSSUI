import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserRoleComponent implements OnInit {
  loggedUserRole: string = 'Admin';
  pageSize: any;
  searchText: any;
  frameworkComponents: any;
  users: any = [

  ]

  paginationPageSize: number = 50;

  dateFormatter(params: any) {
    const date = new Date(params.value);
    return date.toLocaleDateString(); // Change the format as needed
  }




  rowData = [

  ]

  defaultColDef = {
    width: 170,
    sortable: true,
    resizable: true,
  };
  columnDefs: any;

  // rowData = [
  //   // Sample data goes here (replace with your actual data)
  //   { id: 1, user: 'Demoadmin', userName: 'Demo admin', role: 'Admin', emailId: 'demoadmin@tmgnorthwest.com', password: '********' },
  //   { id: 2, user: 'Demoreader', userName: 'Demo reader', role: 'reader', emailId: 'demoreader@tmgnorthwest.com', password: '********' },
  //   // Add more rows as needed
  // ];
  _record: any = {
    "fullName": "admin",
    "password": "admin",
    "email": "admin@edc.com",
    "phone": "998500551-9",
    "address": "New York-USA-12",
    "userName": "admin",
    "role": "Admin",
    "token": null,
    "status": "Active",
    "roleId": 1,
    "statusId": 1,
    "id": 1,
    "createdDate": "2021-04-14T00:00:00"
  }
  dateFilterParams: any;

  context: any;
  currentUser: any = {};
  constructor(private datePipe: DatePipe,) {
    this.context = {
      componentParent: this
    };
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }
  ngOnInit() {
    this.columnDefs = [
      { headerName: "Id", field: "id" },
      { headerName: "UserName", field: "userName" },
      { headerName: "Email", field: "email" },
      { headerName: "Phone", field: "phone" },
      { headerName: "Address", field: "address" },
      { headerName: "Role", field: "role" },
      { headerName: "UserName", field: "userName" },
      {
        headerName: "CreatedDate", field: "createdDate", valueFormatter: this.dateFormatter,
      },
    ];
  }

  addUser() {

  }
  onBtExport() {

  }
  onPageSizeChanged() { }
  onBtSearch() { }
  onGridReady(event: any) {
    console.log(event)
  }
}
