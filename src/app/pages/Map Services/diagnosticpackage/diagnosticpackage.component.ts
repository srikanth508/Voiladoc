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
  public searchlable: any;
  public showdropdown: any;
  testslist:any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.diagnosticid = localStorage.getItem('diagnosticid')
    this.dummdiagnosticid = localStorage.getItem('diagnosticid')
    this.diagnosticname = localStorage.getItem('user')
    if (this.dummdiagnosticid == undefined || this.dummdiagnosticid == null) {
      this.showdropdown = 1;
    }

    this.getlanguage();
    this.getdiagnosticforadmin();
    this.getdiagnostictestmaster();
    this.getdiagnosticcentertests();
    this.tablecount = 0;
    this.idcount = 1

  }

  public getdiagnosticcentertests() {

    this.docservice.GetDiagnosticTestTypeMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.testslist = data;
      }, error => {
      }
    )
  }


  public getlanguage() {

    this.docservice.GetAdmin_MapServiceDiagnostic_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;

        this.searchlable = this.labels[0].search;
      }, error => {
      }
    )
  }
  SelectLabel
  public getdiagnosticforadmin() {

    this.docservice.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {
        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.searchlable,
        };

      }, error => {
      }
    )

  }
  public getdiagnostictestmaster() {

    this.docservice.GetDiagnosticTestMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.testlist = data;
        this.testdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'short',
          // selectAllText: 'Select All',
          // unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.searchlable,
        };
      }, error => {
      }
    )
  }
  public GetDiagnosticID(item2: any) {

    this.diagnosticid = item2.id;
    this.docservice.GetDiagnosticCenterDetailsByID(this.diagnosticid).subscribe(
      data => {

        this.details = data[0];

        this.diagnosticname = this.details.diagnosticCenterName

      }, error => {
      }
    )
  }
  public GetTestID(item: any) {

    this.testid.push(item);
  }

  public adddetails() {
    if (this.diagnosticid == undefined || this.testid.length == 0) {
      Swal.fire("please fill all manadatory fields");
    }
    else {
      this.tablecount = 1;

      for (let i = 0; i < this.testid.length; i++) {
        this.testnamearray.push(this.testid[i].short);

        this.testnamearrayid.push(this.testid[i].id)
      }

      this.testname = this.testnamearray;
      this.tests = this.testname.join(',')
      this.testsidd = this.testnamearrayid;
      this.testesids = this.testsidd.join(',')

      var entity1 = {
        'Sno': this.idcount,
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
          // 'TestID': this.testesids,
          'Price': this.packageprice,
          'Description': this.description
        }
        this.qwerty1.push(entity2);
        
      }
      this.qwerty.push(entity1);
      this.idcount = this.idcount + 1;

      this.selectedItemsRoot = [];
      this.testnamearray.length = 0
      this.testnamearrayid.length = 0
      this.testnamearrayid=[];
      this.testid.length = 0;
      this.testid=[];
      this.cleardop = [];
      this.packagename="";
      this.packageprice="";
      this.description="";
    }
  }
  public cleardop: any;


  public insertdetails() {
    this.spinner.show();
    for (let j = 0; j < this.qwerty.length; j++) {
      var abcd = {
        'DiagnosticCenterID': this.diagnosticid,
        'PackageName':this.qwerty[j].PackageName,
        'Price': this.qwerty[j].Price,
        'Description': this.qwerty[j].Description,
      }
      this.docservice.InsertDiagnosticCenterPackages(abcd).subscribe(data => {
        if (data != 0) {
          this.packageid = data;
          this.inserttestdetails();
        }
      })
    }
  }

  
  public inserttestdetails() {

    for (let i = 0; i < this.qwerty1.length; i++) {
      var gh = {
        'PackageID': this.packageid,
        'TestID': this.qwerty1[i].TestID
      }
      this.docservice.InsertDiagnosticPackageRelatedTests(gh).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('Completed', 'Details saved successfully', 'success');
            this.tablecount = 0;
            this.testid.length = 0;
            this.spinner.hide();
            location.href = "#/DiagnosticPackageDash"
          }
          else if (this.languageid == 6) {
            Swal.fire('', 'Mis à jour avec succés', 'success');
            this.tablecount = 0;
            this.testid.length = 0;
            this.spinner.hide();
            location.href = "#/DiagnosticPackageDash"
          }
        }
      })
    }
  }
  public delete(sno) {

    for (let i = 0; i < this.qwerty.length; i++) {

      if (sno == this.qwerty[i].sno) {

        this.qwerty.splice(i, 1);
        this.qwerty.length=0;
        this.qwerty1.length=0;
        this.tablecount=0;
      }
    }

  }
}