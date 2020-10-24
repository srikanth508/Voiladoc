import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-admin-revenue',
  templateUrl: './admin-revenue.component.html',
  styleUrls: ['./admin-revenue.component.css']
})
export class AdminRevenueComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  public languageid: any;
  public allcounts: any;
  public nursecount: any;
  public midwifecount: any;
  public physiocount: any;
  public doccommissioncount: any;
  public docommicssion: any;
  public Nursecommssioncount: any;
  public midwifecommissioncount: any;
  public physiocommissioncount: any;
  public labels: any;
  public hospitalid:any;
  public cityid:any;

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
   
    this.getlanguage()
    this.GetCounts()
    this.GetNursamount();
    this.GetMidWifesTotalCountAmount();
    this.GetPhyiotherapistAmount();
    this.GetDoctorCommission();
    this.GetNurseCommissionCount()
    this.GetidwifeommissionsRevenue()
    this.GetPhysiotherapistcount()
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      },
      error => { }
    );
  }


  public GetCounts() {
    this.docservice.GetDoctorCommissionFeesByAdminRevenue(this.startdate, this.enddate,this.hospitalid,this.cityid).subscribe(
      data => {
       
        this.allcounts = data;

      }, error => {
      }
    )
  }

  public GetDoctorCommission() {
    this.docservice.GetPatientPaymentDetailsAdminDoctorsCommission(this.startdate, this.enddate).subscribe(
      data => {
       
        this.doccommissioncount = data;

      }, error => {
      }
    )
  }


  public GetNursamount() {
    this.docservice.GetNurseCommissionDeatailsAdminRevenue(this.startdate, this.enddate,this.hospitalid,this.cityid).subscribe(
      data => {
       
        this.nursecount = data;
      }, error => {
      }
    )
  }


  public GetMidWifesTotalCountAmount() {
    this.docservice.GetMidWifeCommissionDeatailsAdminRevenue(this.startdate, this.enddate,this.hospitalid,this.cityid).subscribe(
      data => {
       
        this.midwifecount = data;
      }, error => {
      }
    )
  }

  public GetPhyiotherapistAmount() {
    this.docservice.GetPhsyioTherapistCommissionDeatailsAdminRevenue(this.startdate, this.enddate,this.hospitalid,this.cityid).subscribe(
      data => {
       
        this.physiocount = data;
      }, error => {
      }
    )
  }

  public GetNurseCommissionCount() {
    this.docservice.GetNurse_PatientPaymentDetailsNurseRevenue(this.startdate, this.enddate).subscribe(
      data => {
       
        this.Nursecommssioncount = data;
      }, error => {
      }
    )
  }

  public GetidwifeommissionsRevenue() {
    this.docservice.GetMidWife_PatientPaymentDetailsAdminRevenue(this.startdate, this.enddate).subscribe(
      data => {
       
        this.midwifecommissioncount = data;
      }, error => {
      }
    )
  }

  public GetPhysiotherapistcount() {
    this.docservice.GetPhysiotherapist_PatientPaymentDetailsAdminRevenue(this.startdate, this.enddate).subscribe(
      data => {
       
        this.physiocommissioncount = data;
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
    this.GetCounts();
    this.GetNursamount()
    this.GetMidWifesTotalCountAmount()
    this.GetPhyiotherapistAmount()
    this.GetDoctorCommission();
    this.GetNurseCommissionCount();
    this.GetidwifeommissionsRevenue();
    this.GetPhysiotherapistcount()
    localStorage.setItem('StartTime', this.startdate)
    localStorage.setItem('EndDate', this.enddate)
  }
}
