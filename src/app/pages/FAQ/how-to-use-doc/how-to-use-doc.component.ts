import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-how-to-use-doc',
  templateUrl: './how-to-use-doc.component.html',
  styleUrls: ['./how-to-use-doc.component.css']
})
export class HowToUseDocComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public attachments = [];
  public attachmentsurl = [];
  public departmentimage: any;
  public languageid: any;
  public showphoto: any;
  public screenshotname: any;
  public description: any;
  public id: any;
  public showbit: any;
  public labels: any;
  public howtouselist: any;
  public imageurl: any;
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
    this.description = ""
    this.GetHowtoUseList()
  }




  public GetHowtoUseList() {
    this.docservice.GetHowToUseDoctorsWeb(this.languageid).subscribe(
      data => {
        debugger
        this.howtouselist = data;
        var list = this.howtouselist.filter(x => x.id == this.id)
        this.screenshotname = list[0].screenShotName,
          this.imageurl = list[0].image
        this.description = list[0].description,
          this.attachmentsurl[0] = list[0].imageurl
      }, error => {
      }
    )
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

    if (this.attachmentsurl == undefined || this.attachmentsurl.length == 0) {
      Swal.fire("Please Select Image");
    }
    else {
      var entity = {
        'ScreenShotName': this.screenshotname,
        'Image': this.attachmentsurl[0],
        'Description': this.description,
        'LanguageID': this.languageid
      }
      this.docservice.InsertHowToUseDoctorsWeb(entity).subscribe(data => {
        if (data != 0) {
          location.href = "#/HowToUseDocDash"
          this.attachmentsurl[0].length = 0
        }
      })
    }
  }



  public updatedetails() {
    debugger
    var entity = {
      'ID': this.id,
      'ScreenShotName': this.screenshotname,
      'Image': this.attachmentsurl[0],
      'Description': this.description
    }
    this.docservice.UpdateHowToUseDoctorsWeb(entity).subscribe(data => {
      let res = data;
      location.href = "#/HowToUseDocDash"
      Swal.fire('Updated Successfully')
      this.attachmentsurl[0].length = 0

    })
  }


}
