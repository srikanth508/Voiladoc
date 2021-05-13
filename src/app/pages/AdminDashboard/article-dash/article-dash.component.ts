import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-article-dash',
  templateUrl: './article-dash.component.html',
  styleUrls: ['./article-dash.component.css']
})
export class ArticleDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public articlelist:any;
  labels:any;
  languageid:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.GetArticles()
    this.getlanguage()
  }



  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetArticles() {
    this.docservice.GetArticleForAdminForWeb().subscribe(
      data => {
       
        this.articlelist = data;
      },
      error => {}
    );
  }




  public GetDisableArticle(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Disable This Article!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Disable it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.GetDisableArticle(id).subscribe(res => {
          let test = res;
          this.GetArticles();
        })
        Swal.fire(
          'Disabled!',
          'Article has been Disabled.',
          'success'
        )
      }
      else {
        this.GetArticles();
      }
    })
  }


  public GetEnableArticle(id) {
   ;
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Enable This Article!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Enable it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.GetEnableArticle(id).subscribe(res => {
          let test = res;
          this.GetArticles();
        })
        Swal.fire(
          'Enabled!',
          'Article has been Enabled.',
          'success'
        )
      }
      else {
        this.GetArticles();
      }
    })
  }

}
