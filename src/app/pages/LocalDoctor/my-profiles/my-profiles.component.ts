import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-my-profiles',
  templateUrl: './my-profiles.component.html',
  styleUrls: ['./my-profiles.component.css']
})
export class MyProfilesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }


  public languageid: any;
  public labels: any;
  public countrylist: any;
  public countrydd = {}
  public countryid: any;
  public citylist: any;
  public citydd = {};
  public arealist: any;
  public areaid: any;
  public pincode: any;
  public areadd = {};
  public cityid: any;
  public attachments1 = [];
  public attachmentsurl1 = [];
  public showdocphoto = [];
  public doctorname: any;
  public phoneno: any;
  public email: any;
  public address: any;
  public description: any;
  public gender: any;
  public username: any;
  public password: any;
  public docid: any;
  public details: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.docid = localStorage.getItem('localdocid')
    this.getlanguage();
    this.GetCountryMaster();
    this.getdocdetails()
  }

  public getdocdetails() {
    this.docservice.GetLocalDoctorRegistrationByDoctorID(this.docid, this.languageid).subscribe(
      data => {
       
        this.details = data[0];
        this.doctorname = this.details.doctorName,
          this.phoneno = this.details.mobileNumber,
          this.email = this.details.emailID,
          this.address = this.details.address,
          this.description = this.details.description,
          this.gender = this.details.genderID,
          this.description = this.details.description,
          this.countryid = this.details.countryID,
          this.cityid = this.details.cityID,
          this.areaid = this.details.areaID,
          this.pincode = this.details.pincode,
          this.username = this.details.userName,
          this.password = this.details.password
        this.getcitymaster();
        this.getareamasterbyid()
      }, error => {
      }
    )
  }



  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
       
        this.labels = data;
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

  public GetCountryID(even) {
   
    this.countryid = even.target.value
   
    this.getcitymaster();
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
    this.getareamasterbyid();
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



  public updatedeilas() {
    var entity = {
      'ID': this.docid,
      'DoctorName': this.doctorname,
      'MobileNumber': this.phoneno,
      'EmailID': this.email,
      'Address': this.address,
      'Description': this.description,
      'GenderID': Number(this.gender),
      'CityID': this.cityid,
      'AreaID': this.areaid,
      'Pincode': this.pincode,
      'CountryID': this.countryid,
      'UserName': this.username,
      'Password': this.password
    }
    this.docservice.UpdateLocalDoctorRegistration(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Data Updated Successfully');
      this.getdocdetails();
    })

  }
}
