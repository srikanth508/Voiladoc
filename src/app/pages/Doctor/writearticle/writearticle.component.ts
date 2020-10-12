import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-writearticle',
  templateUrl: './writearticle.component.html',
  styleUrls: ['./writearticle.component.css']
})
export class WritearticleComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService) { }

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

  ngOnInit() {

    this.doctorid = localStorage.getItem('userid');
   
    this.docservice.GetArticleCategory(1).subscribe(
      data => {
       
        this.categorylist = data;
      }, error => {
      }
    )
    this.writeup=""
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
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
   
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }

    Swal.fire('Photo Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
   
    this.docservice.ArticlePhoto(this.attachments).subscribe(res => {
     
      this.attachmentsurl.push(res);
      this.attachments.length = 0;
     
    })
    // this.sendattachment();
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
      'MobileWriteup':this.mobilewriteup
      }
    this.docservice.InsertArticle(entity).subscribe(data => {
     
      if (data != 0) {
        Swal.fire("Details Added Succesfully");
        location.href="#/Myarticles"

      }
    })
  }
}

