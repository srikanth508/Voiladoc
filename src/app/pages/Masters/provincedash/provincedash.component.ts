import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-provincedash',
  templateUrl: './provincedash.component.html',
  styleUrls: ['./provincedash.component.css']
})
export class ProvincedashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public citylist:any;
  public provincelist:any;
  public term:any;
  public countrylist:any;
  public countryid:any;
  public dummlist:any;
  public cityid:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getprobincelist();
    this.GetCountryMaster()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
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
  public GetCountryID(even) {
    if (even.target.value != 0) {
     
      this.countryid = even.target.value;

      this.provincelist = this.dummlist.filter(x => x.countryID == this.countryid)
      
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getprobincelist()
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

      this.provincelist = this.dummlist.filter(x => x.cityID == this.cityid)
   
    }
    else if (even.target.value == 0) {
      this.getcity()
    }
  }




  public getprobincelist() {
    this.docservice.GetCityMasterByLangID(this.languageid).subscribe(
      data => {
       
        this.provincelist = data;
        this.dummlist=this.provincelist
      }, error => {
      }
    )
  }

  


  public DeleteCityMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Province!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteCityMaster(id).subscribe(res => {
          let test = res;
          this.getprobincelist();
        })
        Swal.fire(
          'Deleted!',
          'Province has been deleted.',
          'success'
        )
      }
      else {
        this.getprobincelist();
      }
    })
  }

  // public getcitymaster()
  // {
  //   this.docservice.GetCityMasterBYIDandLanguageID(this.countryid,this.languageid).subscribe(
  //     data => {
  //      
  //       this.citylist = data;

        
  //     }, error => {
  //     }
  //   )
  // }
}
