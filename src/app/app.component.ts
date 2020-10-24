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
    this.pharmacyid = localStorage.getItem('pharmacyid');

    this.roleid = localStorage.getItem('roleid');
    this.doctorid = localStorage.getItem('userid');
    this.nurseid = localStorage.getItem('nurseid');
    this.midwifeid = localStorage.getItem('midwifeid');
    this.physioid = localStorage.getItem('physioid');
    this.supportid = localStorage.getItem('supportid')
    this.oberserableTimer();
    this.user = localStorage.getItem('user');
    this.getlanguage();
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

  }
  public getlanguage() {
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  oberserableTimer() {

    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      if (this.doctorid != null) {
        this.GetDoctorNotifications();
     

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
    });
  }

  public GetDoctorNotifications() {
    this.docservice.GetNotifications_DoctorByDoctorID(this.doctorid).subscribe(data => {
      this.doctorNotifications = data;
      this.notificationcount = data[0].notifycount;
    })
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

  public setCookie(cname, cvalue)
  {
    
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
}