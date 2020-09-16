import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recp-support-completed',
  templateUrl: './recp-support-completed.component.html',
  styleUrls: ['./recp-support-completed.component.css']
})
export class RecpSupportCompletedComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  languageid: any;
  issuelist: any;
  labels: any;
  receptionid: any;
  term: any;
  dummissuelist: any;
  ngOnInit() {
    this.receptionid = localStorage.getItem('Receptionstid');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetSupportIssues()
    this.GetLanguageMaster()
  }
  public GetSupportIssues() {
    this.docservice.GetSupportForWeb(this.languageid, this.receptionid, 6).subscribe(res => {
      debugger

      this.dummissuelist = res
      this.issuelist = this.dummissuelist.filter(x => x.resolved == 1)
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

  
  resolvephotourl: any;

  public GetResolvePhotoUrl(resolveDescription) {
    this.resolvephotourl = resolveDescription
  }

}
