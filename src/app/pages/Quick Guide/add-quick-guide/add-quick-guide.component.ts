import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-quick-guide',
  templateUrl: './add-quick-guide.component.html',
  styleUrls: ['./add-quick-guide.component.css']
})
export class AddQuickGuideComponent implements OnInit {
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

  public tablecount: any;
  public idcount: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )


    this.docservice.GetTopicMaster().subscribe(
      data => {

        this.topiclist = data;

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
    this.idcount = 1;

    this.showvideo = 0;
    this.showphoto = 0;
  }


  public dummshowsignatureurl = []
  public attachments = [];
  public attachmentsurl = [];
  public showphoto: any;

  public onattachmentUpload(abcd) {
    this.dummshowsignatureurl = []
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }


  public uploadattachments() {


    this.docservice.HospitalClinicPhotos(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      this.dummshowsignatureurl.push(res);

      let a = this.dummshowsignatureurl[0].slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
      this.showphoto = b;
      this.attachments.length = 0;
    })
    // this.sendattachment();
  }

  public typeid: any;
  public topicname: any;

  public GetTypeID(even) {
    this.typeid = even.target.value;
  }

  public topicid: any;

  public getTopicID(even) {
    this.topicid = even.target.value;
    var list = this.topiclist.filter(x => x.id == this.topicid)
    this.topicname = list[0].topicName
  }


  public Videoattachmenturl = [];
  public showvideo: any;
  public videoattachmentsss = []

  public onAttchamneVideoupload(abcd) {

    this.dummshowsignatureurl = [];
    this.videoattachmentsss.push(abcd.addedFiles[0]);

    this.uploadvideoattchments();

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }




  public uploadvideoattchments() {
    this.spinner.show()

    this.docservice.HospitalClinicPhotos(this.videoattachmentsss).subscribe(res => {

      this.Videoattachmenturl.push(res);
      this.dummshowsignatureurl.push(res);

      let a = this.dummshowsignatureurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showvideo = b;
      this.videoattachmentsss.length = 0;
      this.spinner.hide();
    })
    // this.sendattachment();
  }






  public qwerty = [];


  public adddetails() {
    this.tablecount = 1;
    var entity = {
      'TopicID': this.topicid,
      'ChapterName': this.chaptername,
      'SubChpterName': this.subchapter,
      'Description': this.description,
      'PhotoUrl': this.attachmentsurl[0],
      'VideoUrl': this.Videoattachmenturl[0],
      'ShowPhoto': this.showphoto,
      'ShowVideo': this.showvideo,
      'TopicName': this.topicname
    }
    this.qwerty.push(entity);
    this.idcount = this.idcount + 1;
    this.attachmentsurl = [];
    this.Videoattachmenturl = [];
    this.attachmentsurl.length = 0;
    this.Videoattachmenturl.length = 0;
    this.showvideo = 0;
    this.showphoto = 0;
    this.subchapter = "",
      this.description = "";
  }

  public chapterid: any;

  public InsertChapterMaster() {
    this.tablecount = 0;
    var entity1 = {
      'TopicID': this.topicid,
      'ChapterName': this.chaptername,
      'TypeID': this.typeid,
      'LanguageID': this.languageid
    }
    this.docservice.InsertChapterMaster(entity1).subscribe(data => {
      this.chapterid = data;

      this.InsertSubChapters();
      Swal.fire('Saved Successfully');
      location.href = "#/QuickGuideDash"
    })
  }


  public InsertSubChapters() {

    for (let i = 0; i < this.qwerty.length; i++) {
      var entity1 = {
        'ChapterID': this.chapterid,
        'SubTopicName': this.qwerty[i].SubChpterName,
        'Description': this.qwerty[i].Description,
        'Photo': this.qwerty[i].PhotoUrl,
        'VideoUrl': this.qwerty[i].VideoUrl
      }
      this.docservice.InsertQuickGuide(entity1).subscribe(data => {
        if (data != 0) {

        }

      })
    }
  }



  public delete(Sno) {

    for (let i = 0; i < this.qwerty.length; i++) {
      if (Sno == this.qwerty[i].Sno) {

        this.qwerty.splice(i, 1);
      }
    }
    if (this.qwerty.length == 0) {
      this.tablecount = 0;
    }

  }
}



