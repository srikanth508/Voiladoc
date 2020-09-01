import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public departmentlist: any;
  public languageid: any;
  public departmentid: any;
  public appointmentypeid: any;
  public arealist: any;
  public areaid: any;
  public pincode: any;
  public dayid: any;
  public doctorslist: any;
  public doctortype: any;
  public bookingtype: any;
  labels: any
  hospitalid: any;
  Search: any;
  dummdoctorslist: any;
  todaydate: any;
  filterdate: any;
  dayidslist: any;
  public doctorslots: any;
  public slotid: any;

  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.selecteddate = formatDate(myDate, format, locale);
    this.filterdate = this.selecteddate

    this.doctortype = 1;
    this.bookingtype = 2;
    this.appointmentypeid = 1
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');

    localStorage.setItem('SelectedDate', this.selecteddate)

    this.getdepartmentmaster();
    this.GetAreaMaster();
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
    this.getDoctorss()
    this.getdoctorslots()
  }

  public getdepartmentmaster() {
    debugger
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.departmentlist = data;
      }, error => {
      }
    )
  }


  public GetAreaMaster() {
    debugger
    this.docservice.GetAreaMasterWeb().subscribe(
      data => {
        debugger
        this.arealist = data;
      }, error => {
      }
    )
  }

  public GetAreaID(even) {
    debugger
    this.areaid = even.target.value;

    var list = this.arealist.filter(x => x.id == this.areaid)
    this.pincode = list[0].pincode
  }


  public GetDepartmentID(even) {
    debugger
    if (even.target.value != 0) {
      this.departmentid = even.target.value;
      this.doctorslist = this.dummdoctorslist.filter(x => x.departmentID == this.departmentid)
    }
    else {
      this.getDoctorss()
    }
  }

  public GetAppointmentTypeID(even) {
    debugger
    this.appointmentypeid = even.target.value;
    this.getDoctorss();
  }

  public getDoctorss() {
    debugger
    this.docservice.GetDoctorDetails_ForVideoConferenceForWeb(5, this.doctortype, this.appointmentypeid, this.bookingtype, this.languageid, this.hospitalid).subscribe(
      data => {
        debugger
        this.doctorslist = data;
        this.dummdoctorslist = data;
      }, error => {
      }
    )
  }


  selecteddate: any;




  public GetDate(even) {
    debugger
    this.selecteddate = even.target.value;
    localStorage.setItem('SelectedDate', this.selecteddate)
    var gsDayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    var d = new Date(this.selecteddate);
    var dayName = gsDayNames[d.getDay()];
    this.docservice.GetDayID(dayName).subscribe(data => {
      debugger
      this.dayidslist = data;
      this.dayid = this.dayidslist[0].dayID;

      this.docservice.GetDoctorDetails_ForVideoConferenceForWeb1(5, this.doctortype, this.appointmentypeid, this.bookingtype, this.languageid, this.hospitalid, this.dayid).subscribe(
        data => {
          debugger
          this.doctorslist = data;
          this.dummdoctorslist = data;

          if (this.selecteddate == this.todaydate) {
            this.getdoctorslots()
          }
          else {
            this.getdoctotsbyid()
          }
        }, error => {
        }
      )
    }) 
  }

  dummdoctorslots: any;

  public getdoctorslots() {
    let d = new Date();
    let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
    let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    let cts = h + ':' + m;

    this.docservice.GetSlotsMasterSlots().subscribe(
      data => {
        debugger
        this.dummdoctorslots = data;
        this.doctorslots = this.dummdoctorslots.filter(x => x.slotcompare > cts)

      }, error => {
      }
    )
  }

  public getdoctotsbyid() {
    this.docservice.GetSlotsMasterSlots().subscribe(
      data => {
        debugger
        this.doctorslots = data;
      }, error => {
      }
    )
  }


  public GetSlotID(even) {
    this.slotid = even.target.value;

    this.docservice.GetDoctorDetails_ForVideoConferenceForWeb2(5, this.doctortype, this.appointmentypeid, this.bookingtype, this.languageid, this.hospitalid, this.dayid, this.slotid, this.selecteddate).subscribe(
      data => {
        debugger
        this.doctorslist = data;
        this.dummdoctorslist = data;
      }, error => {
      }
    )
  }
}
