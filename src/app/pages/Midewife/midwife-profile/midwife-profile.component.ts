import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-midwife-profile',
  templateUrl: './midwife-profile.component.html',
  styleUrls: ['./midwife-profile.component.css']
})
export class MidwifeProfileComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public countrylist:any;
  public countrydd:any;
  public countryid:any;
  public citydd:any;
  public areadd:any;
  
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
  public id:any;
  public departmentlist:any;
  public citylist: any;
  public arealist: any;
  public languageid:any;
  public labels:any;
  public details:any;
  ngOnInit() {
    this.id=localStorage.getItem('midwifeid');
    this.languageid=localStorage.getItem('LanguageID');
    this.Getmidwifedetails()
    this.GetCountryMaster();
   
    this.getlanguage()
  }

  

  public getlanguage()
  {
    this.docservice.GetAdmin_MidWifeRegistration_LabelByLanguageID(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    ) 
  }


  public Getmidwifedetails()
  {
    this.docservice.GetMidWivesRegistrationByIDAndLanguageID(this.id,this.languageid).subscribe(data=>{
      this.details=data[0];
      this.name=this.details.name,
      this.phno=this.details.phoneNo,
      this.email=this.details.email,
      this.genderid=this.details.genderID,
      this.address=this.details.address,
      this.deptid=this.details.departementID,
      this.exp=this.details.experience,
      this.description=this.details.description,
      this.homevisit=this.details.homeVisit,
      this.countryid=this.details.countryID,
      this.cityid=this.details.cityID,
      this.areaid=this.details.areaID,
      this.pincode=this.details.pincode
      this.GetDepartmentmaster();
      this.GetCountryMaster();
      this.getcitymaster();
      this.getareamasterbyid();
      
    },error=>{

    })
  }


  public GetDepartmentmaster()
  {
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
    this.getcitymaster();
   
  }

  public getcitymaster()
  {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid,this.languageid).subscribe(
      data => {
       
        this.citylist = data;

      }, error => {
      }
    )
  }


  public GetcityID(even) {
   
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
  public updatedetails() {
   
    var entity = {
      'LanguageID':this.languageid,
      'ID':this.id,
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
      'CountryID':this.countryid
    }
   
    this.docservice.UpdateMidWivesRegistration(entity).subscribe(data=>{
      if(data!=undefined)
      {
        Swal.fire("Updated Successfully");
        this.Getmidwifedetails()
      }
    })

}
}
