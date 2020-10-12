import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nurse-profile',
  templateUrl: './nurse-profile.component.html',
  styleUrls: ['./nurse-profile.component.css']
})
export class NurseProfileComponent implements OnInit {

  constructor(public docservice: HelloDoctorService,private spinner: NgxSpinnerService) { }
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


  public countryid:any;
  public countrylist:any;
  public countrydd={};
  public citydd={};
  public areadd={};
  public languageid: any;
  public labels:any;

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
    this.languageid = localStorage.getItem('LanguageID');
this.id=localStorage.getItem('nurseid');

    this.docservice.GetNurseRegistrationByIDAndLanguageID(this.id,this.languageid).subscribe(
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
        this.cityid = this.nursedetails[0].cityID;
        this.areaid = this.nursedetails[0].areaID;
        this.pincode = this.nursedetails[0].pincode;
     this.GetCountryMaster();
     this.getcitymasterbyid();
     this.getareamasterbyid();
    
      }, error => {
      }
    )

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.departmentlist = data;
      }, error => {
      }
    )
    
  
    this.GetCountryMaster();
    this.getlanguage()
  }


  public getlanguage()
  {
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
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid,this.languageid).subscribe(
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
   
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid,this.languageid).subscribe(
      data => {
       
        this.arealist = data;
       
      }, error => {
      }
    )
  }

  public GetAreaID(even) {
   
    this.areaid =even.target.value;;
    for (let i = 0; i < this.arealist.length; i++) {
     
      if (this.arealist[i].id == this.areaid) {
       
        this.pincode = this.arealist[i].pincode
      }
    }
  }


  public updatedetails() {
   
    var entity = {
      'LanguageID':this.languageid,
      'ID':this.id,
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
      'CountryID': this.countryid
    }
   
    this.docservice.UpdateNurseRegistration(entity).subscribe(data=>{
      if(data!=undefined)
      {
        Swal.fire("Updated Successfully");
      }
    })

}
}
