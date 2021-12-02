import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-midwife-login-dashboard',
  templateUrl: './midwife-login-dashboard.component.html',
  styleUrls: ['./midwife-login-dashboard.component.css']
})
export class MidwifeLoginDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public midwifelist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummmidwifelist: any;
  public count: any;
  public pinno: any;
  public currentpwd: any;
  countrymanaerid: any;
  showeditbutton: any;

  ngOnInit() {
    this.pinno = localStorage.getItem('Pinno');
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.currentpwd = localStorage.getItem('Password');
    this.countrymanaerid = localStorage.getItem('countrymanagerid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    this.GetMidWivesLoginAdmin();

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

  public GetMidWivesLoginAdmin() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetMidWivesLoginAdmin(this.languageid).subscribe(
        data => {

          this.midwifelist = data;
          this.count = this.midwifelist.length;

        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWivesLoginAdmin(this.languageid).subscribe(
        data => {

          this.dummmidwifelist = data;
          this.midwifelist = this.dummmidwifelist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifelist.length;
        }, error => {
        }
      )
    }
  }

  public DisableMidWivesLogin(id) {
    this.docservice.DisableMidWivesLogin(id).subscribe(
      data => {

        if (this.languageid == 1) {
          Swal.fire('Disabled', 'MidWife has been Disabled');
          this.GetMidWivesLoginAdmin();
        }
        else {
          Swal.fire('Désactivée', 'Accès désactivé');
          this.GetMidWivesLoginAdmin();
        }


      }, error => {
      }
    )
  }

  public EnableMidWivesLogin(id) {
    this.docservice.EnableMidWivesLogin(id).subscribe(
      data => {

        if (this.languageid == 1) {
          Swal.fire('Enabled', 'MidWife has been Enabled');
          this.GetMidWivesLoginAdmin();
        }
        else {
          Swal.fire('Activé', 'Accès Activé ');
          this.GetMidWivesLoginAdmin();
        }



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
        this.docservice.UpdateMidWivesLogin(entity).subscribe(data => {
          if (data != 0) {
            if (this.languageid == 1) {
              Swal.fire('Success', 'Password Updated successfully', 'success');
              this.pp = 0;
              document.getElementById('close').click();
              this.password = ""
              this.GetMidWivesLoginAdmin();
            }
            else {
              Swal.fire('', 'Mis à jour avec succés', 'success');
              this.pp = 0;
              this.password = ""
              document.getElementById('close').click();
              this.GetMidWivesLoginAdmin();
            }

          }
          else {
            Swal.fire("User Name Already Exists");
            document.getElementById('close').click();
            this.GetMidWivesLoginAdmin();
          }
        })
      }
    }
  }


  public Enteredpinno: any;
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
        Swal.fire('Votre code PIN et votre mot de passe ne correspondent pas')
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
        
        if(this.languageid==1)
        {
          Swal.fire('Please enter valid Pin and valid password')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
        else
        {
          Swal.fire('Veuillez saisir un Pin valide et un mot de passe valide')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
      
      }
    }
  }


}
