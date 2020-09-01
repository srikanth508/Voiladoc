import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-doc-tips-dash',
  templateUrl: './doc-tips-dash.component.html',
  styleUrls: ['./doc-tips-dash.component.css']
})
export class DocTipsDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid:any;
  public tipslist:any;
  public term:any;
  public labels: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    
    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;

      }, error => {
      }
    )
    this.GetTips()
  }
  public GetTips()
  {
    this.docservice.GetDoctorTipsAndTricks(this.languageid).subscribe(
      data => {
        debugger
        this.tipslist = data;
      }, error => {
      }
    )
  }
  

   
  public DeleteDoctorTipsAndTricks(id) {
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
        this.docservice.DeleteDoctorTipsAndTricks(id).subscribe(res => {
          let test = res;
          this.GetTips();
        })
        Swal.fire(
          'Deleted!',
          'Item has been deleted.',
          'success'
        )
      }
      else {
        this.GetTips();
      }
    })
  }






  
  public DisableDoctorTipsAndTricks(id) {
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
        this.docservice.DisableDoctorTipsAndTricks(id).subscribe(res => {
          let test = res;
          this.GetTips();
        })
        Swal.fire(
          'Disabled!',
          'Item has been Disabled.',
          'success'
        )
      }
      else {
        this.GetTips();
      }
    })
  }






  public EnableDoctorTipsAndTricks(id) {
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
        this.docservice.EnableDoctorTipsAndTricks(id).subscribe(res => {
          let test = res;
          this.GetTips();
        })
        Swal.fire(
          'Enabled!',
          'Item has been Enabled.',
          'success'
        )
      }
      else {
        this.GetTips();
      }
    })
  }
}
