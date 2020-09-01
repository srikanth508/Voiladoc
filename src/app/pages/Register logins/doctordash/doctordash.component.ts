import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctordash',
  templateUrl: './doctordash.component.html',
  styleUrls: ['./doctordash.component.css']
})
export class DoctordashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public doctorloginlist: any;
  public docid: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummdcotorlogins: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.getdoctorloginfordash();

    
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

  public getdoctorloginfordash() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
        data => {
          debugger
          this.doctorloginlist = data;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
        data => {
          debugger
          this.dummdcotorlogins = data;
          this.doctorloginlist = this.dummdcotorlogins.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }
  }
  public disabledoctor(docid) {
    this.docservice.DisableDoctorLogin(docid).subscribe(
      data => {
        debugger
        Swal.fire('Disabled', 'Doctor has been Disabled');
        this.getdoctorloginfordash();

      }, error => {
      }
    )
  }
  public enabledoctor(id) {
    this.docservice.EnableDoctorLogin(id).subscribe(
      data => {
        debugger
        Swal.fire('Enabled', 'Doctor has been Enabled');
        this.getdoctorloginfordash();

      }, error => {
      }
    )
  }

  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }
}
