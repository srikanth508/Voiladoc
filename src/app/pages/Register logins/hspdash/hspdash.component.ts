import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-hspdash',
  templateUrl: './hspdash.component.html',
  styleUrls: ['./hspdash.component.css']
})
export class HspdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService,private spinner: NgxSpinnerService) { }

  public hsopitalloginlist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public pinno: any;
  public currentpwd: any;
  countrymanaerid: any;
  showeditbutton: any;
  hospitalclinicid: any;
  sowadd: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
    this.currentpwd = localStorage.getItem('Password');
    this.countrymanaerid = localStorage.getItem('countrymanagerid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    if (this.hospitalclinicid == undefined) {
      this.sowadd = 1
    }
    else {
      this.sowadd = 2
    }

    this.gethospitalclinicfordash();

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

  public gethospitalclinicfordash() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
        data => {

          this.hsopitalloginlist = data;
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
        data => {
          var list = data;
          this.hsopitalloginlist = list.filter(x => x.hospital_ClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }

  }

  public disablehospital(id) {
    this.docservice.DisableHospital_ClinicLogin(id).subscribe(
      data => {

        if (this.languageid == 1) {
          Swal.fire('Disabled', 'Hospital/Clinic has been Disabled');
          this.gethospitalclinicfordash();
        }
        else {
          Swal.fire('Accès désactivé');
          this.gethospitalclinicfordash();
        }

      }, error => {
      }
    )
  }
  public enablehospital(hosid) {
    this.docservice.EnableHospital_ClinicLogin(hosid).subscribe(
      data => {
        if (this.languageid == 1) {
          Swal.fire('Enabled', 'Hospital/Clinic has been Enabled');
          this.gethospitalclinicfordash();
        }
        else {
          Swal.fire('Activé', 'Accès Activé');
          this.gethospitalclinicfordash();
        }

      }, error => {
      }
    )
  }
  public pageChanged(even) {

    let fgdgfgd = even;
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
        this.docservice.UpdateHospitalClinicAdminRegistration(entity).subscribe(data => {
          if (data != 0) {
            if (this.languageid == 1) {
              Swal.fire('Success', 'Password Updated successfully', 'success');
              this.gethospitalclinicfordash()
              document.getElementById('close').click();
              this.pp = 0;
              this.password = ""
            }
            else {
              Swal.fire('Succès', 'Mot de passe mis à jour avec succès');
              this.gethospitalclinicfordash()
              document.getElementById('close').click();
              this.pp = 0;
              this.password = ""
            }


          }
          else {
            Swal.fire('Error', 'User Name Already Exists', 'success');
            this.gethospitalclinicfordash()
            document.getElementById('close').click();
          }
        })
      }
    }
  }


  public Showpassword: any;

  public Enteredpinno: any;

  // public CheckPasswordvalidate() {
  //   
  //   if (this.Enteredpinno == "") {
  //     
  //     if (this.languageid == 1) {
  //       Swal.fire('Please Enter Your Pin No')
  //     }
  //     else {
  //       Swal.fire('Veuillez entrer votre code PIN Non')
  //     }
  //   }
  //   else {
  //     
  //     if (this.pinno == this.Enteredpinno) {
  //       this.Showpassword = 1;
  //       this.Enteredpinno = ""
  //     }
  //     else {
  //       
  //       Swal.fire('You Entered Pin no is invalid')
  //       this.Enteredpinno = ""
  //     }
  //   }
  // }







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
          Swal.fire('Please enter valid Pin and valid password')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
        else {
          Swal.fire('Veuillez saisir un Pin valide et un mot de passe valide')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }

      }
    }
  }


  emailattchementurl = [];
  public email: any;
  public doctorname: any;

  async sendmail(details) {
    this.spinner.show();
    if (this.languageid == 1) {
      var sub = "Welcome to Voiladoc"
      var body = 'Dear ' + details.hospital_ClinicName + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Here are your login details. ' + "<br><br>" + 'Voiladoc pro web link : https://maroc.voiladoc.org/' + "<br>" + 'Pin code  : ' + details.pinno + "<br>" + 'UserName :' + details.userName + "<br>" + 'Password : ' + details.password + "<br><br>" + 'Please do not share your login credentials with anyone. Contact our helpline on +212522446145 or email us at support@voiladoc.ma' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team' + "<br>" + 'www.voiladoc.ma'
    }
    else {
      var sub = "Bienvenue sur Voialdoc "
      var body = 'Cher ' + details.hospital_ClinicName + ',' + "<br><br>" + 'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion. ' + "<br><br>" + 'Lien web Voiladoc pro : https://maroc.voiladoc.org/' + "<br>" + 'Code PIN  : ' + details.pinno + "<br>" + "Nom d'utilisateur :" + details.userName + "<br>" + 'Mot de passe : ' + details.password + "<br><br>" + "Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d'assistance au +212522446145 ou envoyez-nous un e-mail à support@voiladoc.ma" + "<br><br>" + 'Meilleures salutations,' + "<br>" + 'Team Voiladoc' + "<br>" + 'www.voiladoc.com'
    }

    var entity = {
      'emailto': details.emailID,
      'emailsubject': sub,
      'emailbody': body,
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {

      // this.SendTwiliSms(details);
    }, error => {
      this.spinner.hide();
    })
  }



  SendTwiliSms(details) {
    debugger

    if (this.languageid == 1) {
      var sub = 'Welcome to Voiladoc' + 'Pin code  : ' + details.pinno + ' UserName :' + details.userName + ' Password : ' + details.password

    }
    else {
      var sub = 'Bienvenue sur Voialdoc' + 'Code PIN  : ' + details.pinno + '  Nom dutilisateur : ' + details.userName + ' Mot de passe : ' + details.password

    }

    this.docservice.SendTwillioSMS(details.smsmobileno, sub).subscribe(async data => {
      if (this.languageid == 1) {
        Swal.fire("The login credentials have been sent again.");
        this.spinner.hide();
      }
      else {
        Swal.fire("Les identifiants de connexion ont été à nouveau envoyés.");
        this.spinner.hide();
      }

    }, error => {
      this.spinner.hide();
    })
  }


  // send mail


}
