import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doc-resolved-tickets',
  templateUrl: './doc-resolved-tickets.component.html',
  styleUrls: ['./doc-resolved-tickets.component.css']
})
export class DocResolvedTicketsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  doctorid: any;
  languageid: any;
  issuelist: any;
  term: any;
  labels: any;
  dummissuelist: any;
  ngOnInit() {

    this.doctorid = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');

    this.GetSupportIssues()
    this.GetLanguageMaster()
  }
  public GetSupportIssues() {
    this.docservice.GetSupportForWeb(this.languageid, this.doctorid, 1).subscribe(res => {
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
