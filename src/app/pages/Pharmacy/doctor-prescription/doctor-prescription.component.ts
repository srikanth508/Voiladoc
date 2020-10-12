import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';
@Component({
  selector: 'app-doctor-prescription',
  templateUrl: './doctor-prescription.component.html',
  styleUrls: ['./doctor-prescription.component.css']
})
export class DoctorPrescriptionComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }


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

  ngOnInit() {


   
    this.pharmacyid = localStorage.getItem('pharmacyid');
    this.languageid = localStorage.getItem('LanguageID');
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
  }
  public GetPharmacyOrders() {
   
    this.docservice.GetPatient_TextMedicineDetails(this.pharmacyid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        this.orderlist = data;
      }, error => {
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
  referencenumber:any;
  
  public GetMedicines(id) {
    this.myarray.length = 0;
   
    this.listid = id;
    this.list = this.orderlist.filter(x => x.id == this.listid)
   
    this.patientname = this.list[0].patientName,
      this.mobilernumber = this.list[0].mobileNumber
    this.address = this.list[0].address
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
      this.referencenumber=this.list[0].referenceNumber

    let meds = this.list[0].allMedicines.split(',');
    let quan = this.list[0].quantity.split(',');

   

    let sig = this.list[0].sig.split(',');
    // let notetopharmacist = this.list[0].noteToPharmacist.split(',');
    let howmanyrefills = this.list[0].renovolment.split(',');
    // let issubastaible = this.list[0].isSubatianablenotPermittesd.split(',');
    // let mtype = this.list[0].medicineTypeID.split(',');

    for (let i = 0; i < meds.length; i++) {
      var medetty = {
        'medicine': meds[i],
        'quantity': quan[i],
        'Sig': sig[i],
        // 'NoteToPharmacist': notetopharmacist[i],
        'howmanyrefills': howmanyrefills[i],
      
        // 'issubastaible': issubastaible[i]
        // 'Medicinetype': mtype[i]
      }
      this.myarray.push(medetty);
    }
   
  }

  selectedDate(data) {
   

    // var sdate = data.split('-')
    // this.startdate= sdate[0]
    // this.enddate= sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
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




  public GetAcceptOrder(id, patientID, pharmacyName, date, emailID) {
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




  public GetCancelOrder(id, patientID, pharmacyName, date, emailID) {
    this.canpatientid = patientID;
    this.canpharmacyname = pharmacyName;
    this.canemailID = emailID
   
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



  public GetDeliverOrder(id, patientID, pharmacyName, date, emailID) {
    this.delipatientid = patientID;
    this.delipharmacyname = pharmacyName;
    this.deliemail = emailID;
   
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
        })
        Swal.fire(
          'Delivered!',
          'Order has been Delivered.',
          'success'
        )
      }
      else {
        this.GetPharmacyOrders();
        this.getpharmacyorders();
      }
    })
  }





  //accept notification


  public InsertAccptNotification() {
    if (this.languageid == '1') {
     
      var entity = {
        'PatientID': this.accpatientid,
        'Notification': "Order Accepted By Pharmacy",
        'Description': "Your Medicine order With " + this.accpharmacyname + "  has been Accepted.",
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
        'Notification': "Commande acceptée par la pharmacie",
        'Description': "Votre commande de médicaments avec " + this.accpharmacyname + "  a été accepté.",
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
        'Description': "Your Medicine Order with " + this.accpharmacyname + " has been Accepted.",
        'ToUser': this.accemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre commande de médicaments avec " + this.accpharmacyname + " a été accepté.",
        'ToUser': this.accemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
  }


  //cancel Notification






  public InsertCancelNotification() {
    if (this.languageid == '1') {
     
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Order Cancelled By Pharmacy",
        'Description': "Your Medicine order With " + this.canpharmacyname + "  has been Cancelled.",
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
        'Notification': "Commande annulée par la pharmacie",
        'Description': "Votre commande de médicaments avec" + this.canpharmacyname + " a été annulé.",
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
        'Description': "Your Medicine Order with " + this.canpharmacyname + " has been Cancelled.",
        'ToUser': this.canemailID,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre commande de médicaments avec" + this.canpharmacyname + "a été annulé.",
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


  public GetPrescriptionUrl(url) {
    this.prescriptionurl = url;
  }

  id: any;
  amounttopay: any;


  public GetFullyOrderDetails(details) {
    this.id = details.id
  }


  public updatefullyorderdetails() {
    var entity = {
      'ID': this.id,
      'AmountToPay': this.amounttopay
    }
    this.docservice.UpdatePatient_TextMedicineDetailsFullyAvailableBit(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Updated Successfully');
      this.amounttopay = ""
      this.GetPharmacyOrders()
    })
  }


  partialid: any;


  public GetPartialOrderDetails(details) {
    this.partialid = details.id
  }


  attachments2 = []
  attachmentsurl2 = []


  public onattachmentUpload2(abcd) {
   
    // for (let i = 0; i < abcd.length; i++) {

    this.attachments2.push(abcd.addedFiles[0]);
    this.uploadattachments2();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  public uploadattachments2() {
    this.docservice.DoctorMedicalProof(this.attachments2).subscribe(res => {
     
      this.attachmentsurl2.push(res);
      // this.identityshowphoto.push(res);
      //
      // let a = this.identityshowphoto[0].slice(2);
      //
      // let b = 'http://14.192.17.225' + a;

      // this.photodetail.push(b)
      //

      this.attachments2.length = 0;
     
    })
    // this.sendattachment();
  }


  public updatepartialorders() {
    var entity = {
      'ID': this.partialid,
      'PartialPhotoUrl': this.attachmentsurl2[0],
      'AmountToPay': this.amounttopay
    }
    this.docservice.UpdatePatient_TextMedicineDetailsPartialBit(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Updated Successfully');
      this.amounttopay = ""
      this.GetPharmacyOrders()
    })
  }



  orderid: any;
  deliverycompanyid: any;



  // public GetReadyForDelivery(details) {
  //   this.orderid = details.id
  // }




  public GetReadyForDelivery(id) {

   
    Swal.fire({
      title: 'Are you sure?',
      text: "This Order Is Ready For Delivery!",
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
          'Order Is Ready for Delivery.',
          'success'
        )
      }
      else {
        this.GetPharmacyOrders();
        this.getpharmacyorders();
      }
    })
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



  public SavePdfPhoto() {
    window.open(this.prescriptionurl, "_blank");
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


  public GetPharmacyPatientID(patientid, patientemail) {
    this.patientid = patientid;
    this.patientemail = patientemail
    document.getElementById("myForm").style.display = "block";
    this.showwindow = 1;

    this.image = 0;
    this.getserverdateandtime()
    this.oberserableTimer();
    this.docservice.GetPharmacyChatID(this.pharmacyid, this.patientid).subscribe(res => {
     
      this.chatID = res[0].chatID;
      this.getPreviousChat();
    })
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
  }

  public getChat() {
    this.docservice.GetPharmacyChatID(this.pharmacyid, this.patientid).subscribe(res => {
     

      if (res.length > 0) {
        this.chatID = res[0].chatID;
        this.InsertChatDetails();
        this.getPreviousChat();
      }
      else {
        var entity = {
          'PharmacyID': this.pharmacyid,
          'PatientID': this.patientid
        }
        this.docservice.InserPharmacy_ChatMaster(entity).subscribe(data => {
         
          if (data != 0) {
            this.chatID = data;
            this.InsertChatDetails();
            this.getPreviousChat();
          }
        })
      }
    })
  }

  patientemail: any;

  public Insertnotificationtestazure() {
   
    var entity = {
      'Description': "Pharmacy Trying To Reach You : " + this.chatconversation,
      'ToUser': this.patientemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {
     
      if (data != 0) {

      }
    })
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

  // public updateusertyping() {
  //   if (this.chatconversation.length > 0) {
  //     this.docservice.UpdateIsTyping(this.appointmentiddd, true).subscribe(res => {
  //       let tt = res;
  //     })
  //   }
  //   else {
  //     this.docservice.UpdateIsTyping(this.appointmentiddd, false).subscribe(res => {
  //       let tt = res;
  //     })
  //   }
  // }

  // public getusertyping() {
  //   this.docservice.getChat(this.pharmacyid, this.patientid).subscribe(res => {
  //    
  //     let isUserTyping = res.filter(x => x.appointmentID == this.appointmentiddd);
  //     this.istyping = isUserTyping[0].isTyping;
  //   })
  // }

  public onattachmentUpload(abcd) {
   
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
     
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
     
      let b = 'https://14.192.17.225' + a;
      this.imageurl = b;
      this.image = 1;
      this.attachments.length = 0;
     
    })
    // this.sendattachment();
  }


  // public GetShowID()
  // {
  //   this.showwindow=0;
  // }
}
