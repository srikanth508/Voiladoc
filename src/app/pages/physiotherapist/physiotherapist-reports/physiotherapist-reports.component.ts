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
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-physiotherapist-reports',
  templateUrl: './physiotherapist-reports.component.html',
  styleUrls: ['./physiotherapist-reports.component.css']
})
export class PhysiotherapistReportsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  public nurseid: any;

  startdate: any;
  enddate: any;
  value: any;
  public appointmentreportlist: any;
  public term: any;
  public physioid: any;
  public dummlist: any;

  public languageid: any;
  public labels: any;
  public sdate: any;
  public edate: any;
  public id: any;
  public listids: any;
  public count: any;
  public showdrop:any;
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
    this.physioid = localStorage.getItem('physioid');


    this.sdate = localStorage.getItem('StartDate');
    this.edate = localStorage.getItem('EndDate');


    this.activatedroute.params.subscribe(params => {

      this.listids = params['id'];

    }
    )
    if (this.listids == undefined) {
      this.GetAppointmentReportsList();
    }
    else {
      this.docservice.GetBook_Physio_AppointmentForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {
          debugger
this.showdrop=1;
          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist
          this.count = this.appointmentreportlist.length
        }, error => {
        }
      )
    }
    this.getlanguage();
    this.getphysiolist();
    this.Gethsopital()
  }
  physioist: any;
  hospitallist: any;
  hospitalid: any;

  public Gethsopital() {
    debugger
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.hospitallist = data;

      }, error => {
      }
    )
  }

  public GetHospitalID(even) {
    if(even.target.value!=0)
    {
      this.hospitalid = even.target.value;
      this.appointmentreportlist=this.dummlist.filter(x=>x.hospitalClinicID==this.hospitalid)
    }
    else
    {
      this.docservice.GetBook_Physio_AppointmentForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {
          debugger
          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist
          this.count = this.appointmentreportlist.length
        }, error => {
        }
      )
    }
    
  }


  public getphysiolist() {
    this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.physioist = data;

      }, error => {
      }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetAppointmentReportsList() {

    this.docservice.GetBook_Physio_AppointmentReports(this.physioid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
debugger
        this.appointmentreportlist = data;
        this.dummlist = this.appointmentreportlist
        this.count = this.appointmentreportlist.length
      }, error => {
      }
    )
  }


  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetAppointmentReportsList();
  }


  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Physiotherapist'));
    this.exportAsExcelFile(hhh, "Physiotherapist Reports");
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


  public getget(even) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;

    if (even.target.value == 1) {

      let dfsfd = this.dummlist.filter(x => x.isVisited == 1);

      this.appointmentreportlist = dfsfd;
      this.count = this.appointmentreportlist.length
    }
    if (even.target.value == 2) {

      let dfsfd = this.dummlist.filter(x => x.notVisited == 1);

      this.appointmentreportlist = dfsfd;
      this.count = this.appointmentreportlist.length
    }
    if (even.target.value == 3) {

      let dfsfd = this.dummlist.filter(x => x.physioCancelled == 1 || x.cancelled == 1);

      this.appointmentreportlist = dfsfd;
      this.count = this.appointmentreportlist.length
    }
    if (even.target.value == 4) {

      this.GetAppointmentReportsList()
      this.docservice.GetBook_Physio_AppointmentForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {

          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist
          this.count = this.appointmentreportlist.length
        }, error => {
        }
      )
    }
  }

}
