import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-degree-master-dash',
  templateUrl: './degree-master-dash.component.html',
  styleUrls: ['./degree-master-dash.component.css']
})
export class DegreeMasterDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public degreelist:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getdegreemaster()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  
  public getdegreemaster() {
   
    this.docservice.GetDegreeMasterBylanguageID(this.languageid).subscribe(
      data => {
       
        this.degreelist = data;
      }, error => {
      }
    )
  }


  public DeleteDegreeMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Degree!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDegreeMaster(id).subscribe(res => {
          let test = res;
          this.getdegreemaster()
        })
        Swal.fire(
          'Deleted!',
          'Degree has been deleted.',
          'success'
        )
      }
      else {
        this.getdegreemaster()
      }
    })
  }
}
