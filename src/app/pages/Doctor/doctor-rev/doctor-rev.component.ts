import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-doctor-rev',
  templateUrl: './doctor-rev.component.html',
  styleUrls: ['./doctor-rev.component.css']
})
export class DoctorRevComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public hospitalid: any;
  public doctorlist: any;
  public departmentlist: any;
  public departmentid: any;
  public term1: any;

  public term: any;

  public languageid: any;
  public labels: any;
  public doctorID: any;
  public id: any;
  public appointmentlist: any;
  startdate: any;
  enddate: any;
  appointmentdummlist: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalClinicID');
    this.doctorID = localStorage.getItem('userid');
    this.startdate = localStorage.getItem('SDATE');
    this.enddate = localStorage.getItem('EDATE');
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.id = params['id'];

      if (this.id == 2) {
        this.docservice.GetBookAppointmentByDoctorID(this.doctorID, this.startdate, this.enddate, this.languageid).subscribe(
          data => {
            debugger

            this.appointmentdummlist = data;
            this.appointmentlist = this.appointmentdummlist.filter(x => x.appointmentTypeID == 2 && x.isVisited == 1)
            this.GrandTotal = 0
            for (let i = 0; i < this.appointmentlist.length; i++) {
              debugger
              this.GrandTotal = this.GrandTotal + this.appointmentlist[i].paidAmount;
            }
          })
      }
      if (this.id == 1) {
        this.docservice.GetBookAppointmentByDoctorID(this.doctorID, this.startdate, this.enddate, this.languageid).subscribe(
          data => {
            debugger
            this.appointmentdummlist = data;
            this.appointmentlist = this.appointmentdummlist.filter(x => x.appointmentTypeID == 1 && x.isVisited == 1)
            this.GrandTotal = 0
            for (let i = 0; i < this.appointmentlist.length; i++) {
              debugger
              this.GrandTotal = this.GrandTotal + this.appointmentlist[i].paidAmount;
            }
          })
      }
    }
    )

    debugger;

    // this.gethospitaldoctorsforadmin();
    this.getdepartmentmaster();
    this.getlanguage();
  }






  public GetDepartmentID(even) {
    debugger
    this.term = even.target.value;

  }

  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  GrandTotal: any;


  // public gethospitaldoctorsforadmin() {
  //   debugger
  //   this.docservice.GetBookAppointmentByHospital_ClinicID(this.hospitalid, '2020-01-01', '2020-12-31', this.languageid).subscribe(
  //     data => {
  //       debugger
  //       this.doctorlist = data.filter(x => x.doctorID == this.doctorID);
  //       this.GrandTotal = 0;
  //       for (let i = 0; i < this.doctorlist.length; i++) {
  //         this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
  //       }
  //     }, error => {
  //     }
  //   )
  // }
  public deletedoctorhosiptaldetails() {
    debugger
    this.docservice.DeleteDoctorHospitalDetails(this.hospitalid).subscribe(
      data => {
        Swal.fire("Deleted Succesfully");
        // this.gethospitaldoctorsforadmin();
      }, error => {
      }
    )
  }
  public getdepartmentmaster() {
    debugger
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.departmentlist = data;
      }, error => {
      }
    )
  }

}
