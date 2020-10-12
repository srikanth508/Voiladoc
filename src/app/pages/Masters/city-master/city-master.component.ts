import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public showbit: any;
  public id: any;
  public cityid: any;
  public areaname: any;
  public pincode: any;
  public provincelist: any;
  public cityslist: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
     

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
      }
    }
    )
    this.cityid = 0;
    this.getlanguage();
    this.getprobincelist();
    this.getcitymasters()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }


  public getprobincelist() {
    this.docservice.GetCityMasterByLangID(this.languageid).subscribe(
      data => {
       
        this.provincelist = data;
      }, error => {
      }
    )
  }



  public getcitymasters() {
    this.docservice.GetAreaMasterByLangID(this.languageid).subscribe(
      data => {
       
        this.cityslist = data;

        var list = this.cityslist.filter(x => x.id == this.id)
        this.cityid = list[0].cityID,
          this.areaname = list[0].areaName
        this.pincode = list[0].pincode
      }, error => {
      }
    )
  }

  public GetProvinceID(even) {
   
    this.cityid = even.target.value;
  }


  public insertdetails() {
    if(this.cityid==0||this.cityid==undefined)
    {
      Swal.fire("Please Select Province")
    }
    else{
      this.spinner.show();
      var entity = {
        'CityID': this.cityid,
        'AreaName': this.areaname,
        'Pincode': this.pincode,
        'LanguageID': 1
      }
      this.docservice.InsertAreaMaster(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          this.spinner.hide();
          location.href = "#/CityMasterDash"
        }
      })
    }
  }


  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID':this.id,
      'CityID': this.cityid,
      'AreaName': this.areaname,
      'Pincode': this.pincode,
      'LanguageID': this.languageid
    }
    this.docservice.UpdateAreaMaster_Web(entity).subscribe(data => {
     let res=data;
        Swal.fire('Success', 'Details Updated Successfully');
        this.spinner.hide();
        location.href = "#/CityMasterDash"
      
    })
  }
}
