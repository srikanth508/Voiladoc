import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editphysiotherapist',
  templateUrl: './editphysiotherapist.component.html',
  styleUrls: ['./editphysiotherapist.component.css']
})
export class EditphysiotherapistComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public countrylist: any;
  public countrydd: any;
  public countryid: any;
  public citydd: any;
  public areadd: any;
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
  public id: any;
  public details: any;
  public languageid: any;
  public labels: any;
  public dropzonelable: any;
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];

    }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.getpsytherapydetails()
    this.GetCountryMaster();
    this.GetDepartmentmaster();

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }


    this.countryid = "";
    this.cityid = "";
    this.areaid = "";

    this.getlanguage();
  }
  public getlanguage() {
    this.docservice.GetAdmin_PhysiotherapistRegistration_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public GetDepartmentmaster() {
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }

  public photourl: any;
  public attachmentsurl = [];
  hospitalname: any;
  hospitalclinicid:any;
  public getpsytherapydetails() {
    this.docservice.GePhysiotherapyRegistrationByIDandLanguageID(this.id, this.languageid).subscribe(data => {
      this.details = data[0];
      this.name = this.details.name,
        this.phno = this.details.phoneNo,
        this.email = this.details.email,
        this.genderid = this.details.genderID,
        this.address = this.details.address,
        this.deptid = this.details.departementID,
        this.exp = this.details.experience,
        this.description = this.details.description,
        this.homevisit = this.details.homeVisit,
        this.countryid = this.details.countryID,
        this.cityid = this.details.cityID,
        this.areaid = this.details.areaID,
        this.pincode = this.details.pincode
      this.photourl = this.details.photoURL;
      this.attachmentsurl[0] = this.details.photoUrlPath;
      this.hospitalname = this.details.hospital_ClinicName;
      this.subscriptiontype=this.details.subscriptionTypeID,
      this.monthlysubription=this.details.monthlySubscription
      this.appointmentpercentage=this.details.appointmentPercentage
       this.taxidentification=this.details.taxIdentification
       this.businessid=this.details.businessID
      this.commercialcity=this.details.commercialRegCity
       this.taxprofessional=this.details.taxProfessional
       this.socialseccurityfundno=this.details.socialSeccurityNo
       this.nameofbank=this.details.nameofthebank
        this.accountName=this.details.accountName
        this.accountNumber=this.details.accountNumber,
        this.hospitalclinicid=this.details.hospitalClinicID,
      this.GetDepartmentmaster();
      this.GetCountryMaster();
      this.getcitymaster();
      this.getareamasterbyid();

    }, error => {

    })
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
  public GetCountryID(even) {

    this.countryid = even.target.value;
    this.getcitymaster();

  }

  public getcitymaster() {
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


  public GetcityID(even) {

    this.cityid = even.target.value;
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

  public GetDepartmentID(even) {

    this.deptid = even.target.value;
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
      'Name': this.name,
      'PhoneNo': this.phno,
      'Email': this.email,
      'GenderID': this.genderid,
      'Address': this.address,
      'CityID': this.cityid,
      'AreaID': this.areaid,
      'DepartementID': this.deptid,
      'Experience': this.exp,
      'Description': this.description,
      'HomeVisit': Number(this.homevisit),
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

    this.docservice.UpdatephysiotherapyRegistration(entity).subscribe(data => {
      if (data != undefined) {
        if (this.languageid == 1) {
          Swal.fire("Updated Successfully");
          location.href = "#/PhysiotherapistDashboard"
          this.getpsytherapydetails();
        }
        else if (this.languageid == 6) {
          Swal.fire("Mis à jour avec succés");
          location.href = "#/PhysiotherapistDashboard"
          this.getpsytherapydetails();
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
  public attachments = [];
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
    this.docservice.UpdatePhysiotherapyRegistrationPhoto(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire("Updated Successfully");
        this.editbit = 0;
        this.dummnursephoto.length = 0;
        this.attachmentsurl.length = 0;
        this.showphoto.length = 0;
        this.ngOnInit();
      }
      else if (this.languageid == 6) {
        Swal.fire("Mis à jour avec succés");
        this.editbit = 0;
        this.dummnursephoto.length = 0;
        this.attachmentsurl.length = 0;
        this.showphoto.length = 0;
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
