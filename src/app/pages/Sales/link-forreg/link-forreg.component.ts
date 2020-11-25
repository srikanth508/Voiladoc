import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-link-forreg',
  templateUrl: './link-forreg.component.html',
  styleUrls: ['./link-forreg.component.css']
})
export class LinkForregComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public typename: any;
  public address: any;
  public notes: any;
  public email: any;
  public username: any;
  public password: any;

  ngOnInit() {
    this.address = "https://voiladoc.org/registration/#/Login";
    this.notes = "Please Click Above Link And Fill The Details";
  }
  public GetTypeName(even) {
    this.typename = even.target.value;
  }

  public sendmails() {
    debugger
    var entity = {
      'emailto': this.email,
      'emailsubject': 'Voiladoc Registrations',
      'emailbody': 'Dear ' + this.username +','+ "<br><br>" + this.address + "<br><br>" + 'Username :' + this.username + "<br>" + 'Password :' + this.password + "<br><br>" + this.notes + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team'
    }
    this.docservice.sendemailsForLinkRegistrations(entity).subscribe(data => {
      debugger
    })
  }

  public Insertdetails() {
    if (this.typename == "" || this.typename == undefined) {
      debugger
      Swal.fire("Please Select Type")
    }
    else {
      this.spinner.show();
      var entity = {
        'TypeID': this.typename,
        'EmailID': this.email,
        'AddressLink': this.address,
        'Notes': this.notes,
        'UserName': this.username,
        'Password': this.password
      }
      this.docservice.InsertLinkForRegistrations(entity).subscribe(data => {
        if (data != 0) {
          debugger
          this.sendmails();
          this.spinner.hide();
          location.href = "#/Linkforregdash"
          Swal.fire('Mail Sent Successfully');
        }
        else {
          debugger
          this.spinner.hide();
          Swal.fire('Username Already Exists. Please Give different Username');
        }
      })
    }
  }



  
}
