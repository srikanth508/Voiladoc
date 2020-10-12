import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-diagnostic-test-type',
  templateUrl: './diagnostic-test-type.component.html',
  styleUrls: ['./diagnostic-test-type.component.css']
})
export class DiagnosticTestTypeComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels:any;
  public languageid:any;
  public testslist:any;
  public test:any;
  public id:any;
  public showbit:any;
   


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
    this.getdiagnosticcentertests()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public getdiagnosticcentertests() {
   
    this.docservice.GetDiagnosticTestTypeMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.testslist = data;
        var list=this.testslist.filter(x=>x.id==this.id)
        this.test=list[0].name

      }, error => {
      }
    )
  }




  public insertdetails() {
    this.spinner.show();
    var entity = {
      'Name': this.test,
      'LanguageID': 1
    }
    this.docservice.InsertDiagnosticTestTypeMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/DiagnosticTestTypeDash"
      }
    })
  }


  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID':this.id,
      'Name': this.test,
      'LanguageID': this.languageid
    }
    this.docservice.UpdateDiagnosticTestTypeMaster(entity).subscribe(data => {
    let res=data;
        Swal.fire('Success', 'Details Updated Successfully');
        this.spinner.hide();
        location.href = "#/DiagnosticTestTypeDash"
      
    })
  }
}
