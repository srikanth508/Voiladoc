import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-link-forreg',
  templateUrl: './link-forreg.component.html',
  styleUrls: ['./link-forreg.component.css']
})
export class LinkForregComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public typename: any;
  public address: any;
  public notes: any;
  public email: any;
  public username: any;
  public password: any;
  languageid: any;
  countrymanagerid: any;
  ngOnInit() {
    this.address = "https://voiladoc.org/registration/#/Login";
    if (this.languageid == 1) {
      this.notes = "Please Click Above Link And Fill The Details";
    }
    else {
      this.notes = "Veuillez cliquer sur le lien ci-dessus et commencer votre processus d'inscription.";
    }


    this.languageid = localStorage.getItem("LanguageID");
    this.countrymanagerid = localStorage.getItem("Commacountryid");
    this.getlanguage();
  }
  public GetTypeName(even) {
    this.typename = even.target.value;
  }

  public sendmails() {
    if (this.languageid == 1) {
      var entity = {
        'emailto': this.email,
        'emailsubject': 'Voiladoc Registrations',
        'emailbody': 'Dear ' + this.username + ',' + "<br><br>" + "Thank you for your interest in the Voiladoc. Please click on the link below to begin your registration process. <br><br>" + "Link : " + this.address + "<br><br>" + 'Username :' + this.username + "<br>" + 'Password :' + this.password + "<br><br>" + "For your security, don’t share your passwords with Anyone. For any help, please contact your Voiladoc advisor or do reply to this mail. " + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team'
      }
      this.docservice.sendemailsForLinkRegistrations(entity).subscribe(data => {

      })
    }
    else {
      var entity = {
        'emailto': this.email,
        'emailsubject': 'Inscriptions Voiladoc',
        'emailbody': 'Chère / Cher  ' + this.username + ',' + "<br><br>" + "Merci de votre interêt pour Voiladoc. Veuillez cliquer sur le lien ci-dessous pour vous connecter à la page d’enregistrement. <br><br>" + "Lien : " + this.address + "<br><br>" + 'Nom d’utilisateur :' + this.username + "<br>" + 'Mot de passe  :' + this.password + "<br><br>" + "Pour votre sécurité, ne divulguez pas votre mot de passe. Si vous avez besoin d’aide veuillez contacter votre conseiller Voiladoc ou répondre à ce courriel." + "<br><br>" + 'Amicalement,' + "<br>" + 'L’équipe de Voiladoc'
      }
      this.docservice.sendemailsForLinkRegistrations(entity).subscribe(data => {

      })

    }

  }
  public pp: any;

  public Insertdetails() {
    if (this.typename == "" || this.typename == undefined) {

      Swal.fire("Please Select Type")
    }
    else if (this.password != undefined) {
      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
      }

      else {
        this.spinner.show();
        var entity = {
          'TypeID': this.typename,
          'EmailID': this.email,
          'AddressLink': this.address,
          'Notes': this.notes,
          'UserName': this.username,
          'Password': this.password,
          'CountryManagerID': this.countrymanagerid
        }
        this.docservice.InsertLinkForRegistrations(entity).subscribe(data => {
          if (data != 0) {

            this.sendmails();
            this.spinner.hide();
            location.href = "#/Linkforregdash"

            if (this.languageid == 1) {
              Swal.fire('Mail Sent Successfully');
            }
            else {
              Swal.fire('Email envoyé');
            }
          }
          else {

            this.spinner.hide();
            Swal.fire('Username Already Exists. Please Give different Username');
          }
        })
      }
    }
  }
  labels: any;

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }


}
