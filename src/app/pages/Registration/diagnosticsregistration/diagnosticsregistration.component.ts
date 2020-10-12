import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-diagnosticsregistration',
  templateUrl: './diagnosticsregistration.component.html',
  styleUrls: ['./diagnosticsregistration.component.css']
})

export class DiagnosticsregistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public citylist: any;
  public cityid: any;
  public diagnosticcentername: any;
  public diagnosticphno: any;
  public contactpersonname: any;
  public contactpersonphno: any;
  public licenseno: any;
  public licensevalidtill: any;
  public email: any;
  public address: any;
  public zipcode: any;
  public website: any;
  public timings: any;
  public samplepickup: any;
  public prefered: any;
  public description: any;
  public awards: any;
  public insurancelist: any;
  public insuranceid = [];
  public insurancedd = {};
  public diagnosticid: any;
  public attachments = [];
  public attachmentsurl = [];
  public validEmail: any;
  public showphoto = [];

  public arealist: any;
  public areaid: any;
  public pincode: any;
  public countrylist: any;
  public countrydd = {}
  public countryid: any;
  public citydd = {}
  public areadd = {};
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
  dropzonelable:any;
  ngOnInit() {

    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getinsurancemaster();
    this.GetCountryMaster();

    this.getlanguage()
    if(this.languageid==1)
    {
      this.dropzonelable="Upload file"
    }
    else if(this.languageid==6)
    {
      this.dropzonelable="Télécharger des fichiers"
    }
  }
  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }


  public getlanguage() {
    this.docservice.GetAdmin_DiagnosticRegistration_LabelBYLanguageID(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )
  }
  SelectLabel
  public getinsurancemaster() {
   
    this.docservice.GetInsuranceMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.insurancelist = data;

        this.insurancedd = {
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
  onItemDeSelect3(item1: any) {
   
    this.cityid = this.cityid.slice(item1.id)
    this.getareamasterbyid()
  }


  public GetInuranceID(item: any) {
   
    this.insuranceid.push(item);
   
  }


  public getfromampm(even) {
    this.fromampm = even.target.value;
  }

  public gettoampm(even) {
    this.toampm = even.target.value;
  }

  public insertdetails() {

    // if (this.attachmentsurl.length == 0) {
    //  
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
      this.timings = this.tone + ' ' + ' TO ' + this.ttwo + ' ';
      this.hspwebsite = 'https://' + '' + this.website
      var entity = {
        'DiagnosticCenterName': this.diagnosticcentername,
        'Description': this.description,
        'Address': this.address,
        'PhoneNo': this.diagnosticphno,
        'EmailID': this.email,
        'Timings': this.timings,
        'LanguageID': '1',
        'Zipcode': this.zipcode,
        'ContactPerson': this.contactpersonname,
        'ContactPersonPhNo': this.contactpersonphno,
        'LicenseNo': this.licenseno,
        'LicenseValidTill': this.licensevalidtill,
        'HomeSample': this.samplepickup,
        'Preffered': this.prefered,
        'Website': this.hspwebsite,
        'Awards': this.awards,
        'CityID': this.cityid,
        'AreaID': this.areaid,
        'Pincode': this.pincode,
        'CountryID': this.countryid,
        'MonthlySubscription': this.monthlysubription,
        'HospitalClinicID': this.hospitalclinicid,
        'Hospitalfulltimebit': this.hospitalfulltimebit
      }
      this.docservice.InsertDiagnosticCenterRegistration(entity).subscribe(data => {
       
        if (data != 0) {
          this.diagnosticid = data;
          this.inserthspphotos();
          this.insertinsurance();
          Swal.fire('Registration Completed', 'Details saved successfully', 'success');
          this.spinner.hide();
          this.clear();

          location.href = "#/DiagnesticDashboard"

        }
        // else {
        //   Swal.fire('Diagnostic Center Name', 'Already Exists');
        //   this.clear();
        //   this.spinner.hide();
        //   location.href="#/DiagnesticDashboard"
        // }
      })

    }
  }


  public insertinsurance() {
    for (let i = 0; i < this.insuranceid.length; i++) {
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'InsuranceID': this.insuranceid[i].id
      }
      this.docservice.InsertDiagnosticCenterInsurances(entity).subscribe(data => {
       
        if (data != 0) {
        }
      })
    }
  }
  public inserthspphotos() {
    if (this.attachmentsurl.length == 0) {
      this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DiagnosticCenterPhotos\\Diagnostics.jpg'
    }
   
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'PhotoURL': this.attachmentsurl[i]
      }
      this.docservice.InsertInsertDiagnosticCenterPhotos(entity).subscribe(data => {
       
        if (data != 0) {
        }
      })
    }
  }

  public onattachmentUpload(abcd) {
   
    // for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd.addedFiles[0]);
      this.uploadattachments();
    // }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.DiagnosticPhotos(this.attachments).subscribe(res => {
     
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
     
      let b = 'http://14.192.17.225' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;
     
    })
    // this.sendattachment();
  }
  public clear() {
    this.diagnosticcentername = "";
    this.diagnosticphno = "";
    this.address = "";
    this.email = "";
    this.description = "";
    this.timings = "";
    this.zipcode = "";
    this.contactpersonname = "";
    this.contactpersonphno = "";
    this.licenseno = "";
    this.licensevalidtill = "";
    this.samplepickup = "";
    this.prefered = "";
    this.website = "";
    this.awards = "";
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
