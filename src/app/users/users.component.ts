import { Component, OnInit,ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import {DatePipe} from '@angular/common';
import { ActionRendererComponent } from './action-renderer/action-renderer.component';
import { ButtonRendererComponent } from './button-renderer.component';
import { UsersService } from './users.service';
import { Router } from "@angular/router";
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef} from 'ag-grid-community';
//import 'jspdf-autotable';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DatePipe]
})
export class UsersComponent implements OnInit {

  
 // users:  User[] = [];
  public gridApi: any;
  public gridColumnApi: any ;
  public columnDefs: any;
  public paginationPageSize: any ;
  public searchText: any;
  pageSize = 10;
  currentUser: any;
  context: any;
  frameworkComponents: any;
  public defaultColDef;
  //loggedUserRole;
  rowDataClicked1 = {};
  rowDataClicked2 = {};

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  // editRecord: any;
  constructor(
    private router: Router,
    private _logservice:UsersService,
    private datePipe: DatePipe,
   // private spinnerService: NgxSpinnerService,

  ) { 


    this.frameworkComponents = {
      // buttonRenderer: ButtonRendererComponent,
    };
    this.defaultColDef = {
      resizable: true,
      width:170,
      sortable: true,
      filter: true,
    };

   // this.loggedUserRole = this.currentUser.role;
    
  }

  ngOnInit(): void {
    this.columnDefs = [
      
      {
      field: 'id',headerName: 'Id', headerTooltip: 'Id',tooltipField:'id',sortable: true, width: 80, filter: 'agNumberColumnFilter',
      filterParams: numberFilterParams, hidden:true
    },
    {
      field: 'roleName',headerName: 'Role Name', headerTooltip: 'roleName',tooltipField:'roleName',sortable: true, filter: 'agNumberColumnFilter',
      filterParams: numberFilterParams
    },
      {field: 'userName', headerTooltip: 'User Name',tooltipField:'userName',sortable: true, filter: true, filterParams: stdFilterParams},
      {field: 'email', headerTooltip: 'Email',tooltipField:'email',sortable: true, filter: true, width: 220, filterParams: stdFilterParams},
      //{field: 'password', sortable: true, filter: true, filterParams: dateFilterParams},
      // {field: 'phone', headerTooltip: 'Phone',tooltipField:'phone',sortable: true, filter: true, filterParams: dateFilterParams},
      // {field: 'address', headerTooltip: 'Address',tooltipField:'address', sortable: true, filter: true, filterParams: stdFilterParams},
      //{field: 'roleId', sortable: true, filter: true, filterParams: dateFilterParams},
      {field: 'roleName',headerTooltip: 'Role Name',tooltipField:'roleName', sortable: true, filter: true,  width: 150, filterParams: stdFilterParams},
      
      {field: 'createdBy',headerTooltip: 'Created By',tooltipField:'createdBy', sortable: true, filter: true,width: 150, filterParams: stdFilterParams},
      {
        field: 'createdDate',headerTooltip: 'Created Date',tooltipField:'createdDate', sortable: true, width: 200, filter: 'agDateColumnFilter', filterParams: dateFilterParams,
        cellRenderer: (data: any) => {
          return this.datePipe.transform(data.value, 'MM/dd/yyyy');
        }

      },
      // {field: 'modifiedBy',headerTooltip: 'Modified By',tooltipField:'modifiedBy', sortable: true, filter: true, width: 200,filterParams: stdFilterParams},
      {field: 'status', headerTooltip: 'Status',tooltipField:'status', sortable: true, filter: true,  width: 100, filterParams: stdFilterParams},
      {
        headerName: 'Action(s)',
        filter:false,
        sortable:false,
        field: 'id', width: 150,
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          mode: 'editusers', // Define the mode here for the scoresheet component
          // onClick: this.customEditFunction.bind(this),
        },
      },
    ];
  }
  editRecord(params: any): void {
    const editUrl = `/edituser/${params.data.id}`;
    this.router.navigate(['users/edit']);
}
  
  addUser(): void {
    this.router.navigate(['users/add']);
  }
  
rowData: any
  GetAllUsers()
  {
     
    this._logservice.GetAllUsers().subscribe(
      Response =>{
        this.rowData = Response;
       
      }
    );
  }

// Grid
onGridReady(params : any) {
   
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;

  this._logservice.GetAllUsers()
    .subscribe(data => {
       
      this.rowData = data;
    });

  this.gridApi.setDomLayout('autoHeight');
 
  
}

