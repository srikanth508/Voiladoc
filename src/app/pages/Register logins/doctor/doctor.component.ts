import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public doctorlist: any;
  public doctorid: any;
  public username: any;
  public password: any;
  public docdd = {};
  public pp: any;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummdoctorlist: any;
  public search: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetDoctorRegistratingLogins(this.languageid).subscribe(
        data => {

          this.doctorlist = data;
          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
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
      this.docservice.GetDoctorRegistratingLogins(this.languageid).subscribe(
        data => {

          this.dummdoctorlist = data;
          this.doctorlist = this.dummdoctorlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)

          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
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
  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search
      }, error => {
      }
    )
  }
  SelectLabel
  public GetDoctorID(item2: any) {

    this.doctorid = item2.id;


  }








  async insertdetails() {

    this.password = Math.random().toString(36).slice(-8);
  

    if (this.doctorid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("please select Doctor");
      }
      else {
        Swal.fire("Sélectionner un médecin");
      }
    }
    else if (this.password != undefined) {

      // this.password = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.pp = 1;
      // }
      // else {

      var entity = {
        'DoctorID': this.doctorid,
        'UserName': this.username,
        'Password': this.password
      }
      // this.username = '';
      // this.password = '';
      this.docservice.InsertDoctorLogin(entity).subscribe(async data => {
        if (data != 0) {
          // Swal.fire('Added Successfully.');
          await this.getdoctorloginfordash();
          if (this.languageid == 1) {

            Swal.fire('Completed', 'Doctor saved successfully', 'success');
            location.href = "#/Doctordash"
            this.pp = 0;
            // this.sendmail();
          }
          else {

            Swal.fire('', 'Mis à jour avec succés', 'success');
            location.href = "#/Doctordash"
            this.pp = 0;

          }

        }
        else {
          if (this.languageid == 1) {
            Swal.fire("Doctor Login Already Exists");
            location.href = "#/Doctordash"
          }
          else {
            Swal.fire("La connexion au médecin existe déjà");
            location.href = "#/Doctordash"
          }

        }
      })
    }
    // }

  }



  public doctorloginlist: any;
  smsmobileno: any;

  async getdoctorloginfordash() {

    this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
      async data => {

        this.doctorloginlist = data;
        var list = this.doctorloginlist.filter(x => x.doctorID == this.doctorid)
        this.pinno = list[0].pinno,
          this.email = list[0].emailID,
          this.doctorname = list[0].doctorName,
          this.smsmobileno = list[0].smsmobileno
        await this.sendmail();
        await this.SendTwiliSms()
        return true;
      }, error => {
      }
    )

  }

   SendTwiliSms() {
    debugger

    if (this.languageid == 1) {
      var sub = 'Welcome to Voiladoc'+'Pin code  : ' + this.pinno + 'UserName :' + this.username + 'Password : ' + this.password
      
    }
    else {
      var sub = 'Bienvenue sur Voialdoc'+' Code PIN  : ' + this.pinno + '     Nom dutilisateur :' + this.username+ '     Mot de passe : ' + this.password
     
    }

    this.docservice.SendTwillioSMS(this.smsmobileno, sub).subscribe(async data => {
      return true
    })
  }




  pinno: any;
  emailattchementurl = [];
  public email: any;
  public doctorname: any;

  async sendmail() {

    if (this.languageid == 1) {
      var sub = "Welcome to Voiladoc"
      var body = 'Dear ' + this.doctorname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Here are your login details. ' + "<br><br>" + 'Voiladoc pro web link : https://maroc.voiladoc.org/' + "<br>" + 'Pin code  : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Please do not share your login credentials with anyone. Contact our helpline on +212522446145 or email us at support@voiladoc.ma' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team' + "<br>" + 'www.voiladoc.ma'
    }
    else {
      var sub = "Bienvenue sur Voialdoc "
      var body = 'Cher ' + this.doctorname + ',' + "<br><br>" + 'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion. ' + "<br><br>" + 'Lien web Voiladoc pro : https://maroc.voiladoc.org/' + "<br>" + 'Code PIN  : ' + this.pinno + "<br>" + "Nom d'utilisateur :" + this.username + "<br>" + 'Mot de passe : ' + this.password + "<br><br>" + "Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d'assistance au +212522446145 ou envoyez-nous un e-mail à support@voiladoc.ma" + "<br><br>" + 'Meilleures salutations,' + "<br>" + 'Team Voiladoc' + "<br>" + 'www.voiladoc.com'
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
      return true;
    })
  }


}
