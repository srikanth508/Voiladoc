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
  public daychangedate1: any;
  public timechangedate1: any;
  public term: any;

  myDateValue: Date;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    this.getlanguage()
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.Select = this.labels[0].selectDoctor;
        this.search = this.labels[0].search;
      }, error => {
      }
    )



    this.gethospitaldoctors();

    this.mrngfromid = "";
    this.mrngtoid = "";
  }

  public gethospitaldoctors() {
    if (this.hospitalid != undefined) {
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
    }
    else if (this.hospitalid == undefined) {
      this.docservice.GetDoctorHospitalDetailsDoctors(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.doctorlist = data;
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

    this.docservice.GetDoctorcalenderSlotsByDoctorID(this.doctorid, this.slottypeid, this.todaydate, this.languageid).subscribe(
      data => {
        this.spinner.hide();

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


      }, error => {
      }
    )
  }

  public showtable = 1;
  public dummlist2: any;

  public GetDoctorID(item: any) {
    this.doctorid = ""
    this.showtable = 1;

    this.doctorid = item.doctorID
    this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
      data => {
        this.spinner.show();
        this.dummlist2 = data;
        var list = this.dummlist2.filter(x => x.id == this.doctorid)
        this.slottypeid = list[0].slotDurationID,
          this.hospitalid = list[0].hospitalClinicID,
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



  public GetDoctorDates(newDate: Date) {
    this.spinner.show();

    // this.todaydate = even.toLocaleString().split(',')[0];
    this.todaydate = this.docservice.GetDates(newDate)

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
  public fees: any;




  public GetDay1List(details) {
    this.appointmentypeid = '';

    this.dayid = details.day1DayID
    this.slotID = details.day1SlotID
    this.appointmentypeid = details.day1AppointmentTypeID,
      this.appointmentdate = details.day1AppointmentDate,
      this.fees = details.mondayFees;


  }



  public GetDay2List(details) {
    this.appointmentypeid = '';

    this.dayid = details.day2DayID
    this.slotID = details.day2SlotID
    this.appointmentypeid = details.day2AppointmentTypeID,
      this.appointmentdate = details.day2AppointmentDate,
      this.fees = details.tuesdayFees;



  }


  public GetDay3List(details) {
    this.appointmentypeid = '';

    this.dayid = details.day3DayID
    this.slotID = details.day3SlotID
    this.appointmentypeid = details.day3AppointmentTypeID,
      this.appointmentdate = details.day3AppointmentDate,
      this.fees = details.wednessdayFees;


  }


  public GetDay4List(details) {
    this.appointmentypeid = '';

    this.dayid = details.day4DayID
    this.slotID = details.day4SlotID
    this.appointmentypeid = details.day4AppointmentTypeID,
      this.appointmentdate = details.day4AppointmentDate
    this.fees = details.thursdayFees;

  }

  public GetDay5List(details) {
    this.appointmentypeid = '';

    this.dayid = details.dayID
    this.slotID = details.day5SlotID
    this.appointmentypeid = details.day5AppointmentTypeID,
      this.appointmentdate = details.day5AppointmentDate,
      this.fees = details.fridayFees;

  }

  public GetDay6List(details) {
    this.appointmentypeid = '';

    this.dayid = details.day6DayID
    this.slotID = details.day6SlotID
    this.appointmentypeid = details.day6AppointmentTypeID,
      this.appointmentdate = details.day6AppointmentDate,
      this.fees = details.satdayFees;

  }


  public GetDay7List(details) {
    this.appointmentypeid = '';

    this.dayid = details.day7DayID
    this.slotID = details.day7SlotID
    this.appointmentypeid = details.day7AppointmentTypeID,
      this.appointmentdate = details.day7AppointmentDate,
      this.fees = details.sundayFees;


  }


  public insertdetails() {

    this.docservice.GetDoctorAppointmentByDateBySlot(this.doctorid, this.slotID, this.appointmentdate).subscribe(data1 => {

      if (data1.length != 0) {

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
    this.docservice.GetDoctorCancelledAppointmentByDateWise(this.doctorid, this.slotID, this.appointmentdate).subscribe(data => {

    })


    var entity = {
      'SlotID': this.slotID,
      'DoctorID': this.doctorid,
      'DayID': this.dayid,
      'Hospital_ClinicID': this.hospitalid,
      'DoctorHospitalDetailsID': this.dochospitalid,
      'AppointmentTypeID': this.appointmentypeid,
      'AppointmentDate': this.appointmentdate,
      'DoctorFees': this.fees
    }
    this.docservice.InsertDoctorSlots_DateWiseAvailable(entity).subscribe(data => {


      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
      }
      else {
        Swal.fire('Mis à jour avec succés');
      }
      this.insertbookappointmenttype();
      this.GetMyDoctorWorkingDetails();
      this.spinner.show();
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
    this.fees = 0;
  }



  public daychangedate: any;
  public dayslist: any;
  public dayname: any;
  public dayidslist: any;
  public datechangedayid: any;


  public GetdaychangeDate(newDate: Date) {

    // this.daychangedate = even.toLocaleString().split(',')[0];
    var d = new Date(newDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    this.daychangedate = month + "-" + day + "-" + year;

    this.Getdays()
  }



  public Getdays() {

    this.docservice.GetDaysHomecare(this.daychangedate).subscribe(data => {

      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName

      this.Getdayssid();
    }, error => {
    })
  }

  public Getdayssid() {
    this.docservice.GetDayID(this.dayname).subscribe(data => {

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

        this.slotslist = data;
        this.mrngfromlist = data;
      }, error => {
      }
    )
  }


  applist: any;
  appcount: any; s


  public InsertDayWiseAlert() {

    if (this.daychangedate == undefined || this.daychangedate == null) {
      if (this.languageid == 1) {
        Swal.fire('Please Select Date')
      }
      else {
        Swal.fire('Sélectionnez une date')
      }
    }
    else if (this.Daywiseappointmentid == undefined || this.Daywiseappointmentid == null) {
      if (this.languageid == 1) {
        Swal.fire('Please Select Type')
      }
      else {
        Swal.fire('Veuillez sélectionner le type')
      }
    }
    else {

      if (this.languageid == 1) {
        this.docservice.GetBookAppointmentByDateWiseAppointmentCount(this.daychangedate, this.doctorid).subscribe(data => {
          this.applist = data[0];
          this.appcount = this.applist.appcount

          Swal.fire({
            title: 'Are you sure?',
            text: "You have " + this.appcount + " bookings. The patient(s) will be notified of the cancellation and offered the choice to reschedule or get a refund.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed.                                                '

          }).then((result) => {
            if (result.value) {
              this.InsertDayWiseSlots();
            }
            else {
            }
          })
        })
      }
      else {
        this.docservice.GetBookAppointmentByDateWiseAppointmentCount(this.daychangedate, this.doctorid).subscribe(data => {
          this.applist = data[0];
          this.appcount = this.applist.appcount

          Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous avez " + this.appcount + " rendez-vous. Le(s) patient(s) sera/seront notifié(s) de l'annulation et pourra/pourront choisir entre replanifier ou un remboursement.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui continuer',
            cancelButtonText: 'Non'
          }).then((result) => {
            if (result.value) {
              this.InsertDayWiseSlots();
            }
            else {
            }
          })
        })
      }
    }

  }



  public Daywiseappointmentid: any;


  public InsertDayWiseSlots() {

    if (this.daychangedate == undefined || this.daychangedate == null) {
      Swal.fire('Please Select Date')
    }
    else if (this.Daywiseappointmentid == undefined || this.Daywiseappointmentid == null) {
      Swal.fire('Please Select Type')
    }
    else {

      for (let j = 0; j < this.slotslist.length; j++) {

        this.docservice.GetDoctorAppointmentByDateBySlot(this.doctorid, this.slotslist[j].id, this.daychangedate).subscribe(data1 => {

          if (data1.length != 0) {

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

        this.docservice.GetDoctorCancelledAppointmentByDateWise(this.doctorid, this.slotslist[j].id, this.daychangedate).subscribe(data => {

        })

        var entity = {
          'SlotID': this.slotslist[j].id,
          'DoctorID': this.doctorid,
          'DayID': this.datechangedayid,
          'Hospital_ClinicID': this.hospitalid,
          'DoctorHospitalDetailsID': this.dochospitalid,
          'AppointmentTypeID': this.Daywiseappointmentid,
          'AppointmentDate': this.daychangedate,
          'DoctorFees': this.fees
        }
        this.docservice.InsertDoctorSlots_DateWiseAvailable(entity).subscribe(data => {

          this.insertbookappointmenttype();
        })
      }
      this.insertbookappointmenttype();
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
      this.fees = ""
      this.daychangedate1 = ""

    }
  }



  // time wise changes

  public timechangedayid: any;
  public timechangedate: any;

  public GetTimewisechangedate(newDate: Date) {
    // this.timechangedate = even.toLocaleString().split(',')[0];

    this.timechangedate = this.docservice.GetDates(newDate)

    this.Getdaystime()

  }


  public Getdaystime() {

    this.docservice.GetDaysHomecare(this.timechangedate).subscribe(data => {

      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName

      this.Getdayssidbytime();
    }, error => {
    })
  }

  public Getdayssidbytime() {
    this.docservice.GetDayID(this.dayname).subscribe(data => {

      this.dayidslist = data;
      this.timechangedayid = this.dayidslist[0].dayID;

    }, error => {
    })
  }



  public gettimechange(even) {

    this.timewiseappointmentid = even.target.value;
    if (this.timewiseappointmentid == 4) {

    }
    else {
      this.mrngtoid = "";
      this.mrngfromid = "";
    }

  }


  public mrngfromid: any;
  public mrngfromslot: any;
  public mrngtolist: any;
  public mrngtoid: any;
  public mrngtoslot: any;




  public getmrngfrom(even) {
    this.mrngfromid = even.target.value;
    debugger
    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
      var qwerty = this.mrngfromlist.filter(x => x.id == this.mrngfromid);
      this.mrngfromslot = qwerty[0].slots;
      this.mrngtolist = this.mrngfromlist.filter(x => x.id > this.mrngfromid);
      this.mrngtoid = "";
    // }
    // else {
    //   this.docservice.GetDoctorSlotsGap(this.mrngfromid, this.timechangedate, 1, this.doctorid, this.timechangedayid, 1).subscribe(data => {
    //     debugger
    //     let data1 = data;
    //     if (data.length == 0) {
    //       var qwerty = this.mrngfromlist.filter(x => x.id == this.mrngfromid);
    //       this.mrngfromslot = qwerty[0].slots;
    //       this.mrngtolist = this.mrngfromlist.filter(x => x.id > this.mrngfromid);
    //       this.mrngtoid = "";
    //     }
    //     else {
    //       if (this.languageid == 1) {
    //         Swal.fire({ text: "We are sorry. This action cannot be initiated. Voiladoc tries to optimize your schedule and tasks so that you spend quality time with your patients. Therefore, please allow an interval of 30 minutes between two types of" });
    //         this.mrngfromid = "";
    //       }
    //       else {
    //         Swal.fire({ text: "Nous sommes désolés. Cette action ne peut pas être initiée. Voiladoc essaie d'optimiser votre emploi du temps et vos tâches afin que vous passiez du temps de qualité avec vos patients. Par conséquent, veuillez prévoir un intervalle de 30 minutes entre deux types de RDV. Veuillez revenir en arrière et réviser votre sélection. Merci !" });
    //         this.mrngfromid = "";
    //       }

    //     }
    //   })
    // }
  }

  public getmrngto(even) {
    this.mrngtoid = even.target.value;
    debugger
    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
      var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
      this.mrngtoslot = qwerty[0].slots;
      this.GetGetSlotsByIDPlanning();
    // }
    // else {


    //   this.docservice.GetDoctorSlotsGap(this.mrngtoid, this.timechangedate, 1, this.doctorid, this.timechangedayid, 2).subscribe(data => {
    //     if (data.length == 0) {
    //       debugger
    //       var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
    //       this.mrngtoslot = qwerty[0].slots;
    //       this.GetGetSlotsByIDPlanning();
    //     }
    //     else {
    //       debugger
    //       if (this.languageid == 1) {
    //         Swal.fire({ text: "We are sorry. This action cannot be initiated. Voiladoc tries to optimize your schedule and tasks so that you spend quality time with your patients. Therefore, please allow an interval of 30 minutes between two types of" });
    //         this.mrngtoid = "";
    //       }
    //       else {
    //         Swal.fire({ text: "Nous sommes désolés. Cette action ne peut pas être initiée. Voiladoc essaie d'optimiser votre emploi du temps et vos tâches afin que vous passiez du temps de qualité avec vos patients. Par conséquent, veuillez prévoir un intervalle de 30 minutes entre deux types de RDV. Veuillez revenir en arrière et réviser votre sélection. Merci !" });
    //         this.mrngtoid = "";
    //       }


    //     }
    //   })
    // }
    debugger
  }



  // public getmrngfrom(even) {
  //   this.mrngfromid = even.target.value;

  //   debugger
  //   this.docservice.GetDoctorSlotsGap(this.mrngfromid, this.timechangedate, 1, this.doctorid, this.timechangedayid, 1).subscribe(data => {
  //     debugger
  //     let data1 = data;
  //     if (data.length == 0) {
  //       var qwerty = this.mrngfromlist.filter(x => x.id == this.mrngfromid);
  //       this.mrngfromslot = qwerty[0].slots;
  //       this.mrngtolist = this.mrngfromlist.filter(x => x.id > this.mrngfromid);
  //       this.mrngtoid = "";
  //     }
  //     else {
  //       Swal.fire("Please Select Another Time ");
  //       this.mrngfromid = "";
  //     }
  //   })


  // }

  // public getmrngto(even) {
  //   this.mrngtoid = even.target.value;

  //   debugger
  //   this.docservice.GetDoctorSlotsGap(this.mrngtoid, this.timechangedate, 1, this.doctorid, this.timechangedayid, 2).subscribe(data => {
  //     if (data.length == 0) {
  //       debugger
  //       var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
  //       this.mrngtoslot = qwerty[0].slots;
  //       this.GetGetSlotsByIDPlanning();
  //     }
  //     else {
  //       debugger
  //       Swal.fire("Please Select Another Time");
  //       this.mrngtoid = "";

  //     }
  //   })

  // }

  public timewisechangeslotlist: any;
  public totalappcount: any;
  public slotappcount: any;

  public GetGetSlotsByIDPlanning() {
    this.docservice.GetSlotsByIDPlanning(this.mrngfromid, this.mrngtoid).subscribe(data => {

      this.timewisechangeslotlist = data;
      this.totalappcount = 0;
      for (let K = 0; K < this.timewisechangeslotlist.length; K++) {

        this.docservice.GetBookAppointmentByDateWiseAndSlotWiseAppointmentCount(this.timechangedate, this.doctorid, this.timewisechangeslotlist[K].id).subscribe(data => {
          this.applist = data[0];
          this.applist = data[1];
          this.slotappcount = this.applist.appcount
          this.totalappcount = Number(this.totalappcount) + Number(this.slotappcount);
        })
      }
    }, error => {
    })
  }

  public timewiseappointmentid: any;


  public InsertTineWiseAlert() {


    if (this.timechangedate == undefined || this.timechangedate == null) {
      if (this.languageid == 1) {
        Swal.fire('Please Select Date')
      }
      else {
        Swal.fire('Sélectionnez une date')
      }
    }
    else if (this.timewiseappointmentid == undefined || this.timewiseappointmentid == null) {
      if (this.languageid == 1) {
        Swal.fire('Please Select Type')
      }
      else {
        Swal.fire('Veuillez sélectionner le type')
      }
    }
    else if (this.mrngfromid == "" || this.mrngtoid == "") {
      if (this.languageid == 1) {
        Swal.fire('Please Select Time')
      }
      else {
        Swal.fire("Veuillez sélectionner l'heure")
      }
    }
    else {



      if (this.languageid == 1) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You have " + this.totalappcount + "bookings. The patient(s) will be notified of the cancellation and offered the choice to reschedule or get a refund.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed.'
        }).then((result) => {
          if (result.value) {
            this.InsertTimeWiseSlots();
          }
          else {
          }
        })
      }
      else if (this.languageid == 6) {
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: "Vous avez " + this.totalappcount + " rendez-vous. Le(s) patient(s) sera/seront notifié(s) de l'annulation et pourra/pourront choisir entre replanifier ou un remboursement.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui continuer',
          cancelButtonText: 'Non'
        }).then((result) => {
          if (result.value) {
            this.InsertTimeWiseSlots();
          }
          else {
          }
        })
      }
    }
  }



  public InsertTimeWiseSlots() {

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

      for (let j = 0; j < this.timewisechangeslotlist.length; j++) {

        this.docservice.GetDoctorAppointmentByDateBySlot(this.doctorid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data1 => {

          if (data1.length != 0) {

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

        this.docservice.GetDoctorCancelledAppointmentByDateWise(this.doctorid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data => {
        })

        var entity = {
          'SlotID': this.timewisechangeslotlist[j].id,
          'DoctorID': this.doctorid,
          'DayID': this.timechangedayid,
          'Hospital_ClinicID': this.hospitalid,
          'DoctorHospitalDetailsID': this.dochospitalid,
          'AppointmentTypeID': this.timewiseappointmentid,
          'AppointmentDate': this.timechangedate,
          'DoctorFees': this.fees
        }
        this.docservice.InsertDoctorSlots_DateWiseAvailable(entity).subscribe(data => {

        })
      }
      this.insertbookappointmenttype();
      this.GetMyDoctorWorkingDetails();
      this.spinner.show();
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.timewiseappointmentid = "";
        this.timechangedate = "";
        this.mrngtoid = "";
        this.mrngfromid = "";
        this.fees = ""
        this.timechangedate1 = "";
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.timewiseappointmentid = "";
        this.timechangedate = "";
        this.mrngtoid = "";
        this.mrngfromid = "";
        this.fees = ""
        this.timechangedate1 = "";
      }
      this.timewiseappointmentid = "";
      this.timechangedate = "";
      this.mrngtoid = "";
      this.mrngfromid = "";
      this.fees = ""
      this.timechangedate1 = "";

    }
  }

  public insertbookappointmenttype() {
    var entity = {
      'DoctorHospitalID': this.dochospitalid,
      'AppointmentTypeID': this.appointmentypeid
    }
    this.docservice.InsertBookAppointmentType(entity).subscribe(data => {
      if (data != undefined) {

      }
    })
  }



}
