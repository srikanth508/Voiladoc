import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { timer } from 'rxjs';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }
  public diagnosticid: any;
  public diagnosticlist: any;
  public term: any;
  public date: any;
  p: number = 1;
  public cancelid: any;
  public reason: any;
  public todaydate: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  value: any;
  public showphoto = [];
  public attachments = [];
  public attachmentsurl = [];
  public appointmentsid: any;
  public patientid: any;
  public diaid: any;
  public notes: any;
  public diatestid: any;
  public testslist: any;
  public packageid; any;
  public packagelist: any;
  public languageid: any;
  public labels: any;
  public accpatientid: any;
  public acceptcenter: any;
  public accslot: any;
  public acpaemail: any;

  public canpatientid: any;
  public candiagnostic: any;
  public canslot: any;
  public canemail: any;

  public vispatientID: any;
  public visdianame: any;
  public visslotName: any;
  public visiemail: any;
  dropzonelable: any;
  labels4: any;
  amount: any;
  recpid: any;
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


    this.user = localStorage.getItem('user');
    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.recpid = localStorage.getItem('Receptionstid')
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.languageid = localStorage.getItem('LanguageID');
    this.getdiagnosticAppointmentsbyid();

    this.getlanguage()
    this.Obseravabletimer();

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    document.getElementById("myForm").style.display = "none";

    this.getserverdateandtime();


    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels4 = data;

      }, error => {
      }
    )


  }


  Obseravabletimer() {

    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {

      this.getdiagnosticAppointmentsbyid()

    });
  }

  public getlanguage() {
    this.docservice.GetAdmin_DiagnosticLoginOrdersAndOrderReport_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
  }
  labels1
  public getdiagnosticAppointmentsbyid() {

    this.docservice.GetDiagnosticAppointmentsByDiagnosticID(this.diagnosticid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;
      }, error => {
      }
    )
  }
  selectedDate(data) {

    //   var sdate=data.split('-')
    //   this.startdate=sdate[0]
    //  this.enddate=sdate[1]

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.getdiagnosticAppointment()
  }
  public getdiagnosticAppointment() {
    this.docservice.GetDiagnosticAppointmentsByDiagnosticID(this.diagnosticid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;
      }, error => {
      }
    )
  }
  notificationdate: any;
  appointmentext: any;


  public cancelmedicine(id, patientID, diagnosticCenterName, slotName, emailID, smsmobileno, appdate, notificationdate) {

    this.cancelid = id;
    this.canpatientid = patientID;
    this.candiagnostic = diagnosticCenterName;
    this.canslot = slotName;
    this.canemail = emailID;
    this.appdate = appdate
    this.notificationdate = notificationdate
    this.smsmobileno = smsmobileno;
    debugger
  }

  public Appointmentstatus(appointmentID, patientID, diagnosticCenterName, slotName, emailID, smsmobileno, appointmentext) {

    this.accpatientid = patientID;
    this.acceptcenter = diagnosticCenterName;
    this.accslot = slotName;
    this.acpaemail = emailID;
    this.appointmentext = appointmentext;
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to accept this order ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateDiagnosticAppointments(appointmentID).subscribe(res => {
            let test = res;
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
            this.InsertAccptNotification()
            this.InsertNotiFicationAccpt()

            // var smsdesc = "Your Appointment with " + this.acceptcenter + " scheduled for " + this.accslot + "  has been Accepted.Type : " + this.appointmentext

            debugger
            var smsdesc = "Your appointment with " + this.acceptcenter + " on " + this.accslot + "  has been confirmed and is being processed. You will receive an update soon."

            this.SendTwiliSms(smsmobileno, smsdesc)

          })
          Swal.fire(
            'Accepted!',
            'Order has been Accepted.',
            'success'
          )
        }
        else {
          this.getdiagnosticAppointmentsbyid();
          this.getdiagnosticAppointment();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        // title: 'Are you sure?',
        text: "Voulez-vous accepter cette commande ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateDiagnosticAppointments(appointmentID).subscribe(res => {
            let test = res;
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
            this.InsertAccptNotification()
            this.InsertNotiFicationAccpt()
            debugger
            // var smsdesc = "Votre RDV avec " + this.acceptcenter + " le " + this.accslot + "  a été confirmé. Type :" + this.appointmentext
            var smsdesc = "Votre RDV avec " + this.acceptcenter + " le " + this.accslot + "  a été confirmé et est en cours de traitement. Vous recevrez bientôt une mise à jour."
            debugger
            this.SendTwiliSms(smsmobileno, smsdesc)
          })
          Swal.fire(
            'Enregistré !.',
            'Commande acceptée',
            'success'
          )
        }
        else {
          this.getdiagnosticAppointmentsbyid();
          this.getdiagnosticAppointment();
        }
      })
    }

  }


  public SendTwiliSms(smsmobileno, smsdesc) {
    debugger
    this.docservice.SendTwillioSMS(smsmobileno, smsdesc).subscribe(data => {
      console.log(data);

    })
  }


  public UpdateDiagnosticAppointmentsNotVisitedBit(appointmentID) {

    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "This Patient has Not Visited!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Not Visited!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateDiagnosticAppointmentsNotVisitedBit(appointmentID).subscribe(res => {
            let test = res;
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
          })
          Swal.fire(
            'Accepted!',
            'Patient has been Not  Visited.',
            'success'
          )
        }
        else {
          this.getdiagnosticAppointmentsbyid();
          this.getdiagnosticAppointment();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        // title: 'Are you sure?',
        text: "Le patient ne s’est pas présenté ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OUI',
        cancelButtonText: 'RETOUR'

      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateDiagnosticAppointmentsNotVisitedBit(appointmentID).subscribe(res => {
            let test = res;
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
          })
          Swal.fire(
            'Enregistré !',
            '',
            'success'
          )
        }
        else {
          this.getdiagnosticAppointmentsbyid();
          this.getdiagnosticAppointment();
        }
      })
    }

  }



  public Approvestatus(appointmentID, patientID, diagnosticCenterName, slotName, emailID) {
    this.vispatientID = patientID;
    this.visdianame = diagnosticCenterName,
      this.visslotName = slotName;
    this.visiemail = emailID;
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Has the patient visited ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateDiagnosticAppointmentsApproveBit(appointmentID).subscribe(res => {
            let test = res;
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
            this.InsertVisitNotification();
            this.InsertNotiFicationVisitt()

          })
          Swal.fire(
            'Visited!',
            'Appointment has been Visited.',
            'success'
          )
        }
        else {
          this.getdiagnosticAppointmentsbyid();
          this.getdiagnosticAppointment();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        // title: 'Are you sure?',
        text: "Le patient s'est-il présenté ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OUI',
        cancelButtonText: 'RETOUR'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateDiagnosticAppointmentsApproveBit(appointmentID).subscribe(res => {
            let test = res;
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
            this.InsertVisitNotification();
            this.InsertNotiFicationVisitt()
          })
          Swal.fire(
            'Enregistré !',
            '',
            'success'
          )
        }
        else {
          this.getdiagnosticAppointmentsbyid();
          this.getdiagnosticAppointment();
        }
      })
    }

  }


  public canclediagnosticappointment() {

    this.docservice.UpdateDiagnosticAppointmentsByDiaCanceeled(this.cancelid).subscribe(
      data => {

        this.updatereson();
        this.getdiagnosticAppointmentsbyid();
        this.getdiagnosticAppointment();
        this.InsertCancelNotification();
        this.InsertNotiFicationCancel();

        if (this.languageid == 1) {
          debugger
          var smsdesc = "We regret but your appointment with " + this.candiagnostic + " on " + this.notificationdate + "  has not been accepted. Type : Home sample collection. "
          this.SendTwiliSms(this.smsmobileno, smsdesc)
        }
        else {
          var smsdesc = "Nous regrettons mais votre demande de RDV avec  " + this.candiagnostic + " le " + this.notificationdate + "  n'a pas été confirmée.Type : Prélèvements à domicile"
          debugger
          this.SendTwiliSms(this.smsmobileno, smsdesc)
        }
        this.SendCancelPatientmail()

        document.getElementById('Close').click();

      }, error => {
      }
    )
  }

  // public Appointmentstatus(appointmentID) {
  //  
  //   this.docservice.UpdateDiagnosticAppointments(appointmentID).subscribe(
  //     data => {
  //      
  //       Swal.fire('Completed', 'Appointment Completed', 'success');

  //       this.getdiagnosticAppointmentsbyid();

  //     }, error => {
  //     }
  //   )
  // }
  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }
  public updatereson() {
    var entity = {
      'ID': this.cancelid,
      'ReasonForCancel': this.reason
    }
    this.docservice.UpdateDiagnosticAppointmentsReasonForCancel(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        Swal.fire('', 'Order Cancelled Successfully');
      }
      else if (this.languageid == 6) {
        Swal.fire('', 'Commande annulée avec Succès.');
      }
    })

  }


  public dummattchmenturl = []

  public onattachmentUpload(abcd) {
    this.dummattchmenturl = []
    debugger
    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec Succés');
      abcd.length = 0;
    }

  }

  public uploadattachments() {
    debugger
    this.docservice.DiagnosticRecordUploads(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.dummattchmenturl.push(res);
      let a = this.dummattchmenturl[0].slice(2);

      // let b = 'https://maroc.voiladoc.org' + a;
      this.showphoto.push('assets/Images/pdf.png')
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }

  public diacentername: any;

  public GetUploadReportID(id, patientid, diagnosticCenterID, email, diacenter, smsmobileno) {
    this.appointmentsid = id;
    this.patientid = patientid;
    this.diaid = diagnosticCenterID;
    this.patientemail = email;
    this.diacentername = diacenter;
    this.smsmobileno = smsmobileno;
  }



  public insertdiagnosticupload() {

    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        'DiagnosticID': this.diaid,
        'PatientID': this.patientid,
        'FileURL': this.attachmentsurl[i],
        'Notes': this.notes,
        'AppointmentID': this.appointmentsid,

      }
      this.docservice.InsertPatient_DiagnosticUploads(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            debugger
            Swal.fire('Success', 'Report successfully sent to the patient');
            this.VisitOrder(this.appointmentsid);
            this.attachmentsurl.length = 0;
            this.showphoto.length = 0;
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
            this.Insertnotificationsoapnotesazuere();

            var smsdesc = "The lab has sent your test report. Please open Voiladoc app and book with your doctor if you require further consultation.";

            this.SendTwiliSms(this.smsmobileno, smsdesc)
            this.notes = ""
          }
          else {
            Swal.fire('Rapport envoyé avec succès au patient.');
            this.VisitOrder(this.appointmentsid);
            this.attachmentsurl.length = 0;
            this.showphoto.length = 0;
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
            this.Insertnotificationsoapnotesazuere();
            var smsdesc = "Le laboratoire a envoyé votre rapport de test. Veuillez ouvrir l'application Voiladoc et réserver avec votre médecin si vous avez besoin d'une consultation supplémentaire";

            this.SendTwiliSms(this.smsmobileno, smsdesc)
            this.notes = ""
          }
        }
        else {
          if (this.languageid == 1) {
            this.VisitOrder(this.appointmentsid);
            this.Insertnotificationsoapnotesazuere();
            this.UpdateDiaReport();
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
            var smsdesc = "Diagnostic Center has uploaded your report. please open voiladoc app and check ";

            this.SendTwiliSms(this.smsmobileno, smsdesc)
            Swal.fire('Success', 'Report successfully sent to the patient');
          }
          else {
            this.VisitOrder(this.appointmentsid);
            this.UpdateDiaReport();
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
            this.Insertnotificationsoapnotesazuere();
            var smsdesc = "Diagnostic Center has uploaded your report. please open voiladoc app and check ";

            this.SendTwiliSms(this.smsmobileno, smsdesc)

            Swal.fire('Rapport envoyé avec succès au patient.');
          }

        }
      })
    }


  }

  public patientemail: any;

  public Insertnotificationsoapnotesazuere() {

    var entity = {
      'Description': this.diacentername + " has uploaded your report. please open voiladoc app and check ",
      'ToUser': this.patientemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })

  }

  public VisitOrder(appointmentsid) {

    this.docservice.UpdateDiagnosticAppointmentsApproveBit(appointmentsid).subscribe(
      data => {

        this.getdiagnosticAppointmentsbyid();
        this.getdiagnosticAppointment();
        this.InsertVisitNotification();
        this.InsertNotiFicationVisitt()
      }, error => {
      }
    )
  }
  public UpdateDiaReport() {

    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        'AppointmentID': this.appointmentsid,
        'FileURL': this.attachmentsurl[i],
        'Notes': this.notes
      }
      this.docservice.UpdatePatient_DiagnosticUploads(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('Success', 'Report Updated Successfully');
            this.notes = "";
            this.attachmentsurl.length = 0;
            this.showphoto.length = 0;
            this.VisitOrder(this.appointmentsid);
          }
          else if (this.languageid == 6) {
            Swal.fire('Rapport envoyé');
            this.notes = "";
            this.attachmentsurl.length = 0;
            this.showphoto.length = 0;
            this.VisitOrder(this.appointmentsid);
          }

        }
      })
    }
  }
  hideupdate: any;


  public GetTestsID(id, hideupdate, details) {

    this.diatestid = id;
    this.hideupdate = hideupdate;
    this.smsmobileno = details.smsmobileno;
    this.email = details.relationemail

    this.GetDiaTests()
  }

  public GetDiaTests() {
    this.docservice.GetDiagnosticTestsByAppointmentIDWeb(this.languageid, this.diatestid).subscribe(
      data => {

        this.testslist = data;
      }, error => {
      }
    )
  }


  public GetPackageID(id) {

    this.packageid = id;
    this.GetPackageTests();
  }

  public GetPackageTests() {
    this.docservice.GetDiagnosticPackagesByAppointmentIDWeb(this.languageid, this.packageid).subscribe(
      data => {

        this.packagelist = data;
      }, error => {
      }
    )
  }



  //accept notification



  public InsertAccptNotification() {
    if (this.languageid == '1') {

      var entity = {
        'PatientID': this.accpatientid,
        'Notification': "Appointment confirmed",
        'Description': "Your Appointment with " + this.acceptcenter + " scheduled for " + this.accslot + "  has been Accepted.Type : Diagnostic center. Please arrive 10 minutes before your schedule time. ",
        'NotificationTypeID': 15,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.accpatientid,
        'Notification': "RDV confirmé",
        'Description': "Votre RDV avec " + this.acceptcenter + " le " + this.accslot + "  a été confirmé.Type : Au laboratoire. Veuillez arriver 10 minutes avant l'heure prévue.",
        'NotificationTypeID': 15,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }



  public InsertNotiFicationAccpt() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Appointment with " + this.acceptcenter + " scheduled for " + this.accslot + "  has been Accepted.",
        'ToUser': this.acpaemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre RDV avec " + this.acceptcenter + " le " + this.accslot + "  a été confirmé.Type : Au laboratoire ",
        'ToUser': this.acpaemail,
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
        'Notification': "Appointment not confirmed",
        'Description': "We regret but your appointment with " + this.candiagnostic + " on " + this.canslot + "  as not been confirmed.",
        'NotificationTypeID': 16,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "RDVnon confirmé",
        'Description': "Nous regrettons mais votre demande de RDV avec  " + this.candiagnostic + " le " + this.canslot + "  n'a pas été confirmée. ",
        'NotificationTypeID': 16,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }

  public InsertNotiFicationCancel() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "We regret but your appointment with " + this.candiagnostic + " on " + this.canslot + "  as not been confirmed.",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Nous regrettons mais votre demande de RDV avec  " + this.candiagnostic + " le " + this.canslot + "  n'a pas été confirmée. ",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }





  //visit email


  public InsertVisitNotification() {
    if (this.languageid == '1') {

      var entity = {
        'PatientID': this.vispatientID,
        'Notification': "Appointment Visited",
        'Description': "Your Appointment with " + this.visdianame + " scheduled for " + this.visslotName + "  a été visité.",
        'NotificationTypeID': 12,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.vispatientID,
        'Notification': "Rendez-vous visité",
        'Description': "Votre rendez-vous avec " + this.visdianame + " prévu pour " + this.visslotName + "  a été accepté.",
        'NotificationTypeID': 12,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }



  public InsertNotiFicationVisitt() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Appointment with " + this.visdianame + " scheduled for " + this.visslotName + " has been Visited.",
        'ToUser': this.visiemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre rendez-vous avec " + this.visdianame + " prévu pour " + this.visslotName + " a été visité.",
        'ToUser': this.visiemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }


  public homesamplelist: any;
  public orderid: any;
  public patientname: any;
  public address: any;
  public slottime: any;
  public appdate: any;
  public patientsmsmoblile: any;

  public GetAssaignOrderdetails(details) {

    this.orderid = details.id;
    this.patientid = details.patientID
    this.patientname = details.patientName
    this.address = details.address
    this.slottime = details.slotTime
    this.appdate = details.appdate
    this.patientsmsmoblile = details.smsmobileno
    debugger
    this.docservice.GetMyTeamAssainOrders(this.diagnosticid).subscribe(data => {
      this.homesamplelist = data;
    })
  }



  public Insertdetails(list) {

    var entity = {
      'OrderID': this.orderid,
      'PatientID': this.patientid,
      'DeliveryPatnerID': list.id
    }
    this.docservice.InsertDiagnostic_HomeSampleOrders(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Success', 'Order Assigned Successfully');
        var smsdesc = "A new appointment has been assigned to you with " + this.patientname + ", " + this.address + " at " + this.slottime + this.appdate + ". Please open your app and check the details."

        var smsdesc1 = this.user + "has asked lab technician " + list.name + "to come to your home to take your sample. Please wait for further updates."

        this.SendTwiliSms(list.smsmobileno, smsdesc)
        this.SendTwiliSms(this.patientsmsmoblile, smsdesc1)
        this.docservice.GetMyTeamAssainOrders(this.diagnosticid).subscribe(data => {
          this.homesamplelist = data;
        })
        this.getdiagnosticAppointment()
      }
      else if (this.languageid == 6) {
        debugger
        Swal.fire('', 'Commande assignée');
        var smsdesc = "Un nouveau rendez-vous a été attribué avec " + this.patientname + ", " + this.address + " à " + this.slottime + " , " + this.appdate + " . Veuillez ouvrir votre application et vérifier les détails."
        var smsdesc1 = this.user + " a attribué le technicien de laboratoire " + list.name + " d'arriver à votre domicile pour prélever votre échantillon. Veuillez attendre d'autres mises à jour."
        debugger
        this.SendTwiliSms(list.smsmobileno, smsdesc)
        this.SendTwiliSms(this.patientsmsmoblile, smsdesc1)
        debugger
        this.docservice.GetMyTeamAssainOrders(this.diagnosticid).subscribe(data => {
          this.homesamplelist = data;
        })
        this.getdiagnosticAppointment()
      }
    })
  }



  public InsertAvailabletest() {
    var txtAmount = this.testslist.filter(x => x.fees == 0);
    if (txtAmount.length != 0) {
      if (this.languageid == 1) {
        Swal.fire("For available drugs, please make sure you have entered the price and ticked the box in the corresponding action column.");
      }
      else {
        Swal.fire("Pour les médicaments disponibles veuillez-vous assurer d'avoir renseigné le prix et coché la case dans la colonne d'action correspondante.");
      }
    }
    else {
      for (let i = 0; i < this.testslist.length; i++) {
        var entity = {
          'ID': this.testslist[i].bookediid,
          'Available': this.testslist[i].available,
          'AppointmentID': this.diatestid,
          'Fees': this.testslist[i].fees
        }
        this.docservice.UpdateDiagnosticBookedTests(entity).subscribe(data => {
          if (this.languageid == 1) {
            Swal.fire('Updated Successfully');
          }
          else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec Succés');
          }

        })
      }
    }
    if (this.languageid == 1) {
      var smsdesc = "The lab has responded with price. Please open the Voiladoc app to view and confirm."
      this.SendTwiliSms(this.smsmobileno, smsdesc,)
      this.notiazure();
    }
    else {
      var smsdesc = "-	Le laboratoire a répondu avec des prix. Veuillez ouvrir l'application Voiladoc pour voir et confirmer."
      this.SendTwiliSms(this.smsmobileno, smsdesc)
      this.notiazure()
    }
  }
  email: any;

  public notiazure() {
    var entity = {
      'Description': "Le laboratoire a répondu avec des prix. Veuillez ouvrir l'application Voiladoc pour voir et confirmer.",
      'ToUser': this.email,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }




  // chat


  public GetShowOff() {
    document.getElementById("myForm").style.display = "none";
  }


  public GetShowID() {
    this.showwindow = 0
    document.getElementById("myForm").style.display = "none";


  }

  public showwindow: any;
  public chatappointmentid: any;
  public chatpatientemail: any;



  public GetChatShowID(details) {

    this.patientid = details.patientID;
    this.chatpatientemail = details.emailID;
    this.chatappointmentid = details.id;
    this.smsmobileno = details.smsmobileno

    document.getElementById("myForm").style.display = "block";

    this.showwindow = 1

    this.dosendmsg();


  }

  chatID: any;



  public dosendmsg() {
    var entity = {
      // 'ChatID': this.chatID,
      'DiagnosticID': this.diagnosticid,
      'PatientID': this.patientid,
      'AppointmentID': this.chatappointmentid
      // 'Read_Me': 0
    }
    this.docservice.InserDiagnostic_ChatMaster(entity).subscribe(data => {
      if (data != 0) {
        this.chatID = data;

        this.getPreviousChat();
        this.oberserableTimer();

        if (this.languageid == 1) {
          var smsdesc = this.user + " is trying to reach you on the chatline. Please open Voiladoc app to respond"
          this.SendTwiliSms(this.smsmobileno, smsdesc)
        }
        else {
          var smsdesc = this.user + " essaie de vous contacter sur la chatline. Veuillez ouvrir l'application Voiladoc pour répondre."
          this.SendTwiliSms(this.smsmobileno, smsdesc)
        }
      }
    })

  }


  public serverdateandtime: any;
  public servertime: any;
  public serverdate: any;

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



  public chatconversation: any;


  public InsertChatDetails() {
    let conversation = '[doc:-' + this.chatconversation + ';time:-' + this.servertime + ']';
    ;

    var entity = {
      'ChatID': this.chatID,
      'Message': conversation,
      'SenderID': this.diagnosticid,
      'Sender': 'Diagnostic',
      'MessageType': 1,
      'MobileMessage': this.chatconversation,
      'MobileTime': this.servertime
    }
    this.docservice.InsertDiagnostic_ChatDetails(entity).subscribe(data => {

      if (data != 0) {

      }
      this.chatconversation = "";

      this.getPreviousChat();
      this.InsertChatnotificationazure()


    })

  }



  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.getPreviousChat();

      var objDiv = document.getElementById("chatboxdiv");
      objDiv.scrollTop = objDiv.scrollHeight;


    });
  }


  public coversationarray = [];





  public getPreviousChat() {
    this.docservice.GetDiagnosticChatDetailsWeb(this.chatID).subscribe(res => {
      let Chatconversation = res;

      this.coversationarray.length = 0;

      for (let i = 0; i < Chatconversation.length; i++) {

        if (Chatconversation[i].sender == 'Patient') {
          this.coversationarray.push({
            chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'pat', msgtype: Chatconversation[i].messageType
          })
        }
        if (Chatconversation[i].sender == 'Diagnostic') {
          this.coversationarray.push({ chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'doc', msgtype: Chatconversation[i].messageType })
        }
      }
    })
  }

  public user: any;


  public InsertChatnotificationazure() {
    var entity = {
      'Description': this.user + ' Trying to reach you. Please open your voiladoc app : ' + this.chatconversation,
      'ToUser': this.chatpatientemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }




  public GetAttachments(id) {
    this.docservice.GetDiagnosticAppointmentPhotos(id).subscribe(data => {

      this.attachments = data;
    })
  }

  smsmobileno: any;

  public GetAppointmentAcceptBit(appointmentID, patientID, diagnosticCenterName, slotName, emailID, smsmobileno, homeTypeText) {
    this.appointmentsid = appointmentID;
    this.accpatientid = patientID;
    this.acceptcenter = diagnosticCenterName;
    this.accslot = slotName;
    this.acpaemail = emailID;
    this.smsmobileno = smsmobileno;
    this.appointmentext = homeTypeText;
  }



  public GetAppointmentAccept() {

    this.docservice.UpdateDiagnosticAppointmentsByType(this.appointmentsid, this.amount).subscribe(data => {

      this.getdiagnosticAppointmentsbyid();
      this.getdiagnosticAppointment();
      this.InsertAccptNotification()
      this.InsertNotiFicationAccpt()
      if (this.languageid == 1) {
        Swal.fire('Accepted', 'Order has been Accepted.');
        var smsdesc = "The lab has responded with price. Please open the Voiladoc app to view and confirm."
        this.SendTwiliSms(this.smsmobileno, smsdesc)

      }
      else {
        Swal.fire('Enregistré !.', 'Commande acceptée')
        var smsdesc = "Le laboratoire a répondu avec des prix. Veuillez ouvrir l'application Voiladoc pour voir et confirmer."
        this.SendTwiliSms(this.smsmobileno, smsdesc)
      }
    })
  }



  public GetPdf(pdf) {
    window.open(pdf, "_blank");
  }

  emailattchementurl = []
  cclist
  bcclist
  public SendCancelPatientmail() {

    if (this.languageid == 1) {
      var emailsubject = 'The lab has refused your appointment'
      var body = 'Dear ' + this.patientname + ',' + "<br><br>" + ' We regret but your request for an appointment with ' + this.user + " on " + this.notificationdate + 'has not been accepted.Please wait for further updates from the lab. Type: Home sample pickup' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc'
    }
    else {
      var emailsubject = 'Le laboratoire a refusé votre RDV'
      var body = 'Dear ' + this.patientname + ',' + "<br><br>" + ' Nous regrettons mais votre demande de RDV avec ' + this.user + " le " + this.notificationdate + " n'a pas été confirmée. Veuillez attendre d'autres mises à jour du laboratoire. Type : Collecte à domicile" + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc'
    }

    var entity = {
      'emailto': this.canemail,
      'emailsubject': emailsubject,
      'emailbody': body,
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }
}





