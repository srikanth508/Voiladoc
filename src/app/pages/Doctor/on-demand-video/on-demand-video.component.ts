import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-on-demand-video',
  templateUrl: './on-demand-video.component.html',
  styleUrls: ['./on-demand-video.component.css']
})
export class OnDemandVideoComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public appointmentlist: any;
  public doctorid: any;
  public imageid: any;
  public showimages: any;
  SDate = new Date();
  EDate = new Date();

  startdate: any;
  enddate: any;
  value: any;
  public todaydate: any;
  public term: any;
  public appointmentlist1: any;



  ngOnInit() {

    debugger
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
    var lll = this.EDate.setDate(this.EDate.getDate() + 1);

    debugger
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
    this.doctorid = localStorage.getItem('userid');
    debugger
    this.getvideodetailsbydoctor()
  }


  public getvideodetailsbydoctor() {
    this.docservice.GetMyAppointments_OnDemandVideoConferenceByDoctorIDWeb(this.doctorid, this.startdate, this.enddate).subscribe(
      data => {
        debugger
        this.appointmentlist1 = data;

      }, error => {
      }
    )
  }




  selectedDate(data) {
    debugger
    var sdate = data.split('-')
    var s = sdate[0]
    var e = sdate[1]

    this.docservice.GetMyAppointments_OnDemandVideoConferenceByDoctorIDWeb(this.doctorid, s, e).subscribe(
      data => {
        debugger
        this.appointmentlist1 = data;

      }, error => {
      }
    )
    debugger
  }


  public getvedioconferencebydateandtime(patientID, id, appoinDate, appointmentTime) {
    debugger
    localStorage.setItem('patientID', patientID);
    localStorage.setItem('appointmentID', id);
    localStorage.setItem('appdate', appoinDate);
    localStorage.setItem('ondemandid', '1');
    debugger
    location.href = '#/Vediocall';

  }


  public GetImagesID(id) {
    debugger
    this.imageid = id;
    this.docservice.GetPatient_Illnessphotos(this.imageid).subscribe(
      data => {
        debugger
        this.showimages = data;
      }, error => {
      }
    )
  }

}
``