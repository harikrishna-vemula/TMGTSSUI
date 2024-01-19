import { Component, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
// import { ButtonRendererComponent } from './button-renderer.component';
import { Router } from "@angular/router";
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { UsersService } from '../users/users.service';
import { ButtonRendererComponent } from '../users/button-renderer.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-scoresheet',
  templateUrl: './scoresheet.component.html',
  styleUrls: ['./scoresheet.component.scss']
})

export class ScoresheetComponent implements OnInit {


  // users:  User[] = [];
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public paginationPageSize: any;
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
    private _logservice: UsersService,
    private datePipe: DatePipe,
    // private spinnerService: NgxSpinnerService,

  ) {


    this.frameworkComponents = {
      // buttonRenderer: ButtonRendererComponent,
    };
    this.defaultColDef = {
      resizable: true,

      sortable: true,
      filter: true,
    };

    // this.loggedUserRole = this.currentUser.role;

  }

  ngOnInit(): void {
    this.GetAllUsers()
    this.columnDefs = [

      {
        field: 'id', headerName: 'Id', headerTooltip: 'Id', tooltipField: 'id', width: '80', sortable: true, filter: 'agNumberColumnFilter',
        filterParams: numberFilterParams, hidden: true
      },
      {
        field: 'applicantName', headerName: 'Applicant Name', headerTooltip: 'ApplicantName', tooltipField: 'applicantName', sortable: true, filter: 'agNumberColumnFilter',
        filterParams: numberFilterParams
      },
      { field: 'property', headerName: 'Property', headerTooltip: 'Property', tooltipField: 'property', sortable: true, filter: true, filterParams: stdFilterParams },
      // {field: 'state', headerName: 'State',headerTooltip: 'State',tooltipField:'State',sortable: true, filter: true, filterParams: stdFilterParams},
      { field: 'city', headerName: 'City', headerTooltip: 'City', tooltipField: 'city', sortable: true, filter: true, filterParams: stdFilterParams, width: '150' },
      // {field: 'zip', headerName: 'Zip',headerTooltip: 'Zip',tooltipField:'zip',sortable: true, filter: true,   filterParams: stdFilterParams},
      //{field: 'StandardDepositProperty', sortable: true, filter: true, filterParams: dateFilterParams},
      // {field: 'standardDepositProperty', headerName: 'StandardDepositProperty', headerTooltip: 'standardDepositProperty',tooltipField:'StandardDepositProperty',sortable: true, filter: true, filterParams: dateFilterParams},
      // {field: 'address', headerTooltip: 'Address',tooltipField:'address', sortable: true, filter: true, filterParams: stdFilterParams},
      //{field: 'roleId', sortable: true, filter: true, filterParams: dateFilterParams},
      // {field: 'applicantTypeId',headerName: 'ApplicantTypeId',headerTooltip: 'applicantTypeId',tooltipField:'applicantTypeId', sortable: true, filter: true,  width: 150, filterParams: stdFilterParams},

      // {field: 'createdBy',headerTooltip: 'Created By',tooltipField:'createdBy', sortable: true, filter: true, filterParams: stdFilterParams},
      {
        field: 'createdDate',  headerTooltip: 'Created Date', tooltipField: 'createdDate', sortable: true, filter: 'agDateColumnFilter', filterParams: dateFilterParams,
        cellRenderer: (data: any) => {
          return this.datePipe.transform(data.value, 'MM/dd/yyyy');
        }

      },
      { field: 'applicantType', width: '170', headerTooltip: 'ApplicantType', tooltipField: 'applicantType', sortable: true, filter: true, filterParams: stdFilterParams },

      { field: 'applicationStatus', width: '170', headerTooltip: 'applicationStatus', tooltipField: 'applicationStatus', sortable: true, filter: true, filterParams: stdFilterParams },
      {
        headerName: 'Score Sheet Action(s)',

        headerTooltip: 'Score Sheet Action(s)',
        width: '300',
        filter: false,
        sortable: false,
        field: 'id',
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          mode: 'scoresheet', // Define the mode here for the scoresheet component
          // onClick: this.customEditFunction.bind(this),
        },
      },

      {
        headerName: 'Cover Sheet Action(s)',
        headerTooltip: 'Cover Sheet Action(s)',
        filter: false,
        sortable: false,
        field: 'id',
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          mode: 'coversheet', // Define the mode here for the scoresheet component
          // onClick: this.customEditFunction.bind(this),
        },

        //{
        //  headerName: 'Score Sheet Action(s)',
        //  filter:false,
        //  sortable:false,
        //  field: 'id', width: 180,
        //  cellRenderer: ButtonRendererComponent,
        //  cellRendererParams: {
        //    mode: 'scoresheet', // Define the mode here for the scoresheet component
        //    // onClick: this.customEditFunction.bind(this),
        //  },
      },
    ];
  }
  //   customEditFunction(id: number) {
  //     this.router.navigate(['/scoresheet', id]);
  //   }
  //   editscoresheet(params: any): void {
  //     const editUrl = `/scoresheet/${params.data.id}`;
  //     this.router.navigate(['/scoresheet']);
  // }

  //   addUser(): void {
  //     this.router.navigate(['users/add']);
  //   }

  rowData: any
  GetAllUsers() {
    //  alert("scoresheet working")
    this._logservice.Getapplicantinfo().subscribe((data) => {
      console.log(data, "scrore sheet data");

    })

  }

  // Grid
  onGridReady(params: any) {

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
    this.gridApi.setDomLayout('autoHeight');

    this._logservice.Getapplicantinfo()
      .subscribe((data: any) => {

        this.rowData = data;
      });

    this.gridApi.setDomLayout('autoHeight');


  }

  onCellClicked(e: CellClickedEvent): void {
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
      columnKeys: ['id', 'userName', 'email', 'phone', 'address', 'roleName', 'status', 'createdBy', 'createdDate', 'status'],
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

  viewRecord(id: any) {
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



function dateFormatter(datestring: any) {
  var date = new Date(datestring);
  var dateAsString = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  return dateAsString;
}

var numberValueFormatter = function (params: any) {
  return params.value.toFixed(0);
};

var numberFilterParams = {
  buttons: ['apply', 'reset'],
  closeOnApply: true
};
var dateFilterParams = {

  comparator: function (filterLocalDateAtMidnight: any, cellValue: any): any {
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


function getTextValue(cssSelector: any) {
  return document.querySelector(cssSelector).value;
}

function getNumericValue(cssSelector: any) {
  var value = parseFloat(getTextValue(cssSelector));
  if (isNaN(value)) {
    var message = 'Invalid number entered in ' + cssSelector + ' field';
    // alert(message);
    throw new Error(message);
  }
  return value;
}

function myColumnWidthCallback(params: any) {
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

function getValue(text: any) {
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
