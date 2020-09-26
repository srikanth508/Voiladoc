import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-physiotherapist',
  templateUrl: './physiotherapist.component.html',
  styleUrls: ['./physiotherapist.component.css']
})
export class PhysiotherapistComponent implements OnInit {

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
  public specilisationlist: any;
  public specilisatiodd = {};
  public specilisationid = [];
  public servicelist: any;
  public servicedd = {};
  public serviceid = [];
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
  dropzonelable:any;
  ngOnInit() {
    this.dummid = localStorage.getItem('hospitalid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');


    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.dummdepartmentlist = data;
        this.departmentlist = this.dummdepartmentlist.filter(x => x.id == 7)
      }, error => {
      }
    )

    this.docservice.GetSpecilaizationMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.specilisationlist = data;

        this.specilisatiodd = {
          singleSelection: false,
          idField: 'id',
          textField: 'specilaizationName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )

    this.docservice.GetServiceMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        let temp: any = data;
        this.servicelist = temp.filter(x => x.typeID == 3);
        this.servicedd = {
          singleSelection: false,
          idField: 'id',
          textField: 'serviceName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
    this.GetCountryMaster();
    this.getlanguage();
    this.gethosptilclinicforadmin()

    if(this.languageid==1)
    {
      this.dropzonelable="Upload file"
    }
    else if(this.languageid==6)
    {
      this.dropzonelable="Télécharger des fichiers"
    }
  }

  public getlanguage() {
    this.docservice.GetAdmin_PhysiotherapistRegistration_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )
  }
  SelectLabel
  public gethosptilclinicforadmin() {
    debugger
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        debugger
        this.hospitalcliniclist = data;
        this.hospitadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }


  public GetHospitalID(item: any) {
    debugger
    this.hospitalclinicid = item.id;
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


  public GetDepartmentID(even) {
    debugger
    this.deptid = even.target.value;
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

  public GetSpecilizationID(item: any) {
    debugger
    this.specilisationid.push(item);
    debugger
  }

  public GetServiceID(item: any) {
    debugger
    this.serviceid.push(item);
    debugger
  }

  public onidUpload(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
      this.idproof.push(abcd.addedFiles[0]);
      this.uploadid();
    // }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadid() {
    this.docservice.pharmacyphoto(this.idproof).subscribe(res => {
      debugger
      this.idproofurl.push(res);
      let a = this.idproofurl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;
      this.showidproof.push(b)
      this.idproof.length = 0;
      debugger
    })
    // this.sendattachment();
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

  public insertphysiodetails() {
    this.spinner.show();
    var entity = {
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
      'IDProof': this.idproofurl[0],
      'PhotoUrl': this.attachmentsurl[0],
      'Pincode': this.pincode,
      'CountryID': this.countryid,
      'HospitalClinicID': this.hospitalclinicid,
      'Education': this.education,
      'SpokenLanguages': this.spokenlanguages
    }
    this.docservice.InsertphysiotherapyRegistrationAdmin(entity).subscribe(data => {
      debugger

      let physioid = data;


      for (let s = 0; s < this.serviceid.length; s++) {
        var serviceentity = {
          'PhysiotherapyID': physioid,
          'ServiceID': this.serviceid[s].id,
          'LanguageID': 1
        }
        this.docservice.InsertPhysiotherapyServices(serviceentity).subscribe(datas => {

        })
      }

      for (let s = 0; s < this.specilisationid.length; s++) {
        var specentity = {
          'PhysiotherapyID': physioid,
          'SpecializationID': this.specilisationid[s].id,
          'LanguageID': 1
        }
        this.docservice.InsertPhysiotherapySpecialization(specentity).subscribe(datas => {

        })
      }
      Swal.fire('Registration Completed', 'Details saved successfully', 'success');
      this.spinner.hide();
      location.href = '#/PhysiotherapistDashboard';

    })
  }

}
