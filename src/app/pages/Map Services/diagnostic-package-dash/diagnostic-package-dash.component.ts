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
  public dummpackagelist: any;
  dummdiagnosticid: any;
  diagnosticname: any;


  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticenterid = localStorage.getItem('diagnosticid')
    this.dummdiagnosticid = localStorage.getItem('diagnosticid')
    this.diagnosticname = localStorage.getItem('user')

    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      },
      error => { }
    );

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {

        this.labels2 = data;
      }, error => {
      }
    )
    this.countryid = 0
    this.cityid = 0
    this.GetDiagnosticPackages();
    // this.GetCountryMaster()

    this.getlanguage();
  }
  public getlanguage() {

    this.docservice.GetAdmin_MapServiceDiagnostic_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  public GetDiagnosticPackages() {


    if (this.diagnosticenterid != undefined) {
      this.docservice.GetDiagnosticCenterPackages(this.languageid).subscribe(
        data => {

          this.dummpackagelist = data;
          this.packagelist = this.dummpackagelist.filter(x => x.diagnosticCenterID == this.diagnosticenterid)
          this.count = this.packagelist.length;
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetDiagnosticCenterPackages(this.languageid).subscribe(
        data => {

          this.dummpackagelist = data;
          this.packagelist = this.dummpackagelist
          this.count = this.packagelist.length;

        }, error => {
        }
      )
    }
  }
  public DeleteDiagnostocServces(id) {

    this.docservice.DeleteDiagnosticCenterPackages(id).subscribe(
      data => {

        if (this.languageid == 1) {
          Swal.fire("Deleted Successfully");
          this.GetDiagnosticPackages();
        }
        else if (this.languageid == 6) {
          Swal.fire("Supprimé avec succès");
          this.GetDiagnosticPackages();
        }

      }, error => {
      }
    )
  }
  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }




  // public GetCountryMaster() {
  //   this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
  //     data => {
  //      
  //       this.countrylist = data;

  //     }, error => {
  //     }
  //   )
  // }

  // public GetCountryID(even) {
  //   if (even.target.value != 0) {
  //    
  //     this.countryid = even.target.value;

  //     this.packagelist = this.dummlist.filter(x => x.countryID == this.countryid)
  //     this.count = this.packagelist.length
  //     this.getcity();
  //   }
  //   else if (even.target.value == 0) {
  //     this.GetDiagnosticPackages()
  //     this.countryid = 0

  //   }
  // }
  // public getcity() {
  //  
  //   this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
  //     data => {
  //      
  //       this.citylist = data;
  //     }, error => {
  //     }
  //   )
  // }


  // public GetCityID(even) {
  //   if (even.target.value != 0) {
  //    
  //     this.cityid = even.target.value;
  //     this.getareamasterbyid()
  //     this.packagelist = this.dummlist.filter(x => x.cityID == this.cityid)
  //     this.count = this.packagelist.length
  //   }
  //   else if (even.target.value == 0) {
  //     this.getcity();
  //     this.areaid = 0;
  //     this.cityid = 0
  //   }
  // }



  // public getareamasterbyid() {
  //  
  //   this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
  //     data => {
  //      
  //       this.arealist = data;

  //     }, error => {
  //     }
  //   )
  // }


  // public GetAreaID(even) {
  //   if (even.target.value != 0) {
  //    
  //     this.areaid = even.target.value;
  //     this.packagelist = this.dummlist.filter(x => x.areaID == this.areaid)
  //     this.count = this.packagelist.length
  //   }
  //   else if (even.target.value == 0) {
  //     this.GetDiagnosticPackages()
  //   }



  public packagename: any;
  public packageprice: any;
  public packageDescription: any;

  public id: any;

  public GetPackages(details) {
    
    this.id=details.id
    this.packagename = details.packageName
    this.packageDescription = details.description
    this.packageprice = details.price
  }


  public UpdatePackages() {
    var entity = {
      'ID': this.id,
      'PackageName': this.packagename,
      'Description': this.packageDescription,
      'Price': this.packageprice,
      'LanguageID': this.languageid
    }
    this.docservice.UpdateDiagnosticCenterPackages(entity).subscribe(data => {
      let res = data;
      if (this.languageid == 1) {
        Swal.fire('Success', 'Updated Successfully');
        this.GetDiagnosticPackages();
      }
      else {
        Swal.fire('Succès', 'Mis à jour avec succés');
        this.GetDiagnosticPackages();
      }

    })
  }



}
