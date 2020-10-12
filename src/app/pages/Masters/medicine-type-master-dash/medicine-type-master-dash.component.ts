import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medicine-type-master-dash',
  templateUrl: './medicine-type-master-dash.component.html',
  styleUrls: ['./medicine-type-master-dash.component.css']
})
export class MedicineTypeMasterDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  public medicinelist: any;
  public term: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.Getmedicinetypemaster();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public Getmedicinetypemaster() {
   
    this.docservice.GetMedicineTypeMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.medicinelist = data;
      }, error => {
      }
    )
  }

  public DeleteMedicineTypeMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Medicine Type!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteMedicineTypeMaster(id).subscribe(res => {
          let test = res;
          this.Getmedicinetypemaster()
        })
        Swal.fire(
          'Deleted!',
          'Medicine Type has been deleted.',
          'success'
        )
      }
      else {
        this.Getmedicinetypemaster()
      }
    })
  }
}
