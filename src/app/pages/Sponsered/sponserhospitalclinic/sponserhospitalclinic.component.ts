import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-sponserhospitalclinic',
  templateUrl: './sponserhospitalclinic.component.html',
  styleUrls: ['./sponserhospitalclinic.component.css']
})
export class SponserhospitalclinicComponent implements OnInit {


  constructor(public docservice: HelloDoctorService) { }

  public hospitallist: any;
  public hospitalid: any;
  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public hospitalcliniclist: any;
  public hospitaldd = {}
  public labels: any;
  public languageid: any;
  public hspcliid: any
  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    debugger
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();
    this.languageid = localStorage.getItem('LanguageID');

    // this.docservice.GetSponsoredHospitalsForAdmin().subscribe(
    //   data => {
    //     debugger
    //     this.hospitallist = data;
    //   }, error => {
    //   }
    // )
    //this.gethosptilclinicforadmin();

    this.getlanguage();
  }
  SelectLabel
  public getlanguage() {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel=this.labels[0].select;
      }, error => {
      }
    )
  }
  handleChange(event) {
    debugger
    this.hspcliid=event.target.value;
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        debugger
        let temp:any=data;
        this.hospitalcliniclist = temp.filter(x=>x.hospital_ClinicID==this.hspcliid);
        this.hospitaldd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  // public gethosptilclinicforadmin() {
  //   debugger
  //   this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
  //     data => {
  //       debugger
  //       this.hospitalcliniclist = data;
  //       this.hospitaldd = {
  //         singleSelection: true,
  //         idField: 'id',
  //         textField: 'hospital_ClinicName',
  //         selectAllText: 'Select All',
  //         unSelectAllText: 'UnSelect All',
  //         itemsShowLimit: 3,
  //         allowSearchFilter: true
  //       };
  //     }, error => {
  //     }
  //   )
  // }



  public GetHospitalID(item3: any) {
    debugger
    this.hospitalid = item3.id;
  }
  public insertdetails() {
    debugger
    if (this.hospitalid == undefined) {
      Swal.fire("Please Select Hospital/Clinic")
    }
    else {
      var entity = {
        'Hospital_ClinicID': this.hospitalid,
        'SDate': this.startdate,
        'EDate': this.enddate
      }
      this.docservice.InsertSponsoredHospitals(entity).subscribe(data => {
        debugger
        if (data != 0) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
          this.clear();
          location.href="#/Hspclidash";
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
}
