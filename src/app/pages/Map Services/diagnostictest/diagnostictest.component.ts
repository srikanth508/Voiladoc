import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-diagnostictest',
  templateUrl: './diagnostictest.component.html',
  styleUrls: ['./diagnostictest.component.css']
})
export class DiagnostictestComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public diagnosticlist: any;
  public testlist: any;
  public diagnosticid: any;
  public description: any;
  public price: any;
  public testid: any;
  public tablecount: any;
  public count: any;

  public details: any;
  public diagnosticname: any;
  public diagnostictestname: any;
  public diagnotictestname: any;

  public qwerty = [];
  public idcount: any;
  public testname: any;
  public diadd = {};
  public labels: any;
  public languageid: any;
  dummdiagnosticid: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid')
    this.dummdiagnosticid = localStorage.getItem('diagnosticid')
    this.diagnosticname = localStorage.getItem('user')
    this.getlanguage();
    this.getdiagnosticforadmin();
    this.getdiagnostictestmaster();
    this.idcount = 1;


  }
  public getlanguage() {
    debugger
    this.docservice.GetAdmin_MapServiceDiagnostic_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )
  }
  SelectLabel
  public getdiagnosticforadmin() {
    debugger
    this.docservice.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }
  public getdiagnostictestmaster() {
    debugger
    this.docservice.GetDiagnosticTestMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.testlist = data;
      }, error => {
      }
    )
  }
  public GetTestID(even) {
    debugger
    this.testid = even.target.value;

    for (let i = 0; i < this.testlist.length; i++) {
      debugger
      if (this.testlist[i].id == this.testid) {
        this.testname = this.testlist[i].short
      }
    }




    // this.docservice.GetDiagnosticCenterTests(this.testid).subscribe(
    //   data => {
    //     debugger;
    //     this.details = data[0];
    //     debugger;
    //     this.diagnotictestname = this.details.short

    //   }, error => {
    //   }
    // )

  }
  public GetDiagnosticID(item2: any) {
    debugger
    this.diagnosticid = item2.id;
    this.docservice.GetDiagnosticCenterDetailsByID(this.diagnosticid).subscribe(
      data => {
        debugger;
        this.details = data[0];
        debugger;
        this.diagnosticname = this.details.diagnosticCenterName

      }, error => {
      }
    )
  }

  public adddetails() {
    this.tablecount = 1;

    var entity1 = {
      'Sno': this.idcount,
      'DiagnosticCenterID': this.diagnosticid,
      'DiagnosticName': this.diagnosticname,
      'DiagnosticTestID': this.testid,
      'DiagnotiocTestName': this.testname,
      'Description': this.description,
      'Price': this.price
    }
    this.idcount = this.idcount + 1;
    this.qwerty.push(entity1)
    this.description = "";
    this.price = "";
  }
  public insertdetails() {
    debugger
    this.spinner.show();
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'DiagnosticCenterID': this.qwerty[i].DiagnosticCenterID,
        'DiagnosticTestID': this.qwerty[i].DiagnosticTestID,
        'Description': this.qwerty[i].Description,
        'Price': this.qwerty[i].Price,
      }
      this.docservice.InsertDiagnosticCenterTests(entity).subscribe(data => {
        debugger
        if (data != 0) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
          this.tablecount = 0;
          this.spinner.hide();
          location.href = "#/DiagnosticTestDash"
        }
        else {
          Swal.fire("Service Already Exists");
          this.spinner.hide();
          location.href = "#/DiagnosticTestDash"
        }
      })
    }
  }
  public delete(sno) {
    debugger
    for (let i = 0; i < this.qwerty.length; i++) {
      debugger
      if (sno == this.qwerty[i].Sno) {
        debugger
        this.qwerty.splice(i, 1);
      }
    }

  }
}
