import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-support-reg-dash',
  templateUrl: './support-reg-dash.component.html',
  styleUrls: ['./support-reg-dash.component.css']
})
export class SupportRegDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public localdoclist: any;
  public term: any;
  p: number = 1;
  public count: any;
  public labels1: any;
  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger;
        this.labels1 = data;
      },
      error => { }
    );

    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
    this.GetSupport();
    this.GetCountryMaster();
    this.countryid = 0;
    this.cityid = 0
  }
  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }


  public GetSupport() {
    this.docservice.GetSupportRegistration(this.languageid).subscribe(
      data => {
        debugger
        this.localdoclist = data;
        this.dummlist = this.localdoclist
        this.count = this.localdoclist.length
      }, error => {
      }
    )
  }




  public DeleteSupportRegistration(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This One!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteSupportRegistration(id).subscribe(res => {
          let test = res;
          this.GetSupport();
        })
        Swal.fire(
          'Deleted!',
          'Deleted Successfully.',
          'success'
        )
      }
      else {
        this.GetSupport();
      }
    })
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

      this.localdoclist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.localdoclist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.GetSupport()
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
      this.localdoclist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.localdoclist.length
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
      this.localdoclist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.localdoclist.length
    }
    else if (even.target.value == 0) {
      this.GetSupport()
    }
  }

}
