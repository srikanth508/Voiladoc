import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-my-team-dashboard',
  templateUrl: './my-team-dashboard.component.html',
  styleUrls: ['./my-team-dashboard.component.css']
})
export class MyTeamDashboardComponent implements OnInit {

  languageid: any;
  labels: any;
  myteamlist: any;
  term: any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.GetLables();
    this.GetMyTeam();
  }

  public GetLables() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
        data => {

            this.labels = data;
        },
        error => { }
    );
}

public GetMyTeam() {
    this.docservice.GetMyTeam(localStorage.getItem('diagnosticid')).subscribe(data => {
        this.myteamlist = data;
    })
}
public Delete(id) {
    this.docservice.DeleteMyTeam(id).subscribe(data => {
        if (data != undefined) {
            this.GetMyTeam();
            Swal.fire("Deleted Successfully");
        }
    })
}
}
