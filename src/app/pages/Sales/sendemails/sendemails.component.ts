import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-sendemails',
  templateUrl: './sendemails.component.html',
  styleUrls: ['./sendemails.component.css']
})
export class SendemailsComponent implements OnInit {
  public Editor = ClassicEditor;
  cclist: any;
  bcclist: any;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  labels: any;
  languageid: any;
  Patientlist: any;
  search: any;
  sendemailpatients = [];
  dummpatientPatientlist: any;
  message: any;
  dropzonelable: any;

  public attchement = [];
  public attchementurl = [];
  public Subject: any;
  removetagsmessage: any;
  user: any;
  emailidd: any;
  count: any;
  frommail: any;
  typeid: any;

  ngOnInit() {
    this.languageid = localStorage.getItem("LanguageID");
    this.user = localStorage.getItem('user');
    this.getlanguage()
    this.GetPatientlist()
    this.typeid = 1

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

    this.frommail = "voiladocamaze@gmail.com"

  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
  }

  public GetPatientlist() {
    this.docservice.GetPatientRegistrationForSendEmailsWeb(this.languageid).subscribe(
      data => {
        this.dummpatientPatientlist = data;

        this.Patientlist = this.dummpatientPatientlist.filter(x => x.type == this.typeid)
        this.count = this.Patientlist.length

      },
      error => { }
    );
  }


  public GetPatientSendemailslist(even, list) {

    if (even.target.checked == true) {
      this.sendemailpatients.push(list);
      // list.selected=1;
    }
    else if (even.target.checked == false) {

      this.sendemailpatients.splice(this.sendemailpatients.indexOf(list), 1);
      // list.selected=0;
    }

  }

  public GetPatientSelectAll(even) {

    var chkboxes = document.getElementsByClassName('chk_sendmailcheck')
    if (even.target.checked == true) {

      this.sendemailpatients = this.Patientlist;
      console.log('sendsms',this.sendemailpatients)
      this.Patientlist.checked = true;

      for (let i = 0; i < chkboxes.length; i++) {
        document.getElementsByClassName('chk_sendmailcheck')[i]['checked'] = true;
      }

    }
    else if (even.target.checked == false) {

      this.sendemailpatients = []
      for (let i = 0; i < chkboxes.length; i++) {
        document.getElementsByClassName('chk_sendmailcheck')[i]['checked'] = false;
      }
    }
  }

  identityattachmentsurlssss = []
  showidentityproof = [];

  public onattachmentUpload(abcd) {

    this.identityattachmentsurlssss = []
    // for (let i = 0; i < abcd.length; i++) {
    this.attchement.push(abcd.addedFiles[0]);
    this.uploadid();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Fichier ajouté.');
      abcd.length = 0;
    }

  }


  public uploadid() {
    this.docservice.EmailAttachments(this.attchement).subscribe(res => {

      this.attchementurl.push(res);
      this.identityattachmentsurlssss.push(res);
      let a = this.identityattachmentsurlssss[0].slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
      this.showidentityproof.push(b)

      this.attchement.length = 0;
    })
    // this.sendattachment();
  }


  public SendEmail() {


    document.getElementById("qwerty").innerHTML = this.message;
    this.removetagsmessage = document.getElementById("qwerty").innerText;
    this.cclist = this.cclist.split(';');
    this.bcclist = this.bcclist.split(';');
    for (let i = 0; i < this.sendemailpatients.length; i++) {
      this.spinner.show();
      var entity = {
        'emailto': this.sendemailpatients[i].emailID,
        'emailsubject': this.Subject,
        'emailbody': this.message,
        'attachmenturl': this.attchementurl,
        'cclist': this.cclist,
        'bcclist': this.bcclist
      }
      this.docservice.sendemail(entity).subscribe(data => {

        var entity1 = {
          'PatientID': this.sendemailpatients[i].id,
          'Subject': this.Subject,
          'Message': this.message,
          'SenderID': '1',
          'senderName': this.user,
          'ReceiverName': this.sendemailpatients[i].patientName,
          'TypeID': this.typeid
        }
        this.docservice.InsertPatientEmails(entity1).subscribe(data => {

          this.emailidd = data;
          for (let j = 0; j < this.attchementurl.length; j++) {
            var entity2 = {
              'EmailID': this.emailidd,
              'AttachmentUrl': this.attchementurl[j]
            }
            this.docservice.InsertEmail_Attachments(entity2).subscribe(data => {
              if (this.languageid == 1) {
                this.spinner.hide();
                Swal.fire('Mail sent successfully');

                location.href = "#/EmailDash"
              }
              else {
                this.spinner.hide();
                Swal.fire('Email envoyé avec succès.');

                location.href = "#/EmailDash"
              }


              // this.sendemailpatients=[]
              // this.attchementurl=[]
              // this.Subject=""
              // this.removetagsmessage=""
              // this.message=""
              if ((this.sendemailpatients.length + 1) == i) {

                if (this.languageid == 1) {
                  // this.spinner.hide();
                  Swal.fire('Mail sent successfully');

                  location.href = "#/EmailDash"
                }
                else {
                  // this.spinner.hide();
                  Swal.fire('Email envoyé avec succès.');

                  location.href = "#/EmailDash"
                }

              }

            })
          }
        })
      })
      // this.spinner.hide();
      // Swal.fire('Success', 'Mail send successfully');
      if ((this.sendemailpatients.length) == i) {

        if (this.languageid == 1) {
          this.spinner.hide();
          Swal.fire('Mail sent successfully');

          location.href = "#/EmailDash"
        }
        else {
          this.spinner.hide();
          Swal.fire('Email envoyé avec succès.');

          location.href = "#/EmailDash"
        }



        // this.spinner.hide();

      }

    }

    // location.href="#/EmailDash"
    // Swal.fire('Success', 'Mail send successfully');
    // this.spinner.hide();
    // location.href="#/EmailDash"

    // this.sendemailpatients=[]
    // this.attchementurl=[]
    // this.Subject=""
    // this.removetagsmessage=""
    // this.message=""

  }



  showmails = [];
  patientemails: any;
  showpatientemails: any;
  ccemails: any;
  showccemails: any;
  showtoemails: any;
  showbccmails: any;
  showbccmailsss: any;



  public getpatientEmails() {
    this.showpatientemails = "";
    this.showmails = [];
    this.cclist = "";
    this.bcclist = "";

    this.showtoemails = this.sendemailpatients.map(x => x.emailID);
    this.showpatientemails = this.showtoemails.join(';');

    this.ccemails = this.cclistarray.map(x => x.emailID);
    this.cclist = this.ccemails.join(';');

    this.showbccmails = this.bcclistarray.map(x => x.emailID);
    this.bcclist = this.showbccmails.join(';');

  }



  bcclistarray = []
  cclistarray = []

  public GetPatientcclist(even, list) {

    if (even.target.checked == true) {
      this.cclistarray.push(list);
      // list.selected=1;

    }
    else if (even.target.checked == false) {

      this.cclistarray.splice(this.cclistarray.indexOf(list), 1);
      // list.selected=0;
    }
  }

  public GetPatientbcclist(even, list) {

    if (even.target.checked == true) {
      this.bcclistarray.push(list);
      // list.selected=1;

    }
    else if (even.target.checked == false) {

      this.bcclistarray.splice(this.bcclistarray.indexOf(list), 1);
      // list.selected=0;
    }
  }


  public SelectTypeID(even) {
    this.typeid = even.target.value;

    this.Patientlist = this.dummpatientPatientlist.filter(x => x.type == this.typeid)
    this.count = this.Patientlist.length

  }
}
