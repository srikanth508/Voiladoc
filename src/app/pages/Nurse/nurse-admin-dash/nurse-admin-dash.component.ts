import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { DatePipe } from '@angular/common';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-nurse-admin-dash',
  templateUrl: './nurse-admin-dash.component.html',
  styleUrls: ['./nurse-admin-dash.component.css']
})
export class NurseAdminDashComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private datePipe: DatePipe) { }

  public appointmentreportlist: any;
  public nurseid: any;
  public startdate: any;
  public enddate: any;
  public languageid: any;
  public count: any;
  public dummlist: any;
  SDate = new Date();
  EDate = new Date();
  value: any;
  public todaydate: any;
  public appointmentacceptlistttt: any;


  public appointmentacceptlist: any;
  public acceptcount: any;
  public labels: any;
  public pendingacceptence: any;
  public acceptlist: any;
  public acceptapplist: any;
  public patientvisit: any;
  public patientvisittt: any;
  public patientvisitcount: any;
  public patientnotvisit: any;
  public patientnotvisitt: any;
  public patientnotvisitcount: any;
  public patientcalncellist: any;
  public patientcalncellisttt: any;
  public cancelcount: any;
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

    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 0);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    this.languageid = localStorage.getItem('LanguageID');
    this.nurseid = localStorage.getItem('nurseid');

    this.GetAppointmentReportsList();
    this.getlanguage()


    localStorage.setItem("startdate", this.startdate);
    localStorage.setItem("enddate", this.enddate);
  }


  public getlanguage() {
   
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetAppointmentReportsList() {
   
    this.docservice.GetBook_Nurse_AppointmentReports(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        this.appointmentreportlist = data;
        this.dummlist = this.appointmentreportlist
        this.count = this.appointmentreportlist.length;

        this.appointmentacceptlist = this.appointmentreportlist;
        this.appointmentacceptlistttt = this.appointmentacceptlist.filter(x => x.isVisited == 0 && x.accepted == 0 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.pendingacceptence = this.appointmentacceptlistttt.length;

        this.acceptlist = this.appointmentreportlist;
        this.acceptapplist = this.acceptlist.filter(x => x.isVisited == 0 && x.accepted == 1 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.acceptcount = this.acceptapplist.length;


        this.patientvisit = this.appointmentreportlist;
        this.patientvisittt = this.patientvisit.filter(x => x.isVisited == 1 && x.accepted == 1 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.patientvisitcount = this.patientvisittt.length;

        this.patientnotvisit = this.appointmentreportlist;
        this.patientnotvisitt = this.patientnotvisit.filter(x => x.notVisited == 1);
        this.patientnotvisitcount = this.patientnotvisitt.length;

        this.patientcalncellist = this.appointmentreportlist;
        this.patientcalncellisttt = this.patientcalncellist.filter(x => x.nurseCancelled == 1 || x.cancelled == 1);
        this.cancelcount = this.patientcalncellisttt.length;
      }, error => {
      }
    )
  }

  selectedDate(data) {
   
    // var sdate = data.split("-");
    // this.startdate = sdate[0];
    // this.enddate = sdate[1];
    
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetAppointmentReportsList();
    localStorage.setItem("startdate", this.startdate);
    localStorage.setItem("enddate", this.enddate);
  }
}
