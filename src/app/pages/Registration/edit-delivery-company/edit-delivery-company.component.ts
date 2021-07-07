import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-delivery-company',
  templateUrl: './edit-delivery-company.component.html',
  styleUrls: ['./edit-delivery-company.component.css']
})
export class EditDeliveryCompanyComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public companyname: any;
  public contactname: any;
  public phno: any;
  public email: any;
  public address: any;
  public cityid: any;
  public areaid: any;
  public pincode: any;
  public countrylist; any;
  public countrydd: any;
  public countryid: any;
  public citydd: any;
  public areadd: any;
  public citylist: any;
  public arealist: any;
  public details: any;
  public id: any;

  public labels: any;
  public languageid: any;
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      this.languageid = localStorage.getItem('LanguageID');
      this.GetDelivarycompany()


    }
    )
    this.GetCountryMaster();
    this.getlanguage();
    this.cityid="";
    this.countryid="";
    this.areaid="";
  }

  public getlanguage() {
    this.docservice.GetAdmin_CompanyDetails_Label(this.languageid).subscribe(
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

      }, error => {
      }
    )
  }
  public GetDelivarycompany() {
    this.docservice.GetDeliveryCompanyByIDAndLanguageID(this.id, this.languageid).subscribe(data => {
      this.details = data[0];
      this.companyname = this.details.companyName,
        this.contactname = this.details.contactPerson,
        this.phno = this.details.phoneNo,
        this.email = this.details.emailID,
        this.address = this.details.address,
        this.countryid = this.details.countryID,
        this.cityid = this.details.cityID,
        this.areaid = this.details.areaID,
        this.pincode = this.details.pincode,

        this.GetCountryMaster();
      this.getareamaster()
      this.getareamasterbyid();

    }, error => {

    })
  }

  public GetCountryID(even) {

    this.countryid = even.target.value;
    this.getareamaster()

  }
  public getareamaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;


      }, error => {
      }
    )

  }

  public GetcityID(even) {

    this.cityid = even.target.value
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
    // for (let i = 0; i < this.arealist.length; i++) {

    //   if (this.arealist[i].id == this.areaid) {

    //     this.pincode = this.arealist[i].pincode
    //   }
    // }
  }
  public updatedetails() {

    var entity = {
      'LanguageID': this.languageid,
      'ID': this.id,
      'CompanyName': this.companyname,
      'ContactPerson': this.contactname,
      'PhoneNo': this.phno,
      'EmailID': this.email,
      'Address': this.address,
      'CountryID': this.countryid,
      'CityID': this.cityid,
      'AreaID': this.areaid,
      'Pincode': this.pincode
    }
    this.docservice.UpdateDeliveryCompany(entity).subscribe(data => {
      if (data != undefined) {
        if (this.languageid == 1) {
          Swal.fire("Updated Successfully");

          location.href = "#/DeliveryPartnerDashboard"
        }
        else {
          Swal.fire("Mis à jour avec succés");
          location.href = "#/DeliveryPartnerDashboard"
        }

      }
    })

  }
}
