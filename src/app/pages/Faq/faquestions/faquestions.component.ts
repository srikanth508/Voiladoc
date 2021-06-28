import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-faquestions',
  templateUrl: './faquestions.component.html',
  styleUrls: ['./faquestions.component.css']
})
export class FAQuestionsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public faq: any;
  public id: any;
  public faqlist: any;
  public dummfaqlist: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
      data => {
        
        this.dummfaqlist = data;
        this.faqlist = this.dummfaqlist.filter(x => x.typeID == 2);
        
        
      }, error => {
      }
    )

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

}
