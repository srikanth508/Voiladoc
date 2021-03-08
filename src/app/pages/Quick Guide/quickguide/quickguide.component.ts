import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-quickguide',
  templateUrl: './quickguide.component.html',
  styleUrls: ['./quickguide.component.css']
})
export class QuickguideComponent implements OnInit {
  panelOpenState = false;
  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public chapterlist: any;
  subchapterlist: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetChapterMaster(this.languageid).subscribe(
      data => {
        debugger
        this.chapterlist = data;

      }, error => {
      }
    )

  }

  public GetID(id) {
    debugger
    this.GetSubchpters(id)
  }

  public GetSubchpters(id) {

    this.docservice.GetQuickGuideByWeb(id).subscribe(
      data => {
        debugger
        this.subchapterlist = data;

      }, error => {
      }
    )
  }

  public description: any;
  public photo: any;
  public video: any;

  public GetData(data) {
    this.description = data.description,
      this.photo = data.photoUrl,
      this.video = data.videoUrl

  }

}
