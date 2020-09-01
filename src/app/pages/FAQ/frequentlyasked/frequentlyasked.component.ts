import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-frequentlyasked',
  templateUrl: './frequentlyasked.component.html',
  styleUrls: ['./frequentlyasked.component.css']
})
export class FrequentlyaskedComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public description: any;
  public id: any;
  public showbit: any;
  public faq: any;
  public faqlist: any;
  public term:any;
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
        this.getfaq()
      }
    }
    )
    this.description = ""
  }

  public getfaq() {
    this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
      data => {
        debugger
        this.faqlist = data;

        var list = this.faqlist.filter(x => x.id == this.id)
        this.faq = list[0].faq,
          this.description = list[0].answers
      }, error => {
      }
    )
  }


  public insertdetails() {
    var entity = {
      'Faq': this.faq,
      'answers': this.description,
      'LanguageID':this.languageid
    }
    this.docservice.InsertFrequentlyAskedQuestions(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success','Data Added Successfully')
        location.href = "#/FrequentlyDash"

      }
    })
  }


  public updatedetails() {
    debugger
    var entity = {
      'ID': this.id,
      'Faq': this.faq,
      'answers': this.description
    }
    this.docservice.UpdateFrequentlyAskedQuestions(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success','Data Updated Successfully')
      location.href = "#/FrequentlyDash"

    })
  }


}
