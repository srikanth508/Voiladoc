import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-city-master-dash',
  templateUrl: './city-master-dash.component.html',
  styleUrls: ['./city-master-dash.component.css']
})
export class CityMasterDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public cityslist:any;
  public term:any;
  public countryid:any;
  public cityid:any;
  public countrylist:any;
  public citylist:any;
  public dummlist:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getcitymasters()
    this.GetCountryMaster()
    this.countryid = 0
this.cityid = 0
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public getcitymasters() {
    this.docservice.GetAreaMasterByLangID(this.languageid).subscribe(
      data => {
       
        this.cityslist = data;
        this.dummlist= this.cityslist
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
    if (even.target.value != 0) {
     
      this.countryid = even.target.value;

      this.cityslist = this.dummlist.filter(x => x.countryID == this.countryid)
      
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getcitymasters()
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

      this.cityslist = this.dummlist.filter(x => x.cityID == this.cityid)
   
    }
    else if (even.target.value == 0) {
      this.getcity()
    }
  }
  public DeleteAreaMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This City!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteAreaMaster(id).subscribe(res => {
          let test = res;
          this.getcitymasters()
        })
        Swal.fire(
          'Deleted!',
          'City has been deleted.',
          'success'
        )
      }
      else {
        this.getcitymasters()
      }
    })
  }
}
