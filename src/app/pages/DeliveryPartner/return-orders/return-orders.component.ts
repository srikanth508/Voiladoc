import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { DatePipe } from '@angular/common';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-return-orders',
  templateUrl: './return-orders.component.html',
  styleUrls: ['./return-orders.component.css']
})
export class ReturnOrdersComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  labels: any;

  public ordertype: any;
  public todaydate: any;
  public Ordertypeid: any;
  startdate: any;
  enddate: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  public deliverycompanyid: any;
  public orderlist: any;
  public partnerlist: any;
  public term: any;
  p: number = 1;
  labels1:any;
  ngOnInit() {

    this.Ordertypeid = 0;
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

    var kkk = this.SDate.setDate(this.SDate.getDate() - 1);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.deliverycompanyid = localStorage.getItem('deliveryid');


    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()

    this.GetOrdersForDeliveryCompany()

    this.docservice.GetDeliveryPartnersByID(this.deliverycompanyid).subscribe(
      data => {
        debugger
        this.partnerlist = data;
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

  public getlanguage() {
    this.docservice.Getadmin_DeliveryLoginsOrdersEmployee_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }


  public GetOrdersForDeliveryCompany() {
    this.docservice.GetOrdersForDeliveryCompany(this.startdate, this.enddate).subscribe(
      data => {
        debugger
        let temp: any = data;
        this.orderlist = temp.filter(x => x.returnBit == 1 && x.refundBit == 0);
      }, error => {
      }
    )
  }
  selectedDate(data) {
    debugger
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetOrdersForDeliveryCompany();
  }

  medicalorderid: any;


  public getid(type, mid) {
    this.ordertype = type;
    this.medicalorderid = mid;
  }


  returnimage: any;

  public GetReturnImage(returnImage) {
    debugger
    this.returnimage = returnImage;
  }



  public asssign(pid) {
    debugger
    debugger
    var entitytwo = {
      'OrderID': this.medicalorderid,
      'ReturnPatnerID': pid
    }
    this.docservice.UpdateReturnAssignedShoppingOrders(entitytwo).subscribe(res => {
      let test = res;
      Swal.fire(' Assigned', 'Order Assigned to delivery partner.');
      this.GetOrdersForDeliveryCompany();
    })
  }



  public UpdateCollecteditem(medicalOrderID) {
    this.docservice.UpdateCollectedItems(medicalOrderID).subscribe(
      data => {
        Swal.fire('Item Collected Successfully')
        this.GetOrdersForDeliveryCompany();
      }, error => {
      }
    )
  }









  public patientid: any;
  public totalprice: any;
  public walletAmount: any;
  money: any;
  payingwallet: any;
  orderid: any;


  public GetRefundAmount(patientID, totalPrice, walletAmount, id, email) {
    debugger
    this.patientid = patientID,
      this.totalprice = totalPrice;
    this.walletAmount = walletAmount;
    this.orderid = id;
    this.patientemail = email;
  }


  public GetAddMoneyToWallet(money) {
    debugger
    if (this.totalprice < money) {
      Swal.fire('Amount Should be less than Paid Amount')
      this.money = ""
      money = ""
    }
    else {
      debugger
      this.payingwallet = Number(this.walletAmount) + Number(this.money)
    }

  }


  totaladdmoney: any;
  reason: any;
  patientemail: any;



  public updatedateails() {
    debugger
    var entity = {
      'PatientID': this.patientid,
      'WalletAmount': this.payingwallet
    }
    this.docservice.UpdatePatientWalletDetails(entity).subscribe(data => {
      let res = data;
      debugger
      this.UpdateRefundAmountItems()
      this.Insertnotification()
      // Swal.fire('Success', 'Wallet Balance Updated Successfully');
    })
  }



  public Insertnotification() {
    debugger
    var entity = {
      'Description': "Your Return Order Amount Refunded Your Wallet With Amount" + this.money,
      'ToUser': this.patientemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {
      debugger
      if (data != 0) {

      }
    })
  }


  public UpdateRefundAmountItems() {
    debugger
    var entity = {
      'OrderID': this.orderid,
      'RefundAmount': this.money,
      'PaymentRemarks': this.reason
    }
    this.docservice.UpdateRefundAMountOrders(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Amount Refunded Successfully');
      this.money = "";
      this.reason = ""
      this.GetOrdersForDeliveryCompany();
    })
  }

  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }


}
