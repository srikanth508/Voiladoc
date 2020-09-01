import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hspclidash',
  templateUrl: './hspclidash.component.html',
  styleUrls: ['./hspclidash.component.css']
})
export class HspclidashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public value: any;
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
    this.getsponserhospitalforadmin();
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }

  public getsponserhospitalforadmin() {
    debugger
    this.docservice.GetSponsoredHospitalsForAdmin().subscribe(
      data => {
        debugger
        this.diagnosticlist = data;
      }, error => {
      }
    )
  }

  public disablehospital(hosid) {
    this.docservice.DisableSponsoredHospitals(hosid).subscribe(
      data => {
        debugger
        Swal.fire('Disabled', 'Hospital/Clinic has been Disabled');
        this.getsponserhospitalforadmin();
      }, error => {
      }
    )
  }
  public enablehospital(hosid) {
    this.docservice.EnableSponsoredHospitals(hosid).subscribe(
      data => {
        debugger
        Swal.fire('Enabled', 'Hospital/Clinic has been Enabled');
        this.getsponserhospitalforadmin();
      }, error => {
      }
    )
  }
  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }

  startdate
  enddate
  selectedDate(data) {
    debugger
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1];
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];

    this.docservice.GetSponsoredHospitalsForAdminByDate(this.startdate, this.enddate).subscribe(
      data => {
        debugger
        this.diagnosticlist = data;
      }, error => {
      }
    )
  }
}
