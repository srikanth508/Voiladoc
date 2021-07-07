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


  public userid: any;


  public InsertDetails() {
    this.password = Math.random().toString(36).slice(-8);
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
          
          this.pinno = data;
          // this.GetuserRoles();
          this.sendmail();
          Swal.fire('success', 'saved successfully');
          location.href = "#/UserRoleMappingdash"

        }
      })
    }
  }


  pinno: any;
  emailattchementurl = [];
  public doctorname: any;

  public sendmail() {
    
    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.firstname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }


  // public GetuserRoles() {
  //   this.docservice.GetUsers_RoleMapping(this.languageid).subscribe(
  //     data => {
  //       this.userlist = data;
  //       var list= this.userlist.filter(x=>x.)

  //     }, error => {
  //     }
  //   )
  // }



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