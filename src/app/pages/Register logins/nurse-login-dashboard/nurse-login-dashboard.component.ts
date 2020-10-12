import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nurse-login-dashboard',
  templateUrl: './nurse-login-dashboard.component.html',
  styleUrls: ['./nurse-login-dashboard.component.css']
})
export class NurseLoginDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public nurseloginlist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummnurseloginlist:any;
  public count:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.GetNurseLoginAdmin();

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

  public GetNurseLoginAdmin() {
    if(this.hospitalclinicid==undefined)
    {
      this.docservice.GetNurseLoginAdmin(this.languageid).subscribe(
        data => {
         
          this.nurseloginlist = data;
          this.count= this.nurseloginlist.length;
        }, error => {
        }
      )
    }
    else if(this.hospitalclinicid!=undefined)
    {
      this.docservice.GetNurseLoginAdmin(this.languageid).subscribe(
        data => {
         
          this.dummnurseloginlist = data;
          this.nurseloginlist=this.dummnurseloginlist.filter(x=>x.hospitalClinicID==this.hospitalclinicid)
          this.count= this.nurseloginlist.length;
        }, error => {
        }
      )
    }
   
  }


  public DisableNurseLogin(id) {
   
    this.docservice.DisableNurseLogin(id).subscribe(
      data => {
       
        Swal.fire('Disabled', 'Nurse has been Disabled');
        this.GetNurseLoginAdmin();

      }, error => {
      }
    )
  }

  public EnableNurseLogin(id) {
    this.docservice.EnableNurseLogin(id).subscribe(
      data => {
       
        Swal.fire('Enabled', 'Nurse has been Enabled');
        this.GetNurseLoginAdmin();

      }, error => {
      }
    )
  }

  public pageChanged(even) {
   
    this.p = even;
  }

}
