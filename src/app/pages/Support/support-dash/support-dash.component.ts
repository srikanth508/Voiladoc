import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-support-dash',
  templateUrl: './support-dash.component.html',
  styleUrls: ['./support-dash.component.css']
})
export class SupportDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  options: NgDateRangePickerOptions;
  public languageid: any;
  public labels: any;

  value: any;
  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  public startdate: any;
  public enddate: any;
  public CurrentTime: any;
  public supportlist: any;
  public term: any;
  public dummlist: any;
  public count: any;
  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 800);

    this.languageid = localStorage.getItem('LanguageID');
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 20);
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
    this.getlanguage();
    this.getsupport();
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      },
      error => { }
    );
  }

  public getsupport() {
    this.docservice.GetSupport(this.startdate, this.enddate).subscribe(
      data => {
       
        this.supportlist = data;
        this.dummlist = this.supportlist
        this.count = this.supportlist.length
      }, error => {
      }
    )
  }


  public GetSupportResolvedBit(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "This Issue Has Resolved!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Resolved!'
    }).then((result) => {
      if (result.value) {
        this.docservice.GetSupportResolvedBit(id).subscribe(res => {
          let test = res;
          this.getsupport();
        })
        Swal.fire(
          'Resolved!',
          'Issue has been Resolved.',
          'success'
        )
      }
      else {
        this.getsupport();
      }
    })
  }

  selectedDate(data) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.getsupport()
  }

  public GetResolvedStatus(even) {
    if (even.target.value == '1') {
     
      let dfsfd = this.dummlist.filter(x => x.resolve == 1);
     
      this.supportlist = dfsfd;
      this.count = this.supportlist.length

    }
    if (even.target.value == '2') {
     
      let dfsfd = this.dummlist.filter(x => x.resolve == 0);
     
      this.supportlist = dfsfd;
      this.count = this.supportlist.length

    }
    if (even.target.value == '0') {
     
      this.getsupport();
    }
  }

}
