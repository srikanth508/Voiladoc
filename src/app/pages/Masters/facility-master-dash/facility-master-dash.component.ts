import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-facility-master-dash',
  templateUrl: './facility-master-dash.component.html',
  styleUrls: ['./facility-master-dash.component.css']
})
export class FacilityMasterDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public facilitylist:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getfacilititymaster();

  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public getfacilititymaster() {
   
    this.docservice.GetFacilitiesMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.facilitylist = data;

  
      }, error => {
      }
    )
  }
  public DeleteFacilitiesMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Facility!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteFacilitiesMaster(id).subscribe(res => {
          let test = res;
          this.getfacilititymaster()
        })
        Swal.fire(
          'Deleted!',
          'Facility has been deleted.',
          'success'
        )
      }
      else {
        this.getfacilititymaster()
      }
    })
  }
}
