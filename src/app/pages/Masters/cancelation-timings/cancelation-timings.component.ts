import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cancelation-timings',
  templateUrl: './cancelation-timings.component.html',
  styleUrls: ['./cancelation-timings.component.css']
})
export class CancelationTimingsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public cancelationtimings: any;
  public term:any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetCancellationTimings(this.languageid).subscribe(
      data => {

        this.cancelationtimings = data;
      }, error => {
      }
    )
  }

  public patientinclinictimings: any;
  public patientvideocalltiminngs: any;
  public codcancelationtime: any;
  public doctorCancelledTime: any;
  public nurseCancelledTime: any;
  public physioCancelledTime: any;
  public midwifeCancelledTime: any;
  public homeCareCancelationTime: any;
  public id: any;



  public GetCancelTimings(list) {
    this.id = list.id,
      this.patientinclinictimings = list.patientInclinicCancelledTime;
    this.patientvideocalltiminngs = list.patientVideoCallTime
    this.codcancelationtime = list.patientHomeVisitCancelledCodTime
    this.doctorCancelledTime = list.doctorCancelledTime
    this.nurseCancelledTime = list.nurseCancelledTime
    this.physioCancelledTime = list.physioCancelledTime
    this.midwifeCancelledTime = list.midwifeCancelledTime
    this.homeCareCancelationTime = list.homeCareCancelationTime

  }


  public updatedetails() {
    
    var entity = {
      'ID': this.id,
      'PatientInclinicCancelledTime': this.patientinclinictimings,
      'PatientVideoCallTime': this.patientvideocalltiminngs,
      'PatientHomeVisitCancelledCodTime': this.codcancelationtime,
      'DoctorCancelledTime': this.doctorCancelledTime,
      'NurseCancelledTime': this.nurseCancelledTime,
      'PhysioCancelledTime': this.physioCancelledTime,
      'MidwifeCancelledTime': this.midwifeCancelledTime,
      'HomeCareCancelationTime': this.homeCareCancelationTime
    }
    this.docservice.UpdateCancellationTimings(entity).subscribe(data => {
      let res = data;
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.docservice.GetCancellationTimings(this.languageid).subscribe(
          data => {
    
            this.cancelationtimings = data;
          }, error => {
          }
        )
      }
      else
      if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
        this.docservice.GetCancellationTimings(this.languageid).subscribe(
          data => {
    
            this.cancelationtimings = data;
          }, error => {
          }
        )
      }
    })
  }
}
