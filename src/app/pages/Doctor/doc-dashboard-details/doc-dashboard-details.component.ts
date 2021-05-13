import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import { ActivatedRoute } from "@angular/router";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-doc-dashboard-details',
  templateUrl: './doc-dashboard-details.component.html',
  styleUrls: ['./doc-dashboard-details.component.css']
})
export class DocDashboardDetailsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public doctorid: any;
  startdate: any;
  enddate: any;
  public ID: any;
  public appointmentlist: any;
  public count: any;
  public labels: any;
  public languageid: any;
  public term: any;



  public todaydate: any;
  public CurrentTime: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  public sdate: any;
  public edate: any;

  ngOnInit() {
   
    this.activatedroute.params.subscribe(params => {
     
      this.ID = params["id"];
      this.doctorid = localStorage.getItem("userid");
      this.startdate = localStorage.getItem("startdate");
      this.enddate = localStorage.getItem("enddate");
      this.languageid = localStorage.getItem("LanguageID");
      this.GetAppointmetbyDociD();
      this.getlanguage();
    });
  }

  public GetAppointmetbyDociD() {
   
    this.docservice
      .GetBookAppointmentByDocID(this.startdate, this.enddate, this.doctorid, this.languageid)
      .subscribe(
        data => {
         
          if (this.ID == 1) {
            this.appointmentlist = data;
           
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 2) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              x => x.isVisited == 1
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 3) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              x => x.noShow == 1
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 4) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              x => x.cancelled == 1 
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 5) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              x => x.accepted == 1 && x.isVisited == 0 && x.docCancelled == 0 && x.cancelled == 0 && x.noShow == 0
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 6) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              x => x.isVisited == 0 && x.accepted == 0 && x.cancelled == 0 && x.docCancelled == 0 && x.noShow == 0
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 7) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              x => x.appointmentTypeID == 1
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 8) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              x => x.appointmentTypeID == 2
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 9) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              x => x.homeVisit == 1
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 10) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              x => x.docCancelled == 1
            );
            this.count = this.appointmentlist.length;
          }
        },
        error => { }
      );
  }

  public getlanguage() {
    this.docservice
      .GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid)
      .subscribe(
        data => {
         
          this.labels = data;
        },
        error => { }
      );
  }


  
  selectedDate(data) {
   
    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetAppointmetbyDociD()
  }
}
