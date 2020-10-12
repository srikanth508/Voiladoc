import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-doctor-tips-and-tricks',
  templateUrl: './doctor-tips-and-tricks.component.html',
  styleUrls: ['./doctor-tips-and-tricks.component.css']
})
export class DoctorTipsAndTricksComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public tipslist: any;
  public term: any;
  public id: any;
  public labels:any;
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

        this.docservice.GetDoctorTipsAndTricks(this.id).subscribe(
          data => {
           
            this.tipslist = data;
            this.tipslist = this.tipslist.filter(x => x.enableDisable == 0)
          }, error => {
          }
        )
      }
      else if (this.languageid != undefined) {
        this.GetTips()
      }
    }
    )
  }
  public GetTips() {
    this.docservice.GetDoctorTipsAndTricks(this.languageid).subscribe(
      data => {
       
        this.tipslist = data;
        this.tipslist = this.tipslist.filter(x => x.enableDisable == 0)
      }, error => {
      }
    )
  }


  public GetPdf(pdf) {
    window.open(pdf, '_blank');
  }
}
