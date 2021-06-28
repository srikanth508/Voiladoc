import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-dia-charges-report',
  templateUrl: './dia-charges-report.component.html',
  styleUrls: ['./dia-charges-report.component.css']
})
export class DiaChargesReportComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public languageid: any;
  labels: any;
  labels1: any;
  diagnosticid: any;
  todaydate: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid');

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    var kkk = this.SDate.setDate(this.SDate.getDate() - 7);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.getlanguage()

    this.GetPharmacyHomeCareList()
  }





  public getlanguage() {
    this.docservice.GetAdmin_PharmacyLoginDoctorPrescriptionReports_label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
  }

  term: any;

  DiagnosticChargeslist: any;
  count: any;
  GrandTotal: any;
  dummchargelis1t1: any;

  public GetPharmacyHomeCareList() {
    
    this.docservice.GetDianosticAppointments_PaymentsReport(this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        
        this.dummchargelist = data;
        this.DiagnosticChargeslist = this.dummchargelist.filter(x => x.diagnosticCenterID == this.diagnosticid);
        
        this.dummchargelis1t1 = this.DiagnosticChargeslist
        this.count = this.DiagnosticChargeslist.length;

        this.GrandTotal = 0;
        for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].paidAmount;
        }

      }, error => {
      }
    )
  }

  dummchargelist: any;
  paymenttypeid: any;

  public selectedDate(data) {
    // this.monthstartdate = data[0].toLocaleString().split(',')[0];
    // this.monthenddate = data[1].toLocaleString().split(',')[0];


    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetPharmacyHomeCareList()

  }

  public GetPaymentTypeID(even) {
    if (even.target.value != 0) {
      
      this.paymenttypeid = even.target.value;
      this.DiagnosticChargeslist = this.dummchargelis1t1.filter(x => x.paymentTypeID == this.paymenttypeid);
      this.count = this.DiagnosticChargeslist.length;
      this.GrandTotal = 0;
      
      for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
        this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].paidAmount;
      }

    }
    else {
      this.GetPharmacyHomeCareList()
    }
  }


  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Delivery Reports");
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
      for (var j = 1; j < tableRow.cells.length - 1; j++) {
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
