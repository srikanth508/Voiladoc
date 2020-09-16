import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nurse-support-dash',
  templateUrl: './nurse-support-dash.component.html',
  styleUrls: ['./nurse-support-dash.component.css']
})
export class NurseSupportDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  nurseid:any;
  languageid:any;
  issuelist:any;
  labels:any;
  term:any;
  
  ngOnInit() {
    this.nurseid = localStorage.getItem('nurseid');

    this.languageid = localStorage.getItem('LanguageID');
    this.GetSupportIssues()
    this.GetLanguageMaster()
  }

  public GetSupportIssues() {
    this.docservice.GetSupportForWeb(this.languageid, this.nurseid, 2).subscribe(res => {
      debugger
      this.issuelist = res;
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
