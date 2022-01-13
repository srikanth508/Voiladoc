import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { DatePipe } from '@angular/common';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { timer } from 'rxjs';


import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
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
  public labels1: any;
  user: any;
  dropzonelable: any;
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
    this.user = localStorage.getItem('user');
    this.getnurselist();
    this.getserverdateandtime();
    this.Obseravabletimer();

    this.timingsss = this.datePipe.transform(this.availabletime, 'h:mm a');
    this.getlanguage()

    if (this.languageid == 1) {
      this.signature = 'Electronically signed by ' + this.user + ' ' + this.todaydate;
    }
    else if (this.languageid == 6) {
      this.signature = 'Signature électronique du ' + this.user + ' ' + this.todaydate;
    }

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }


    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;

      }, error => {
      }
    )
  }


  Obseravabletimer() {

    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {

      this.getnurselist()


    });
  }



  labels4: any;

  public getlanguage() {
    this.docservice.GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )

    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels4 = data;
        // this.selectlabel = this.labels[0].select,
        //   this.search2 = this.labels[0].search
      }, error => {
      }
    )
    this.geticdcode()
  }


  public getnurselist() {

    this.docservice.GetBook_Nurse_Appointment(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.appointmentist = data;

      }, error => {
      }
    )
  }


  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.getnurseappointments();
  }


  public getnurseappointments() {
    this.docservice.GetBook_Nurse_Appointment(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
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
        this.availabletime = this.serverdateandtime.presentTime
      }, error => {
      }
    )
  }
  public canpatientmobileno: any;

  public GetCancelAppointmentID(id, bookedTime, appdate, nurseName, hospital_ClinicName, patientID, emailID, paidAmount, walletAmount, mobileNumber, smsmobileno) {

    this.canappointmentid = id
    this.canslots = bookedTime;
    this.cannursename = nurseName;
    this.canhospital = hospital_ClinicName,
      this.canpatientid = patientID,
      this.canemail = emailID;
    this.paidamount = paidAmount;
    this.walletamount = walletAmount;
    this.canpatientmobileno = mobileNumber;
    this.smsmobileno = smsmobileno;


    this.totaladdmoney = Number(this.walletamount) + (this.paidamount)


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


      }, error => {
      }
    )
    this.updatereson();
    // this.updatedateails();
  }

  public updatereson() {
    var entity = {
      'ID': this.canappointmentid,
      'ReasonForCancel': this.reason
    }
    this.docservice.UpdateBook_Nurse_AppointmentReasonForCancelBit(entity).subscribe(res => {
      let test = res;

      if (this.languageid == 1) {
        Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
        this.InsertCancellNotification();
        this.InsertNotiFicationCancel();
        this.SendCancelPatientmail();
        // this.sendsms();
        this.getnurselist();
        this.getnurseappointments();


        var smsdesc = "Your appoinment with the nurse " + this.cannursename + " on " + this.canslots + " has not been confirmed. "
        this.SendTwiliSms(smsdesc, this.smsmobileno)


      }
      else {
        Swal.fire('Annuler avec succès');
        this.InsertCancellNotification();
        this.InsertNotiFicationCancel();
        this.SendCancelPatientmail();
        // this.sendsms();
        this.getnurselist();
        this.getnurseappointments();

        var smsdesc = "Votre RDV avec l'infirmier/ère " + this.cannursename + " le " + this.canslots + " n'a pas été confirmé."
        this.SendTwiliSms(smsdesc, this.smsmobileno)


      }


    })
  }

  smsmobileno: any;
  public GetAcceptAppointmentID(id, nurseid, bookedTime, nurseName, hospital_ClinicName, patientID, emailID, smsmobileno) {

    this.acceptappointmentid = id;
    this.acceptnurseid = nurseid;
    this.aaceptslots = bookedTime;
    this.acceptnursename = nurseName;
    this.accepthospital = hospital_ClinicName;
    this.acceppatientid = patientID;
    this.accemail = emailID;
    this.smsmobileno = smsmobileno
    this.acceptappointment();

  }


  public acceptappointment() {
    this.docservice.UpdateBook_Nurse_AppointmentAcceptedBit(this.acceptappointmentid).subscribe(
      data => {


      }, error => {
      }
    )
    this.InsertNextAvailableSlots();

    this.insertAcceptNursenotoification();

    this.InsertNotificationFORAccept();

    if (this.languageid == 1) {
      var smsdesc = "Your appoinment with the nurse " + this.acceptnursename + " on " + this.aaceptslots + " has been accepted."
      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }
    else {
      var smsdesc = "Votre RDV avec l'infirmier/ère " + this.acceptnursename + " le " + this.aaceptslots + " a été confirmé. "
      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }
  }

  public insertAcceptNursenotoification() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.acceppatientid,
        'Notification': "Appointment confirmed",
        'Description': "Your appoinment with the nurse " + this.acceptnursename + " on " + this.aaceptslots + " has been accepted.",
        'NotificationTypeID': 25,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.acceptappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.acceppatientid,
        'Notification': "RDV confirmé",
        'Description': "Votre RDV avec l'infirmier/ère " + this.acceptnursename + " le " + this.aaceptslots + " a été confirmé. ",
        'NotificationTypeID': 25,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.acceptappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }
  public InsertNotificationFORAccept() {
    if (this.languageid == '1') {

      var entity = {
        'Description': "Your appoinment with the nurse " + this.acceptnursename + " on " + this.aaceptslots + " has been accepted.",
        'ToUser': this.accemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {

      var entity = {

        'Description': "Votre RDV avec l'infirmier/ère " + this.acceptnursename + " le " + this.aaceptslots + " a été confirmé. ",
        'ToUser': this.accemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }



  public SendTwiliSms(smsdesc, smsmobileno) {

    this.docservice.SendTwillioSMS(smsmobileno, smsdesc).subscribe(data => {

    })
  }

  public getfromampm(even) {

    this.ampmtime = even.target.value;
  }


  public InsertNextAvailableSlots() {


    var entity = {
      'AppointmentID': this.acceptappointmentid,
      'AvailabilityTime': this.time
    }
    this.docservice.UpdateNurse_AvailabilitySlotsTime(entity).subscribe(res => {
      let test = res;

      if (this.languageid == 1) {
        this.getnurselist();
        this.getnurseappointments();
        this.getserverdateandtime()
        Swal.fire('Agenda updated and appointment accepted successfully.');

      }
      else {
        this.getnurselist();
        this.getnurseappointments();
        this.getserverdateandtime()
        Swal.fire('Agenda mis à jour et rendez-vous accepté avec succès.');

      }

    })
  }



  // public InsertNextAvailableSlots() {
  //  
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

    this.time = even.target.value;
  }
  visitappid: any;
  nursename: any;
  nurseaddress: any;
  public address: any;
  public paidAmount: any;
  public patientname: any;

  public UpdateVisitedbit(id, bookedtime, apptDatetime, nurseName, hospital_ClinicName, patientID, emailID, details) {
    this.slottime = bookedtime;
    this.appdate = apptDatetime,
      this.visitnurse = nurseName;
    this.visithospital = hospital_ClinicName,
      this.visitpatientid = patientID;
    this.visitappid = id;
    this.visitemail = emailID,
      this.nursename = details.nurseName,
      this.nurseaddress = details.nurseaddress,
      this.address = details.address,
      this.paidAmount = details.paidAmount,
      this.patientname = details.patientName,
      this.getserverdateandtime()
    // if (this.serverdate >= this.appdate) {
    //   if (this.servertime >= this.slottime) {

    Swal.fire({
      title: 'Are you sure?',
      text: "The Patient has  Visited!",
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
    //   }
    //   else {
    //     Swal.fire("The Appointment Time Is +" + this.slottime)
    //   }
    // }
  }

  public emailattchementurl = []
  public bcclist: any;
  public cclist: any;


  public SendCancelPatientmail() {

    var entity = {
      'emailto': this.canemail,
      'emailsubject': "The Nurse " + this.cannursename + " Has Cancelled Your Appointment ",
      'emailbody': "Your Appointment with " + this.cannursename + " scheduled for " + this.canslots + " has been Cancelled.",
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }


  public InsertCancellNotification() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Appointment not confirmed",
        'Description': "Your appoinment with the nurse " + this.cannursename + " on " + this.canslots + " has not been confirmed. ",
        'NotificationTypeID': 19,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.canappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "RDV non confirmé",
        'Description': "Votre RDV avec l'infirmier/ère " + this.cannursename + " le " + this.canslots + " n'a pas été confirmé.",
        'NotificationTypeID': 19,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.canappointmentid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }

  // public sendsms() {

  //   let Entity = {
  //     'Contacts': this.canemail,
  //     'TextMessage': "Your Appointment with " + this.cannursename + " scheduled for " + this.canslots + " has been Cancelled."
  //   }
  //   this.docservice.SendSMS(Entity).subscribe(data => {

  //   })
  // }




  public InsertNotiFicationCancel() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your appoinment with the nurse " + this.cannursename + " on " + this.canslots + " has not been confirmed. ",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {

      var entity = {
        'Description': "Votre RDV avec l'infirmier/ère " + this.cannursename + " le " + this.canslots + " n'a pas été confirmé.",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

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

        if (data != 0) {

        }

      })
    }
  }
  public InsertNotiFicationVisited() {
    if (this.languageid == '1') {

      var entity = {
        'Description': "Your Appointment with " + this.visitnurse + " scheduled for " + this.slottime + " has been Visited.",
        'ToUser': this.visitemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {

      var entity = {
        'Description': "Votre rendez-vous avec " + this.visitnurse + " prévu pour " + this.slottime + " a été visité.",
        'ToUser': this.visitemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }

  public updateNotVisitBit(id) {

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




  public pdfurl: any;

  public SavePDF() {
    ;

    let pdfContent = window.document.getElementById("pdfcontent");
    var doc = new jsPDF('p', 'mm', "a4");

    html2canvas(pdfContent).then(canvas => {
      ;
      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(2);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      var pdf = doc.output('blob');

      var file = new File([pdf], "NurseReceipts" + ".pdf");

      let body = new FormData();

      body.append('Dan', file);

      this.docservice.ReceiptUpload(file).subscribe(res => {
        ;
        this.pdfurl = res;
        this.UpdateReceipt();

      });
    });
  }


  public UpdateReceipt() {

    var entity = {
      'AppointmentID': this.visitappid,
      'ReceiptURL': this.pdfurl
    }
    this.docservice.UpdateBook_Nurse_AppointmentPdfUrl(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Receipt Sent Successfully');
      }
      else {
        Swal.fire('Le reçu a été envoyé au patient.');
      }

    })
  }
  phoneno: any;

  public GetRecept(id, bookedtime, apptDatetime, nurseName, hospital_ClinicName, patientID, emailID, details) {
    this.slottime = bookedtime;
    this.appdate = apptDatetime,
      this.visitnurse = nurseName;
    this.visithospital = hospital_ClinicName,
      this.visitpatientid = patientID;
    this.visitappid = id;
    this.visitemail = emailID,
      this.nursename = details.nurseName,
      this.nurseaddress = details.nurseaddress,
      this.address = details.address,
      this.paidAmount = details.paidAmount,
      this.patientname = details.patientName
    this.phoneno = details.phoneNo

    this.getNurseServices(id);

  }







  // soap notes




  public GetSoapID(app) {
    this.patientid = app.patientID,
      this.appointmentdatetime = app.apptDatetime,
      this.appointmentid = app.id
  }


  icrcodedummlist: any;
  icdcodelist: any;
  states: any;

  public geticdcode() {
    this.docservice.GetICDCodeMaster(this.languageid).subscribe(
      data => {
        ;
        this.icrcodedummlist = data;
        this.icdcodelist = data;

        this.states = this.icdcodelist.map(x => x.description);
      },
      error => { }
    );
  }


  showsearchsoap: any;

  public SearchIcrCode() {

    if (this.icddesc == '') {
      this.icdcode = ''
      this.showsearchsoap = 0
    }
    else {
      // let wqew = this.icdcodelist.filter(v => v.description.toLowerCase().indexOf(this.icddesc.toLowerCase()) > -1);
      // this.icdcode = wqew[0].icdCode,
      //   this.icrcodeid = wqew[0].id
      this.showsearchsoap = 1;

    }
  }



  public GetIcrCodeID(id, description, icdCode) {
    this.icdcode = icdCode,
      this.icrcodeid = id
    this.icddesc = description
    this.showsearchsoap = 0
  }


  patientid: any;
  appointmentid: any;
  appointmentdatetime: any;
  subjective: any;
  objective: any;
  assessment: any;
  plan: any;
  followupplan: any;
  icdcode: any;
  notes: any;
  icddesc: any;
  icrcodeid: any;
  attachmentsurl1 = []
  signature: any;

  public insertsoapnotes1() {

    var entity = {
      'NPMID': this.nurseid,
      'PatientID': this.patientid,
      'AppointmentID': this.appointmentid,
      'AppointmentDate': this.appointmentdatetime,
      'Subjective': this.subjective,
      'Objective': this.objective,
      'Assessment': this.assessment,
      'Plan': this.plan,
      'FollowUpPlan': this.followupplan,
      'DiagnosisCode': this.icdcode,
      'Notes': this.notes,
      'LanguageID': this.languageid,
      'ICRCode': this.icdcode,
      'ICRDescription': this.icddesc,
      'ICRID': this.icrcodeid,
      'AttachmentUrl': this.attachmentsurl1[0],
      'Signature': this.signature,
      'TypeID': 1
    }
    this.docservice.InsertNPM_PatientSoapNotesWeb(entity).subscribe(data => {

      if (data != 0) {

        if (this.languageid == 1) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
        }
        else if (this.languageid == 6) {

          Swal.fire('', 'Détails enregistrés !', 'success');
        }
      }

    }
    )
  }



  public UploadSoapAttchments(abcd) {

    this.dummprescriptionphotourl = []

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadSoAPattachmentss();
    // }

    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }
  }

  public shoprescphoto = [];
  attachments1 = []
  dummprescriptionphotourl = []
  public uploadSoAPattachmentss() {
    this.docservice.SoapAttachments(this.attachments1).subscribe(res => {
      this.attachmentsurl1.push(res);
      this.dummprescriptionphotourl.push(res);
      let a = this.attachmentsurl1[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      if (this.attachments1[0].type == 'image/jpeg') {

        this.shoprescphoto.push(b)
      }
      else if (this.attachments1[0].type == 'application/pdf') {

        this.shoprescphoto.push('assets/Images/pdf.png')
      }

      this.attachments1.length = 0;

    })
    // this.sendattachment();
  }


  Services: any;
  nationaidno:any;
  servicename: any;

  getNurseServices(Appointmentid) {
    debugger
    this.servicename == '';
    this.docservice.GetBookAppointment_NurseServices(Appointmentid).subscribe(
      data => {
        debugger
        this.Services = data;
        for (let i = 0; i < this.Services.length; i++) {
          if (this.servicename == '') {
            this.servicename = this.Services[i].serviceName
          }
          else {
            this.servicename = ',' + this.Services[i].serviceName
          }
        }
      }, error => {
      }
    )
  }
}




