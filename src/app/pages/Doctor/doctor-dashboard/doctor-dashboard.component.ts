import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  public doctorid: any;
  public appointmentlist: any;
  public count: any;
  public appointmentvisitedlist: any;
  public appointmentcancelledlist: any;
  public appointmentcompletedlist: any;
  public appointmentnotvisitedlist: any;
  public visitedcount: any;
  public notvisitedcount: any;
  public completedcount: any;
  public cancelledcount: any;
  public finallist: any;
  public term: any;
  public languageid: any;
  public labels: any;
  public appointmentacceptlist: any;
  public accepetedlist: any;
  public accptcount: any;
  public pendinglist: any;
  public pendinglistt: any;
  public pendingcount: any;
  public cliniclist: any;
  public cliniclistttt: any;
  public cliniccount: any;
  public videoapplist: any;
  public videoapplistt: any;
  public videoappcount: any;
  public refereallist: any;
  public receivedreferlcount: any;
  public sentrefereralscount: any;
  public homecalls: any;
  public homecalllist: any;
  public homecallscount: any;
  public doccancelledlist: any;
  public doccancelledlisttss: any;
  public doccancelledcount: any;
  hospitalid;
  doctorID;

  labels3: any
  ngOnInit() {
   
    this.hospitalid = localStorage.getItem('hospitalClinicID');

    this.doctorID = localStorage.getItem('userid');
    this.options = {
      theme: "default",
      range: "tm",
      dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      presetNames: [
        "This Month",
        "Last Month",
        "This Week",
        "Last Week",
        "This Year",
        "Last Year",
        "Start",
        "End"
      ],
      dateFormat: "yyyy/MM/dd",
      outputFormat: "YYYY/MM/DD",
      startOfWeek: 1
    };
   
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? "PM" : "AM";
    // Find current hour in AM-PM Format
    hours = hours % 12;
    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    this.doctorid = localStorage.getItem("userid");
    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 0);

    const format = "yyyy-MM-dd";
    const myDate = new Date();
    const locale = "en-US";
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    localStorage.setItem("startdate", this.startdate);
    localStorage.setItem("enddate", this.enddate);
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
       
        this.labels3 = data;
      }, error => {
      }
    )
    this.getlanguage1();
    this.GetAppointmetbyDociD();
    this.GetDoctorRefereals();
    //this.GetInclinicCommissionCount();
    this.GetVideoAllCommsiionRevenue();
    this.getlanguage();
    this.gethospitaldoctorsforadmin()
  }
  public getlanguage() {
   
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )


  }
  labels1
  public getlanguage1() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels1 = data;
      },
      error => { }
    );
  }

  // inclinicount
  // public GetInclinicCommissionCount() {
  //   this.docservice.GetDoctorCommissionFeesByAdminRevenueByInclinRevenueByDocID(this.startdate, this.enddate, this.doctorid).subscribe(
  //     data => {
  //      
  //       this.inclinicount = data;
  //     }, error => {
  //     }
  //   )
  // }


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


  vediocountcommision
  public GetVideoAllCommsiionRevenue() {
    this.docservice.GetDoctorCommissionFeesByAdminRevenueByVedoevenueByDocID(this.startdate, this.enddate, this.doctorid).subscribe(
      data => {
       
        this.vediocountcommision = data;
      }, error => {
      }
    )
  }


  public GetAppointmetbyDociD() {
   
    this.docservice
      .GetBookAppointmentByDocID(this.startdate, this.enddate, this.doctorid, this.languageid)
      .subscribe(
        data => {
         
          this.appointmentlist = data;
          this.finallist = data;
          this.count = this.appointmentlist.length;
          this.appointmentvisitedlist = this.finallist;
          this.appointmentvisitedlist = this.appointmentvisitedlist.filter(x => x.isVisited == 1);
          this.visitedcount = this.appointmentvisitedlist.length;
          this.appointmentcancelledlist = this.finallist;
          this.appointmentcancelledlist = this.appointmentcancelledlist.filter(x => x.cancelled == 1);
          this.cancelledcount = this.appointmentcancelledlist.length;
          this.appointmentnotvisitedlist = this.finallist;
          this.appointmentnotvisitedlist = this.appointmentnotvisitedlist.filter(x => x.noShow == 1);
          this.notvisitedcount = this.appointmentnotvisitedlist.length;
          this.appointmentacceptlist = this.finallist;
          this.accepetedlist = this.appointmentacceptlist.filter(x => x.accepted == 1 && x.isVisited == 0 && x.docCancelled == 0 && x.cancelled == 0 && x.noShow == 0)
          this.accptcount = this.accepetedlist.length;
          this.pendinglist = this.finallist;
          this.pendinglistt = this.pendinglist.filter(x => x.isVisited == 0 && x.accepted == 0 && x.cancelled == 0 && x.docCancelled == 0 && x.noShow == 0)
          this.pendingcount = this.pendinglistt.length;
         
          this.cliniclist = this.finallist;
         
          this.cliniclistttt = this.cliniclist.filter(x => x.appointmentTypeID == 1)
          this.cliniccount = this.cliniclistttt.length;
          this.videoapplist = this.finallist;
         
          this.videoapplistt = this.videoapplist.filter(x => x.appointmentTypeID == 2)
          this.videoappcount = this.videoapplistt.length;

          this.homecalls = this.finallist;
          this.homecalllist = this.homecalls.filter(x => x.homeVisit == 1)
          this.homecallscount = this.homecalllist.length;


          this.doccancelledlist = this.finallist;
          this.doccancelledlisttss = this.doccancelledlist.filter(x => x.docCancelled == 1);
          this.doccancelledcount = this.doccancelledlisttss.length;
        },
        error => { }
      );
  }





  public GetDoctorRefereals() {
   
    this.docservice.GetDoctorReferalsCount(this.doctorid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        this.refereallist = data[0];
        this.receivedreferlcount = this.refereallist.receiveedReferelas,
          this.sentrefereralscount = this.refereallist.sendrefererals
      }, error => {
      }
    )
  }

  selectedDate(data) {
   
    // var sdate = data.split("-");
    // this.startdate = sdate[0];
    // this.enddate = sdate[1];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];


    this.GetAppointmetbyDociD();
    this.GetDoctorRefereals();
    localStorage.setItem("startdate", this.startdate);
    localStorage.setItem("enddate", this.enddate);
  }
}
