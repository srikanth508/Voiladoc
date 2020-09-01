import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-treatment-master',
  templateUrl: './treatment-master.component.html',
  styleUrls: ['./treatment-master.component.css']
})
export class TreatmentMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }

  public languageid: any;
  public labels: any;
  public departmentlist: any;
  public departmentid: any;
  public treatmentservice: any;
  public id: any;
  public showbit: any;
  public treatmentlist:any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
      debugger;

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
      }
    }
    )
    this.GetTreatments()
    this.getlanguage();
    this.getdepartmentmaster();
    this.departmentid = 0;
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }


  public getdepartmentmaster() {
    debugger
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.departmentlist = data;
      }, error => {
      }
    )
  }

  public GetDepartmentID(even) {
    debugger
    this.departmentid = even.target.value;
  }



  public GetTreatments() {
    debugger
    this.docservice.GetTreatmentPlanMaster(this.languageid).subscribe(
      data => {
        debugger
        this.treatmentlist = data;

        var list=this.treatmentlist.filter(x=>x.id==this.id)
        this.departmentid=list[0].departmentID,
        this.treatmentservice=list[0].treatmentPlan
      }, error => {
      }
    )
  }

  

  public insertdetails() {
    if (this.departmentid == 0 || this.departmentid == undefined) {
      Swal.fire("Please Select Department")
    }
    else {
      this.spinner.show();
      var entity = {
        'DepartmentID': this.departmentid,
        'TreatmentPlan': this.treatmentservice,
      }
      this.docservice.InsertTreatmentPlanMaster(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          this.spinner.hide();
          location.href = "#/TreatmentDash"
        }
      })
    }
  }



  public updatedetails() {
 
      var entity = {
        'ID':this.id,
        'LanguageID':this.languageid,
        'DepartmentID': this.departmentid,
        'TreatmentPlan': this.treatmentservice,
      }
      this.docservice.UpdateTreatmentPlanMaster(entity).subscribe(data => {
        let res=data;
          Swal.fire('Success', 'Details Updated Successfully');
         
          location.href = "#/TreatmentDash"
        
      })
    }
  
}
