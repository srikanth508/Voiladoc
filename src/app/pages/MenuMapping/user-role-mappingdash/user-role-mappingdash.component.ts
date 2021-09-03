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
  public pinno: any;
  public currentpwd: any;
  public labels: any;
  countryid: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
    this.currentpwd = localStorage.getItem('Password');
    this.countryid = localStorage.getItem('Commacountryid');
    if(this.countryid==undefined)
    {
      this.showadd = 1;
    }
    else
    {
      this.showadd = 2;
    }

    this.GetUserRoleList();
    this.getlanguage()

  }


  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  showadd: any;

  public GetUserRoleList() {
    if (this.countryid == undefined) {
    
      this.docservice.GetUsers_RoleMapping(this.languageid).subscribe(
        data => {
          this.userlist = data;
        }, error => {
        }
      )
    }
    else {
     
      this.docservice.GetUsers_RoleMapping(this.languageid).subscribe(
        data => {
          var list = data;
          this.userlist = list.filter(x => x.id == this.countryid)
        }, error => {
        }
      )
    }

  }

  public password: any;
  public mypinno: any;
  public Showpassword: any;
  public oldpassword: any;
  public id: any;
  public firstname: any;
  public lastname: any;
  public phoneno: any;
  public email: any;
  public username: any;
  public roleid: any;




  public getpassword(details) {
    this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.id = details.id,
      this.firstname = details.firstName,
      this.lastname = details.lastName,
      this.phoneno = details.phoneNo,
      this.email = details.email,
      this.username = details.userName,
      this.roleid = details.roleID



    this.Showpassword = 0;
  }





  public Updatedetails() {

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


      Swal.fire('success', 'Password Updated successfully');



    })

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
  public entercurrentpwd: any;




  public CheckPasswordvalidate() {

    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {

      if (this.languageid == 1) {
        Swal.fire('Please Enter Your Pin No && Current password')
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }
      else {
        Swal.fire('Veuillez entrer votre NIP && mot de passe actuel')
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }


    }
    else {
      debugger
      if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
        this.entercurrentpwd = "";
        debugger
      }
      else {

        if (this.languageid == 1) {
          Swal.fire('Please enter valid Pinno and valid password')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
        else {
          Swal.fire('Veuillez saisir un Pinno valide et un mot de passe valide')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }

      }
    }
  }

  // public CheckPasswordvalidate() {

  //   if (this.Enteredpinno == "") {

  //     Swal.fire('Please Enter Your Pin No')

  //   }
  //   else {

  //     if (this.pinno == this.Enteredpinno) {
  //       this.Showpassword = 1;
  //       this.Enteredpinno = ""
  //     }
  //     else {

  //       Swal.fire('You Entered Pin no is invalid')
  //       this.Enteredpinno = ""
  //     }
  //   }
  // }
}
