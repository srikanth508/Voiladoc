import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public hospitalid: any;
  public appointmentlist: any;
  public departmentlist: any;
  public term: any;
  public term1: any;
  p: number = 1;
  public languageid: any;
  public labels: any;


  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  value: any;
  public todaydate: any;
  public count: any;
  public doctorlist: any;
  public doctorname: any;
  public dummlist: any;
  roleid;
  termsss: any;
  labels1: any;
  dropzonelable: any;
  ngOnInit() {
    this.roleid = localStorage.getItem('roleid');

    this.PaymentTypeID = "";
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
    var lll = this.EDate.setDate(this.EDate.getDate() + 20);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search
        this.select = this.labels[0].selectDoctor

      }, error => {
      }
    )
    this.getlanguage();
    this.getbookappointmentbyhospitalbyhospitalid();
    this.getdepartmentmaster();
    this.gethospitaldoctorsforadmin();


    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels1 = data;


      }, error => {
      }
    )

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

  }
  public select: any;
  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search
        this.select = this.labels[0].selectDoctor

      }, error => {
      }
    )
  }

  public docdd = {};
  public search: any;

  public gethospitaldoctorsforadmin() {

    this.docservice.GetHospitalDoctorsForAdmin(this.hospitalid, this.languageid).subscribe(
      data => {

        this.doctorlist = data;

        this.docdd = {
          singleSelection: true,
          idField: 'doctorID',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };

      }, error => {
      }
    )
  }

  public GetDoctorName(item: any) {

    // if (item.target.value != 0) {
    //  
    this.doctorname = item.doctorName
    this.appointmentlist = this.dummlist.filter(x => x.doctorName == this.doctorname)
    this.count = this.appointmentlist.length;
    // }
    // else if (item.target.value == 0) {
    //   this.getbookappointmentbyhospitalbyhospitalid();
    // }
  }


  public getbookappointmentbyhospitalbyhospitalid() {

    this.docservice.GetBookAppointmentByHospital_ClinicID(this.hospitalid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.appointmentlist = data;
        this.dummlist = this.appointmentlist;
        this.count = this.appointmentlist.length;
      }, error => {
      }
    )
  }

  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    this.getbookappointmentbyhospitalbyhospitalid()
  }


  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }
  public GetDepartmentName(even) {

    if (even.target.value != 0) {

      this.term = even.target.value;
      this.appointmentlist = this.dummlist.filter(x => x.departmentname == this.term)
      this.count = this.appointmentlist.length;
    }
    else if (even.target.value == 0) {
      this.getbookappointmentbyhospitalbyhospitalid()
    }
  }
  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }



  public cancelapp(id, res) {
    this.appointmentid = id
  }

  ReasonForCancel: any;

  public cancelappoinement() {

    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Cancel This Appointment!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Cancel it!'
      }).then((result) => {
        if (result.value) {

          let Entity = {
            'ID': this.appointmentid,
            'CancelReason': this.ReasonForCancel
          }
          this.docservice.CancelBookAppointmentWeb(Entity).subscribe(res => {
            let test = res;
            this.getbookappointmentbyhospitalbyhospitalid();
          })
          Swal.fire(
            'Success!',
            'Appointment Has been Cancelled',
            'success'
          )
        }
        else {
          this.getbookappointmentbyhospitalbyhospitalid();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr',
        text: "Annulation de rendez-vous !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'non'
      }).then((result) => {
        if (result.value) {

          let Entity = {
            'ID': this.appointmentid,
            'CancelReason': this.ReasonForCancel
          }
          this.docservice.CancelBookAppointmentWeb(Entity).subscribe(res => {
            let test = res;
            this.getbookappointmentbyhospitalbyhospitalid();
          })
          Swal.fire(
            'Succès!',
            'Le rendez-vous a été annulé',
            'success'
          )
        }
        else {
          this.getbookappointmentbyhospitalbyhospitalid();
        }
      })
    }
    else {
      if (this.languageid == 1) {
        Swal.fire("Please enter reason for cancellation !");
      }
      else if (this.languageid == 6) {
        Swal.fire("Veuillez saisir le motif de l'annulation !")
      }
    }

  }







  public DocCancelled() {

    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Cancel This Appointment!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Cancel it!'
      }).then((result) => {
        if (result.value) {

          let Entity = {
            'ID': this.appointmentid,
            'CancelReason': ""
          }
          this.docservice.UpdateBookAppointmentByDocCancel(this.appointmentid).subscribe(res => {
            let test = res;
            this.getbookappointmentbyhospitalbyhospitalid();
          })
          Swal.fire(
            'Success!',
            'Appointment Has been Cancelled',
            'success'
          )
        }
        else {
          this.getbookappointmentbyhospitalbyhospitalid();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr',
        text: "Annulation de rendez-vous !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'non'
      }).then((result) => {
        if (result.value) {

          let Entity = {
            'ID': this.appointmentid,
            'CancelReason': ""
          }
          this.docservice.UpdateBookAppointmentByDocCancel(this.appointmentid).subscribe(res => {
            let test = res;
            this.getbookappointmentbyhospitalbyhospitalid();
          })
          Swal.fire(
            'Succès!',
            'Le rendez-vous a été annulé',
            'success'
          )
        }
        else {
          this.getbookappointmentbyhospitalbyhospitalid();
        }
      })
    }
    else {
      if (this.languageid == 1) {
        Swal.fire("Please enter reason for cancellation !");
      }
      else if (this.languageid == 6) {
        Swal.fire("Veuillez saisir le motif de l'annulation !")
      }
    }

  }

  public PaymentTypeID: any;

  public GetPaymentTypeID(even) {
    this.PaymentTypeID = even.target.value;
  }

  public patientid: any;
  public appointmentid: any;
  public doctorid: any;
  public PaidAmount: any;
  public appointmenttypeid: any;
  public feeslist: any;
  public doctorslotid: any;

  public GetDetails(details) {
    this.patientid = details.patientID,
      this.appointmentid = details.appointmentID
    this.doctorid = details.doctorID
    this.appointmenttypeid = details.appointmentTypeID,
      this.doctorslotid = details.doctorSlotID

    this.docservice.GetDoctorCommissionFeesByDoctorID(this.doctorslotid, this.appointmenttypeid).subscribe(data => {

      this.feeslist = data;
      this.PaidAmount = this.feeslist[0].doctorFees
    })
  }



  public insertpaymentDetails() {
    var entity = {
      'PatientID': this.patientid,
      'AppointmentID': this.appointmentid,
      'DoctorID': this.doctorid,
      'PaymentType': this.PaymentTypeID,
      'PaidAmount': this.PaidAmount,
      'TotalFeesOfDoctor': this.PaidAmount,
      'PaymentDate': new Date(),
      'Reason': 'Payment Made For Appointment By Receptionst',
    }
    this.docservice.InsertPatientPaymentDetailsWeb(entity).subscribe(data => {
      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire('Paid Successfully');
        }
        else {
          Swal.fire('Payé avec succès');
        }

      }
      this.getbookappointmentbyhospitalbyhospitalid()

    })
  }


  doctorName: any;
  appointmentID: any;
  patientName: any;
  slots: any;
  pMobileNo: any;
  videoAmount: any;
  appointmentType: any;
  mobileNumber: any;
  hospital_ClinicName: any;
  adate: any;
  signatureURL: any;
  docaddres: any;
  nationaidno: any;
  regno: any;
  patientaddress: any;




  public GenerateReciept(data) {
    ;
    this.appointmentID = data.appointmentID;
    this.doctorName = data.doctorName;
    this.patientName = data.patientName;
    this.slots = data.slots;
    this.pMobileNo = data.pMobileNo;
    this.videoAmount = data.paidAmount;
    this.appointmentType = data.appointmentTypeText;
    this.mobileNumber = data.mobileNumber;
    this.hospital_ClinicName = data.hospital_ClinicName;
    this.adate = data.reciptdate;
    this.signatureURL = data.signatureURL,
      this.docaddres = data.docaddress,
      this.nationaidno = data.nationalIdentityNo,
      this.regno = data.registrationNo,
      this.patientaddress = data.patientaddress

  }








  public SavePDF() {
    ;
    
    let pdfContent = window.document.getElementById("content");
    var doc = new jsPDF('p', 'mm', "a4");

    html2canvas(pdfContent).then(canvas => {
      ;
      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(2);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      var pdf = doc.output('blob');

      var file = new File([pdf], "DocReceipt" + ".pdf");

      let body = new FormData();
      
      body.append('Dan', file);
      this.docservice.ReceiptUpload(file).subscribe(res => {
        ;
        this.pdfurl = res;
        this.UpdateReceipt();
        
      });
    });
  }





  public SavePDF1() {

    let pdfContent = window.document.getElementById("content");
    var doc = new jsPDF('p', 'mm', "a4");


    html2canvas(pdfContent).then(function (canvas) {


      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(3);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      doc.save('Receipt.pdf');
    });
  }
















  pdfurl: any;



  public UpdateReceipt() {
    
    var entity = {
      'AppointmentID': this.appointmentID,
      'ReceiptURL': this.pdfurl
    }
    this.docservice.UpdateBookAppoinmentReceiptUrl(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Receipt Sent Successfully');
        this.getbookappointmentbyhospitalbyhospitalid()
      }
      else {
        Swal.fire('Le reçu a été envoyé avec succès');
        this.getbookappointmentbyhospitalbyhospitalid()
      }
    })
  }










  //Accept APpointment








  slotsname: any;
  patientidddd: any;
  hspitalclinicname: any;
  paemailid: any;
  accappointmentID: any;

  public Appointmentstatus(appointmentID, patientID, notificationdate, doctorName, hospital_ClinicName, emailID, smsmobileno) {
    
    if (this.languageid == 1) {
      this.doctorname = doctorName;
      this.slotsname = notificationdate;
      this.patientidddd = patientID;
      this.hspitalclinicname = hospital_ClinicName;
      this.paemailid = emailID,
        this.accappointmentID = appointmentID
        ;
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to Accept Appointment!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateAcceptedBitByDoctor(appointmentID).subscribe(res => {
            let test = res;
            this.getbookappointmentbyhospitalbyhospitalid();

            this.InsertNotifiaction();
            this.Insertnotificatiaccept();
            var smsdesc = "Your  appoinment with Dr " + this.doctorname + "On " + this.slotsname + " has been accepted."

            this.SendTwiliSms(smsdesc, smsmobileno)
          })
          if (this.languageid == 1) {
            Swal.fire('Completed', 'Appointment Accepted Successfully'
            )
          }
          else if (this.languageid == 6) {
            Swal.fire('Rendez-vous accepté !.',

            )
          }

        }
        else {
          this.getbookappointmentbyhospitalbyhospitalid();



        }
      })
    }
    else {
      this.doctorname = doctorName;
      this.slotsname = notificationdate;
      this.patientidddd = patientID;
      this.hspitalclinicname = hospital_ClinicName;
      this.paemailid = emailID;
      this.accappointmentID = appointmentID
        ;
      Swal.fire({
        title: 'Êtes-vous sûr(e) ?',
        // text: "Accepté ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'CONFIRMER',
        cancelButtonText: 'RETOUR'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateAcceptedBitByDoctor(appointmentID).subscribe(res => {
            let test = res;
            this.getbookappointmentbyhospitalbyhospitalid();
            this.InsertNotifiaction();
            this.Insertnotificatiaccept();

            var smsdesc = "Votre RDV  avec le Dr " + this.doctorname + " le  " + this.slotsname + " a été confirmé."
            this.SendTwiliSms(smsdesc, smsmobileno)
          })

          Swal.fire('Rendez-vous accepté !')
        }
        else {

          this.getbookappointmentbyhospitalbyhospitalid();


        }
      })


    }




  }






  public InsertNotifiaction() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.patientidddd,
        'Notification': "Appointment confirmed",
        'Description': "Your Appointment with Dr " + this.doctorname + "On" + this.slotsname + " has been accepted.",
        'NotificationTypeID': 10,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.accappointmentID
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.patientidddd,
        'Notification': "RDV confirmé",
        'Description': "Votre rendez-vous avec  le Dr" + this.doctorname + " le  " + this.slotsname + "a été confirmé.",
        'NotificationTypeID': 10,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.accappointmentID
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }





  public Insertnotificatiaccept() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your  appoinment with Dr " + this.doctorname + "On " + this.slotsname + " has been accepted.",
        'ToUser': this.paemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre RDV  avec le Dr " + this.doctorname + " le  " + this.slotsname + " a été confirmé.",
        'ToUser': this.paemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }



  public SendTwiliSms(smsdesc, smsmobileno) {
    
    this.docservice.SendTwillioSMS(smsmobileno, smsdesc).subscribe(data => {
      
    })
  }




  //prescription





  public GetPrescriptionPhoto(details) {

    this.patientid = details.patientID,
      this.appointmentid = details.appointmentID
      this.doctorid=details.doctorID
  }








  // Diagnostic Test and Soap notes 







  diasoaptypeid: any;
  attachmentsurl1 = [];
  shoprescphoto = [];


  public InsertDiagnostictestAndSoap() {
    if (this.attachmentsurl1.length == 0 || (this.attachmentsurl1 == null)) {
      if (this.languageid == 1) {
        Swal.fire('Please Add Test or Soap')
      }
      else if (this.languageid == 6) {
        Swal.fire('Please Add Test or Soap')
      }
    }
    else {
      var entity = {
        'TypeID': this.diasoaptypeid,
        'AppointmentID': this.appointmentid,
        'DoctorID': this.doctorid,
        'PatientID': this.patientid,
        'PhotoUrl': this.attachmentsurl1[0],
      }
      this.docservice.InsertDiagnostic_SoapNotesAttachments(entity).subscribe(data => {
        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('success', 'Saved Successfully');
            this.attachmentsurl1.length = 0;
            this.shoprescphoto.length = 0;
          }
          else if (this.languageid == 6) {
            Swal.fire('success', 'Saved Successfully');
            this.attachmentsurl1.length = 0;
            this.shoprescphoto.length = 0;
          }

        }
      })
    }
  }










  public InsertPrescrptionPhoto() {
    if (this.attachmentsurl1.length == 0 || (this.attachmentsurl1 == null)) {
      if (this.languageid == 1) {
        Swal.fire('Please add prescription')
      }
      else if (this.languageid == 6) {
        Swal.fire('Veuillez ajouter une ordonnance')
      }
    }
    else {
      var entity = {
        'DoctorID': this.doctorid,
        'PateintID': this.patientid,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid,
        'NewPrescriptionPhotoUrl': this.attachmentsurl1[0],
      }
      this.docservice.InsertDoctor_PatientPrescriptionPhotoUrl(entity).subscribe(data => {
        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('success', 'Prescription added successfully');
            this.attachmentsurl1.length = 0;
            this.shoprescphoto.length = 0;
          }
          else if (this.languageid == 6) {
            Swal.fire('success', 'Ordonnance ajoutée avec succès');
            this.attachmentsurl1.length = 0;
            this.shoprescphoto.length = 0;
          }

        }
      })
    }
  }




  public onattachmentUpload1(abcd) {
    
    this.dummprescriptionphotourl = []
    
    // for (let i = 0; i < abcd.length; i++) {
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadattachments1();
    // }
    
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }
  }

  attachments1 = []
  dummprescriptionphotourl = []

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {

      this.attachmentsurl1.push(res);
      this.dummprescriptionphotourl.push(res);
      let a = this.attachmentsurl1[0].slice(2);
      
      let b = 'https://maroc.voiladoc.org' + a;
      if (this.attachments1[0].type == 'image/jpeg') {
        
        this.shoprescphoto.push(b)
      }
      else if (this.attachments1[0].type == 'application/pdf') {
        
        this.shoprescphoto.push('assets/Images/pdf.png')
      }

      this.attachments1.length = 0;

    })
    // this.sendattachment();
  }






}
