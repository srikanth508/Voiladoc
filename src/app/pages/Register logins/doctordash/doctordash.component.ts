import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctordash',
  templateUrl: './doctordash.component.html',
  styleUrls: ['./doctordash.component.css']
})
export class DoctordashComponent implements OnInit {

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
  currentpwd: any;
  countrymanaerid: any;
  showeditbutton: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
    this.getlanguage();
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.currentpwd = localStorage.getItem('Password');
    this.countrymanaerid = localStorage.getItem('countrymanagerid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    this.getdoctorloginfordash();

    this.Showpassword = 1
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
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
        data => {

          this.doctorloginlist = data;
          this.count = this.doctorloginlist.length;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
        data => {

          this.dummdcotorlogins = data;
          this.doctorloginlist = this.dummdcotorlogins.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.doctorloginlist.length;
        }, error => {
        }
      )
    }
  }
  public disabledoctor(docid) {
    this.docservice.DisableDoctorLogin(docid).subscribe(
      data => {

        if (this.languageid == 1) {
          Swal.fire('Disabled', 'Doctor has been Disabled');
          this.getdoctorloginfordash();
        }
        else {
          Swal.fire('Désactivée', 'Accès désactivé');
          this.getdoctorloginfordash();
        }


      }, error => {
      }
    )
  }
  public enabledoctor(id) {
    this.docservice.EnableDoctorLogin(id).subscribe(
      data => {

        if (this.languageid == 1) {
          Swal.fire('Enabled', 'Doctor has been Enabled');
          this.getdoctorloginfordash();
        }
        else {
          Swal.fire('Activé', 'Accès Activé');
          this.getdoctorloginfordash();
        }


      }, error => {
      }
    )
  }

  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }


  password: any;
  pp: any;
  username: any;
  mypinno: any;

  oldpassword: any;
  public GetDeatsils(details) {

    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno

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
              this.password = ""
              document.getElementById('close').click();

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
        
        if(this.languageid==1)
        {
          Swal.fire('Please enter valid Pinno and valid password')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
        else
        {
          Swal.fire('Veuillez saisir un Pinno valide et un mot de passe valide')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
      
      }
    }
  }
}
