import {  Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // standalone: true,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // public defaultColDef;
  // public columnDefs;
  
  rowData: any;
  gridOptions: GridOptions;
  constructor(){
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      // enable filtering 
      enableFilter: true
    };
  }
 
  ngOnInit() { }
 


  // rowData = [
  //   {id: 5, name: 10},
  //   {id: 10, name: 15},
  //   {id: 15, name: 20}
  // ]
columnDefs = [
      
  {
    field: 'id',
    headerName: 'Id',
    width: 100,
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'userCount',
    suppressSyncValuesAfterDataChange: true,
    headerName: 'Total Users',
    // headerTooltip: 'Users ID',
    width: 90,
    filter: true,
    // filterParams: stdFilterParams
    // cacheQuickFilter: true,
    // valueGetter: params => {
    //   return (params.data.userNo == null ? "(blank)" : params.data.userNo);
    // }
  },
  
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    tooltipField: 'name',
    filter: true,
    // sort: 'asc',
    // filterParams: stdFilterParams
  },
  {
    field: 'description',
    headerName: 'LIC USERNAME',
    tooltipField: 'description',
    filter: true,
    width: 250,
    // filterParams: stdFilterParams
  },
  {
    field: 'updatedBy',
    headerName: 'Updated By',
    filter: true,
    // filterParams: stdFilterParams
  },
  {
    field: 'updateDate',
    headerName: 'Last Modified',
    filter: 'agDateColumnFilter',
    // filterParams: dateFilterParams,
    width: 250,
 
  },
  {
    headerName: 'Action(s)',
    cellRenderer: 'buttonRenderer',
    sortable: false,
    },
];
defaultColDef = {
  width: 170,
  sortable: true,
  resizable: true,
};


}
