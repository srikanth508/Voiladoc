import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-writearticle',
  templateUrl: './writearticle.component.html',
  styleUrls: ['./writearticle.component.css']
})
export class WritearticleComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public categorylist: any;
  public attachments = [];
  public attachmentsurl = [];
  public doctorid: any;
  public topic: any;
  public subtopic: any;
  public tags: any;
  public writeup: any;
  public categoryid: any;

  public languageid: any;
  public labels: any;
  public mobilewriteup: any;
  public dropzonelable: any;
  public typeid: any;
  public id: any;
  public showicon: any;
  ngOnInit() {

    this.doctorid = localStorage.getItem('userid');

    this.docservice.GetArticleCategory(1).subscribe(
      data => {

        this.categorylist = data;
      }, error => {
      }
    )

    this.writeup = ""
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showicon = 0;
      }
      else {
        this.showicon = 1;
        this.GetArticles()
      }


    }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  public GetCategoryID(even) {

    this.categoryid = even.target.value;
  }

  public onattachmentUpload(abcd) {

    this.attachmentsurl.length = 0;
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();


    Swal.fire('Photo Added Successfully');
    abcd.length = 0;
  }

  public showphotourl = [];
  public showphoto = [];
  public

  public uploadattachments() {

    this.docservice.ArticlePhoto(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);

      let a = this.attachmentsurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }







  subattachmentsurl = []

  public onattachmentUpload1(abcd) {
    this.subattachmentsurl.length = 0

    
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments1();
    if (this.languageid == 1) {
      Swal.fire('Photo Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Photo ajoutée');
      abcd.length = 0;
    }


  }

  subshowphoto = []

  public uploadattachments1() {
    
    this.docservice.ArticlePhoto(this.attachments).subscribe(res => {

      this.subattachmentsurl.push(res);
      
      let a = this.subattachmentsurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.subshowphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }


  public Gettypeid(even) {
    this.typeid = even.target.value;
  }



  showsubphoto: any;
  articlelist: any;
  showphotos: any;
  public GetArticles() {
    this.docservice.GetArticleForAdminForWeb().subscribe(
      data => {

        this.articlelist = data;
        var list = this.articlelist.filter(x => x.id == this.id)
        this.topic = list[0].topic,
          this.subtopic = list[0].subTopic,
          this.writeup = list[0].writeup
        this.tags = list[0].tags
        this.categoryid = list[0].categoryID,
          this.showphotos = list[0].photo,
          this.showsubphoto = list[0].subPhotoUrl,
          this.attachmentsurl[0] = list[0].photossss,
          this.subattachmentsurl[0] = list[0].SubPhotoUrlss,
          this.typeid = list[0].typeID
      },
      error => { }
    );
  }




  public insertdetails() {
    
    document.getElementById("qwerty").innerHTML = this.writeup;
    this.mobilewriteup = document.getElementById("qwerty").innerText;
    var entity = {
      'PhotoURL': this.attachmentsurl[0],
      'Topic': this.topic,
      'SubTopic': this.subtopic,
      'Writeup': this.writeup,
      'Tags': this.tags,
      'CategoryID': this.categoryid,
      'DoctorID': this.doctorid,
      'MobileWriteup': this.mobilewriteup,
      'SubPhotoUrl': this.subattachmentsurl[0],
      'TypeID': this.typeid
    }
    this.docservice.InsertArticle(entity).subscribe(data => {

      if (data != 0) {
        if(this.languageid==1)
        {
          Swal.fire("Published sucessfully");
          location.href = "#/ArticleDash"
  
        }
        else{
          Swal.fire("Publié avec succès");
          location.href = "#/ArticleDash"
  
        }
      
      }
    })
  }





  public UpdateDetails() {
    
    document.getElementById("qwerty").innerHTML = this.writeup;
    this.mobilewriteup = document.getElementById("qwerty").innerText;
    var entity = {
      'ID': this.id,
      'PhotoURL': this.attachmentsurl[0],
      'Topic': this.topic,
      'SubTopic': this.subtopic,
      'Writeup': this.writeup,
      'Tags': this.tags,
      'Date': new Date(),
      'CategoryID': this.categoryid,
      'MobileWriteup': this.mobilewriteup,
      'SubPhotoUrl': this.subattachmentsurl[0],
      'TypeID': this.typeid
    }
    this.docservice.UpdateArticle(entity).subscribe(data => {

      // if (data != 0) {
      Swal.fire("Updated Added Succesfully");
      location.href = "#/ArticleDash"

      // }
    })
  }
}

