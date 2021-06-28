import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-providerpay',
  templateUrl: './providerpay.component.html',
  styleUrls: ['./providerpay.component.css']
})
export class ProviderpayComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }


  languageid: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  public roleid: any;
  options: NgDateRangePickerOptions;
  ngOnInit() {



    this.roleid = localStorage.getItem('roleid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.languageid = localStorage.getItem('LanguageID');
    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 0);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
  }





  selectedDate(data) {

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.getprovidepay()
  }



  public typeid: any;

  public providerlist: any;


  public getprovidepay() {
    
    this.docservice.GetProvidersPay(this.startdate, this.enddate, this.typeid, this.languageid).subscribe(data => {
      this.providerlist = data;
    })
  }


  public GetType(even) {
    this.typeid = even.target.value;
    this.getprovidepay()
  }





  address: any;
  hospitalname: any;
  userid: any;
  emailid: any;
  totalamount: any;
  invoicenumber: any;
  CommissionAmount: any;
  grossamount:any;
  public GetList(invlist) {
    ;
    this.hospitalname = invlist.providername;
    this.userid = invlist.id;
    this.address = invlist.address;
    this.emailid = invlist.emailID;
    this.totalamount = Number(invlist.totalAmount)
    this.CommissionAmount = Number(invlist.commissionAmount)
    this.grossamount = Number(invlist.grossAmount)
    //  + Number(invlist.appointmentpercentageamount);
    this.invoicenumber = Math.floor(100000 + Math.random() * 900000);

  }
}
