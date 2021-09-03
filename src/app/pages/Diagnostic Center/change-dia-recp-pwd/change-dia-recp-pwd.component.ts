import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-dia-recp-pwd',
  templateUrl: './change-dia-recp-pwd.component.html',
  styleUrls: ['./change-dia-recp-pwd.component.css']
})
export class ChangeDiaRecpPwdComponent implements OnInit {
  languageid: any;
  labels: any;
  receptionistloginlist: any;
  term: any;
  count: any;
  recpid: any;
  currentpwd: any;
  labels1: any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
    this.recpid = localStorage.getItem("Receptionstid");
    this.currentpwd = localStorage.getItem('Password');
    this.GetLables();
    this.GetReceptionistlogin();
    this.getlanguage()
  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
  }


  public GetLables() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
  }

  dummreceptionistloginlist: any;
  public GetReceptionistlogin() {

    this.docservice.GetDiagnosticReceptionistLogin(localStorage.getItem('diagnosticid')).subscribe(data => {

      this.dummreceptionistloginlist = data;
      this.receptionistloginlist = this.dummreceptionistloginlist.filter(x => x.id == this.recpid)
      this.count = this.receptionistloginlist.length;
    })
  }



  name: any;
  phoneno: any;
  email: any;
  address: any;
  username: any;
  password: any;


  public mypinno: any;
  public Showpassword: any;
  public pinno: any;
  public diagnosticid: any;
  public oldpassword:any;

  public getpassword(details) {
    this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.name = details.name,
      this.phoneno = details.phoneNo,
      this.email = details.email,
      this.address = details.address,
      this.username = details.userName,
      this.id = details.id,
      this.diagnosticid = details.diagnosticID


    this.Showpassword = 0;
  }



  public Enteredpinno: any;








  // public CheckPasswordvalidate() {

  //   if (this.Enteredpinno == "") {

  //     Swal.fire('Please Enter Your Pin No')

  //   }
  //   else {

  //     if (this.pinno == this.Enteredpinno) {
  //       this.Showpassword = 1;
  //       this.Enteredpinno = ""
  //     }
  //     else {

  //       Swal.fire('You Entered Pin no is invalid')
  //       this.Enteredpinno = ""
  //     }
  //   }
  // }

  entercurrentpwd: any;


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
  id: any;

  public UpdateDetailes() {

    var entity = {
      ID: this.id,
      DiagnosticID: this.diagnosticid,
      Name: this.name,
      PhoneNo: this.phoneno,
      EmailID: this.email,
      Address: this.address,
      UserName: this.username,
      Password: this.password
    }
    this.docservice.UpdateDiagnosticReceptionistLogin(entity).subscribe(res => {
      if (this.languageid == 1) {


        Swal.fire('Success', 'Updated successfully')
        // location.href = "#/ReceptionistLoginDashboard"
      }
      else if (this.languageid == 6) {

        Swal.fire('Mis à jour avec Succés')
        // location.href = "#/ReceptionistLoginDashboard"
      }
    })
  }
}
