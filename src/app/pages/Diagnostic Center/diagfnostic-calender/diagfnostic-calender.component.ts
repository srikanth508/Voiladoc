import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { NgxSpinnerService } from "ngx-spinner";
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
  public recepid: any;
  public showedit: any;
  public labelsss:any;
  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.mrngfromid = "";
    this.mrngtoid = "";
    this.typeidss = 2;
    this.spinner.show();
    this.recepid = localStorage.getItem('Receptionstid')

    if (this.recepid == undefined) {
      this.showedit = 1;
    }
    else {
      this.showedit = 0;
    }
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

    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labelsss = data;
      
      }, error => {
      }
    )
    document.getElementById("defaultOpen").click();
    this.getWorkingdetils();
    this.GetdicgnosticMasterSlotByID();
  }

  public DayDatelist: any;

  public getWorkingdetils() {
    debugger
    this.docservice.GetDiaGnosticSlotsByCalender(this.diagnosticid, this.languageid, this.todaydate, this.typeidss).subscribe(
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


  public dayid: any;
  public appointmentdate: any;
  public slotid: any;
  public typeid: any;


  public GetDay1Details(details) {
    debugger
    this.dayid = details.day1DayID
    this.appointmentdate = details.day1AppointmentDate
    this.slotid = details.day1SlotID
    this.typeid = details = details.day1TypeID
  }

  public GetDay2Details(details) {
    debugger
    this.dayid = details.day2DayID
    this.appointmentdate = details.day2AppointmentDate
    this.slotid = details.day2SlotID
    this.typeid = details = details.day2TypeID
  }

  public GetDay3Details(details) {
    debugger
    this.dayid = details.day3DayID
    this.appointmentdate = details.day3AppointmentDate
    this.slotid = details.day3SlotID
    this.typeid = details = details.day3TypeID
  }


  public GetDay4Details(details) {
    debugger
    this.dayid = details.day4DayID
    this.appointmentdate = details.day4AppointmentDate
    this.slotid = details.day4SlotID
    this.typeid = details = details.day4TypeID
  }


  public GetDay5Details(details) {
    debugger
    this.dayid = details.day5DayID
    this.appointmentdate = details.day5AppointmentDate
    this.slotid = details.day5SlotID
    this.typeid = details = details.day5TypeID
  }


  public GetDay6Details(details) {
    debugger
    this.dayid = details.day6DayID
    this.appointmentdate = details.day6AppointmentDate
    this.slotid = details.day6SlotID
    this.typeid = details = details.day6TypeID
  }


  public GetDay7Details(details) {
    debugger
    this.dayid = details.day7DayID
    this.appointmentdate = details.day7AppointmentDate
    this.slotid = details.day7SlotID
    this.typeid = details = details.day7TypeID
  }


  public insertdetails() {
    debugger
    this.spinner.show();
    var entity = {
      'DiagnosticCenterID': this.diagnosticid,
      'DiagnosticSlotID': this.slotid,
      'DayID': this.dayid,
      'TypeID': this.typeid,
      'AppointmentDate': this.appointmentdate
    }
    this.docservice.InsertDiagnosticRelatedSlotsByDateWise(entity).subscribe(data => {
      this.docservice.GetDiagnosticCancelledAppointmentByDateWise(this.diagnosticid, this.slotid, this.appointmentdate).subscribe(data => {
      })
      debugger
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.getWorkingdetils()
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.getWorkingdetils()
      }
    })
  }







  public typeidss: any;


  public openCity(evt, cityName) {
    debugger
    var i, tabcontent, tablinks;

    if (cityName == "Diagnosticcenter") {
      this.typeidss = 2;
      this.spinner.show();
      this.getWorkingdetils();
    }
    else {
      this.typeidss = 1;
      this.spinner.show();
      this.getWorkingdetils();
    }

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }


  public typeID: any;

  public GetTypeID(even) {
    this.typeID = even.target.value;
  }


  public slotslist: any;

  public mrngfromlist: any;
  public diagnsticfromlist: any;

  public GetdicgnosticMasterSlotByID() {

    this.docservice.GetDiagnosticSlotMasterByTimeID(1).subscribe(
      data => {

        this.slotslist = data;
        this.mrngfromlist = this.slotslist;

        this.diagnsticfromlist = this.slotslist;
      }, error => {
      }
    )
  }

  public timechangedate: any;
  public dayslist: any;
  public dayname: any;
  public dayidslist: any;
  public timechangedayid: any;



  // public GetTimewisechangedate(even) {
  //   this.timechangedate = even.toLocaleString().split(',')[0];
  //   this.Getdaystime()

  // }

  public datechangedayid: any;

  public GetdaychangeDate(even) {
    debugger
    this.daychangedate = even.toLocaleString().split(',')[0];
    this.Getdays()
  }

  public Getdays() {
    debugger
    this.docservice.GetDaysHomecare(this.daychangedate).subscribe(data => {
      debugger
      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName
      debugger
      this.Getdayssid();
    }, error => {
    })
  }
  public Getdayssid() {
    this.docservice.GetDayID(this.dayname).subscribe(data => {
      debugger
      this.dayidslist = data;
      this.datechangedayid = this.dayidslist[0].dayID;

    }, error => {
    })
  }


  public timewiseappointmentid: any;
  public Daywiseappointmentid: any;
  public daychangedate: any;



  public InsertDayWiseSlots() {
    debugger
    if (this.daychangedate == undefined || this.daychangedate == null) {
      Swal.fire('Please Select Date')
    }
    else if (this.Daywiseappointmentid == undefined || this.Daywiseappointmentid == null) {
      Swal.fire('Please Select Type')
    }
    else {
      debugger
      for (let i = 0; i < this.slotslist.length; i++) {
        this.spinner.show();
        var entity = {
          'DiagnosticCenterID': this.diagnosticid,
          'DiagnosticSlotID': this.slotslist[i].id,
          'DayID': this.datechangedayid,
          'TypeID': this.Daywiseappointmentid,
          'AppointmentDate': this.daychangedate
        }
        this.docservice.InsertDiagnosticRelatedSlotsByDateWise(entity).subscribe(data => {
          this.docservice.GetDiagnosticCancelledAppointmentByDateWise(this.diagnosticid, this.slotslist[i].id, this.daychangedate).subscribe(data => {
          })
          debugger

        })

      }
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.getWorkingdetils()
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.getWorkingdetils()
      }
    }
  }




  // slot time wise





  public GetTimewisechangedate(even) {
    this.timechangedate = even.toLocaleString().split(',')[0];
    this.Getdaystime()

  }


  public Getdaystime() {
    debugger
    this.docservice.GetDaysHomecare(this.timechangedate).subscribe(data => {
      debugger
      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName
      debugger
      this.Getdayssidbytime();
    }, error => {
    })
  }

  public Getdayssidbytime() {
    this.docservice.GetDayID(this.dayname).subscribe(data => {
      debugger
      this.dayidslist = data;
      this.timechangedayid = this.dayidslist[0].dayID;

    }, error => {
    })
  }


  public mrngfromid: any;
  public mrngfromslot: any;
  public mrngtolist: any;
  public mrngtoid: any;
  public mrngtoslot: any;

  public getmrngfrom(even) {
    this.mrngfromid = even.target.value;
    var qwerty = this.mrngfromlist.filter(x => x.id == this.mrngfromid);
    this.mrngfromslot = qwerty[0].slots;
    this.mrngtolist = this.mrngfromlist.filter(x => x.id > this.mrngfromid);
    this.mrngtoid = "";
  }


  public timewisechangeslotlist: any;

  public getmrngto(even) {
    this.mrngtoid = even.target.value;
    var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
    this.mrngtoslot = qwerty[0].slots;
    this.GetGetSlotsByIDPlanning();
  }

  public GetGetSlotsByIDPlanning() {
    this.docservice.GetDiagnosticSlotsByIDPlanning(this.mrngfromid, this.mrngtoid).subscribe(data => {
      debugger

      this.timewisechangeslotlist = data;

    }, error => {
    })
  }




  public InsertTimeWiseSlots() {
    debugger
    if (this.timechangedate == undefined || this.timechangedate == null) {
      Swal.fire('Please Select Date')
    }
    else if (this.timewiseappointmentid == undefined || this.timewiseappointmentid == null) {
      Swal.fire('Please Select Type')
    }
    else if (this.mrngfromid == "" || this.mrngtoid == "") {
      Swal.fire('Please Select Time')
    }
    else {
      debugger
      for (let i = 0; i < this.timewisechangeslotlist.length; i++) {
        this.spinner.show();
        var entity = {
          'DiagnosticCenterID': this.diagnosticid,
          'DiagnosticSlotID': this.timewisechangeslotlist[i].id,
          'DayID': this.timechangedayid,
          'TypeID': this.timewiseappointmentid,
          'AppointmentDate': this.timechangedate
        }
        this.docservice.InsertDiagnosticRelatedSlotsByDateWise(entity).subscribe(data => {
          this.docservice.GetDiagnosticCancelledAppointmentByDateWise(this.diagnosticid, this.timewisechangeslotlist[i].id, this.timechangedate).subscribe(data => {
          })
          debugger
        })
      }
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.getWorkingdetils();
        this.timewiseappointmentid="";
        this.timechangedate="";
        this.mrngtoid = "";
        this.mrngtoid="";
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.getWorkingdetils();
        this.timewiseappointmentid="";
        this.timechangedate="";
        this.mrngtoid = "";
        this.mrngtoid="";
      }
    }
  }
}






