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
   
    this.docservice.GetPharmacyOfferByPharmacyID(this.pharmacyid).subscribe(
      data => {
       
        this.offerslist = data;
      }, error => {
      }
    )
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_PharmacyLoginOffers_Lable(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    ) 
  }
  // public deletepharmacyoffer(id)
  // {
   
  //   this.docservice.DeletePharmacyOffer(id).subscribe(
  //     data => {
  //       if(this.languageid==1)
  //       {
  
  //         Swal.fire("Deleted Successfully");
  //         this.getpharmacyoffersbypharmacyid();
  //       }
  //       else{
  //         Swal.fire("Supprimé avec succès");
  //         this.getpharmacyoffersbypharmacyid();
  //       }
     
  //     }, error => {
  //     }
  //   )
  // }
  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }








  public deletepharmacyoffer(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Offer!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeletePharmacyOffer(id).subscribe(res => {
            let test = res;
            this.ngOnInit()
          })
          Swal.fire(
            'Deleted!',
            'Deleted Successfully.',
            'success'
          )
        }
        else {
          this.ngOnInit()
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Non!',
        cancelButtonText: 'Oui'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeletePharmacyOffer(id).subscribe(res => {
            let test = res;
            this.ngOnInit()
          })
          Swal.fire(
            'Supprimé!',
            'Supprimé avec succès.',
            'success'
          )
        }
        else {
          this.ngOnInit()
        }
      })
    }

  }
}
