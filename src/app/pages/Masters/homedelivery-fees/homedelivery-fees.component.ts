import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgStyle } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-homedelivery-fees',
  templateUrl: './homedelivery-fees.component.html',
  styleUrls: ['./homedelivery-fees.component.css']
})
export class HomedeliveryFeesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public languageid: any;
  public term: any;
  labels: any;
  charges: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.gethomedeliveycharges()
  }

  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }



  public gethomedeliveycharges() {
    this.docservice.GetHomeVisitDeliveryChargesMaster(this.languageid).subscribe(
      data => {

        this.charges = data;
      }, error => {
      }
    )
  }
  deliverycharges: any;
  meridionalcommission: any;
  deliveryPatnerFees: any;
  id: any;

  public GetDetails(list) {
    this.deliverycharges = list.deliveryCharges,
      this.meridionalcommission = list.meridionalCommision,
      this.deliveryPatnerFees = list.deliveryPatnerFees,
      this.id = list.id
  }


  public GetCommission(even) {
    if (even > this.deliverycharges) {
      
      this.meridionalcommission = 0;
      this.deliveryPatnerFees = 0
    }
    else {
      
      this.deliveryPatnerFees = Number(this.deliverycharges) - Number(this.meridionalcommission);
    }
  }



  public updatedetails() {
    var entity = {
      'ID': this.id,
      'DeliveryCharges': this.deliverycharges,
      'MeridionalCommision': this.meridionalcommission,
      'DeliveryPatnerFees': this.deliveryPatnerFees
    }
    this.docservice.UpdateHomeVisitDeliveryChargesMaster(entity).subscribe(data => {
      if(this.languageid==1)
      {
        Swal.fire("Updated Successfully");
        this.gethomedeliveycharges()
        document.getElementById("close").click();
      }
      else
      {
        Swal.fire("Ajouté avec succès");
        this.gethomedeliveycharges()
        document.getElementById("close").click();
      }

    })
  }




  public GetDisableFess(id) {
   
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Disable This Fees!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Disable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateEnableDisableHomeVisitDeliveryChargesMaster(id,1).subscribe(res => {
            let test = res;
            this.gethomedeliveycharges()
          })
          Swal.fire(
            'Disabled!',
            'Home Delivery Charges has been Disabled.',
            'success'
          )
        }
        else {
          this.gethomedeliveycharges()
        }
      })
    
  }




  public EnableFess(id) {
    
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Enable This Fees!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Disable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateEnableDisableHomeVisitDeliveryChargesMaster(id,2).subscribe(res => {
            let test = res;
            this.gethomedeliveycharges()
          })
          Swal.fire(
            'Enabled!',
            'Home Delivery Charges has been Enabled.',
            'success'
          )
        }
        else {
          this.gethomedeliveycharges()
        }
      })
    
  }
}