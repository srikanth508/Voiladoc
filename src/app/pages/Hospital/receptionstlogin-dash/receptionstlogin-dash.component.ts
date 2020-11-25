import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-receptionstlogin-dash',
  templateUrl: './receptionstlogin-dash.component.html',
  styleUrls: ['./receptionstlogin-dash.component.css']
})
export class ReceptionstloginDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public receptionistlogins: any;
  public hospitalclinicid: any;
  public term: any;
  languageID
  labels: any;
  count: any;

  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageID = localStorage.getItem('LanguageID');
    this.getreceptionlogin();
    this.getlanguage()
  }

  public getreceptionlogin() {

    this.docservice.GetReceiptionistLoginDash(this.hospitalclinicid).subscribe(
      data => {

        this.receptionistlogins = data;
        this.count = this.receptionistlogins.length;
      }, error => {
      }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageID).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }


  public id: any;
  public username: any;
  public password: any;

  public GetDeatsils(details) {

    debugger
    debugger
    this.id = details.id,
      this.username = details.userName,
      this.password = details.password
  }



  public updatedetails() {
    var entity = {
      'ID': this.id,
      'UserName': this.username,
      'Password': this.password
    }
    this.docservice.UpdateReceiptionistLogin(entity).subscribe(data => {
      if(data!=0)
      {
        if(this.languageID==1)
        {
          Swal.fire('Updated Successfully');
          this.getreceptionlogin();
          document.getElementById('close').click();
        }
        else
        {
          Swal.fire('','Mis à jour avec succés');
          this.getreceptionlogin();
          document.getElementById('close').click();
        }
   
      }
      else{
        Swal.fire('User Name Already Exists');
        this.getreceptionlogin();
        document.getElementById('close').click();
      }
     
    })
  }
}
