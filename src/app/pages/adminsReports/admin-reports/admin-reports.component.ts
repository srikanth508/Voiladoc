import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  languageid: any;
  year: any;
  month: any;
  typeid: any;
  alldetails: any;
  term: any;


  ngOnInit() {
    this.spinner.show();
    this.languageid = localStorage.getItem('LanguageID');
    var date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.typeid = 1
    this.GetAllRevenue();
  }

  GrandTotal: any;
  count: any;

  public GetAllRevenue() {
    this.docservice.GetHospitalRevenues(this.year, this.month, this.typeid).subscribe(data => {

      this.alldetails = data;
      this.count = this.alldetails.length;
      this.GrandTotal = 0;
      for (let i = 0; i < this.alldetails.length; i++) {
        debugger
        this.GrandTotal = this.GrandTotal + Number(this.alldetails[i].grandTotalAmount);
      }
      this.spinner.hide()

    }, error => {
      this.spinner.hide();
    })
  }

  monthname: any;

  public GetYear(even) {
    this.spinner.show();
    this.year = even.target.value;
    this.GetAllRevenue()
  }


  public GetMonth(even) {
    this.spinner.show();
    this.month = even.target.value;



    this.GetAllRevenue()
  }


  public GetTypeID(even) {
    this.spinner.show();
    this.typeid = even.target.value;
    this.GetAllRevenue()
  }




  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Admin Reports");
  }

  public tableToJson(table) {

    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 1; j < tableRow.cells.length; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


}
