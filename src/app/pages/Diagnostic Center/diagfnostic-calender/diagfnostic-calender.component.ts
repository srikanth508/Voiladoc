import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-diagfnostic-calender',
  templateUrl: './diagfnostic-calender.component.html',
  styleUrls: ['./diagfnostic-calender.component.css']
})
export class DiagfnosticCalenderComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public languageid: any;
  public labels: any;
  public labels1: any;
  public Workingdetails: any;
  public diagnosticid: any;
  public term: any;
  SelectLabel: any;
  // public dayid = []
  search: any;
  public todaydate: any;
  public today = new Date();
  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid')
     this.spinner.show();
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        this.labels = data;
        this.search = this.labels[0].search;

      }, error => {
      }
    )

    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger
        this.labels1 = data;
        this.SelectLabel = this.labels1[0].select;

      },
      error => { }
    );

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        this.labels = data;
        this.search = this.labels[0].search;

      }, error => {
      }
    )
    this.getWorkingdetils();
  }

  public DayDatelist: any;

  public getWorkingdetils() {
    debugger
    this.docservice.GetDiaGnosticSlotsByCalender(this.diagnosticid, this.languageid, this.todaydate).subscribe(
      data => {
        this.DayDatelist = data[0];
        this.Workingdetails = data[1];
        this.spinner.hide();
      },
      error => { }
    );

  }


  public GetDoctorDates(even) {
    this.spinner.show();
    debugger
    this.todaydate = even.toLocaleString().split(',')[0];
    debugger
    this.getWorkingdetils();
  }

}
