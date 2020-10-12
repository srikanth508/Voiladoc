import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-midwife-appointments',
  templateUrl: './midwife-appointments.component.html',
  styleUrls: ['./midwife-appointments.component.css']
})
export class MidwifeAppointmentsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }


  public term: any;
  public appointmentist: any;

  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  public nurseid: any;
  public canappointmentid: any;
  public reason: any;
  public acceptappointmentid: any;
  public availbledate: any;
  time: any;
  public acceptmidwifeid: any;
  public CurrentTime: any;
  public id: any;
  public serverdate: any;
  public servertime: any;
  public serverdateandtime: any;
  public slottime: any;
  public appdate: any;
  public ampmtime: any;
  public languageid: any;
  public labels: any;

  public accpatientid: any;
  public accemailid: any;
  public acceptname: any;
  public accbookedtime: any;
  public canpatientid: any;
  public canemailid: any;
  public canname: any;
  public canbookedtime: any;
  public visipatientid: any;
  public visiemaild: any;
  public visiname: any;
  public paidamount: any;
  public walletAmount: any;
  public totaladdmoney: any;

  startdate: any;
  enddate: any;
  value: any;
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

    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.id = localStorage.getItem('midwifeid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getmidwifeappointments();
    this.getserverdateandtime();


    this.getlanguage()
  }
  public getlanguage() {
    this.docservice.GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }


  public getmidwifeappointments() {
    this.docservice.GetBook_Book_Midwives_Appointment(this.id, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        this.appointmentist = data;
      }, error => {
      }
    )
  }

  public getserverdateandtime() {
   
    this.docservice.GetServerDateAndTime().subscribe(
      data => {
       
        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate
      }, error => {
      }
    )
  }
  selectedDate(data) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.getphisyioappointments()
  }

  public getphisyioappointments() {
    this.docservice.GetBook_Book_Midwives_Appointment(this.id, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        this.appointmentist = data;
      }, error => {
      }
    )
  }

  public GetCancelAppointmentID(id, patientID, emailID, name, bookedTime, paidAmount, walletAmount) {
   
    this.canappointmentid = id
    this.canpatientid = patientID;
    this.canemailid = emailID;
    this.canname = name;
    this.canbookedtime = bookedTime;
    this.paidamount = paidAmount;
    this.walletAmount = walletAmount;


   
    this.totaladdmoney = Number(this.walletAmount) + (this.paidamount)
   
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
    this.docservice.UpdateBook_Midwives_AppointmentCancelledBit(this.canappointmentid).subscribe(
      data => {
       
        Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
      }, error => {
      }
    )
    this.updatereson();
    this.updatedateails();
    this.getmidwifeappointments();
    this.getphisyioappointments()
  }


  public updatereson() {
   
    var entity = {
      'ID': this.canappointmentid,
      'ReasonForCancel': this.reason
    }
    this.docservice.UpdateBook_Midwives_AppointmentReasonForCancel(entity).subscribe(res => {
      let test = res;
      Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
      this.getmidwifeappointments();
      this.getphisyioappointments()
      this.InsertCancelNotification();
      this.InsertNotiFicationcancel();

    })
  }

  public GetAcceptAppointmentID(id, midWivesID, patientID, emailID, name, bookedTime) {
    this.acceptappointmentid = id;
    this.acceptmidwifeid = midWivesID;
    this.accpatientid = patientID;
    this.accemailid = emailID;
    this.acceptname = name;
    this.accbookedtime = bookedTime;
  }




  public getfromampm(even) {
   
    this.ampmtime = even.target.value;
  }



  public acceptappointment() {
    this.docservice.UpdateBook_Midwives_AppointmentAcceptedBit(this.acceptappointmentid).subscribe(
      data => {
       

      }, error => {
      }
    )
    this.InsertNextAvailableSlots();
  }

  public InsertNextAvailableSlots() {
   
    var entity = {
      // 'MidWifeID': this.acceptmidwifeid,
      'AppointmentID': this.acceptappointmentid,
      // 'AvailabilityDate': this.availbledate,
      'AvailabilityTime': this.time 
    }
    this.docservice.UpdateBook_MidWifeAvailabilitySlotsTime(entity).subscribe(res => {
      let test = res;
      this.getmidwifeappointments();
      this.getphisyioappointments()
      Swal.fire('Accepted', 'Appointment Accepted Successfully');
      this.InsertAcceptNotification();
      this.InsertNotiFicationAccepted();

    })
  }
  public GetTime(even) {
   
    this.time = even.target.value;
  }

  public UpdateVisitedbit(id, bookedTime, appdate, patientID, emailID, name) {
    this.slottime = bookedTime;
    this.appdate = appdate;
    this.visipatientid = patientID;
    this.visiemaild = emailID;
    this.visiname = name;
    this.visitappointid=id;

   
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
        this.docservice.UpdateBook_Midwives_AppointmentIsVisitedBit(id).subscribe(res => {
          let test = res;
          this.getmidwifeappointments();
          this.getphisyioappointments();
          this.InsertVisitedNotification();
          this.InsertNotiFicationVisited();
        })
        Swal.fire(
          'Yes!',
          'Patient has been Visited.',
          'success'
        )
      }
      else {
        this.getmidwifeappointments();
        this.getphisyioappointments()
      }
    })

  }
 


  public UpdatePatientNotVisitedBit(id) {
   
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
        this.docservice.UpdateBook_Midwives_AppointmentNotVisitedBit(id).subscribe(res => {
          let test = res;
          this.getmidwifeappointments();
          this.getphisyioappointments()
        })
        Swal.fire(
          'Yes!',
          'Patient has Not Visited.',
          'success'
        )
      }
      else {
        this.getmidwifeappointments();
        this.getphisyioappointments()
      }
    })
  }




  //accept notification



  public InsertAcceptNotification() {
   
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.accpatientid,
        'Notification': "Appointment Accepted by MidWife.",
        'Description': "Your Appointment with " + this.acceptname + " scheduled for " + this.accbookedtime + " has been Accepted.",
        'NotificationTypeID': 27,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID':this.acceptappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
       
        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.accpatientid,
        'Notification': "Nomination acceptée par la sage-femme.",
        'Description': "Votre rendez-vous avec " + this.acceptname + " prévu pour " + this.accbookedtime + " a été accepté.",
        'NotificationTypeID': 27,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID':this.acceptappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
       
        if (data != 0) {

        }

      })
    }
  }
  public InsertNotiFicationAccepted() {
   
    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Appointment with " + this.acceptname + " scheduled for " + this.accbookedtime + " has been Accepted.",
        'ToUser': this.accemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre rendez-vous avec " + this.acceptname + " prévu pour " + this.accbookedtime + " a été accepté.",
        'ToUser': this.accemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
  }



  //cancel notification




  public InsertCancelNotification() {
   
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Appointment Cancelled by MidWife.",
        'Description': "Your Appointment with " + this.canname + " scheduled for " + this.canbookedtime + " has been Cancelled.We have Loaded Back Your Wallet With Ar" + this.paidamount + " Please Use Same For Next Booking",
        'NotificationTypeID': 24,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID':this.canappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
       
        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Rendez-vous annulé par la sage-femme.",
        'Description': "Votre rendez-vous avec " + this.canname + " prévu pour " + this.canbookedtime + " a été annulé.Hemos cargado su billetera con Ar" + this.paidamount + " Utilice el mismo para la próxima reserva",
        'NotificationTypeID': 24,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID':this.canappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
       
        if (data != 0) {

        }

      })
    }
  }
  public InsertNotiFicationcancel() {
   
    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Appointment with " + this.canname + " scheduled for " + this.canbookedtime + " has been Cancelled.We have Loaded Back Your Wallet With Ar" + this.paidamount + " Please Use Same For Next Booking",
        'ToUser': this.canemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre rendez-vous avec " + this.canname + " prévu pour " + this.canbookedtime + " a été annulé.Hemos cargado su billetera con Ar" + this.paidamount + " Utilice el mismo para la próxima reserva",
        'ToUser': this.canemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
  }

  visitappointid:any;
  //visited notification

  public InsertVisitedNotification() {
   
    if (this.languageid == '1') {
      ``
      var entity = {
        'PatientID': this.visipatientid,
        'Notification': "Appointment Visited",
        'Description': "Your Appointment with " + this.visiname + " scheduled for " + this.slottime + " has been Visited.",
        'NotificationTypeID': 12,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID':this.visitappointid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
       
        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.visipatientid,
        'Notification': "Rendez-vous visité.",
        'Description': "Votre rendez-vous avec " + this.visiname + " prévu pour " + this.slottime + " a été visité.",
        'NotificationTypeID': 27,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID':this.visitappointid,
        
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
       
        if (data != 0) {

        }

      })
    }
  }
  public InsertNotiFicationVisited() {
   
    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Appointment with " + this.visiname + " scheduled for " + this.slottime + " has been Visited.",
        'ToUser': this.visiemaild,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre rendez-vous avec " + this.visiname + " prévu pour " + this.slottime + " a été visité.",
        'ToUser': this.visiemaild,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
  }
  
  ispatientpragnent: any;
  ispatientbreastfeed: any;

  public GetPatientPragnentornot(isPatientPragnent, ispatientbrestfeeding) {
    this.ispatientpragnent = isPatientPragnent;
    this.ispatientbreastfeed = ispatientbrestfeeding

  }
}
