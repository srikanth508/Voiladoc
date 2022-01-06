import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { timer } from 'rxjs';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-physiotherapist-appointments',
  templateUrl: './physiotherapist-appointments.component.html',
  styleUrls: ['./physiotherapist-appointments.component.css']
})
export class PhysiotherapistAppointmentsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public term: any;
  public physioid: any;
  public appointmentist: any;


  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  public nurseid: any;
  public appdate: any;



  public canappointmentid: any;
  public reason: any;
  public acceptappointmentid: any;
  public availbledate: any;
  time: any;
  public acceptnurseid: any;

  public CurrentTime: any;

  startdate: any;
  enddate: any;
  value: any;
  public serverdate: any;
  public servertime: any;
  public serverdateandtime: any;
  public slottime: any;

  public acceptslots: any;
  public acceptphysioname: any;
  public acceptpatientid: any;
  public acceptemail: any;
  public accepthospital: any;


  public canslots: any;
  public canphysioname: any;
  public canpatientid: any;
  public canemail: any;
  public canhospital: any;
  public ampmtime: any;


  public languageid: any;
  public labels: any;
  public visiname: any;
  public vispatientid: any;
  public visiemail: any;
  public paidamount: any;
  public walletamount: any;
  public totaladdmoney: any;
  public labels1: any;
  public user: any;
  labels4: any;

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

    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.languageid = localStorage.getItem('LanguageID');
    this.physioid = localStorage.getItem('physioid');
    this.user = localStorage.getItem('user');
    this.getphysiolist();
    this.getserverdateandtime();

    this.getlanguage();
    this.Obseravabletimer();



    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;

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



  }

  dropzonelable: any;


  Obseravabletimer() {

    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {

      this.getphysiolist();


    });
  }

  public getlanguage() {
    this.docservice.GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  public getphysiolist() {
    this.docservice.GetBook_Physio_Appointment(this.physioid, this.startdate, this.enddate, this.languageid).subscribe(
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

    // var sdate=data.split('-')
    // this.startdate=sdate[0]
    // this.enddate=sdate[1]
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    this.physionappointments()
  }

  public physionappointments() {
    this.docservice.GetBook_Physio_Appointment(this.physioid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.appointmentist = data;
      }, error => {
      }
    )
  }

  public canmobileno: any;


  public GetCancelAppointmentID(id, bookedTime, name, patientID, emailID, hospital_ClinicName, paidAmount, walletAmount, mobileNumber, smsmobileno) {

    this.canappointmentid = id,
      this.canslots = bookedTime;
    this.canphysioname = name;
    this.canpatientid = patientID;
    this.canemail = emailID;
    this.canhospital = hospital_ClinicName;
    this.paidamount = paidAmount;
    this.walletamount = walletAmount;
    this.canmobileno = mobileNumber;
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


  //accept notificatiom

  public InsertCancelNotification() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Appointment not confirmed",
        'Description': "Your appoinment with the physio " + this.canphysioname + "  on " + this.canslots + " has not been confirmed. ",
        'NotificationTypeID': 26,
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
        'Notification': "Rendez-vous non confirmé",
        'Description': "Votre RDV avec le/la physio " + this.canphysioname + " le " + this.canslots + "  n'a pas été confirmé. ",
        'NotificationTypeID': 26,
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
  public InsertNotiFicationCancel() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your appoinment with the physio " + this.canphysioname + "  on " + this.canslots + " has not been confirmed. ",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre RDV avec le/la physio " + this.canphysioname + " le " + this.canslots + "  n'a pas été confirmé. ",
        'ToUser': this.canemail,
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
      'emailto': this.canemail,
      'emailsubject': "The Physiotherapist " + this.canphysioname + " Has Cancelled Your Appointment ",
      'emailbody': "Your Appointment with " + this.canphysioname + " scheduled for " + this.canslots + " has been Cancelled.",
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }



  public CancelAppointment() {
    this.docservice.UpdateBook_Physio_AppointmentcancelledBit(this.canappointmentid).subscribe(
      data => {

        if (this.languageid == 1) {
          Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
        }
        else {
          Swal.fire('Annuler avec succès');
        }
      }, error => {
      }
    )
    this.updatereson();
    // this.updatedateails()
    this.getphysiolist();
    this.physionappointments()
    this.SendCancelPatientmail();
    this.sendsms();
    this.InsertCancelNotification();
    this.InsertNotiFicationCancel();
    if (this.languageid == 1) {
      var smsdesc = "Your appoinment with the physio " + this.canphysioname + "  on " + this.canslots + " has not been confirmed. "
      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }
    else {
      var smsdesc = "Votre RDV avec le/la physio " + this.canphysioname + " le " + this.canslots + "  n'a pas été confirmé. "
      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }
  }



  public sendsms() {

    let Entity = {
      'Contacts': this.canmobileno,
      'TextMessage': "Your Appointment with " + this.canphysioname + " scheduled for " + this.canslots + " has been Cancelled.",
    }
    this.docservice.SendSMS(Entity).subscribe(data => {



    })
  }







  public updatereson() {
    var entity = {
      'ID': this.canappointmentid,
      'ReasonForCancel': this.reason
    }
    this.docservice.UpdateBook_Physio_AppointmentReasonForCancel(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
        this.getphysiolist();
        this.physionappointments()
      }
      else {
        Swal.fire('Annuler avec succès');
        this.getphysiolist();
        this.physionappointments()
      }
    })
  }





  smsmobileno: any;



  public GetAcceptAppointmentID(id, phsysioid, bookedTime, name, patientID, emailID, hospital_ClinicName, smsmobileno) {
    this.acceptappointmentid = id;
    this.acceptnurseid = phsysioid;
    this.acceptslots = bookedTime;
    this.acceptphysioname = name;
    this.acceptpatientid = patientID;
    this.acceptemail = emailID;
    this.accepthospital = hospital_ClinicName;
    this.smsmobileno = smsmobileno;
    this.acceptappointment();

  }
  public acceptappointment() {
    this.docservice.UpdateBook_Physio_AppointmentAcceptedBit(this.acceptappointmentid).subscribe(
      data => {


      }, error => {
      }
    )
    this.InsertNextAvailableSlots();
    this.InsertAcceptNotification();
    this.InsertNotiFicationAccept();

    if (this.languageid == 1) {
      var smsdesc = "Your appoinment with the physio  " + this.acceptphysioname + " on " + this.acceptslots + " has been accepted."
      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }
    else {
      var smsdesc = "Votre RDV avec le/la physio " + this.acceptphysioname + " le " + this.acceptslots + " a été confirmé."

      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }

  }


  public InsertAcceptNotification() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.acceptpatientid,
        'Notification': "Appointment confirmed",
        'Description': "Your appoinment with the physio  " + this.acceptphysioname + " on " + this.acceptslots + " has been accepted.",
        'NotificationTypeID': 26,
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
        'PatientID': this.acceptpatientid,
        'Notification': "Rendez-vous confirmé",
        'Description': "Votre RDV avec le/la physio " + this.acceptphysioname + " le " + this.acceptslots + " a été confirmé.",
        'NotificationTypeID': 26,
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
  public InsertNotiFicationAccept() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your appoinment with the physio  " + this.acceptphysioname + " on " + this.acceptslots + " has been accepted.",
        'ToUser': this.acceptemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre RDV avec le/la physio " + this.acceptphysioname + " le " + this.acceptslots + " a été confirmé.",
        'ToUser': this.acceptemail,
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
    this.docservice.UpdatePhysiotherapist_AvailabilitySlotsTime(entity).subscribe(res => {
      let test = res;

      if (this.languageid == 1) {
        this.getphysiolist();
        this.physionappointments()
        Swal.fire('Agenda updated and appointment accepted successfully.');
      }
      else {
        this.getphysiolist();
        this.physionappointments()
        Swal.fire('Agenda mis à jour et rendez-vous accepté avec succès.');
      }
    })
  }


  public GetTime(even) {

    this.time = even.target.value;
  }

  visitid: any;

  public UpdateVisitedbit(id, bookedTime, appdate, name, patientID, emailID) {
    this.slottime = bookedTime;
    this.appdate = appdate;
    this.visiname = name;
    this.vispatientid = patientID;
    this.visiemail = emailID;
    this.visitid = id

    // if(this.serverdate>=this.slottime)
    // {
    //   if(this.servertime>=this.servertime)
    //   {
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
        this.docservice.UpdateBook_Physio_AppointmentIsVisitedBit(id).subscribe(res => {
          let test = res;
          this.getphysiolist();
          this.physionappointments()
        })
        Swal.fire(
          'Yes!',
          'Patient has been Visited.',
          'success'
        )
      }
      else {
        this.getphysiolist();
        this.physionappointments()
      }
    })
    // }
    // }
    // else{
    //   Swal.fire("The Appointment Time is"+this.slottime)
    // }


  }


  public UpdatepatientNotVisited(id) {
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
        this.docservice.UpdateBook_Physio_AppointmentNotVisitedBit(id).subscribe(res => {
          let test = res;
          this.getphysiolist();
          this.physionappointments()
        })
        Swal.fire(
          'Yes!',
          'Patient has Not  Visited.',
          'success'
        )
      }
      else {
        this.getphysiolist();
        this.physionappointments()
      }
    })
  }





  //visited notification






  public InsertVisitedNotification() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.vispatientid,
        'Notification': "Appointment Visited",
        'Description': "Your Appointment with " + this.visiname + " scheduled for " + this.slottime + " has been Visited.",
        'NotificationTypeID': 26,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.visitid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.vispatientid,
        'Notification': "Rendez-vous accepté par un physiothérapeute.",
        'Description': "Votre rendez-vous avec " + this.visiname + " prévu pour " + this.slottime + "a été visité.",
        'NotificationTypeID': 26,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.visitid
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
        'ToUser': this.visiemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre rendez-vous avec " + this.visiname + " prévu pour " + this.slottime + " a été visité.",
        'ToUser': this.visiemail,
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

      var file = new File([pdf], "PhysioRecipts" + ".pdf");

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
      'AppointmentID': this.visitid,
      'ReceiptURL': this.pdfurl
    }
    this.docservice.UpdateBook_Physio_AppointmentPdfUrl(entity).subscribe(data => {
      Swal.fire('Receipt Sent Successfully');
    })
  }

  public patientname: any;
  public address: any;
  public physioname: any;
  public hospital: any;
  public physioaddrees: any;
  public GetRecept(id, bookedTime, appdate, name, patientID, emailID, details) {

    this.slottime = bookedTime;
    this.appdate = appdate;
    this.visiname = name;
    this.vispatientid = patientID;
    this.visiemail = emailID;
    this.visitid = id;
    this.patientname = details.patientName,
      this.address = details.address,
      this.physioname = details.name,
      this.hospital = details.hospital_ClinicName,
      this.physioaddrees = details.physioAddess,
      this.paidamount = details.paidAmount

  }


























  // soap notes




  public GetSoapID(app) {
    this.patientid = app.patientID,
      this.appointmentdatetime = app.apptDate,
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
      'NPMID': this.physioid,
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
      'TypeID': 2
    }
    this.docservice.InsertNPM_PatientSoapNotesWeb(entity).subscribe(data => {

      if (data != 0) {

        if (this.languageid == 1) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
          this.clear()
        }
        else if (this.languageid == 6) {

          Swal.fire('', 'Détails enregistrés !', 'success');
          this.clear()
        }
      }

    }
    )
  }
  clear() {
    this.objective = "",
      this.subjective = "",
      this.assessment = "",

      this.followupplan = "",
      this.notes = ""
    this.plan = ""
    this.signature = ""
    this.icddesc = "",
      this.icdcode = ""
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

  getNurseServices(Appointmentid) {
    debugger
    this.docservice.GetBookAppointment_PhysioServices(Appointmentid).subscribe(
      data => {
        debugger
        this.Services = data;
      }, error => {
      }
    )
  }

}
