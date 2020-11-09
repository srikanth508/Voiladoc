import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-hospital-clinicregistration',
  templateUrl: './hospital-clinicregistration.component.html',
  styleUrls: ['./hospital-clinicregistration.component.css']
})
export class HospitalClinicregistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public citylist: any;
  public cityid: any;
  public hospitaclinic: any;
  public hospitalclinicname: any;
  public hospitalphno: any;
  public contactpersonname: any;
  public contactpersonphno: any;
  public email: any;
  public address: any;
  public zipcode: any;
  public timings: any;
  public website: any;
  public yearestablished: any;
  public noofbeds: any;
  public emergency: any;
  public prefered: any;
  public description: any;
  public hospitalclinicid: any;
  public facilitylist: any;
  public insurancelist: any;
  public validEmail: any;

  public insuranceid = [];
  public facilitydd = {};
  public insurancedd = {};
  public facilityid = [];
  public attachments = [];
  public attachmentsurl = [];
  public videos = [];
  public videosurl = [];
  public showphoto = [];
  public arealist: any;
  public areaid: any;
  public pincode: any;
  public countrylist: any;
  public countrydd: any;
  public countryid: any;
  public citydd = {}
  public areadd = {}
  public tone: any;
  public ttwo: any;
  public fromampm: any;
  public toampm: any;
  public languageid: any;
  public labels: any;
  public monthlysubription: any;
  public hspwebsite: any;
  public hospitalfulltimebit: any;
  public dropzonelable: any;
  public subscriptiontype: any;
  public appointmentpercentage: any;


  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getfacilititymaster();
    this.getinsurancemaster();
    this.GetCountryMaster();

    this.hspwebsite =

      this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(
        data => {

          this.labels = data;
          this.SelectLabel = this.labels[0].select;
        }, error => {
        }
      )

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

  }


  SelectLabel
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

  onItemDeSelect(item: any) {

    var index = this.countryid.findIndex(x => x.id == item.id)
    this.countryid.splice(index, 1);
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



  public getfacilititymaster() {

    this.docservice.GetFacilitiesMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.facilitylist = data;

        this.facilitydd = {
          singleSelection: false,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false
        };

      }, error => {
      }
    )
  }
  public getinsurancemaster() {

    this.docservice.GetInsuranceMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.insurancelist = data;
        this.insurancedd = {
          singleSelection: false,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false
        };

      }, error => {
      }
    )
  }
  public GetFacilityID(item: any) {

    this.facilityid.push(item);

  }
  public GetInuranceID(item: any) {

    this.insuranceid.push(item);

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
      if (this.attachmentsurl.length == 0) {
        this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\HospitalPhotos\\Hospital.jpg';
      }
      this.spinner.show();
      this.timings = this.tone + ' ' + ' TO ' + this.ttwo + ' ';
      this.hspwebsite = 'https://' + '' + this.website
      var entity = {
        'Hospital_ClinicID': this.hospitaclinic,
        'Hospital_ClinicName': this.hospitalclinicname,
        'Address': this.address,
        'PhoneNo': this.hospitalphno,
        'EmailID': this.email,
        'ZipCode': this.zipcode,
        'LanguageID': '1',
        'Timings': this.timings,
        'Description': this.description,
        'AvailabilityID': '1',
        'ContactPersonName': this.contactpersonname,
        'ContactPersonPhNo': this.contactpersonphno,
        'Website': this.hspwebsite,
        'YearEstablished': this.yearestablished,
        'NoOfBeds': this.noofbeds,
        'Emergency': this.emergency,
        'CityID': this.cityid,
        'Preffered': this.prefered,
        'HospitalLogoUrl': this.attachmentsurl[0],
        'AreaID': this.areaid,
        'Pincode': this.pincode,
        'CountryID': this.countryid,
        'MonthlySubscription': this.monthlysubription,
        'Hospitalfulltimebit': this.hospitalfulltimebit
      }
      this.docservice.InsertHospitalClinicDetailsMaster(entity).subscribe(data => {

        if (data != 0) {
          this.hospitalclinicid = data;
          this.inserthspphotos();
          this.inserthspvideos();
          this.insertfacility();
          this.insertinsurance();
          this.InsertSubscriptionRevenue()
          Swal.fire('Registration Completed', 'Details saved successfully', 'success');
          this.clear();
          location.href = "#/HspClidash"
          this.spinner.hide();
        }
        else {
          Swal.fire('Hospital Clinic Name', 'Already Exists');
          this.clear();
          this.spinner.hide();
          location.href = "#/HspClidash"
        }
      })
    }
  }


  public inserthspphotos() {
    for (let i = 1; i < this.attachmentsurl.length; i++) {
      var entity = {
        'Hospital_ClinicID': this.hospitalclinicid,
        'PhotoURL': this.attachmentsurl[i]
      }
      this.docservice.InsertHospital_ClinicPhotos(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }

  public inserthspvideos() {

    for (let i = 0; i < this.videosurl.length; i++) {
      var entity = {
        'Hospital_ClinicID': this.hospitalclinicid,
        'VideoURL': this.videosurl[i]
      }
      this.docservice.InsertHospital_ClinicVideos(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }

  public insertfacility() {
    for (let i = 0; i < this.facilityid.length; i++) {
      var entity1 = {
        'Hospital_ClinicID': this.hospitalclinicid,
        'FacilityID': this.facilityid[i].id
      }
      this.docservice.InsertHospital_ClinicFacilities(entity1).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }

  public insertinsurance() {
    for (let i = 0; i < this.insuranceid.length; i++) {
      var entity2 = {
        'Hospital_ClinicID': this.hospitalclinicid,
        'InsuranceID': this.insuranceid[i].id
      }
      this.docservice.InsertHospital_ClinicInsurance(entity2).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }

  // public onvideoupload(abcd) {
  //  
  //   for (let i = 0; i < abcd.length; i++) {
  //     this.videos.push(abcd[i]);
  //     this.uploadattachments();
  //   }

  //   Swal.fire('Added Successfully');
  //   abcd.length = 0;
  // }

  // public uploadvideos() {
  //   this.docservice.HospitalClinicVideos(this.videos).subscribe(res => {
  //    
  //     this.videosurl.push(res);
  //     let a = this.videosurl[0].slice(2);
  //    
  //     let b = 'http://14.192.17.225' + a;

  //     // this.showphoto.push(b)

  //    
  //   })
  //   // this.sendattachment();
  // }

  public dummshowsignatureurl=[]

  public onattachmentUpload(abcd) {
    this.dummshowsignatureurl = []
      this.attachments.push(abcd.addedFiles[0]);
      this.uploadattachments();
    
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }


  public uploadattachments() {
    this.docservice.HospitalClinicPhotos(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      this.dummshowsignatureurl.push(res);
      let a = this.dummshowsignatureurl[0].slice(2);
      let b = 'http://14.192.17.225' + a;
      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }
  public clear() {
    this.hospitaclinic = '';
    this.hospitalclinicname = '';
    this.address = '';
    this.hospitalphno = '';
    this.email = '';
    this.zipcode = '';
    this.timings = '';
    this.description = '';
    this.contactpersonname = '';
    this.contactpersonphno = '';
    this.website = '';
    this.yearestablished = '';
    this.noofbeds = '';
    this.emergency = '';
    this.prefered = '';

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


  public Getsubscriptontype() {
    debugger
    this.appointmentpercentage =0;
    this.monthlysubription = 0;
  }




  public InsertSubscriptionRevenue() {
    var entity5 = {
      'SubscriptionTypeID': this.subscriptiontype,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'HospitalClinicID': this.hospitalclinicid
    }
    this.docservice.InsertHospitalClinic_RevenueSubscriptions(entity5).subscribe(data => {
      if (data != 0) {

      }
    })

  }
}
