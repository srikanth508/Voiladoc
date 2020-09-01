import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmdash',
  templateUrl: './pharmdash.component.html',
  styleUrls: ['./pharmdash.component.css']
})
export class PharmdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
public value;
  public pharmacylist: any;
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
    this.getsponserpharmacyforadmin();
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

  public getsponserpharmacyforadmin() {
    debugger
    this.docservice.GetSponsoredPharmacyForAdmin().subscribe(
      data => {
        debugger
        this.pharmacylist = data;
      }, error => {
      }
    )
  }
  public diasblePharmacy(id) {
    debugger
    this.docservice.DisableSponsoredPharmacy(id).subscribe(
      data => {
        debugger
        Swal.fire('Disabled', 'Pharmacy has been Disabled');
        this.getsponserpharmacyforadmin();
      }, error => {
      }
    )
  }
  public enablePharmacy(id) {
    debugger
    this.docservice.EnableSponsoredPharmacy(id).subscribe(
      data => {
        debugger
        Swal.fire('Enabled', 'Pharmacy has been Enabled');
        this.getsponserpharmacyforadmin();
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
    this.docservice.GetSponsoredPharmacyForAdminByDate(this.startdate, this.enddate).subscribe(
      data => {
        debugger
        this.pharmacylist = data;
      }, error => {
      }
    )
  }
  
}
