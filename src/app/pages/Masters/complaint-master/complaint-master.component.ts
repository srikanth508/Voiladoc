import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-complaint-master',
  templateUrl: './complaint-master.component.html',
  styleUrls: ['./complaint-master.component.css']
})
export class ComplaintMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public id: any;
  public showbit: any;
  public complaint: any;
  public description: any;
  public complaints: any;
  public departmentlist: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {

      this.getcomplaintmaster();
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
      }
    }
    )
    this.getlanguage()
    this.getdepartmentmaster()
    this.departmentid=""
  }






  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }





  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  public getcomplaintmaster() {
    this.docservice.GetCompalintMasterLangID(this.languageid).subscribe(
      data => {

        this.complaints = data;
        var list = this.complaints.filter(x => x.id == this.id)
        this.complaint = list[0].name,
          this.description = list[0].description,
          this.departmentid=list[0].departmentID
      }, error => {
      }
    )
  }

  departmentid: any;

  public GetDepartmentID(even) {

    this.departmentid = even.target.value;

  }


  public insertdetails() {
    this.spinner.show();
    var entity = {
      'Name': this.complaint,
      'Description': this.description,
      'DepartmentID':this.departmentid
    }
    this.docservice.InsertComplaintMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/CompaintDash"
      }
    })
  }
  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID': this.id,
      'Name': this.complaint,
      'Description': this.description,
      'LanguageID': this.languageid,
      'DepartmentID':this.departmentid
    }
    this.docservice.UpdateComplaintMaster(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Details Updated Successfully');
      this.spinner.hide();
      location.href = "#/CompaintDash"

    })
  }
}
