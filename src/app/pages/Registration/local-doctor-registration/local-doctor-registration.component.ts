import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-local-doctor-registration',
  templateUrl: './local-doctor-registration.component.html',
  styleUrls: ['./local-doctor-registration.component.css']
})
export class LocalDoctorRegistrationComponent implements OnInit {

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
  SelectLabel:any
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetCountryMaster();
  }

  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel = this.labels[0].select;

      }, error => {
      }
    )
  }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
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
    debugger
    this.countryid = item.id;
    debugger
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
        debugger
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
    debugger
    this.cityid = item1.id;
    this.getareamasterbyid();
  }


  public getareamasterbyid() {
    debugger
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
        debugger
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
    debugger
    this.areaid = item3.id;
    for (let i = 0; i < this.arealist.length; i++) {
      debugger
      if (this.arealist[i].id == this.areaid) {
        debugger
        this.pincode = this.arealist[i].pincode
      }
    }
  }

  public onattachmentUpload1(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments1.push(abcd[i]);
      this.uploadattachments1();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {
      debugger
      this.attachmentsurl1.push(res);
      let a = this.attachmentsurl1[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.showdocphoto.push(b)
      debugger

      this.attachments1.length = 0;
      debugger
    })
    // this.sendattachment();
  }


  public insertdetails() {
    if (this.countryid == undefined || this.countryid.length == 0) {
      debugger
      Swal.fire("Please Select Country");
    }
    else if (this.cityid == undefined || this.cityid.length == 0) {
      Swal.fire("Please Select Province")
    }
    else if (this.areaid == undefined || this.areaid.length == 0) {
      Swal.fire("Please Select City");
    }
    else {
      if (this.attachmentsurl1.length == 0) {
        ``
        this.attachmentsurl1[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
      }
      debugger
      var entity = {
        'DoctorName': this.doctorname,
        'MobileNumber': this.phoneno,
        'EmailID': this.email,
        'Address': this.address,
        'PhotoUrl': this.attachmentsurl1[0],
        'Description': this.description,
        'GenderID': Number(this.gender),
        'CityID': this.cityid,
        'LanguageID': '1',
        'AreaID': this.areaid,
        'Pincode': this.pincode,
        'CountryID': this.countryid,
        'UserName': this.username,
        'Password': this.password
      }
      this.docservice.InsertLocalDoctorRegistration(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('success', 'Details Saved Successfully');
          location.href = "#/LocalDocDash"
        }
        else {
          Swal.fire('Error', 'Doctor Already Exist In This City');
          location.href = "#/LocalDocDash"
        }
      })
    }
  }

}
