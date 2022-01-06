import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-nurse-schedule',
  templateUrl: './nurse-schedule.component.html',
  styleUrls: ['./nurse-schedule.component.css']
})
export class NurseScheduleComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  public timeSheetTablearray = [];
  public TodatDate: any;
  public languageid: any;
  public workingdetails: any;
  showmonth: any;
  month: any;
  year: any;
  labels: any;
  Select: any;
  public nurseid: any;
  public Workinglist: any;
  public dummlist: any;
  public nurselist: any;
  public count: any;
  public hospitalclinicid: any;
  public nursedd = {};
  public search: any;
  todaydate: any;
  public DayDatelist: any;
  today = new Date();
  term:any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    // this.timeSheetTablearray = [];
    // this.TodatDate = new Date();
    // var date = new Date();
    this.getlanguage()

    this.getnurselist();
    this.GetMorningSlotsMasterbyid();


    // var startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // var Lastdate;
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    //
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // this.month = date.getMonth();
    // this.year = date.getFullYear();

    // var startdate = new Date(this.year, this.month, 1);
    // var Lastdate;
    // var firstDay = new Date(this.year, this.month, 1).getDate();

    // var lastDay = new Date(this.year, this.month + 1, 0).getDate();


    // this.showmonth = new Date(startdate).toDateString().substring(4, 7);



  }




  public getnurselist() {
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.nurselist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.nurselist.length;

          this.nursedd = {
            singleSelection: true,
            idField: 'nurseID',
            textField: 'nurseName',
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
    else if (this.hospitalclinicid == undefined) {
      this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.nurselist = data;
          this.count = this.nurselist.length;

          this.nursedd = {
            singleSelection: true,
            idField: 'nurseID',
            textField: 'nurseName',
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

  public GetNurseWorkingDetailsDyWise() {
    debugger
    this.docservice.GetNurseWorkingDetailsDyWise(this.nurseid, this.slotTypeID, this.todaydate, this.languageid).subscribe(
      data => {
        //this.workingdetails = data;
        this.DayDatelist = data[0];
        debugger
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
        this.workingdetails = data[1];

        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      }
    )
  }

  nursehospitalid: any;
  showcalender:any;
  slotTypeID:any;

  public GetNurseID(item: any) {
    this.nurseid = item.nurseID;
    var list = this.nurselist.filter(x => x.nurseID == this.nurseid);
    this.nursehospitalid = list[0].nursehospitalid,
    this.slotTypeID = list[0].slotDurationID
    this.spinner.show();
    this.showcalender=1;
    this.GetNurseWorkingDetailsDyWise();

  }




  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.Select = this.labels[0].selectNurse;
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

  patientid: any;
  email: any;
  mobileno: any;
  nursename: any;
  notificationdate: any;
  appointmentid: any;
  patientname: any;

  public insertdetails() {
    this.spinner.show();
    debugger
    this.docservice.GetNurseAppointmentdabySlot(this.nurseid, this.slotID, this.appointmentdate).subscribe(data1 => {
      debugger
      if (data1.length != 0) {

        var list = data1[0];
        this.patientid = list.relationPatientID,
          this.email = list.pEmail,
          this.mobileno = list.pMobileNo,
          this.nursename = list.nurseName,
          this.notificationdate = list.notificationdate,
          this.appointmentid = list.id,
          this.patientname = list.pName
        // this.Insertnotificatiacceptforcansel();
        // this.insercancelnotoification();
        this.SendCancelPatientmail();
      } error => {
        this.spinner.hide();
      }
    })
    debugger
    this.docservice.GetNurseCancelledAppointmentByDateWise(this.nurseid, this.slotID, this.appointmentdate).subscribe(data => {
      debugger
    })

    debugger
    var entity = {
      'NurseHospitalDetailsID': this.nursehospitalid,
      'NurseID': this.nurseid,
      'DayID': this.dayid,
      'SlotID': this.slotID,
      'Fees': this.fees,
      'AppointmentDate': this.appointmentdate,
      'AppointmentTypeID': this.appointmentypeid,
    }
    debugger
    this.docservice.InsertNurseWorkingDetails_DateWise(entity).subscribe(data => {
      debugger
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
      }
      else {
        Swal.fire('Mis à jour avec succés');
      }
      this.GetNurseWorkingDetailsDyWise();

    })


  }

  emailattchementurl = [];
  cclist = [];
  bcclist = [];
  public SendCancelPatientmail() {
    debugger
    var entity = {
      'emailto': this.email,
      'emailsubject': "Your Nurse " + this.nursename + " Has Cancelled Your Appointment At Time " + this.notificationdate,
      'emailbody': 'Dear ' + this.patientname + ',' + "<br><br>" + 'We regret to inform that your Doctor ' + this.nursename + ' has cancelled your appointment of ' + this.notificationdate + '. Please use voiladoc app to reschedule or ask for refund. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }


  public GetDate(newDate: Date) {
    this.spinner.show();
    // this.todaydate = even.toLocaleString().split(',')[0];

    this.todaydate = this.docservice.GetDates(newDate)

    this.GetNurseWorkingDetailsDyWise();
  }

  typeID: any;


  public GetTypeID(even) {
    this.typeID = even.target.value;
    this.fees = ""
  }





  //datewise
  daychangedate: any;
  Daywiseappointmentid: any;
  applist: any;
  appcount: any;


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
        this.docservice.GetBookAppointmentByDateWiseAppointmentCount(this.daychangedate, this.nurseid).subscribe(data => {
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
        this.docservice.GetBookAppointmentByDateWiseAppointmentCount(this.daychangedate, this.nurseid).subscribe(data => {
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
  mrngfromlist: any;

  public GetMorningSlotsMasterbyid() {

    this.docservice.GetSlotMasterTimings(this.slotTypeID).subscribe(
      data => {

        this.slotslist = data;
        this.mrngfromlist = data;
      }, error => {
      }
    )
  }




  slotslist: any;
  daychangedate1: any;

  public InsertDayWiseSlots() {

    if (this.daychangedate == undefined || this.daychangedate == null) {
      Swal.fire('Please Select Date')
    }
    else if (this.Daywiseappointmentid == undefined || this.Daywiseappointmentid == null) {
      Swal.fire('Please Select Type')
    }
    else {

      for (let j = 0; j < this.slotslist.length; j++) {
        debugger
        this.docservice.GetNurseAppointmentdabySlot(this.nurseid, this.slotslist[j].id, this.daychangedate).subscribe(data1 => {

          if (data1.length != 0) {

            var list = data1[0];
            this.patientid = list.relationPatientID,
              this.email = list.pEmail,
              this.mobileno = list.pMobileNo,
              this.nursename = list.nurseName,
              this.notificationdate = list.notificationdate,
              this.appointmentid = list.id,
              this.patientname = list.pName
            // this.Insertnotificatiacceptforcansel();
            // this.insercancelnotoification();
            this.SendCancelPatientmail();
            this.GetNurseWorkingDetailsDyWise();
          }

        })

        this.docservice.GetNurseCancelledAppointmentByDateWise(this.nurseid, this.slotslist[j].id, this.daychangedate).subscribe(data => {
        })
        var entity = {
          'NurseHospitalDetailsID': this.nursehospitalid,
          'NurseID': this.nurseid,
          'DayID': this.datechangedayid,
          'SlotID': this.slotslist[j].id,
          'Fees': this.fees,
          'AppointmentDate': this.daychangedate,
          'AppointmentTypeID': this.Daywiseappointmentid
        }
        this.docservice.InsertNurseWorkingDetails_DateWise(entity).subscribe(data => {


        })
      }

      this.GetNurseWorkingDetailsDyWise();
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

  dayslist: any;
  dayname: any;
  dayidslist: any;
  datechangedayid: any;

  public GetdaychangeDate(newDate: Date) {
    // this.daychangedate = even.toLocaleString().split(',')[0];
    this.daychangedate = this.docservice.GetDates(newDate)
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


  timechangedate: any;
  timechangedayid: any;
  public GetTimewisechangedate(newDate: Date) {

    this.timechangedate = this.docservice.GetDates(newDate)
    // this.timechangedate = even.toLocaleString().split(',')[0];
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
  mrngfromslot: any;
  mrngfromid: any;
  mrngtolist: any;
  mrngtoid: any;
  timewisechangeslotlist: any;

  public getmrngfrom(even) {
    this.mrngfromid = even.target.value;
    debugger
    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
    var qwerty = this.mrngfromlist.filter(x => x.id == this.mrngfromid);
    this.mrngfromslot = qwerty[0].slots;
    this.mrngtolist = this.mrngfromlist.filter(x => x.id > this.mrngfromid);
    this.mrngtoid = "";
  }
  mrngtoslot: any;

  public getmrngto(even) {
    this.mrngtoid = even.target.value;
    debugger
    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
    var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
    this.mrngtoslot = qwerty[0].slots;
    debugger
    this.timewisechangeslotlist = this.slotslist.filter(x => x.id >= this.mrngfromid && x.id <= this.mrngtoid)
  }





  timewiseappointmentid:any;
  totalappcount:any;
  timechangedate1:any;



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
        // this.GetGetSlotsByIDPlanning();
        Swal.fire({
          title: 'Are you sure?',
          text: "You have " + this.totalappcount + " bookings. The patient(s) will be notified of the cancellation and offered the choice to reschedule or get a refund.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
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
          title: 'Êtes-vous sûr?',
          text: "Vous avez  " + this.totalappcount + " rendez-vous. Le(s) patient(s) sera/seront notifié(s) de l'annulation et pourra/pourront choisir entre replanifier ou un remboursement.",
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
      if (this.languageid == 1) { }
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
        debugger
        this.docservice.GetNurseAppointmentdabySlot(this.nurseid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data1 => {
          debugger
          if (data1.length != 0) {
            debugger
            var list = data1[0];
            this.patientid = list.relationPatientID,
              this.email = list.pEmail,
              this.mobileno = list.pMobileNo,
              this.nursename = list.nurseName,
              this.notificationdate = list.notificationdate,
              this.appointmentid = list.id,
              this.patientname = list.pName
          
            this.SendCancelPatientmail();
            this.GetNurseWorkingDetailsDyWise();
            debugger
          }
        })
        this.docservice.GetNurseCancelledAppointmentByDateWise(this.nurseid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data => {
          debugger
        })
          var entity = {
            'NurseHospitalDetailsID': this.nursehospitalid,
            'NurseID': this.nurseid,
            'DayID': this.timechangedayid,
            'SlotID': this.timewisechangeslotlist[j].id,
            'Fees': this.fees,
            'AppointmentDate': this.timechangedate,
            'AppointmentTypeID': this.timewiseappointmentid
          }
        this.docservice.InsertNurseWorkingDetails_DateWise(entity).subscribe(data => {

       
        })
      }

    
      this.GetNurseWorkingDetailsDyWise();
      this.spinner.show();
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
      }
      else {
        Swal.fire('Mis à jour avec succés');
      }
      this.timewiseappointmentid = "";
      this.timechangedate1 = "";
      this.timechangedate = "";
      this.mrngtoid = "";
      this.mrngfromid = "";
      this.fees = ""

    }
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

}
