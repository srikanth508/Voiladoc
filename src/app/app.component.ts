import { Component } from '@angular/core';
import { HelloDoctorService } from '../app/hello-doctor.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { nbLocale } from "ngx-bootstrap/locale";
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('de', deLocale);
defineLocale("es", nbLocale);
defineLocale("fr", frLocale);
import { listLocales } from 'ngx-bootstrap/chronos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  public locales = listLocales();
  vid: number;
  constructor(public docservice: HelloDoctorService, private localeService: BsLocaleService) { }

  public temp: any;
  public roleid: any;
  public userid: any;
  public doctorid: any;
  public notifications = [];
  public notificationcount: any;
  public doctorNotifications: any;
  public doctorname: any;
  public email: any;
  public date: any;
  public user: any;
  public languageid: any;
  public labels: any;
  public pharmacyid: any;
  public phanotifications = []
  public show: any;
  public isMobileResolution: boolean;
  public isDescktopResolution: boolean;
  public showsidebar: any;
  public nurseid: any;
  public midwifeid: any;
  public physioid: any;
  public supportid: any;
  setvideosidebar: any;
  hidesidebar
  docnoti
  labels10: any;

  ngOnInit() {
    this.show = 1;
    this.showsidebar = 0;
    this.languageid = localStorage.getItem('LanguageID');


    this.vid = this.docservice.showvid;
    if (this.languageid == 1) {

    }
    else {
      this.localeService.use('fr');
    }
    this.temp = sessionStorage.getItem('temp');

    if (this.temp == 1) {

    }
    else {
      sessionStorage.clear();
      localStorage.clear();
      location.href = "#/login";
    }
    this.pharmacyid = localStorage.getItem('pharmacyid');

    this.roleid = localStorage.getItem('roleid');
    this.doctorid = localStorage.getItem('userid');
    this.nurseid = localStorage.getItem('nurseid');
    this.midwifeid = localStorage.getItem('midwifeid');
    this.physioid = localStorage.getItem('physioid');
    this.supportid = localStorage.getItem('supportid');
    this.oberserableTimer();
    this.user = localStorage.getItem('user');
    this.getlanguage();
    this.getlanguage2();
    this.getserverdateandtime();
    this.GetDoctorNotifications();
    this.GetDocnoti()
    this.obserbaletimedocnoti()
    if (window.innerWidth < 600) {
      this.isMobileResolution = true;
      this.isDescktopResolution = false;
    } else {
      this.isMobileResolution = false;
      this.isDescktopResolution = true;
    }

    this.GetChatnotificationslist();
    this.getlanguageprescription();
  }
  public getlanguage() {
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  public getlanguageprescription() {
    this.docservice.GetAdmin_PharmacyLoginDoctorPrescriptionReports_label(this.languageid).subscribe(
      data => {

        this.labels10 = data;
      }, error => {
      }
    )
  }


  oberserableTimer() {

    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      if (this.doctorid != null) {
        this.GetDoctorNotifications();
        this.GetChatnotificationslist();
        this.docservice.GetNotifications_DoctorByDoctorID(this.doctorid).subscribe(data => {
          this.doctorNotifications = data;
          this.notificationcount = data[0].notifycount;
        })
        this.docservice.GetChatForNotificationForDoctor(this.doctorid).subscribe(
          data => {

            let alldata = data;
            this.notificationcount = 0
            this.notifications = [];
            this.notificationcount = data[0].notifycount;
            this.docservice.GetNotifications_DoctorByDoctorID(this.doctorid).subscribe
              (datas => {
                this.doctorNotifications = datas;
                this.notificationcount = (this.doctorNotifications[0].notifycount);
              })

          }, error => {
          }
        )
        this.GetDoctorNotifications();
      }
      else if (this.nurseid != null && this.nurseid != undefined) {

        this.docservice.GetNotifications_NPMWebCOunt(this.nurseid, 25, this.languageid).subscribe
          (datas => {

            this.doctorNotifications = datas;
            this.notificationcount = Number(this.doctorNotifications[0].notifycount);
          })
      }
      else if (this.midwifeid != null && this.midwifeid != undefined) {
        this.docservice.GetNotifications_NPMWebCOunt(this.midwifeid, 27, this.languageid).subscribe
          (datas => {
            this.doctorNotifications = datas;
            this.notificationcount = Number(this.doctorNotifications[0].notifycount);
          })
      }
      else if (this.physioid != null && this.physioid != undefined) {
        this.docservice.GetNotifications_NPMWebCOunt(this.physioid, 26, this.languageid).subscribe
          (datas => {
            this.doctorNotifications = datas;
            this.notificationcount = Number(this.doctorNotifications[0].notifycount);
          })
      }
      else if (this.supportid != null && this.supportid != undefined) {
        this.docservice.GetSupportForWebNotifications(this.languageid).subscribe
          (datas => {
            this.doctorNotifications = datas;
            this.notificationcount = Number(this.doctorNotifications[0].notifycount);
          })
      }
      else if (this.pharmacyid != null && this.pharmacyid != undefined) {
        this.docservice.GetNotification_Pharmacy(this.pharmacyid).subscribe
          (datas => {
            this.notificationcount = 0;

            this.pharmcunoti = datas;
            this.notificationcount = Number(this.pharmcunoti[0].notifycount);
            // Swal.fire('New Notifications');
          })
      }

    });
  }

  public pharmcunoti: any;




  public GetDoctorNotifications() {
    this.docservice.GetNotifications_DoctorByDoctorID(this.doctorid).subscribe(data => {
      this.doctorNotifications = data;
      this.notificationcount = data[0].notifycount;
    })
  }


  // public ChatNotifications: any;
  // public PatientID = [];
  // public chatIdarray = [];
  // public chatconversationarray = [];
  chatlist: any;
  // public chatid: any;
  // testdisplay: any;

  public GetChatnotificationslist() {
    this.docservice.GetDoctor_ChatDetailsByDoctor(this.doctorid).subscribe(datassss => {
      this.chatlist = datassss;
      if (this.chatlist.length > 0) {
        document.getElementById("Myformsss").style.display = "block";
      }
      else {
        document.getElementById("Myformsss").style.display = "none";
      }
    })



    // this.docservice.GetChatMasterByDoctorID(this.doctorid).subscribe
    //   (datas => {
    //     this.ChatNotifications = datas;
    //     for (let i = 0; i < this.ChatNotifications.length; i++) {
    //       this.chatIdarray.push(this.ChatNotifications[i].chatID)

    //     }

    //     for (let j = 0; j < this.chatIdarray.length; j++) {
    //       
    //       this.chatid=this.chatIdarray[j];

    //     }
    //     this.getchatdetails()
    //   })
  }

  display: any;

  // public onclosetest() {
  //   this.testdisplay = "none";
  // }

  // public getchatdetails()
  // {
  //   this.docservice.GetDoctor_ChatDetailsByDoctor(120).subscribe(datassss => {
  //     
  //     this.chatlist = datassss;
  //     
  //     if (this.chatlist.length >1) {
  //         this.chatconversationarray.push(this.chatlist);
  //         this.display=1

  //        document.getElementById('sideModalTR').click();
  //       
  //     }
  //     else {

  //     }
  //   })
  // }
  public labels2: any;

  public getlanguage2() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels2 = data;

      }, error => {
      }
    )
  }


  obserbaletimedocnoti() {

    const source = timer(1000, 20000);
    const abc = source.subscribe(val => {

      this.GetDocnoti()
    });
  }


  public GetDocnoti() {


    this.docservice.GetNotifications_DoctorByDoctorIDTop1(this.doctorid).subscribe(data => {
      this.docnoti = data;
      // this.notificationcount = data[0].notifycount;
    })

  }
  onActivate(event) {
    window.scroll(0, 0);
  }

  public clear() {
    sessionStorage.clear();
    localStorage.clear();
    location.href = "#/login";
    location.reload();
    this.setCookie("doc_id", "")
  }

  public setCookie(cname, cvalue) {

    document.cookie = cname + "=" + cvalue;
  }

  public Update_appointmentFordemand(doctorHospitalDetailsID, doctorID, appointmentID, notificationID, emailID, doctorName, date) {

    this.doctorname = doctorName,
      this.email = emailID,
      this.date = date

    this.docservice.Update_AppointmentForOnDemandVideoConferenceForDoctor(doctorHospitalDetailsID, doctorID, appointmentID, notificationID).subscribe(data => {

      if (data != undefined) {
        this.GetDoctorNotifications();
        this.Insertvisitnotificatiaccept()
      }

    })
  }



  public Insertvisitnotificatiaccept() {

    var entity = {
      'Description': "Your Video Conference Request is Accepted By Doctor : " + this.doctorname + ", Date " + this.date + ".",
      'ToUser': this.email,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }





  public RejectVedioAppointment(appointmentID) {
    this.docservice.UpdateNotifications_DoctorRejectedBit(appointmentID).subscribe(
      data => {

        // Swal.fire('Completed', 'Visited Successfully');

        //  this.InservisitNotification()

      }, error => {
      }
    )
  }


  public updateseenbit(id) {
    this.docservice.UpdateNotifications_DoctorSeenBit(id).subscribe(
      data => {

        // Swal.fire('Completed', 'Visited Successfully');

        //  this.InservisitNotification()
        this.oberserableTimer()
        this.ngOnInit()

      }, error => {
      }
    )
  }



  public UpdateDoctorSeenAll(id) {
    this.docservice.UpdateNotifications_DoctorSeenBitAll(id).subscribe(
      data => {

        // Swal.fire('Completed', 'Visited Successfully');

        //  this.InservisitNotification()
        this.oberserableTimer()
        this.ngOnInit()

      }, error => {
      }
    )
  }


  public updatesupportseenbit(id) {
    this.docservice.UpdateSupportForWebNotificationsSeenBit(id).subscribe(
      data => {

        // Swal.fire('Completed', 'Visited Successfully');

        //  this.InservisitNotification()
        this.oberserableTimer()
        this.ngOnInit()

      }, error => {
      }
    )
  }


  public UpdateNursePhysiomidwifeseenbit(id) {
    this.docservice.UpdateNotifications_NPMSeenBit(id).subscribe(
      data => {

        // Swal.fire('Completed', 'Visited Successfully');

        //  this.InservisitNotification()
        this.oberserableTimer()
        this.ngOnInit()

      }, error => {
      }
    )
  }



  public openNav() {

    this.show = 0;
    this.showsidebar = 1;
    document.getElementById("sidenav").style.width = "230px";
    document.getElementById("main").style.marginLeft = "230px";
  }

  public closeNav() {

    this.show = 1;
    this.showsidebar = 0;
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  // show1
  // showsidebar1
  // public openNav1() {
  //  
  //   this.show1 = 0;
  //   this.showsidebar1 = 1;
  //   document.getElementById("mySidenav").style.width = "230px";
  //   document.getElementById("main").style.marginLeft = "230px";
  // }

  // public closeNav1() {
  //  
  //   this.show1 = 1;
  //   this.showsidebar1 = 0;
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.marginLeft = "0";
  // }


  public GetShowOffffff() {
    document.getElementById("myFormsssss").style.display = "none";
  }


  public patientiddd: any;
  public chatappointmentid: any;



  public GetChatShowID(patientid, appointmentID) {
    debugger
    this.patientiddd = patientid;
    this.chatappointmentid = appointmentID;
    document.getElementById("myFormsssss").style.display = "block";
    this.dosendmsg()
  }


  public dosendmsg() {
    debugger
    var entity = {
      // 'ChatID': this.chatID,
      'DoctorID': this.doctorid,
      'PatientID': this.patientiddd,
      'AppointmentID': this.chatappointmentid
      // 'Read_Me': 0
    }
    this.docservice.InsertChatMaster(entity).subscribe(data => {
      if (data != 0) {
        this.chatID = data;
        debugger
        debugger
        this.getPreviousChat();
        this.oberserableTimerchat();
      }
    })
  }


  oberserableTimerchat() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.getPreviousChat();

      var objDiv = document.getElementById("chatboxdiv");
      objDiv.scrollTop = objDiv.scrollHeight;

    });
  }




  public chatconversation = "";

  public docmsges = [];
  public patientmsges = [];
  public istyping = false;
  coversationarray = [];

  public patientphoto: any;
  public docphoto: any;
  public chatID: any;
  public attachments = [];

  public imageurl: any;
  public image: any;
  public servertime: any;


  serverdateandtime: any;
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




  public InsertChatDetails() {
    let conversation = '[doc:-' + this.chatconversation + ';time:-' + this.servertime + ']';
    ;
    if (this.image == 0) {
      var entity = {
        'ChatID': this.chatID,
        'Message': conversation,
        'SenderID': this.doctorid,
        'Sender': 'Doctor',
        'MessageType': 1,
        'MobileMessage': this.chatconversation,
        'MobileTime': this.servertime
      }
      this.docservice.InsertChatDetails(entity).subscribe(data => {

        if (data != 0) {

        }
        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();
        // this.InsertChatnotificationazure()


      })
    }
    else {
      var entitys = {
        'ChatID': this.chatID,
        'Message': this.imageurl,
        'SenderID': this.doctorid,
        'Sender': 'Doctor',
        'MessageType': 1,
        'MobileMessage': this.chatconversation,
        'MobileTime': this.servertime
      }
      this.docservice.InsertChatDetails(entitys).subscribe(data => {

        if (data != 0) {

        }
        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();
        // this.InsertChatnotificationazure()
      })
    }
  }


  public getPreviousChat() {
    debugger
    this.docservice.GetDoctor_ChatDetailsMobileWeb(this.chatID).subscribe(res => {
      let Chatconversation = res;
      debugger
      this.coversationarray.length = 0;
      debugger
      for (let i = 0; i < Chatconversation.length; i++) {

        if (Chatconversation[i].sender == 'Patient') {
          this.coversationarray.push({
            chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'pat', msgtype: Chatconversation[i].messageType
          })
        }
        debugger
        if (Chatconversation[i].sender == 'Doctor') {
          this.coversationarray.push({ chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'doc', msgtype: Chatconversation[i].messageType })
        }
      }
    })
  }







  //phrmacy notifications


  public RejectPhrmacyOrder() {
    this.docservice.UpdateNotification_PharmacyRejected(this.pharmacyid, this.details.orderID).subscribe(
      data => {
        debugger
        this.InsertRejectNotification();
        this.InsertPharmcyRejectedNotification();
        if (this.details.sendnotification == 2) {
          debugger
          this.InsertAllPhrmacyrejectedOrder();
          this.InsertRejectAllpharmacy();
          this.UpdateReorderBit();
          this.Deletemedicine();
        }
        if (this.languageid == 1) {
          Swal.fire('Success', 'Order Rejected Successfully');
        }
        else if (this.languageid == 6) {
          Swal.fire('Succès', 'Commande rejetée avec succès');
        }
      }, error => {
      }
    )
  }

  public Deletemedicine() {
    this.docservice.DeletePatient_TextMedicineDetailsByID(this.details.orderID).subscribe(data => {

    })
  }


  public InsertRejectAllpharmacy() {
    debugger
    var entity = {
      'Description': "All Pharmacies Rejected Your Order. Please Reorder Again.",
      'ToUser': this.details.emailID,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }

  public InsertRejectNotification() {
    var entity = {
      'Description': this.details.pharmacyName + " Rejected You Medicine Order ",
      'ToUser': this.details.emailID,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }


  public AcceptPharmacyOrder() {
    this.docservice.UpdateNotification_PharmacyAccepted(this.pharmacyid, this.details.orderID).subscribe(
      data => {
        this.InsertAcceptedNotification()
        this.InsertPharmacyAcceptNotifications()
        if (this.languageid == 1) {
          Swal.fire('Success', 'Order Accepted Successfully');
          location.href = "#/DoctorPrescription"
        }
        else if (this.languageid == 6) {
          Swal.fire('Succès', 'Commande acceptée avec succès');
          location.href = "#/DoctorPrescription"
        }
      }, error => {
      }
    )
  }

  public InsertAcceptedNotification() {
    var entity = {
      'Description': this.details.pharmacyName + " Accepted You Medicine Order ",
      'ToUser': this.details.emailID,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }



  public InsertPharmacyAcceptNotifications() {
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.details.patientID,
        'Notification': this.details.pharmacyName + " Accepted Your Medicine order",
        'Description': this.details.pharmacyName + " Accepted Your Medicine order",
        'NotificationTypeID': 201,
        'Date': new Date(),
        'LanguageID': this.languageid,
        'AppointmentID': 0
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.details.patientID,
        'Notification': this.details.pharmacyName + " Accepté votre commande de médicaments.",
        'Description': this.details.pharmacyName + " Accepté votre commande de médicaments.",
        'NotificationTypeID': 201,
        'Date': new Date(),
        'LanguageID': this.languageid,
        'AppointmentID': 0
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }

      })
    }
  }


  public InsertPharmcyRejectedNotification() {
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.details.patientID,
        'Notification': this.details.pharmacyName + " Rejected Your Medicine order",
        'Description': this.details.pharmacyName + " Rejected Your Medicine order",
        'NotificationTypeID': 202,
        'Date': new Date(),
        'LanguageID': this.languageid,
        'AppointmentID': 0
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.details.patientID,
        'Notification': this.details.pharmacyName + " Accepté votre commande de médicaments.",
        'Description': this.details.pharmacyName + " Accepté votre commande de médicaments.",
        'NotificationTypeID': 202,
        'Date': new Date(),
        'LanguageID': this.languageid,
        'AppointmentID': 0
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {
        if (data != 0) {
        }
      })
    }
  }

  
  public show1: any;
  public acceptrejectid: any;
  public details: any;

  public orderedmedicinelist: any;
  public ViewMedicines(docnoti) {
    this.acceptrejectid = docnoti.id
    this.details = docnoti
    this.docservice.GetPatientOrderedMedicines(docnoti.orderID,this.languageid).subscribe(
      data => {
        this.orderedmedicinelist = data;
      }, error => {
      }
    )
  }

  public prescriptionid: any;
  public UpdateReorderBit() {
    for (let i = 0; i < this.orderedmedicinelist.length; i++) {
      debugger
      this.prescriptionid = this.orderedmedicinelist[i].docPrID
      this.docservice.UpdateDoctor_PatientPrescriptionreorderBit(this.prescriptionid).subscribe(
        data => {
          debugger
        }, error => {
        }
      )
    }

  }


  public InsertAllPhrmacyrejectedOrder() {
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.details.patientID,
        'Notification': "All pharmacies Rejected Your Order.Please Reorder Again ",
        'Description': "All pharmacies Rejected Your Order.Please Reorder Again ",
        'NotificationTypeID': 202,
        'Date': new Date(),
        'LanguageID': this.languageid,
        'AppointmentID': 0
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.details.patientID,
        'Notification': "All pharmacies Rejected Your Order.Please Reorder Again.",
        'Description': "All pharmacies Rejected Your Order.Please Reorder Again ",
        'NotificationTypeID': 202,
        'Date': new Date(),
        'LanguageID': this.languageid,
        'AppointmentID': 0
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {
        if (data != 0) {
        }
      })
    }
  }
}