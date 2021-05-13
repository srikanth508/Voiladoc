import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-support-cometed-tickets',
  templateUrl: './support-cometed-tickets.component.html',
  styleUrls: ['./support-cometed-tickets.component.css']
})
export class SupportCometedTicketsComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService) { }
  options: NgDateRangePickerOptions;
  issuelist: any;
  languageid: any;
  labels: any;
  count: any;
  term: any;
  public startdate: any;
  public enddate: any;

  value: any;
  SDate = new Date();
  EDate = new Date();
  public sdate: any;
  public edate: any;
  public todaydate: any;
  public CurrentTime: any;
  public dummissuelist: any;
  public issuephoto = [];
  public issuephotourl = [];
  public countrymanaerid: any;
  public supportid: any;
  public showexportbutton: any;
  ngOnInit() {
    this.countrymanaerid = localStorage.getItem('countrymanagerid');
    this.supportid = localStorage.getItem('supportid');
    if (this.countrymanaerid != undefined || this.supportid != undefined) {
      this.showexportbutton = 1;
    }

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    this.CurrentTime = hours + ':' + minutes + ' ' + newformat;
    this.languageid = localStorage.getItem('LanguageID');
    this.GetSupportIssues()
    this.GetLanguageMaster()
    this.getlanguage()
  }

  public GetSupportIssues() {
    this.docservice.GetSupportForWebForSupportLogin(this.languageid, this.startdate, this.enddate).subscribe(res => {

      this.issuelist = res;
      this.dummissuelist = res;

      this.issuelist = this.dummissuelist.filter(x => x.resolved == 1)

      this.count = this.issuelist.length;

    })
  }
  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {

      this.labels = res;

    })
  }
  labels1:any;

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      },
      error => { }
    );
  }

  photourl: any;

  public GetImageUrl(photoURL) {

    this.photourl = photoURL
  }

  selectedDate(data) {

    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    this.GetSupportIssues()

  }

  typeid: any;

  public GetTypeID(even) {
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.issuelist = this.dummissuelist.filter(x => x.typeID == this.typeid && x.resolved == 1)
      this.count = this.issuelist.length;
    }
    else {
      this.GetSupportIssues()
    }
  }

  resolvephotourl: any;

  public GetResolvePhotoUrl(resolveDescription) {
    this.resolvephotourl = resolveDescription
  }


  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Appointment'));
    this.exportAsExcelFile(hhh, "Support Reports");
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
      for (var j = 0; j < tableRow.cells.length - 2; j++) {
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
