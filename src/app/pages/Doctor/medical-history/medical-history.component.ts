import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public doctorid: any;
  public appointmentlist:any;
  public term:any;
  public languageid: any;
  public labels: any;
  count:any;
  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
    this.getbookappointmentbydoctorid();
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }
  public getbookappointmentbydoctorid() {
   
    this.docservice.GetBookAppointmentByDistinictDoctorID(this.doctorid).subscribe(
      data => {
       
        this.appointmentlist = data;
        this.count= this.appointmentlist.length;
       
      }, error => {
      }
    )
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    ) 
  }
}
