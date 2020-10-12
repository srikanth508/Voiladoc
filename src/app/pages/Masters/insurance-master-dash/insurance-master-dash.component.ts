import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insurance-master-dash',
  templateUrl: './insurance-master-dash.component.html',
  styleUrls: ['./insurance-master-dash.component.css']
})
export class InsuranceMasterDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public insurancelist:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getinsurancemaster();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public getinsurancemaster() {
   
    this.docservice.GetInsuranceMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.insurancelist = data;
   

      }, error => {
      }
    )
  }

  
  public DeleteInsuranceMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Insurance!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteInsuranceMaster(id).subscribe(res => {
          let test = res;
          this.getinsurancemaster()
        })
        Swal.fire(
          'Deleted!',
          'Insurance has been deleted.',
          'success'
        )
      }
      else {
        this.getinsurancemaster()
      }
    })
  }
}
