import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { DatePipe, formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { TotalHospitalApointmentsComponent } from '../total-hospital-apointments/total-hospital-apointments.component';
@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, public datepipe: DatePipe) { }

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
  serverdateandtime: any;
  todaydatesss: any;
  Selecteddate2: any;
  todaydatesssssss:any;
  ngOnInit() {
    // debugger
    // const format = 'yyyy-MM-dd';
    // const myDate = new Date();
    // const locale = 'en-US';
    // this.todaydate = formatDate(myDate, format, locale);
    // this.selecteddate = formatDate(myDate, format, locale);
    // this.filterdate = this.selecteddate
    // localStorage.setItem('SelectedDate', this.selecteddate)

    this.docservice.GetServerDateAndTime().subscribe(
      data => {
        this.serverdateandtime = data;
        if (this.languageid == 1) {
          debugger
          this.todaydate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.selecteddate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.Selecteddate2 = this.serverdateandtime.todaydatesss.toLocaleString()
          // this.Selecteddate2=this.datepipe.transform(this.todaydatesss, 'dd/MM/yyyy')

          this.todaydatesss = this.serverdateandtime.todaydatesss.toLocaleString()
          this.todaydatesssssss=this.serverdateandtime.todaydateeeesss.toLocaleString()

          localStorage.setItem('SelectedDate', this.todaydatesssssss)

        }
        else if (this.languageid == 6) {
          debugger
          this.todaydate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.selecteddate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.todaydatesss = this.serverdateandtime.todaydatesss.toLocaleString()
          this.todaydatesssssss=this.serverdateandtime.todaydateeeesss.toLocaleString()
          localStorage.setItem('SelectedDate', this.todaydatesssssss)
        }
      }, error => {
      }
    )

    // var gsDayNames = [
    //   'Sunday',
    //   'Monday',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday'
    // ];
    // var d = new Date(this.selecteddate);
    // var dayName = gsDayNames[d.getDay()];
    // this.docservice.GetDayID(dayName).subscribe(data => {
    //   debugger
    //   this.dayidslist = data;
    //   this.dayid = this.dayidslist[0].dayID;
    // })

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
  getday: any;

  selecteddates1: any;
  public GetDate(even) {

    if (this.languageid == 1) {
      debugger
      //  this.selecteddate =new Date(even.setDate(even.getDate() + 1)).toJSON().slice(0,10).split('-').reverse().join('/');
      // this.selecteddate = even.target.value;
      // this.getday = new Date(even.setDate(even.getDate())).toJSON().slice(0,10).split('-').reverse().join('-');
      debugger
      this.selecteddates1 = even.toLocaleString().split(',')[0];
      this.selecteddate = this.datepipe.transform(this.selecteddates1, 'dd/MM/yyyy');
      // this.selecteddate = even.target.value;
      // localStorage.setItem('SelectedDate', this.selecteddate)

      localStorage.setItem('SelectedDate', this.selecteddates1)
      var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];

      var d = new Date(this.selecteddates1);
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
            this.selecteddates1 = even.toLocaleString().split(',')[0];
            this.selecteddate = this.datepipe.transform(this.selecteddates1, 'dd/MM/yyyy');
            debugger
            if (this.selecteddates1 == this.todaydatesssssss) {
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
    else if (this.languageid == 6) {
      debugger
      //  this.selecteddate =new Date(even.setDate(even.getDate() + 1)).toJSON().slice(0,10).split('-').reverse().join('/');
      // this.selecteddate = even.target.value;
      // this.getday = new Date(even.setDate(even.getDate())).toJSON().slice(0,10).split('-').reverse().join('-');
      debugger
      this.selecteddates1 = even.toLocaleString().split(',')[0];

      this.selecteddate = this.datepipe.transform(this.selecteddates1, 'dd/MM/yyyy');
      // this.selecteddate = even.target.value;
      // localStorage.setItem('SelectedDate', this.selecteddate)

      localStorage.setItem('SelectedDate', this.selecteddates1)
      var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];

      var d = new Date(this.selecteddates1);
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

            if (this.selecteddates1 == this.todaydatesssssss) {
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

  }

  dummdoctorslots: any;
  hours: any;
  minutes: any;

  public getdoctorslots() {
    debugger
    let d = new Date();
    this.hours = d.getHours() + 2
    this.minutes = d.getMinutes() + 30
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
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
    this.docservice.GetDoctorDetails_ForVideoConferenceForWeb2(5, this.doctortype, this.appointmentypeid, this.bookingtype, this.languageid, this.hospitalid, this.dayid, this.slotid, this.selecteddates1).subscribe(
      data => {
        debugger
        this.doctorslist = data;
        this.dummdoctorslist = data;
      }, error => {
      }
    )
  }
}
