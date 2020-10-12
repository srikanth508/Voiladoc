import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doctor-fee-dash',
  templateUrl: './doctor-fee-dash.component.html',
  styleUrls: ['./doctor-fee-dash.component.css']
})
export class DoctorFeeDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public doccommissionlist: any;
  public term: any;
  public labels: any;
  public labels1: any;

  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public count: any;
  public hospitalclinicid: any;
  public dummlistsss: any;
  public doctorid:any;
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.doctorid = localStorage.getItem('userid');
    this.getdoctorfeess();

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels1 = data;
      },
      error => { }
    );
    this.GetCountryMaster()
    this.countryid = 0
    this.cityid = 0
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

      this.doccommissionlist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.doccommissionlist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getdoctorfeess()
      this.countryid = 0

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
      this.doccommissionlist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.doccommissionlist.length
    }
    else if (even.target.value == 0) {
      this.getcity();
      this.areaid = 0;
      this.cityid = 0
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
      this.doccommissionlist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.doccommissionlist.length
    }
    else if (even.target.value == 0) {
      this.getdoctorfeess()
    }
  }


  
  public getdoctorfeess() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.DoctorCommissionFees(this.languageid).subscribe(
        data => {
         
          this.doccommissionlist = data;
          this.dummlist = this.doccommissionlist
          this.count = this.doccommissionlist.length
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.DoctorCommissionFees(this.languageid).subscribe(
        data => {
         
          this.dummlistsss = data;
          this.doccommissionlist = this.dummlistsss.filter(x => x.hosid == this.hospitalclinicid)
          this.dummlist = this.doccommissionlist
          this.count = this.doccommissionlist.length
        }, error => {
        }
      )
    }
   

  }


  public DeleteDoctorCommissionFees(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Service!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDoctorCommissionFees(id).subscribe(res => {
          let test = res;
          this.getdoctorfeess();
        })
        Swal.fire(
          'Deleted!',
          'Service has been deleted.',
          'success'
        )
      }
      else {
        this.getdoctorfeess();
      }
    })
  }


}
