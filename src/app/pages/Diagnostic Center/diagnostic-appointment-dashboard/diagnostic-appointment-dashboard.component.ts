import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { timer } from 'rxjs';
@Component({
  selector: 'app-diagnostic-appointment-dashboard',
  templateUrl: './diagnostic-appointment-dashboard.component.html',
  styleUrls: ['./diagnostic-appointment-dashboard.component.css']
})
export class DiagnosticAppointmentDashboardComponent implements OnInit {
  public todaydate: any;
    SDate = new Date();
    EDate = new Date();
    startdate: any;
    enddate: any;
    value: any;
    public diagnosticid: any;
    public languageid: any;
    options: NgDateRangePickerOptions;
    labels: any;
    term: any;
    diagnosticappointmentlist: any;
    testslist: any;
    packageid: any;
    diatestid: any;
    packagelist: any;
  constructor(public docservice: HelloDoctorService) { }

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
    this.getlanguage();
    this.GetDiagnosticAppointmentsByDiagnosticID(this.diagnosticid, this.startdate, this.enddate, this.languageid);
  }


  selectedDate(data) {
    
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetDiagnosticAppointmentsByDiagnosticID(this.diagnosticid, this.startdate, this.enddate, this.languageid);
}

public getlanguage() {
    
    this.docservice.GetAdmin_DiagnosticLoginOrdersAndOrderReport_Label(this.languageid).subscribe(
        data => {
            
            this.labels = data;
        }, error => {
        }
    )
}

public GetDiagnosticAppointmentsByDiagnosticID(DID, SDATE, EDATE, LID) {
    
    this.docservice.GetDiagnosticAppointmentsByDiagnosticID(DID, SDATE, EDATE, LID).subscribe(data => {
        
        this.diagnosticappointmentlist = data;
    })
}


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
}
