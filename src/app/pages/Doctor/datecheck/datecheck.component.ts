import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-datecheck',
  templateUrl: './datecheck.component.html',
  styleUrls: ['./datecheck.component.css']
})
export class DatecheckComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  languageid: any;
  todaydate: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
  }

  daychangedate: any;
  dayslist: any;
  dayname: any;
  dayidslist: any;
  datechangedayid: any;

  public GetdaychangeDate(even) {
    debugger
    this.datechangedayid="";
    this.daychangedate="";
    this.daychangedate = even.toLocaleString().split(',')[0];
    this.Getdays()
    Swal.fire("Date format is :" + this.daychangedate + " and dayid is " + this.datechangedayid)
    debugger
  }

  public Getdays() {
    debugger
    this.docservice.GetDaysHomecare(this.daychangedate).subscribe(data => {
      debugger
      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName
      // Swal.fire("Date format is :" + this.daychangedate + " and dayid is " + this.datechangedayid)
      this.Getdayssid();
    }, error => {
    })
  }

  public Getdayssid() {
    this.docservice.GetDayID(this.dayname).subscribe(data => {
      debugger
      this.dayidslist = data;
      this.datechangedayid = this.dayidslist[0].dayID;

      Swal.fire("Date format is :" + this.daychangedate + " and dayid is " + this.datechangedayid)

    }, error => {
    })
  }
}
