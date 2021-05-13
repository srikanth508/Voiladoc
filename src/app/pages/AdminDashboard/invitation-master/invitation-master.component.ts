import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-invitation-master',
  templateUrl: './invitation-master.component.html',
  styleUrls: ['./invitation-master.component.css']
})
export class InvitationMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  languageid: any;
  labels: any;
  invitationslist: any;
  noofinstalations: any;
  amount: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
  }



  public insertdetails() {
    var entity = {
      'NoOfInstalations': this.noofinstalations,
      'Amount': this.amount
    }
    this.docservice.InsertPatient_Invites_Master(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Saved Successfully');
        location.href="#/InvitationDash"
      }
    })
  }
}
