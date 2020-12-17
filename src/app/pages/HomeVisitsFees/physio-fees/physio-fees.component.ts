import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-physio-fees',
  templateUrl: './physio-fees.component.html',
  styleUrls: ['./physio-fees.component.css']
})
export class PhysioFeesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

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
  public id: any;
  public showbutton: any;
  public showindependentradio: any;
  public independent: any;

  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');

    if (this.hospitalclinicid == undefined) {
      this.showindependentradio = 0;
    }
    else if (this.hospitalclinicid != undefined) {
      this.showindependentradio = 1;
    }

    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0
      }
      else if (this.id != undefined) {
        this.showbutton = 1
        this.GetphysioFees()

      }
    }
    )

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
          this.dummphysiolist = data;
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

  public hospitalname: any;

  public GetphysioID(even) {

    this.physioid = even.target.value;
    debugger
    var list1 = this.dummphysiolist.filter(x => x.physiotherapyID == this.physioid)
    this.physihospitalid = list1[0].id,
      this.hospitalid = list1[0].hospitalClinicID,
      this.hospitalname = list1[0].hospital_ClinicName
    debugger
    // this.gethospitals();
  }

  // public gethospitals() {
  //   this.docservice.GetPhysiotherapyHospitalDetailsByHospitals(this.physioid, this.languageid).subscribe(
  //     data => {

  //       this.hospitalist = data;
  //     }, error => {
  //     }
  //   )
  // }

  // public GetHospitalID(even) {

  //   this.hospitalid = even.target.value;


  //   var list = this.hospitalist.filter(x => x.hospital_ClinicID == this.hospitalid)
  //   this.physihospitalid = list[0].id
  // }



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
          // if (this.independent == 2) {
          //   this.InsertPhysioRevenue()
          // }
          if(this.languageid==1)
          {
            Swal.fire('Success', 'Details Saved Successfully');
            location.href = "#/PhysiFeedash"
          }
          else if(this.languageid==6)
          {
            Swal.fire('', 'Mis à jour avec succès !');
            location.href = "#/PhysiFeedash"
          }
       
        }
        else {
          if(this.languageid==1)
          {
            location.href = "#/PhysiFeedash"
            Swal.fire("This Service Already Exists");
          }
         else if(this.languageid==6)
          {
            location.href = "#/PhysiFeedash"
            Swal.fire("Ce service existe déjà");
          }

        }
      })
    }
  }


  physiofeeslist: any;
  physioname: any;

  public GetphysioFees() {
    this.docservice.GetPhsyioTherapistCommissionDeatails(this.languageid).subscribe(
      data => {

        this.physiofeeslist = data;
        var list2 = this.physiofeeslist.filter(x => x.id == this.id)
        this.hospitalname = list2[0].hospital_ClinicName,
          this.homevisitfee = list2[0].homeVisitFees,
          this.physiofee = list2[0].physioFee,
          this.voiladoccommission = list2[0].voilaDocCommission,
          this.physioname = list2[0].name
      }, error => {
      }
    )
  }



  public updatedetails() {
    var entity1 = {
      'ID': this.id,
      'HomeVisitFees': this.homevisitfee,
      'PhysioFee': this.physiofee,
      'VoilaDocCommission': this.voiladoccommission
    }
    this.docservice.UpdatePhsyioTherapistCommissionDeatailsweb(entity1).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        location.href = "#/PhysiFeedash"
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
        location.href = "#/PhysiFeedash"
      }
    })
  }


  public physiolist1: any;

  public GetIndependentPhysiotherapist(even) {
    if (even.target.value == 1) {
      debugger
      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {
          this.dummphysiolist = data;
          this.physiolist1 = this.dummphysiolist.filter(x => x.hospitalClinicID != 613)
        }, error => {
        }
      )
    }
    else if (even.target.value == 2) {
      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummphysiolist = data;
          this.physiolist1 = this.dummphysiolist.filter(x => x.hospitalClinicID == 613)
        }, error => {
        }
      )
    }
  }
  public monthlysubription: any;
  public appointmentpercentage: any;
  public subscriptiontype: any;
  public contractstartdate: any;
  public contractenddate: any;


  public Getsubscriptontype() {
    debugger
    this.appointmentpercentage = 0;
    this.monthlysubription = 0;
  }


  public InsertPhysioRevenue() {
    debugger
    var entity1 = {
      'SubscriptionTypeID': this.subscriptiontype,
      'HospitalID': this.hospitalid,
      'PhysiotherapistID': this.physioid,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.InsertIndependentPhysiotherapist_Revenue(entity1).subscribe(data => {

    })
  }

}