onCellClicked( e: CellClickedEvent): void {
  console.log('cellClicked', e);
}

// getUserRoleName() {
//   //return this.loggedUserRole;
// }

// onPageSizeChanged() {
//   this.gridApi.paginationSetPageSize(Number(this.pageSize));
// }

onPageSizeChanged() {
   
  this.gridApi.paginationSetPageSize(Number(this.pageSize));
  //this._logservice.saveUserSetting('rcm_users_paging_size', this.pageSize);
}


onBtExport() {
  const params = {
    columnKeys: ['id', 'userName','email','phone','address','roleName','status', 'createdBy', 'createdDate','status'],
    fileName: 'Users'
  };
  this.gridApi.exportDataAsCsv(params);
}

  searchRecords(val: any) {
    this.gridApi.setQuickFilter(val);
  }

onBtSearch() {
   
  // gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);
  this.gridApi.setQuickFilter(this.searchText);

}

// onEditButtonClick(user: User) {
//   localStorage.removeItem('editId');
//   localStorage.setItem('editId', user.Id.toString());
//   this.router.navigate(['edituser']);

// }

viewRecord(id : any) {
  // this.spinnerService.show();
  // this.apiService.getUser(id)
  //   .subscribe(data => {
  //     this.spinnerService.hide();
  //     this._record = data;
  //     this.modalService.open(this.viewRecordElmRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     }, (reason) => {
  //       //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     });
  //   });
}

//Grid


}



function dateFormatter(datestring : any) {
  var date = new Date(datestring);
  var dateAsString = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  return dateAsString;
}

var numberValueFormatter = function (params : any) {
  return params.value.toFixed(0);
};

var numberFilterParams = {
  buttons: ['apply', 'reset'],
  closeOnApply: true
};
var dateFilterParams = {

  comparator: function (filterLocalDateAtMidnight : any, cellValue : any):any {
    var date = new Date(cellValue);
    var dateAsString = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();

    if (dateAsString == null) {
      return -1;
    }
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
  minValidYear: 2000,
  buttons: ['apply', 'reset'],
  closeOnApply: true
};

var stdFilterParams = {
  buttons: ['apply', 'reset'],
  closeOnApply: true
};


function getTextValue(cssSelector : any) {
  return document.querySelector(cssSelector).value;
}

function getNumericValue(cssSelector : any) {
  var value = parseFloat(getTextValue(cssSelector));
  if (isNaN(value)) {
    var message = 'Invalid number entered in ' + cssSelector + ' field';
    // alert(message);
    throw new Error(message);
  }
  return value;
}

function myColumnWidthCallback(params : any) {
  var originalWidth = params.column.getActualWidth();
  if (params.index < 7) {
    return originalWidth;
  }
  return 30;
}

function getParams() {
  return {
    suppressQuotes: getValue('none'),
    columnSeparator: getValue('none'),
    //customHeader: 'none',
    //customFooter: 'none',
    columnKeys: ['id', 'fullName', 'userName', 'email', 'phone', 'address', 'role', 'status', 'createdDate'],
    fileName: 'EDC Users'
  };
}

function getValue(text : any) {
  //var text = document.querySelector(inputSelector).value;
  switch (text) {
    case 'string':
      return (
        'Here is a comma, and a some "quotes". You can see them using the\n' +
        'api.getDataAsCsv() button but they will not be visible when the downloaded\n' +
        'CSV file is opened in Excel because string content passed to\n' +
        'customHeader and customFooter is not escaped.'
      );
    case 'array':
      return [
        [],
        [
          {
            data: {
              value: 'Here is a comma, and a some "quotes".',
              type: 'String',
            },
          },
        ],
        [
          {
            data: {
              value:
                'They are visible when the downloaded CSV file is opened in Excel because custom content is properly escaped (provided that suppressQuotes is not set to true)',
              type: 'String',
            },
          },
        ],
        [
          {
            data: {
              value: 'this cell:',
              type: 'String',
            },
            mergeAcross: 1,
          },
          {
            data: {
              value: 'is empty because the first cell has mergeAcross=1',
              type: 'String',
            },
          },
        ],
        [],
      ];
    case 'none':
      return;
    case 'tab':
      return '\t';
    case 'true':
      return true;
    case 'none':
      return;
    default:
      return text;
  }
}
