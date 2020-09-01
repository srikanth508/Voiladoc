import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-doctor-tips',
  templateUrl: './doctor-tips.component.html',
  styleUrls: ['./doctor-tips.component.css']
})
export class DoctorTipsComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public description: any;
  public id: any;
  public header: any;
  public showbit: any;
  public tipslist: any;
  public term: any;
  public attachments = [];
  public attachmentsurl = [];
  public labels: any;
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
    this.GetTips()
  }

  public GetTips() {
    this.docservice.GetDoctorTipsAndTricks(this.languageid).subscribe(
      data => {
        debugger
        this.tipslist = data;

        var list = this.tipslist.filter(x => x.id == this.id)
        this.header = list[0].heading,
          this.description = list[0].description
      }, error => {
      }
    )
  }



  public insertdetails() {
    var entity = {
      'Heading': this.header,
      'Description': this.description,
      'PhotoUrl': this.attachmentsurl[0],
      'LanguageID': this.languageid
    }
    this.docservice.InsertDoctorTipsAndTricks(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('success', 'Data Added Successfully')
        location.href = "#/DocTipsDash"
      }
    })
  }

  public updatedetails() {
    var entity = {
      'ID': this.id,
      'Heading': this.header,
      'Description': this.description
    }
    this.docservice.UpdateDoctorTipsAndTricks(entity).subscribe(data => {
      let res = data;
      Swal.fire('success', 'Data Updated Successfully')
      location.href = "#/DocTipsDash"

    })
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

      // this.showphoto.push(b)
      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  }
}
