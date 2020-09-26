import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-pharmacy-reg',
  templateUrl: './edit-pharmacy-reg.component.html',
  styleUrls: ['./edit-pharmacy-reg.component.css']
})
export class EditPharmacyRegComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public pharmacyid: any;
  public details: any;
  public pharmacyname: any;
  public contactpersonname: any;
  public licenseno: any;
  public licensevalidtill: any;
  public mobileno: any;
  public email: any;
  public address: any;
  public cityid: any;
  public zipcode: any;
  public website: any;
  public timings: any;
  public description: any;
  public citylist: any;
  public photoprofile: any;
  public validEmail: any;
  public photos: any;
  public id: any;
  public photoid: any;
  public pffbit: any;
  public attachments = [];
  public attachmentsurl = [];
  public showphoto = [];
  public areaid: any;
  public pincode: any;
  public arealist: any;
  public countryid: any;
  public countrylist: any;
  dropzonelable: any;


  public languageid: any;
  public labels: any;
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.id = params['id'];

    }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.GetCountryMaster();
    this.getpharmacydetailsforadmin();
    this.GetPhotos();
    this.pffbit = 0;

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

  }
  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }
  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
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
    this.getareamasterbyid()
  }

  public getlanguage() {
    this.docservice.GetAdmin_PharmacyRegistration_LabelByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  public getpharmacydetailsforadmin() {
    this.docservice.GetPhamacyDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {
        debugger;
        this.details = data[0];
        debugger;
        this.pharmacyname = this.details.pharmacyName,
          this.contactpersonname = this.details.contactName,
          this.licenseno = this.details.licenseNo,
          this.licensevalidtill = this.details.licenseValidTill,
          this.mobileno = this.details.mobileNumber,
          this.email = this.details.email,
          this.address = this.details.address,
          this.cityid = this.details.cityID,
          this.zipcode = this.details.zipcode,
          this.website = this.details.website,
          this.timings = this.details.timings,
          this.description = this.details.description,
          this.photoprofile = this.details.photoURL,
          this.areaid = this.details.areaID,
          this.pincode = this.details.pincode,
          this.countryid = this.details.countryID
        this.GetCountryMaster();
        this.getcitymaster();
        this.getareamasterbyid()
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
  public updatedetails() {
    debugger
    var entity = {
      'LanguageID': this.languageid,
      'PharmacyID': this.id,
      'MobileNumber': this.mobileno,
      'ContactName': this.contactpersonname,
      'LicenseNo': this.licenseno,
      'LicenseValidTill': this.licensevalidtill,
      'Email': this.email,
      'Address': this.address,
      'CityID': this.cityid,
      'Zipcode': this.zipcode,
      'Timings': this.timings,
      'Website': this.website,
      'Description': this.description,
      'AreaID': this.areaid,
      'Pincode': this.pincode,
      'CountryID': this.countryid
    }
    this.docservice.UpdatePharmacyProfile(entity).subscribe(res => {
      let test = res;
      this.getpharmacydetailsforadmin();
      Swal.fire(' Updated Successfully');
    })

  }
  public GetPhotos() {
    debugger
    this.docservice.GetPharmacyPhotos(this.id).subscribe(
      data => {
        debugger
        this.photos = data;
      }, error => {
      }
    )

  }
  public GetPharmacyPhotoID(id) {
    this.photoid = id;
    this.pffbit = 1
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
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
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




  public updatephotos() {
    debugger
    var entity = {
      'ID': this.photoid,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.docservice.UpdatePharmacyPhotos(entity).subscribe(res => {
      let test = res;
      this.getpharmacydetailsforadmin();
      Swal.fire(' Updated Successfully');
      this.GetPhotos();
      this.pffbit = 0;
      this.showphoto.length = 0;
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

}
