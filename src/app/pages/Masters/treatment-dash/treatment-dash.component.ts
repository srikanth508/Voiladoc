import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-treatment-dash',
  templateUrl: './treatment-dash.component.html',
  styleUrls: ['./treatment-dash.component.css']
})
export class TreatmentDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public treatmentlist: any;
  public term: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetTreatments();
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public GetTreatments() {
   
    this.docservice.GetTreatmentPlanMaster(this.languageid).subscribe(
      data => {
       
        this.treatmentlist = data;
      }, error => {
      }
    )
  }


  public DeleteService(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Service!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteTreatmentPlanMaster(id).subscribe(res => {
          let test = res;
         this.GetTreatments()
        })
        Swal.fire(
          'Deleted!',
          'Service has been deleted.',
          'success'
        )
      }
      else {
        this.GetTreatments()
      }
    })
  }
}
