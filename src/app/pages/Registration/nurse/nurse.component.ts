import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

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
  public countrylist; any;
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

  ngOnInit() {
    debugger
    this.dummid = localStorage.getItem('hospitalid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.departmentlist = data;
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
        this.servicelist = temp.filter(x => x.typeID == 2);

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

    this.gethosptilclinicforadmin()
  }


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
  public getlanguage() {
    this.docservice.GetAdmin_NurseRegistration_labelByLanguageID(this.languageid).subscribe(
      data => {
        debugger
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

  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }

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

  public onidUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.idproof.push(abcd[i]);
      this.uploadid();
    }
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

  public insertnursedetails() {
    this.spinner.show();
    var entity = {
      'NurseName': this.name,
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
      'Education':this.education,
      'SpokenLanguages':this.spokenlanguages
    }
    this.docservice.InsertNurseRegistration(entity).subscribe(data => {
      debugger

      let nurseid = data;

      for (let s = 0; s < this.serviceid.length; s++) {
        var serviceentity = {
          'NurseID': nurseid,
          'ServiceID': this.serviceid[s].id,
          'LanguageID': 1
        }
        this.docservice.InsertNurseServices(serviceentity).subscribe(data => {
        })
      }

      for (let s = 0; s < this.specilisationid.length; s++) {
        var specentity = {
          'NurseID': nurseid,
          'SpecializationID': this.specilisationid[s].id,
          'LanguageID': 1
        }
        this.docservice.InsertNurseSpecialization(specentity).subscribe(data => {
        })
      }
      Swal.fire('Registration Completed', 'Details saved successfully', 'success');
      this.spinner.hide();
      location.href = '#/NurseDashboard';

    })
  }

}
