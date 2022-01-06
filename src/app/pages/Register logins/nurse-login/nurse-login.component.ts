import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nurse-login',
  templateUrl: './nurse-login.component.html',
  styleUrls: ['./nurse-login.component.css']
})
export class NurseLoginComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public nurselist: any;
  public nurseid: any;
  public username: any;
  public password: any;
  public nursedd = {};
  public pp: any;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummnurselist: any;
  public search: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    if (this.hospitalclinicid == null) {
      this.docservice.GetNurseListForRegisteringLogin(this.languageid).subscribe(
        data => {

          this.nurselist = data;
          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseListForRegisteringLogin(this.languageid).subscribe(
        data => {

          this.dummnurselist = data;
          this.nurselist = this.dummnurselist.filter(x => x.hospitalClinicID == this.hospitalclinicid)

          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        }, error => {
        }
      )

    }



  }
  SelectLabel
  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search;
      }, error => {
      }
    )
  }

  public GetnurseID(item1: any) {

    this.nurseid = item1.id;
  }

  public insertdetails() {
    this.password = Math.random().toString(36).slice(-8);

    if (this.nurseid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Hospital/Clinic");
      }
      else {
        Swal.fire("Sélectionner une infirmière");
      }

    }
    else if (this.password != undefined) {

      // var valpassword = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.pp = 1;
      // }
      // else {

      var entity = {
        'NurseID': this.nurseid,
        'UserName': this.username,
        'Password': this.password
      }
      // this.username = '';
      // this.password = '';
      this.docservice.InsertNurseLogin(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            this.GetNurseLoginAdmin()
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            location.href = "#/NurseLoginDashboard"
          }
          else {
            this.GetNurseLoginAdmin()
            Swal.fire('', 'Mis à jour avec succés', 'success');
            location.href = "#/NurseLoginDashboard"
          }

        }
        else {
          if (this.languageid == 1) {
            Swal.fire("Nurse Login Already Exists");
            location.href = "#/NurseLoginDashboard"
          }
          else {
            Swal.fire("La connexion infirmière existe déjà");
            location.href = "#/NurseLoginDashboard"
          }

        }
      })
      // }
    }
  }

  public nurseloginlist: any;
  public nursename: any;

  smsmobileno:any;

  public GetNurseLoginAdmin() {

    this.docservice.GetNurseLoginAdmin(this.languageid).subscribe(
      data => {

        this.nurseloginlist = data;
        var list = this.nurseloginlist.filter(x => x.nurseID == this.nurseid)
        this.nursename = list[0].nurseName,
          this.email = list[0].email,
          this.pinno = list[0].pinno,
          this.smsmobileno = list[0].smsmobileno
        this.sendmail()
      }, error => {
      }
    )

  }

  
  async SendTwiliSms() {
    debugger

    if (this.languageid == 1) {
      var sub = 'Welcome to Voiladoc'+'Pin code  : ' + this.pinno +  + 'UserName :' + this.username + + 'Password : ' + this.password
      
    }
    else {
      var sub = 'Bienvenue sur Voialdoc'+'Code PIN  : ' + this.pinno +  + "Nom d'utilisateur :" + this.username + + 'Mot de passe : ' + this.password
     
    }

    this.docservice.SendTwillioSMS(this.smsmobileno, sub).subscribe(async data => {
      return true
    })
  }




  pinno: any;
  emailattchementurl = [];
  public email: any;


  public sendmail() {
    if (this.languageid == 1) {
      var sub = "Welcome to Voiladoc"
      var body = 'Dear ' + this.nursename + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Here are your login details. ' + "<br><br>" + 'Voiladoc pro web link : https://maroc.voiladoc.org/' + "<br>" + 'Pin code  : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Please do not share your login credentials with anyone. Contact our helpline on +212522446145 or email us at support@voiladoc.ma' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team' + "<br>" + 'www.voiladoc.ma'
    }
    else {
      var sub = "Bienvenue sur Voialdoc "
      var body = 'Cher ' + this.nursename + ',' + "<br><br>" + 'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion. ' + "<br><br>" + 'Lien web Voiladoc pro : https://maroc.voiladoc.org/' + "<br>" + 'Code PIN  : ' + this.pinno + "<br>" + "Nom d'utilisateur :" + this.username + "<br>" + 'Mot de passe : ' + this.password + "<br><br>" + "Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d'assistance au +212522446145 ou envoyez-nous un e-mail à support@voiladoc.ma" + "<br><br>" + 'Meilleures salutations,' + "<br>" + 'Team Voiladoc' + "<br>" + 'www.voiladoc.com'
    }
    var entity = {
      'emailto': this.email,
      'emailsubject': sub,
      'emailbody': body,
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }

}
