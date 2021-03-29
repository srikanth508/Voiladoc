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
  pino: any;
  pinno: any;
  labels: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.GetPatientDetails();
    this.getlanguage();
  }




  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;

      },
      error => { }
    );
  }



  public GetPatientDetails() {
    this.docservice.GetPatientRegistrationDetails().subscribe(
      data => {

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
  patientpinno: any;

  public GetPatientID(id, mobileNumber, patientName, pinno) {
    this.patientid = id
    this.oldmobilenumber = mobileNumber
    this.searchon = 0
    this.patientname = patientName;
    this.patientpinno = pinno
  }

  newmobilenumber: any;
  oldmobilenumber: any;


  public updatemobilenmber() {

    if (this.patientpinno == this.pinno) {

      var entity = {
        'ID': this.patientid,
        'MobileNumber': this.newmobilenumber,
        'NewmobileNumber': this.newmobilenumber,
        'OldmobileNumber': this.oldmobilenumber
      }
      this.docservice.UpdatePatientRegistrationMobileNumber(entity).subscribe(data => {

        if (data == 0) {
          this.GetPatientDetails()
          Swal.fire('Mobile Number Already Exists');
          // this.newmobilenumber=""
          // this.patientname=""
        }
        if (data != 0) {
          this.GetPatientDetails()
          Swal.fire('Updated Successfully');
          this.newmobilenumber = ""
          this.patientname = ""
        }
      })
    }
    else {

      Swal.fire('', 'Pin is invalid')
      this.pinno = ""
    }


  }


}
