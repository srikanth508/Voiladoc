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
  labels1: any;
  user:any;
  signature:any;
  dropzonelable:any;
  labels4:any;
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
    this.user = localStorage.getItem('user');
    this.getmidwifeappointments();
    this.getserverdateandtime();
    this.Obseravabletimer();

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


  Obseravabletimer() {

    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {

      this.getmidwifeappointments()


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

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
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

  public canpatientmobileno: any;

  public GetCancelAppointmentID(id, patientID, emailID, name, bookedTime, paidAmount, walletAmount, mobileNumber, smsmobileno) {

    this.canappointmentid = id
    this.canpatientid = patientID;
    this.canemailid = emailID;
    this.canname = name;
    this.canbookedtime = bookedTime;
    this.paidamount = paidAmount;
    this.walletAmount = walletAmount;
    this.canpatientmobileno = mobileNumber;
    this.smsmobileno = smsmobileno


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

        // Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
      }, error => {
      }
    )
    this.updatereson();
    // this.updatedateails();
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
      if (this.languageid == 1) {
        Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
        this.getmidwifeappointments();
        this.getphisyioappointments();
        this.SendCancelPatientmail()

        this.InsertCancelNotification();
        this.InsertNotiFicationcancel();

        var smsdesc = "Your appoinment with the midwife " + this.acceptname + " on " + this.accbookedtime + " has been accepted."
        this.SendTwiliSms(smsdesc, this.smsmobileno)

      }
      else {
        Swal.fire('Annuler avec succès');
        this.getmidwifeappointments();
        this.getphisyioappointments();
        this.SendCancelPatientmail()

        this.InsertCancelNotification();
        this.InsertNotiFicationcancel();

        var smsdesc = "Votre RDV avec la sage-femme " + this.acceptname + " le " + this.accbookedtime + " a été confirmé. "
        this.SendTwiliSms(smsdesc, this.smsmobileno)
      }



    })
  }
  smsmobileno: any;

  public GetAcceptAppointmentID(id, midWivesID, patientID, emailID, name, bookedTime, smsmobileno) {
    this.acceptappointmentid = id;
    this.acceptmidwifeid = midWivesID;
    this.accpatientid = patientID;
    this.accemailid = emailID;
    this.acceptname = name;
    this.accbookedtime = bookedTime;
    this.smsmobileno = smsmobileno
    this.acceptappointment();
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
      if (this.languageid == 1) {
        this.getmidwifeappointments();
        this.getphisyioappointments()
        Swal.fire('Agenda updated and appointment accepted successfully.');
        this.InsertAcceptNotification();
        this.InsertNotiFicationAccepted();
        
        var smsdesc = "Your appoinment with the midwife " + this.acceptname + " on " + this.accbookedtime + " has been accepted."
        this.SendTwiliSms(smsdesc, this.smsmobileno)
      }
      else {
        this.getmidwifeappointments();
        this.getphisyioappointments()
        Swal.fire('Agenda mis à jour et rendez-vous accepté avec succès.');
        this.InsertAcceptNotification();
        this.InsertNotiFicationAccepted();

        var smsdesc = "Votre RDV avec la sage-femme " + this.acceptname + " le " + this.accbookedtime + " a été confirmé. "
        this.SendTwiliSms(smsdesc, this.smsmobileno)
      }
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
    this.visitappointid = id;


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
        'Notification': "Appointment confirmed",
        'Description': "Your appoinment with the midwife " + this.acceptname + " on " + this.accbookedtime + " has been accepted.",
        'NotificationTypeID': 27,
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
        'PatientID': this.accpatientid,
        'Notification': "Rendez-vous confirmé",
        'Description': "Votre RDV avec la sage-femme " + this.acceptname + " le " + this.accbookedtime + " a été confirmé. ",
        'NotificationTypeID': 27,
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
  public InsertNotiFicationAccepted() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your appoinment with the midwife " + this.acceptname + " on " + this.accbookedtime + " has been accepted.",
        'ToUser': this.accemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre RDV avec la sage-femme " + this.acceptname + " le " + this.accbookedtime + " a été confirmé. ",
        'ToUser': this.accemailid,
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

  //cancel notification







  public InsertCancelNotification() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Appointment rejected",
        'Description': "Your Appointment with " + this.canname + " scheduled for " + this.canbookedtime + " has been Cancelled.",
        'NotificationTypeID': 24,
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
        'Notification': "Rendez-vous rejeté",
        'Description': "Votre RDV avec la sage-femme " + this.canname + " le " + this.canbookedtime + "  n'a pas été confirmé. ",
        'NotificationTypeID': 24,
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
  public InsertNotiFicationcancel() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Appointment with " + this.canname + " scheduled for " + this.canbookedtime + " has been Cancelled.",
        'ToUser': this.canemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre RDV avec la sage-femme " + this.canname + " le " + this.canbookedtime + "  n'a pas été confirmé. ",
        'ToUser': this.canemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }






  public emailattchementurl = [];
  public cclist: any;
  public bcclist: any;


  public SendCancelPatientmail() {

    var entity = {
      'emailto': this.canemailid,
      'emailsubject': "The Midwife " + this.canname + " Has Cancelled Your Appointment ",
      'emailbody': "Your Appointment with " + this.canname + " scheduled for " + this.canbookedtime + " has been Cancelled.",
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }



  // public sendsms() {

  //   let Entity = {
  //     'Contacts': this.canpatientmobileno,
  //     'TextMessage': "Your Appointment with " + this.canname + " scheduled for " + this.canbookedtime + " has been Cancelled.",
  //   }
  //   this.docservice.SendSMS(Entity).subscribe(data => {



  //   })
  // }



  visitappointid: any;
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
        'AppointmentID': this.visitappointid
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
        'AppointmentID': this.visitappointid,

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


  public patientname: any;
  public address: any;
  public midwifename: any;
  public hospital: any;
  public midwifeaddress: any;


  public GetRecept(id, bookedTime, appdate, patientID, emailID, name, details) {
    this.slottime = bookedTime;
    this.appdate = appdate;
    this.visipatientid = patientID;
    this.visiemaild = emailID;
    this.visiname = name;
    this.visitappointid = id;


    this.patientname = details.patientName,
      this.address = details.address,
      this.midwifename = details.name,
      this.hospital = details.hospital_ClinicName,
      this.midwifeaddress = details.midwifeaddrees,
      this.paidamount = details.paidAmount
  }




  public UpdateReceipt() {
    
    var entity = {
      'AppointmentID': this.visitappointid,
      'ReceiptURL': this.pdfurl
    }
    this.docservice.UpdateBook_Midwives_Appointment(entity).subscribe(data => {
      Swal.fire('Receipt Sent Successfully');
    })
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

  
    public insertsoapnotes1() {
      
      var entity = {
        'NPMID': this.id,
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
        'TypeID': 3
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
  

    Services:any;

    getNurseServices(Appointmentid) {
      debugger
      this.docservice.GetBookAppointment_MidwifeServices(Appointmentid).subscribe(
        data => {
          debugger
          this.Services = data;
        }, error => {
        }
      )
    }

    


}
