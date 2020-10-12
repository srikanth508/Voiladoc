import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-medical-patient-history',
  templateUrl: './medical-patient-history.component.html',
  styleUrls: ['./medical-patient-history.component.css']
})
export class MedicalPatientHistoryComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public doctorid: any;
  public appointmentlist:any;
  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
    this.getbookappointmentbydoctorid();
  }
  public getbookappointmentbydoctorid() {
   
    this.docservice.GetBookAppointmentByDistinictDoctorID(this.doctorid).subscribe(
      data => {
       
        this.appointmentlist = data;
       
      }, error => {
      }
    )
  }
}
