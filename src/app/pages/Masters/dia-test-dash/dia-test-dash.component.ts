import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dia-test-dash',
  templateUrl: './dia-test-dash.component.html',
  styleUrls: ['./dia-test-dash.component.css']
})
export class DiaTestDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  public diatests: any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getdiatests();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public getdiatests() {
    this.docservice.GetDiagnosticTestMasterByLangID(this.languageid).subscribe(
      data => {
       
        this.diatests = data;
      }, error => {
      }
    )
  }


  
  public DeleteDiagnosticTestMaster(id) {
   
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
        this.docservice.DeleteDiagnosticTestMaster(id).subscribe(res => {
          let test = res;
          this.getdiatests()
        })
        Swal.fire(
          'Deleted!',
          'Test has been deleted.',
          'success'
        )
      }
      else {
        this.getdiatests()
      }
    })
  }
}
