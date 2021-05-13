import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { DatePipe } from '@angular/common';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-physio-admin-dash',
  templateUrl: './physio-admin-dash.component.html',
  styleUrls: ['./physio-admin-dash.component.css']
})
export class PhysioAdminDashComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private datePipe: DatePipe) { }

  SDate = new Date();
  EDate = new Date();
  value: any;
  public todaydate: any;
  public startdate: any;
  public enddate: any;
  public languageid: any;
  public labels: any;
  public physioid: any;
  public appointmentist: any;
  public count: any;

  public pendingingcount: any;
  public pendinglist: any;
  public pendinglisttt: any;
  public acceptlist: any;
  public acceptlisttt: any;
  public acceptcount: any;
  public vistedlist: any;
  public vistedlistt: any;
  public visitcount: any;

  public cancellist: any;
  public cancellistttt: any;
  public cancelcount: any;

  public notvisitlist:any;
  public notvisitlisttt:any;
  public notvisitcount:any;

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
    this.physioid = localStorage.getItem('physioid');

    localStorage.setItem("startdate", this.startdate);
    localStorage.setItem("enddate", this.enddate);

    this.getlanguage();
    this.getphysiolist();
  }

  public getlanguage() {
   
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }


  public getphysiolist() {
    this.docservice.GetBook_Physio_Appointment(this.physioid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        this.appointmentist = data;
        this.count = this.appointmentist.length;

        this.pendinglist = this.appointmentist;
        this.pendinglisttt = this.pendinglist.filter(x => x.isVisited == 0 && x.accepted == 0 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.pendingingcount = this.pendinglisttt.length;

        this.acceptlist = this.appointmentist;
        this.acceptlisttt = this.acceptlist.filter(x => x.isVisited == 0 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.acceptcount = this.acceptlisttt.length;

        this.vistedlist = this.appointmentist;
        this.vistedlistt = this.vistedlist.filter(x => x.isVisited == 1 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.visitcount = this.vistedlistt.length;

        this.cancellist = this.appointmentist;
        this.cancellistttt = this.cancellist.filter(x => x.physioCancelled == 1 || x.cancelled == 1);
        this.cancelcount = this.cancellistttt.length;

        this.notvisitlist = this.appointmentist;
        this.notvisitlisttt = this.notvisitlist.filter(x => x.notVisited == 1);
        this.notvisitcount = this.notvisitlisttt.length;

      }, error => {
      }
    )
  }


  selectedDate(data) {
   
    // var sdate = data.split("-");
    // this.startdate = sdate[0];
    // this.enddate = sdate[1];
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    
    this.getphysiolist();
    localStorage.setItem("startdate", this.startdate);
    localStorage.setItem("enddate", this.enddate);
  }
}
