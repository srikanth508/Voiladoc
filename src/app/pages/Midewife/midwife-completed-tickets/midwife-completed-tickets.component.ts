import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-midwife-completed-tickets',
  templateUrl: './midwife-completed-tickets.component.html',
  styleUrls: ['./midwife-completed-tickets.component.css']
})
export class MidwifeCompletedTicketsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  languageid: any;
  issuelist: any;
  labels: any;
  midwifeid: any;
  term: any;
  dummissuelist: any;
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


