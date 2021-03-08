import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-role-mappingdash',
  templateUrl: './user-role-mappingdash.component.html',
  styleUrls: ['./user-role-mappingdash.component.css']
})
export class UserRoleMappingdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public search: any;
  public userlist: any;
  public pinno:any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
    this.GetUserRoleList()
  }


  public GetUserRoleList() {
    this.docservice.GetUsers_RoleMapping(this.languageid).subscribe(
      data => {
        this.userlist = data;
      }, error => {
      }
    )
  }

  public password: any;
  public mypinno: any;
  public Showpassword: any;


  public getpassword(details) {
    this.password = details.password,
      this.mypinno = details.pinno

    this.Showpassword = 0;
  }





  public DeleteUsers_RoleMapping(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to This user!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteUsers_RoleMapping(id).subscribe(res => {
          let test = res;
          this.GetUserRoleList();
        })
        Swal.fire(
          'Deleted!',
          'user has deleted.',
          'success'
        )
      }
      else {
        this.GetUserRoleList();
      }
    })
  }



  public Enteredpinno: any;


  public CheckPasswordvalidate() {
    debugger
    if (this.Enteredpinno == "") {
      debugger
      Swal.fire('Please Enter Your Pin No')

    }
    else {
      debugger
      if (this.pinno == this.Enteredpinno) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
      }
      else {
        debugger
        Swal.fire('You Entered Pin no is invalid')
        this.Enteredpinno = ""
      }
    }
  }
}
