import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.css']
})
export class HowToUseComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public attachments = [];
  public attachmentsurl = [];
  public departmentimage: any;
  public languageid: any;
  public showphoto: any;
  public screenshotname:any;
  public description:any;
  public id:any;
  public showbit:any;
  public labels:any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;

      }, error => {
      }
    )
    this.activatedroute.params.subscribe(params => {
      debugger;

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
      }
    }
    )
    this.description=""
  }

  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.HowToUsePhoto(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  }


  public insertdetails() {

    if(this.attachmentsurl==undefined||this.attachmentsurl.length==0)
    {
      Swal.fire("Please Select Image");
    }
    else{
      var entity = {
        'ScreenShotName': this.screenshotname,
        'Image': this.attachmentsurl[0],
        'Description': this.description,
        'LanguageID':this.languageid
        
      }
      this.docservice.InsertHowToUseVoilaDoc(entity).subscribe(data => {
        if (data != 0) {
          location.href = "#/Howtousedash"
          this.attachmentsurl[0].length=0
        }
      })
    }
      }
}
