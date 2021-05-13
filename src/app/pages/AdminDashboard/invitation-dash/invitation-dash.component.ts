import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-invitation-dash',
  templateUrl: './invitation-dash.component.html',
  styleUrls: ['./invitation-dash.component.css']
})
export class InvitationDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  languageid: any;
  invitationslist: any;
  term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getpatientinvitations()
  }


  public getpatientinvitations() {
    this.docservice.GetPatient_Invites_Master(this.languageid).subscribe(
      data => {

        this.invitationslist = data;

      },
      error => { }
    );
  }

}
