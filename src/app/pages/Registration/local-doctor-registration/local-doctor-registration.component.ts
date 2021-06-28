import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-local-doctor-registration',
  templateUrl: './local-doctor-registration.component.html',
  styleUrls: ['./local-doctor-registration.component.css']
})
export class LocalDoctorRegistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

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
  SelectLabel: any
  dropzonelable: any;
  public id: any;
  public showedit: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetCountryMaster();

    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];

      if (this.id == undefined) {
        this.showedit = 0;
      }
      else {
        this.showedit = 1;
      }

      this.getlocaldoctors()

    }
    )


    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

  }

  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;

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




  public GetAreaID1(even) {
    this.areaid = even.target.value;
    for (let i = 0; i < this.arealist.length; i++) {

      if (this.arealist[i].id == this.areaid) {

        this.pincode = this.arealist[i].pincode
      }
    }
  }

  public onattachmentUpload1(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadattachments1();
    // }

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
      this.password = Math.random().toString(36).slice(-8);
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
          this.pinno = data;
          this.sendmail()
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




  pinno: any;
  emailattchementurl = [];


  public sendmail() {
    
    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.doctorname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }

  public GetCountryID1(even) {
    this.countryid = even.target.value;
  }


  public GetCityID1(even) {
    this.cityid = even.target.value;
  }

  localdoclist: any;

  public getlocaldoctors() {
    this.docservice.GetLocalDoctorRegistration(this.languageid).subscribe(
      data => {

        this.localdoclist = data;
        var list = this.localdoclist.filter(x => x.id == this.id)
        this.doctorname = list[0].doctorName,
          this.address = list[0].address,
          this.phoneno = list[0].mobileNumber,
          this.email = list[0].emailID,
          this.description = list[0].description,
          this.gender = list[0].genderID,
          this.cityid = list[0].cityID,
          this.areaid = list[0].areaID,
          this.pincode = list[0].pincode,
          this.countryid = list[0].countryID,
          this.username = list[0].userName,
          this.password = list[0].password

        this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
          data => {

            this.citylist = data;
          }, error => {
          }
        )
        this.getareamasterbyid();
      }, error => {
      }
    )
  }



  public updatedetails() {
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

      var entity = {
        'ID': this.id,
        'DoctorName': this.doctorname,
        'MobileNumber': this.phoneno,
        'EmailID': this.email,
        'Address': this.address,
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
      this.docservice.UpdateLocalDoctorRegistration(entity).subscribe(data => {
        let res=data;
        Swal.fire('success', 'Updated Saved Successfully');
        location.href = "#/LocalDocDash"
      })
    }
  }
}
