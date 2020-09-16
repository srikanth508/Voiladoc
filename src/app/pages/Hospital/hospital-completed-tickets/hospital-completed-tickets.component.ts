import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hospital-completed-tickets',
  templateUrl: './hospital-completed-tickets.component.html',
  styleUrls: ['./hospital-completed-tickets.component.css']
})
export class HospitalCompletedTicketsComponent implements OnInit {

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
