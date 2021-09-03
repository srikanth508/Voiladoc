import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-patient-invites-dash',
  templateUrl: './patient-invites-dash.component.html',
  styleUrls: ['./patient-invites-dash.component.css']
})
export class PatientInvitesDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  languageid: any;
  labels: any;
  term: any;
  invitationslist: any;
  count: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');

    this.getlanguage();
    this.getpatientinvitations()
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;

      },
      error => { }
    );
  }

  message: any;

  public getpatientinvitations() {
    this.docservice.GetPatient_Referal_InvitationsWeb(this.languageid).subscribe(
      data => {

        this.invitationslist = data;
        this.count = this.invitationslist.length;

      },
      error => { }
    );
  }

  smsmobileno: any;

  public GetSmsmobileno(smsmobileno) {
    this.smsmobileno = smsmobileno;
  }


  public SendTwiliSms() {
    debugger
    this.docservice.SendTwillioSMS(this.smsmobileno, this.message).subscribe(data => {
      if(this.languageid==1)
      {
        Swal.fire("SMS sent Successfully");
      }
      else
      {
        Swal.fire("SMS envoyé");
      }
      

    })
  }


}
