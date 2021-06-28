import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-ind-doc-payments',
  templateUrl: './ind-doc-payments.component.html',
  styleUrls: ['./ind-doc-payments.component.css']
})
export class IndDocPaymentsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }


  public hospitalid: any;
  public doctorlist: any;
  public departmentlist: any;
  public departmentid: any;
  public term1: any;

  public term: any;

  public languageid: any;
  public labels: any;
  public startdate: any;
  public enddate: any;

  SDate = new Date();
  EDate = new Date();
  value: any;
  public todaydate: any;
  public doctorname: any;
  public dummlist: any;
  public DropDowndoctorlist: any;
  public count: any;
  public appointmenttype: any;
  public doctorid: any;
  ngOnInit() {


    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    var kkk = this.SDate.setDate(this.SDate.getDate() - 365);
    var lll = this.EDate.setDate(this.EDate.getDate() + 365);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);


    this.doctorid = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.gethospitaldoctorsforadmin();
    this.getdepartmentmaster();
    this.getlanguage();

    // this.GetHospitalDoctors()
  }



  // public GetDepartmentID(even) {

  //   if (even.target.value != 0) {


  //     this.term = even.target.value;
  //     this.doctorlist = this.dummlist.filter(x => x.departmentname == this.term)
  //     this.count = this.doctorlist.length;

  //     this.GrandTotal = 0;
  //     for (let i = 0; i < this.doctorlist.length; i++) {
  //       this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
  //     }
  //   }
  //   else if (even.target.value == 0) {
  //     this.gethospitaldoctorsforadmin()
  //   }
  // }

  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  GrandTotal: any;
  dummlist1:any;
  public gethospitaldoctorsforadmin() {

    this.docservice.GetBookAppointmentByHospital_ClinicID(this.hospitalid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.dummlist = data;
        
        this.doctorlist = this.dummlist.filter(x => x.doctorID == this.doctorid)
        this.dummlist1=  this.dummlist.filter(x => x.doctorID == this.doctorid)
        this.count = this.doctorlist.length;
        this.GrandTotal = 0;
        for (let i = 0; i < this.doctorlist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
        }
      }, error => {
      }
    )
  }
  public deletedoctorhosiptaldetails() {

    this.docservice.DeleteDoctorHospitalDetails(this.hospitalid).subscribe(
      data => {
        Swal.fire("Deleted Succesfully");
        this.gethospitaldoctorsforadmin();
      }, error => {
      }
    )
  }
  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }




  selectedDate(data) {

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.gethospitaldoctorsforadmin()
  }


  // public GetHospitalDoctors() {

  //   this.docservice.GetHospitalDoctorsForAdmin(this.hospitalid, this.languageid).subscribe(
  //     data => {

  //       this.DropDowndoctorlist = data;
  //     }, error => {
  //     }
  //   )
  // }


  // public GetDoctorName(even) {
  //   if (even.target.value != 0) {

  //     this.doctorname = even.target.value;
  //     this.doctorlist = this.dummlist.filter(x => x.doctorName == this.doctorname)
  //     this.count = this.doctorlist.length;
  //     this.GrandTotal = 0;
  //     for (let i = 0; i < this.doctorlist.length; i++) {
  //       this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
  //     }
  //   }
  //   else if (even.target.value == 0) {
  //     this.gethospitaldoctorsforadmin()
  //   }
  // }



  public SelectAppointmentType(even) {
    if (even.target.value != 0) {
      this.appointmenttype = even.target.value;
      this.doctorlist = this.dummlist1.filter(x => x.appointmentTypeID == this.appointmenttype)
      this.count = this.doctorlist.length;
      this.GrandTotal = 0;
      for (let i = 0; i < this.doctorlist.length; i++) {
        this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
      }
    }
    else {
      this.gethospitaldoctorsforadmin()
    }

  }

}
