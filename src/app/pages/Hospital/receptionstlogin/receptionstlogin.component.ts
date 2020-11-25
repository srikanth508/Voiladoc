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
  name: any;
  phoneno: any;
  email: any;
  labels: any;
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageID = localStorage.getItem('LanguageID');
    this.getlanguage()
  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageID).subscribe(
      data => {
       
        this.labels = data;

      }, error => {
      }
    )
  }



  public insertdetails() {
    var entity = {
      'HospitalID': this.hospitalclinicid,
      'UserName': this.username,
      'Password': this.password,
      'Name': this.name,
      'Email': this.email,
      'PhoneNo': this.phoneno
    }
    this.docservice.InsertReceiptionistLogin(entity).subscribe(data => {
     
      if (data != 0) {
        // Swal.fire('Added Successfully.');
        if(this.languageID==1)
        {
          Swal.fire('Completed', 'Receptionist saved successfully', 'success');
          location.href = "#/ReceptionstloginDash"
        }
        else{
          Swal.fire('', 'Mis à jour avec succés', 'success');
          location.href = "#/ReceptionstloginDash"
        }
   
      }
      else
      {
        Swal.fire('Completed', 'User Name already exists', 'success');
        location.href = "#/ReceptionstloginDash"
      }

    })
  }

}
