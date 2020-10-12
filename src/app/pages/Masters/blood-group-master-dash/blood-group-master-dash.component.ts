import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-blood-group-master-dash',
  templateUrl: './blood-group-master-dash.component.html',
  styleUrls: ['./blood-group-master-dash.component.css']
})
export class BloodGroupMasterDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public bloodlist:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.getbloodgroups()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public getbloodgroups() {
    this.docservice.GetBloodGroupMasterWeb(this.languageid).subscribe(
      data => {
       
        this.bloodlist = data;
      }, error => {
      }
    )
  }

  
  public DeleteBloodGroupMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This BloodGroup!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteBloodGroupMaster(id).subscribe(res => {
          let test = res;
          this.getbloodgroups()
        })
        Swal.fire(
          'Deleted!',
          'BloodGroup has been deleted.',
          'success'
        )
      }
      else {
        this.getbloodgroups()
      }
    })
  }
}
