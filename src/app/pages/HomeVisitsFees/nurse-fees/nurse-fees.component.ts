import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-nurse-fees',
  templateUrl: './nurse-fees.component.html',
  styleUrls: ['./nurse-fees.component.css']
})
export class NurseFeesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public nurselist: any;
  public nurseid: any;
  public hospitalist: any;
  public hospitalid: any;
  public hospitalname: any;
  public nursehospitalid: any;
  public tablecount: any;
  public qwerty = [];
  public idcount: any;
  public homevisitfee: any;
  public nursefees: any;
  public voiladoccommission: any;
  public nursename: any;
  public hospitalclinicid: any;
  public dummnurse: any;

  ngOnInit() {

    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
    this.getnurse();
  }


  public getnurse() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {
         
          this.nurselist = data;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {
         
          this.dummnurse = data;
          this.nurselist = this.dummnurse.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }
  }

  public GetDoccommission(nursefees) {
   
    this.voiladoccommission = 100 - Number(nursefees);
   
  }


  public GetNurseID(even) {
   
    this.nurseid = even.target.value;

    var list = this.nurselist.filter(x => x.nurseID == this.nurseid)
    this.nursename = list[0].nurseName,
      this.gethospitals();
  }

  public gethospitals() {
    this.docservice.GetNurseHospitalDetailsByHospitals(this.nurseid, this.languageid).subscribe(
      data => {
       
        this.hospitalist = data;
      }, error => {
      }
    )
  }

  public GetHospitalID(even) {
   
    this.hospitalid = even.target.value;

    var list = this.hospitalist.filter(x => x.hospital_ClinicID == this.hospitalid)
    this.hospitalname = list[0].hospital_ClinicName,
      this.nursehospitalid = list[0].nursehospitalid
  }


  public insertdetails() {
    if (this.nurseid == undefined) {
      Swal.fire("Please Select Nurse");
    }
    else if (this.hospitalid == undefined) {
      Swal.fire("Please Select Hospital / Clinic");
    }
    // else if (this.fees == undefined) {
    //   Swal.fire("Please Select Fees");
    // }

    else {
     
      var entity = {
        'NurseID': this.nurseid,
        'NurseHospitalID': this.nursehospitalid,
        'HospitalID': this.hospitalid,
        'HomeVisitFees': this.homevisitfee,
        'NurseFee': this.nursefees,
        'VoilaDocCommission': this.voiladoccommission
      }
      this.docservice.InsertNurseCommissionDeatails(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          location.href = "#/NurseFeeDash"
        }
        else {
          Swal.fire("This Service Already Exists");
          this.tablecount = 0;
        }
      })
    }
  }


}
