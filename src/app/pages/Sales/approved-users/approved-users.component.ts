import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
@Component({
  selector: 'app-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.css']
})
export class ApprovedUsersComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }


  value: any;
  SDate = new Date();
  EDate = new Date();

  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public languageid: any;
  public linkslist: any;
  public search: any;
  public RegisteredList: any;
  public count: any;
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
    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

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
    this.CurrentTime = hours + ':' + minutes + ' ' + newformat;
    this.languageid = localStorage.getItem("LanguageID");

    this.typeid = 1
    this.GetRegistreedVoiladocusers()
    this.GetAllRegisteredUsersCount()
    this.getlanguage()
  }



  selectedDate(data) {
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetRegistreedVoiladocusers()
  }

  countlist: any;

  public GetAllRegisteredUsersCount() {
    this.docservice.GetAllRegisteredUsersCount(this.startdate, this.enddate).subscribe(data => {
      // this.RegisteredList = data;
      this.countlist = data;


    })
  }

  public dummreglist: any;

  public GetRegistreedVoiladocusers() {
    this.docservice.GetVoiladocRegistrationsUsers(this.startdate, this.enddate, this.typeid, this.languageid).subscribe(data => {
      // this.RegisteredList = data;
      this.dummreglist = data;
      this.RegisteredList = this.dummreglist.filter(x => x.approved == 1)
      this.count = this.RegisteredList.length;

    })
  }

  public typeid: any;

  public GetTypeID(even) {
    this.typeid = even.target.value;
    // this.RegisteredList = this.dummreglist.filter(x =>  x.approved == 1)
    // this.count = this.RegisteredList.length;
    this.GetRegistreedVoiladocusers();
  }


  labels: any;

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }
}
