import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-diagnostic-test',
  templateUrl: './edit-diagnostic-test.component.html',
  styleUrls: ['./edit-diagnostic-test.component.css']
})
export class EditDiagnosticTestComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }


  public languageid: any;
  public diagnosticid: any;
  public labels: any;
  public SelectLabel: any;
  public diagnosticname: any;
  public testlist: any;
  public testid: any;
  public id: any;
  public price: any;
  public description: any;
  testtype:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid')
    // this.diagnosticname = localStorage.getItem('user')

    this.activatedroute.params.subscribe(params => {
     
      this.id = params['id'];
      this.getdiagnosticservices()
    }
    )

    this.getlanguage()
    this.getdiagnostictestmaster()
  }

  public getlanguage() {
   
    this.docservice.GetAdmin_MapServiceDiagnostic_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )
  }
  dummlist
  servicelist
  count
  public getdiagnosticservices() {
    this.docservice.GetDiagnosticCenterTestsForDash(this.languageid).subscribe(
      data => {
       
        this.dummlist = data;
        var list = this.dummlist.filter(x => x.id == this.id)
        this.diagnosticname = list[0].diagnosticCenterName
        this.testid = list[0].diagnosticTestID,
          this.price = list[0].price,
          this.description = list[0].description,
          this.diagnosticid = list[0].diagnosticCenterID
          this.testtype=list[0].name

      }, error => {
      }
    )
  }

  public getdiagnostictestmaster() {
   
    this.docservice.GetDiagnosticTestMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.testlist = data;
      }, error => {
      }
    )
  }

  public GetTestID(even) {
   
    this.testid = even.target.value;
  }
  // for (let i = 0; i < this.testlist.length; i++) {
  //  
  //   if (this.testlist[i].id == this.testid) {
  //     this.testname = this.testlist[i].short
  //   }
  // }

  public updatedetails() {
   
    var entity = {
      'ID': this.id,
      'DiagnosticCenterID': this.diagnosticid,
      'DiagnosticTestID': this.testid,
      'Description': this.description,
      'Price': this.price
    }
    this.docservice.UpdateDiagnosticCenterTests(entity).subscribe(data => {
     
      let res = data;
      if(this.languageid==1)
      {
        Swal.fire('Success', 'Updated Successfully')
        location.href = "#/DiagnosticTestDash"
      }
      else if(this.languageid==6)
      {
        Swal.fire('Mis à jour avec Succés')
        location.href = "#/DiagnosticTestDash"
      }
  
    })

  }
}
