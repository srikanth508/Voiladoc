import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public pharmacylist: any;
  public username: any;
  public password: any;
  public pharmacyid: any;
  public pharmacydd = {}
  public password1: any;
  public labels: any;
  public languageid: any;
  search: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.pharmacylist = data;
        this.pharmacydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'pharmacyName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )


  }
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
  SelectLabel
  public GetPharmacyID(item2: any) {

    this.pharmacyid = item2.id;
  }

  public insertdetails() {
    this.password = Math.random().toString(36).slice(-8);
    if (this.pharmacyid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Pharmacy");
      }
      else {
        Swal.fire("Sélectionner une pharmacie");
      }
    }
    else if (this.password != undefined) {

      // var valpassword = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.password1 = 1;
      // }
      // else {
      var entity = {
        'PharmacyID': this.pharmacyid,
        'UserName': this.username,
        'Password': this.password
      }
      this.docservice.InsertPharmacyAdminRegistration(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            this.getpharmacyloginfordash();
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            location.href = "#/Pharmacydash"
       
          }
          else {
            this.getpharmacyloginfordash();
            Swal.fire('', 'Mis à jour avec succés', 'success');
            location.href = "#/Pharmacydash"
           
          }


        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Error', 'Pharmacy Login Already Exists', 'success');
            location.href = "#/Pharmacydash"
            
          }
          else {
            Swal.fire('Erreur Cet identifiant existe déjà');
            location.href = "#/Pharmacydash"
           
          }

        }
      })
    }
    // }
  }
  smsmobileno:any;


  public getpharmacyloginfordash() {
    this.docservice.GetPharmacyLoginForDash(this.languageid).subscribe(
      data => {
        this.pharmacylist = data;
        var list = this.pharmacylist.filter(x => x.pharmacyID == this.pharmacyid)
        this.pinno = list[0].pinno,
          this.email = list[0].email,
          this.pharmacyname = list[0].pharmacyName
        this.sendmail();
        this.SendTwiliSms();
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
  public pharmacyname: any;


  public sendmail() {
    if (this.languageid == 1) {
      var sub = "Welcome to Voiladoc"
      var body = 'Dear ' + this.pharmacyname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Here are your login details. ' + "<br><br>" + 'Voiladoc pro web link : https://maroc.voiladoc.org/' + "<br>" + 'Pin code  : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Please do not share your login credentials with anyone. Contact our helpline on +212522446145 or email us at support@voiladoc.ma' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team' + "<br>" + 'www.voiladoc.ma'
    }
    else {
      var sub = "Bienvenue sur Voialdoc "
      var body = 'Cher ' + this.pharmacyname + ',' + "<br><br>" + 'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion. ' + "<br><br>" + 'Lien web Voiladoc pro : https://maroc.voiladoc.org/' + "<br>" + 'Code PIN  : ' + this.pinno + "<br>" + "Nom d'utilisateur :" + this.username + "<br>" + 'Mot de passe : ' + this.password + "<br><br>" + "Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d'assistance au +212522446145 ou envoyez-nous un e-mail à support@voiladoc.ma" + "<br><br>" + 'Meilleures salutations,' + "<br>" + 'Team Voiladoc' + "<br>" + 'www.voiladoc.com'
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
