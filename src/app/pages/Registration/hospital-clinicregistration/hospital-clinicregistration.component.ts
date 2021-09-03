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
  public today = new Date();
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
  public contractstartdate: any;
  public contractenddate: any;
  public search: any;


  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search;
      }, error => {
      }
    )
    this.getfacilititymaster();
    this.getinsurancemaster();
    this.GetCountryMaster();





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
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
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
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
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
          enableCheckAll: false,
          searchPlaceholderText: this.search,
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
          enableCheckAll: false,
          searchPlaceholderText: this.search,
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
        this.attachmentsurl[0] = 'C:\\MarocAPI\\Images\\HospitalPhotos\\Hospital.jpg';
      }
      this.spinner.show();
      this.timings = this.tone + ' ' + ' TO ' + this.ttwo + ' ';
      if (this.website == undefined) {

      }
      else {
        this.hspwebsite = 'http://' + '' + this.website
      }

      var entity = {
        'Hospital_ClinicID': this.hospitaclinic,
        'Hospital_ClinicName': this.hospitalclinicname,
        'Address': this.address,
        'PhoneNo': this.hospitalphno,
        'EmailID': this.email,
        'ZipCode': this.zipcode,
        'LanguageID': '1',
        'Timings': '06:00 TO 20:00',
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
        'Hospitalfulltimebit': 0,
        'SubscriptionTypeID': this.subscriptiontype,
        'AppointmentPercentage': this.appointmentpercentage
      }
      this.docservice.InsertHospitalClinicDetailsMaster(entity).subscribe(data => {

        if (data != 0 && data != 1) {
          this.hospitalclinicid = data;
          this.inserthspphotos();
          this.inserthspvideos();
          this.insertfacility();
          this.insertinsurance();
          this.InsertSubscriptionRevenue()
          if (this.languageid == 1) {
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
          }
          else {
            Swal.fire('Inscription terminée', 'Détails enregistrés');
          }

          this.clear();
          location.href = "#/HspClidash"
          this.spinner.hide();
        }
        else {
          if (data == 0) {
            if (this.languageid == 1) {
              Swal.fire('Email address already exists. Please verify and use the correct email address.');
              this.spinner.hide();
            }
            else {
              Swal.fire("L'adresse email existe déjà. Veuillez vérifier et utiliser la bonne adresse email.");
              this.spinner.hide();
            }
          }
          else {
            if (this.languageid == 1) {
              Swal.fire('The phone number already exists. Please verify and use the correct number');
              this.spinner.hide();
            }
            else {
              Swal.fire("Le numéro de téléphone existe déjà.Veuillez vérifier et utiliser le bon numéro.");
              this.spinner.hide();
            }
          }
        }
      }, error => {
        debugger
        if (this.languageid == 1) {
          Swal.fire("Exception While Saving. Please try after some time");
          debugger
          this.spinner.hide();
        }
        else {
          Swal.fire("Il y a une erreur d'exception. Veuillez vous assurer que toutes les informations sont exactes.");
          debugger
          this.spinner.hide();
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
  //     let b = 'https://maroc.voiladoc.org' + a;

  //     // this.showphoto.push(b)

  //    
  //   })
  //   // this.sendattachment();
  // }

  public dummshowsignatureurl = []

  public onattachmentUpload(abcd) {
    this.dummshowsignatureurl = []
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();

    if(this.languageid==1)
    {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else{
      Swal.fire('Ajoutée !');
      abcd.length = 0;
    }
   
  }


  public uploadattachments() {
    this.docservice.HospitalClinicPhotos(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      debugger
      this.dummshowsignatureurl.push(res);
      let a = this.dummshowsignatureurl[0].slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
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
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
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

    this.appointmentpercentage = 0;
    this.monthlysubription = 0;
  }


  public InsertSubscriptionRevenue() {
    var entity5 = {
      'SubscriptionTypeID': this.subscriptiontype,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'HospitalClinicID': this.hospitalclinicid,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.InsertHospitalClinic_RevenueSubscriptions(entity5).subscribe(data => {
      if (data != 0) {

      }
    })

  }
}
