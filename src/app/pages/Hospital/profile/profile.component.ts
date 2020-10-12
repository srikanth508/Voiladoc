import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

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


  public attachments5 = [];
  public attachmentsurl5 = [];
  dropzonelable:any;
  ngOnInit() {

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
    this.id = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.gethospitalclinicdetailsbyid();
    this.gethospitalclinicdetailsbyid();
    this.GetMultiplePhotos();
    this.GetCountryMaster()

    this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )

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


  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.countrylist = data;
      }, error => {
      }
    )
  }

  public GetCountryID(even) {
   
    this.countryid = even.target.value;
    this.getcitymaster()
   
  }

  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
       
        this.citylist = data;
      }, error => {
      }
    )
  }

  public GetCityID(even) {
   
    this.cityid = even.target.value;
    this.getareamasterbyid()
  }


  public gethospitalclinicdetailsbyid() {
    this.docservice.GetHospital_ClinicDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {
       
        this.details = data[0];
       
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
   
    // for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd.addedFiles[0]);
      this.uploadattachments();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  public uploadattachments() {
    this.docservice.HospitalClinicPhotos(this.attachments).subscribe(res => {
     
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
     
      let b = 'http://14.192.17.225' + a;
      this.showphoto.push(b);
      this.attachments.length = 0;
     
    })
    // this.sendattachment();
  }

  public updatephoto() {
   
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
   
    this.docservice.GetHospital_ClinicPhotosByHospitalclinicID(this.id).
      subscribe(data => {
       
        this.multiplephotos = data;
        //  this.mulphoto = this.multiplephotos.photoURL
      }, error => {
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
  public GetHospitalID(hospitalid) {
   
    this.multipleid = hospitalid;
    this.mulbit = 1;
  }

  public UpdateMultiplePhotos() {
   
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









  public onattachmentUploadhospitals(abcd) {
   
    // for (let i = 0; i < abcd.length; i++) {
      this.attachments5.push(abcd.addedFiles[0]);
      this.uploadmoreimages();
    // }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  public uploadmoreimages() {
    this.docservice.HospitalClinicPhotos(this.attachments5).subscribe(res => {
     
      this.attachmentsurl5.push(res);
      // let a = this.attachmentsurl5[0].slice(2);
      //
      // let b = 'http://14.192.17.225' + a;
      // this.showphoto.push(b)
      // this.attachments5.length = 0;
     
    })
    // this.sendattachment();
  }


  public inserthspphotos() {
    for (let i = 0; i < this.attachmentsurl5.length; i++) {
      var entity = {
        'Hospital_ClinicID': this.id,
        'PhotoURL': this.attachmentsurl5[i]
      }
      this.docservice.InsertHospital_ClinicPhotos(entity).subscribe(data => {
       
        if (data != 0) {
          Swal.fire('Completed', 'Photos Added Successfully');
        }
      })
    }
  }
}
