import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { DatePipe } from '@angular/common';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

@Component({
  selector: 'app-nurse-appointments',
  templateUrl: './nurse-appointments.component.html',
  styleUrls: ['./nurse-appointments.component.css']
})
export class NurseAppointmentsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private datePipe: DatePipe) { }

  public term: any;
  public nurseid: any;
  public appointmentist: any;
  public canappointmentid: any;
  public reason: any;
  public acceptappointmentid: any;
  public availbledate: any;
  time: any;
  public acceptnurseid: any;
  public todaydate: any;
  public CurrentTime: any;
  public serverdate: any;
  public servertime: any;
  public serverdateandtime: any;
  public slottime: any;
  public appdate: any;
  public aaceptslots: any;
  public acceptnursename: any;
  public accepthospital: any;
  public acceppatientid: any;
  public accemail: any;
  public visitnurse: any;
  public visithospital: any;
  public visitpatientid: any;
  public visitemail: any;
  public canslots: any;
  public cannursename: any;
  public canhospital: any;
  public canpatientid: any;
  public canemail: any;
  public availabletime: any;
  public ampmtime: any;
  public timee: any;
  public timingsss: any;

  public languageid: any;
  public labels: any;
  public dumlist: any;
  public totaladdmoney: any;

  startdate: any;
  enddate: any;
  value: any;
  SDate = new Date();
  EDate = new Date();

  public paidamount: any;
  public walletamount: any;

  ngOnInit() {
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };



    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    var kkk = this.SDate.setDate(this.SDate.getDate() - 1);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.nurseid = localStorage.getItem('nurseid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getnurselist();
    this.getserverdateandtime();
    debugger
    this.timingsss = this.datePipe.transform(this.availabletime, 'h:mm a');
    this.getlanguage()
  }

  public getlanguage() {
    this.docservice.GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }



  public getnurselist() {
    this.docservice.GetBook_Nurse_Appointment(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        debugger
        this.appointmentist = data;

      }, error => {
      }
    )
  }


  selectedDate(data) {
    debugger
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.getnurseappointments();
  }


  public getnurseappointments() {
    this.docservice.GetBook_Nurse_Appointment(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        debugger
        this.appointmentist = data;

      }, error => {
      }
    )
  }




  public getserverdateandtime() {
    debugger
    this.docservice.GetServerDateAndTime().subscribe(
      data => {
        debugger
        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate
      }, error => {
      }
    )
  }

  public GetCancelAppointmentID(id, bookedTime, appdate, nurseName, hospital_ClinicName, patientID, emailID, paidAmount, walletAmount) {
    debugger
    this.canappointmentid = id
    this.canslots = bookedTime;
    this.cannursename = nurseName;
    this.canhospital = hospital_ClinicName,
      this.canpatientid = patientID,
      this.canemail = emailID;
    this.paidamount = paidAmount;
    this.walletamount = walletAmount

    debugger
    this.totaladdmoney = Number(this.walletamount) + (this.paidamount)
    debugger

  }


  public updatedateails() {
    var entity = {
      'PatientID': this.canpatientid,
      'WalletAmount': this.totaladdmoney
    }
    this.docservice.UpdatePatientWalletDetails(entity).subscribe(data => {
      let res = data;
      // Swal.fire('Success', 'Wallet Balance Updated Successfully');
    })
  }



  public CancelAppointment() {
    this.docservice.UpdateBook_Nurse_AppointmentCancelledBit(this.canappointmentid).subscribe(
      data => {
        debugger

      }, error => {
      }
    )
    this.updatereson();
    this.updatedateails();
  }

  public updatereson() {
    debugger
    var entity = {
      'ID': this.canappointmentid,
      'ReasonForCancel': this.reason
    }
    this.docservice.UpdateBook_Nurse_AppointmentReasonForCancelBit(entity).subscribe(res => {
      let test = res;
      Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
      this.InsertCancellNotification();
      this.InsertNotiFicationCancel();
      this.getnurselist();
      this.getnurseappointments();


    })
  }

  public GetAcceptAppointmentID(id, nurseid, bookedTime, nurseName, hospital_ClinicName, patientID, emailID) {
    debugger
    this.acceptappointmentid = id;
    this.acceptnurseid = nurseid;
    this.aaceptslots = bookedTime;
    this.acceptnursename = nurseName;
    this.accepthospital = hospital_ClinicName;
    this.acceppatientid = patientID;
    this.accemail = emailID;
  }


  public acceptappointment() {
    this.docservice.UpdateBook_Nurse_AppointmentAcceptedBit(this.acceptappointmentid).subscribe(
      data => {
        debugger

      }, error => {
      }
    )
    this.InsertNextAvailableSlots();
    debugger
    this.insertAcceptNursenotoification();
    debugger
    this.InsertNotificationFORAccept();
  }

  public insertAcceptNursenotoification() {
    debugger
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.acceppatientid,
        'Notification': "Appointment Accepted By Nurse.",
        'Description': "Your Appointment with " + this.acceptnursename + " scheduled for " + this.aaceptslots + " at " + this.accepthospital + "has been Accepted.",
        'NotificationTypeID': 25,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.acceptappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.acceppatientid,
        'Notification': "Rendez-vous accepté par l'infirmière.",
        'Description': "Votre rendez-vous avec " + this.acceptnursename + " prévu pour " + this.aaceptslots + "a été accepté.",
        'NotificationTypeID': 25,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.acceptappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
      })
    }
  }
  public InsertNotificationFORAccept() {
    if (this.languageid == '1') {
      debugger
      var entity = {
        'Description': "Your Appointment with " + this.acceptnursename + " scheduled for " + this.aaceptslots + "has been Accepted.",
        'ToUser': this.accemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre rendez-vous avec " + this.acceptnursename + " prévu pour " + this.aaceptslots + "a été accepté.",
        'ToUser': this.accemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
      })
    }
  }


  public getfromampm(even) {
    debugger
    this.ampmtime = even.target.value;
  }


  public InsertNextAvailableSlots() {

    debugger
    var entity = {
      'AppointmentID': this.acceptappointmentid,
      'AvailabilityTime': this.time
    }
    this.docservice.UpdateNurse_AvailabilitySlotsTime(entity).subscribe(res => {
      let test = res;
      this.getnurselist();
      this.getnurseappointments();
      Swal.fire('Accepted', 'Appointment Accepted Successfully');

    })
  }



  // public InsertNextAvailableSlots() {
  //   debugger
  //   var entity = {
  //     'NurseID': this.acceptnurseid,
  //     'AppointmentID': this.acceptappointmentid,
  //     'AvailabilityDate': this.availbledate,
  //     'AvailabilityTime': this.availabletime
  //   }
  //   this.docservice.InsertNurse_AvailabilitySlots(entity).subscribe(res => {
  //     let test = res;
  //     this.getnurselist();
  //     Swal.fire('Accepted', 'Appointment Accepted Successfully');

  //   })
  // }
  public GetTime(even) {
    debugger
    this.time = even.target.value;
  }
  visitappid: any;

  public UpdateVisitedbit(id, bookedtime, apptDatetime, nurseName, hospital_ClinicName, patientID, emailID) {
    this.slottime = bookedtime;
    this.appdate = apptDatetime,
      this.visitnurse = nurseName;
    this.visithospital = hospital_ClinicName,
      this.visitpatientid = patientID;
    this.visitappid = id;
    this.visitemail = emailID,
      this.getserverdateandtime()
    if (this.serverdate >= this.appdate) {
      if (this.servertime >= this.slottime) {
        debugger;
        Swal.fire({
          title: 'Are you sure?',
          text: "The Patient has Visited!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Visited!'
        }).then((result) => {
          if (result.value) {
            this.docservice.UpdateBook_Nurse_AppointmentVisitedBit(id).subscribe(res => {
              let test = res;
              this.getnurselist();
              this.getnurseappointments();
              this.InsertVisitNotification();
              this.InsertNotiFicationVisited();
            })
            Swal.fire(
              'Yes!',
              'Patient has been Visited.',
              'success'
            )
            this.InsertVisitNotification();
            this.InsertNotiFicationVisited();
          }
          else {
            this.getnurselist();
            this.getnurseappointments();
          }
        })
      }
      else {
        Swal.fire("The Appointment Time Is +" + this.slottime)
      }
    }
  }




  public InsertCancellNotification() {
    debugger
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Appointment Cancelled By Nurse.",
        'Description': "Your Appointment with " + this.cannursename + " scheduled for " + this.canslots + " has been Cancelled.We have Loaded Back Your Wallet With Ar" + this.paidamount + " Please Use Same For Next Booking",
        'NotificationTypeID': 19,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.canappointmentid

      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }

      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Rendez-vous annulé par l'infirmière.",
        'Description': "Votre rendez-vous avec " + this.cannursename + " prévu pour " + this.canslots + " a été annulé.Hemos cargado su billetera con Ar" + this.paidamount + " Utilice el mismo para la próxima reserva",
        'NotificationTypeID': 19,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.canappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }

      })
    }
  }


  public InsertNotiFicationCancel() {
    if (this.languageid == '1') {
      debugger
      var entity = {
        'Description': "Your Appointment with " + this.cannursename + " scheduled for " + this.canslots + " has been Cancelled..We have Loaded Back Your Wallet With Ar" + this.paidamount + " Please Use Same For Next Booking",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {

      var entity = {
        'Description': "Votre rendez-vous avec" + this.cannursename + " prévu pour " + this.canslots + " a été annulé.Hemos cargado su billetera con Ar" + this.paidamount + " Utilice el mismo para la próxima reserva",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
      })
    }
  }

  AppointmentID;
  showimages;
  public nophoto: any;
  public GetIllnessPhotos(even) {
    this.AppointmentID = even;

    this.docservice.GetPatient_Nurse_Illnessphotos(this.AppointmentID).subscribe(
      data => {
        debugger
        this.showimages = data;
        if (this.showimages.length == 0) {
          this.nophoto = 1
        }
        else if (this.showimages.length != 0) {
          this.nophoto = 0
        }

      }, error => {
      }
    )

  }




  public InsertVisitNotification() {
    debugger
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.visitpatientid,
        'Notification': "Patient Visited By Successfully.",
        'Description': "Your Appointment with " + this.visitnurse + " scheduled for " + this.slottime + " has been Visited.",
        'NotificationTypeID': 25,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.visitappid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
        debugger
        if (data != 0) {
        }
      })
    }
    if (this.languageid == '6') {
      var entity = {
        'PatientID': this.visitpatientid,
        'Notification': "Patient visité par avec succès.",
        'Description': "Votre rendez-vous avec " + this.visitnurse + " prévu pour " + this.slottime + " a été visité.",
        'NotificationTypeID': 25,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.visitappid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }

      })
    }
  }
  public InsertNotiFicationVisited() {
    if (this.languageid == '1') {
      debugger
      var entity = {
        'Description': "Your Appointment with " + this.visitnurse + " scheduled for " + this.slottime + " has been Visited.",
        'ToUser': this.visitemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      debugger
      var entity = {
        'Description': "Votre rendez-vous avec " + this.visitnurse + " prévu pour " + this.slottime + " a été visité.",
        'ToUser': this.visitemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
      })
    }
  }

  public updateNotVisitBit(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "The Patient has Not Visited!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Not Visited!'
    }).then((result) => {
      if (result.value) {
        this.docservice.UpdateBook_Nurse_AppointmentNotVisitedBit(id).subscribe(res => {
          let test = res;
          this.getnurselist();
          this.getnurseappointments();

        })
        Swal.fire(
          'Yes!',
          'Patient has Not Visited.',
          'success'
        )
      }
      else {
        this.getnurselist();
        this.getnurseappointments();
      }
    })
  }

  ispatientpragnent: any;
  ispatientbreastfeed: any;

  public GetPatientPragnentornot(isPatientPragnent, ispatientbrestfeeding) {
    this.ispatientpragnent = isPatientPragnent;
    this.ispatientbreastfeed = ispatientbrestfeeding

  }
}




