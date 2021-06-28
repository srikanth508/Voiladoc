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
  public mindate = new Date();
  public search: any;
  public selecteddate1: any;

  ngOnInit() {
    this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetPatients();

    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search;

      }, error => {
      }
    )

    this.randomid = 0;

    this.docservice.GetServerDateAndTime().subscribe(
      data => {
        this.serverdateandtime = data;
        if (this.languageid == 1) {
          this.todaydate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          // this.selecteddate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          // this.Selecteddate2 = this.serverdateandtime.todaydatesss.toLocaleString()
          // this.Selecteddate2=this.datepipe.transform(this.todaydatesss, 'dd/MM/yyyy')
          this.todaydatesss = this.serverdateandtime.todaydatesss.toLocaleString()
          this.todaydatesssssss = this.serverdateandtime.todaydateeeesss.toLocaleString()
          this.appointmenttime = this.serverdateandtime.presentTime,
            this.todaydate = this.serverdateandtime.todaydate
          // localStorage.setItem('SelectedDate', this.todaydatesssssss)
        }
        else if (this.languageid == 6) {

          this.todaydate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
          // this.selecteddate = this.serverdateandtime.datePickerTodaydate.toLocaleString()
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
    //       searchPlaceholderText: this.search,
    //     };
    //   },
    //   error => { }
    // );
  }

  public dateofbirth: any;
  public weight: any;
  public height: any;
  public bmi: any;
  public gendername: any;

  public GetPatientID(item: any) {

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

    this.Getdays();


  }

  public Getdays() {

    this.docservice.GetDaysHomecare(this.selecteddate).subscribe(data => {

      this.dayslist = data[0];
      this.dayname = this.dayslist.dayName

      this.Getdayssid();
    }, error => {
    })
  }

  public Getdayssid() {
    this.docservice.GetDayID(this.dayname).subscribe(data => {

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

    this.selecteddate = even.toLocaleString().split(',')[0];
    this.Getdays();
    this.Getdayssid();
    this.GetAllUsers();
  }


  public GetAppointmentTimeChange(even) {


    this.appointmenttime = even.target.value;
    this.Getdays();
    this.Getdayssid();
    this.GetAllUsers();
  }


  public physiolist: any;
  public Nurselist: any;
  public dummnurselist: any;
  public Doctorlist: any;
  public dummdoctorslist: any;

  public GetAllUsers() {
    if (this.typeid == 1) {

      this.docservice.GetDoctorForHomeSampleWeb(1, this.dayid, this.languageid, 1, this.hospitalid).subscribe(data => {

        this.Doctorlist = data;
        this.dummdoctorslist = data;

      }, error => {
      })
    }
    if (this.typeid == 2) {

      this.docservice.GetAllNurseDetailsWeb(this.dayid, 0, this.languageid, this.appointmenttime, this.hospitalid).subscribe(data => {

        this.Nurselist = data;
        this.dummnurselist = data;

      }, error => {
      })
      this.GetnurseFess();
    }
    if (this.typeid == 3) {

      this.docservice.GetAllPhysioDetailsWeb(this.dayid, 0, this.languageid, this.appointmenttime, this.hospitalid).subscribe(data => {

        this.physiolist = data;
        this.dummphysiolist = data;

      }, error => {
      })
      this.GetPhysioFees();
    }
    if (this.typeid == 4) {

      this.docservice.GetAllMidWivesDetailsWeb(this.dayid, 0, this.languageid, this.appointmenttime, this.hospitalid).subscribe(data => {

        this.midwifelist = data;
        this.dummmidwifelist = data;

      }, error => {
      })
      this.GetMidWifeFess();
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
  public nursefees: any;
  public randomid: any;

  public GetNurseID(even) {
    this.docservice.GetNurse_AvailabilitySlotsByTimeWeb(even.target.value, this.appointmenttime, this.selecteddate).subscribe(data => {
      if (data.length == 0) {
        this.nurseid = even.target.value;
        var list = this.dummnurselist.filter(x => x.nurseID == this.nurseid)
        this.nursehospitalid = list[0].nurseHospitalDetailsID
        this.GetnurseFess();
      }
      else {
        Swal.fire('Nurse is busy');
        this.nurseid = 0;
      }
    })
  }

  public testid: any;

  public GetnurseFess() {
    // this.amount = 0;
    this.docservice.GetNursePriceDetails(this.nurseid).subscribe(data => {

      this.nursefees = data;

      for (let i = 0; i < this.nursefees.length; i++) {

        if (this.nursefees[i].startTimeNew <= this.appointmenttime && this.appointmenttime <= this.nursefees[i].endTimeNew) {

          if (this.amount = "" && this.testid === 0) {
            this.testid = 1;
            this.amount = this.nursefees[i].feesNumber
          }
          else {
          }
        }
        else {
          if (this.amount == 0 || this.amount == "" || this.amount == undefined) {
            this.testid = 2
            this.amount = this.nursefees[i].feesNumber
          }
          else if (this.amount != 0 && this.testid == 1) {

          }
          else if (this.amount != 0 && this.testid == 2) {
            this.amount = this.nursefees[i].feesNumber
          }
        }
      }
    })
  }


  public physioid: any;
  public dummphysiolist: any;
  public physiohospitalid: any;

  public GetPhysiotheerapist(even) {
    this.docservice.GetPhysiotherapist_AvailabilitySlotsWeb(even.target.value, this.appointmenttime, this.selecteddate).subscribe(data => {
      if (data.length == 0) {
        this.physioid = even.target.value;
        var list = this.dummphysiolist.filter(x => x.physiotherapyID == this.physioid)
        this.physiohospitalid = list[0].physioHospitalDetailsID
        this.GetPhysioFees();
      }
      else {
        Swal.fire('Physiotherapist is busy');
        this.physioid = 0;
      }
    })
  }


  public physiofees: any;
  public phytestiddd: any;

  public GetPhysioFees() {
    this.docservice.GetPhysioPriceDetailsWeb(this.physioid).subscribe(data => {


      this.physiofees = data;

      for (let i = 0; i < this.physiofees.length; i++) {


        if (this.physiofees[i].startTimeNew <= this.appointmenttime && this.appointmenttime <= this.physiofees[i].endTimeNew) {

          if (this.amount = "" && this.phytestiddd === 0) {
            this.phytestiddd = 1;
            this.amount = this.physiofees[i].feesNumber
          }
          else {
          }
        }
        else {
          if (this.amount == 0 || this.amount == "" || this.amount == undefined) {
            this.phytestiddd = 2
            this.amount = this.physiofees[i].feesNumber
          }
          else if (this.amount != 0 && this.phytestiddd == 1) {

          }
          else if (this.amount != 0 && this.phytestiddd == 2) {
            this.amount = this.physiofees[i].feesNumber
          }
        }
      }
    })
  }

  public midwifeid: any;
  public midwifehospitalid: any;


  public GetmidwifeID(even) {
    this.docservice.GetBook_MidWifeAvailabilitySlotsasweb(even.target.value, this.appointmenttime, this.selecteddate).subscribe(data => {
      if (data.length == 0) {
        this.midwifeid = even.target.value;
        var list = this.dummmidwifelist.filter(x => x.midWifeID == this.midwifeid)
        this.midwifehospitalid = list[0].midWifeHospitalDetailsID
        // this.amount = list[0].fees
        this.GetMidWifeFess();
      }
      else {
        Swal.fire('Midwife is busy');
        this.midwifeid = 0;
      }
    })
  }


  public midwifefees: any;
  public midtestid: any;

  public GetMidWifeFess() {
    this.docservice.GetMidwifePriceDetails(this.midwifeid).subscribe(data => {


      this.midwifefees = data;
      for (let i = 0; i < this.midwifefees.length; i++) {

        if (this.midwifefees[i].startTimeNew <= this.appointmenttime && this.appointmenttime <= this.midwifefees[i].endTimeNew) {

          if (this.amount = "" && this.midtestid === 0) {
            this.midtestid = 1;
            this.amount = this.midwifefees[i].feesNumber
          }
          else {
          }
        }
        else {
          if (this.amount == 0 || this.amount == "" || this.amount == undefined) {
            this.midtestid = 2
            this.amount = this.midwifefees[i].feesNumber
          }
          else if (this.amount != 0 && this.midtestid == 1) {

          }
          else if (this.amount != 0 && this.midtestid == 2) {
            this.amount = this.midwifefees[i].feesNumber
          }
        }
      }
    })
  }




  public bookappointment() {

    if (this.typeid == 1) {
      this.bookDoctorappointment()
    }

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

  public doctorid: any;
  public dochospitalid: any;

  public GetDoctorID(even) {
    this.doctorid = even.target.value;

    var list = this.dummdoctorslist.filter(x => x.doctorID == this.doctorid)
    this.dochospitalid = list[0].docHospitalID
    this.amount = list[0].feesNumber
  }

  // book nurse

  public allergies: any;
  public gender: any;
  public nurseappointid: any;

  public InsertBookNurseAppointment() {

    if (this.nurseid == undefined || this.nurseid == 0) {
      Swal.fire('Please Select nurse')
    }
    if (this.patientid == undefined) {
      Swal.fire('Please Select patient')
    }
    else {


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
          this.nurseappointid = data;
          this.NursePatientPaymentdetails();
          this.InsertNurseAvailabilityTime();
          if (this.languageid == 1) {
            Swal.fire('Appointment Booked Successfully');
            location.href = "#/HomecareAppdash"
          }
          else {
            Swal.fire('Rendez-vous est réservé');
            location.href = "#/HomecareAppdash"
          }
        }
      })
    }
  }


  public InsertNurseAvailabilityTime() {
    var entity1 = {
      'NurseID': this.nurseid,
      'AppointmentID': this.nurseappointid,
      'AvailabilityDate': this.selecteddate,
      'StartTime': this.appointmenttime
    }
    this.docservice.InsertNurse_AvailabilitySlotsWeb(entity1).subscribe(data => {

    })
  }


  public NursePatientPaymentdetails() {

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

    if (this.physioid == undefined||this.physioid==0) {
      Swal.fire('Please Select nurse')
    }
    if (this.patientid == undefined) {
      Swal.fire('Please Select Physiotherapist')
    }
    else {


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

          this.physioappointmentid = data;
          this.PhysioPatientpaymentDetails();
          this.InsertPhysioAvailabilitime();
          if (this.languageid == 1) {
            Swal.fire('Appointment Booked Successfully');
            location.href = "#/HomecareAppdash"
          }
          else {
            Swal.fire('Rendez-vous est réservé');
            location.href = "#/HomecareAppdash"
          }

        }
      })
    }
  }

  public InsertPhysioAvailabilitime() {
    var entity1 = {
      'PhysiotherapyID': this.physioid,
      'AppointmentID': this.physioappointmentid,
      'AvailabilityDate': this.selecteddate,
      'StartTime': this.appointmenttime
    }
    this.docservice.InsertPhysiotherapist_AvailabilitySlotsWeb(entity1).subscribe(data => {

    })
  }

  public PhysioPatientpaymentDetails() {

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

    if (this.midwifeid == undefined) {
      Swal.fire('Please Select nurse')
    }
    if (this.patientid == undefined) {
      Swal.fire('Please Select Physiotherapist')
    }
    else {


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

          this.midwifeappointmentid = data;
          this.BookMidwifepaymentdetails();
          this.InsertMidwifeAvailabilityTime();
          if (this.languageid == 1) {
            Swal.fire('Appointment Booked Successfully');
            location.href = "#/HomecareAppdash"
          }
          else {
            Swal.fire('Rendez-vous est réservé');
            location.href = "#/HomecareAppdash"
          }

        }
      })
    }
  }

  public InsertMidwifeAvailabilityTime() {
    var entity1 = {
      'MidWifeID': this.midwifeid,
      'AppointmentID': this.midwifeappointmentid,
      'AvailabilityDate': this.selecteddate,
      'StartTime': this.appointmenttime
    }
    this.docservice.InsertBook_MidWifeAvailabilitySlotsWeb(entity1).subscribe(data => {

    })
  }


  public BookMidwifepaymentdetails() {

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



  // Dotcor

  public docappointmentid: any;

  public bookDoctorappointment() {

    if (this.patientid == null || this.patientid == undefined || this.doctorid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Mandatory Fields")
      }
      else {
        Swal.fire("Veuillez remplir tous les champs obligatoires.")
      }
    }
    else {
      var entity = {
        'DoctorID': this.doctorid,
        'PatientID': this.patientid,
        'Date': this.selecteddate,
        'ApptDatetime': this.selecteddate,
        'DoctorSlotID': 0,
        'DoctorHospitalDetailsID': this.dochospitalid,
        'BookingTypeID': 2,
        'AppointmentTypeID': 5,
        'CombinationValue': 'Home Visit',
        'Slots': this.appointmenttime,
        'PName': this.patientname,
        'PEmail': this.email,
        'PMobileNo': this.mobileno,
        'PRelation': '',
        'NurseID': 1,
        'ReasonForVisit': this.reasonforvisit,
        'PaidAmount': this.amount,
        'HomeVisit': 1
      }
      this.docservice.InsertBookAppointmentForWeb(entity).subscribe(data => {
        this.docappointmentid = data;
        if (data != 0) {
          // this.InsertNotifiaction();
          // this.SendNotification();
          this.insertpaymentDetails()
          //this.sendmail();
          if (this.languageid == 1) {
            Swal.fire('Success', 'Appointment Booked Successfully');
            location.href = "#/HomecareAppdash"
          }
          else {
            Swal.fire('Rendez-vous est réservé');
            location.href = "#/HomecareAppdash"
          }
        }
      })
    }
  }

  public insertpaymentDetails() {
    var entity = {
      'PatientID': this.patientid,
      'AppointmentID': this.docappointmentid,
      'DoctorID': this.doctorid,
      'PaymentType': this.PaymentTypeID,
      'PaidAmount': this.amount,
      'TotalFeesOfDoctor': this.amount,
      'PaymentDate': this.selecteddate,
      'Reason': 'Payment Made For Appointment By Receptionst',
    }
    this.docservice.InsertPatientPaymentDetailsWeb(entity).subscribe(data => {

    })
  }
}












