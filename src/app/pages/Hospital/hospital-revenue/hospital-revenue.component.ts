import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-hospital-revenue',
  templateUrl: './hospital-revenue.component.html',
  styleUrls: ['./hospital-revenue.component.css']
})
export class HospitalRevenueComponent implements OnInit {
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
  public detailslist: any;
  detailslist1: any
  homecarerevenuecount: any
  TotalAmount: any
  labels: any
  totalreveue: any;
  public totalappointments: any;
  public hospitaltype:any;
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

    this.hospitaltype=localStorage.getItem('hospitaltype');

    localStorage.setItem('StartDate', this.startdate)
    localStorage.setItem('EndDate', this.enddate);
    this.NurseAppointmentsCount = 0;
    this.physioAppointmentsCount = 0;
    this.NurseRevenueCount = 0;
    this.PhysioRevenue = 0;

    this.GetHospitalRevenue();
    this.homecarerevenue();
    this.homecareAppointments()


    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
    this.docservice.GetHomecareRevenueByHospitalID(this.hospitalid, this.startdate, this.enddate).subscribe(
      data => {
        this.homecarerevenuecount = data.length;
        this.dummdetilslist = data;
        this.detailslist1 = this.dummdetilslist.filter(x => x.isVisited == 1)
      
        let total1 = 0;
        this.detailslist1.forEach(element => {
          total1 += element.paidAmount;
        });
        this.TotalAmount = total1
      }, error => {
      }
    )
  }
  public dummdetilslist: any;

  homecarerev
  public homecarerevenue() {
    this.docservice.GetNurse_PatientPaymentDetails(this.hospitalid).subscribe(
      data => {

        this.NurseRevenueCount = data[0].nurseRevenue;

      }, error => {
      }
    )
    this.docservice.GetPhysiotherapist_PatientPaymentDetails(this.hospitalid).subscribe(
      data => {

        this.PhysioRevenue = data[0].physioRevenue;
      }, error => {
      }
    )
    this.homecarerev = this.NurseRevenueCount + this.PhysioRevenue;
  }


  homecareappointment
  public homecareAppointments() {
    this.docservice.GetNurse_AppointmentCounts(this.hospitalid).subscribe(
      data => {

        this.NurseAppointmentsCount = data[0].nurseApptCount;
      }, error => {
      }
    )
    this.docservice.GetPhysio_AppointmentCounts(this.hospitalid).subscribe(
      data => {

        this.physioAppointmentsCount = data[0].apptCount;

      }, error => {
      }
    )
    this.homecareappointment = this.NurseAppointmentsCount + this.physioAppointmentsCount;
  }

  public GetHospitalRevenue() {
    this.docservice.GetHospitalRevenueandCounts(this.hospitalid, this.startdate, this.enddate).subscribe(
      data => {

        this.detailslist = data;
        this.totalreveue = Number(this.detailslist[0].inclinicRevenue) + Number(this.detailslist[0].vedioconferenceRevenue) + Number(this.detailslist[0].homeVisitRevenue) + Number(this.detailslist[0].nurseRevenue) + Number(this.detailslist[0].midwifehospitalrevenue) + Number(this.detailslist[0].physiohospitlrevenue),
          this.totalappointments = Number(this.detailslist[0].clicniccount) + Number(this.detailslist[0].vedocallappointmentcount) + Number(this.detailslist[0].homeVisitAppointments)

      }, error => {
      }
    )
  }
  data: any
  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0];
    // this.enddate = sdate[1];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    this.docservice.GetHomecareRevenueByHospitalID(this.hospitalid, this.startdate, this.enddate).subscribe(
      data => {
        this.homecarerevenuecount = data.length;
        this.dummdetilslist = data;
        this.detailslist1 = this.dummdetilslist.filter(x => x.isVisited == 1)

        let total1 = 0;
        this.detailslist1.forEach(element => {
          total1 += element.paidAmount;
        });
        this.TotalAmount = total1

      }, error => {
      }
    )
    this.GetHospitalRevenue()
    localStorage.setItem('StartDate', this.startdate)
    localStorage.setItem('EndDate', this.enddate)
  }

  NurseRevenueCount
  public GetNurse_PatientPaymentDetails() {

    this.docservice.GetNurse_PatientPaymentDetails(this.hospitalid).subscribe(
      data => {

        this.NurseRevenueCount = data[0].nurseRevenue;
      }, error => {
      }
    )
  }

  NurseAppointmentsCount
  public GetNurse_AppointmentCounts() {
    this.docservice.GetNurse_AppointmentCounts(this.hospitalid).subscribe(
      data => {

        this.NurseAppointmentsCount = data[0].nurseApptCount;

      }, error => {
      }
    )
  }

  physioAppointmentsCount
  public GetPhysio_AppointmentCounts() {
    this.docservice.GetPhysio_AppointmentCounts(this.hospitalid).subscribe(
      data => {

        this.physioAppointmentsCount = data[0].apptCount;

      }, error => {
      }
    )
  }

  PhysioRevenue
  public GetPhysiotherapist_PatientPaymentDetails() {
    this.docservice.GetPhysiotherapist_PatientPaymentDetails(this.hospitalid).subscribe(
      data => {

        this.PhysioRevenue = data[0].physioRevenue;

      }, error => {
      }
    )
  }

}
