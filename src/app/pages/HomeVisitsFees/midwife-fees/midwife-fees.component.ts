import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-midwife-fees',
  templateUrl: './midwife-fees.component.html',
  styleUrls: ['./midwife-fees.component.css']
})
export class MidwifeFeesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public midwifes: any;
  public midwifeid: any;
  public hospitalist: any;
  public hospitalid: any;
  public voiladoccommission: any;
  public midwifehospitalid: any;
  public homevisitfee: any;
  public midwifefee: any;
  public dummid: any;
  public dummlist:any;


  ngOnInit() {
    this.dummid = localStorage.getItem('hospitalid');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
    this.getmidwifes()
  }

  public getmidwifes() {
if(this.dummid==undefined)
{
  this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
    data => {
     
      this.midwifes = data;
    }, error => {
    }
  )
}
else if(this.dummid!=undefined)
{
  this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
    data => {
     
      this.dummlist = data;
      this.midwifes=this.dummlist.filter(x=>x.hospitalClinicID==this.hospitalid)
    }, error => {
    }
  )
}
  }


  public GetMidwifeID(even) {
   
    this.midwifeid = even.target.value;
    this.getmidwifehosiptals();
  }


  public getmidwifehosiptals() {
    this.docservice.GetMidWifeHospitalDetailsByHospitals(this.midwifeid, this.languageid).subscribe(
      data => {
       
        this.hospitalist = data;
      }, error => {
      }
    )
  }

  public GetDoccommission(midwifefee) {
   
    this.voiladoccommission = 100 - Number(midwifefee);
   
  }


  public GetHospitalID(even) {
   
    this.hospitalid = even.target.value;
   
    var list = this.hospitalist.filter(x => x.hospitalClinicID == this.hospitalid)
   
    this.midwifehospitalid = list[0].id
  }


  public insertdetails() {
    if (this.midwifeid == undefined) {
      Swal.fire("Please Select Midwife");
    }
    else if (this.hospitalid == undefined) {
      Swal.fire("Please Select Hospital / Clinic");
    }
    // else if (this.fees == undefined) {
    //   Swal.fire("Please Select Fees");
    // }

    else {
     
      var entity = {
        'MidwifeID': this.midwifeid,
        'MidWifeHospitalID': this.midwifehospitalid,
        'HospitalID': this.hospitalid,
        'HomeVisitFees': this.homevisitfee,
        'MidWIfeFee': this.midwifefee,
        'VoilaDocCommission': this.voiladoccommission
      }
      this.docservice.InsertMidWifeCommissionDeatails(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          location.href = "#/MidwifeFeesDash"
        }
        else {
          location.href = "#/MidwifeFeesDash"
          Swal.fire("This Service Already Exists");

        }
      })
    }
  }
}
