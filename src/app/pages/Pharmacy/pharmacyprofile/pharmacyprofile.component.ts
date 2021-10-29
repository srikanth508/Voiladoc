import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pharmacyprofile',
  templateUrl: './pharmacyprofile.component.html',
  styleUrls: ['./pharmacyprofile.component.css']
})
export class PharmacyprofileComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
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
  public tone: any;
  public ttwo: any;
  public countryid: any;
  public countrylist: any;

  public languageid: any;
  public labels: any;
  dropzonelable: any;
  ngOnInit() {

    this.id = localStorage.getItem('pharmacyid');

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

        this.citylist = data;
      }, error => {
      }
    )
  }
  public getlanguage() {
    this.docservice.GetAdmin_PharmacyRegistration_LabelByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public GetcityID(even) {

    this.cityid = even.target.value;
    this.getareamasterbyid()
  }
  homedelivery: any;
  nightpharmacy: any;

  public getpharmacydetailsforadmin() {
    this.docservice.GetPhamacyDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {

        this.details = data[0];

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
          this.countryid = this.details.countryID,
          this.eveningtimings = this.details.eveningTimings,
          this.homedelivery = this.details.homeDelivery,
          this.nightpharmacy = this.details.nightPharmacy,
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

        this.countrylist = data;
      }, error => {
      }
    )
  }
  eveningtimings: any;


  public GetCountryID(even) {

    this.countryid = even.target.value;
    this.getcitymaster()
  }
  public updatedetails() {

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
      'CountryID': this.countryid,
      'NightPharmacy': this.nightpharmacy,
      'HomeDelivery': this.homedelivery,
      'EveningTimings': this.eveningtimings
    }
    this.docservice.UpdatePharmacyProfile(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        this.getpharmacydetailsforadmin();
        Swal.fire(' Updated Successfully');
      }
      else {
        this.getpharmacydetailsforadmin();
        Swal.fire('Enregistré');
      }

    })

  }
  public GetPhotos() {

    this.docservice.GetPharmacyPhotos(this.id).subscribe(
      data => {

        this.photos = data;
      }, error => {
      }
    )

  }
  public GetPharmacyPhotoID(id) {
    this.photoid = id;
    this.pffbit = 1
  }
  public dummattachmenturl = [];

  public onattachmentUpload(abcd) {
    this.dummattachmenturl = []
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



  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      this.dummattachmenturl.push(res);
      let a = this.dummattachmenturl[0].slice(2);
      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }




  public updatephotos() {

    var entity = {
      'ID': this.photoid,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.docservice.UpdatePharmacyPhotos(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        this.getpharmacydetailsforadmin();
        if (this.languageid == 1) {
          Swal.fire(' Updated Successfully');
        }
        else {
          Swal.fire('Supprimé avec succès');
        }
        this.GetPhotos();
        this.pffbit = 0;
        this.showphoto.length = 0;
      }
      else {
        this.getpharmacydetailsforadmin();
        Swal.fire('Enregistré');
        this.GetPhotos();
        this.pffbit = 0;
        this.showphoto.length = 0;
      }

    })

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

    this.areaid = even.target.value;
    for (let i = 0; i < this.arealist.length; i++) {

      if (this.arealist[i].id == this.areaid) {

        this.pincode = this.arealist[i].pincode
      }
    }
  }
}
