import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-linkforregdash',
  templateUrl: './linkforregdash.component.html',
  styleUrls: ['./linkforregdash.component.css']
})
export class LinkforregdashComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }


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
    this.GetRegisterLinks()
    this.getlanguage()
  }


  public GetRegisterLinks() {
    this.docservice.GetLinkForRegistrations(this.startdate, this.enddate,this.languageid).subscribe(data => {
      this.linkslist = data;
      this.count = this.linkslist.length;
    })
  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }
  labels: any;
  selectedDate(data) {
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetRegisterLinks()

  }

}
