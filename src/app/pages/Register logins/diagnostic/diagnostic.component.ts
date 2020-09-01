import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnosticlist: any;
  public diagnosticid: any;
  public username: any;
  public password: any;
  public diadd={}
  public pp:any;
  public labels:any;
  public languageid:any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
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
  public getlanguage()
  {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel=this.labels[0].select;
      }, error => {
      }
    )  
  }
  SelectLabel
  public GetDiagnosticID(item1:any) {
    debugger
    this.diagnosticid =item1.id;
  }
  public insertdetails() {
    debugger
    if (this.diagnosticid == undefined) {
      Swal.fire("Please Select Diagnostic Center");
    }
    else if(this.password!=undefined)  {

      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
        debugger;
        this.pp=1;
      }
    else {
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'UserName': this.username,
        'Password': this.password
      }
      this.docservice.InsertDiagnosticCenterAdminRegistration(entity).subscribe(data => {
        debugger
        if (data != 0) {
          Swal.fire('Registration Completed', 'Details saved successfully', 'success');
          location.href="#/Diagnosticdash"
          this.clear();
          this.pp=0;
        }
      })

    }
  }
}
  public clear() {
    this.username = '';
    this.password = '';
    this.diagnosticid = 0;
  }
}
