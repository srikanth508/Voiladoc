import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-hospital-clinic',
  templateUrl: './edit-hospital-clinic.component.html',
  styleUrls: ['./edit-hospital-clinic.component.css']
})
export class EditHospitalClinicComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public hospitalid: any;
  public details: any;
  public hospitalname: any;
  public phno: any;
  public contactpersonname: any;
  public contactpersonphno: any;
  public address: any;
  public cityid: any;
  public zipcode: any;
  public timings: any;
  public website: any;
  public yearestablished: any;
  public noofbeds: any;
  public description: any;
  public citylist: any;
  public emailid: any;
  public photourl: any;
  public validEmail: any;
  public showdrop: any;
  public id: any;
  public showphoto: any;
  public multiplephotos: any;
  public mulphoto: any;
  public multipleid: any;

  public attachments = [];
  public attachmentsurl = [];
  public arealist: any;
  public pincode: any;
  public areaid: any;
  public mulbit: any;
  public countrylist: any;
  public countryid: any;

  public languageid: any;
  public labels: any;
  public dropzonelable: any;
  ngOnInit() {
    // this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.id = params['id'];
      this.showdrop = 0;
      this.mulbit = 0;
    }
    )
    this.gethospitalclinicdetailsbyid();
    this.GetMultiplePhotos();
    this.GetCountryMaster()



    this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
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
  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }



  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.countrylist = data;
      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    debugger
    this.countryid = even.target.value;
    this.getcitymaster()
    debugger
  }

  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
        debugger
        this.citylist = data;
      }, error => {
      }
    )
  }

  public GetCityID(even) {
    debugger
    this.cityid = even.target.value;
    this.getareamasterbyid()
  }



  public gethospitalclinicdetailsbyid() {
    this.docservice.GetHospital_ClinicDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {
        debugger;
        this.details = data[0];
        debugger;
        this.hospitalname = this.details.hospital_ClinicName,
          this.phno = this.details.phoneNo,
          this.contactpersonname = this.details.contactPersonName,
          this.contactpersonphno = this.details.contactPersonPhNo,
          this.address = this.details.address,
          this.emailid = this.details.emailID,
          this.cityid = this.details.cityID,
          this.zipcode = this.details.zipCode,
          this.timings = this.details.timings
        this.website = this.details.website,
          this.yearestablished = this.details.yearEstablished,
          this.noofbeds = this.details.noOfBeds,
          this.description = this.details.description,
          this.photourl = this.details.photoURL,
          this.areaid = this.details.areaID,
          this.pincode = this.details.pincode,
          this.countryid = this.details.countryID,
          this.areaid = this.details.areaID,
          this.pincode = this.details.pincode
        this.GetCountryMaster();
        this.getcitymaster()
        this.getareamasterbyid();

      }, error => {
      }
    )
  }

  public updatedetails() {
    debugger
    var entity = {
      'LanguageID': this.languageid,
      'Hospital_ClinicID': this.id,
      'PhoneNo': this.phno,
      'ContactPersonName': this.contactpersonname,
      'ContactPersonPhNo': this.contactpersonphno,
      'EmailID': this.emailid,
      'Address': this.address,
      'CityID': this.cityid,
      'ZipCode': this.zipcode,
      'Timings': this.timings,
      'Website': this.website,
      'YearEstablished': this.yearestablished,
      'NoOfBeds': this.noofbeds,
      'Description': this.description,
      'AreaID': this.areaid,
      'Pincode': this.pincode,
      'CountryID': this.countryid
    }
    this.docservice.UpdateHospitalClinicProfile(entity).subscribe(res => {
      let test = res;
      this.gethospitalclinicdetailsbyid();
      this.GetMultiplePhotos()
      Swal.fire(' Updated Successfully');
    })

  }
  public GetID() {
    this.showdrop = 1;
  }



  public onattachmentUpload(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  public uploadattachments() {
    this.docservice.HospitalClinicPhotos(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      // let a = this.attachmentsurl[0].slice(2);
      // debugger
      // let b = 'http://14.192.17.225' + a;
      // this.showphoto.push(b);

      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  } s
  public updatephoto() {
    debugger
    var entity = {
      'ID': this.id,
      'HospitalLogoUrl': this.attachmentsurl[0]
    }
    this.docservice.UpdateHospital_ClinicDetailsMasterPhoto(entity).subscribe(res => {
      let test = res;
      Swal.fire(' Updated Successfully');
      this.gethospitalclinicdetailsbyid();
      this.showdrop = 0;
    })
  }
  public GetMultiplePhotos() {
    debugger
    this.docservice.GetHospital_ClinicPhotosByHospitalclinicID(this.id).
      subscribe(data => {
        debugger
        this.multiplephotos = data;
        //  this.mulphoto = this.multiplephotos.photoURL
      }, error => {
      })
  }

  public getareamasterbyid() {
    debugger
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
        debugger
        this.arealist = data;
      }, error => {
      }
    )
  }
  public GetAreaID(even) {
    debugger
    this.areaid = even.target.value;
    for (let i = 0; i < this.arealist.length; i++) {
      debugger
      if (this.arealist[i].id == this.areaid) {
        debugger
        this.pincode = this.arealist[i].pincode
      }
    }
  }
  public GetHospitalID(hospitalid) {
    debugger
    this.multipleid = hospitalid;
    this.mulbit = 1;
  }


  public UpdateMultiplePhotos() {
    debugger
    var entity = {
      'ID': this.multipleid,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.docservice.UpdateHospital_ClinicPhotos(entity).subscribe(res => {
      let test = res;
      Swal.fire('Updated Successfully');

      this.GetMultiplePhotos();
      this.mulbit = 0;
    })
  }
}


