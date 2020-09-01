import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-diagnostic-package-dash',
  templateUrl: './diagnostic-package-dash.component.html',
  styleUrls: ['./diagnostic-package-dash.component.css']
})
export class DiagnosticPackageDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public term: any;
  public packagelist: any;
  p: number = 1;
  public labels:any;
  public languageid:any;
  public labels1:any;
  

public countryid: any;
public citylist: any;
public cityid: any;
public dummlist: any;
public arealist: any;
public areaid: any;
public countrylist: any;
public count:any;
public labels2:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger;
        this.labels1 = data;
      },
      error => {}
    );

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels2 = data;
      }, error => {
      }
    )
    this.countryid=0
    this.cityid=0
    this.GetDiagnosticPackages();
    this.GetCountryMaster()
  
    this.getlanguage();
  }
  public getlanguage()
  {
    debugger
    this.docservice.GetAdmin_MapServiceDiagnostic_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )  
  }
  public GetDiagnosticPackages() {

    debugger
    this.docservice.GetDiagnosticCenterPackages(this.languageid).subscribe(
      data => {
        debugger
        this.packagelist = data;
      }, error => {
      }
    )
  }
  public DeleteDiagnostocServces(id) {
    debugger
    this.docservice.DeleteDiagnosticCenterPackages(id).subscribe(
      data => {
        debugger
        Swal.fire("Deleted Successfully");
        this.GetDiagnosticPackages();
      }, error => {
      }
    )
  }
  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }




  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.countrylist = data;

      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {
      debugger
      this.countryid = even.target.value;

      this.packagelist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.packagelist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.GetDiagnosticPackages()
      this.countryid=0

    }
  }
  public getcity() {
    debugger
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
        debugger
        this.citylist = data;
      }, error => {
      }
    )
  }


  public GetCityID(even) {
    if (even.target.value != 0) {
      debugger
      this.cityid = even.target.value;
      this.getareamasterbyid()
      this.packagelist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.packagelist.length
    }
    else if (even.target.value == 0) {
      this.getcity();
      this.areaid=0;
      this.cityid=0
    }
  }



  public getareamasterbyid() {
    debugger
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
        debugger
        this.arealist = data;

      }, error => {
      }
    )
  }


  public GetAreaID(even) {
    if (even.target.value != 0) {
      debugger
      this.areaid = even.target.value;
      this.packagelist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.packagelist.length
    }
    else if (even.target.value == 0) {
      this.GetDiagnosticPackages()
    }
  }







}
