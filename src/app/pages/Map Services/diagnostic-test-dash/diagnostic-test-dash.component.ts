import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-diagnostic-test-dash',
  templateUrl: './diagnostic-test-dash.component.html',
  styleUrls: ['./diagnostic-test-dash.component.css']
})
export class DiagnosticTestDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public term: any;
  public servicelist: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public labels1: any;

  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public count: any;
  public labels2: any;
  diagnosticenterid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticenterid = localStorage.getItem('diagnosticid')

    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger;
        this.labels1 = data;
      },

      error => { }
    );

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels2 = data;
      }, error => {
      }
    )

    this.GetDiagnosticServices();

    this.getlanguage();

    this.countryid = 0
    this.cityid = 0
  }

  public getlanguage() {
    debugger
    this.docservice.GetAdmin_MapServiceDiagnostic_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetDiagnosticServices() {
    debugger
    if (this.diagnosticenterid != undefined) {
      this.docservice.GetDiagnosticCenterTestsForDash(this.languageid).subscribe(
        data => {
          debugger
          this.dummlist = data;
     
          this.servicelist = this.dummlist.filter(x => x.diagnosticCenterID == this.diagnosticenterid)
          this.count = this.servicelist.length
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetDiagnosticCenterTestsForDash(this.languageid).subscribe(
        data => {
          debugger
          this.servicelist = data;
          this.dummlist = this.servicelist
          this.count = this.servicelist.length
      
        }, error => {
        }
      )
    }

  }
  public DeleteDiagnostocServces(id) {
    debugger
    this.docservice.DeleteDiagnosticCenterTestsForDash(id).subscribe(
      data => {
        debugger
        Swal.fire("Deleted Successfully");
        this.GetDiagnosticServices();
      }, error => {
      }
    )
  }
  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }









  // public GetCountryMaster() {
  //   this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
  //     data => {
  //       debugger
  //       this.countrylist = data;

  //     }, error => {
  //     }
  //   )
  // }

  // public GetCountryID(even) {
  //   if (even.target.value != 0) {
  //     debugger
  //     this.countryid = even.target.value;

  //     this.servicelist = this.dummlist.filter(x => x.countryID == this.countryid)
  //     this.count = this.servicelist.length
  //     this.getcity();
  //   }
  //   else if (even.target.value == 0) {
  //     this.GetDiagnosticServices()
  //     this.countryid = 0

  //   }
  // }
  // public getcity() {
  //   debugger
  //   this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
  //     data => {
  //       debugger
  //       this.citylist = data;
  //     }, error => {
  //     }
  //   )
  // }


  // public GetCityID(even) {
  //   if (even.target.value != 0) {
  //     debugger
  //     this.cityid = even.target.value;
  //     this.getareamasterbyid()
  //     this.servicelist = this.dummlist.filter(x => x.cityID == this.cityid)
  //     this.count = this.servicelist.length
  //   }
  //   else if (even.target.value == 0) {
  //     this.getcity();
  //     this.areaid = 0;
  //     this.cityid = 0
  //   }
  // }



  // public getareamasterbyid() {
  //   debugger
  //   this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
  //     data => {
  //       debugger
  //       this.arealist = data;

  //     }, error => {
  //     }
  //   )
  // }


  // public GetAreaID(even) {
  //   if (even.target.value != 0) {
  //     debugger
  //     this.areaid = even.target.value;
  //     this.servicelist = this.dummlist.filter(x => x.areaID == this.areaid)
  //     this.count = this.servicelist.length
  //   }
  //   else if (even.target.value == 0) {
  //     this.GetDiagnosticServices()
  //   }
  // }














}