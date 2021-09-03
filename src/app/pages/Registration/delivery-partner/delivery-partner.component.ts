import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-delivery-partner',
  templateUrl: './delivery-partner.component.html',
  styleUrls: ['./delivery-partner.component.css']
})
export class DeliveryPartnerComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }


  public citylist: any;
  public arealist: any;
  public showphoto = [];
  public attachments = [];
  public attachmentsurl = [];

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
  public labels: any;
  public languageid: any;
  public deliverytypeid: any;
  dropzonelable: any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetCountryMaster()



    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

    this.deliverytypeid = ""
  }
  select: any;
  search: any;
  public getlanguage() {
    this.docservice.GetAdmin_CompanyDetails_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.select = this.labels[0].select;
        this.search = this.labels[0].search
      }, error => {
      }
    )
  }

  public GetDeliveryTypeID(even) {

    this.deliverytypeid = even.target.value;
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
          allowSearchFilter: true,
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
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }


  public GetCityID(item1: any) {

    this.cityid = item1.id;
    this.getareamasterbyid();
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

      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }

  public getareamasterbyid() {

    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {

        this.arealist = data;
        this.areadd = {
          singleSelection: false,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }

  public cityidss = [];
  multipincodes = [];


  public GetAreaID(item3: any) {
    debugger
    this.areaid = item3.id;
    debugger
    this.cityidss.push(item3.id);

    // debugger
    //     this.citssid = this.cityidss;
    //     this.multiplecityid = this.citssid.join(',')
    debugger
    for (let i = 0; i < this.arealist.length; i++) {

      if (this.arealist[i].id == this.areaid) {
        debugger
        this.multipincodes.push(this.arealist[i].pincode);
        break;
        debugger
      }
    }
  }
  citssid: any;
  multiplecityid: any;
  multipincode: any;

  public insertdeliverycompany() {
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
      // this.spinner.show();
      debugger
      this.citssid = this.cityidss;
      this.multiplecityid = this.citssid.join(',');

      var mulpin = this.multipincodes;
      this.multipincode = mulpin.join(',');
      debugger
      var entity = {
        'CompanyName': this.companyname,
        'ContactPerson': this.contactname,
        'PhoneNo': this.phno,
        'EmailID': this.email,
        'Address': this.address,
        'CountryID': this.countryid,
        'CityID': this.cityid,
        'AreaID': this.areaid,
        'PhotoURL': this.attachmentsurl[0],
        'Pincode': this.pincode,
        'DeliveryType': this.deliverytypeid,
        'CityIDs': this.multiplecityid,
        'CityPincodes': this.multipincode
      }
      this.docservice.InsertDeliveryCompany(entity).subscribe(data => {

        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        this.spinner.hide();
        location.href = '#/DeliveryPartnerDashboard';
      }, error => {
        Swal.fire("Exception while saving. Please try again after some time");
        this.spinner.hide();
      })
    }
  }

}
