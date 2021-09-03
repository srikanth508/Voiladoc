import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paid-reports',
  templateUrl: './paid-reports.component.html',
  styleUrls: ['./paid-reports.component.css']
})
export class PaidReportsComponent implements OnInit {
  invoiceslist: any;
  term: any;
  type: any;
  show: number;
  totalamount: any;
  year: any;
  month: any;
  paidlist: any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {
    var date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.type = 1;
    this.show=0;
    this.GetPaidPayments()
  }

  public GetPaidPayments() {
    this.docservice.GetProviderPaidPayments(this.type, this.year, this.month).subscribe(data => {
      this.paidlist = data;
    })
  }

  public GetType(even) {
    this.type = even.target.value;
    this.show=1;
  }

  
  goToLink(transctionPhoto){
    window.open(transctionPhoto, "_blank");
}

public GetYear(even) {
 
  this.year = even.target.value;
  this.GetPaidPayments()
}

public GetMonth(even) {

  this.month = even.target.value;
  this.GetPaidPayments()
}

}
