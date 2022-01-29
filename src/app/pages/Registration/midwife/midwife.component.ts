import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-midwife',
  templateUrl: './midwife.component.html',
  styleUrls: ['./midwife.component.css']
})
export class MidwifeComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

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
  public showphoto = [];
  public showidproof = [];
  public idproof = [];
  public idproofurl = [];
  public attachments = [];
  public attachmentsurl = [];
  public countrylist: any;
  public countrydd: any;
  public countryid: any;
  public citydd: any;
  public areadd: any;
  public languageid: any;
  public labels: any;
  public hospitalclinicid: any;
  public hospitalcliniclist: any;
  public hospitadd = {};
  public dummid: any;
  public education: any;
  public spokenlanguages: any;
  public dummdepartmentlist: any;
  public dropzonelable: any;
  public search: any;
  ngOnInit() {

    this.dummid = localStorage.getItem('hospitalid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_MidWifeRegistration_LabelByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search;
      }, error => {
      }
    )

    this.docservice.GetCityMaster().subscribe(
      data => {

        this.citylist = data;
      }, error => {
      }
    )

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.departmentlist = data;

        // this.departmentlist = this.dummdepartmentlist.filter(x => x.id == 12)
      }, error => {
      }
    )
    this.GetCountryMaster()
    this.getlanguage();
    this.gethosptilclinicforadmin()
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }


  public gethosptilclinicforadmin() {

    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {

        this.hospitalcliniclist = data;
        this.hospitadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search
        };
      }, error => {
      }
    )
  }


  public GetHospitalID(item: any) {

    this.hospitalclinicid = item.id;
  }
  public getlanguage() {
    this.docservice.GetAdmin_MidWifeRegistration_LabelByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )
  }


  SelectLabel
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
          allowSearchFilter: false,
          searchPlaceholderText: this.search
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
          allowSearchFilter: true,
          searchPlaceholderText: this.search
        };
      }, error => {
      }
    )
  }


  public GetCityID(item1: any) {

    this.cityid = item1.id;
    this.getareamasterbyid();
  }


  public GetDepartmentID(even) {

    this.deptid = even.target.value;
  }


  public dummphotourl = []
  public onattachmentUpload(abcd) {

    this.dummphotourl = []
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

  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      this.dummphotourl.push(res);
      let a = this.dummphotourl[0].slice(2);
      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }

  public dummidentityphotourl = []

  public onidUpload(abcd) {
    this.dummidentityphotourl = []
    // for (let i = 0; i < abcd.length; i++) {
    this.idproof.push(abcd.addedFiles[0]);
    this.uploadid();
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

  public uploadid() {
    this.docservice.pharmacyphoto(this.idproof).subscribe(res => {

      this.idproofurl.push(res);
      this.dummidentityphotourl.push(res);
      let a = this.dummidentityphotourl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showidproof.push(b)
      this.idproof.length = 0;

    })
    // this.sendattachment();
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
          allowSearchFilter: true,
          searchPlaceholderText: this.search
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

  slotTypeID:any;
  GetSlotDurationID(even) {
    this.slotTypeID = even.target.value;
  }


  taxidentification: any;
  businessid: any;
  commercialcity: any;
  taxprofessional: any;
  socialseccurityfundno: any;
  nameofbank: any;
  accountName: any;
  accountNumber: any;
  subscriptiontype: any;

  appointmentpercentage: any;
  monthlysubription: any;
  public Getsubscriptontype() {

    this.appointmentpercentage = 0;
    this.monthlysubription = 0;
  }
  

  public InsertMidWives() {
    this.spinner.show();
    var entity = {
      'Name': this.name,
      'PhoneNo': this.phno,
      'Email': this.email,
      'GenderID': this.genderid,
      'Address': this.address,
      'CityID': this.cityid,
      'AreaID': this.areaid,
      'DepartementID': 2,
      'Experience': this.exp,
      'Description': this.description,
      'HomeVisit': Number(this.homevisit),
      'IDProof': this.idproofurl[0],
      'PhotoUrl': this.attachmentsurl[0],
      'Pincode': this.pincode,
      'CountryID': this.countryid,
      'HospitalClinicID': this.hospitalclinicid,
      'Education': this.education,
      'SpokenLanguages': this.spokenlanguages,
      'SlotDurationID':this.slotTypeID,
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
    this.docservice.InsertMidWivesRegistration(entity).subscribe(data => {
      if (data != 0 && data != 1) {
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Midwife saved successfully', 'success');
          this.spinner.hide();
          location.href = '#/MidwifeDashboard';
        }
        else if (this.languageid == 6) {
          Swal.fire('', 'Détails enregistrés avec succès', 'success');
          this.spinner.hide();
          location.href = '#/MidwifeDashboard';
        }

      }
      else {
        if (data == 0) {
          if (this.languageid == 1) {
            Swal.fire('Email address already exists. Please verify and use the correct email address.');
            this.spinner.hide();
          }
          else {
            Swal.fire("L'adresse email existe déjà. Veuillez vérifier et utiliser la bonne adresse email.");
            this.spinner.hide();
          }

        }
        else {
          if (this.languageid == 1) {
            Swal.fire('The phone number already exists. Please verify and use the correct number');
            this.spinner.hide();
          }
          else {
            Swal.fire("Le numéro de téléphone existe déjà.Veuillez vérifier et utiliser le bon numéro.");
            this.spinner.hide();
          }
        }
        // location.href = '#/MidwifeDashboard';
      }
    }, error => {
      Swal.fire("Exception while saving.Please try after some time");
      this.spinner.hide();
    })
  }

}
