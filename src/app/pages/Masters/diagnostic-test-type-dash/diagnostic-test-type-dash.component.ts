import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-diagnostic-test-type-dash',
  templateUrl: './diagnostic-test-type-dash.component.html',
  styleUrls: ['./diagnostic-test-type-dash.component.css']
})
export class DiagnosticTestTypeDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public testslist:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.getdiagnosticcentertests()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public getdiagnosticcentertests() {
   
    this.docservice.GetDiagnosticTestTypeMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.testslist = data;
      }, error => {
      }
    )
  }



  public DeleteDiagnosticTestTypeMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Test!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDiagnosticTestTypeMaster(id).subscribe(res => {
          let test = res;
          this.getdiagnosticcentertests()
        })
        Swal.fire(
          'Deleted!',
          'Test has been deleted.',
          'success'
        )
      }
      else {
        this.getdiagnosticcentertests()
      }
    })
  }
}
