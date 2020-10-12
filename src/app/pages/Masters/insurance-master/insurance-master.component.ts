import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-insurance-master',
  templateUrl: './insurance-master.component.html',
  styleUrls: ['./insurance-master.component.css']
})
export class InsuranceMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public id: any;
  public showbit: any;
  public insurancename: any;
  public insurancelist: any;

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
    this.getinsurancemaster();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }


  public getinsurancemaster() {
   
    this.docservice.GetInsuranceMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.insurancelist = data;
        var list = this.insurancelist.filter(x => x.id == this.id)
        this.insurancename = list[0].short


      }, error => {
      }
    )
  }


  public insertdetails() {
    this.spinner.show();
    var entity = {
      'Short': this.insurancename,
      'LanguageID': 1
    }
    this.docservice.InsertInsuranceMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/InsuranceMasterDash"
      }
    })
  }

  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID': this.id,
      'Short': this.insurancename,
      'LanguageID': this.languageid
    }
    this.docservice.UpdateInsuranceMaster_Web(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Details Updated Successfully');
      this.spinner.hide();
      location.href = "#/InsuranceMasterDash"

    })
  }

}
