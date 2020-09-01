import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnosticid: any;
  public details: any;
  public diagnosticcentername: any;
  public phno: any;
  public contactperson: any;
  public licenseno: any;
  public licensevalidtill: any;
  public description: any;
  public cityid: any;
  public emailid: any;
  public address: any;
  public zipcode: any;
  public website: any;
  public timings: any;
  public citylist: any;
  public photourl: any;
  public contactpersonphno: any;
  public validEmail: any;
  public id: any;
  public photoslist: any;
  public diaphotoid: any;
  public diabit: any;
  public attachments = [];
  public attachmentsurl = [];
  public showphoto = [];
  public arealist: any;
  public areaid: any;
  public pincode: any;
  public countrylist: any;
  public countryid: any;
  public languageid:any;
  public labels:any;


  ngOnInit() {
    this.id = localStorage.getItem('diagnosticid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getdiagnosticdetailsforadmin();
    this.GetDiagnosticPhotos();
    this.GetDiagnosticPhotos();
    this.GetCountryMaster()
    this.diabit = 0;
    this.getlanguage()
  }

  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }
  public getdiagnosticdetailsforadmin() {
    this.docservice.GetDiagnosticDetailsForAdminByLanguageID(this.id,this.languageid).subscribe(
      data => {
        debugger;
        this.details = data[0];
        debugger;
        this.diagnosticcentername = this.details.diagnosticCenterName,
          this.phno = this.details.phoneNo,
          this.contactperson = this.details.contactPerson,
          this.contactpersonphno = this.details.contactPersonPhNo,
          this.licenseno = this.details.licenseNo,
          this.licensevalidtill = this.details.licenseValidTill,
          this.emailid = this.details.emailID,
          this.address = this.details.address,
          this.cityid = this.details.cityID,
          this.zipcode = this.details.zipcode,
          this.website = this.details.website,
          this.timings = this.details.timings,
          this.description = this.details.description,
          this.photourl = this.details.photoURL
        this.areaid = this.details.areaID,
          this.countryid = this.details.countryID,
          this.pincode = this.details.pincode
          this.GetCountryMaster();
          this.getcitymaster();
          this.getareamasterbyid();
     
      }, error => {
      }
    )
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_DiagnosticRegistration_LabelBYLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )  
  }
  


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
  }

  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid,this.languageid).subscribe(
      data => {
        debugger
        this.citylist = data;
      }, error => {
      }
    )
  }
  public GetcityID(even) {
    debugger
    this.cityid = even.target.value;
    this.getareamasterbyid();
  }
  public updatedetails() {
    debugger
    var entity = {
      'LanguageID':this.languageid,
      'DiagnosticCenterID': this.id,
      'PhoneNo': this.phno,
      'ContactPerson': this.contactperson,
      'ContactPersonPhNo': this.contactpersonphno,
      'LicenseNo': this.licenseno,
      'LicenseValidTill': this.licensevalidtill,
      'EmailID': this.emailid,
      'Address': this.address,
      'CityID': this.cityid,
      'Zipcode': this.zipcode,
      'Website': this.website,
      'Timings': this.timings,
      'Description': this.description,
      'AreaID': this.areaid,
      'Pincode': this.pincode,
      'CountryID': this.countryid
    }
    this.docservice.UpdateDiagnosticCenterProfile(entity).subscribe(res => {
      let test = res;
      this.getdiagnosticdetailsforadmin();
      Swal.fire(' Updated Successfully');
    })

  }

  public GetDiagnosticPhotos() {
    debugger
    this.docservice.GetDiagnosticCenterPhotosByID(this.id).subscribe(
      data => {
        debugger
        this.photoslist = data;
      }, error => {
      }
    )
  }
  public GetDiagphotoId(diaid) {
    debugger
    this.diaphotoid = diaid;
    this.diabit = 1;
  }
  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.DiagnosticPhotos(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  }
  public UpdateDiaPhotos() {
    debugger
    var entity = {
      'ID': this.diaphotoid,
      'PhotoURL': this.attachmentsurl[0],
    }
    this.docservice.UpdateDiagnosticCenterPhotos(entity).subscribe(res => {
      let test = res;
      this.GetDiagnosticPhotos();
      Swal.fire(' Updated Successfully');
      this.diabit = 0;
      this.showphoto.length = 0
    })

  }

  public getareamasterbyid() {
    debugger
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid,this.languageid).subscribe(
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
}
