import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnosticlist: any;
  public diagnosticid: any;
  public username: any;
  public password: any;
  public diadd = {}
  public pp: any;
  public labels: any;
  public languageid: any;
  public search: any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
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
  public GetDiagnosticID(item1: any) {

    this.diagnosticid = item1.id;
  }
  public insertdetails() {

    this.password = Math.random().toString(36).slice(-8);

    if (this.diagnosticid == undefined) {

      if (this.languageid == 1) {
        Swal.fire("Please Select Diagnostic Center");
      }
      else {
        Swal.fire("Sélectionner un centre d’analyses / imagerie");
      }

    }
    else if (this.password != undefined) {

      //   var valpassword = this.docservice.strongpassword(this.password);
      //   if (valpassword == false) {

      //     this.pp=1;
      //   }
      // else {
        debugger
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'UserName': this.username,
        'Password': this.password
      }
      this.docservice.InsertDiagnosticCenterAdminRegistration(entity).subscribe(data => {
        if (data != 0) {
          this.getdiagnosticloginfordash()
          if (this.languageid == 1) {
           
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            location.href = "#/Diagnosticdash"
           
            this.pp = 0;
          }
          else {
            debugger
            Swal.fire('', 'Mis à jour avec succés', 'success');
            location.href = "#/Diagnosticdash"
   
            this.pp = 0;
          }
        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Success', 'Diagnostic Center Already Exists', 'success');
            location.href = "#/Diagnosticdash"
          }
          else {
            Swal.fire('', 'Le laboratoire d’analyses / imagerie existe déjà');
            location.href = "#/Diagnosticdash"
          }

        }
      })
      // }
    }
  }


  public diagnoticloginlist: any;
  smsmobileno:any;

  public getdiagnosticloginfordash() {
    debugger
    this.docservice.GetDiagnosticLoginForDash(this.languageid).subscribe(
      data => {
        debugger
        this.diagnoticloginlist = data;

        var list = this.diagnoticloginlist.filter(x => x.diagnosticCenterID == this.diagnosticid)
        this.diagnosticname = list[0].diagnosticCenterName,
          this.pinno = list[0].pinno,
          this.email = list[0].emailID
          this.smsmobileno = list[0].smsmobileno

           this.sendmail();
           this.SendTwiliSms()

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
  public diagnosticname: any;



   sendmail() {

    if (this.languageid == 1) {
      var sub = "Welcome to Voiladoc"
      var body = 'Dear ' + this.diagnosticname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Here are your login details. ' + "<br><br>" + 'Voiladoc pro web link : https://maroc.voiladoc.org/' + "<br>" + 'Pin code  : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Please do not share your login credentials with anyone. Contact our helpline on +212522446145 or email us at support@voiladoc.ma' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team' + "<br>" + 'www.voiladoc.ma'
    }
    else {
      var sub = "Bienvenue sur Voialdoc "
      var body = 'Cher ' + this.diagnosticname + ',' + "<br><br>" + 'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion. ' + "<br><br>" + 'Lien web Voiladoc pro : https://maroc.voiladoc.org/' + "<br>" + 'Code PIN  : ' + this.pinno + "<br>" + "Nom d'utilisateur :" + this.username + "<br>" + 'Mot de passe : ' + this.password + "<br><br>" + "Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d'assistance au +212522446145 ou envoyez-nous un e-mail à support@voiladoc.ma" + "<br><br>" + 'Meilleures salutations,' + "<br>" + 'Team Voiladoc' + "<br>" + 'www.voiladoc.com'
    }

    debugger
    var entity = {
      'emailto': this.email,
      'emailsubject': sub,
      'emailbody': body,
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
      debugger
    })
  }



 
  
}
