import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-edit-quick-guide',
  templateUrl: './edit-quick-guide.component.html',
  styleUrls: ['./edit-quick-guide.component.css']
})
export class EditQuickGuideComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public description: any;
  public id: any;
  public showbit: any;
  public faq: any;
  public faqlist: any;
  public term: any;
  public labels: any;
  public dropzonelable: any;
  public topiclist: any;
  public chaptername: any;
  public subchapter: any;

  public typeid: any;
  public showvideo: any;
  public showphoto: any;
  public quicklist: any;
  public topicid: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    debugger
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      debugger
      this.docservice.GetQuickGuide(this.languageid).subscribe(
        data => {

          this.quicklist = data;
          debugger
          var list = this.quicklist.filter(x => x.id == this.id)
          debugger
          this.typeid = list[0].typeID,
            this.topicid = list[0].topicID,
            this.chpterid = list[0].chapterID,
            this.chaptername = list[0].chapterName,
            this.subchapter = list[0].subTopicName,
            this.description = list[0].description,
            this.typeid = list[0].typeID,
            this.attachmentsurl[0] = list[0].photo,
            this.Videoattachmenturl[0] = list[0].video
          this.docservice.GetTopicMaster().subscribe(
            data => {

              this.topiclist = data;

            }, error => {
            }
          )

        }, error => {
        }
      )

    }
    )



    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.typeid = 0;
    this.description = "";
    this.showvideo = 0;
    this.showphoto = 0;



  }

  public dummshowsignatureurl = []
  public attachments = [];
  public attachmentsurl = [];


  public onattachmentUpload(abcd) {
    this.dummshowsignatureurl = []
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }


  public uploadattachments() {

    debugger
    this.docservice.HospitalClinicPhotos(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.dummshowsignatureurl.push(res);
      debugger
      let a = this.dummshowsignatureurl[0].slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
      this.showphoto = b;
      this.attachments.length = 0;
    })
    // this.sendattachment();
  }


  public GetTypeID(even) {
    this.typeid = even.target.value;
  }



  public getTopicID(even) {
    this.topicid = even.target.value;

  }


  public Videoattachmenturl = [];

  public videoattachmentsss = []

  public onAttchamneVideoupload(abcd) {
    debugger
    this.dummshowsignatureurl = [];
    this.videoattachmentsss.push(abcd.addedFiles[0]);
    debugger
    this.uploadvideoattchments();
    debugger
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }




  public uploadvideoattchments() {
    debugger
    this.docservice.HospitalClinicPhotos(this.videoattachmentsss).subscribe(res => {
      debugger
      this.Videoattachmenturl.push(res);
      this.dummshowsignatureurl.push(res);
      debugger
      let a = this.dummshowsignatureurl[0].slice(2);
      debugger
      let b = 'https://maroc.voiladoc.org' + a;
      this.showvideo = b;
      this.videoattachmentsss.length = 0;
    })
    // this.sendattachment();
  }


  public chpterid: any;

  public UpdateDetails() {
    debugger
    var entity = {
      'ID': this.id,
      'ChapterID': this.chpterid,
      'SubTopicName': this.subchapter,
      'Description': this.description,
      'Photo': this.attachmentsurl[0],
      'VideoUrl': this.Videoattachmenturl[0],
      'TypeID':this.typeid,
      'ChapterName':this.chaptername
    }
    this.docservice.UpdateQuickGuide(entity).subscribe(data => {
      let res = data;
      debugger
      Swal.fire('Updated Successfully');
      location.href="#/QuickGuideDash"
    })
  }

}