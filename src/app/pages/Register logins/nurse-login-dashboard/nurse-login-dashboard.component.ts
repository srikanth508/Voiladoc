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
  public dummnurseloginlist: any;
  public count: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
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
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetNurseLoginAdmin(this.languageid).subscribe(
        data => {

          this.nurseloginlist = data;
          this.count = this.nurseloginlist.length;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseLoginAdmin(this.languageid).subscribe(
        data => {

          this.dummnurseloginlist = data;
          this.nurseloginlist = this.dummnurseloginlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.nurseloginlist.length;
        }, error => {
        }
      )
    }

  }


  public DisableNurseLogin(id) {

    this.docservice.DisableNurseLogin(id).subscribe(
      data => {
        if (this.languageid == 1) {
          Swal.fire('Disabled', 'Nurse has been Disabled');
          this.GetNurseLoginAdmin();
        }
        else {
          Swal.fire('Désactivée', 'Accès désactivé');
          this.GetNurseLoginAdmin();
        }


      }, error => {
      }
    )
  }

  public EnableNurseLogin(id) {
    this.docservice.EnableNurseLogin(id).subscribe(
      data => {
        if (this.languageid == 1) {
          Swal.fire('Enabled', 'Nurse has been Enabled');
          this.GetNurseLoginAdmin();
        }
        else {
          Swal.fire('Activé', 'Accès Activé');
          this.GetNurseLoginAdmin();
        }



      }, error => {
      }
    )
  }

  public pageChanged(even) {

    this.p = even;
  }

  public username: any;
  public password: any;
  public mypinno: any;
  public Showpassword: any;

  public GetDeatsils(details) {



    this.id = details.id,
      this.username = details.userName,
      this.password = details.password,
      this.mypinno = details.pinno
    this.Showpassword = 0;
  }


  pp: any;

  public insertdetails() {
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
        this.username = '';
        this.password = '';
        this.docservice.UpdateNurseLogin(entity).subscribe(data => {
          if (data != 0) {
            if (this.languageid == 1) {
              Swal.fire('Success', 'Password Updated successfully', 'success');
              this.GetNurseLoginAdmin();
              document.getElementById('close').click();
            }
            else {
              Swal.fire('', 'Mis à jour avec succés', 'success');
              this.GetNurseLoginAdmin();
              document.getElementById('close').click();
            }

          }
          else {
            Swal.fire("User Name Already Exists");
            this.GetNurseLoginAdmin();
            document.getElementById('close').click();
          }
        })
      }
    }
  }




  public Enteredpinno: any;
  public pinno: any;

  public CheckPasswordvalidate() {
    debugger
    if (this.Enteredpinno == "") {
      debugger
      Swal.fire('Please Enter Your Pin No')

    }
    else {
      debugger
      if (this.pinno == this.Enteredpinno) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
      }
      else {
        debugger
        Swal.fire('You Entered Pin no is invalid')
        this.Enteredpinno = ""
      }
    }
  }


}
