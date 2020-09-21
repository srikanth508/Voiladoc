import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-midwifenotifications',
  templateUrl: './midwifenotifications.component.html',
  styleUrls: ['./midwifenotifications.component.css']
})
export class MidwifenotificationsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }
  public date: any;

  value: any;
  SDate = new Date();
  EDate = new Date();
  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public languageid: any;
  public Notificationslist: any;
  public count: any;
public term:any;
  public midwifeid:any;
  public labels:any;
  ngOnInit() {
    this.midwifeid=localStorage.getItem('midwifeid');
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
    debugger
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
    this.languageid = localStorage.getItem('LanguageID');


    this.docservice.GetNotifications_NPMWeb(this.midwifeid, this.startdate, this.enddate, 27,this.languageid).subscribe(
      data => {
        debugger
        this.Notificationslist = data;
        this.count = this.Notificationslist.length
      }, error => {
      }
    )
    this.GetLanguageMaster()
  }

  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {
      debugger
      this.labels = res;
      debugger
    })
  }


  selectedDate(data) {
    debugger
    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];

    this.docservice.GetNotifications_NPMWeb(this.midwifeid, this.startdate, this.enddate, 27,this.languageid).subscribe(
      data => {
        debugger
        this.Notificationslist = data;
        this.count = this.Notificationslist.length
      }, error => {
      }
    )
  }
}
