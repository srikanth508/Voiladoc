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
        debugger
        this.labels = data;
      }, error => {
      }
    )

    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger;
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
          debugger
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
          debugger
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
        debugger
        this.countrylist = data;

      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {
      debugger
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
    debugger
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
        debugger
        this.citylist = data;
      }, error => {
      }
    )
  }


  public GetCityID(even) {
    if (even.target.value != 0) {
      debugger
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
    debugger
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
        debugger
        this.arealist = data;

      }, error => {
      }
    )
  }


  public GetAreaID(even) {
    if (even.target.value != 0) {
      debugger
      this.areaid = even.target.value;
      this.midwifedetails = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.midwifedetails.length
    }
    else if (even.target.value == 0) {
      this.getmidwifedetails()
    }
  }


}





