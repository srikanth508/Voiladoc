import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-how-to-use-voila-doc',
  templateUrl: './how-to-use-voila-doc.component.html',
  styleUrls: ['./how-to-use-voila-doc.component.css']
})
export class HowToUseVoilaDOcComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public howtouselist: any;
  public term: any;
  public id: any;
  public labels: any;
  
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {
       
        this.labels = data;

      }, error => {
      }
    )
    this.activatedroute.params.subscribe(params => {
     

      this.id = params['id'];
      if (this.id != undefined) {

        this.docservice.GetHowToUseVoilaDoc(this.id).subscribe(
          data => {
           
            this.howtouselist = data;
            this.howtouselist = this.howtouselist.filter(x => x.enableDisable == 0)
          }, error => {
          }
        )
      }
      else if (this.languageid != undefined) {
        this.GetHowtoUseList()
      }
    }
    )
  }
  public GetHowtoUseList() {
    this.docservice.GetHowToUseVoilaDoc(this.languageid).subscribe(
      data => {
       
        this.howtouselist = data;
        this.howtouselist = this.howtouselist.filter(x => x.enableDisable == 0)
      }, error => {
      }
    )
  }

}
