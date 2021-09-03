import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bookappments',
  templateUrl: './bookappments.component.html',
  styleUrls: ['./bookappments.component.css']
})
export class BookappmentsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public doctorslotid: any;
  public slotname: any;
  public patientslist: any;
  public patientid: any;
  public patientname: any;
  public mobileno: any;
  public address: any;
  public email: any;
  public doctorid: any;
  public doctorhospitalid: any;
  public appointmentate: any;
  public appoentmenTypeid: any;
  public bookingtypeid: any;
  public combinationvalue: any;
  public patientdd = {}
  public appdate: any;
  public doctorlist: any;
  public languageid: any;
  public doctorname: any;
  public doctoremail: any;
  public user: any;
  PaymentTypeID: any
  labels: any
  SelectLabel: any
  appointmentid: any;
  search: any;
  showback: any;
  hospitalid: any;
  homevisit: boolean;
  ngOnInit() {

    this.user = localStorage.getItem('user');

    this.showback = localStorage.getItem('Showbutton');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {

      this.doctorslotid = params['doctorSlotID'];
      this.slotname = params['slotName'];
      this.PaidAmount = params['doctorFees'];
    }
    )
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search;

      }, error => {
      }
    )
    this.doctorid = localStorage.getItem('doctorid');

    // this.docservice.DoctorCommissionFees(this.languageid).subscribe(
    //   data => {
    //    
    //     let temp = data.filter(x => x.doctorID == this.doctorid);
    //     this.PaidAmount = data[0].fees;
    //   },
    //   error => { }s
    // );

    this.doctorhospitalid = localStorage.getItem('doctorhospitalid');
    this.appointmentate = localStorage.getItem('appointmentate')
    this.appoentmenTypeid = localStorage.getItem('Appointmenttypeid');
    this.bookingtypeid = localStorage.getItem('BookingTypeID');
    // this.PaidAmount = localStorage.getItem('fees');

    if (this.appoentmenTypeid == 1) {
      this.homevisit = false;
      this.combinationvalue = 'In Clinic';
      this.bookingtypeid = 0;
    }

    if (this.appoentmenTypeid == 2) {
      this.homevisit = false;
      this.combinationvalue = 'Video Conference';
    }
    if (this.appoentmenTypeid == 5) {
      this.homevisit = true;
      this.combinationvalue = 'Home Visit';
    }

    const format = 'dd-MMM-yyyy';
    const myDate = this.appointmentate;
    const locale = 'en-US';
    this.appdate = formatDate(myDate, format, locale);

    // const qwer = 'dd-MMM-yyyy';
    // const pljdjf = 'en-US';
    // const frdat = this.appointmentate;
    // this.appdate = formatDate(frdat, qwer, pljdjf);
    this.PaymentTypeID = "";

    this.GetPatients()
    this.GetNurses();
    this.getdoctorforadmin();
  }


  public getdoctorforadmin() {

    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.doctorlist = data;

        var list = this.doctorlist.filter(x => x.id == this.doctorid)
        this.doctorname = list[0].doctorName
        this.doctoremail = list[0].emailID

      }, error => {
      }
    )
  }


  NurseList: any
  public GetNurses() {
    this.docservice.GetNurseRegistrationAdmin().subscribe(
      data => {

        this.NurseList = data;
      },
      error => { }
    );
  }

  dummlist: any;
  public GetPatients() {

    if (this.showback == 1) {

      this.docservice.GetBookAppointmentByHospitalPatients(this.hospitalid, '2020-01-01', '2060-01-01').subscribe(
        data => {

          // this.patientslist = 
          // this.dummlist.filter(x => x.doctorID == this.doctorid)
          this.patientslist = data;
          this.patientdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'patientName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search
          };

        },
        error => { }
      );
    }
    else if (this.showback == 2) {
      this.docservice.GetBookAppointmentByHospitalPatients(this.hospitalid, '2020-01-01', '2060-01-01').subscribe(
        data => {

          this.dummlist = data;
          this.patientslist = this.dummlist.filter(x => x.doctorID == this.doctorid)
          // this.patientslist = data;
          this.patientdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'patientName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search
          };

        },
        error => { }
      );
    }
    // this.docservice.GetPatientRegistrationBook().subscribe(
    //   data => {

    //     this.patientslist = data;

    //     this.patientdd = {
    //       singleSelection: true,
    //       idField: 'id',
    //       textField: 'patientName',
    //       selectAllText: 'Select All',
    //       unSelectAllText: 'UnSelect All',
    //       itemsShowLimit: 3,
    //       allowSearchFilter: true,
    //       searchPlaceholderText: this.search
    //     };
    //   },
    //   error => { }
    // );
  }

  public smsmobileno: any;

  public GetPatientID(item: any) {

    this.patientid = item.id;
    var list = this.patientslist.filter(x => x.id == this.patientid)
    this.patientname = list[0].patientName
    this.mobileno = list[0].mobileNumber
    this.address = list[0].address
    this.email = list[0].emailID,
      this.smsmobileno = list[0].smsmobileno
  }
  NurseID
  public GetNurseID(event) {
    this.NurseID = event.target.value;
  }
  ReasonForVisit;
  PaidAmount;
  public bookappointment() {

    if (this.patientid == null || this.patientid == undefined) {
      Swal.fire("Please Select Patient")
    }
    else {
      var entity = {
        'DoctorID': this.doctorid,
        'PatientID': this.patientid,
        'Date': this.appointmentate,
        'ApptDatetime': this.appointmentate,
        'DoctorSlotID': this.doctorslotid,
        'DoctorHospitalDetailsID': this.doctorhospitalid,
        'BookingTypeID': this.bookingtypeid,
        'AppointmentTypeID': this.appoentmenTypeid,
        'CombinationValue': this.combinationvalue,
        'Slots': this.slotname,
        'PName': this.patientname,
        'PEmail': this.email,
        'PMobileNo': this.mobileno,
        'PRelation': '',
        'NurseID': 1,
        'ReasonForVisit': this.ReasonForVisit,
        'PaidAmount': this.PaidAmount,
        'HomeVisit': this.homevisit
      }
      this.docservice.InsertBookAppointmentForWeb(entity).subscribe(data => {
        this.appointmentid = data;
        if (data != 0) {
          this.InsertNotifiaction();
          this.InsertDocNotification()
          this.SendNotification();

          // this.insertpaymentDetails()
          //this.sendmail();

          if (this.showback == 1) {
            if (this.languageid == 1) {
              var smsdesc = "Thank you.Your appointment with  " + this.doctorname + " is scheduled for " + this.appdate + ", " + this.slotname + ", At" + this.user
              this.SendTwiliSms(smsdesc, this.smsmobileno);

              Swal.fire('Success', 'Appointment Booked Successfully');
              location.href = "#/Appointments"
            }
            else if (this.languageid == 6) {
              var smsdesc = "Vous avez une nouvelle demande de rendez-vous pour une consultation " + this.combinationvalue + " par  " + this.doctorname + " est confirmé.Date et heure :" + this.appdate + ", " + this.slotname
              this.SendTwiliSms(smsdesc, this.smsmobileno);
              Swal.fire('Rendez-vous est réservé');
              location.href = "#/Appointments"
            }
          }
          else {
            if (this.languageid == 1) {
              var smsdesc = "Thank you.Your appointment with  " + this.doctorname + " is scheduled for " + this.appdate + ", " + this.slotname + ", At" + this.user
              this.SendTwiliSms(smsdesc, this.smsmobileno);
              Swal.fire('Success', 'Appointment Booked Successfully');
              location.href = "#/DocRecpAppointments"
            }
            else if (this.languageid == 6) {
              var smsdesc = "Vous avez une nouvelle demande de rendez-vous pour une consultation " + this.combinationvalue + " par  " + this.doctorname + " est confirmé.Date et heure :" + this.appdate + ", " + this.slotname
              this.SendTwiliSms(smsdesc, this.smsmobileno);
              Swal.fire('Rendez-vous est réservé');
              location.href = "#/DocRecpAppointments"
            }
          }
        }
      })
    }
  }


  public insertpaymentDetails() {
    var entity = {
      'PatientID': this.patientid,
      'AppointmentID': this.appointmentid,
      'DoctorID': this.doctorid,
      'PaymentType': this.PaymentTypeID,
      'PaidAmount': this.PaidAmount,
      'TotalFeesOfDoctor': this.PaidAmount,
      'PaymentDate': this.appointmentate,
      'Reason': 'Payment Made For Appointment By Receptionst',
    }
    this.docservice.InsertPatientPaymentDetailsWeb(entity).subscribe(data => {

    })
  }



  public InsertNotifiaction() {
    var entity = {
      'PatientID': this.patientid,
      'Notification': "Appointment Fixed",
      'Description': "Thank you. Your appointment with  " + this.doctorname + " is scheduled for " + this.appdate + ", " + this.slotname + ", At" + this.user,
      'NotificationTypeID': 1,
      'Date': this.appdate,
      'LanguageID': this.languageid,
      'AppointmentID': this.appointmentid
    }
    this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }





  public InsertDocNotification() {
    if (this.languageid == 1) {
      var entity = {
        'PatientID': this.patientid,
        'DoctorID': this.doctorid,
        'Notification': "Appointment Fixed",
        'Description': "You have a new Appointment fixed for " + this.combinationvalue + " by" + this.doctorname + " is scheduled on " + this.appdate + ", " + this.slotname,
        'NotificationTypeID': 2,
        'Date': this.appdate,
        'LanguageID': this.languageid,
        'DoctorHospitalDetailsID': this.doctorhospitalid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotifications_DoctorWeb(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else {
      var entity = {
        'PatientID': this.patientid,
        'DoctorID': this.doctorid,
        'Notification': "Rendez-vous  confirmé.",
        'Description': "Vous avez une nouvelle demande de rendez-vous pour une consultation " + this.combinationvalue + " par  " + this.doctorname + " est confirmé.Date et heure :" + this.appdate + ", " + this.slotname,
        'NotificationTypeID': 2,
        'Date': this.appdate,
        'LanguageID': this.languageid,
        'DoctorHospitalDetailsID': this.doctorhospitalid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotifications_DoctorWeb(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }

  }




  public SendNotification() {

    var entity = {
      'Description': "Thank you. Your appointment with  " + this.doctorname + " is scheduled for " + this.appdate + ", " + this.slotname,
      'ToUser': this.email,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })

  }

  public sendmail() {
    var mailentity = {
      ToEmail: this.doctoremail,
      Subject: 'Appointment Booked',
      FromEmail: 'FccHealthcare@Fcc.Net',
      ContentType: "text/html",
      Content: "You have New appointment with  " + this.patientname + " is scheduled for " + this.appdate + ", " + this.slotname + "<br><br>Regards,<br>" + this.user,
    };

    this.docservice.SendMail(mailentity).subscribe(data => {

      Swal.fire('Mail sent successfully.');
    })
  }


  public GetPaymentTypeID(even) {

    this.PaymentTypeID = even.target.value;
  }




  public SendTwiliSms(smsdesc, smsmobileno) {
    debugger
    this.docservice.SendTwillioSMS(smsmobileno, smsdesc).subscribe(data => {
      debugger

    })
  }



  public InserBingoPayments() {
    var entity = {
      "PatientID": this.patientid,
      "ArchiveID": this.patientid,
      "FirstName": this.patientid,
      "LastName": this.patientid,
      "PhoneNo": this.patientid,
      "Address": this.patientid,
      "EmailID": this.patientid,
      "ClientServiceCharge": this.patientid,
      "ClientStampDuty": this.patientid,
      "Code": this.patientid,
      "CreationDate": this.patientid,
      "ExpirationDate": this.patientid,
      "ExternalID": this.patientid,
      "Offline": this.patientid,
      "PayUrl": this.patientid,
      "StampDuty": this.patientid,
      "Status": this.patientid,
      "TotalAmount": this.patientid
    }
    let headers = new Headers();
    headers.append("Authorization", "Basic YW5ndWxhci13YXJlaG91c2Utc2VydmljZXM6MTIzNDU2");
    this.docservice.InsertBingoPayments(entity).subscribe(data => {

    })
  }

}
