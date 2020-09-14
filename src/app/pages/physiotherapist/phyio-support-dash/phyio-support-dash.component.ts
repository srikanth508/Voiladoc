import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-phyio-support-dash',
  templateUrl: './phyio-support-dash.component.html',
  styleUrls: ['./phyio-support-dash.component.css']
})
export class PhyioSupportDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }


  languageid:any;
  issuelist:any;
  labels:any;
  physioid:any;
  ngOnInit() {
    this.physioid = localStorage.getItem('physioid');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetSupportIssues()
    this.GetLanguageMaster()
  }
  public GetSupportIssues() {
    this.docservice.GetSupportForWeb(this.languageid, this.physioid, 3).subscribe(res => {
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
