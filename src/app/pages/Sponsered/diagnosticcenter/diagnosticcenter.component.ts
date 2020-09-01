import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-diagnosticcenter',
  templateUrl: './diagnosticcenter.component.html',
  styleUrls: ['./diagnosticcenter.component.css']
})
export class DiagnosticcenterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnosticlist: any;
  public diagnosticid: any;
  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public diadd = {}
  public labels: any;
  public languageid: any;
  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    debugger
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    // debugger
    // this.docservice.GetSponsoredDiagnosticCenterForAdmin().subscribe(
    //   data => {
    //     debugger
    //     this.diagnosticlist = data;
    //   }, error => {
    //   }
    // )
 
    this.getdiagnosticforadmin();


  }
  public getlanguage() {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel=this.labels[0].select;
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
          itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }


  public GetDiagnosticID(item2: any) {
    debugger
    this.diagnosticid = item2.id;
  }
  public insertdetails() {
    debugger
    if (this.diagnosticid == undefined) {
      Swal.fire("Please Select Diagnostic Center");

    }
    else {
      var entity = {
        'DiagnosticID': this.diagnosticid,
        'SDate': this.startdate,
        'EDate': this.enddate
      }
      this.docservice.InsertSponsoredDiagnosticCenter(entity).subscribe(data => {
        debugger
        if (data != 0) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
          this.clear();

        }
      })
    }
  }
  public clear() {
    this.startdate = '';
    this.enddate = '';
  }
  public GetEnddate() {
    this.enddate = '';
  }
}
