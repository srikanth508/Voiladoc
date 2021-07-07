import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-patient-wallet',
  templateUrl: './patient-wallet.component.html',
  styleUrls: ['./patient-wallet.component.css']
})
export class PatientWalletComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public walletlist: any;
  public countrylist: any;
  public countryid: any;
  public dummlist: any;
  public citylist: any;
  public cityid: any;
  public arealist: any;
  public areaid: any;
  public patientid: any;
  public walletamount: any;
  public search: any;
  public totaladdmoney: any;
  public serverdateandtime: any;
  public servertime: any;
  public serverdate: any;
  public user: any;
  public reason: any;
  public entermoney: any;
  public money: any;
  public count: any;
  public labels: any;


  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  ngOnInit() {
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


    var kkk = this.SDate.setDate(this.SDate.getDate() - 10000);
    var lll = this.EDate.setDate(this.EDate.getDate() +  10000);
   

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
    this.languageid = localStorage.getItem('LanguageID');
    this.user = localStorage.getItem('user');
    this.GetWalletDetails();
    this.GetCountryMaster();
    this.countryid = 0
    this.cityid = 0
    this.getserverdateandtime()
    this.getlanguage()
  }


  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      },
      error => { }
    );
  }
  public GetWalletDetails() {
    this.docservice.GetPatientWalletDetailsBySdateAndDate(this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        this.walletlist = data;
        this.dummlist = this.walletlist
        this.count = this.walletlist.length
      }, error => {
      }
    )
  }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.countrylist = data;

      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {
     
      this.countryid = even.target.value;

      this.walletlist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.walletlist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.GetWalletDetails()
    }
  }
  public getcity() {
   
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
       
        this.citylist = data;
      }, error => {
      }
    )
  }


  public GetCityID(even) {
    if (even.target.value != 0) {
     
      this.cityid = even.target.value;
      this.getareamasterbyid()
      this.walletlist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.walletlist.length
    }
    else if (even.target.value == 0) {
      this.getcity()
    }
  }



  public getareamasterbyid() {
   
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
       
        this.arealist = data;

      }, error => {
      }
    )
  }


  public GetAreaID(even) {
    if (even.target.value != 0) {
     
      this.areaid = even.target.value;
      this.walletlist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.walletlist.length
    }
    else if (even.target.value == 0) {
      this.GetWalletDetails()
    }
  }

  public GetPatientIDAndMoney(patientID, walletAmount) {
   
    this.patientid = patientID;
    this.walletamount = walletAmount
  }

  public GetAddMoneyToWallet(money) {
   
    this.totaladdmoney = Number(this.walletamount) + Number(money)

    this.entermoney = money;
  }


  public updatedateails() {
    var entity = {
      'PatientID': this.patientid,
      'WalletAmount': this.totaladdmoney
    }
    this.docservice.UpdatePatientWalletDetails(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Wallet Balance Updated Successfully');
      this.insertdetails();
      this.GetWalletDetails();
      this.entermoney = "";
      this.reason = ""
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


  public insertdetails() {
    var entity = {
      'PatientID': this.patientid,
      'Date': this.serverdate,
      'Time': this.servertime,
      'User': this.user,
      'Reason': this.reason,
      'Amount': this.entermoney
    }
    this.docservice.InsertPatient_WalletLog(entity).subscribe(data => {
      if (data != 0) {

      }
    })
  }


  selectedDate(data) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetWalletDetails();
  }
}