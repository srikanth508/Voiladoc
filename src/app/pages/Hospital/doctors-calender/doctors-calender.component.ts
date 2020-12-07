import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-doctors-calender',
  templateUrl: './doctors-calender.component.html',
  styleUrls: ['./doctors-calender.component.css']
})
export class DoctorsCalenderComponent implements OnInit {
  head1: any;

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  public timeSheetTablearray = [];
  public TodatDate: any;
  public doctorid: any;
  public languageid: any;
  public workingdetails: any;
  showmonth: any;
  month: any;
  year: any;
  labels: any;
  Select: any;
  hospitalid: any;
  dummlist: any;
  doctorlist: any;
  public docdd = {};
  public search: any;
  public today = new Date();
  public todaydate: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');
    debugger
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    debugger

    this.getlanguage()
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.Select = this.labels[0].selectDoctor;
        this.search = this.labels[0].search;

      }, error => {
      }
    )
    debugger

    debugger
    this.docservice.GetDoctorHospitalDetailsDoctors(this.languageid).subscribe(
      data => {
        this.dummlist = data;
        this.doctorlist = this.dummlist.filter(x => x.hospital_ClinicID == this.hospitalid)
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

    this.mrngfromid = "";
    this.mrngtoid = "";
  }

  public DayDatelist: any;
  public slottypeid: any;


  public date1: any;
  public day1: any;



  public date2: any;
  public day2: any;


  public date3: any;
  public day3: any;


  public date4: any;
  public day4: any;

  public date5: any;
  public day5: any;

  public date6: any;
  public day6: any;

  public date7: any;
  public day7: any;

  public GetMyDoctorWorkingDetails() {
    debugger
    this.docservice.GetDoctorcalenderSlotsByDoctorID(this.doctorid, this.slottypeid, this.todaydate, this.languageid).subscribe(
      data => {
        this.spinner.hide();
        debugger
        //this.workingdetails = data;
        this.DayDatelist = data[0];

        this.date1 = this.DayDatelist[0].date,
          this.day1 = this.DayDatelist[0].day

        this.date2 = this.DayDatelist[1].date,
          this.day2 = this.DayDatelist[1].day

        this.date3 = this.DayDatelist[2].date,
          this.day3 = this.DayDatelist[2].day

        this.date4 = this.DayDatelist[3].date,
          this.day4 = this.DayDatelist[3].day

        this.date5 = this.DayDatelist[4].date,
          this.day5 = this.DayDatelist[4].day

        this.date6 = this.DayDatelist[5].date,
          this.day6 = this.DayDatelist[5].day

        this.date7 = this.DayDatelist[6].date,
          this.day7 = this.DayDatelist[6].day
        // let sfdsfd=this.DayDatelist.map("date");
        // this.head1=sfdsfd[0];
        this.workingdetails = data[1];
        debugger

      }, error => {
      }
    )
  }

  public showtable = 1;
  public dummlist2: any;

  public GetDoctorID(item: any) {
    this.doctorid = ""
    this.showtable = 1;
    debugger
    this.doctorid = item.doctorID
    this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
      data => {
        this.spinner.show();
        this.dummlist2 = data;
        var list = this.dummlist2.filter(x => x.id == this.doctorid)
        this.slottypeid = list[0].slotDurationID
        this.GetMorningSlotsMasterbyid();
        this.GetMyDoctorWorkingDetails();
      }, error => {
      }
    )

    this.docservice.GetDoctorHospitalsByDoctorID(this.languageid, this.doctorid).subscribe(
      data => {
        this.hosptalist = data;
        this.dochospitalid = this.hosptalist[0].id

      }, error => {
      }
    )
    if (this.doctorid == undefined) {
      this.showcalender = 0
    }
    else {
      this.showcalender = 1
    }
  }
  public hosptalist: any;
  public showcalender: any;



  public GetDoctorDates(even) {
    this.spinner.show();
    debugger
    this.todaydate = even.toLocaleString().split(',')[0];
    debugger
    this.GetMyDoctorWorkingDetails();
  }

  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.Select = this.labels[0].selectDoctor;
        this.search = this.labels[0].search;

      }, error => {
      }
    )
  }






  public dayid: any;
  public slotID: any;
  public appointmenttypeid: any;
  public dochospitalid: any;
  public appointmentdate: any;
  public appointmentypeid: any;




  public GetDay1List(details) {
    this.appointmentypeid = '';
    debugger
    this.dayid = details.day1DayID
    this.slotID = details.day1SlotID
    this.appointmentypeid = details.day1AppointmentTypeID,
      this.appointmentdate = details.day1AppointmentDate
    debugger

  }



  public GetDay2List(details) {
    this.appointmentypeid = '';
    debugger
    this.dayid = details.day2DayID
    this.slotID = details.day2SlotID
    this.appointmentypeid = details.day2AppointmentTypeID,
      this.appointmentdate = details.day2AppointmentDate
    debugger

  }


  public GetDay3List(details) {
    this.appointmentypeid = '';
    debugger
    this.dayid = details.day3DayID
    this.slotID = details.day3SlotID
    this.appointmentypeid = details.day3AppointmentTypeID,
      this.appointmentdate = details.day3AppointmentDate
    debugger

  }


  public GetDay4List(details) {
    this.appointmentypeid = '';
    debugger
    this.dayid = details.day4DayID
    this.slotID = details.day4SlotID
    this.appointmentypeid = details.day4AppointmentTypeID,
      this.appointmentdate = details.day4AppointmentDate
    debugger
  }

  public GetDay5List(details) {
    this.appointmentypeid = '';
    debugger
    this.dayid = details.day5DayID
    this.slotID = details.day5SlotID
    this.appointmentypeid = details.day5AppointmentTypeID,
      this.appointmentdate = details.day5AppointmentDate
    debugger
  }

  public GetDay6List(details) {
    this.appointmentypeid = '';
    debugger
    this.dayid = details.day6DayID
    this.slotID = details.day6SlotID
    this.appointmentypeid = details.day6AppointmentTypeID,
      this.appointmentdate = details.day6AppointmentDate
    debugger
  }


  public GetDay7List(details) {
    this.appointmentypeid = '';
    debugger
    this.dayid = details.day7DayID
    this.slotID = details.day7SlotID
    this.appointmentypeid = details.day7AppointmentTypeID,
      this.appointmentdate = details.day7AppointmentDate
    debugger

  }


  public insertdetails() {
    var entity = {
      'SlotID': this.slotID,
      'DoctorID': this.doctorid,
      'DayID': this.dayid,
      'Hospital_ClinicID': this.hospitalid,
      'DoctorHospitalDetailsID': this.dochospitalid,
      'AppointmentTypeID': this.appointmentypeid,
      'AppointmentDate': this.appointmentdate
    }
    this.docservice.InsertDoctorSlots_DateWiseAvailable(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
      }
      else {
        Swal.fire('Mis à jour avec succés');
      }
      this.docservice.GetDoctorCancelledAppointmentByDateWise(this.doctorid, this.slotID, this.appointmentdate).subscribe(data => {
        this.docservice.GetDoctorAppointmentByDateBySlot(this.doctorid, this.slotID, this.appointmentdate).subscribe(data1 => {
          debugger
          if (data1.length != 0) {
            debugger
            var list = data1[0];
            this.patientid = list.relationPatientID,
              this.email = list.pEmail,
              this.mobileno = list.pMobileNo,
              this.doctorname = list.doctorName,
              this.notificationdate = list.notificationdate,
              this.appointmentid = list.id,
              this.patientname = list.pName
            this.Insertnotificatiacceptforcansel();
            this.insercancelnotoification();
            this.SendCancelPatientmail();
          }
        })

        this.GetMyDoctorWorkingDetails();
        this.spinner.show();
      })


    })
  }


  public patientid: any;
  public email: any;
  public mobileno: any;
  public doctorname: any;
  public notificationdate: any;
  public appointmentid: any;
  public patientname: any;



  // public GetBookappoinmentpatientDetails() {
  //   this.docservice.GetDoctorAppointmentByDateBySlot(this.doctorid, this.slotID, this.appointmentdate).subscribe(data => {
  //     if(data.length!=0)

  //     var list = data[0];
  //     this.patientid = list.relationPatientID,
  //       this.email = list.pEmail,
  //       this.mobileno = list.pMobileNo


  //   })
  // }



  public Insertnotificatiacceptforcansel() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Dr." + this.doctorname + " has cancelled your appointment scheduled for " + this.notificationdate,
        'ToUser': this.email,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Dr." + this.doctorname + " a annulé votre rendez-vous prévu pour " + this.notificationdate,
        'ToUser': this.email,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }

  public emailattchementurl = []
  public cclist: any;
  public bcclist: any;


  public SendCancelPatientmail() {
    debugger
    var entity = {
      'emailto': this.email,
      'emailsubject': "Your Doctor " + this.doctorname + " Has Cancelled Your Appointment At Time " + this.notificationdate,
      'emailbody': 'Dear ' + this.patientname + ',' + "<br><br>" + 'We regret to inform that your Doctor ' + this.doctorname + ' has cancelled your appointment of ' + this.notificationdate + '. Please use voiladoc app to reschedule or ask for refund. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }




  public insercancelnotoification() {
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.patientid,
        'Notification': "Appointment Cancelled By Doctor.",
        'Description': "Dr." + this.doctorname + " has cancelled your appointment scheduled for " + this.notificationdate,
        'NotificationTypeID': 11,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.patientid,
        'Notification': "Rendez-vous annulé par le médecin.",
        'Description': "Dr." + this.doctorname + "a annulé votre rendez-vous prévu pour " + this.notificationdate,
        'NotificationTypeID': 11,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }

      })
    }
  }






  // Full Day Slot Change By date


  public typeID: any;

  public GetTypeID(even) {
    this.typeID = even.target.value;
  }



  public daychangedate: any;
  public dayslist: any;
  public dayname: any;
  public dayidslist: any;
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

  public slotslist: any;
  public mrngfromlist: any;

  public GetMorningSlotsMasterbyid() {

    this.docservice.GetSlotsMasterByID(1, this.slottypeid).subscribe(
      data => {
        debugger
        this.slotslist = data;
        this.mrngfromlist = data;
      }, error => {
      }
    )
  }



  public Daywiseappointmentid: any;


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
      for (let j = 0; j < this.slotslist.length; j++) {
        var entity = {
          'SlotID': this.slotslist[j].id,
          'DoctorID': this.doctorid,
          'DayID': this.datechangedayid,
          'Hospital_ClinicID': this.hospitalid,
          'DoctorHospitalDetailsID': this.dochospitalid,
          'AppointmentTypeID': this.Daywiseappointmentid,
          'AppointmentDate': this.daychangedate
        }
        this.docservice.InsertDoctorSlots_DateWiseAvailable(entity).subscribe(data => {

          this.docservice.GetDoctorCancelledAppointmentByDateWise(this.doctorid, this.slotslist[j].id, this.daychangedate).subscribe(data => {
            this.docservice.GetDoctorAppointmentByDateBySlot(this.doctorid, this.slotslist[j].id, this.daychangedate).subscribe(data1 => {
              debugger
              if (data1.length != 0) {
                debugger
                var list = data1[0];
                this.patientid = list.relationPatientID,
                  this.email = list.pEmail,
                  this.mobileno = list.pMobileNo,
                  this.doctorname = list.doctorName,
                  this.notificationdate = list.notificationdate,
                  this.appointmentid = list.id,
                  this.patientname = list.pName
                this.Insertnotificatiacceptforcansel();
                this.insercancelnotoification();
                this.SendCancelPatientmail();
                this.GetMyDoctorWorkingDetails();
              }
            })
          })
        })
      }
      this.GetMyDoctorWorkingDetails();
      this.spinner.show();
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
      }
      else {
        Swal.fire('Mis à jour avec succés');
      }
      this.Daywiseappointmentid = "";
      this.daychangedate = ""
    }
  }




  // time wise changes

  public timechangedayid: any;
  public timechangedate: any;

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

  public getmrngto(even) {
    this.mrngtoid = even.target.value;
    var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
    this.mrngtoslot = qwerty[0].slots;
    this.GetGetSlotsByIDPlanning();
  }

  public timewisechangeslotlist: any;

  public GetGetSlotsByIDPlanning() {
    this.docservice.GetSlotsByIDPlanning(this.mrngfromid, this.mrngtoid).subscribe(data => {
      debugger

      this.timewisechangeslotlist = data;

    }, error => {
    })
  }


  public timewiseappointmentid: any;


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
      for (let j = 0; j < this.timewisechangeslotlist.length; j++) {
        var entity = {
          'SlotID': this.timewisechangeslotlist[j].id,
          'DoctorID': this.doctorid,
          'DayID': this.timechangedayid,
          'Hospital_ClinicID': this.hospitalid,
          'DoctorHospitalDetailsID': this.dochospitalid,
          'AppointmentTypeID': this.timewiseappointmentid,
          'AppointmentDate': this.timechangedate
        }
        this.docservice.InsertDoctorSlots_DateWiseAvailable(entity).subscribe(data => {

          this.docservice.GetDoctorCancelledAppointmentByDateWise(this.doctorid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data => {
            this.docservice.GetDoctorAppointmentByDateBySlot(this.doctorid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data1 => {
              debugger
              if (data1.length != 0) {
                debugger
                var list = data1[0];
                this.patientid = list.relationPatientID,
                  this.email = list.pEmail,
                  this.mobileno = list.pMobileNo,
                  this.doctorname = list.doctorName,
                  this.notificationdate = list.notificationdate,
                  this.appointmentid = list.id,
                  this.patientname = list.pName
                this.Insertnotificatiacceptforcansel();
                this.insercancelnotoification();
                this.SendCancelPatientmail();
                this.GetMyDoctorWorkingDetails();
              }
            })
          })
        })
      }
      this.GetMyDoctorWorkingDetails();
      this.spinner.show();
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
      }
      else {
        Swal.fire('Mis à jour avec succés');
      }
      this.timewiseappointmentid = "";
      this.timechangedate = "";
      this.mrngtoid = "";
      this.mrngfromid = "";
    }
  }


}
