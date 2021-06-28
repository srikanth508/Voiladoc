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
  todaydatesssssss: any;
  public mindate = new Date();
  public slottodaydatesssssss: any;
  public presenttime:any;
  labels1:any;
  ngOnInit() {
    localStorage.setItem('Showbutton', '1')

    this.docservice.GetServerDateAndTime().subscribe(
      data => {
        this.serverdateandtime = data;

        if (this.languageid == 1) {

          this.todaydate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.selecteddate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.Selecteddate2 = this.serverdateandtime.todaydatesss.toLocaleString()
          // this.Selecteddate2=this.datepipe.transform(this.todaydatesss, 'dd/MM/yyyy')

          this.todaydatesss = this.serverdateandtime.todaydatesss.toLocaleString()
          this.todaydatesssssss = this.serverdateandtime.todaydateeeesss.toLocaleString()

          this.slottodaydatesssssss = this.serverdateandtime.slottodaydateeeesss,
          this.presenttime=this.serverdateandtime.presentTime

          localStorage.setItem('SelectedDate', this.todaydatesssssss)

        }
        else if (this.languageid == 6) {

          this.todaydate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.selecteddate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.todaydatesss = this.serverdateandtime.todaydatesss.toLocaleString()
          this.todaydatesssssss = this.serverdateandtime.todaydateeeesss.toLocaleString()
          this.slottodaydatesssssss = this.serverdateandtime.slottodaydateeeesss,
          this.presenttime=this.serverdateandtime.presentTime
          localStorage.setItem('SelectedDate', this.todaydatesssssss)
        }
      }, error => {
      }
    )


    this.doctortype = 1;
    this.bookingtype = 2;
    this.appointmentypeid = 1
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');
    localStorage.setItem('SelectedDate', this.selecteddate)

    localStorage.setItem('slottimeselecteddates1', undefined)

    this.getdepartmentmaster();
    this.GetAreaMaster();

    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search
        this.select = this.labels[0].selectdoctor
      }, error => {
      }
    )

    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;
       
      }, error => {
      }
    )
    this.getDoctorss()
    this.getdoctorslots()
  }
  public search: any;
  public select: any;
  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }


  public GetAreaMaster() {

    this.docservice.GetAreaMasterWeb().subscribe(
      data => {

        this.arealist = data;
      }, error => {
      }
    )
  }

  public GetAreaID(even) {

    this.areaid = even.target.value;

    var list = this.arealist.filter(x => x.id == this.areaid)
    this.pincode = list[0].pincode
  }


  public GetDepartmentID(even) {

    if (even.target.value != 0) {
      this.departmentid = even.target.value;
      this.doctorslist = this.dummdoctorslist.filter(x => x.departmentID == this.departmentid)
    }
    else {
      this.getDoctorss()
    }
  }

  public GetAppointmentTypeID(even) {

    this.appointmentypeid = even.target.value;
    this.getDoctorss();
  }

  public docdd = {};


  public getDoctorss() {

    this.docservice.GetDoctorDetails_ForVideoConferenceForWeb(5, this.doctortype, this.appointmentypeid, this.bookingtype, this.languageid, this.hospitalid).subscribe(
      data => {

        this.doctorslist = data;
        this.dummdoctorslist = data;
        this.filterdummlist = data;
        this.docdd = {
          singleSelection: true,
          idField: 'doctorID',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };


      }, error => {
      }
    )
  }
  public filterdummlist: any;

  selecteddate: any;
  getday: any;

  selecteddates1: any;
  slottimeselecteddates1: any;

  public GetDate(even) {
    
    if (this.languageid == 1) {
      
      this.selecteddates1 = even.toLocaleString().split(',')[0];
      this.selecteddate = this.datepipe.transform(this.selecteddates1, 'dd/MM/yyyy');
      
      localStorage.setItem('slottimeselecteddates1', this.selecteddates1)

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

        this.dayidslist = data;
        this.dayid = this.dayidslist[0].dayID;

        

        this.docservice.GetDoctorDetails_ForVideoConferenceForWeb1(5, this.doctortype, this.appointmentypeid, this.bookingtype, this.languageid, this.hospitalid, this.dayid, this.selecteddate).subscribe(
          data => {
            
            this.doctorslist = data;
            this.dummdoctorslist = data;
            this.selecteddates1 = even.toLocaleString().split(',')[0];
            this.selecteddate = this.datepipe.transform(this.selecteddates1, 'dd/MM/yyyy');
            
            if (this.selecteddates1 == this.slottodaydatesssssss) {
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


      this.selecteddates1 = even.toLocaleString().split(',')[0];

      this.selecteddate = this.datepipe.transform(this.selecteddates1, 'dd/MM/yyyy');

      localStorage.setItem('slottimeselecteddates1', this.selecteddates1)


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

        this.dayidslist = data;
        this.dayid = this.dayidslist[0].dayID;

        this.docservice.GetDoctorDetails_ForVideoConferenceForWeb1(5, this.doctortype, this.appointmentypeid, this.bookingtype, this.languageid, this.hospitalid, this.dayid, this.selecteddate).subscribe(
          data => {

            this.doctorslist = data;
            this.dummdoctorslist = data;

            if (this.selecteddates1 == this.slottodaydatesssssss) {
              
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
    // 
    // let d = new Date();
    // this.hours = d.getHours() - 4
    // this.minutes = d.getMinutes() + 30
    // let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    // let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    // let cts = h + ':' + m;
    // 
    this.docservice.GetSlotsMasterSlots().subscribe(
      data => {
        
        this.dummdoctorslots = data;
        this.doctorslots = this.dummdoctorslots.filter(x => x.slotcompare > this.presenttime)

      }, error => {
      }
    )
  }


  public getdoctotsbyid() {
    this.docservice.GetSlotsMasterSlots().subscribe(
      data => {

        this.doctorslots = data;
      }, error => {
      }
    )
  }

  public GetSlotID(even) {
    this.slotid = even.target.value;
    
    this.docservice.GetDoctorDetails_ForVideoConferenceForWeb2(5, this.doctortype, this.appointmentypeid, this.bookingtype, this.languageid, this.hospitalid, this.dayid, this.slotid, this.selecteddates1).subscribe(
      data => {

        this.doctorslist = data;
        this.dummdoctorslist = data;
        this.filterdummlist = data;
      }, error => {
      }
    )
  }

  public doctorid: any;

  public GetDoctorID(item2: any) {
    
    // if (even.target.value != 0) {
    this.doctorid = item2.doctorID;
    this.doctorslist = this.dummdoctorslist.filter(x => x.doctorID == this.doctorid)

    // else {
    //   this.getDoctorss();
    //   // this.doctorslist = this.dummdoctorslist.filter(x => x.doctorID == this.doctorid)
    // }
  }






 
  
}
