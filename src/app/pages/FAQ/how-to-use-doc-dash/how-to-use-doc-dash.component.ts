import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-how-to-use-doc-dash',
  templateUrl: './how-to-use-doc-dash.component.html',
  styleUrls: ['./how-to-use-doc-dash.component.css']
})
export class HowToUseDocDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public howtouselist:any;
  public term:any;
  public labels:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {
       
        this.labels = data;

      }, error => {
      }
    )
    this.GetHowtoUseList();
  }
  public GetHowtoUseList()
  {
    this.docservice.GetHowToUseDoctorsWeb(this.languageid).subscribe(
      data => {
       
        this.howtouselist = data;
      }, error => {
      }
    )
  }


  public DeleteHowToUseDoctorsWeb(id) {
   
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
        this.docservice.DeleteHowToUseDoctorsWeb(id).subscribe(res => {
          let test = res;
          this.GetHowtoUseList();
        })
        Swal.fire(
          'Deleted!',
          'Item has been deleted.',
          'success'
        )
      }
      else {
        this.GetHowtoUseList();
      }
    })
  }

  
  public DisableHowToUseDoctorsWeb(id) {
   
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
        this.docservice.DisableHowToUseDoctorsWeb(id).subscribe(res => {
          let test = res;
          this.GetHowtoUseList();
        })
        Swal.fire(
          'Disabled!',
          'Item has been Disabled.',
          'success'
        )
      }
      else {
        this.GetHowtoUseList();
      }
    })
  }

  public EnableHowToUseDoctorsWeb(id) {
   
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
        this.docservice.EnableHowToUseDoctorsWeb(id).subscribe(res => {
          let test = res;
          this.GetHowtoUseList();
        })
        Swal.fire(
          'Enabled!',
          'Item has been Enabled.',
          'success'
        )
      }
      else {
        this.GetHowtoUseList();
      }
    })
  }
}
