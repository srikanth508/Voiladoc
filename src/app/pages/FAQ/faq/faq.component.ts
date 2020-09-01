import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public languageid:any;
  public faq:any;
  public id:any;
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
       if (this.id != undefined) {
       
        this.docservice.GetFrequentlyAskedQuestions(this.id).subscribe(
          data => {
            debugger
            this.faq = data;
            this.faq=this.faq.filter(x=>x.enableDisable==0)
          }, error => {
          }
        )
      }
      else if(this.languageid!=undefined)
      {
        this.getfaq()
      }
    }
    )
    
  }

  public getfaq()
  {
    this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
      data => {
        debugger
        this.faq = data;
        this.faq=this.faq.filter(x=>x.enableDisable==0)
      }, error => {
      }
    )
  }

}
