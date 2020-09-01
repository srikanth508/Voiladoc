import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-department-dash',
  templateUrl: './department-dash.component.html',
  styleUrls: ['./department-dash.component.css']
})
export class DepartmentDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public departmentlist:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getdepartmentmaster();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }

  public getdepartmentmaster() {
    debugger
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.departmentlist = data;
      }, error => {
      }
    )
  }


  public DeleteDepartmentMaster(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Departmenrt!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDepartmentMaster(id).subscribe(res => {
          let test = res;
          this.getdepartmentmaster()
        })
        Swal.fire(
          'Deleted!',
          'Departmenrt has been deleted.',
          'success'
        )
      }
      else {
        this.getdepartmentmaster()
      }
    })
  }
}
