import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-homedeliver-master',
  templateUrl: './homedeliver-master.component.html',
  styleUrls: ['./homedeliver-master.component.css']
})
export class HomedeliverMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }

  languageid: any;
  labels: any;
  pharmacylist: any;
  pharmacydd = {};
  search: any;
  diagnosticlist: any;
  diadd = {}

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()


    this.docservice.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.pharmacylist = data;
        this.pharmacydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'pharmacyName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )


    this.docservice.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )

  }

  pharmacyid: any;

  public GetPharmacyID(item2: any) {

    this.pharmacyid = item2.id;
  }
  diagnosticid: any;

  public GetDiagnosticID(item1: any) {

    this.pharmacyid = item1.id;
  }


  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search
      }, error => {
      }
    )
  }
  meridionalcommission: any;
  deliverypatnerfees: any;
  deliverycharges: any;
  typeid: any;

  // public GetCommission(even) {
  //   this.meridionalcommission = even.target.value;
  //   // if (even > this.deliverycharges) {

  //   //   this.meridionalcommission = 0;
  //   //   this.deliverypatnerfees = 0
  //   // }
  //   // else {
  //   debugger
  //   this.deliverypatnerfees = Number(this.deliverycharges) - Number(this.meridionalcommission);
  //   debugger
  //   // }
  // }


  public insertdetails() {
    var entity = {
      'DeliveryCharges': this.deliverycharges,
      'MeridionalCommision': this.meridionalcommission,
      'DeliveryPatnerFees': this.deliverypatnerfees,
      'TypeID': this.typeid,
      'ProviderID': this.pharmacyid
    }
    this.docservice.InsertHomeVisitDeliveryChargesMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Saved Successfully");
        location.href="#/HomedeliveryFees"
      }

    })
  }
}
