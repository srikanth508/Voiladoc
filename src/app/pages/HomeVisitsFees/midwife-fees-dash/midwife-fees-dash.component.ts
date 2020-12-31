import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-midwife-fees-dash',
  templateUrl: './midwife-fees-dash.component.html',
  styleUrls: ['./midwife-fees-dash.component.css']
})
export class MidwifeFeesDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public midwifedetails: any;
  public term: any;
  public labels1: any;
  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public count: any;
  public hospitalclinicid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.getmidwifedetails()
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )

    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels1 = data;
      },
      error => { }
    );
    this.GetCountryMaster()
    this.countryid = 0
    this.cityid = 0
  }

  public getmidwifedetails() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetMidWifeCommissionDeatails(this.languageid).subscribe(
        data => {
         
          this.midwifedetails = data;
          this.dummlist = this.midwifedetails
          this.count = this.midwifedetails.lengths
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWifeCommissionDeatails(this.languageid).subscribe(
        data => {
         
          this.dummlist = data;
          this.midwifedetails = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifedetails.lengths
        }, error => {
        }
      )
    }
  }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.countrylist = data;

      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {
     
      this.countryid = even.target.value;

      this.midwifedetails = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.midwifedetails.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getmidwifedetails()
      this.countryid = 0

    }
  }
  public getcity() {
   
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
       
        this.citylist = data;
      }, error => {
      }
    )
  }


  public GetCityID(even) {
    if (even.target.value != 0) {
     
      this.cityid = even.target.value;
      this.getareamasterbyid()
      this.midwifedetails = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.midwifedetails.length
    }
    else if (even.target.value == 0) {
      this.getcity();
      this.areaid = 0;
      this.cityid = 0
    }
  }



  public getareamasterbyid() {
   
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
       
        this.arealist = data;

      }, error => {
      }
    )
  }


  public GetAreaID(even) {
    if (even.target.value != 0) {
     
      this.areaid = even.target.value;
      this.midwifedetails = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.midwifedetails.length
    }
    else if (even.target.value == 0) {
      this.getmidwifedetails()
    }
  }







  


  public DeleteMidWifeCommissionDeatails(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Midwife Fee!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteMidWifeCommissionDeatails(id).subscribe(res => {
          let test = res;
          this.getmidwifedetails();
        })
        Swal.fire(
          'Deleted!',
          'Midwife Fee has been deleted.',
          'success'
        )
      }
      else {
        this.getmidwifedetails();
      }
    })
  }
}





