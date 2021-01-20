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

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
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



  public cancelmedicine(id, patientID, diagnosticCenterName, slotName, emailID) {

    this.cancelid = id;
    this.canpatientid = patientID;
    this.candiagnostic = diagnosticCenterName;
    this.canslot = slotName;
    this.canemail = emailID;
  }

  public Appointmentstatus(appointmentID, patientID, diagnosticCenterName, slotName, emailID) {

    this.accpatientid = patientID;
    this.acceptcenter = diagnosticCenterName;
    this.accslot = slotName;
    this.acpaemail = emailID;
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
        confirmButtonText: 'Qui',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateDiagnosticAppointments(appointmentID).subscribe(res => {
            let test = res;
            this.getdiagnosticAppointmentsbyid();
            this.getdiagnosticAppointment();
            this.InsertAccptNotification()
            this.InsertNotiFicationAccpt()
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
        confirmButtonText: 'Qui',
        cancelButtonText: 'Annuler'

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
        confirmButtonText: 'Qui',
        cancelButtonText: 'Annuler'
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
    this.docservice.DiagnosticRecordUploads(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      this.dummattchmenturl.push(res);
      let a = this.dummattchmenturl[0].slice(2);

      // let b = 'https://14.192.17.225' + a;
      this.showphoto.push('assets/Images/pdf.png')
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }

  public diacentername: any;

  public GetUploadReportID(id, patientid, diagnosticCenterID, email, diacenter) {
    this.appointmentsid = id;
    this.patientid = patientid;
    this.diaid = diagnosticCenterID;
    this.patientemail = email;
    this.diacentername = diacenter;
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
          Swal.fire('Success', 'Report Added Successfully');
          this.VisitOrder(this.appointmentsid);
          this.attachmentsurl.length = 0;
          this.showphoto.length = 0;
          this.getdiagnosticAppointmentsbyid();
          this.getdiagnosticAppointment();
        }
        else {
          this.VisitOrder(this.appointmentsid);
          this.UpdateDiaReport();
          this.getdiagnosticAppointmentsbyid();
          this.getdiagnosticAppointment();
        }
      })
    }
    this.Insertnotificationsoapnotesazuere();

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



  public GetTestsID(id) {

    this.diatestid = id;
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
        'Notification': "Appointment Accepted By Diagnostics",
        'Description': "Your Appointment with " + this.acceptcenter + " scheduled for " + this.accslot + "  has been Accepted.",
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
        'Notification': "Rendez-vous accepté par les diagnostics",
        'Description': "Votre rendez-vous avec " + this.acceptcenter + " prévu pour " + this.accslot + "  a été accepté.",
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
        'Description': "Your Appointment with " + this.acceptcenter + " scheduled for " + this.accslot + " has been Accepted.",
        'ToUser': this.acpaemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre rendez-vous avec " + this.acceptcenter + " prévu pour " + this.accslot + " a été accepté.",
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
        'Notification': "Appointment Cancelled By Diagnostics",
        'Description': "Your Appointment with " + this.candiagnostic + " scheduled for " + this.canslot + "  has been Cancelled.",
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
        'Notification': "Rendez-vous annulé par les diagnostics",
        'Description': "Votre rendez-vous avec " + this.candiagnostic + " prévu pour " + this.canslot + "  a été annulé.",
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
        'Description': "Your Appointment with " + this.canpatientid + " scheduled for " + this.canslot + " has been Cancelled.",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre rendez-vous avec " + this.candiagnostic + " prévu pour " + this.canslot + " a été annulé.",
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

  public GetAssaignOrderdetails(details) {
    debugger
    this.orderid = details.id;
    this.patientid = details.patientID
    this.docservice.GetMyTeamAssainOrders(this.diagnosticid).subscribe(data => {
      this.homesamplelist = data;
    })
  }



  public Insertdetails(list) {
    debugger
    var entity = {
      'OrderID': this.orderid,
      'PatientID': this.patientid,
      'DeliveryPatnerID': list.id
    }
    this.docservice.InsertDiagnostic_HomeSampleOrders(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Success', 'Order Assigned Successfully');
        this.docservice.GetMyTeamAssainOrders(this.diagnosticid).subscribe(data => {
          this.homesamplelist = data;
        })
        this.getdiagnosticAppointment()
      }
      else if (this.languageid == 6) {
        Swal.fire('', 'Commande assignée');
        this.docservice.GetMyTeamAssainOrders(this.diagnosticid).subscribe(data => {
          this.homesamplelist = data;
        })
        this.getdiagnosticAppointment()
      }
    })
  }



  public InsertAvailabletest() {
    for (let i = 0; i < this.testslist.length; i++) {
      var entity = {
        'ID': this.testslist[i].bookediid,
        'Available': this.testslist[i].available
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
    debugger
    this.patientid = details.patientID;
    this.chatpatientemail = details.emailID;
    this.chatappointmentid = details.id;

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
      debugger
      this.attachments = data;
    })
  }



  public GetAppointmentAcceptBit(appointmentID, patientID, diagnosticCenterName, slotName, emailID) {
    this.appointmentsid=appointmentID;
    this.accpatientid = patientID;
    this.acceptcenter = diagnosticCenterName;
    this.accslot = slotName;
    this.acpaemail = emailID;
  }



  public GetAppointmentAccept() {
    debugger
    this.docservice.UpdateDiagnosticAppointmentsByType(this.appointmentsid, this.amount).subscribe(data => {
      debugger
      this.getdiagnosticAppointmentsbyid();
      this.getdiagnosticAppointment();
      this.InsertAccptNotification()
      this.InsertNotiFicationAccpt()
      if (this.languageid == 1) {
        Swal.fire('Accepted', 'Order has been Accepted.');
      }
      else {
        Swal.fire('Enregistré !.','Commande acceptée')
      }
    })
  }


}





