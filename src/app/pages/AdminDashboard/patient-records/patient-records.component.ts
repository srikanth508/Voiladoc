import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate, NgStyle } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { timer } from 'rxjs';
import { shallowEqualArrays } from '@angular/router/src/utils/collection';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.css']
})
export class PatientRecordsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  options: NgDateRangePickerOptions;
  labels: any;
  languageid: any;
  patientid: any;
  startdate: any;
  enddate: any;
  dummappointmentlist: any;
  appointmentlist: any;
  count: any;
  dummlist: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  todaydate: any;
  term: any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.languageid = localStorage.getItem('LanguageID');
    var kkk = this.SDate.setDate(this.SDate.getDate() - 100);
    var lll = this.EDate.setDate(this.EDate.getDate() + 100);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.getlanguage();
    this.getbookappointmentbydoctorid()
  }


  public getbookappointmentbydoctorid() {
    this.spinner.show()
    this.docservice.GetBookAppointmentByReports(0, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        debugger
        this.spinner.hide()
        this.dummappointmentlist = data;
        this.appointmentlist = this.dummappointmentlist.filter(x => x.isVisited == 1)
        this.count = this.appointmentlist.length
        this.dummlist = this.appointmentlist;
        debugger
      })
  }


  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }

    )
  }
  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.getbookappointmentbydoctorid();
  }
  appointmenttypeid: any;
  public GetAppointmenttype(even) {
    if (even.target.value != 0) {
      this.appointmenttypeid = even.target.value;
      this.appointmentlist = this.dummappointmentlist.filter(x => x.appointmentTypeID == this.appointmenttypeid && x.isVisited == 1);
      this.count = this.appointmentlist.length;
    }
    else {
      this.getbookappointmentbydoctorid()
    }
  }



  
  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Appointment'));
    this.exportAsExcelFile(hhh, "Appointment Reports");
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