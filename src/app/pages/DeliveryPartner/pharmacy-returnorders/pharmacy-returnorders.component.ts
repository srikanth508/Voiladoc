import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-pharmacy-returnorders',
  templateUrl: './pharmacy-returnorders.component.html',
  styleUrls: ['./pharmacy-returnorders.component.css']
})
export class PharmacyReturnordersComponent implements OnInit {
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
  public labels1: any;
  public deliverycompanyid: any;
  public dummorderlist: any;
  public retunphotos: any;
  public count: any;
  public labels2: any;
  public pincode: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.deliverycompanyid = localStorage.getItem('deliveryid');
    this.pincode = localStorage.getItem('pincode');
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

    var kkk = this.SDate.setDate(this.SDate.getDate() - 7);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.GetPharmacyOrders()

    this.docservice.GetDeliveryPartnersByID(this.deliverycompanyid).subscribe(
      data => {

        this.partnerlist = data;
      }, error => {
      }
    )


    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels2 = data;
      }, error => {
      }
    )
  }

  public GetPharmacyOrders() {

    this.docservice.GetPatient_TextMedicineDetailsForDeliverCompany(this.startdate, this.enddate, this.languageid, this.pincode).subscribe(
      data => {

        this.dummorderlist = data;
        this.orderlist = this.dummorderlist.filter(x => x.returnBit == 1);
        this.count = this.orderlist.length;
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

  selectedDate(data) {


    // var sdate = data.split('-')
    // this.startdate= sdate[0]
    // this.enddate= sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetPharmacyOrders()
  }


  orderid: any;


  public getid(id) {
    this.orderid = id;
  }


  public asssign(pid) {

    var entity = {
      'MedicineOrderID': this.orderid,
      'PartnerID': pid
    }
    this.docservice.UpdateDeliveryPartnerrReturnAssignOrdersAssignedOrders(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        Swal.fire(' Assigned', 'Order Assigned to delivery partner.');
        this.GetPharmacyOrders()
      }
      else {
        Swal.fire('La commande a été attribuée au livreur');
        this.GetPharmacyOrders()

      }
    })
  }

  public GetReturnImage(id) {
    this.docservice.GetPrescriptionReturnedPhotos(id).subscribe(
      data => {

        this.retunphotos = data;

      }, error => {
      }
    )
  }



  public UpdateCollecteditem(id) {
    this.docservice.UpdateCollectBit(id).subscribe(
      data => {

        Swal.fire('Success', 'Items Collected Successfully');
        this.GetPharmacyOrders()

      }, error => {
      }
    )

  }










  //refund amount




  public patientid: any;
  public totalprice: any;
  public walletAmount: any;
  money: any;
  payingwallet: any;



  public GetRefundAmount(patientID, totalPrice, walletAmount, id, email) {

    this.patientid = patientID,
      this.totalprice = totalPrice;
    this.walletAmount = walletAmount;
    this.orderid = id;
    this.patientemail = email;
  }


  public GetAddMoneyToWallet(money) {

    if (this.totalprice < money) {
      Swal.fire('Amount Should be less than Paid Amount')
      this.money = ""
      money = ""
    }
    else {

      this.payingwallet = Number(this.walletAmount) + Number(this.money)
    }

  }


  totaladdmoney: any;
  reason: any;
  patientemail: any;



  public updatedateails() {

    var entity = {
      'PatientID': this.patientid,
      'WalletAmount': this.payingwallet
    }
    this.docservice.UpdatePatientWalletDetails(entity).subscribe(data => {
      let res = data;

      this.UpdateRefundAmountItems()
      this.Insertnotification()
      // Swal.fire('Success', 'Wallet Balance Updated Successfully');
    })
  }



  public Insertnotification() {

    var entity = {
      'Description': "Your Return Order Amount Refunded Your Wallet With Amount" + this.money,
      'ToUser': this.patientemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }


  public UpdateRefundAmountItems() {

    var entity = {
      'MedicineOrderID': this.orderid,
      'RefundAmount': this.money,
      // 'PaymentRemarks': this.reason
    }
    this.docservice.UpdateRefundAmount(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Amount Refunded Successfully');
      this.money = "";
      this.reason = ""
      this.GetPharmacyOrders();
    })
  }



  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Pharmacy'));
    this.exportAsExcelFile(hhh, "Pharmacy Reports");
  }

  public tableToJson(table) {

    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 0; j < tableRow.cells.length - 2; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
