import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-care-appointments',
  templateUrl: './home-care-appointments.component.html',
  styleUrls: ['./home-care-appointments.component.css']
})
export class HomeCareAppointmentsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public patientslist: any;
  public patientdd = {};
  public patientid: any;
  public patientname: any;
  public mobileno: any;
  public address: any;
  public email: any;
  public labels: any;
  public SelectLabel: any;
  public languageid: any;
  public serverdateandtime: any;
  public todaydate: any;
  public selecteddate: any;
  public Selecteddate2: any;
  public todaydatesss: any;
  public todaydatesssssss: any;
  public appointmenttime: any;
  public hospitalid: any;
  public reasonforvisit: any;

  ngOnInit() {
    this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetPatients();

    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;

      }, error => {
      }
    )

    this.docservice.GetServerDateAndTime().subscribe(
      data => {
        this.serverdateandtime = data;
        if (this.languageid == 1) {

          this.todaydate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.selecteddate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.Selecteddate2 = this.serverdateandtime.todaydatesss.toLocaleString()
          // this.Selecteddate2=this.datepipe.transform(this.todaydatesss, 'dd/MM/yyyy')
          this.todaydatesss = this.serverdateandtime.todaydatesss.toLocaleString()
          this.todaydatesssssss = this.serverdateandtime.todaydateeeesss.toLocaleString()
          this.appointmenttime = this.serverdateandtime.presentTime

          // localStorage.setItem('SelectedDate', this.todaydatesssssss)

        }
        else if (this.languageid == 6) {

          this.todaydate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.selecteddate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          this.todaydatesss = this.serverdateandtime.todaydatesss.toLocaleString()
          this.todaydatesssssss = this.serverdateandtime.todaydateeeesss.toLocaleString()
          this.appointmenttime = this.serverdateandtime.presentTime
          // localStorage.setItem('SelectedDate', this.todaydatesssssss)
        }
      }, error => {
      }
    )

  }


  public GetPatients() {
    this.docservice.GetPatientRegistrationBook().subscribe(
      data => {

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

  public dateofbirth: any;
  public weight: any;
  public height: any;
  public bmi: any;
  public gendername: any;

  public GetPatientID(item: any) {
    debugger
    this.patientid = item.id;
    var list = this.patientslist.filter(x => x.id == this.patientid)
    this.patientname = list[0].patientName
    this.mobileno = list[0].mobileNumber
    // this.address = list[0].address
    this.email = list[0].emailID
    this.dateofbirth = list[0].dateOfBirth
    this.weight = list[0].weight
    this.height = list[0].height
    this.bmi = list[0].bmi
    this.gender = list[0].genderID
    debugger
    if (this.gender == 1) {
      this.gendername = 'Male'
    }
    if (this.gender == 2) {
      this.gendername = 'FeMale'
    }

  }

  public typeid: any;
  public dayname: any;
  public dayidslist: any;
  public dayid: any;
  public dayslist: any;


  public GetTypeID(even) {
    this.typeid = even.target.value;
    debugger
    this.Getdays();
  
    debugger
  }

  public Getdays() {
    debugger
    this.docservice.GetDaysHomecare(this.selecteddate).subscribe(data => {
      debugger
      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName
      debugger
      this.Getdayssid();
    }, error => {
    })
  }

  public Getdayssid() {
    this.docservice.GetDayID(this.dayname).subscribe(data => {
      debugger
      this.dayidslist = data;
      this.dayid = this.dayidslist[0].dayID;
      this.GetAllUsers();
    }, error => {
    })
  }



  public selecteddates1: any;
  public userslist: any;
  public midwifelist: any;
  public dummmidwifelist: any;

  public GetDate(even) {
    debugger
    this.selecteddate = even.toLocaleString().split(',')[0];
    this.Getdays();
    this.Getdayssid();
    this.GetAllUsers();
  }


  public GetAppointmentTimeChange(even) {
    debugger

    this.appointmenttime = even.target.value;
    this.Getdays();
    this.Getdayssid();
    this.GetAllUsers();
  }


  public physiolist: any;
  public Nurselist: any;
  public dummnurselist: any;

  public GetAllUsers() {
    if (this.typeid == 2) {
      debugger
      this.docservice.GetAllNurseDetailsWeb(this.dayid, 0, this.languageid, this.appointmenttime, this.hospitalid).subscribe(data => {
        debugger
        this.Nurselist = data;
        this.dummnurselist = data;
        debugger
      }, error => {
      })
    }
    if (this.typeid == 3) {
      debugger
      this.docservice.GetAllPhysioDetailsWeb(this.dayid, 0, this.languageid, this.appointmenttime, this.hospitalid).subscribe(data => {
        debugger
        this.physiolist = data;
        this.dummphysiolist = data;
        debugger
      }, error => {
      })
    }
    if (this.typeid == 4) {
      debugger
      this.docservice.GetAllMidWivesDetailsWeb(this.dayid, 0, this.languageid, this.appointmenttime, this.hospitalid).subscribe(data => {
        debugger
        this.midwifelist = data;
        this.dummmidwifelist = data;
        debugger
      }, error => {
      })
    }
  }


  public PaymentTypeID: any;

  public GetPaymentTypeID(even) {

    this.PaymentTypeID = even.target.value;
  }


  public nurselist: any;
  public nurseid: any;
  public nursehospitalid: any;
  public amount: any;

  public GetNurseID(even) {
    debugger
    this.nurseid = even.target.value;

    var list = this.dummnurselist.filter(x => x.nurseID == this.nurseid)
    this.nursehospitalid = list[0].nurseHospitalDetailsID,
      this.amount = list[0].fees

  }

  public physioid: any;
  public dummphysiolist: any;
  public physiohospitalid: any;

  public GetPhysiotheerapist(even) {
    this.physioid = even.target.value;

    var list = this.dummphysiolist.filter(x => x.physiotherapyID == this.physioid)
    this.physiohospitalid = list[0].physioHospitalDetailsID
    this.amount = list[0].fees
  }



  public midwifeid: any;
  public midwifehospitalid: any;


  public GetmidwifeID(even) {
    this.midwifeid = even.target.value;

    var list = this.dummmidwifelist.filter(x => x.midWifeID == this.midwifeid)
    this.midwifehospitalid = list[0].midWifeHospitalDetailsID
    this.amount = list[0].fees

  }




  public bookappointment() {
    if (this.typeid == 2) {
      this.InsertBookNurseAppointment()
    }
    if (this.typeid == 3) {
      this.InsertbookPhysiotherapist()
    }
    if (this.typeid == 4) {
      this.InsertBookMidwife();
    }

  }


  // book nurse

  public allergies: any;
  public gender: any;
  public nurseappointid: any;

  public InsertBookNurseAppointment() {
    debugger
    if (this.nurseid == undefined) {
      Swal.fire('Please Select nurse')
    }
    if (this.patientid == undefined) {
      Swal.fire('Please Select patient')
    }
    else {

      debugger
      var entity = {
        'NurseID': this.nurseid,
        'PatientID': this.patientid,
        'Date': this.selecteddate,
        'ApptDatetime': this.selecteddate,
        'BookedTime': this.appointmenttime,
        'NurseHospitalDetailsID': this.nursehospitalid,
        'ReasonForVisit': this.reasonforvisit,
        'BookedDateandTime': this.selecteddate + ',' + 'Time :' + this.appointmenttime,
        'PatientRelationID': 0,
        'PName': this.patientname,
        'PEmail': this.email,
        'PMobileNo': this.mobileno,
        'PRelation': 'none',
        'IsPatientPragnent': 0,
        'BreastFeeding': 0,
        'Dateofbirth': this.dateofbirth,
        'NationalIdeficationID': 0,
        'Height': this.height,
        'Weight': this.weight,
        'BMI': this.bmi,
        'Allergies': 'none',
        'Gender': this.gendername,
        'RelationPatientID': this.patientid
      }
      this.docservice.InsertBook_Nurse_AppointmentWeb(entity).subscribe(data => {
        if (data != 0) {
          debugger
          this.nurseappointid = data;
          debugger
          this.NursePatientPaymentdetails();
          Swal.fire('Appointment Booked Successfully');
        }
      })
    }
  }

  public NursePatientPaymentdetails() {
    debugger
    var entity = {
      'PatientID': this.patientid,
      'AppointmentID': this.nurseappointid,
      'NurseID': this.nurseid,
      'PaymentType': this.PaymentTypeID,
      'PaidAmount': this.amount,
      'TotalFeesOfNurse': this.amount,
      'NusreCommissionID': 0,
      'NurseHosptalID': this.nursehospitalid,
      'PaymentDate': this.selecteddate
    }
    this.docservice.InsertNurse_PatientPaymentDetailsWeb(entity).subscribe(data => {
      if (data != 0) {
        this.nurseappointid = data;
      }
    })
  }



  // book physio

  public physioappointmentid: any;

  public InsertbookPhysiotherapist() {
    debugger
    if (this.physioid == undefined) {
      Swal.fire('Please Select nurse')
    }
    if (this.patientid == undefined) {
      Swal.fire('Please Select Physiotherapist')
    }
    else {

      debugger
      var entity = {
        'PhysioID': this.physioid,
        'PatientID': this.patientid,
        'Date': this.selecteddate,
        'ApptDatetime': this.selecteddate,
        'BookedTime': this.appointmenttime,
        'PhysioHospitalDetailsID': this.physiohospitalid,
        'ReasonForVisit': this.reasonforvisit,
        'BookedDateandTime': this.selecteddate + ',' + 'Time :' + this.appointmenttime,
        'PatientRelationID': 0,
        'PName': this.patientname,
        'PEmail': this.email,
        'PMobileNo': this.mobileno,
        'PRelation': 'none',
        'IsPatientPragnent': 0,
        'BreastFeeding': 0,
        'Dateofbirth': this.dateofbirth,
        'NationalIdeficationID': 0,
        'Height': this.height,
        'Weight': this.weight,
        'BMI': this.bmi,
        'Allergies': 'none',
        'Gender': this.gendername,
        'RelationPatientID': this.patientid
      }
      this.docservice.InsertBook_Physio_AppointmentWeb(entity).subscribe(data => {
        if (data != 0) {
          debugger
          this.physioappointmentid = data;
          debugger
          this.PhysioPatientpaymentDetails();
          Swal.fire('Appointment Booked Successfully');
        }
      })
    }
  }

  public PhysioPatientpaymentDetails() {
    debugger
    var entity = {
      'PatientID': this.patientid,
      'AppointmentID': this.physioappointmentid,
      'PhysiotherepistID': this.physioid,
      'PaymentType': this.PaymentTypeID,
      'PaidAmount': this.amount,
      'TotalFeesOfPhysiotheapist': this.amount,
      'PhysiotherepistCommissionID': 0,
      'PhysiotherepistHosptalID': this.physiohospitalid,
      'PaymentDate': this.selecteddate
    }
    this.docservice.InsertPhysiotherapist_PatientPaymentDetailsWeb(entity).subscribe(data => {
      if (data != 0) {

      }
    })
  }





  // book midwife

  public midwifeappointmentid: any;

  public InsertBookMidwife() {
    debugger
    if (this.midwifeid == undefined) {
      Swal.fire('Please Select nurse')
    }
    if (this.patientid == undefined) {
      Swal.fire('Please Select Physiotherapist')
    }
    else {

      debugger
      var entity = {
        'MidWivesID': this.midwifeid,
        'PatientID': this.patientid,
        'Date': this.selecteddate,
        'ApptDatetime': this.selecteddate,
        'BookedTime': this.appointmenttime,
        'MidWivesHospitalDetailsID': this.midwifehospitalid,
        'ReasonForVisit': this.reasonforvisit,
        'BookedDateandTime': this.selecteddate + ',' + 'Time :' + this.appointmenttime,
        'PatientRelationID': 0,
        'PName': this.patientname,
        'PEmail': this.email,
        'PMobileNo': this.mobileno,
        'PRelation': 'none',
        'IsPatientPragnent': 0,
        'BreastFeeding': 0,
        'Dateofbirth': this.dateofbirth,
        'NationalIdeficationID': 0,
        'Height': this.height,
        'Weight': this.weight,
        'BMI': this.bmi,
        'Allergies': 'none',
        'Gender': this.gendername,
        'RelationPatientID': this.patientid
      }
      this.docservice.InsertBook_Midwives_AppointmentWeb(entity).subscribe(data => {
        if (data != 0) {
          debugger
          this.midwifeappointmentid = data;
          debugger
          this.BookMidwifepaymentdetails();
          Swal.fire('Appointment Booked Successfully');
        }
      })
    }
  }

  public BookMidwifepaymentdetails() {
    debugger
    var entity = {
      'PatientID': this.patientid,
      'AppointmentID': this.midwifeappointmentid,
      'MidwifeID': this.midwifeid,
      'PaymentType': this.PaymentTypeID,
      'PaidAmount': this.amount,
      'TotalFeesOfMidwife': this.amount,
      'MidWifeCommissionID': 0,
      'MidWifeHosptalID': this.midwifehospitalid,
      'PaymentDate': this.selecteddate
    }
    this.docservice.InsertMidWife_PatientPaymentDetailsWeb(entity).subscribe(data => {
      if (data != 0) {

      }
    })
  }

}











