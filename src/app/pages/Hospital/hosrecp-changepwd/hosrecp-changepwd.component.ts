import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hosrecp-changepwd',
  templateUrl: './hosrecp-changepwd.component.html',
  styleUrls: ['./hosrecp-changepwd.component.css']
})
export class HosrecpChangepwdComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public receptionistlogins: any;
  public hospitalclinicid: any;
  public term: any;
  languageID
  labels: any;
  count: any;
  pinno: any;
  Showpassword: any;
  receptionid: any;
  currentpwd: any;
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.pinno = localStorage.getItem('Pinno');
    this.languageID = localStorage.getItem('LanguageID');
    this.receptionid = localStorage.getItem('Receptionstid');
    this.currentpwd = localStorage.getItem('Password');
    this.getreceptionlogin();
    this.getlanguage()
  }
  dummreceptionistlogins: any;

  public getreceptionlogin() {

    this.docservice.GetReceiptionistLoginDash(this.hospitalclinicid).subscribe(
      data => {

        this.dummreceptionistlogins = data;
        this.receptionistlogins = this.dummreceptionistlogins.filter(x => x.id == this.receptionid)
        this.count = this.receptionistlogins.length;
      }, error => {
      }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageID).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
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



  public updatedetails() {
    var entity = {
      'ID': this.id,
      'UserName': this.username,
      'Password': this.password
    }
    this.docservice.UpdateReceiptionistLogin(entity).subscribe(data => {
      if (data != 0) {
        if (this.languageID == 1) {
          Swal.fire('Updated Successfully');
          this.getreceptionlogin();
          document.getElementById('close').click();
          this.password = ""
        }
        else {
          Swal.fire('', 'Mis à jour avec succés');
          this.getreceptionlogin();
          document.getElementById('close').click();
          this.password = ""
        }

      }
      else {
        Swal.fire('User Name Already Exists');
        this.getreceptionlogin();
        document.getElementById('close').click();
      }

    })
  }




  public Enteredpinno: any;


  public entercurrentpwd: any;

  public CheckPasswordvalidate() {
    
    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
      
      if (this.languageID == 1) {
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
        
        if (this.languageID == 1) {
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
