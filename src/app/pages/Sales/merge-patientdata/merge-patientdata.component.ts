import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-merge-patientdata',
  templateUrl: './merge-patientdata.component.html',
  styleUrls: ['./merge-patientdata.component.css']
})
export class MergePatientdataComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public patientname: any;
  searchon: any;
  patientdetails: any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.GetPatientDetails()
  }

  public GetPatientDetails() {
    this.docservice.GetPatientRegistrationDetails().subscribe(
      data => {
        debugger
        this.patientdetails = data;
      }, error => {
      }
    )
  }



  public Searchpatient(patientname) {
    if (patientname == "") {
      this.searchon = 0
    }
    else {
      this.searchon = 1
    }

  }
  patientid: any;

  public GetPatientID(id, mobileNumber,patientName) {
    this.patientid = id
    this.oldmobilenumber = mobileNumber
    this.searchon = 0
    this.patientname=patientName;
  }

  newmobilenumber: any;
  oldmobilenumber: any;


  public updatemobilenmber() {
    debugger
    var entity = {
      'ID': this.patientid,
      'MobileNumber': this.newmobilenumber,
      'NewmobileNumber': this.newmobilenumber,
      'OldmobileNumber': this.oldmobilenumber
    }
    this.docservice.UpdatePatientRegistrationMobileNumber(entity).subscribe(data => {
      debugger
      let res = data;
      this.GetPatientDetails()
      Swal.fire('Updated Successfully');
      this.newmobilenumber=""
      this.patientname=""
    })
  }

}
