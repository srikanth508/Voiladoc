import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-howtousedash',
  templateUrl: './howtousedash.component.html',
  styleUrls: ['./howtousedash.component.css']
})
export class HowtousedashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }

  public languageid: any;
  public howtouselist:any;
  public term:any;
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
    this.GetHowtoUseList();
  }
  public GetHowtoUseList()
  {
    this.docservice.GetHowToUseVoilaDoc(this.languageid).subscribe(
      data => {
        debugger
        this.howtouselist = data;
      }, error => {
      }
    )
  }


  public DeleteHowToUseVoilaDoc(id) {
    debugger;
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
        this.docservice.DeleteHowToUseVoilaDoc(id).subscribe(res => {
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







  
  public DisableHowToUseVoilaDoc(id) {
    debugger;
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
        this.docservice.DisableHowToUseVoilaDoc(id).subscribe(res => {
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






  public EnableHowToUseVoilaDoc(id) {
    debugger;
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
        this.docservice.EnableHowToUseVoilaDoc(id).subscribe(res => {
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
