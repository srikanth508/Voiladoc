import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public hospitalid: any;
  public appointmentlist: any;
  public departmentlist: any;
  public term: any;
  public term1: any;
  p: number = 1;
  public languageid: any;
  public labels: any;


  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  value: any;
  public todaydate: any;
  public count: any;
  public doctorlist: any;
  public doctorname: any;
  public dummlist: any;
  roleid;
  termsss:any;
  ngOnInit() {
    this.roleid = localStorage.getItem('roleid');

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

    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 0);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.getbookappointmentbyhospitalbyhospitalid();
    this.getdepartmentmaster();
    this.gethospitaldoctorsforadmin();
    this.getlanguage();

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


  public gethospitaldoctorsforadmin() {
    debugger
    this.docservice.GetHospitalDoctorsForAdmin(this.hospitalid, this.languageid).subscribe(
      data => {
        debugger
        this.doctorlist = data;
      }, error => {
      }
    )
  }

  public GetDoctorName(even) {

    if (even.target.value != 0) {
      debugger
      this.doctorname = even.target.value;
      this.appointmentlist = this.dummlist.filter(x => x.doctorName == this.doctorname)
      this.count = this.appointmentlist.length;
    }
    else if (even.target.value == 0) {
      this.getbookappointmentbyhospitalbyhospitalid();
    }
  }


  public getbookappointmentbyhospitalbyhospitalid() {
    debugger
    this.docservice.GetBookAppointmentByHospital_ClinicID(this.hospitalid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        debugger
        this.appointmentlist = data;
        this.dummlist = this.appointmentlist;
        this.count = this.appointmentlist.length;
      }, error => {
      }
    )
  }

  selectedDate(data) {
    debugger
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.getbookappointmentbyhospitalbyhospitalid()
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
  public GetDepartmentName(even) {
    debugger
    if (even.target.value != 0) {
      debugger
      this.term = even.target.value;
      this.appointmentlist = this.dummlist.filter(x => x.departmentname == this.term)
      this.count = this.appointmentlist.length;
    }
    else if (even.target.value == 0) {
      this.getbookappointmentbyhospitalbyhospitalid()
    }
  }
  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }



  ReasonForCancel: any;
  public cancelappoinement(id,res) {
    debugger;
    if (res != null) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Cancel This Appointment!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Cancel it!'
      }).then((result) => {
        if (result.value) {

          let Entity = {
            'ID': id,
            'CancelReason': res
          }
          this.docservice.CancelBookAppointmentWeb(Entity).subscribe(res => {
            let test = res;
            this.getbookappointmentbyhospitalbyhospitalid();
          })
          Swal.fire(
            'Success!',
            'Appointment Has been Cancelled',
            'success'
          )
        }
        else {
          this.getbookappointmentbyhospitalbyhospitalid();
        }
      })
    }
    else {
      Swal.fire("Please Enter Reason For Cancel!!!")
    }

  }

}
