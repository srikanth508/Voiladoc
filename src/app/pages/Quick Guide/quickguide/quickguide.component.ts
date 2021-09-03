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
  pharmacyid: any;
  nurseid: any;
  midwifeid: any;
  physioid: any;
  diagnosticid: any;
  doctorid: any;
  hospitalid: any;
  term: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.pharmacyid = localStorage.getItem('pharmacyid');
    this.nurseid = localStorage.getItem('nurseid');
    this.midwifeid = localStorage.getItem('midwifeid');
    this.physioid = localStorage.getItem('physioid');
    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.doctorid = localStorage.getItem('userid');
    this.hospitalid = localStorage.getItem('hospitalid');


    if (this.doctorid != undefined) {
      this.docservice.GetChapterMaster(this.languageid, 2).subscribe(
        data => {

          this.chapterlist = data;

        }, error => {
        }
      )
    }
    else if (this.nurseid != undefined || this.midwifeid != undefined || this.physioid != undefined) {
      this.docservice.GetChapterMaster(this.languageid, 3).subscribe(
        data => {

          this.chapterlist = data;

        }, error => {
        }
      )
    }
    else if (this.hospitalid != undefined) {
      this.docservice.GetChapterMaster(this.languageid, 4).subscribe(
        data => {

          this.chapterlist = data;

        }, error => {
        }
      )
    }
    else if (this.pharmacyid != undefined) {
      this.docservice.GetChapterMaster(this.languageid, 5).subscribe(
        data => {

          this.chapterlist = data;

        }, error => {
        }
      )
    }
    else if (this.diagnosticid != undefined) {
      this.docservice.GetChapterMaster(this.languageid, 6).subscribe(
        data => {

          this.chapterlist = data;

        }, error => {
        }
      )
    }
    // else if (this.pharmacyid != undefined) {
    //   this.docservice.GetChapterMaster(this.languageid, 8).subscribe(
    //     data => {

    //       this.chapterlist = data;

    //     }, error => {
    //     }
    //   )
    // }



  }

  public GetID(id) {

    this.GetSubchpters(id)
  }

  public GetSubchpters(id) {
    this.subchapterlist = ""
    this.docservice.GetQuickGuideByWeb(id).subscribe(
      data => {

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
