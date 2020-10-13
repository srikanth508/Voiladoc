import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-userrolemapping',
  templateUrl: './userrolemapping.component.html',
  styleUrls: ['./userrolemapping.component.css']
})
export class UserrolemappingComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public rolelist: any;
  public roleid: any;
  public firstname: any;
  public lastname: any;
  public phoneno: any;
  public email: any;
  public username: any;
  public password: any;



  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.GetRoleMaster()
  }



  public GetRoleMaster() {
    this.docservice.GetRoleTypesMasterByAdminLogins(this.languageid).subscribe(
      data => {

        this.rolelist = data;
      }, error => {
      }
    )
  }



  public GetRoleID(even) {
    this.roleid = even.target.value;
  }


  public InsertDetails() {
    if (this.roleid == "" || this.roleid == undefined) {
      Swal.fire('Please select role')
    }
    else {
      var entity = {
        'FirstName': this.firstname,
        'LastName': this.lastname,
        'PhoneNo': this.phoneno,
        'Email': this.email,
        'UserName': this.username,
        'Password': this.password,
        'RoleID': this.roleid
      }
      this.docservice.InsertUsers_RoleMapping(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('success', 'saved successfully');
          location.href="#/UserRoleMappingdash"
          
        }
      })
    }
  }
}
