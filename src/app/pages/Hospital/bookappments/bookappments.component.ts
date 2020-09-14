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
  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.doctorslotid = params['doctorSlotID'];
      this.slotname = params['slotName'];
    }
    )
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel = this.labels[0].select;

      }, error => {
      }
    )
    this.doctorid = localStorage.getItem('doctorid');

    this.docservice.DoctorCommissionFees(this.languageid).subscribe(
      data => {
        debugger;
        let temp = data.filter(x => x.doctorID == this.doctorid);
        this.PaidAmount = data[0].fees;
      },
      error => { }
    );
    debugger;
    this.doctorhospitalid = localStorage.getItem('doctorhospitalid');
    this.appointmentate = localStorage.getItem('appointmentate')
    this.appoentmenTypeid = localStorage.getItem('Appointmenttypeid');
    this.bookingtypeid = localStorage.getItem('BookingTypeID');

    if (this.appoentmenTypeid == 1) {
      this.combinationvalue = 'In Clinic';
      this.bookingtypeid = 0;
    }

    if (this.appoentmenTypeid == 2) {
      this.combinationvalue = 'Video Conference';
    }

    const format = 'dd-MMM-yyyy';
    const myDate = this.appointmentate;
    const locale = 'en-US';
    this.appdate = formatDate(myDate, format, locale);

    // const qwer = 'dd-MMM-yyyy';
    // const pljdjf = 'en-US';
    // const frdat = this.appointmentate;
    // this.appdate = formatDate(frdat, qwer, pljdjf);
   

    this.GetPatients()
    this.GetNurses();
    this.getdoctorforadmin();
  }


  public getdoctorforadmin() {
    debugger
    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {
        debugger
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
        debugger;
        this.NurseList = data;
      },
      error => { }
    );
  }
  public GetPatients() {
    this.docservice.GetPatientRegistrationBook().subscribe(
      data => {
        debugger;
        this.patientslist = data;

        this.patientdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'patientName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      },
      error => { }
    );
  }


  public GetPatientID(item: any) {
    debugger
    this.patientid = item.id;
    var list = this.patientslist.filter(x => x.id == this.patientid)
    this.patientname = list[0].patientName
    this.mobileno = list[0].mobileNumber
    this.address = list[0].address
    this.email = list[0].emailID
  }
  NurseID
  public GetNurseID(event) {
    this.NurseID = event.target.value;
  }
  ReasonForVisit;
  PaidAmount;
  public bookappointment() {
    debugger
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
        'PaidAmount': this.PaidAmount
      }
      this.docservice.InsertBookAppointmentForWeb(entity).subscribe(data => {
        this.appointmentid = data;
        if (data != 0) {
          this.InsertNotifiaction();
          this.SendNotification();
          this.insertpaymentDetails()
          //this.sendmail();
          Swal.fire('Success', 'Appointment Booked Successfully');
          location.href = "#/Appointments"
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
    debugger

    var entity = {
      'PatientID': this.patientid,
      'Notification': "Appointment Fixed",
      'Description': "Thank you. Your appointment with  " + this.doctorname + " is scheduled for " + this.appdate + ", " + this.slotname + ", At" + this.user,
      'NotificationTypeID': 10,
      'Date': this.appdate,
      'LanguageID': this.languageid,
    }
    this.docservice.InsertNotifications(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }
    })
  }



  public SendNotification() {
    debugger
    var entity = {
      'Description': "Thank you. Your appointment with  " + this.doctorname + " is scheduled for " + this.appdate + ", " + this.slotname + "," + this.user,
      'ToUser': this.email,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {
      debugger
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
    debugger
    this.docservice.SendMail(mailentity).subscribe(data => {
      debugger
      Swal.fire('Mail sent successfully.');
    })
  }


  public GetPaymentTypeID(even) {
    debugger
    this.PaymentTypeID = even.target.value;
  }

}
