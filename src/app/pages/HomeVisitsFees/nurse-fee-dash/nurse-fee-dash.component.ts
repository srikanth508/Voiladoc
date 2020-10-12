import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nurse-fee-dash',
  templateUrl: './nurse-fee-dash.component.html',
  styleUrls: ['./nurse-fee-dash.component.css']
})
export class NurseFeeDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public nursefeelist: any;
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
  public dummnursefeelist: any;
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
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
    this.getNursefees()
    this.GetCountryMaster()
    this.countryid = 0
    this.cityid = 0
  }

  public getNursefees() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetNurseCommissionDeatails(this.languageid).subscribe(
        data => {
         
          this.nursefeelist = data;
          this.dummlist = this.nursefeelist
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseCommissionDeatails(this.languageid).subscribe(
        data => {
         
          this.dummnursefeelist = data;
          this.nursefeelist = this.dummnursefeelist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.dummlist = this.nursefeelist
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

      this.nursefeelist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.nursefeelist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getNursefees()
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
      this.nursefeelist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.nursefeelist.length
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
      this.nursefeelist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.nursefeelist.length
    }
    else if (even.target.value == 0) {
      this.getNursefees()
    }
  }



  public DeleteNurseCommissionDeatails(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Nurse Fee!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteNurseCommissionDeatails(id).subscribe(res => {
          let test = res;
          this.getNursefees();
        })
        Swal.fire(
          'Deleted!',
          'Nurse Fee has been deleted.',
          'success'
        )
      }
      else {
        this.getNursefees();
      }
    })
  }
}
