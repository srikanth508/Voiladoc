import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-all-cancelled-appointments',
  templateUrl: './all-cancelled-appointments.component.html',
  styleUrls: ['./all-cancelled-appointments.component.css']
})
export class AllCancelledAppointmentsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  startdate: any;
  enddate: any;
  value: any;
  public appointmentreportlist: any;
  public term: any;
  public id: any;
  public dummlist: any;
  public languageid: any;
  public labels: any;
  public sdate: any;
  public edate: any;
  public listid: any;
  public typeid: any;
  public count: any;
  public paidamount: any;
  ngOnInit() {

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

    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    this.languageid = localStorage.getItem('LanguageID');

    this.getlanguage();

    this.typeid = 1;
    this.GetAppointmentReportsList();

  }



  public getlanguage() {
    this.docservice.GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  public Gettypeid(even) {
    this.typeid = even.target.value;
    this.GetAppointmentReportsList()
  }



  public GetAppointmentReportsList() {

    this.docservice.GetAllCancelledAppoentmentReport(this.typeid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.paidamount=0
        this.appointmentreportlist = data;
        this.count = this.appointmentreportlist.length;

        this.paidamount = this.appointmentreportlist.map(a => a.paidAmount).reduce(function (a, b) {
          return a + b;
        });

      }, error => {
      }
    )
  }


  selectedDate(data) {

    //   var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate= sdate[1]
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetAppointmentReportsList()
  }




  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('MidWife'));
    this.exportAsExcelFile(hhh, "Cancelled Appointments");
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
      for (var j = 0; j < tableRow.cells.length - 1; j++) {
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
