import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-userrolemapping',
  templateUrl: './userrolemapping.component.html',
  styleUrls: ['./userrolemapping.component.css']
})
export class UserrolemappingComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public languageid: any;
  public rolelist: any;
  public roleid: any;
  public firstname: any;
  public lastname: any;
  public phoneno: any;
  public email: any;
  public username: any;
  public password: any;
  public id: any;
  public showbutton: any;
  public userlist: any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');

    this.activatedroute.params.subscribe(params => {
      
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0
      }
      else if (this.id != undefined) {
        this.showbutton = 1
        this.GetUserRoleList()
      }
    })

   
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
          location.href = "#/UserRoleMappingdash"

        }
      })
    }
  }



  public GetUserRoleList() {
    this.docservice.GetUsers_RoleMapping(this.languageid).subscribe(
      data => {
        this.userlist = data;
        
        var list = this.userlist.filter(x => x.id == this.id)
        this.firstname = list[0].firstName,
          this.lastname = list[0].lastName,
          this.phoneno = list[0].phoneNo,
          this.email = list[0].email,
          this.email = list[0].email,
          this.username = list[0].userName,
          this.username = list[0].userName,
          this.password = list[0].password,
          this.roleid = list[0].roleID
          
      }, error => {
      }
    )
  }


  public Updatedetails() {
    if (this.roleid == "" || this.roleid == undefined) {
      Swal.fire('Please select role')
    }
    else {
      var entity = {
        'ID': this.id,
        'FirstName': this.firstname,
        'LastName': this.lastname,
        'PhoneNo': this.phoneno,
        'Email': this.email,
        'UserName': this.username,
        'Password': this.password,
        'RoleID': this.roleid
      }
      this.docservice.UpdateUsers_RoleMapping(entity).subscribe(data => {
     
          Swal.fire('success', 'Updated successfully');
          location.href = "#/UserRoleMappingdash"

       
      })
    }
  }

}
