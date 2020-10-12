import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-specilization-dash',
  templateUrl: './specilization-dash.component.html',
  styleUrls: ['./specilization-dash.component.css']
})
export class SpecilizationDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public specilisationlist:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getspecilicationmaster();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }


  public getspecilicationmaster() {
   
    this.docservice.GetSpecilaizationMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.specilisationlist = data;


      }, error => {
      }
    )
  }
  public DeleteSpecilaizationMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Specilization!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteSpecilaizationMaster(id).subscribe(res => {
          let test = res;
         this.getspecilicationmaster()
        })
        Swal.fire(
          'Deleted!',
          'Specilization has been deleted.',
          'success'
        )
      }
      else {
        this.getspecilicationmaster()
      }
    })
  }
}
