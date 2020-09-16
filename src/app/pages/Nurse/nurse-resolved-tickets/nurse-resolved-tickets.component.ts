import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nurse-resolved-tickets',
  templateUrl: './nurse-resolved-tickets.component.html',
  styleUrls: ['./nurse-resolved-tickets.component.css']
})
export class NurseResolvedTicketsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  nurseid:any;
  languageid:any;
  issuelist:any;
  labels:any;
  term:any;
  dummissuelist:any;
  ngOnInit() {
    this.nurseid = localStorage.getItem('nurseid');

    this.languageid = localStorage.getItem('LanguageID');
    this.GetSupportIssues()
    this.GetLanguageMaster()
  }

  public GetSupportIssues() {
    this.docservice.GetSupportForWeb(this.languageid, this.nurseid, 2).subscribe(res => {
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
