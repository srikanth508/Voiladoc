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
  public count: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.getdoctorloginfordash();


  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public getdoctorloginfordash() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
        data => {
         
          this.doctorloginlist = data;
          this.count = this.doctorloginlist.length;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
        data => {
         
          this.dummdcotorlogins = data;
          this.doctorloginlist = this.dummdcotorlogins.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.doctorloginlist.length;
        }, error => {
        }
      )
    }
  }
  public disabledoctor(docid) {
    this.docservice.DisableDoctorLogin(docid).subscribe(
      data => {
       
        Swal.fire('Disabled', 'Doctor has been Disabled');
        this.getdoctorloginfordash();

      }, error => {
      }
    )
  }
  public enabledoctor(id) {
    this.docservice.EnableDoctorLogin(id).subscribe(
      data => {
       
        Swal.fire('Enabled', 'Doctor has been Enabled');
        this.getdoctorloginfordash();

      }, error => {
      }
    )
  }

  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }


  password:any;
  pp:any;
  username:any;



public GetDeatsils(details)
{
  debugger
  this.id=details.id,
  this.username=details.userName,
  this.password=details.password
}




  public insertdetails() {
    debugger
    if (this.password != undefined) {
      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
      }
      else {
        var entity = {
          'ID': this.id,
          'UserName': this.username,
          'Password': this.password
        }
        debugger
        this.username = '';
        this.password = '';
        this.docservice.UpdateDoctorLogins(entity).subscribe(data => {
          if (data != 0) {
            // Swal.fire('Added Successfully.');
            Swal.fire('Completed', 'Password updated successfully', 'success');
            this.pp = 0;
            this.getdoctorloginfordash()
            document.getElementById('close').click();
          }
          else {
            Swal.fire("user name already exists");
            this.getdoctorloginfordash()
            document.getElementById('close').click();
          }
        })
      }
    }

  }
}
