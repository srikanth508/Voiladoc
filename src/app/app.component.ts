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

  ngOnInit() {
    this.show = 1;
    this.showsidebar = 0;
    this.languageid = localStorage.getItem('LanguageID');
    debugger
    this.vid=this.docservice.showvid;
    if (this.languageid == 1) {

    }
    else {
      this.localeService.use('fr');
    }

    this.pharmacyid = localStorage.getItem('pharmacyid');
    this.temp = sessionStorage.getItem('temp');
    this.roleid = localStorage.getItem('roleid');
    this.doctorid = localStorage.getItem('userid');
    //  this.oberserableTimer();
    this.user = localStorage.getItem('user');
    this.getlanguage();
    this.GetDoctorNotifications();

    if (window.innerWidth < 600) {
      this.isMobileResolution = true;
      this.isDescktopResolution = false;
    } else {
      this.isMobileResolution = false;
      this.isDescktopResolution = true;
    }

  }
  public getlanguage() {
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  oberserableTimer() {
    this.GetDoctorNotifications();
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      if (this.doctorid != null) {
        this.docservice.GetChatForNotificationForDoctor(this.doctorid).subscribe(
          data => {
            debugger
            let alldata = data;
            // this.notificationcount = 0
            this.notifications = [];
            this.notificationcount = data[0].notifycount;
            this.docservice.GetNotifications_DoctorByDoctorID(this.doctorid).subscribe
              (datas => {
                this.doctorNotifications = datas;
                this.notificationcount = Number(this.notificationcount) + (this.doctorNotifications[0].notifycount);
              })
            for (let n = 0; n < alldata.length; n++) {
              var chatttty = {
                'Msg': alldata[n].patientName + ' has left you a message.',
                'PatientID': alldata[n].patientID,
                'DoctorID': this.doctorid
              }
              this.notifications.push(chatttty);
            }
          }, error => {
          }
        )
        // this.GetDoctorNotifications();


      }
      else if (this.pharmacyid != null && this.pharmacyid != undefined) {
        this.docservice.GetChatForNotificationForPharmacy(this.pharmacyid).subscribe(
          data => {
            debugger
            let alldata = data;
            this.notificationcount = 0
            this.phanotifications = [];
            this.notificationcount = data[0].notifycount;
            for (let n = 0; n < alldata.length; n++) {
              var chatttty = {
                'Msg': alldata[n].patientName + ' has left you a message.',
                'PatientID': alldata[n].patientID,
                'PharmacyID': this.pharmacyid
              }
              this.phanotifications.push(chatttty);
            }
          }, error => {
          }
        )
      }
    });
  }

  public GetDoctorNotifications() {
    this.docservice.GetNotifications_DoctorByDoctorID(this.doctorid).subscribe(data => {
      this.doctorNotifications = data;
      this.notificationcount = data[0].notifycount;
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
  }
  public Update_appointmentFordemand(doctorHospitalDetailsID, doctorID, appointmentID, notificationID, emailID, doctorName, date) {
    debugger
    this.doctorname = doctorName,
      this.email = emailID,
      this.date = date

    this.docservice.Update_AppointmentForOnDemandVideoConferenceForDoctor(doctorHospitalDetailsID, doctorID, appointmentID, notificationID).subscribe(data => {
      debugger
      if (data != undefined) {
        this.GetDoctorNotifications();
        this.Insertvisitnotificatiaccept()
      }

    })
  }



  public Insertvisitnotificatiaccept() {
    debugger
    var entity = {
      'Description': "Your Video Conference Request is Accepted By Doctor : " + this.doctorname + ", Date " + this.date + ".",
      'ToUser': this.email,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }
    })
  }





  public RejectVedioAppointment(appointmentID) {
    this.docservice.UpdateNotifications_DoctorRejectedBit(appointmentID).subscribe(
      data => {
        debugger
        // Swal.fire('Completed', 'Visited Successfully');

        //  this.InservisitNotification()

      }, error => {
      }
    )
  }


  public updateseenbit(id) {
    this.docservice.UpdateNotifications_DoctorSeenBit(id).subscribe(
      data => {
        debugger
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
    debugger
    this.show = 1;
    this.showsidebar = 0;
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}