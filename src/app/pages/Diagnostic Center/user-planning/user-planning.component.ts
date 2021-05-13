import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { timer } from 'rxjs';
@Component({
  selector: 'app-user-planning',
  templateUrl: './user-planning.component.html',
  styleUrls: ['./user-planning.component.css']
})
export class UserPlanningComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }
  public todaydate: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  value: any;
  public diagnosticid: any;
  public languageid: any;
  public labels1: any;
  public labels: any;
  public userreportlist: any;
  p: number = 1;
  public term: any;
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
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.getdiagnosticAppointmentsbyid();
    this.GetMyTeam()
  }

  public myteamlist: any;
  public count: any;

  public getlanguage() {
    this.docservice.GetAdmin_DiagnosticLoginOrdersAndOrderReport_Label(this.languageid).subscribe(
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

  public dummuserreportlist: any;


  public GetMyTeam() {
    this.docservice.GetMyTeam(localStorage.getItem('diagnosticid')).subscribe(data => {
      this.myteamlist = data;
      this.count = this.myteamlist.length
    })
  }

  public getdiagnosticAppointmentsbyid() {

    this.docservice.GetDiagnosticAppointmentsByUsersReport(this.diagnosticid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.userreportlist = data;
        this.dummuserreportlist = data;
      }, error => {
      }
    )
  }

  public diatestid: any;
  public testslist: any;


  public GetTestsID(id) {

    this.diatestid = id;
    this.GetDiaTests()
  }

  public GetDiaTests() {
    this.docservice.GetDiagnosticTestsByAppointmentIDWeb(this.languageid, this.diatestid).subscribe(
      data => {

        this.testslist = data;
      }, error => {
      }
    )
  }

  public packageid: any;
  public packagelist: any;


  public GetPackageID(id) {

    this.packageid = id;
    this.GetPackageTests();
  }

  public GetPackageTests() {
    this.docservice.GetDiagnosticPackagesByAppointmentIDWeb(this.languageid, this.packageid).subscribe(
      data => {

        this.packagelist = data;
      }, error => {
      }
    )
  }

  selectedDate(data) {

    //   var sdate=data.split('-')
    //   this.startdate=sdate[0]
    //  this.enddate=sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.getdiagnosticAppointmentsbyid()
  }

  public userid: any;

  public GetUserID(even) {
    
    if (even.target.value != 0) {
      this.userid = even.target.value;
      this.userreportlist = this.dummuserreportlist.filter(x => x.assignedID == this.userid)

    }
    else {
      this.getdiagnosticAppointmentsbyid()
    }

  }

  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }

}
