import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
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


  SDate=new Date();
  EDate=new Date();
  public todaydate:any;
  public nurseid:any;
  public appdate:any;



  public canappointmentid: any;
  public reason: any;
  public acceptappointmentid: any;
  public availbledate: any;
  time: any;
  public acceptnurseid:any;

  public CurrentTime:any;

  startdate:any;
  enddate:any;
  value:any;
  public serverdate: any;
  public servertime: any;
  public serverdateandtime: any;
  public slottime:any;

  public acceptslots: any;
  public acceptphysioname: any;
  public acceptpatientid: any;
  public acceptemail:any;
  public accepthospital:any;
  
  
  public canslots: any;
  public canphysioname: any;
  public canpatientid: any;
  public canemail:any;
  public canhospital:any;
  public ampmtime:any;


  public languageid: any;
  public labels:any;
  public visiname:any;
public vispatientid:any;
public visiemail:any;
public paidamount:any;
public walletamount:any;
public totaladdmoney:any;

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
  
    var kkk=this.SDate.setDate(this.SDate.getDate() - 0);
  var lll=this.EDate.setDate(this.EDate.getDate() + 7);

  const format = 'yyyy-MM-dd';
  const myDate = new Date();
  const locale = 'en-US';
  this.todaydate = formatDate(myDate, format, locale);
  this.startdate=formatDate(kkk, format, locale);
  this.enddate=formatDate(lll, format, locale);
  this.languageid = localStorage.getItem('LanguageID');
    this.physioid = localStorage.getItem('physioid');
    this.getphysiolist();
    this.getserverdateandtime();
 
    this.getlanguage();
  }

  public getlanguage()
  {
    this.docservice.GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )  
  }


  public getphysiolist() {
    this.docservice.GetBook_Physio_Appointment(this.physioid,this.startdate,this.enddate,this.languageid).subscribe(
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
  selectedDate(data){
    debugger
      // var sdate=data.split('-')
      // this.startdate=sdate[0]
      // this.enddate=sdate[1]
      this.startdate = data[0].toLocaleString().split(',')[0];
      this.enddate = data[1].toLocaleString().split(',')[0];
      this.physionappointments()
  }

  public physionappointments()
  {
    this.docservice.GetBook_Physio_Appointment(this.physioid,this.startdate,this.enddate,this.languageid).subscribe(
      data => {
        debugger
        this.appointmentist = data;
      }, error => {
      }
    )
  }

  
  public GetCancelAppointmentID(id,bookedTime,name,patientID,emailID,hospital_ClinicName,paidAmount,walletAmount) {
    debugger
    this.canappointmentid = id,
    this.canslots = bookedTime;
    this.canphysioname=name;
    this.canpatientid = patientID;
    this.canemail=emailID;
    this.canhospital=hospital_ClinicName;
    this.paidamount=paidAmount;
    this.walletamount=walletAmount;

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


  //accept notificatiom

  public InsertCancelNotification() {
    debugger
    if(this.languageid=='1')
    {
    var entity = {
      'PatientID': this.canpatientid,
      'Notification': "Appointment Cancelled By Physiotherapist.",
      'Description': "Your Appointment with " + this.canphysioname + " scheduled for " + this.canslots +  " has been Cancelled.We have Loaded Back Your Wallet With Ar" + this.paidamount + " Please Use Same For Next Booking",
      'NotificationTypeID': 26,
      'Date': this.todaydate,
      'LanguageID': this.languageid,
      'AppointmentID':this.canappointmentid
    }
    this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }

    })
  }
  else if(this.languageid=='6')
  {
    var entity = {
      'PatientID': this.canpatientid,
      'Notification': "Rendez-vous annulé par un physiothérapeute.",
      'Description': "Votre rendez-vous avec " + this.canphysioname + " prévu pour " + this.canslots + " a été annulé.Hemos cargado su billetera con Ar" + this.paidamount + " Utilice el mismo para la próxima reserva",
      'NotificationTypeID': 26,
      'Date': this.todaydate,
      'LanguageID': this.languageid,
      'AppointmentID':this.canappointmentid
    }
    this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }

    })
  }
  }
  public InsertNotiFicationCancel() {
    debugger
    if(this.languageid=='1')
    {
    var entity = {
      'Description': "Your Appointment with " + this.canphysioname + " scheduled for " + this.canslots + " has been Cancelled.We have Loaded Back Your Wallet With Ar" + this.paidamount + " Please Use Same For Next Booking",
      'ToUser': this.canemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }
    })
  }
  else if(this.languageid=='6')
  {
    var entity = {
      'Description': "Votre rendez-vous avec " + this.canphysioname + " prévu pour " + this.canslots  + " a été annulé.Hemos cargado su billetera con Ar" + this.paidamount + " Utilice el mismo para la próxima reserva",
      'ToUser': this.canemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }
    })
  }
  }




  public CancelAppointment() {
    this.docservice.UpdateBook_Physio_AppointmentcancelledBit(this.canappointmentid).subscribe(
      data => {
        debugger
        Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
      }, error => {
      }
    )
    this.updatereson();
    this.updatedateails()
    this.getphysiolist();
    this.physionappointments()
    this.InsertCancelNotification();
    this.InsertNotiFicationCancel();
  }


  public updatereson() {
    debugger
    var entity = {
      'ID': this.canappointmentid,
      'ReasonForCancel': this.reason
    }
    this.docservice.UpdateBook_Physio_AppointmentReasonForCancel(entity).subscribe(res => {
      let test = res;
      Swal.fire(' Cancelled', 'Appointment Cancelled Successfully');
      this.getphysiolist();
      this.physionappointments()

    })
  }

  public GetAcceptAppointmentID(id,phsysioid,bookedTime,name,patientID,emailID,hospital_ClinicName) {
    this.acceptappointmentid = id;
    this.acceptnurseid=phsysioid;
    this.acceptslots = bookedTime;
    this.acceptphysioname=name;
    this.acceptpatientid = patientID;
    this.acceptemail=emailID;
    this.accepthospital=hospital_ClinicName;

  }
  public acceptappointment()
  {
    this.docservice.UpdateBook_Physio_AppointmentAcceptedBit(this.acceptappointmentid).subscribe(
      data => {
        debugger
     
      }, error => {
      }
    )
    this.InsertNextAvailableSlots();
    this.InsertAcceptNotification();
    this.InsertNotiFicationAccept();
  }


  public InsertAcceptNotification() {
    debugger
    if(this.languageid=='1')
    {
    var entity = {
      'PatientID': this.acceptpatientid,
      'Notification': "Appointment Accepted By Physiotherapist.",
      'Description': "Your Appointment with " + this.acceptphysioname + " scheduled for " + this.acceptslots +" has been Accepted.",
      'NotificationTypeID': 26,
      'Date': this.todaydate,
      'LanguageID': this.languageid,
      'AppointmentID':this.acceptappointmentid
      
    }
    this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
      debugger
      if (data != 0) {
      }
    })
  }
  else if(this.languageid=='6')
  {
    var entity = {
      'PatientID': this.acceptpatientid,
      'Notification': "Rendez-vous accepté par un physiothérapeute.",
      'Description': "Votre rendez-vous avec " + this.acceptphysioname + " prévu pour " + this.acceptslots +" a été accepté.",
      'NotificationTypeID': 26,
      'Date': this.todaydate,
      'LanguageID': this.languageid,
      'AppointmentID':this.acceptappointmentid
    }
    this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }

    })
  }
  }
  public InsertNotiFicationAccept() {
    debugger
    if(this.languageid=='1')
    {
    var entity = {
      'Description': "Your Appointment with " + this.acceptphysioname + " scheduled for " + this.acceptslots +" has been Accepted.",
      'ToUser': this.acceptemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }
    })
  }
  else if(this.languageid=='6')
  {
    var entity = {
      'Description': "Votre rendez-vous avec " + this.acceptphysioname + " prévu pour " + this.acceptslots + " a été accepté.",
      'ToUser': this.acceptemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }
    })
  }
  }





  public getfromampm(even)
  {
    debugger
    this.ampmtime=even.target.value;
  }




  public InsertNextAvailableSlots() {
    debugger
    var entity = {
      'AppointmentID': this.acceptappointmentid,
      'AvailabilityTime':  this.time
    }
    this.docservice.UpdatePhysiotherapist_AvailabilitySlotsTime(entity).subscribe(res => {
      let test = res;
      this.getphysiolist();
      this.physionappointments()
      Swal.fire('Accepted','Appointment Accepted Successfully');

    })
  }


  public GetTime(even) {
    debugger
    this.time = even.target.value;
  }

  visitid:any;

  public UpdateVisitedbit(id,bookedTime,appdate,name,patientID,emailID) {
    this.slottime=bookedTime;
    this.appdate=appdate;
    this.visiname=name;
    this.vispatientid=patientID;
    this.visiemail=emailID;
    this.visitid=id
    debugger;
    if(this.serverdate>=this.slottime)
    {
      if(this.servertime>=this.servertime)
      {
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
      }
      }
      else{
        Swal.fire("The Appointment Time is"+this.slottime)
      }

      
    }


    public UpdatepatientNotVisited(id)
    {
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
      debugger
      if(this.languageid=='1')
      {
      var entity = {
        'PatientID': this.vispatientid,
        'Notification': "Appointment Visited",
        'Description': "Your Appointment with " + this.visiname + " scheduled for " + this.slottime +" has been Visited.",
        'NotificationTypeID': 26,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID':this.visitid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
        debugger
        if (data != 0) {
        }
      })
    }
    else if(this.languageid=='6')
    {
      var entity = {
        'PatientID': this.vispatientid,
        'Notification': "Rendez-vous accepté par un physiothérapeute.",
        'Description': "Votre rendez-vous avec " + this.visiname + " prévu pour " + this.slottime +"a été visité.",
        'NotificationTypeID': 26,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID':this.visitid
      }
      this.docservice.InsertNotificationsNotifications_NPMWeb(entity).subscribe(data => {
        debugger
        if (data != 0) {
  
        }
  
      })
    }
    }
    public InsertNotiFicationVisited() {
      debugger
      if(this.languageid=='1')
      {
      var entity = {
        'Description': "Your Appointment with " + this.visiname + " scheduled for " + this.slottime +" has been Visited.",
        'ToUser': this.visiemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
        if (data != 0) {
  
        }
      })
    }
    else if(this.languageid=='6')
    {
      var entity = {
        'Description': "Votre rendez-vous avec " + this.visiname + " prévu pour " + this.slottime + " a été visité.",
        'ToUser': this.visiemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
        if (data != 0) {
  
        }
      })
    }
    }
}
