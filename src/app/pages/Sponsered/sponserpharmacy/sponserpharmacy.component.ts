import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sponserpharmacy',
  templateUrl: './sponserpharmacy.component.html',
  styleUrls: ['./sponserpharmacy.component.css']
})
export class SponserpharmacyComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public pharmacylist: any;
  public pharmacyid: any;
  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public pharmacylist1: any;
  public pharmacydd = {}
  public labels: any;
  public languageid: any;
  public fees: any;
  public id: any;
  public showbutton: any;
  search: any;
  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();

    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else if (this.id != undefined) {
        this.showbutton = 1;
        this.GetSponsoredPharmacyForAdmin()
      }
    }
    )

    // this.docservice.GetSponsoredPharmacyForAdmin().subscribe(
    //   data => {
    //    
    //     this.pharmacylist = data;
    //   }, error => {
    //   }
    // )
    this.getlanguage();
    this.getpharmacydetails();

  }

  public getlanguage() {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search;
      }, error => {
      }
    )
  }
  SelectLabel


  public getpharmacydetails() {

    this.docservice.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.pharmacylist1 = data;
        this.pharmacydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'pharmacyName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search
        };
      }, error => {
      }
    )
  }



  public GetPharmacyID(item2: any) {

    this.pharmacyid = item2.id;
  }
  public insertdetails() {

    if (this.pharmacyid == undefined) {
      Swal.fire("Please Select Pharmacy");
    }
    else {
      var entity = {
        'PharmacyID': this.pharmacyid,
        'SDate': this.startdate,
        'EDate': this.enddate,
        'Fees': this.fees
      }
      this.docservice.InsertSponsoredPharmacy(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {

            Swal.fire('Completed', 'Published successfully', 'success');
            location.href = "#/Pharmdash";
          }
          else {
            Swal.fire('','Publié avec succès', 'success');
            location.href = "#/Pharmdash";
          }

        }
      })
    }
  }
  public clear() {
    this.startdate = '';
    this.enddate = '';
  }
  public GetEnddate() {
    this.enddate = '';
  }


  sponserpharmacylist: any;
  pharmacyname: any;



  public GetSponsoredPharmacyForAdmin() {
    if (this.languageid == 1) {
      this.docservice.GetSponsoredPharmacyForAdmin().subscribe(
        data => {

          this.sponserpharmacylist = data;

          var list = this.sponserpharmacylist.filter(x => x.id == this.id)
          this.startdate = list[0].startdate,
            this.enddate = list[0].enddate,
            this.fees = list[0].fees,
            this.pharmacyname = list[0].pharmacyName
        }, error => {
        }
      )
    }
    else if (this.languageid == 6) {
      this.docservice.GetSponsoredPharmacyForAdmin().subscribe(
        data => {

          this.sponserpharmacylist = data;

          var list = this.sponserpharmacylist.filter(x => x.id == this.id)
          this.startdate = list[0].startdate.toLocaleString();
          this.enddate = list[0].enddate.toLocaleString();
          this.fees = list[0].fees,
            this.pharmacyname = list[0].pharmacyName
        }, error => {
        }
      )
    }
  }



  public updatedetails() {

    // const qwer = 'dd-MMM-yyyy';
    // const pljdjf = 'en-US';
    // const frdat = this.startdate;
    // this.startdate = formatDate(frdat, qwer, pljdjf);
    // const todat = this.enddate;
    // this.enddate = formatDate(todat, qwer, pljdjf);

    var entity1 = {
      'ID': this.id,
      'SDate': this.startdate,
      'EDate': this.enddate,
      'Fees': this.fees
    }
    this.docservice.UpdateSponsoredPharmacy(entity1).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Completed', 'Updated Successfully', 'success');
        location.href = "#/Pharmdash";
      }
      else {
        Swal.fire('Terminé', 'Mis à jour avec succés', 'success');
        location.href = "#/Pharmdash";
      }
    })
  }
}
