import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe, formatDate } from "@angular/common";
@Component({
  selector: 'app-datecheck',
  templateUrl: './datecheck.component.html',
  styleUrls: ['./datecheck.component.css']
})
export class DatecheckComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, public datepipe: DatePipe) { }
  languageid: any;
  todaydate: any;
  myDateValue: Date;
  previousDate: Date;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    // this.myDateValue = new Date();
  }

  daychangedate: any;
  dayslist: any;
  dayname: any;
  dayidslist: any;
  datechangedayid: any;
  daychangedate1: any;

  public GetdaychangeDate(newDate: Date) {
    
    this.datechangedayid = "";
    this.daychangedate = "";
    
    Swal.fire("Date format is :" + this.daychangedate1)
    this.daychangedate1 = newDate.toLocaleString().split(',')[0];

    
    Swal.fire("Date format is :" + this.daychangedate1)
    this.previousDate = new Date(newDate);

   //  this.daychangedate = this.datepipe.transform(this.daychangedate1, 'MM-dd-yyyy');
   
  //  this.daychangedate = newDate.toLocaleDateString().slice(0, 10);
  //   console.log(this.daychangedate);


  var d = new Date(newDate),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

if (month.length < 2) 
  month = '0' + month;
if (day.length < 2) 
  day = '0' + day;

  this.daychangedate = month + "-" + day + "-" + year;
//return [year, month, day].join('-');
    this.Getdays()
    Swal.fire("Date format is :" + this.daychangedate + " and dayid is " + this.datechangedayid)
    
  }

  public Getdays() {
    
    this.docservice.GetDaysHomecare(this.daychangedate).subscribe(data => {
      
      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName

      Swal.fire("Date format is :" + this.daychangedate)
      // Swal.fire("Date format is :" + this.daychangedate + " and dayid is " + this.datechangedayid)
      this.Getdayssid();
    }, error => {
    })
  }

  public Getdayssid() {
    this.docservice.GetDayID(this.dayname).subscribe(data => {
      
      this.dayidslist = data;
      this.datechangedayid = this.dayidslist[0].dayID;

      Swal.fire("Date format is :" + this.daychangedate + " and dayid is " + this.datechangedayid)

    }, error => {
    })
  }

  onDateChange(newDate: Date) {
    this.previousDate = new Date(newDate);
  }
}
