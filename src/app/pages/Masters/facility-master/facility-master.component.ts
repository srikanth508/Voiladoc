import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-facility-master',
  templateUrl: './facility-master.component.html',
  styleUrls: ['./facility-master.component.css']
})
export class FacilityMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public id: any;
  public showbit: any;
  public facilityname: any;
  public facilitylist: any;
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
    this.getfacilititymaster();
    this.getlanguage()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public insertdetails() {
    this.spinner.show();
    var entity = {
      'Short': this.facilityname,
      'LanguageID': 1
    }
    this.docservice.InsertFacilitiesMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/FacilityMasterDash"
      }
    })
  }

  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID': this.id,
      'Short': this.facilityname,
      'LanguageID': this.languageid
    }
    this.docservice.UpdateFacilitiesMaster_Web(entity).subscribe(data => {
 
        Swal.fire('Success', 'Details Updated Successfully');
        this.spinner.hide();
        location.href = "#/FacilityMasterDash"
      
    })
  }
  public getfacilititymaster() {
   
    this.docservice.GetFacilitiesMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.facilitylist = data;
        var list = this.facilitylist.filter(x => x.id == this.id)
        this.facilityname=list[0].short
      }, error => {
      }
    )
  }
}
