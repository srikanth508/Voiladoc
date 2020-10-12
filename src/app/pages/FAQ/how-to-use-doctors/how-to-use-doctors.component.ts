import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-how-to-use-doctors',
  templateUrl: './how-to-use-doctors.component.html',
  styleUrls: ['./how-to-use-doctors.component.css']
})
export class HowToUseDoctorsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }

  public languageid: any;
  public howtouselist: any;
  public term: any;
  public labels: any;
  public id: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {
       
        this.labels = data;

      }, error => {
      }
    )
    // this.activatedroute.params.subscribe(params => {
    //  
    //   this.languageid = params['LanguageID'];

    // }
    // )

    this.activatedroute.params.subscribe(params => {
     

      this.id = params['id'];
      if (this.id != undefined) {

        this.docservice.GetHowToUseDoctorsWeb(this.id).subscribe(
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
    this.docservice.GetHowToUseDoctorsWeb(this.languageid).subscribe(
      data => {
       
        this.howtouselist = data;
      }, error => {
      }
    )
  }
}
