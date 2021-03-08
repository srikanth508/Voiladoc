import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pharmacydash',
  templateUrl: './pharmacydash.component.html',
  styleUrls: ['./pharmacydash.component.css']
})
export class PharmacydashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public pharmacylist: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
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


  public getpharmacyloginfordash() {
    this.docservice.GetPharmacyLoginForDash(this.languageid).subscribe(
      data => {

        this.pharmacylist = data;
      }, error => {
      }
    )
  }
  public disablepharmacy(id) {
    this.docservice.DisablePharmacyLogin(id).subscribe(
      data => {
        if (this.languageid == 1) {
          Swal.fire('Disabled', 'Pharmacy has been Disabled');
          this.getpharmacyloginfordash();

        }
        else {

          Swal.fire('Désactivée', ' Accès désactivé');
          this.getpharmacyloginfordash();
        }
      }, error => {
      }
    )
  }
  public enablepharmacy(id) {
    this.docservice.EnablePharmacyLogin(id).subscribe(
      data => {
        if (this.languageid == 1) {

          Swal.fire('Enabled', 'Pharmacy has been Enabled');
          this.getpharmacyloginfordash();
        }
        else {

          Swal.fire('Activé', 'Accès Activé');
          this.getpharmacyloginfordash();
        }
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


  public GetDeatsils(details) {

    this.id = details.id,
      this.username = details.userName,
      this.password = details.password,
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
