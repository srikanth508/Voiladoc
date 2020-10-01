import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-diagnosticpackage',
  templateUrl: './diagnosticpackage.component.html',
  styleUrls: ['./diagnosticpackage.component.css']
})
export class DiagnosticpackageComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  public diagnosticlist: any;
  public diagnosticid: any;
  public details: any;
  public diagnosticname: any;
  public packagename: any;
  public packageprice: any;
  public testlist: any;
  public description: any;
  public testdd = {};
  public testid = [];
  public qwerty = [];
  public tablecount: any;
  public packageid: any;
  public idcount: any;
  public diagnotictestname: any;
  public testnamearray = [];
  public testnamearrayid = [];
  public testname: any;
  public tests: any;
  public testsidd: any;
  public testesids: any;
  public qwerty1 = [];
  public selectedItemsRoot = [];
  public diadd = {};
  public labels: any;
  public languageid: any;
  public dummdiagnosticid: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid')
    this.dummdiagnosticid = localStorage.getItem('diagnosticid')
    this.diagnosticname = localStorage.getItem('user')
    this.getdiagnosticforadmin();
    this.getdiagnostictestmaster();
    this.tablecount = 0;

    this.getlanguage();
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
        this.testdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'short',
          // selectAllText: 'Select All',
          // unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false
        };
      }, error => {
      }
    )
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
  public GetTestID(item: any) {
    debugger
    this.testid.push(item);
  }

  public adddetails() {
    if (this.diagnosticid == undefined) {
      Swal.fire("please Select Diagnostic Center");
    }
    else {



      this.tablecount = 1;
      debugger

      for (let i = 0; i < this.testid.length; i++) {
        this.testnamearray.push(this.testid[i].short);
        debugger
        this.testnamearrayid.push(this.testid[i].id)
      }
      debugger
      this.testname = this.testnamearray;
      this.tests = this.testname.join(',')
      this.testsidd = this.testnamearrayid;
      this.testesids = this.testsidd.join(',')


      var entity1 = {
        'DiagnosticCenterID': this.diagnosticid,
        'DiagnosticName': this.diagnosticname,
        'diagnostictestname': this.tests,
        'PackageName': this.packagename,
        //  'TestID': this.testid[i].id,
        'Price': this.packageprice,
        'Description': this.description
      }

      for (let v = 0; v < this.testid.length; v++) {
        var entity2 = {
          'DiagnosticCenterID': this.diagnosticid,
          'DiagnosticName': this.diagnosticname,
          'diagnostictestname': this.tests,
          'PackageName': this.packagename,
          'TestID': this.testid[v].id,
          'Price': this.packageprice,
          'Description': this.description
        }
        this.qwerty1.push(entity2);

      }
      this.qwerty.push(entity1);


      this.selectedItemsRoot = [];
      this.testnamearray.length = 0
      this.testnamearrayid.length = 0
      this.testid.length = 0
    }
  }
  public insertdetails() {
    this.spinner.show();
    debugger
    var abcd = {
      'DiagnosticCenterID': this.diagnosticid,
      'PackageName': this.packagename,
      'Price': this.packageprice,
      'Description': this.description
    }
    this.docservice.InsertDiagnosticCenterPackages(abcd).subscribe(data => {
      debugger
      if (data != 0) {
        this.packageid = data;
        this.inserttestdetails();
      }
    })

  }
  public inserttestdetails() {
    debugger
    for (let i = 0; i < this.qwerty1.length; i++) {
      var gh = {
        'PackageID': this.packageid,
        'TestID': this.qwerty1[i].TestID
      }
      this.docservice.InsertDiagnosticPackageRelatedTests(gh).subscribe(data => {
        debugger
        if (data != 0) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
          this.tablecount = 0;
          this.testid.length = 0;
          this.spinner.hide();
          location.href = "#/DiagnosticPackageDash"
        }
      })
    }
  }
  public delete(sno) {
    debugger
    for (let i = 0; i < this.qwerty.length; i++) {
      debugger
      if (sno == this.qwerty[i].sno) {
        debugger
        this.qwerty.splice(i, 1);
      }
    }
    debugger
  }
}