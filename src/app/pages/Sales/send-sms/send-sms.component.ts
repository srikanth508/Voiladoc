import { Component, OnInit } from '@angular/core'
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  languageid: any;
  user: any;
  labels: any;
  Patientlist: any;
  count: any;
  dummpatientPatientlist: any;
  search: any;
  sendemailpatients = [];
  message: any;

  ngOnInit() {
    this.languageid = localStorage.getItem("LanguageID");
    this.user = localStorage.getItem('user');
    this.getlanguage()
    this.GetPatientlist()
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
    this.docservice.GetPatientRegistrationForSendEmails(this.languageid).subscribe(
      data => {

        this.Patientlist = data;
        this.count = this.Patientlist.length
        this.dummpatientPatientlist = data;
      },
      error => { }
    );
  }




  public GetPatientSelectAll(even) {

    var chkboxes = document.getElementsByClassName('chk_sendmailcheck')
    if (even.target.checked == true) {

      this.sendemailpatients = this.Patientlist;
      this.Patientlist.checked = true;
      console.log('sendsms',this.sendemailpatients)
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



  public GetPatientSendemailslist(even, list) {
    
    if (even.target.checked == true) {
      this.sendemailpatients.push(list)
    }
    else if (even.target.checked == false) {
      
      this.sendemailpatients.splice(this.sendemailpatients.indexOf(list), 1)
    }

  }



  public sendsms() {
    for (let i = 0; i < this.sendemailpatients.length; i++) {
      this.spinner.show();
      // let Entity = {
      //   'Contacts': this.sendemailpatients[i].smsmobileno,
      //   'TextMessage': this.message
      // }
      this.docservice.SendTwillioSMS(this.sendemailpatients[i].smsmobileno,this.message).subscribe(data => {
        
        var entity = {
          'PatientID': this.sendemailpatients[i].id,
          'Message': this.message,
          'Sendername': this.user
        }
        this.docservice.insertPatient_Sms(entity).subscribe(data => {
          this.spinner.hide();
          // location.href="#/SmsDash"
        })
      })
    }
  }
}
