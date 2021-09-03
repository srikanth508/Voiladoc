import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { ActivatedRoute } from '@angular/router';
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
  doctorid: any;
  hospitalid: any;
  knownalrregies: any;
  lastname: any;
  dropzonelable: any;
  id: any;
  showbit: any;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.languageid = localStorage.getItem("LanguageID");
    this.doctorid = localStorage.getItem('userid');

    this.activatedroute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      } else {
        this.showbit = 1;
        this.Getregisterdpatients()
      }
    })

    this.hospitalid = localStorage.getItem('hospitalid');
    this.getlanguage();
    this.Getregisterdpatients();
    this.GetCountryMaster();
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      },
      error => { }
    );
  }
  SelectLabel: any
  public Getregisterdpatients() {
    this.docservice.GetPatientRegistration('2021-01-01', '2090-01-01').subscribe(
      data => {
        debugger
        this.patientslist = data;
        var list = this.patientslist.filter(x => x.id == this.id)
        this.patientname = list[0].patientName,
          this.mobileno = list[0].mobileNumber,
          this.gender = list[0].genderID,
          this.dateofbirth = list[0].dateOfBirth,
          this.nationalidentitycardno = list[0].nationalIdentityNo,
          this.insurancename = list[0].insuranceName,
          this.showidproof = list[0].nationIDPhoto,
          this.showphoto = list[0].insurancePhoto
        this.attachmentsurl[0] = list[0].insurancePhotoUrl,
          this.idproofurl[0] = list[0].nationIDPhotoUrl,
          this.email = list[0].emailID,
          this.lastname = list[0].lastName,
          this.address = list[0].address,
          this.knownalrregies = list[0].knownAllergies
        debugger
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
          allowSearchFilter: false
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
          allowSearchFilter: false
        };
      }, error => {
      }
    )
  }

  public GetCityID(item1: any) {

    this.cityid = item1.id;
    this.getareamasterbyid();
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
          allowSearchFilter: false
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







  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Ajouté avec succès');
      abcd.length = 0;
    }

  }





  attachments = [];
  attachmentsurl = [];
  photo: any;
  showphoto: any;


  public uploadattachments() {

    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
      this.attachmentsurl = [];
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.photo = 1;
      this.showphoto = b;
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }

  public onidUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.idproof.push(abcd.addedFiles[0]);
    this.uploadid();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Ajouté avec succès');
      abcd.length = 0;
    }
  }
  idproof = []
  idproofurl = [];
  idprof: any;
  showidproof: any;
  public uploadid() {
    this.docservice.pharmacyphoto(this.idproof).subscribe(res => {
      this.idproofurl = [];
      this.idproofurl.push(res);
      let a = this.idproofurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.idprof = 1;
      this.showidproof = b;
      this.idproof.length = 0;

    })
    // this.sendattachment();
  }


  insurancename: any;

  public insertdetails() {

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
      'AreaID': this.areaid,
      'NationalIdentityNo': this.nationalidentitycardno,
      'DoctorID': this.doctorid,
      'HospitalID': this.hospitalid,
      'LastName': this.lastname,
      'DateOfBirth': this.dateofbirth,
      'KnownAllergies': this.knownalrregies,
      'InsurancePhotoUrl': this.attachmentsurl[0],
      'NationIDPhotoUrl': this.idproofurl[0],
      'InsuranceName': this.insurancename
    }
    this.docservice.InsertPatientRegistration(entity).subscribe(data => {
      this.patientid = data;
      if (data != 0) {
        this.patientwalletdetails();
        this.Insertfamilytredetail();

        if (this.languageid == '1') {
          Swal.fire("Patient Registred Successfully")
          location.href = "#/Ptientregdash"
        }
        else if (this.languageid == '6') {
          Swal.fire('Patient enregistré avec succès')
          location.href = "#/Ptientregdash"
        }
      }
      else {
        if (this.languageid == 1) {
          Swal.fire("Phone number has already been used. Please use another phone number. ");
        }
        else if (this.languageid == 6) {
          Swal.fire("Le numéro de téléphone a déjà été utilisé.Veuillez nous donner un autre numéro de téléphone. ");
        }

        // location.href = "#/Ptientregdash"
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




  public Insertfamilytredetail() {

    var entity = {
      'PatientRelationTypeID': 1,
      'PatientID': this.patientid,
      'PR_FirstName': this.patientname,
      'PR_LastName': this.lastname,
      'PR_EmailID': this.email,
      'PR_MobileNumber': this.mobileno,
      'PR_GenderID': this.getareamasterbyid,
      'PR_BloodGroupID': 0,
      'PR_Height': 0,
      'PR_Weight': 0,
      'PR_KnownAllergies': this.knownalrregies,
      'PR_ProfilePic': 0,
      'DateOfBirth': this.dateofbirth,
      'NewDesc': 0,
      'PR_BMI': 0
    }
    this.docservice.InsertPatientRelation_FamilyTree_Web(entity).subscribe(data => {

    })

  }





  public updatedetails() {
    var entity = {
      'ID': this.id,
      'PatientName': this.patientname,
      'MobileNumber': this.mobileno,
      'EmailID': this.email,
      'Password': 123,
      'OTP': 123,
      'GenderID': this.gender,
      'Address': this.address,
      'CountryID': this.countryid,
      'CityID': this.cityid,
      'AreaID': this.areaid,
      'NationalIdentityNo': this.nationalidentitycardno,
      'DoctorID': this.doctorid,
      'HospitalID': this.hospitalid,
      'LastName': this.lastname,
      'DateOfBirth': this.dateofbirth,
      'KnownAllergies': this.knownalrregies,
      'InsurancePhotoUrl': this.attachmentsurl[0],
      'NationIDPhotoUrl': this.idproofurl[0],
      'InsuranceName': this.insurancename
    }
    this.docservice.UpdatePatientRegistrationForWeb(entity).subscribe(data => {
      this.patientid = data;
      Swal.fire("updated Successfully");
      location.href = "#/Ptientregdash"
    })
  }



}
