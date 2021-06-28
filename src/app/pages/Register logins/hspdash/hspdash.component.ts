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
  public labels: any;
  public languageid: any;
  public pinno: any;
  public currentpwd: any;
  countrymanaerid: any;
  showeditbutton: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
    this.currentpwd = localStorage.getItem('Password');
    this.countrymanaerid = localStorage.getItem('countrymanagerid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }

    this.gethospitalclinicfordash();

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

        if (this.languageid == 1) {
          Swal.fire('Disabled', 'Hospital/Clinic has been Disabled');
          this.gethospitalclinicfordash();
        }
        else {
          Swal.fire('Accès désactivé');
          this.gethospitalclinicfordash();
        }

      }, error => {
      }
    )
  }
  public enablehospital(hosid) {
    this.docservice.EnableHospital_ClinicLogin(hosid).subscribe(
      data => {
        if (this.languageid == 1) {
          Swal.fire('Enabled', 'Hospital/Clinic has been Enabled');
          this.gethospitalclinicfordash();
        }
        else {
          Swal.fire('Activé', 'Accès Activé');
          this.gethospitalclinicfordash();
        }

      }, error => {
      }
    )
  }
  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }


  public username: any;
  public password: any;
  public mypinno: any;

  oldpassword: any;
  public GetDeatsils(details) {

    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno

    this.Showpassword = 0;
  }


  public pp: any;

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
        this.docservice.UpdateHospitalClinicAdminRegistration(entity).subscribe(data => {
          if (data != 0) {
            if (this.languageid == 1) {
              Swal.fire('Success', 'Password Updated successfully', 'success');
              this.gethospitalclinicfordash()
              document.getElementById('close').click();
              this.pp = 0;
              this.password = ""
            }
            else {
              Swal.fire('Succès', 'Mot de passe mis à jour avec succès');
              this.gethospitalclinicfordash()
              document.getElementById('close').click();
              this.pp = 0;
              this.password = ""
            }


          }
          else {
            Swal.fire('Error', 'User Name Already Exists', 'success');
            this.gethospitalclinicfordash()
            document.getElementById('close').click();
          }
        })
      }
    }
  }


  public Showpassword: any;

  public Enteredpinno: any;

  // public CheckPasswordvalidate() {
  //   
  //   if (this.Enteredpinno == "") {
  //     
  //     if (this.languageid == 1) {
  //       Swal.fire('Please Enter Your Pin No')
  //     }
  //     else {
  //       Swal.fire('Veuillez entrer votre code PIN Non')
  //     }
  //   }
  //   else {
  //     
  //     if (this.pinno == this.Enteredpinno) {
  //       this.Showpassword = 1;
  //       this.Enteredpinno = ""
  //     }
  //     else {
  //       
  //       Swal.fire('You Entered Pin no is invalid')
  //       this.Enteredpinno = ""
  //     }
  //   }
  // }







  public entercurrentpwd: any;

  public CheckPasswordvalidate() {
    
    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
      
      if (this.languageid == 1) {
        Swal.fire('Please Enter Your Pin No && Current password')
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }
      else {
        Swal.fire('Veuillez entrer votre NIP && mot de passe actuel')
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }


    }
    else {
      
      if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
        this.entercurrentpwd = "";
      }
      else {
        
        if (this.languageid == 1) {
          Swal.fire('Please enter valid Pinno and valid password')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
        else {
          Swal.fire('Veuillez saisir un Pinno valide et un mot de passe valide')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }

      }
    }
  }





  // send mail


}
