import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-physio-revenue',
  templateUrl: './physio-revenue.component.html',
  styleUrls: ['./physio-revenue.component.css']
})
export class PhysioRevenueComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  public languageid: any;
  public physioid: any;
  public totalamount: any;
  public totalcommissions: any;
  public labels: any;
  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.physioid = localStorage.getItem('physioid');
    this.languageid = localStorage.getItem('LanguageID');
    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 0);
   

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
   

    localStorage.setItem("startdate", this.startdate);
    localStorage.setItem("enddate", this.enddate);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
   
    this.getlanguage()
    this.GetAllMidWIfeCount();
    this.GetTotalCommissions()
  }


  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      },
      error => { }
    );
  }

  public GetAllMidWIfeCount() {
    this.docservice.GetPhsyioTherapistCommissionDeatailsByPhysioID(this.startdate, this.enddate, this.physioid).subscribe(
      data => {
       
        this.totalamount = data;
      }, error => {
      }
    )
  }
  public GetTotalCommissions() {
    this.docservice.GetPhysiotherapist_PatientPaymentDetailsComnmissionByPhysioID(this.startdate, this.enddate, this.physioid).subscribe(
      data => {
       
        this.totalcommissions = data;
      }, error => {
      }
    )
  }

  selectedDate(data) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    
    localStorage.setItem("startdate", this.startdate);
    localStorage.setItem("enddate", this.enddate);
    
    this.GetAllMidWIfeCount();
    this.GetTotalCommissions()
  }
}

