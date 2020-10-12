import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-revenue-details',
  templateUrl: './revenue-details.component.html',
  styleUrls: ['./revenue-details.component.css']
})
export class RevenueDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public id: any;
  public sdate: any;
  public edate: any;
  public languageid: any;
  public labels: any;
  public hospitalid: any;
  public cancelledlist: any;
  public dummlist: any;
  public count: any;
  public term: any;
  public departmentlist:any;

  ngOnInit() {
    this.sdate = localStorage.getItem('StartDate');
    this.edate = localStorage.getItem('EndDate');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.activatedroute.params.subscribe(params => {
     
      this.id = params['id']
    }
    )

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getdepartmentmaster();

    if (this.id == '1') {
     
      this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.sdate, this.edate).subscribe(
        data => {
         
          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(x => x.appointmentTypeID == 1)
          this.count = this.cancelledlist.length; 
        }, error => {
        }
      )
    }
    else if (this.id == '2') {
     
      this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.sdate, this.edate).subscribe(
        data => {
         
          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(x => x.appointmentTypeID == 1)
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    else if (this.id == '3') {
     
      this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.sdate, this.edate).subscribe(
        data => {
         
          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(x => x.appointmentTypeID == 2)
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    else if (this.id == '4') {
     
      this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.sdate, this.edate).subscribe(
        data => {
         
          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(x => x.appointmentTypeID == 2)
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
  }

  public getdepartmentmaster() {
   
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.departmentlist = data;
      }, error => {
      }
    )
  }



  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

}
