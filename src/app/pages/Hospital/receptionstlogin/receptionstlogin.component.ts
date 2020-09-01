import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-receptionstlogin',
  templateUrl: './receptionstlogin.component.html',
  styleUrls: ['./receptionstlogin.component.css']
})
export class ReceptionstloginComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public username: any;
  public password: any;
  public hospitalclinicid: any;
  languageID: any;

  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageID = localStorage.getItem('LanguageID');
  }

  public insertdetails() {
    var entity = {
      'HospitalID': this.hospitalclinicid,
      'UserName': this.username,
      'Password': this.password
    }
    this.docservice.InsertReceiptionistLogin(entity).subscribe(data => {
      debugger
      if (data != 0) {
        // Swal.fire('Added Successfully.');
        Swal.fire('Completed', 'Receptionist saved successfully', 'success');
        location.href = "#/ReceptionstloginDash"
      }

    })
  }

}
