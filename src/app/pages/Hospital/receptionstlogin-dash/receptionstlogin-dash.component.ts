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
    debugger
    this.docservice.GetReceiptionistLoginDash(this.hospitalclinicid).subscribe(
      data => {
        debugger
        this.receptionistlogins = data;
        this.count = this.receptionistlogins.length;
      }, error => {
      }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageID).subscribe(
      data => {
        debugger
        this.labels = data;

      }, error => {
      }
    )
  }

}
