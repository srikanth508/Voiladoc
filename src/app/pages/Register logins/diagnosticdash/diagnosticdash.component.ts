import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-diagnosticdash',
  templateUrl: './diagnosticdash.component.html',
  styleUrls: ['./diagnosticdash.component.css']
})
export class DiagnosticdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnoticloginlist: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public pinno: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
    this.getdiagnosticloginfordash();

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

  public getdiagnosticloginfordash() {
    this.docservice.GetDiagnosticLoginForDash(this.languageid).subscribe(
      data => {

        this.diagnoticloginlist = data;
      }, error => {
      }
    )
  }
  public disablediagnostic(docid) {
    this.docservice.DisableDiagnosticLogin(docid).subscribe(
      data => {

        if(this.languageid==1)
        {
          Swal.fire('Disabled', 'Diagnostic Center has been Disabled');
          this.getdiagnosticloginfordash();
        }
        else{
          Swal.fire('Désactivée', 'Accès désactivé');
          this.getdiagnosticloginfordash();
        }
       

      }, error => {
      }
    )
  }
  public enablediagnostic(id) {
    this.docservice.EnableDiagnosticLogin(id).subscribe(
      data => {

        Swal.fire('Activé', 'Accès Activé');

        this.getdiagnosticloginfordash();

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
        this.docservice.UpdateDiagnosticCenterAdminRegistrationWeb(entity).subscribe(data => {

          if (data != 0) {
            if (this.languageid == 1) {
              Swal.fire('Success', 'Password Updated Successfully', 'success');
              this.getdiagnosticloginfordash()
              this.pp = 0;
              document.getElementById('close').click();
            }
            else {
              Swal.fire('', 'Mis à jour avec succés', 'success');
              this.getdiagnosticloginfordash()
              this.pp = 0;
              document.getElementById('close').click();
            }

          }
          else {
            if(this.languageid==1)
            {
              Swal.fire('Success', 'username already exists', 'success');
              this.getdiagnosticloginfordash()
              this.pp = 0;
              document.getElementById('close').click();
            }
            else{
              Swal.fire('Succès', "Ce nom d'utilisateur existe déjà");
              this.getdiagnosticloginfordash()
              this.pp = 0;
              document.getElementById('close').click();
            }
          
          }
        })

      }
    }
  }

  public Enteredpinno: any;
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
