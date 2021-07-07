import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-faq-dash',
  templateUrl: './faq-dash.component.html',
  styleUrls: ['./faq-dash.component.css']
})
export class FaqDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public languageid: any;
  public faq: any;
  public term: any;
  public labels: any;
  public count: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
    this.getfaq()
  }
  dummfaq: any;

  public getfaq() {
    this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
      data => {
        this.dummfaq = data;
        this.faq = data;
        this.count = this.faq.length;
      }, error => {
      }
    )
  }


  typeid: any;

  public GetType(even) {
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.faq = this.dummfaq.filter(x => x.typeID == this.typeid)
      this.count = this.faq.length;
    }
    else {
      this.getfaq();
    }
  }

  public DeleteFrequentlyAskedQuestions(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Item!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteFrequentlyAskedQuestions(id).subscribe(res => {
          let test = res;
          this.getfaq();
        })
        Swal.fire(
          'Deleted!',
          'Item has been deleted.',
          'success'
        )
      }
      else {
        this.getfaq();
      }
    })
  }





  public DisableFrequentlyAskedQuestions(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Disable This Item!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, disable it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DisableFrequentlyAskedQuestions(id).subscribe(res => {
          let test = res;
          this.getfaq();
        })
        Swal.fire(
          'Disabled!',
          'Item has been Disabled.',
          'success'
        )
      }
      else {
        this.getfaq();
      }
    })
  }






  public EnableFrequentlyAskedQuestions(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Enable This Item!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Enable it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.EnableFrequentlyAskedQuestions(id).subscribe(res => {
          let test = res;
          this.getfaq();
        })
        Swal.fire(
          'Enabled!',
          'Item has been Enabled.',
          'success'
        )
      }
      else {
        this.getfaq();
      }
    })
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
