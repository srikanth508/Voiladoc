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
  dropzonelable:any;

  ngOnInit() {
   
    this.dummid = localStorage.getItem('hospitalid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.departmentlist = data;
      }, error => {
      }
    )

    this.docservice.GetSpecilaizationMasterByLanguageID(this.languageid).subscribe(
      data => {
       
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
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }


  public GetHospitalID(item: any) {
   
    this.hospitalclinicid = item.id;
  }
  public getlanguage() {
    this.docservice.GetAdmin_NurseRegistration_labelByLanguageID(this.languageid).subscribe(
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



  public GetDepartmentID(even) {
   
    this.deptid = even.target.value;
  }

  public GetSpecilizationID(item: any) {
   
    this.specilisationid.push(item);
   
  }

  public GetServiceID(item: any) {
   
    this.serviceid.push(item);
   
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
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
     
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
     
      let b = 'http://14.192.17.225' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;
     
    })
    // this.sendattachment();
  }

  public onidUpload(abcd) {
   
    // for (let i = 0; i < abcd.length; i++) {
      this.idproof.push(abcd.addedFiles[0]);
      this.uploadid();
    // }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadid() {
    this.docservice.pharmacyphoto(this.idproof).subscribe(res => {
     
      this.idproofurl.push(res);
      let a = this.idproofurl[0].slice(2);
     
      let b = 'http://14.192.17.225' + a;
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
      'Education': this.education,
      'SpokenLanguages': this.spokenlanguages
    }
    this.docservice.InsertNurseRegistration(entity).subscribe(data => {
     

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
