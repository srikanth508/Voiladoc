import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-partner-dashboard',
  templateUrl: './delivery-partner-dashboard.component.html',
  styleUrls: ['./delivery-partner-dashboard.component.css']
})
export class DeliveryPartnerDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public deliverycompanylist: any;
  public labels:any;
  public languageid:any;
  public labels1:any;

  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public count:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getdeliverylist();
    this.getlanguage();
    
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels1 = data;
      },
      error => {}
    );

this.GetCountryMaster()
this.countryid=0
this.cityid=0
  }

  public getlanguage()
  {
    this.docservice.GetAdmin_CompanyDetails_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )  
  }
  public getdeliverylist() {
    this.docservice.GetDeliveryCompanyAdminByLanguageID(this.languageid).subscribe(
      data => {
       
        this.deliverycompanylist = data;
        this.dummlist=this.deliverycompanylist
      }, error => {
      }
    )
  }




  public deletedeliverycopmany(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Delivery Company!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDeliveryCompany(id).subscribe(res => {
          let test = res;
          this.getdeliverylist();
        })
        Swal.fire(
          'Deleted!',
          'Delivery Company has been deleted.',
          'success'
        )
      }
      else {
        this.getdeliverylist();
      }
    })
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
    if (even.target.value != 0) {
     
      this.countryid = even.target.value;

      this.deliverycompanylist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.deliverycompanylist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getdeliverylist()
      this.countryid=0

    }
  }
  public getcity() {
   
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
       
        this.citylist = data;
      }, error => {
      }
    )
  }


  public GetCityID(even) {
    if (even.target.value != 0) {
     
      this.cityid = even.target.value;
      this.getareamasterbyid()
      this.deliverycompanylist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.deliverycompanylist.length
    }
    else if (even.target.value == 0) {
      this.getcity();
      this.areaid=0;
      this.cityid=0
    }
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
    if (even.target.value != 0) {
     
      this.areaid = even.target.value;
      this.deliverycompanylist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.deliverycompanylist.length
    }
    else if (even.target.value == 0) {
      this.getdeliverylist()
    }
  }




}
