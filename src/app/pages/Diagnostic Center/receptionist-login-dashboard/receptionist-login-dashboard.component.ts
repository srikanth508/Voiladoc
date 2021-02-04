import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receptionist-login-dashboard',
  templateUrl: './receptionist-login-dashboard.component.html',
  styleUrls: ['./receptionist-login-dashboard.component.css']
})
export class ReceptionistLoginDashboardComponent implements OnInit {
  languageid: any;
  labels: any;
  receptionistloginlist: any;
  term: any;
  count: any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {
    
    this.languageid = localStorage.getItem('LanguageID');
    this.GetLables();
    this.GetReceptionistlogin();
  }

  public GetLables() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
        data => {

            this.labels = data;
        },
        error => { }
    );
}

public GetReceptionistlogin() {
  
  this.docservice.GetDiagnosticReceptionistLogin(localStorage.getItem('diagnosticid')).subscribe(data => {
    
      this.receptionistloginlist = data;
      this.count=this.receptionistloginlist.length;
  })
}
// public Delete(id) {
//   
//   this.docservice.DeleteDiagnosticReceptionistLogin(id).subscribe(data => {
//     
//       if (data != undefined) {
//           this.GetReceptionistlogin();
//           Swal.fire("Deleted Successfully");
//       }
//   })
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
        this.docservice.DeleteDiagnosticReceptionistLogin(id).subscribe(res => {
          let test = res;
          this.GetReceptionistlogin();
        })
        Swal.fire(
          'Deleted!',
          'Deleted Successfully".',
          'success'
        )
      }
      else {
        this.GetReceptionistlogin();
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
        this.docservice.DeleteDiagnosticReceptionistLogin(id).subscribe(res => {
          let test = res;
          this.GetReceptionistlogin();
        })
        Swal.fire(
          'Supprimé!',
          'Supprimé avec Succès ',
          'success'
        )
      }
      else {
        this.GetReceptionistlogin();
      }
    })
  }

}
}
