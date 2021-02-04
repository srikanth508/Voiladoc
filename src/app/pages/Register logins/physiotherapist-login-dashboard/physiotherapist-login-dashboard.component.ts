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

  public username:any;
  public password:any;

  public GetDeatsils(details)
  {
  
    
    
    this.id=details.id,
    this.username=details.userName,
    this.password=details.password
  }
  

public pp:any;



  public insertdetails() {
   if(this.password!=undefined)  {
      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
       
        this.pp=1;
      }
    else {
      var entity = {
        'ID': this.id,
        'UserName': this.username,
        'Password': this.password
      }
      this.username = '';
      this.password = '';
      this.docservice.UpdatePhysiotherapistLogin(entity).subscribe(data => {
        if (data != 0) {
          if(this.languageid==1)
          {
            Swal.fire('Success', 'Password Updated Successfully', 'success');
            this.pp=0;
            document.getElementById('close').click();
            this.GetPhysiotherapistLoginAdmin()
          }
          else
          {
            Swal.fire('', 'Mis à jour avec succés', 'success');
            this.pp=0;
            document.getElementById('close').click();
            this.GetPhysiotherapistLoginAdmin()
          }
       
        }
        else{
          Swal.fire("User Name Already Exists");
          this.pp=0;
          this.GetPhysiotherapistLoginAdmin()
          document.getElementById('close').click();
        }
      })
    }
  }
}
}
