import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doctor-support-dash',
  templateUrl: './doctor-support-dash.component.html',
  styleUrls: ['./doctor-support-dash.component.css']
})
export class DoctorSupportDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  doctorid: any;
  languageid: any;
  issuelist: any;
  term: any;

  ngOnInit() {

    this.doctorid = localStorage.getItem('userid');

    this.languageid = localStorage.getItem('LanguageID');

    this.GetSupportIssues()
  }
  public GetSupportIssues() {
    this.docservice.GetSupportForWeb(this.languageid, this.doctorid, 1).subscribe(res => {
      debugger
      this.issuelist = res;
      debugger
    })
  }
  photourl: any;

  public GetImageUrl(photoURL) {
    debugger
    this.photourl = photoURL
  }
}
