import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

@Component({
  selector: 'app-pharmacy-orders',
  templateUrl: './pharmacy-orders.component.html',
  styleUrls: ['./pharmacy-orders.component.css']
})
export class PharmacyOrdersComponent implements OnInit {
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

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.deliverycompanyid = localStorage.getItem('deliveryid');

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
        debugger
        this.partnerlist = data;
      }, error => {
      }
    )


  }


  public GetPharmacyOrders() {
    debugger
    this.docservice.GetPatient_TextMedicineDetailsForDeliverCompany(this.startdate, this.enddate, this.languageid).subscribe(
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

  selectedDate(data) {
    debugger

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
    debugger
    var entity = {
      'MedicineOrderID': this.orderid,
      'DeliveryCompanyID': this.deliverycompanyid,
      'PartnerID': pid,
      'Status': 'Assigned'
    }
    this.docservice.InsertDeliveryPartnerAssignedOrders(entity).subscribe(res => {
      let test = res;
      Swal.fire(' Assigned', 'Order Assigned to delivery partner.');
      this.GetPharmacyOrders()

    })

  }

}
