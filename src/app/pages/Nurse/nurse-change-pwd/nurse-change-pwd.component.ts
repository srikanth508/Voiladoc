import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';

@Component({
  selector: 'app-nurse-change-pwd',
  templateUrl: './nurse-change-pwd.component.html',
  styleUrls: ['./nurse-change-pwd.component.css']
})
export class NurseChangePwdComponent implements OnInit {

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
  pinno: any;
  nurseid: any;
  currentpwd: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
    this.nurseid = localStorage.getItem('nurseid');
    this.currentpwd = localStorage.getItem('Password');
    this.getlanguage();
    this.GetNurseLoginAdmin();
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

    this.docservice.GetNurseLoginAdmin(this.languageid).subscribe(
      data => {

        this.dummnurseloginlist = data;
        this.nurseloginlist = this.dummnurseloginlist.filter(x => x.nurseID == this.nurseid)
        this.count = this.nurseloginlist.length;
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
  oldpassword: any;
  public GetDeatsils(details) {



    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
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
              this.password = ""
            }
            else {
              Swal.fire('', 'Mis à jour avec succés', 'success');
              this.GetNurseLoginAdmin();
              document.getElementById('close').click();
              this.password = ""
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
          Swal.fire('Veuillez saisir un numéro PIN et un mot de passe valides.')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }

      }
    }
  }

}
