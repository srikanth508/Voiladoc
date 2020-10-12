import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-compaint-dash',
  templateUrl: './compaint-dash.component.html',
  styleUrls: ['./compaint-dash.component.css']
})
export class CompaintDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public complaints:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getcomplaintmaster()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public getcomplaintmaster() {
    this.docservice.GetCompalintMasterLangID(this.languageid).subscribe(
      data => {
       
        this.complaints = data;
      }, error => {
      }
    )
  }



  public DeleteComplaintMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Complaint!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteComplaintMaster(id).subscribe(res => {
          let test = res;
          this.getcomplaintmaster();
        })
        Swal.fire(
          'Deleted!',
          'Complaint has been deleted.',
          'success'
        )
      }
      else {
        this.getcomplaintmaster();
      }
    })
  }

}
