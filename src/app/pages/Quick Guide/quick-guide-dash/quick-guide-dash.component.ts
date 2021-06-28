import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-quick-guide-dash',
  templateUrl: './quick-guide-dash.component.html',
  styleUrls: ['./quick-guide-dash.component.css']
})
export class QuickGuideDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public languageid: any;
  public faq: any;
  public term: any;
  public labels: any;
  public count: any;
  public quicklist: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )


    this.docservice.GetQuickGuide(this.languageid).subscribe(
      data => {
        
        this.quicklist = data;
        this.count = this.quicklist.length;

      }, error => {
      }
    )
  }




  public DeleteQuickGuide(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete Quick Guide!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteQuickGuide(id).subscribe(res => {
          let test = res;

          this.docservice.GetQuickGuide(this.languageid).subscribe(
            data => {

              this.quicklist = data;
              this.count = this.quicklist.length;

            }, error => {
            }
          )
        })
        Swal.fire(
          'Deleted!',
          'Quick Guide been Disabled.',
          'success'
        )
      }
      else {

        this.docservice.GetQuickGuide(this.languageid).subscribe(
          data => {

            this.quicklist = data;
            this.count = this.quicklist.length;

          }, error => {
          }
        )
      }
    })
  }
}
