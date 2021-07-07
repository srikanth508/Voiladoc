import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-register-patients',
  templateUrl: './register-patients.component.html',
  styleUrls: ['./register-patients.component.css']
})
export class RegisterPatientsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public labels: any;
  public languageid: any;
  public patientslist: any;
  public search: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  public countrylist: any;
  public dummlist: any;
  public count: any;
  public countryid: any;
  public cityid: any;
  public citylist: any;
  public arealist: any;
  public areaid: any;
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
    var lll = this.EDate.setDate(this.EDate.getDate() + 10000);
   

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
    this.languageid = localStorage.getItem("LanguageID");
    this.getlanguage();
    this.Getregisterdpatients();
    this.GetCountryMaster()
    this.countryid = 0
    this.cityid = 0
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

      this.patientslist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.patientslist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.Getregisterdpatients()
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
      this.patientslist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.patientslist.length
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
      this.patientslist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.patientslist.length
    }
    else if (even.target.value == 0) {
      this.Getregisterdpatients()
    }
  }


  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      },
      error => { }
    );
  }

  public Getregisterdpatients() {
    this.docservice.GetPatientRegistration(this.startdate, this.enddate).subscribe(
      data => {
       
        this.patientslist = data;
        this.dummlist = this.patientslist
        this.count = this.patientslist.length
      },
      error => { }
    );
  }

  public deletepatient(id) {
   
    this.docservice.DeletePatientRegistration(id).subscribe(data => {
      if (data != undefined || data != null) {
        Swal.fire("Disabled Successfully");
        this.getlanguage();
        this.Getregisterdpatients();
      }
    });
  }
  public Enablepatient(id) {
   
    this.docservice.EnablePatientRegistration(id).subscribe(data => {
      if (data != undefined || data != null) {
        Swal.fire("Enabled Successfully");
        this.getlanguage();
        this.Getregisterdpatients();
      }
    });
  }




  selectedDate(data) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];

    this.Getregisterdpatients();
  }
}
