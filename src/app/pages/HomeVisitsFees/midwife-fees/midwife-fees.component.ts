import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-midwife-fees',
  templateUrl: './midwife-fees.component.html',
  styleUrls: ['./midwife-fees.component.css']
})
export class MidwifeFeesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

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
  public dummlist: any;
  public id: any;
  public showbutton: any;
  public showindependentradio: any;
  public independent: any;


  ngOnInit() {
    this.dummid = localStorage.getItem('hospitalid');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');

    if (this.hospitalid == undefined) {
      this.showindependentradio = 0;
    }
    else if (this.hospitalid != undefined) {
      this.showindependentradio = 1;
    }

    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else if (this.id != undefined) {
        this.showbutton = 1;
        this.GetMidWifeFeesDetails();

      }
    }
    )

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
    this.getmidwifes()
  }

  public getmidwifes() {
    if (this.dummid == undefined) {
      this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
        data => {

          this.midwifes = data;
          this.dummlist = data;
        }, error => {
        }
      )
    }
    else if (this.dummid != undefined) {
      this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.midwifes = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalid)
        }, error => {
        }
      )
    }
  }

  public hospitalname: any;

  public GetMidwifeID(even) {

    this.midwifeid = even.target.value;

    var list1 = this.dummlist.filter(x => x.midWifeID == this.midwifeid)
    this.midwifehospitalid = list1[0].midwifehospitalid,
      this.hospitalid = list1[0].hospitalClinicID,
      this.hospitalname = list1[0].hospital_ClinicName

    // this.getmidwifehosiptals();
  }


  // public getmidwifehosiptals() {
  //   this.docservice.GetMidWifeHospitalDetailsByHospitals(this.midwifeid, this.languageid).subscribe(
  //     data => {

  //       this.hospitalist = data;
  //     }, error => {
  //     }
  //   )
  // }

  public GetDoccommission(midwifefee) {

    this.voiladoccommission = 100 - Number(midwifefee);

  }


  // public GetHospitalID(even) {

  //   this.hospitalid = even.target.value;

  //   var list = this.hospitalist.filter(x => x.hospitalClinicID == this.hospitalid)

  //   this.midwifehospitalid = list[0].id
  // }


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
          if (this.independent == 2) {
            this.InsertMidwifeRevenue()
          }
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

  midwifedetails: any;
  midwifename: any;


  public GetMidWifeFeesDetails() {
    this.docservice.GetMidWifeCommissionDeatails(this.languageid).subscribe(
      data => {

        this.midwifedetails = data;
        var list2 = this.midwifedetails.filter(x => x.id == this.id)
        this.homevisitfee = list2[0].homeVisitFees,
          this.midwifefee = list2[0].midWIfeFee,
          this.voiladoccommission = list2[0].voilaDocCommission,
          this.hospitalname = list2[0].hospital_ClinicName,
          this.midwifename = list2[0].name
      }, error => {
      }
    )
  }


  public updatedetails() {
    var entity1 = {
      'ID': this.id,
      'HomeVisitFees': this.homevisitfee,
      'MidWIfeFee': this.midwifefee,
      'VoilaDocCommission': this.voiladoccommission
    }
    this.docservice.UpdateMidWifeCommissionDeatails(entity1).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        location.href = "#/MidwifeFeesDash"
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
        location.href = "#/MidwifeFeesDash"
      }
    })
  }

  public midwifes1: any;

  public GetIndependentMidwife(even) {
    if (even.target.value == 1) {
      this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.midwifes1 = this.dummlist.filter(x => x.hospitalClinicID != 614)
        }, error => {
        }
      )
    }
    else if (even.target.value == 2) {
      this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.midwifes1 = this.dummlist.filter(x => x.hospitalClinicID == 614)
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



  
  public InsertMidwifeRevenue() {
    debugger
    var entity1 = {
      'SubscriptionTypeID': this.subscriptiontype,
      'HospitalID': this.hospitalid,
      'MidwifeID': this.midwifeid,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.InsertIndependentMidwife_Revenue(entity1).subscribe(data => {

    })
  }
}
