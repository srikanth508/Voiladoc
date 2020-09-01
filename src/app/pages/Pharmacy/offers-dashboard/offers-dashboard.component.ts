import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offers-dashboard',
  templateUrl: './offers-dashboard.component.html',
  styleUrls: ['./offers-dashboard.component.css']
})
export class OffersDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public pharmacyid: any;
  public offerslist: any;
  p: number = 1;
  public term:any;
  public languageid:any;
  public labels:any;
  ngOnInit() {
    this.pharmacyid = localStorage.getItem('pharmacyid');
    this.getpharmacyoffersbypharmacyid();
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
  }
  public getpharmacyoffersbypharmacyid() {
    debugger
    this.docservice.GetPharmacyOfferByPharmacyID(this.pharmacyid).subscribe(
      data => {
        debugger
        this.offerslist = data;
      }, error => {
      }
    )
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_PharmacyLoginOffers_Lable(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    ) 
  }
  public deletepharmacyoffer(id)
  {
    debugger
    this.docservice.DeletePharmacyOffer(id).subscribe(
      data => {
        debugger
       Swal.fire("Deleted Successfully");
       this.getpharmacyoffersbypharmacyid();
      }, error => {
      }
    )
  }
  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }
}
