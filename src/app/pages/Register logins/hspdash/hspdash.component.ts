import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hspdash',
  templateUrl: './hspdash.component.html',
  styleUrls: ['./hspdash.component.css']
})
export class HspdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public hsopitalloginlist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels:any;
  public languageid:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.gethospitalclinicfordash();

    this.getlanguage();
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )  
  }

  public gethospitalclinicfordash() {
    this.docservice.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
      data => {
       
        this.hsopitalloginlist = data;
      }, error => {
      }
    )
  }

  public disablehospital(id) {
    this.docservice.DisableHospital_ClinicLogin(id).subscribe(
      data => {
        
       
        Swal.fire('Disabled', 'Hospital/Clinic has been Disabled');
        this.gethospitalclinicfordash();
      }, error => {
      }
    )
  }
  public enablehospital(hosid) {
    this.docservice.EnableHospital_ClinicLogin(hosid).subscribe(
      data => {
       
        Swal.fire('Enabled', 'Hospital/Clinic has been Enabled');
        this.gethospitalclinicfordash();
      }, error => {
      }
    )
  }
  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }


  public username:any;
  public password:any;


  public GetDeatsils(details)
{
  debugger
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
    this.docservice.UpdateHospitalClinicAdminRegistration(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Password Updated successfully', 'success');
        this.gethospitalclinicfordash()
        document.getElementById('close').click();
        this.pp=0;
      
      }
      else{
        Swal.fire('Error', 'User Name Already Exists', 'success');
        this.gethospitalclinicfordash()
        document.getElementById('close').click();
      }
    })
  }
}


}
}
