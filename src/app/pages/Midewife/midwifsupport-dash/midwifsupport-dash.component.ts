import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-midwifsupport-dash',
  templateUrl: './midwifsupport-dash.component.html',
  styleUrls: ['./midwifsupport-dash.component.css']
})
export class MidwifsupportDashComponent implements OnInit {
  languageid: any;
  issuelist: any;
  labels: any;
  midwifeid: any;
  term: any;
  dummissuelist: any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.midwifeid = localStorage.getItem('midwifeid');
    this.GetSupportIssues()
    this.GetLanguageMaster()
  }

  public GetSupportIssues() {
    this.docservice.GetSupportForWeb(this.languageid, this.midwifeid, 4).subscribe(res => {
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
