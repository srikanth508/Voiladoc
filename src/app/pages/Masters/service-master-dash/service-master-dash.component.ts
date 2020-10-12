import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-service-master-dash',
  templateUrl: './service-master-dash.component.html',
  styleUrls: ['./service-master-dash.component.css']
})
export class ServiceMasterDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public servicelist:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetServicemaster()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetServicemaster() {
    this.docservice.GetServiceMasterWeb(this.languageid).subscribe(
      data => {
       
        this.servicelist = data;
      }, error => {
      }
    )
  }
  
  public DeleteServiceMaster(id) {
   
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
        this.docservice.DeleteServiceMaster(id).subscribe(res => {
          let test = res;
          this.GetServicemaster()
        })
        Swal.fire(
          'Deleted!',
          'Service has been deleted.',
          'success'
        )
      }
      else {
        this.GetServicemaster()
      }
    })
  }
}
