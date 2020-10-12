import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-blood-group-master',
  templateUrl: './blood-group-master.component.html',
  styleUrls: ['./blood-group-master.component.css']
})
export class BloodGroupMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public id: any;
  public showbit: any;
  public bloodgroup: any;
  public bloodlist: any;
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
    this.getlanguage();
    this.getbloodgroups()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }


  public getbloodgroups() {
    this.docservice.GetBloodGroupMasterWeb(this.languageid).subscribe(
      data => {
       
        this.bloodlist = data;
        var list = this.bloodlist.filter(x => x.id == this.id)
        this.bloodgroup = list[0].bloodGroup
      }, error => {
      }
    )
  }


  public insertdetails() {
    this.spinner.show();
    var entity = {
      'BloodGroup': this.bloodgroup,
    }
    this.docservice.InsertBloodGroupMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/BloodGroupMasterDash"
      }
    })
  }

  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID': this.id,
      'BloodGroup': this.bloodgroup,
      'LanguageID':this.languageid
    }
    this.docservice.UpdateBloodGroupMaster_French(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Details Updated Successfully');
      this.spinner.hide();
      location.href = "#/BloodGroupMasterDash"

    })
  }
}
