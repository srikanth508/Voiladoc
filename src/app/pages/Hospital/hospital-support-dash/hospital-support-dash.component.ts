import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hospital-support-dash',
  templateUrl: './hospital-support-dash.component.html',
  styleUrls: ['./hospital-support-dash.component.css']
})
export class HospitalSupportDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }


  languageid: any;
  issuelist: any;
  labels: any;
  hospitalid: any;
  term: any;
  dummissuelist: any;
  ngOnInit() {

    this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetSupportIssues()
    this.GetLanguageMaster()
  }


  public GetSupportIssues() {
    this.docservice.GetSupportForWeb(this.languageid, this.hospitalid, 5).subscribe(res => {
      debugger
      this.dummissuelist = res
      this.issuelist = this.dummissuelist.filter(x => x.resolved == 0)
      debugger
    })
  }
  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {
      debugger
      this.labels = res;
      debugger
    })
  }


  photourl: any;

  public GetImageUrl(photoURL) {
    debugger
    this.photourl = photoURL
  }
}
