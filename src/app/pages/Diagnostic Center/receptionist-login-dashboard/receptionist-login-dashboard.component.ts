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
    debugger
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
  debugger
  this.docservice.GetDiagnosticReceptionistLogin(localStorage.getItem('diagnosticid')).subscribe(data => {
    debugger
      this.receptionistloginlist = data;
      this.count=this.receptionistloginlist.length;
  })
}
public Delete(id) {
  debugger
  this.docservice.DeleteDiagnosticReceptionistLogin(id).subscribe(data => {
    debugger
      if (data != undefined) {
          this.GetReceptionistlogin();
          Swal.fire("Deleted Successfully");
      }
  })
}

}
