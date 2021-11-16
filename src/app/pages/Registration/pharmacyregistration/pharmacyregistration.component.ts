import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-pharmacyregistration',
  templateUrl: './pharmacyregistration.component.html',
  styleUrls: ['./pharmacyregistration.component.css']
})
export class PharmacyregistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  public citylist: any;
  public cityid: any;
  public pharmacyname: any;
  public contactpersonname: any;
  public licenseno: any;
  public licensevalidtil: any;
  public phno: any;
  public email: any;
  public address: any; q
  public zipcode: any;
  public timings: any;
  public website: any;
  public homedelivery: any;
  public nightpharmacy: any;
  public teleordering: any;
  public prefered: any;
  public description: any;
  public pharmacyid; any;
  public attachments = [];
  public attachmentsurl = [];
  public validEmail: any;
  public showphoto = [];
  public areaid: any;
  public pincode: any;
  public arealist: any;
  public countryid: any;
  public citydd: any;
  public countrylist: any;
  public countrydd: any;
  public areadd: any;
  public tone: any;
  public ttwo: any;
  public fromampm: any;
  public toampm: any;
  public languageid: any;
  public labels: any;
  public monthlysubription: any;
  public hospitalclinicid: any;
  public hspwebsite: any;
  public hospitalfulltimebit: any;
  SelectLabel
  dropzonelable: any;
  public contractstartdate: any;
  public contractenddate: any;
  evengtime1: any;
  evengtime2: any;
  evngtimings: any;

  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.GetCountryMaster()
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }
  public getlanguage() {
    this.docservice.GetAdmin_PharmacyRegistration_LabelByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].selectt;

      }, error => {
      }
    )
  }


  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.countrylist = data;
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }

  public GetCountryID(item: any) {

    this.countryid = item.id;

    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }


  public GetCityID(item1: any) {

    this.cityid = item1.id;
    this.getareamasterbyid();
  }

  public getfromampm(even) {
    this.fromampm = even.target.value;
  }

  public gettoampm(even) {
    this.toampm = even.target.value;
  }


  public insertdetails() {


    // if (this.attachmentsurl.length == 0) {
    //   Swal.fire("Please Upload Photo")
    // }
    if (this.countryid == undefined || this.countryid.length == 0) {

      Swal.fire("Please Select Country");
    }
    else if (this.cityid == undefined || this.cityid.length == 0) {
      Swal.fire("Please Select Province")
    }
    else if (this.areaid == undefined || this.areaid.length == 0) {
      Swal.fire("Please Select City");
    }
    else {
      this.spinner.show();

      this.timings = this.tone + ' TO ' + this.toampm;

      this.evngtimings = this.tone + ' TO ' + this.toampm;

      if (this.hspwebsite == undefined) {

      }
      else {
        this.hspwebsite = 'http://' + '' + this.website
      }


      var entity = {
        'PharmacyName': this.pharmacyname,
        'MobileNumber': this.phno,
        'Email': this.email,
        'Password': '123',
        'ContactName': this.contactpersonname,
        'Address': this.address,
        'Zipcode': this.zipcode,
        'Timings': this.timings,
        'LanguageID': '1',
        'LicenseNo': this.licenseno,
        'LicenseValidTill': new Date(),
        'HomeDelivery': this.homedelivery,
        'Website': this.hspwebsite,
        'NightPharmacy': this.nightpharmacy,
        'TeleOrdering': this.teleordering,
        'Preffered': this.prefered,
        'CityID': this.cityid,
        'Description': this.description,
        'AreaID': this.areaid,
        'Pincode': this.zipcode,
        'CountryID': this.countryid,
        'MonthlySubscription': this.monthlysubription,
        'HospitalClinicID': this.hospitalclinicid,
        'Hospitalfulltimebit': this.hospitalfulltimebit,
        'ContartStartDate': this.contractstartdate,
        'ContractEndDate': this.contractenddate,
        'EveningTimings': this.evngtimings
      }
      this.docservice.InsertPharmacyRegistration(entity).subscribe(data => {
        debugger
        if (data != 0) {
          this.pharmacyid = data;
          this.insertphoto();
          this.InsertPharmacyRevenue()
          Swal.fire('Registration Completed', 'Details saved successfully', 'success');
          this.clear();
          this.spinner.hide();
          location.href = "#/Pharmacydashboard"
        }
      }, error => {
        debugger
        Swal.fire("Exception while saving. please try after some time");
        this.spinner.hide();
      })

    }
  }


  public insertphoto() {
    if (this.attachmentsurl.length == 0) {
      this.attachmentsurl[0] = 'C:\\MarocAPI\\Images\\PharmacyPhotos\\Pharmacy.jpg'
    }
    for (let i = 0; i < this.attachmentsurl.length; i++) {

      var entity = {
        'PharmacyID': this.pharmacyid,
        'PhotoURL': this.attachmentsurl[i]
      }
      this.docservice.InsertPharmacyPhotos(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }

  }

  public dummshowsignatureurl = []



  public onattachmentUpload(abcd) {
    this.dummshowsignatureurl = []
    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      this.dummshowsignatureurl.push(res);

      let a = this.dummshowsignatureurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }

  public clear() {
    this.pharmacyname = '';
    this.phno = '';
    this.email = '';
    this.contactpersonname = '';
    this.address = '';
    this.zipcode = '';
    this.timings = '';
    this.licenseno = '';
    this.licensevalidtil = '';
    this.homedelivery = '';
    this.website = '';
    this.nightpharmacy = '';
    this.teleordering = '';
    this.prefered = '';
    this.description = '';

  }

  public InsertPharmacyRevenue() {
    var entity = {
      'PharmacyID': this.pharmacyid,
      'SubscriptionAmount': this.monthlysubription,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.InsertPharmacySubscriptions_Revenue(entity).subscribe(data => {

      if (data != 0) {
      }
    })

  }



  public getareamasterbyid() {

    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {

        this.arealist = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }

  public GetAreaID(item3: any) {

    this.areaid = item3.id;
    for (let i = 0; i < this.arealist.length; i++) {

      if (this.arealist[i].id == this.areaid) {

        this.pincode = this.arealist[i].pincode
      }
    }
  }


}