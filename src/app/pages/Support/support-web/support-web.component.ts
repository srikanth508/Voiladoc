import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-support-web',
  templateUrl: './support-web.component.html',
  styleUrls: ['./support-web.component.css']
})
export class SupportWebComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  issuelist: any;
  languageid: any;
  labels: any;
  count: any;
  term: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.GetSupportIssues()
    this.GetLanguageMaster()
  }


  public GetSupportIssues() {
    this.docservice.GetSupportForWebForSupportLogin(this.languageid).subscribe(res => {
      debugger
      this.issuelist = res;
      this.count = this.issuelist.length;
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




  public UpdateSupportForWebResolvedbit(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "This Issue Has Resolved!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Resolved!'
    }).then((result) => {
      if (result.value) {
        this.docservice.UpdateSupportForWebResolvedbit(id).subscribe(res => {
          let test = res;
          this.GetSupportIssues();
        })
        Swal.fire(
          'Resolved!',
          'Issue has been Resolved.',
          'success'
        )
      }
      else {
        this.GetSupportIssues();
      }
    })
  }
}
