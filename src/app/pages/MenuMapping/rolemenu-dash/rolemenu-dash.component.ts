import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rolemenu-dash',
  templateUrl: './rolemenu-dash.component.html',
  styleUrls: ['./rolemenu-dash.component.css']
})
export class RolemenuDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public RoleMappinglist: any;
  public search:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.GetRoleMappinglist()
  }

  public GetRoleMappinglist() {
    this.docservice.GetMenuRoleMappingTable(this.languageid).subscribe(
      data => {
        this.RoleMappinglist = data;
      }, error => {
      }
    )
  }


  public DeleteRoleMapping(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to This Role!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteMenuRoleMappingTableRow(id).subscribe(res => {
          let test = res;
          this.GetRoleMappinglist();
        })
        Swal.fire(
          'Deleted!',
          'Role has deleted.',
          'success'
        )
      }
      else {
        this.GetRoleMappinglist();
      }
    })
  }

}
