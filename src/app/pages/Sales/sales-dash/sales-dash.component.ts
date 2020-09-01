import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-dash',
  templateUrl: './sales-dash.component.html',
  styleUrls: ['./sales-dash.component.css']
})
export class SalesDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnoticloginlist: any;
  public term: any;
  p: number = 1;
  public labels:any;
  public languageid:any;
  public saleslist:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetSalesReg()
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )  
  }


  public GetSalesReg()
  {
    this.docservice.GetSalesRegistration().subscribe(
      data => {
        debugger
        this.saleslist = data;
      }, error => {
      }
    )  
  }
  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }

  public DisableSalesRegistration(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Enable This User!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Enable it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DisableSalesRegistration(id).subscribe(res => {
          let test = res;
          this.GetSalesReg();
        })
        Swal.fire(
          'Deleted!',
          'User has been Enabled.',
          'success'
        )
      }
      else {
        this.GetSalesReg();
      }
    })
  }


  public EnableSalesRegistration(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Disable This User!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Disable it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.EnableSalesRegistration(id).subscribe(res => {
          let test = res;
          this.GetSalesReg();
        })
        Swal.fire(
          'Deleted!',
          'User has been Disabled.',
          'success'
        )
      }
      else {
        this.GetSalesReg();
      }
    })
  }
}
