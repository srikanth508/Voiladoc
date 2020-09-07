import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-midwife-login-dashboard',
  templateUrl: './midwife-login-dashboard.component.html',
  styleUrls: ['./midwife-login-dashboard.component.css']
})
export class MidwifeLoginDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public midwifelist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummmidwifelist: any;
  public count: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.GetMidWivesLoginAdmin();

    this.getlanguage();
  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetMidWivesLoginAdmin() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetMidWivesLoginAdmin(this.languageid).subscribe(
        data => {
          debugger
          this.midwifelist = data;
          this.count = this.midwifelist.length;

        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWivesLoginAdmin(this.languageid).subscribe(
        data => {
          debugger
          this.dummmidwifelist = data;
          this.midwifelist = this.dummmidwifelist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifelist.length;
        }, error => {
        }
      )
    }
  }

  public DisableMidWivesLogin(id) {
    this.docservice.DisableMidWivesLogin(id).subscribe(
      data => {
        debugger
        Swal.fire('Disabled', 'MidWife has been Disabled');
        this.GetMidWivesLoginAdmin();

      }, error => {
      }
    )
  }

  public EnableMidWivesLogin(id) {
    this.docservice.EnableMidWivesLogin(id).subscribe(
      data => {
        debugger
        Swal.fire('Enabled', 'MidWife has been Enabled');
        this.GetMidWivesLoginAdmin();

      }, error => {
      }
    )
  }

  public pageChanged(even) {
    debugger
    this.p = even;
  }

}
