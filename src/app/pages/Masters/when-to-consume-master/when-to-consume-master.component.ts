import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-when-to-consume-master',
  templateUrl: './when-to-consume-master.component.html',
  styleUrls: ['./when-to-consume-master.component.css']
})
export class WhenToConsumeMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  public consumelist: any;
  public term: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetWhenConsumemedicals()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetWhenConsumemedicals() {
   
    this.docservice.GetWhenToConsumeMasterMedicalsByLanguageID(this.languageid).subscribe(
      data => {
       
        this.consumelist = data;
      }, error => {
      }
    )
  }


  public DeleteWhenToConsumeMasterMedicals(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Consume Name!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteWhenToConsumeMasterMedicals(id).subscribe(res => {
          let test = res;
         this.GetWhenConsumemedicals()
        })
        Swal.fire(
          'Deleted!',
          'Consume Name has been deleted.',
          'success'
        )
      }
      else {
        this.GetWhenConsumemedicals()
      }
    })
  }
}
