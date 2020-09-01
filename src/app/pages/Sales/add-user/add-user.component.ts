import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  public username: any;
  public password: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }
  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }




  public insertdetails() {
    var entity = {
      'UserName': this.username,
      'Password': this.password
    }
    this.docservice.InsertSalesRegistration(entity).subscribe(data => {
      debugger
      if (data != 0) {
        // Swal.fire('Added Successfully.');
        Swal.fire('Completed', 'User saved successfully', 'success');
        location.href="#/SalesDash"

      }

    })
  }
}



