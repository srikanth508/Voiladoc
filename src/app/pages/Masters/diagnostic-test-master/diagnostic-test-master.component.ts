import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-diagnostic-test-master',
  templateUrl: './diagnostic-test-master.component.html',
  styleUrls: ['./diagnostic-test-master.component.css']
})
export class DiagnosticTestMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public testslist: any;
  public testsid: any;
  public description: any;
  public testname: any;
  public id: any;
  public showbit: any;
  public diatests: any;
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
    this.testsid=0
    this.getdiatests();
    this.getlanguage();
    this.getdiagnosticcentertests();
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
      }, error => {
      }
    )
  }

  public GetTestsID(even) {
   
    this.testsid = even.target.value;
  }




  public getdiatests() {
    this.docservice.GetDiagnosticTestMasterByLangID(this.languageid).subscribe(
      data => {
       
        this.diatests = data;
        var list = this.diatests.filter(x => x.id == this.id)

        this.testsid = list[0].testTypeID,
          this.testname = list[0].short,
          this.description = list[0].description
      }, error => {
      }
    )
  }

  public insertdetails() {
    if (this.testsid == 0 || this.testsid == undefined) {
      Swal.fire("Please Select Test Type")
    }
    else {
      this.spinner.show();
      var entity = {
        'Short': this.testname,
        'Description': this.description,
        'TestTypeID': this.testsid,
        'LanguageID': 1
      }
      this.docservice.InsertDiagnosticTestMaster(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          this.spinner.hide();
          location.href = "#/DiaTestDash"
        }
      })
    }
  }



  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID': this.id,
      'Short': this.testname,
      'Description': this.description,
      'TestTypeID': this.testsid,
      'LanguageID': this.languageid
    }
    this.docservice.UpdateDiagnosticTestMaster(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Details Updated Successfully');
      this.spinner.hide();
      location.href = "#/DiaTestDash"

    })
  }

}
