import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-faquestions',
  templateUrl: './faquestions.component.html',
  styleUrls: ['./faquestions.component.css']
})
export class FAQuestionsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private spinner: NgxSpinnerService) { }
  public languageid: any;
  public faq: any;
  public id: any;
  public faqlist: any;
  public dummfaqlist: any;
  public pharmacyid: any;
  public nurseid: any;
  public midwifeid: any;
  public physioid: any;
  public diagnosticid: any;
  public doctorid: any;
  public hospitalid: any;
  term: any;

  ngOnInit() {

    this.spinner.show()
    this.languageid = localStorage.getItem('LanguageID');

    this.pharmacyid = localStorage.getItem('pharmacyid');
    this.nurseid = localStorage.getItem('nurseid');
    this.midwifeid = localStorage.getItem('midwifeid');
    this.physioid = localStorage.getItem('physioid');
    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.doctorid = localStorage.getItem('userid');
    this.hospitalid = localStorage.getItem('hospitalid');

    if (this.doctorid != undefined) {
      this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {

          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter(x => x.typeID == 2);
          this.spinner.hide();
        }, error => {
        }
      )

    }
    else if (this.nurseid != undefined || this.midwifeid != undefined || this.physioid != undefined) {
      this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {
          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter(x => x.typeID == 3);
          this.spinner.hide();


        }, error => {
        }
      )
    }
    else if (this.hospitalid != undefined) {
      this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {

          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter(x => x.typeID == 4);
          this.spinner.hide();


        }, error => {
        }
      )
    }

    else if (this.pharmacyid != undefined) {
      this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {

          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter(x => x.typeID == 5);
          this.spinner.hide();

        }, error => {
        }
      )
    }
    else if (this.diagnosticid != undefined) {
      this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
        data => {

          this.dummfaqlist = data;
          this.faqlist = this.dummfaqlist.filter(x => x.typeID == 6);
          this.spinner.hide();

        }, error => {
        }
      )
    }



  }


  public openacc(poid) {

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }



  public showimages: any;

  public GetImagesID(id) {
    this.docservice.GetFAQ_Attachments(id).subscribe(
      data => {
        this.showimages = data;

      }, error => {
      }
    )
  }

  answers: any;

  GetID(data) {
    debugger
    this.answers = data.answers;
  }

}
