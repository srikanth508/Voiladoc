import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diagdash',
  templateUrl: './diagdash.component.html',
  styleUrls: ['./diagdash.component.css']
})
export class DiagdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public value
  public diagnosticlist: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public options: any
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
    this.getdiagnosticloginfordash();
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }


  public getdiagnosticloginfordash() {
   
    this.docservice.GetSponsoredDiagnosticCenterForAdmin().subscribe(
      data => {
       
        this.diagnosticlist = data;
      }, error => {
      }
    )
  }
  public disablediagnostic(id) {
    this.docservice.DisableSponsoredDiagnosticCenter(id).subscribe(
      data => {
       
        Swal.fire('Disabled', 'Diagnostic Center has been Disabled');
        this.getdiagnosticloginfordash();
      }, error => {
      }
    )
  }
  public enablediagnostic(id) {
    this.docservice.EnableSponsoredDiagnosticCenter(id).subscribe(
      data => {
       
        Swal.fire('Enabled', 'Diagnostic Center has been Enabled');
        this.getdiagnosticloginfordash();
      }, error => {
      }
    )
  }
  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }
  startdate
  enddate
  selectedDate(data) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    this.docservice.GetSponsoredDiagnosticCenterForAdminByDate(this.startdate, this.enddate).subscribe(
      data => {
       
        let temp: any = data;
        this.diagnosticlist = temp;
      }, error => {
      }
    )

  }
}
