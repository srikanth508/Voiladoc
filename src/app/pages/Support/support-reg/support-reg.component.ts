import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-support-reg',
  templateUrl: './support-reg.component.html',
  styleUrls: ['./support-reg.component.css']
})
export class SupportRegComponent implements OnInit {

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
  public supportname: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()

    this.GetCountryMaster();
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



  public onattachmentUpload1(abcd) {

    for (let i = 0; i < abcd.length; i++) {
      this.attachments1.push(abcd[i]);
      this.uploadattachments1();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {

      this.attachmentsurl1.push(res);
      let a = this.attachmentsurl1[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showdocphoto.push(b)


      this.attachments1.length = 0;

    })
    // this.sendattachment();
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
      if (this.attachmentsurl1.length == 0) {

        this.attachmentsurl1[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
      }
      var entity = {
        'Name': this.supportname,
        'MobileNumber': this.phoneno,
        'EmailID': this.email,
        'Address': this.address,
        'PhotoUrl': this.attachmentsurl1[0],
        'Description': this.description,
        'GenderID': Number(this.gender),
        'CityID': this.cityid,
        'AreaID': this.areaid,
        'Pincode': this.pincode,
        'CountryID': this.countryid,
        'UserName': this.username,
        'Password': this.password
      }
      this.docservice.InsertSupportRegistration(entity).subscribe(data => {
        if (data != 0) {

          this.pinno = data;
          this.sendmail()
          Swal.fire('success', 'Details Saved Successfully');
          location.href = "#/SupportRegDash"
        }
        // else {
        //   Swal.fire('Error', 'Doctor Already Exist In This City');
        //   location.href = "#/SupportRegDash"
        // }
      })
    }
  }


  pinno: any;
  emailattchementurl = [];

  public sendmail() {
    
    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.supportname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }

}
