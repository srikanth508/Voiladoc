import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
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

  ngOnInit() {


    debugger
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
    debugger
    this.GetPharmacyOrders();


    this.docservice.GetDeliveryPartnersWeb().subscribe(
      data => {
        debugger
        this.partnerlist = data;
      }, error => {
      }
    )


  }
  public GetPharmacyOrders() {
    debugger
    this.docservice.GetPatient_TextMedicineDetails(this.pharmacyid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        debugger
        this.orderlist = data;
      }, error => {
      }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_PharmacyLoginDoctorPrescriptionReports_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {
        debugger
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

  public GetMedicines(id) {
    this.myarray.length = 0;
    debugger
    this.listid = id;
    this.list = this.orderlist.filter(x => x.id == this.listid)
    debugger
    this.patientname = this.list[0].patientName,
      this.mobilernumber = this.list[0].mobileNumber
    this.address = this.list[0].address

    this.doctorname = this.list[0].doctorName,
      this.docmobile = this.list[0].docmobile,
      this.email = this.list[0].emailID,
      this.docsignatureurl = this.list[0].siganatureurl




    let meds = this.list[0].allMedicines.split(',');
    let quan = this.list[0].quantity.split(',');
    let mtype = this.list[0].medicineTypeID.split(',');
    for (let i = 0; i < meds.length; i++) {
      var medetty = {
        'medicine': meds[i],
        'quantity': quan[i],
        'Medicinetype': mtype[i]
      }
      this.myarray.push(medetty);
    }
    debugger
  }

  selectedDate(data) {
    debugger

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
        debugger
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
    debugger;
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




  public GetCancelOrder(id, patientID, pharmacyName, date, emailID) {
    this.canpatientid = patientID;
    this.canpharmacyname = pharmacyName;
    this.canemailID = emailID
    debugger;
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
    debugger;
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
      debugger
      var entity = {
        'PatientID': this.accpatientid,
        'Notification': "Order Accepted By Pharmacy",
        'Description': "Your Medicine order With " + this.accpharmacyname + "  has been Accepted.",
        'NotificationTypeID': 13,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {
        debugger
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
        debugger
        if (data != 0) {

        }

      })
    }
  }



  public InsertNotiFicationAccpt() {
    debugger
    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Medicine Order with " + this.accpharmacyname + " has been Accepted.",
        'ToUser': this.accemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
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
        debugger
        if (data != 0) {

        }
      })
    }
  }


  //cancel Notification






  public InsertCancelNotification() {
    if (this.languageid == '1') {
      debugger
      var entity = {
        'PatientID': this.canpatientid,
        'Notification': "Order Cancelled By Pharmacy",
        'Description': "Your Medicine order With " + this.canpharmacyname + "  has been Cancelled.",
        'NotificationTypeID': 14,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {
        debugger
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
        debugger
        if (data != 0) {

        }

      })
    }
  }



  public InsertNotiFicationcancel() {
    debugger
    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Medicine Order with " + this.canpharmacyname + " has been Cancelled.",
        'ToUser': this.canemailID,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
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
        debugger
        if (data != 0) {

        }
      })
    }
  }



  //deliver notification





  public InsertDeliverNotification() {
    if (this.languageid == '1') {
      debugger
      var entity = {
        'PatientID': this.delipatientid,
        'Notification': "Order Delivered By Pharmacy",
        'Description': "Your Medicine order With " + this.delipharmacyname + "  has been Delivered.",
        'NotificationTypeID': 22,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
      }
      this.docservice.InsertNotifications(entity).subscribe(data => {
        debugger
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
        debugger
        if (data != 0) {

        }

      })
    }
  }

  public InsertNotiFicationDeliver() {
    debugger
    if (this.languageid == '1') {
      var entity = {
        'Description': "Your Medicine Order with " + this.delipharmacyname + " has been Delivered.",
        'ToUser': this.deliemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        debugger
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
        debugger
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
    debugger
    for (let i = 0; i < abcd.length; i++) {

      this.attachments2.push(abcd[i]);
      this.uploadattachments2();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  public uploadattachments2() {
    this.docservice.DoctorMedicalProof(this.attachments2).subscribe(res => {
      debugger
      this.attachmentsurl2.push(res);
      // this.identityshowphoto.push(res);
      // debugger
      // let a = this.identityshowphoto[0].slice(2);
      // debugger
      // let b = 'http://14.192.17.225' + a;

      // this.photodetail.push(b)
      // debugger

      this.attachments2.length = 0;
      debugger
    })
    // this.sendattachment();
  }


  public updatepartialorders() {
    var entity = {
      'ID': this.partialid,
      'PartialPhotoUrl': this.attachmentsurl2[0],
      'AmountToPay':this.amounttopay
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

    debugger;
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
  //   debugger
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
    debugger
    let pdfContent = window.document.getElementById("content");
    var doc = new jsPDF('p', 'mm', "a4");

 
    html2canvas(pdfContent).then(function(canvas) {

 
      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(3);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      doc.save('Medicines.pdf');
    });
  }




  // public SavePdfPhoto() {
  //   debugger
  //   let pdfContent1 = window.document.getElementById("contentPhoto");
  //   var docs = new jsPDF('p', 'mm', "a4");
 
  //   html2canvas(pdfContent1).then(function(canvas) {
 
  //     var imgDatas = canvas.toDataURL('image/jpeg', 1.0);

  //     docs.setFontSize(3);

  //     docs.addImage(imgDatas, 'JPEG', 10, 10, 180, 150);
  //     docs.save('Medicines.pdf');
  //   });
  // }

  

public SavePdfPhoto(){
    window.open(this.prescriptionurl, "_blank");
}

}
