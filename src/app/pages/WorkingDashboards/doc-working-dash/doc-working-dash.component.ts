import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-doc-working-dash',
  templateUrl: './doc-working-dash.component.html',
  styleUrls: ['./doc-working-dash.component.css']
})
export class DocWorkingDashComponent implements OnInit {
  workingdetailscopy: any;

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public languageid: any;
  public labels: any;
  public workingdetails: any;
  public hospitalid: any;
  public dummworkingdetails: any;
  public term: any;
  public daysname: any;
  public dayslist: any;
  public dummlist: any;
  public doctorlist: any;
  public doctorname: any;
  ngOnInit() {
    this.daysname = '';
    this.doctorname = '';
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.getlanguage();
    this.GetDoctorHospitalDetails();
    this.GetDaysMaster()


    if (this.hospitalid == undefined) {
      this.getdoctorforadmin();
    }
    if (this.hospitalid != undefined) {
      this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.dummlist = data;
          this.doctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalid)

        }, error => {
        }
      )
    }
  }

  public getdoctorforadmin() {
    debugger
    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.doctorlist = data;
        this.dummlist = this.doctorlist

      }, error => {
      }
    )
  }






  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.dayslist = data;
      }, error => {
      }
    )
  }
  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetDoctorHospitalDetails() {
    if (this.hospitalid == undefined) {
      this.docservice.GetDoctorWorkingDetails(this.languageid).subscribe(
        data => {
          debugger;
          this.workingdetails = data;


        }, error => {
        }
      )
    }
    else if (this.hospitalid != undefined) {
      this.docservice.GetDoctorWorkingDetails(this.languageid).subscribe(
        data => {
          debugger;
          this.dummworkingdetails = data;
          this.workingdetails = this.dummworkingdetails.filter(x => x.hospitalClinicID == this.hospitalid)
          this.workingdetailscopy = this.workingdetails;
        }, error => {
        }
      )
    }

  }
  dummwork: any;


}
