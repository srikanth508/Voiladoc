import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-nurse',
  templateUrl: './edit-nurse.component.html',
  styleUrls: ['./edit-nurse.component.css']
})
export class EditNurseComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public id: any;
  public nursedetails: any;

  public name: any;
  public phno: any;
  public email: any;
  public genderid: any;
  public address: any;
  public cityid: any;
  public areaid: any;
  public deptid: any;
  public exp: any;
  public description: any;
  public homevisit: any;
  public pincode: any;

  public citylist: any;
  public arealist: any;
  public departmentlist: any;


  public countryid: any;
  public countrylist: any;
  public countrydd = {};
  public citydd = {};
  public areadd = {};
  public languageid: any;
  public labels: any;
  public photourl: any;
  public attachments = [];
  public attachmentsurl = [];
  public dropzonelable: any;
  hospitalname: any;
  hospitalclinicid:any;
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];

    }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetNurseRegistrationByIDAndLanguageID(this.id, this.languageid).subscribe(
      data => {

        this.nursedetails = data;
        this.name = this.nursedetails[0].nurseName;
        this.phno = this.nursedetails[0].phoneNo;
        this.email = this.nursedetails[0].email;
        this.genderid = this.nursedetails[0].genderID;
        this.address = this.nursedetails[0].address;
        this.deptid = this.nursedetails[0].departementID;
        this.exp = this.nursedetails[0].experience;
        this.description = this.nursedetails[0].description;
        this.homevisit = this.nursedetails[0].homeVisit;
        this.countryid = this.nursedetails[0].countryID;
        this.hospitalclinicid=this.nursedetails[0].hospitalclinicID;
        this.cityid = this.nursedetails[0].cityID;
        this.areaid = this.nursedetails[0].areaID;
        this.pincode = this.nursedetails[0].pincode;
        this.photourl = this.nursedetails[0].photoURL;
        this.attachmentsurl[0] = this.nursedetails[0].photoUrlPath;
        this.hospitalname = this.nursedetails[0].hospital_ClinicName
        this.subscriptiontype=this.nursedetails[0].subscriptionTypeID,

          this.monthlysubription=this.nursedetails[0].monthlySubscription
          this.appointmentpercentage=this.nursedetails[0].appointmentPercentage
           this.taxidentification=this.nursedetails[0].taxIdentification
           this.businessid=this.nursedetails[0].businessID
          this.commercialcity=this.nursedetails[0].commercialRegCity
           this.taxprofessional=this.nursedetails[0].taxProfessional

           this.socialseccurityfundno=this.nursedetails[0].socialSeccurityNo
           this.nameofbank=this.nursedetails[0].nameofthebank
            this.accountName=this.nursedetails[0].accountName
            this.accountNumber=this.nursedetails[0].accountNumber

        this.GetCountryMaster();
        this.getcitymasterbyid();
        this.getareamasterbyid();
      }, error => {
      }
    )

    this.GetCountryMaster();
    this.getdepartment();
    this.getlanguage()


    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.countryid = "";
    this.areaid = "";
    this.cityid = ""
  }


  public getlanguage() {
    this.docservice.GetAdmin_NurseRegistration_labelByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  public GetDepartmentID(even) {

    this.deptid = even.target.value;
  }

  public getdepartment() {
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
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

    this.countryid = even.target.value;
    this.getcitymasterbyid()


  }


  public getcitymasterbyid() {
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

  taxidentification: any;
  businessid: any;
  commercialcity: any;
  taxprofessional: any;
  socialseccurityfundno: any;
  nameofbank: any;
  accountName: any;
  accountNumber: any;
  subscriptiontype:any;

  public updatedetails() {
    var entity = {
      'LanguageID': this.languageid,
      'ID': this.id,
      'NurseName': this.name,
      'PhoneNo': this.phno,
      'Email': this.email,
      'GenderID': this.genderid,
      'Address': this.address,
      'DepartementID': this.deptid,
      'Experience': this.exp,
      'Description': this.description,
      'HomeVisit': this.homevisit,
      'CityID': this.cityid,
      'AreaID': this.areaid,
      'Pincode': this.pincode,
      'CountryID': this.countryid,
      'SubscriptionTypeID': this.subscriptiontype,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'TaxIdentification': this.taxidentification,
      'BusinessID': this.businessid,
      'CommercialRegCity': this.commercialcity,
      'TaxProfessional': this.taxprofessional,
      'SocialSeccurityNo': this.socialseccurityfundno,
      'Nameofthebank': this.nameofbank,
      'AccountName': this.accountName,
      'AccountNumber': this.accountNumber,
      'VAT': 0
    }
    this.docservice.UpdateNurseRegistration(entity).subscribe(data => {
      if (data != undefined) {
        if (this.languageid == 1) {
          Swal.fire("Updated Successfully");

          location.href = "#/NurseDashboard"
        }
        else if (this.languageid == 6) {
          Swal.fire("Mis à jour avec succés");

          location.href = "#/NurseDashboard"
        }
      }
    })
  }



  public dummnursephoto = []
  public onattachmentUpload(abcd) {
    this.attachmentsurl = [];
    this.dummnursephoto = []
    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }
  }

  public showphoto = [];
  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
      this.attachmentsurl.push(res);
      this.dummnursephoto.push(res);
      let a = this.dummnursephoto[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }

  public editbit: any;

  public GetEditPhoto() {
    this.editbit = 1;
  }


  public updatephoto() {

    var entity = {
      'ID': this.id,
      'PhotoUrl': this.attachmentsurl[0]
    }
    this.docservice.UpdateNurseRegistrationPhoto(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire("Updated Successfully");
        this.editbit = 0;
        this.dummnursephoto.length = 0;
        this.attachmentsurl.length = 0;
        this.ngOnInit();
      }
      else if (this.languageid == 6) {
        Swal.fire("Mis à jour avec succés");
        this.editbit = 0;
        this.dummnursephoto.length = 0;
        this.attachmentsurl.length = 0;
        this.ngOnInit();
      }
    })
  }


  appointmentpercentage: any;
  monthlysubription: any;
  public Getsubscriptontype() {

    this.appointmentpercentage = 0;
    this.monthlysubription = 0;
  }

}