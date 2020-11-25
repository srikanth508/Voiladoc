import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.css']
})
export class HospitalDashboardComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  value: any;
  public todaydate: any;
  public languageid: any;
  public hospitalid: any;
  public appointmentlist: any;
  public dummlist: any;
  public count: any;
  public detailslist: any;
  public reportdoctorid: any;
  public doctorlist: any;
  public doctorname: any;
  public deptname: any;
  public departmentlist: any;
  public labels: any;


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
    this.gethospitaldoctorsforadmin();
    this.getdepartmentmaster();
    this.GetAllHomecareAppointments();
    this.getlanguage();
  }

  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }
  public getbookappointmentbyhospitalbyhospitalid() {

    this.docservice.GetDoctorsByHospitalClicniID(this.hospitalid, this.languageid, this.startdate, this.enddate).subscribe(
      data => {

        this.detailslist = data;
        this.dummlist = this.detailslist;
      }, error => {
      }
    )
  }

  public homecarecountslist: any;

  public GetAllHomecareAppointments() {

    this.docservice.GetAllHomecareAppointmentCounts(this.languageid, this.startdate, this.enddate, this.hospitalid).subscribe(
      data => {

        this.homecarecountslist = data;

      }, error => {
      }
    )
  }






  selectedDate(data) {
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.getbookappointmentbyhospitalbyhospitalid();
    this.GetAllHomecareAppointments();
  }

  public GetDoctorID(docid) {

    this.reportdoctorid = docid;
    localStorage.setItem('Reportdocid', this.reportdoctorid);
    localStorage.setItem('startdate', this.startdate)
    localStorage.setItem('enddate', this.enddate)
  }
  public gethospitaldoctorsforadmin() {

    this.docservice.GetHospitalDoctorsForAdmin(this.hospitalid, this.languageid).subscribe(
      data => {

        this.doctorlist = data;
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
  public GetDoctorName(even) {
    if (even.target.value != 0) {

      this.doctorname = even.target.value;
      this.detailslist = this.dummlist.filter(x => x.doctorName == this.doctorname)
    }
    else if (even.target.value == 0) {
      this.getbookappointmentbyhospitalbyhospitalid()
    }
  }


  public GetDepartmentName(even) {
    if (even.target.value != 0) {

      this.deptname = even.target.value;
      this.detailslist = this.dummlist.filter(x => x.departmentname == this.deptname)
    }
    else if (even.target.value == 0) {
      this.getbookappointmentbyhospitalbyhospitalid()
    }
  }
}
