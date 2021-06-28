import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ind-recpdash',
  templateUrl: './ind-recpdash.component.html',
  styleUrls: ['./ind-recpdash.component.css']
})
export class IndRecpdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public receptionistlogins: any;
  public hospitalclinicid: any;
  public term: any;
  languageID
  labels: any;
  count: any;
  pinno: any;
  Showpassword: any;
  doctorid: any;
  recpid: any;
  dummrecplogins: any;
  public notshow: any;
  currentpwd: any;
  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
    this.recpid = localStorage.getItem('recpid');
    if (this.recpid != undefined) {
      this.notshow = 0;
    }
    else {
      this.notshow = 1;
    }
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.pinno = localStorage.getItem('Pinno');
    this.languageID = localStorage.getItem('LanguageID');
    this.currentpwd = localStorage.getItem('Password');
    this.getreceptionlogin();
    this.getlanguage()
  }
  public getreceptionlogin() {

    if (this.recpid == undefined) {
      this.docservice.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
        data => {
          this.dummrecplogins = data;
          this.receptionistlogins = this.dummrecplogins.filter(x => x.doctorID == this.doctorid)
          this.count = this.receptionistlogins.length;
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
        data => {
          this.dummrecplogins = data;
          this.receptionistlogins = this.dummrecplogins.filter(x => x.id == this.recpid)
          this.count = this.receptionistlogins.length;
        }, error => {
        }
      )
    }

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
  name: any;
  address: any;
  mobileno: any;
  email: any;
  oldpassword: any;


  public GetDeatsils(details) {
    
    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.name = details.name,
      this.mobileno = details.mobileNo,
      this.email = details.email,
      this.address = details.address,
      this.Showpassword = 0;
  }



  public updatedetails() {
    
    var entity = {
      'ID': this.id,
      'DoctorID': this.doctorid,
      'Name': this.name,
      'MobileNo': this.mobileno,
      'Email': this.email,
      'Address': this.address,
      'UserName': this.username,
      'Password': this.password
    }
    this.docservice.UpdateIndependentDoctors_Receptionist(entity).subscribe(data => {

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


      // else {
      //   Swal.fire('User Name Already Exists');
      //   this.getreceptionlogin();
      //   document.getElementById('close').click();
      // }

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





  public GetDisablerecp(docid) {
    this.docservice.DisableIndependentDoctors_Receptionist(docid).subscribe(
      data => {

        if (this.languageID == 1) {
          Swal.fire('Disabled', 'Receptionist has been Disabled');
          this.getreceptionlogin();
        }
        else {
          Swal.fire('Désactivée', 'Accès désactivé');
          this.getreceptionlogin();
        }


      }, error => {
      }
    )
  }



  public GetRecpEnable(id) {
    this.docservice.EnableIndependentDoctors_Receptionist(id).subscribe(
      data => {

        if (this.languageID == 1) {
          Swal.fire('Enabled', 'Receptionist has been Enabled');
          this.getreceptionlogin();
        }
        else {
          Swal.fire('Activé', 'Accès Activé');
          this.getreceptionlogin();
        }


      }, error => {
      }
    )
  }
}
