import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-revenue',
  templateUrl: './my-revenue.component.html',
  styleUrls: ['./my-revenue.component.css']
})
export class MyRevenueComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }


  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  public languageid: any;
  public inclinicount: any;
  public doctorid: any;
  public inclicncommssion: any;
  public vediocountcommision: any;
  public videocommission: any;
  hospitalid: any
  doctorID: any
  public labels: any;
  public id:any;
  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.hospitalid = localStorage.getItem('hospitalClinicID');
    this.doctorID = localStorage.getItem('userid');
    this.todaydate = formatDate(myDate, format, locale);
    this.doctorid = localStorage.getItem('userid');
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.languageid = localStorage.getItem('LanguageID');
    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 0);
   

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
   
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
   



    this.activatedroute.params.subscribe(params => {
     
      this.id = params['id'];

    }
    )

    localStorage.setItem('SDATE',this.startdate)
    localStorage.setItem('EDATE',this.enddate)

    this.getlanguage()
    this.GetInclinicCommissionCount();
    this.GetVideoCommssionfee();
    this.GetVediocommission()
    this.GetVideoAllCommsiionRevenue()
    this.gethospitaldoctorsforadmin();
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      },
      error => { }
    );
  }

  public GetInclinicCommissionCount() {
    this.docservice.GetDoctorCommissionFeesByAdminRevenueByInclinRevenueByDocID(this.startdate, this.enddate, this.doctorid).subscribe(
      data => {
       
        this.inclinicount = data;
      }, error => {
      }
    )
  }



  public GetVideoCommssionfee() {
    this.docservice.GetPatientPaymentDetailsDoctorsCommissionByDoctorID(this.startdate, this.enddate, this.doctorid).subscribe(
      data => {
       
        this.inclicncommssion = data;
      }, error => {
      }
    )
  }


  public GetVideoAllCommsiionRevenue() {
    this.docservice.GetDoctorCommissionFeesByAdminRevenueByVedoevenueByDocID(this.startdate, this.enddate, this.doctorid).subscribe(
      data => {
       
        this.vediocountcommision = data;
      }, error => {
      }
    )
  }
  GrandTotal: any;
  doctorlist: any;
  public gethospitaldoctorsforadmin() {
   
    this.docservice.GetBookAppointmentByHospital_ClinicID(this.hospitalid, '2020-01-01', '2020-12-31', this.languageid).subscribe(
      data => {
       
        this.doctorlist = data.filter(x => x.doctorID == this.doctorID);
        this.GrandTotal = 0;
        for (let i = 0; i < this.doctorlist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
        }
      }, error => {
      }
    )
  }


  public GetVediocommission() {
    this.docservice.GetPatientPaymentDetailsDoctorsCommissionByDoctorIDVedioappts(this.startdate, this.enddate, this.doctorid).subscribe(
      data => {
       
        this.videocommission = data;
      }, error => {
      }
    )
  }


  selectedDate(data) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    this.GetInclinicCommissionCount();
    this.GetVideoCommssionfee();
    this.GetVideoAllCommsiionRevenue();
    this.GetVediocommission();

    localStorage.setItem('SDATE',this.startdate)
    localStorage.setItem('EDATE',this.enddate)
    this.docservice.GetBookAppointmentByHospital_ClinicID(this.hospitalid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        this.doctorlist = data.filter(x => x.doctorID == this.doctorID);
        this.GrandTotal = 0;
        for (let i = 0; i < this.doctorlist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.doctorlist[i].paidAmount;
        }
      }, error => {
      }
    )
  }
}
