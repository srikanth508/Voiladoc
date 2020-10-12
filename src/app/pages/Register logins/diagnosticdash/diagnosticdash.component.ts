import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-diagnosticdash',
  templateUrl: './diagnosticdash.component.html',
  styleUrls: ['./diagnosticdash.component.css']
})
export class DiagnosticdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnoticloginlist: any;
  public term: any;
  p: number = 1;
  public labels:any;
  public languageid:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getdiagnosticloginfordash();
 
    this.getlanguage();
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )  
  }
  
  public getdiagnosticloginfordash()
  {
    this.docservice.GetDiagnosticLoginForDash(this.languageid).subscribe(
      data => {
       
        this.diagnoticloginlist = data;
      }, error => {
      }
    )
  }
  public disablediagnostic(docid) {
    this.docservice.DisableDiagnosticLogin(docid).subscribe(
      data => {
       
        Swal.fire('Disabled', 'Diagnostic Center has been Disabled');

        this.getdiagnosticloginfordash();

      }, error => {
      }
    )
  }
  public enablediagnostic(id) {
    this.docservice.EnableDiagnosticLogin(id).subscribe(
      data => {
       
        Swal.fire('Enabled', 'Diagnostic Center has been Enabled');

        this.getdiagnosticloginfordash();

      }, error => {
      }
    )
  }
  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }
}
