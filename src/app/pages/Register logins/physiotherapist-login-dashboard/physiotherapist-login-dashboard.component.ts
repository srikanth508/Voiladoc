import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-physiotherapist-login-dashboard',
  templateUrl: './physiotherapist-login-dashboard.component.html',
  styleUrls: ['./physiotherapist-login-dashboard.component.css']
})
export class PhysiotherapistLoginDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public physiologinlist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummphysiolist: any;
  public count:any;
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetPhysiotherapistLoginAdmin();
    this.getlanguage();
  }
  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetPhysiotherapistLoginAdmin() {
    if (this.hospitalclinicid == undefined) {
     
      this.docservice.GetPhysiotherapistLoginAdmin(this.languageid).subscribe(
        data => {
         
          this.physiologinlist = data;
          this.count=this.physiologinlist.length;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetPhysiotherapistLoginAdmin(this.languageid).subscribe(
        data => {
         
          this.dummphysiolist = data;
          this.physiologinlist = this.dummphysiolist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count=this.physiologinlist.length;
        }, error => {
        }
      )
    }

  }

  public DisablePhysiotherapistLogin(id) {
    this.docservice.DisablePhysiotherapistLogin(id).subscribe(
      data => {
       
        Swal.fire('Disabled', 'Physiotherapist has been Disabled');
        this.GetPhysiotherapistLoginAdmin();

      }, error => {
      }
    )
  }

  public EnablePhysiotherapistLogin(id) {
    this.docservice.EnablePhysiotherapistLogin(id).subscribe(
      data => {
       
        Swal.fire('Enabled', 'Physiotherapist has been Enabled');
        this.GetPhysiotherapistLoginAdmin();

      }, error => {
      }
    )
  }

  public pageChanged(even) {
   
    this.p = even;
  }

}
