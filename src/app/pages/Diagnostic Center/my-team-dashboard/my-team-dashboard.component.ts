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
  public count:any;
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
        this.count= this.myteamlist.length
    })
}

// public Delete(id) {
//     this.docservice.DeleteMyTeam(id).subscribe(data => {
//         if (data != undefined) {
//             this.GetMyTeam();
//             Swal.fire("Deleted Successfully");
//         }
//     })
// }





public Delete(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteMyTeam(id).subscribe(res => {
            let test = res;
            this.GetMyTeam();
          })
          Swal.fire(
            'Deleted!',
            'Deleted Successfully".',
            'success'
          )
        }
        else {
            this.GetMyTeam();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteMyTeam(id).subscribe(res => {
            let test = res;
            this.GetMyTeam();
          })
          Swal.fire(
            'Supprimé!',
            'Supprimé avec succès ',
            'success'
          )
        }
        else {
            this.GetMyTeam();
        }
      })
    }

  }
}
