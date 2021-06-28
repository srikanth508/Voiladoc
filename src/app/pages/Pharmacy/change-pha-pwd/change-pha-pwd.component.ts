import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-pha-pwd',
  templateUrl: './change-pha-pwd.component.html',
  styleUrls: ['./change-pha-pwd.component.css']
})
export class ChangePhaPwdComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public pharmacylist: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public pharmacyid: any;
  currentpwd: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.pharmacyid = localStorage.getItem('pharmacyid');
    this.pinno = localStorage.getItem('Pinno');
    this.currentpwd = localStorage.getItem('Password');
    this.getpharmacyloginfordash();
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
  dummpharmacylist: any;

  public getpharmacyloginfordash() {
    this.docservice.GetPharmacyLoginForDash(this.languageid).subscribe(
      data => {

        this.dummpharmacylist = data;
        this.pharmacylist = this.dummpharmacylist.filter(x => x.pharmacyID == this.pharmacyid)

      }, error => {
      }
    )
  }


  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }

  public id: any;
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
        this.docservice.UpdatePharmacyAdminRegistration(entity).subscribe(data => {

          if (data != 0) {
            if (this.languageid == 1) {
              Swal.fire('Registration Completed', 'password updated successfully', 'success');
              this.pp = 0;
              document.getElementById('close').click();
              this.getpharmacyloginfordash()
            }
            else {
              Swal.fire('', 'Mis à jour avec succés', 'success');
              this.pp = 0;
              document.getElementById('close').click();
              this.getpharmacyloginfordash()
            }

          }
          else {
            Swal.fire('Error', 'Username Already Exists', 'success');
            location.href = "#/Pharmacydash"
            document.getElementById('close').click();
            this.pp = 0;
            this.getpharmacyloginfordash()
          }
        })
      }
    }
  }





  public Enteredpinno: any;
  public pinno: any;
  public Showpassword: any;

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

}
