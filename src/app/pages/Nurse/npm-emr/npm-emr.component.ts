import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-npm-emr',
  templateUrl: './npm-emr.component.html',
  styleUrls: ['./npm-emr.component.css']
})
export class NpmEmrComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public appointmentlist: any;
  public term: any;
  public languageid: any;
  public labels: any;
  public patientslist: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getallpatients()
  }


  public getallpatients() {
    this.docservice.GetHomeCareDistinctPatientID(this.languageid).subscribe(
      data => {

        this.patientslist = data;
      }, error => {
      }
    )
  }


  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

}
