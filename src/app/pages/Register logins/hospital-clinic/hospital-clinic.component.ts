import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital-clinic',
  templateUrl: './hospital-clinic.component.html',
  styleUrls: ['./hospital-clinic.component.css']
})
export class HospitalClinicComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public hospitallist: any;
  public username: any;
  public password: any;
  public hospitalid: any;
  public hospdd = {};
  public pp: any;
  public labels: any;
  public languageid: any;
  search: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {

        this.hospitallist = data;
        this.hospdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
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
  public GetHospitalID(item2: any) {

    this.hospitalid = item2.id;
  }
  public insertdetails() {

    this.password = Math.random().toString(36).slice(-8);

    if (this.hospitalid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Hospital/Clinic");
      }
      else {
        Swal.fire("Selectionner un hôpital / clinique");
      }

    }
    else if (this.password != undefined) {

      // var valpassword = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.pp = 1;

      // }
      // else {
      var entity = {
        'Hospital_ClinicID': this.hospitalid,
        'UserName': this.username,
        'Password': this.password
      }
      // this.username = '';
      // this.password = '';
      this.docservice.InsertHospitalClinicAdminRegistration(entity).subscribe(data => {

        if (data != 0) {

          if (this.languageid == 1) {
            this.gethospitalclinicfordash()
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            location.href = "#/Hspdash"
            this.pp = 0;
          }
          else {
            this.gethospitalclinicfordash()
            Swal.fire('', 'Mis à jour avec succés', 'success');
            location.href = "#/Hspdash"
            this.pp = 0;
          }
        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Error', 'Hospital Login Already Exists', 'success');
            location.href = "#/Hspdash"
          }
          else {
            Swal.fire('Erreur', "La connexion à l'hôpital existe déjà", 'success');
            location.href = "#/Hspdash"
          }

        }
      })
      // }
    }
  }


  public hsopitalloginlist: any;


  public gethospitalclinicfordash() {
    this.docservice.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
      data => {

        this.hsopitalloginlist = data;
        var list = this.hsopitalloginlist.filter(x => x.hospital_ClinicID == this.hospitalid)
        this.pinno = list[0].pinno,
          this.email = list[0].emailID,
          this.hospitalname = list[0].hospital_ClinicName
        this.sendmail();
      }, error => {
      }
    )
  }


  pinno: any;
  emailattchementurl = [];
  public email: any;
  public hospitalname: any;


  public sendmail() {

    if (this.languageid == 1) {
      var sub = "Welcome to Voiladoc"
      var body = 'Dear ' + this.hospitalname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Here are your login details. ' + "<br><br>" + 'Voiladoc pro web link : https://maroc.voiladoc.org/' + "<br>" + 'Pin code  : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Please do not share your login credentials with anyone. Contact our helpline on +212522446145 or email us at support@voiladoc.ma' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team' + "<br>" + 'www.voiladoc.ma'
    }
    else {
      var sub = "Bienvenue sur Voialdoc "
      var body = 'Cher ' + this.hospitalname + ',' + "<br><br>" + 'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion. ' + "<br><br>" + 'Lien web Voiladoc pro : https://maroc.voiladoc.org/' + "<br>" + 'Code PIN  : ' + this.pinno + "<br>" + "Nom d'utilisateur :" + this.username + "<br>" + 'Mot de passe : ' + this.password + "<br><br>" + "Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d'assistance au +212522446145 ou envoyez-nous un e-mail à support@voiladoc.ma" + "<br><br>" + 'Meilleures salutations,' + "<br>" + 'Team Voiladoc' + "<br>" + 'www.voiladoc.com'
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
