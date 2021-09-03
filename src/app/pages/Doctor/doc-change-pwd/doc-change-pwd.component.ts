import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-change-pwd',
  templateUrl: './doc-change-pwd.component.html',
  styleUrls: ['./doc-change-pwd.component.css']
})
export class DocChangePwdComponent implements OnInit {

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
  public pinno: any;
  public doctorid: any;
  public dummdocloginlist: any;
  currentpwd: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.doctorid = localStorage.getItem('userid');
    this.pinno = localStorage.getItem('Pinno');
    this.currentpwd = localStorage.getItem('Password');
    this.getdoctorloginfordash()
    this.getlanguage()
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
    this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
      data => {

        this.dummdocloginlist = data
        this.doctorloginlist = this.dummdocloginlist.filter(x => x.doctorID == this.doctorid)


      }, error => {
      }
    )

  }





  password: any;
  pp: any;
  username: any;
  mypinno: any;
  oldpassword: any;


  public GetDeatsils(details) {

    this.id = details.id,
      this.username = details.userName,
      // this.password = details.password,
      this.mypinno = details.pinno,
      this.oldpassword = details.password,

      this.Showpassword = 0;
  }

  public Showpassword: any;




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
        this.docservice.UpdateDoctorLogins(entity).subscribe(data => {
          if (data != 0) {
            // Swal.fire('Added Successfully.');
            if (this.languageid == 1) {
              Swal.fire('Completed', 'Password updated successfully', 'success');
              this.pp = 0;
              this.getdoctorloginfordash()
              document.getElementById('close').click();
              this.password = ""
            }
            else {
              Swal.fire('', 'Mis à jour avec succés', 'success');
              this.pp = 0;
              this.getdoctorloginfordash()
              document.getElementById('close').click();
              this.password = ""
            }

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

  public Enteredpinno: any;

  public entercurrentpwd: any;

  public CheckPasswordvalidate() {
    
    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
      
      if (this.languageid == 1) {
        Swal.fire('Please Enter Your Pin No && Current password')
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }
      else {
        Swal.fire('Votre code PIN et votre mot de passe ne correspondent pas.')
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


  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }
}
