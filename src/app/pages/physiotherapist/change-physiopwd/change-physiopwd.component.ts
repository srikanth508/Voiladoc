import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-physiopwd',
  templateUrl: './change-physiopwd.component.html',
  styleUrls: ['./change-physiopwd.component.css']
})
export class ChangePhysiopwdComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public workinglist: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public dummlistphysiolist: any;
  public physioist: any;
  public term: any;
  public count: any;
  public dummlist: any;
  public dayslist: any;
  public daysname: any;
  public physioname: any;
  public phsyodd = {};
  public search: any;
  p: number = 1;
  physioid: any;
  currentpwd: any;
  ngOnInit() {

    this.pinno = localStorage.getItem('Pinno');
    this.languageid = localStorage.getItem('LanguageID');
    this.physioid = localStorage.getItem('physioid');
    this.currentpwd = localStorage.getItem('Password');
    this.GetPhysiotherapistLoginAdmin();
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
  dummphysiologinlist: any;
  physiologinlist: any;

  public GetPhysiotherapistLoginAdmin() {
    this.docservice.GetPhysiotherapistLoginAdmin(this.languageid).subscribe(
      data => {

        this.dummphysiologinlist = data;
        this.physiologinlist = this.dummphysiologinlist.filter(x => x.physiotherapistID == this.physioid);
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
  public id: any;
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
        this.docservice.UpdatePhysiotherapistLogin(entity).subscribe(data => {
          if (data != 0) {
            if (this.languageid == 1) {
              Swal.fire('Success', 'Password Updated Successfully', 'success');
              this.pp = 0;
              document.getElementById('close').click();
              this.GetPhysiotherapistLoginAdmin()
              this.password = ""
            }
            else {
              Swal.fire('', 'Mis à jour avec succés', 'success');
              this.pp = 0;
              document.getElementById('close').click();
              this.GetPhysiotherapistLoginAdmin()
              this.password = ""
            }

          }
          else {
            Swal.fire("User Name Already Exists");
            this.pp = 0;
            this.GetPhysiotherapistLoginAdmin()
            document.getElementById('close').click();
          }
        })
      }
    }
  }


  public Enteredpinno: any;
  public Showpassword: any;
  public pinno: any;

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
