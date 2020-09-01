import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";

@Component({
  selector: 'app-patient-reg',
  templateUrl: './patient-reg.component.html',
  styleUrls: ['./patient-reg.component.css']
})
export class PatientRegComponent implements OnInit {
  options: NgDateRangePickerOptions;

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
  public countrydd = {}
  public countryid: any;
  public citylist: any;
  public citydd: any;
  public cityid: any;
  public arealist: any;
  public areadd = {}
  public areaid: any;
  public pincode: any;

  public patientname: any;
  public mobileno: any;
  public email: any;
  public address: any;
  public gender: any;
  public patientid: any;
  public dateofbirth: any;
  public nationalidentitycardno: any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {
    this.languageid = localStorage.getItem("LanguageID");
    this.getlanguage();
    this.Getregisterdpatients();
    this.GetCountryMaster();
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger;
        this.labels = data;
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      },
      error => { }
    );
  }
  SelectLabel: any
  public Getregisterdpatients() {
    this.docservice.GetPatientRegistration(this.startdate, this.enddate).subscribe(
      data => {
        debugger;
        this.patientslist = data;
        this.dummlist = this.patientslist
        this.count = this.patientslist.length
      },
      error => { }
    );
  }

  public deletepatient(id) {
    debugger;
    this.docservice.DeletePatientRegistration(id).subscribe(data => {
      if (data != undefined || data != null) {
        Swal.fire("Disabled Successfully");
        this.getlanguage();
        this.Getregisterdpatients();
      }
    });
  }
  public Enablepatient(id) {
    debugger;
    this.docservice.EnablePatientRegistration(id).subscribe(data => {
      if (data != undefined || data != null) {
        Swal.fire("Enabled Successfully");
        this.getlanguage();
        this.Getregisterdpatients();
      }
    });
  }



  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.countrylist = data;
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: false
        };
      }, error => {
      }
    )
  }



  public GetCountryID(item: any) {
    debugger
    this.countryid = item.id;
    debugger
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
        debugger
        this.citylist = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: false
        };
      }, error => {
      }
    )
  }

  public GetCityID(item1: any) {
    debugger
    this.cityid = item1.id;
    this.getareamasterbyid();
  }




  public getareamasterbyid() {
    debugger
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
        debugger
        this.arealist = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: false
        };
      }, error => {
      }
    )
  }
  public GetAreaID(item3: any) {
    debugger
    this.areaid = item3.id;
    for (let i = 0; i < this.arealist.length; i++) {
      debugger
      if (this.arealist[i].id == this.areaid) {
        debugger
        this.pincode = this.arealist[i].pincode
      }
    }
  }




  public insertdetails() {
    debugger
    var entity = {
      'PatientName': this.patientname,
      'MobileNumber': this.mobileno,
      'EmailID': this.email,
      'Password': 123,
      'OTP': 123,
      'GenderID': this.gender,
      'Address': this.address,
      'CountryID': this.countryid,
      'CityID': this.cityid,
      'AreaID': this.areaid
    }
    this.docservice.InsertPatientRegistration(entity).subscribe(data => {
      this.patientid = data;
      if (data != 0) {
        this.patientwalletdetails();
        Swal.fire("Patient Registred Successfully")
        location.href = "#/Ptientregdash"
      }
      else {
        Swal.fire("Mobile Number Already Registered With US ");
        location.href = "#/Ptientregdash"
      }
    })
  }

  public patientwalletdetails() {
    var entity = {
      'PatientID': this.patientid,
      'WalletAmount': 0
    }
    this.docservice.InsertPatientWalletDetails(entity).subscribe(data => {

    })
  }

}
