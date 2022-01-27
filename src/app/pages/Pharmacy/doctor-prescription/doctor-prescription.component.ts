import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-doctor-prescription',
  templateUrl: './doctor-prescription.component.html',
  styleUrls: ['./doctor-prescription.component.css']
})
export class DoctorPrescriptionComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }


  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public pharmacyid: any;
  public todaydate: any;
  public orderlist: any;
  public term: any;
  public allmedicines: any;
  public quantity: any;
  public listid: any;
  public list: any;
  public myarray = [];
  public languageid: any;
  public labels: any;
  public accpatientid: any;
  public accpharmacyname: any;
  public accdate: any;
  public accemail: any;

  public canpatientid: any;
  public canpharmacyname: any;
  public canemailID: any;
  public delipatientid: any;
  public deliemail: any;
  public delipharmacyname: any;
  public partnerlist: any;
  dropzonelable: any;
  labels4: any;
  user: any;
  ngOnInit() {
    this.pharmacyid = localStorage.getItem('pharmacyid');
    this.languageid = localStorage.getItem('LanguageID');
    this.user = localStorage.getItem('user');
    this.getlanguage()
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

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    this.GetPharmacyOrders();


    this.docservice.GetDeliveryPartnersWeb().subscribe(
      data => {

        this.partnerlist = data;
      }, error => {
      }
    )
    this.oberserableTimer();
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

    this.oberserableTimerpresription();


    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels4 = data;

      }, error => {
      }
    )





  }


  oberserableTimerpresription() {
    const source = timer(1000, 20000);
    const abc = source.subscribe(val => {

      this.GetPharmacyOrders();

    });
  }
  public async GetPharmacyOrders() {

    this.docservice.GetPatient_TextMedicineDetails(this.pharmacyid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.orderlist = data;
        console.log("orders", this.orderlist);
      }, error => {
        console.log("Error", error);
      }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_PharmacyLoginDoctorPrescriptionReports_label(this.languageid).subscribe(
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
  labels1: any
  patientname: any;
  mobilernumber: any;
  address: any;
  doctorname: any;
  docmobile: any;
  email: any;
  docsignatureurl: any;
  hospitalname: any;
  hospitalid: any;
  docaddress: any;
  registrationno: any;
  prescriptiondate: any;
  dateofbirth: any;
  noteetopharmasict: any;
  referencenumber: any;
  public orderedmedicinelist: any;
  public showedit: any;
  smsmobleno: any;
  gender: any;
  age: any;


  public GetMedicines(id, details) {

    this.myarray.length = 0;
    this.smsmobleno = details.smsmobileno

    this.listid = id;
    this.list = this.orderlist.filter(x => x.id == this.listid)

    this.patientname = this.list[0].relationpatentname,
      this.mobilernumber = this.list[0].relationmobileno
    this.address = this.list[0].relatinpaaddess
    this.doctorname = this.list[0].doctorName,
      this.docmobile = this.list[0].docmobile,
      this.email = this.list[0].emailID,
      this.docsignatureurl = this.list[0].siganatureurl,
      this.hospitalname = this.list[0].hospital_ClinicName,
      this.hospitalid = this.list[0].hospitalClinicID,
      this.docaddress = this.list[0].docaddress,
      this.registrationno = this.list[0].registrationNo,
      this.prescriptiondate = this.list[0].prescriptionAddedDate,
      this.dateofbirth = this.list[0].dateofbirth,
      this.noteetopharmasict = this.list[0].notetoopharmacistt,
      this.referencenumber = this.list[0].referenceNumber,
      this.showedit = this.list[0].showUpdate,
      this.patientemail = this.list[0].patientemail,

      this.email = details.relationemailid,
      this.gender = details.gender,
      this.age = details.age

    this.docservice.GetPatientOrderedMedicines(this.listid, this.languageid).subscribe(
      data => {

        this.orderedmedicinelist = data;
        this.dummorderlist = data;
        console.log('medicines', this.orderedmedicinelist);
      }, error => {
      }
    )



  }
  dummorderlist: any;

  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate= sdate[0]
    // this.enddate= sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    this.getpharmacyorders()
  }


  public getpharmacyorders() {
    this.docservice.GetPatient_TextMedicineDetails(this.pharmacyid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.orderlist = data;
      }, error => {
      }
    )
  }




  public GetAcceptOrder(id, patientID, pharmacyName, date, emailID, smsmobileno) {
    this.accpatientid = patientID;
    this.accpharmacyname = pharmacyName;
    this.accdate = date;
    this.accemail = emailID;

    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Accept This Order!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.ApprovedPatientMedicineDetails(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();
            this.InsertAccptNotification();
            this.InsertNotiFicationAccpt();

            var smsdesc = this.accpharmacyname + "  accepted your medicine order which is being processed. "
            this.SendTwiliSms(smsdesc, smsmobileno)
          })
          Swal.fire(
            'Completed!',
            'Order has been Accepted.',
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Etes-vous sûr ?',
        text: "Accepter cette commande!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.ApprovedPatientMedicineDetails(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();
            this.InsertAccptNotification();
            this.InsertNotiFicationAccpt();

            var smsdesc = this.accpharmacyname + " a accepté votre commande de médicaments qui est en cours de traitement."
            this.SendTwiliSms(smsdesc, smsmobileno)
          })
          Swal.fire(
            'Détails enregistrés',
            'Commande acceptée',
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })
    }

  }




  public GetCancelOrder(id, patientID, pharmacyName, date, emailID, smsmobileno) {
    this.canpatientid = patientID;
    this.canpharmacyname = pharmacyName;
    this.canemailID = emailID
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Cancel This Order!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Cancel it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.PharCancelledPatientMedicineDetails(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();
            this.InsertNotiFicationcancel();
            this.InsertCancelNotification()


            var smsdesc = this.canpharmacyname + "  has not accepted your medicine order. Please select another pharmacy."
            this.SendTwiliSms(smsdesc, smsmobileno)

          })
          Swal.fire(
            'Cancelled!',
            'Order has been Cancelled.',
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr',
        text: "Annuler la commande !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'non'
      }).then((result) => {
        if (result.value) {
          this.docservice.PharCancelledPatientMedicineDetails(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();
            this.InsertNotiFicationcancel();
            this.InsertCancelNotification()
            var smsdesc = this.canpharmacyname + " n'a pas accepté votre commande de médicaments. Merci de sélectionner une autre pharmacie."
            this.SendTwiliSms(smsdesc, smsmobileno)
          })
          Swal.fire(
            'Annulé!',
            'La commande a été annulée.',
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })
    }

  }



  public GetDeliverOrder(id, patientID, pharmacyName, date, emailID, smsmobileno) {
    this.delipatientid = patientID;
    this.delipharmacyname = pharmacyName;
    this.deliemail = emailID;
    this.smsmobleno = smsmobileno;
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Order has been delivered!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,  Delivered!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeliveredPatientMedicineDetails(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();
            this.InsertDeliverNotification();
            this.InsertNotiFicationDeliver();

            var smsdec = "Your Medicine Order with has been Delivered."
            this.SendTwiliSms(smsdec, this.smsmobleno)
          })
          Swal.fire(
            'Delivered!',
            'The order was collected by the patient! .',
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })
    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Commande collectée par le client !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeliveredPatientMedicineDetails(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();
            this.InsertDeliverNotification();
            this.InsertNotiFicationDeliver();

            var smsdec = "Votre commande de médicaments avec a été livré."
            this.SendTwiliSms(smsdec, this.smsmobleno)
          })
          Swal.fire(
            '',
            "Commande collectée par le client !",
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })
    }


  }





  //accept notification


  public InsertAccptNotification() {
    if (this.languageid == '1') {

      var entity = {
        'PatientID': this.accpatientid,
        'Notification': "Prescription order confirmed",
        'Description': this.accpharmacyname + "  accepted your medicine order which is being processed. ",
        'NotificationTypeID': 13,
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
        'Notification': "Commande est confirmée",
        'Description': this.accpharmacyname + " a accepté votre commande de médicaments qui est en cours de traitement.",
        'NotificationTypeID': 13,
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
        'Description': this.accpharmacyname + "  accepted your medicine order which is being processed. ",
        'ToUser': this.accemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': this.accpharmacyname + " a accepté votre commande de médicaments qui est en cours de traitement.",
        'ToUser': this.accemail,
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




  //cancel Notification






  public InsertCancelNotification() {
    if (this.languageid == '1') {

      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Prescription order not accepted",
        'Description': this.canpharmacyname + "  has not accepted your medicine order. Please select another pharmacy.",
        'NotificationTypeID': 14,
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
        'Notification': "Commande non confirmé",
        'Description': this.canpharmacyname + " n'a pas accepté votre commande de médicaments. Merci de sélectionner une autre pharmacie.",
        'NotificationTypeID': 14,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }



  public InsertNotiFicationcancel() {

    if (this.languageid == '1') {
      var entity = {
        'Description': this.canpharmacyname + "  has not accepted your medicine order. Please select another pharmacy.",
        'ToUser': this.canemailID,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': this.canpharmacyname + " n'a pas accepté votre commande de médicaments. Merci de sélectionner une autre pharmacie.",
        'ToUser': this.canemailID,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }



  //deliver notification





  public InsertDeliverNotification() {
    if (this.languageid == '1') {

      var entity = {
        'PatientID': this.delipatientid,
        'Notification': "Order Delivered By Pharmacy",
        'Description': "Your Medicine order With " + this.delipharmacyname + "  has been Delivered.",
        'NotificationTypeID': 22,
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
        'PatientID': this.delipatientid,
        'Notification': "Commande livrée par la pharmacie",
        'Description': "Votre commande de médicaments avec" + this.delipharmacyname + " a été livré.",
        'NotificationTypeID': 22,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }

  public InsertNotiFicationDeliver() {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Medicine Order with " + this.delipharmacyname + " has been Delivered.",
        'ToUser': this.deliemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre commande de médicaments avec" + this.delipharmacyname + "a été livré.",
        'ToUser': this.deliemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }

  prescriptionurl: any;
  filetype: any;


  public GetPrescriptionUrl(url, details) {
    debugger
    this.prescriptionurl = url;
    this.showedit = details.showUpdate,
      this.id = details.id
    this.filetype = details.filetype


  }

  openpdf() {
    window.open(this.prescriptionurl, "_blank");
  }

  uploadephotos: any;
  typeid: number;

  public async getPrescriptionsdetails(details) {

    this.showedit = details.showUpdate,
      this.id = details.id
    this.docservice.GetPharmacyAppointmentPhotos(this.id).subscribe(data => {

      this.uploadephotos = data;
      this.typeid = data[0].typeID
    })
  }



  id: any;
  amounttopay: any;



  // public GetFullyOrderDetails(details) {
  //   this.id = details.id
  // }


  // public updatefullyorderdetails() {
  //   var entity = {
  //     'ID': this.id,
  //     'AmountToPay': this.amounttopay
  //   }
  //   this.docservice.UpdatePatient_TextMedicineDetailsFullyAvailableBit(entity).subscribe(data => {
  //     let res = data;
  //     if (this.languageid == 1) {
  //       Swal.fire('Success', 'Updated Successfully');
  //       this.amounttopay = ""
  //       this.GetPharmacyOrders()
  //     }
  //     else {
  //       Swal.fire('Succès', 'Mis à jour avec succés');
  //       this.amounttopay = ""
  //       this.GetPharmacyOrders()
  //     }

  //   })
  // }


  partialid: any;


  // public GetPartialOrderDetails(details) {
  //   this.partialid = details.id
  // }


  // attachments2 = []
  // attachmentsurl2 = []
  // public photodetail = []

  // public dummattachmenturl = []

  // public onattachmentUpload2(abcd) {

  //   // for (let i = 0; i < abcd.length; i++) {
  //   this.dummattachmenturl = []
  //   this.attachments2.push(abcd.addedFiles[0]);
  //   this.uploadattachments2();
  //   // }
  //   if (this.languageid == 1) {
  //     Swal.fire('Added Successfully');
  //     abcd.length = 0;
  //   }
  //   else if (this.languageid == 6) {
  //     Swal.fire('Mis à jour avec succés');
  //     abcd.length = 0;
  //   }

  // }
  // public uploadattachments2() {
  //   this.docservice.DoctorMedicalProof(this.attachments2).subscribe(res => {

  //     this.attachmentsurl2.push(res);
  //     this.dummattachmenturl.push(res);

  //     let a = this.dummattachmenturl[0].slice(2);

  //     let b = 'https://maroc.voiladoc.org' + a;

  //     this.photodetail.push(b)


  //     this.attachments2.length = 0;

  //   })
  //   // this.sendattachment();
  // }


  // public updatepartialorders() {
  //   var entity = {
  //     'ID': this.partialid,
  //     'PartialPhotoUrl': this.attachmentsurl2[0],
  //     'AmountToPay': this.amounttopay
  //   }
  //   this.docservice.UpdatePatient_TextMedicineDetailsPartialBit(entity).subscribe(data => {
  //     let res = data;
  //     if (this.languageid == 1) {
  //       Swal.fire('Success', 'Updated Successfully');
  //       this.amounttopay = ""
  //       this.GetPharmacyOrders()
  //     }
  //     else {
  //       Swal.fire('Succès', 'Mis à jour avec succés');
  //       this.amounttopay = ""
  //       this.GetPharmacyOrders()
  //     }

  //   })
  // }



  orderid: any;
  deliverycompanyid: any;



  // public GetReadyForDelivery(details) {
  //   this.orderid = details.id
  // }




  public GetReadyForDelivery(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want assign this order to delivery company!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Ready!'
      }).then((result) => {
        if (result.value) {
          this.docservice.GetDeliveredPatnerAssignReadyForAvailable(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();

          })
          Swal.fire(
            'Success!',
            'Order sent to delivery Delivery.',
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })
    }
    else {

      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Vous souhaitez attribuer cette commande à la société de livraison!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.GetDeliveredPatnerAssignReadyForAvailable(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();

          })
          Swal.fire(
            'Succès!',
            'La commande est prête pour la livraison.',
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })

    }

  }




  // public asssign(pid, deliverycompanyid) {
  //  
  //   var entity = {
  //     'MedicineOrderID': this.orderid,
  //     'DeliveryCompanyID': deliverycompanyid,
  //     'PartnerID': pid,
  //     'Status': 'Assigned'
  //   }
  //   this.docservice.InsertDeliveryPartnerAssignedOrders(entity).subscribe(res => {
  //     let test = res;
  //     Swal.fire(' Assigned', 'Order Assigned to delivery partner.');
  //     this.getpharmacyorders()

  //   })

  // }


  public SavePDF() {

    let pdfContent = window.document.getElementById("content");
    var doc = new jsPDF('p', 'mm', "a4");


    html2canvas(pdfContent).then(function (canvas) {


      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(3);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      doc.save('Medicines.pdf');
    });
  }




  // public SavePdfPhoto() {
  //  
  //   let pdfContent1 = window.document.getElementById("contentPhoto");
  //   var docs = new jsPDF('p', 'mm', "a4");

  //   html2canvas(pdfContent1).then(function(canvas) {

  //     var imgDatas = canvas.toDataURL('image/jpeg', 1.0);

  //     docs.setFontSize(3);

  //     docs.addImage(imgDatas, 'JPEG', 10, 10, 180, 150);
  //     docs.save('Medicines.pdf');
  //   });
  // }


  // const FileSaver = require('file-saver');

  public async SavePdfPhoto() {
    window.open(this.prescriptionurl, "_blank");

    // const a = document.createElement("a");
    // a.href = await toDataURL(this.prescriptionurl);
    // a.download = "";
    // 
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);

    // const pdfUrl = './assets/sample.pdf';
    // const pdfName = 'your_pdf_file';
    // FileSaver.saveAs(pdfUrl, pdfName);
  }



  patientid: any;

  public serverdateandtime: any;
  public servertime: any;
  public serverdate: any;
  public chatID: any;
  public chatconversation = "";
  public image: any;
  public attachments = [];
  public attachmentsurl = [];
  coversationarray = [];
  public imageurl: any;




  public GetShowOff() {
    this.showwindow = 0
    document.getElementById("myForm").style.display = "none";
  }


  showwindow: any;


  public GetPharmacyPatientID(patientid, patientemail, id, smsmobileno) {
    this.patientid = patientid;
    this.patientemail = patientemail
    this.orderid = id;
    this.smsmobleno = smsmobileno;
    document.getElementById("myForm").style.display = "block";
    this.showwindow = 1;
    this.coversationarray.length = 0;
    this.coversationarray = [];
    this.image = 0;
    this.getserverdateandtime()

    this.oberserableTimer();
    this.docservice.GetPharmacyChatID(this.pharmacyid, this.patientid, this.orderid).subscribe(res => {

      this.chatID = res[0].chatID;
      this.getPreviousChat();
    })

    this.dosendmsg()
  }

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

  public dosendmsg() {
    this.getChat();
    if (this.languageid == 1) {
      var smsdesc = this.user + " is trying to contact on the chatline. Please open the Voiladoc application to respond."
    }
    else {
      var smsdesc = "La pharmacie "+this.user + " essaie de vous contacter sur la chatline. Veuillez ouvrir l'application Voiladoc pour répondre.´"
    }

    this.SendTwiliSms(smsdesc, this.smsmobleno)

  }

  public getChat() {
    this.docservice.GetPharmacyChatID(this.pharmacyid, this.patientid, this.orderid).subscribe(res => {


      if (res.length > 0) {
        this.chatID = res[0].chatID;
        // this.InsertChatDetails();
        this.getPreviousChat();
      }
      else {
        var entity = {
          'PharmacyID': this.pharmacyid,
          'PatientID': this.patientid,
          'AppointmentID': this.orderid
        }
        this.docservice.InserPharmacy_ChatMaster(entity).subscribe(data => {

          if (data != 0) {
            this.chatID = data;
            // this.InsertChatDetails();
            this.getPreviousChat();
          }
        })
      }
    })
  }

  patientemail: any;

  public Insertnotificationtestazure() {

    if (this.languageid == 1) {
      var entity = {
        'Description': this.user + " is trying to contact on the chatline. Please open the Voiladoc application to respond.",
        'ToUser': this.patientemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else {
      var entity = {
        'Description': this.user + " essaie de vous contacter sur la chatline. Veuillez ouvrir l'application Voiladoc pour répondre.",
        'ToUser': this.patientemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }

  }




  public InsertChatDetails() {
    let conversation = '[doc:-' + this.chatconversation + ';time:-' + this.servertime + ']';

    if (this.image == 0) {
      var entity = {
        'ChatID': this.chatID,
        'Message': conversation,
        'SenderID': this.pharmacyid,
        'Sender': 'Pharmacy',
        'MessageType': 1,
        'MobileMessage': this.chatconversation,
        'MobileTime': this.servertime
      }
      this.docservice.InsertPharmacy_ChatDetails(entity).subscribe(data => {

        if (data != 0) {
          this.Insertnotificationtestazure()
        }
        this.Insertnotificationtestazure()

        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();

      })
    }
    else {
      var entitys = {
        'ChatID': this.chatID,
        'Message': this.imageurl,
        'SenderID': this.pharmacyid,
        'Sender': 'Pharmacy',
        'MessageType': 1,
        'MobileMessage': this.chatconversation,
        'MobileTime': this.servertime
      }
      this.docservice.InsertPharmacy_ChatDetails(entitys).subscribe(data => {

        if (data != 0) {
          this.Insertnotificationtestazure()
        }
        this.Insertnotificationtestazure()

        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();

      })
    }

  }

  public getPreviousChat() {
    this.docservice.GetPharmacy_ChatDetails(this.chatID).subscribe(res => {
      let Chatconversation = res;

      this.coversationarray.length = 0;
      this.coversationarray = [];

      for (let i = 0; i < Chatconversation.length; i++) {

        if (Chatconversation[i].chatConversation.includes('[doc:-')) {

          var msg = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("[doc:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf(";")
          );
          var chattime = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 7 + 8
          );

          this.coversationarray.push({ user: 'doc', chatmsg: msg, time: chattime, msgtype: Chatconversation[i].messageType })
        }
        else if (Chatconversation[i].chatConversation.includes('[pat:-')) {

          var msg = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("[pat:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf(";")
          );
          var chattime = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 7 + 8
          );
          this.coversationarray.push({ user: 'pat', chatmsg: msg, time: chattime, msgtype: Chatconversation[i].messageType })
        }
        else {

          if (Chatconversation[i].sender == 'Patient') {
            this.coversationarray.push({ user: 'pat', chatmsg: Chatconversation[i].chatConversation, time: chattime, msgtype: Chatconversation[i].messageType })
          }
          if (Chatconversation[i].sender == 'Pharmacy') {
            this.coversationarray.push({ user: 'doc', chatmsg: Chatconversation[i].chatConversation, time: chattime, msgtype: Chatconversation[i].messageType })
          }
        }
      }

    })
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.getPreviousChat();
      // this.updateusertyping();
      // this.getusertyping();
      var objDiv = document.getElementById("chatboxdiv");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }



  public onattachmentUpload(abcd) {
    debugger
    this.spinner.show();
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();

    if(this.languageid==1)
    {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else
    {
      Swal.fire('Mis à jour et envoyé au patient.');
      abcd.length = 0;
    }

  }

  public uploadattachments() {
    debugger
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
      debugger
      this.spinner.hide();
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
      debugger
      let b = 'https://maroc.voiladoc.org' + a;
      this.imageurl = b;
      this.image = 1;
      this.attachments.length = 0;
    }, error => {
      this.spinner.hide();
      Swal.fire("issue with internet");
    })
    // this.sendattachment();
  }

  public ChangeAvailableMedicines(medicinelist, even) {
    if (even.target.checked == true) {
      this.docservice.UpdatePatientOrderedMedicinesAvailableMedicines(medicinelist.id).subscribe(res => {

        this.GetPharmacyOrders();
      })
    }
    if (even.target.checked == false) {
      this.docservice.UpdatePatientOrderedMedicinesUnAvailableMedicines(medicinelist.id).subscribe(res => {

        this.GetPharmacyOrders();
      })
    }
  }


  public Updateavailablemedicines() {
    debugger
    
    var txtAmount = this.orderedmedicinelist.filter(x => (x.amount == 0 && (x.availableBit == true || x.availableBit == 1)) && (x.substituteBit != true && x.substituteBit != 1));
    var subAmount = this.orderedmedicinelist.filter(x => (x.subAmount == 0 && (x.availableBit == true || x.availableBit == 1)) && (x.substituteBit == true && x.substituteBit == 1));
    debugger
    var mandatoryOne = this.orderedmedicinelist.filter(x => (x.availableBit == true || x.availableBit == 1))
    if (txtAmount.length != 0 || mandatoryOne.length == 0||subAmount.length!=0) {
      if (this.languageid == 1) {
        Swal.fire("For available drugs, please make sure you have entered the price and ticked the box in the corresponding action column.");
      }
      else {
        Swal.fire("Pour les médicaments disponibles veuillez-vous assurer d'avoir renseigné le prix et coché la case dans la colonne d'action correspondante.");
      }
    }
    // else if (mandatoryOne.length == 0) {
    //   if (this.languageid == 1) {
    //     Swal.fire("For available drugs, please make sure you have entered the price and ticked the box in the corresponding action column.");
    //   }
    //   else {
    //     Swal.fire("Pour les médicaments disponibles veuillez-vous assurer d'avoir renseigné le prix et coché la case dans la colonne d'action correspondante.")
    //   }
    // }
    else {
      this.spinner.show();
      for (let i = 0; i < this.orderedmedicinelist.length; i++) {
        debugger
        var entity = {
          'ID': this.orderedmedicinelist[i].id,
          'Amount': this.orderedmedicinelist[i].amount,
          'AvailableBit': this.orderedmedicinelist[i].availableBit,
          'Quantity': this.orderedmedicinelist[i].quantity,
          'MedicineName': this.orderedmedicinelist[i].medicineName,
          'SIG': this.orderedmedicinelist[i].sig,
          'SubMedicineName': this.orderedmedicinelist[i].subMedicineName,
          'SubQuantity': this.orderedmedicinelist[i].subQuantity,
          'SubPhysology': this.orderedmedicinelist[i].subPhysology,
          'SubAmount': this.orderedmedicinelist[i].subAmount,
          'DocPrID': this.orderedmedicinelist[i].docPrID,
          'SubstituteBit': this.orderedmedicinelist[i].substituteBit
        }
        this.docservice.UpdatePatientOrderedMedicinesAvailableMedicines(entity).subscribe(data => {
          debugger
          this.docservice.UpdatePatient_TextMedicineDetails(this.listid).subscribe(data => {
            if (this.languageid == 1) {
              Swal.fire('Updated Successfully');
            }
            else if (this.languageid == 6) {
              Swal.fire('Mis à jour avec succès !');
            }
            this.Notification()
            
            this.GetPharmacyOrders();
            this.spinner.hide();
          },error=>{
            this.spinner.hide();
          })
        },error=>{
          this.spinner.hide();
        })

      
      }

      if (this.languageid == 1) {
        var smsdesc = "Pharamacy has Updated Available Medicines. Please open Voiladoc App And Order it. ";
      }
      else {
        var smsdesc = this.user + " pharmacie du maroc Pharmacy vous a envoyé une mise à jour sur les médicaments et les prix. Veuillez ouvrir Voiladoc.";
      }
      this.SendTwiliSms(smsdesc, this.smsmobleno);
    }
  }


  public Notification() {
    var entity = {
      'Description': this.accpharmacyname + " has Updated Available Medicines. Please open Voiladoc App And Order it. ",
      'ToUser': this.patientemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }

  comments: any;
  attachmentsurl2 = []

  public updateamount() {
    var entity = {
      'ID': this.id,
      'PhotoPrescriptionAmount': this.amounttopay,
      'SubPhotoUrl': this.attachmentsurl[0],
      'SubRemarks': this.comments
    }
    this.docservice.UpdatePatient_TextMedicineDetailsPhotoAmount(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire("Amount Updated Successfully");
        this.getpharmacyorders();
        this.amounttopay="";
        this.comments="";
        this.attachmentsurl.length=0;
        this.imageurl="";
      }
      else {
        Swal.fire("Montant mis à jour et envoyé au patient.");
        this.getpharmacyorders();
        this.amounttopay="";
        this.comments="";
        this.attachmentsurl.length=0;
        this.imageurl="";

      }

    })
  }

  amount: any;









  public OrderReady(id, patientID, pharmacyName, date, emailID, smsmobileno) {
    this.delipatientid = patientID;
    this.delipharmacyname = pharmacyName;
    this.deliemail = emailID;
    this.smsmobleno = smsmobileno;
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Is the order ready for collection?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateOrderReadyBit(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();


            var smsdesc = " Your medicine is ready for collection at" + this.user
            this.SendTwiliSms(smsdesc, this.smsmobleno)

          })
          Swal.fire(
            'Success!',
            'Order sent to delivery Delivery.',
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })
    }
    else {

      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "La commande est-elle prête à être récupérée ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui!',
        cancelButtonText: 'NON'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateOrderReadyBit(id).subscribe(res => {
            let test = res;
            this.GetPharmacyOrders();
            this.getpharmacyorders();


            var smsdesc = " Votre commande de médicaments est prête, veuillez les retirer à la pharmacie " + this.user


            this.SendTwiliSms(smsdesc, this.smsmobleno)
          })
          Swal.fire(
            'Succès!',
            'La commande est prête pour la livraison.',
            'success'
          )
        }
        else {
          this.GetPharmacyOrders();
          this.getpharmacyorders();
        }
      })

    }

  }


  openNewwindow(photo) {

    window.open(photo, "_blank");
  }
}





