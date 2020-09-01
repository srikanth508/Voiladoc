import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-pharmacyorders',
  templateUrl: './pharmacyorders.component.html',
  styleUrls: ['./pharmacyorders.component.css']
})
export class PharmacyordersComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public pharmacyid: any;
  public orderlist: any;
  public term: any;
  p: number = 1;
  public cancelid: any;
  public reason: any;
  public photoid: any;
  public photos: any;
  public showphoto: any;
  public todaydate: any;
  public imgtoshow: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  value: any;
  public dummlist:any;
  ngOnInit() {

    this.pharmacyid = localStorage.getItem('pharmacyid');


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

    var kkk = this.SDate.setDate(this.SDate.getDate() - 10);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.getmedicineorderdetailsbyphrmacyid();
  }

  public getmedicineorderdetailsbyphrmacyid() {
    this.docservice.GetReOrderMedicinesByPhrmacyID(this.pharmacyid, this.startdate, this.enddate).subscribe(
      data => {
        debugger
        this.orderlist = data;
        this.dummlist=this.orderlist ;
      }, error => {
      }
    )
  }

  selectedDate(data) {
    debugger

    var sdate = data.split('-')

    var s = sdate[0]
    var e = sdate[1]
    this.docservice.GetReOrderMedicinesByPhrmacyID(this.pharmacyid, s, e).subscribe(
      data => {
        debugger
        this.orderlist = data;
        this.dummlist=this.orderlist ;
      }, error => {
      }
    )
  }

  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }
  public medicinedeliver(medicalOrderID) {
    this.docservice.UpdateReOrderMedicinesDelivery(medicalOrderID).subscribe(
      data => {
        debugger
        Swal.fire('Completed', 'Medicines Delivered');
        this.getmedicineorderdetailsbyphrmacyid();
        this.selectedDate(data);
      }, error => {
      }
    )
  }



  public UpdateAcceptedBitReOrderMedicines(medicalOrderID) {
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
        this.docservice.UpdateAcceptedBitReOrderMedicines(medicalOrderID).subscribe(res => {
          let test = res;
          this.getmedicineorderdetailsbyphrmacyid();


        })
        Swal.fire(
          'Accepted!',
          'Order has been Accepted.',
          'success'
        )
      }
      else {
        this.getmedicineorderdetailsbyphrmacyid();

      }
    })
  }



  public UpdateReOrderMedicinesNotVisitedBit(medicalOrderID) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Not Visited This Order!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Not Visited!'
    }).then((result) => {
      if (result.value) {
        this.docservice.UpdateReOrderMedicinesNotVisitedBit(medicalOrderID).subscribe(res => {
          let test = res;
          this.getmedicineorderdetailsbyphrmacyid();
        })
        Swal.fire(
          'Accepted!',
          'Order has been Not Visited.',
          'success'
        )
      }
      else {
        this.getmedicineorderdetailsbyphrmacyid();
      }
    })
  }




  public cancelmedicine(medicalOrderID) {
    debugger
    this.cancelid = medicalOrderID;
  }

  public cancelmedicineorder() {
    this.docservice.CancelledReOrderMedicines(this.cancelid).subscribe(
      data => {
        debugger
        this.getmedicineorderdetailsbyphrmacyid();
        this.updatereson();
      }, error => {
      }
    )
  }
  public updatereson() {
    var entity = {
      'MedicalOrderID': this.cancelid,
      'ReasonForCancel': this.reason
    }
    this.docservice.UpdateReOrderMedicinesReasonForCancel(entity).subscribe(res => {
      let test = res;
      Swal.fire(' Cancelled', 'Medicines Cancelled Successfully');
    })

  }
  public GetPhotoID(imgurl) {
    debugger
    this.imgtoshow = imgurl;
    // this.photoid = medicalOrderID;
    // this.GetPhotobyID();
  }
  public GetPhotobyID() {
    this.docservice.GetMedicineOrderDetailsPhoto(this.photoid).subscribe(
      data => {
        debugger
        this.photos = data;
        //  this.showphoto=this.photos[0].photoUrl
      }, error => {
      }
    )
  }




  public getget(even) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;
    debugger
    if (even.target.value == 1) {
      debugger
      let dfsfd = this.dummlist.filter(x => x.delivery == 1);
      debugger
      this.orderlist = dfsfd;
    
    }
    if (even.target.value == 2) {
      debugger
      let dfsfd = this.dummlist.filter(x => x.notVisited == 1);
      debugger
      this.orderlist = dfsfd;
     
    }
    if (even.target.value == 3) {
      debugger
      let dfsfd = this.dummlist.filter(x => x.cancelled == 1);
      debugger
      this.orderlist = dfsfd;
     
    }
  }
}
