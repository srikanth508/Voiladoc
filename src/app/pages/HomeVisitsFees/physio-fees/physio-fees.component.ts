import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-physio-fees',
  templateUrl: './physio-fees.component.html',
  styleUrls: ['./physio-fees.component.css']
})
export class PhysioFeesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public physiolist: any;
  public physioid: any;
  public hospitalist: any;
  public hospitalid: any;
  public physihospitalid: any;
  public homevisitfee: any;
  public physiofee: any;
  public voiladoccommission: any;
  public physiofees: any;
  public hospitalclinicid: any;
  public dummphysiolist: any;
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
    this.getphysiotherapist()
  }

  public getphysiotherapist() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {
         
          this.physiolist = data;
        }, error => {
        }
      )
    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {
         
          this.dummphysiolist = data;
          this.physiolist = this.dummphysiolist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }


  }

  public GetphysioID(even) {
   
    this.physioid = even.target.value;
    this.gethospitals();
  }

  public gethospitals() {
    this.docservice.GetPhysiotherapyHospitalDetailsByHospitals(this.physioid, this.languageid).subscribe(
      data => {
       
        this.hospitalist = data;
      }, error => {
      }
    )
  }

  public GetHospitalID(even) {
   
    this.hospitalid = even.target.value;


    var list = this.hospitalist.filter(x => x.hospital_ClinicID == this.hospitalid)
    this.physihospitalid = list[0].id
  }



  public GetDoccommission(physiofees) {
   
    this.voiladoccommission = 100 - Number(physiofees);
   
  }


  public insertdetails() {
    if (this.physioid == undefined) {
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
        'PhysioID': this.physioid,
        'PhysioHospitalID': this.physihospitalid,
        'HospitalID': this.hospitalid,
        'HomeVisitFees': this.homevisitfee,
        'PhysioFee': this.physiofees,
        'VoilaDocCommission': this.voiladoccommission
      }
      this.docservice.InsertPhsyioTherapistCommissionDeatails(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          location.href = "#/PhysiFeedash"
        }
        else {
          location.href = "#/PhysiFeedash"
          Swal.fire("This Service Already Exists");

        }
      })
    }
  }

}
