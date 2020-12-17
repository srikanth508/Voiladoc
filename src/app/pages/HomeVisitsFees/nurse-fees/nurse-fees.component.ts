import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-nurse-fees',
  templateUrl: './nurse-fees.component.html',
  styleUrls: ['./nurse-fees.component.css']
})
export class NurseFeesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

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
  public id: any;
  public showbutton: any;
  public showindependentradio: any;
 


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
        this.GetNurseCommisiionDetails()
      }
    }
    )

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
    debugger
    var list = this.nurselist.filter(x => x.nurseID == this.nurseid)
    this.nursename = list[0].nurseName,
      this.hospitalid = list[0].hospitalClinicID,
      this.hospitalname = list[0].hospital_ClinicName,
      this.nursehospitalid = list[0].nursehospitalid

    // this.gethospitals();
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
          // if (this.independent == 2) {
          //   debugger
          //   this.InsertNurseRevenue();
          // }
          if(this.languageid==1)
          {
            Swal.fire('Success', 'Details Saved Successfully');
            location.href = "#/NurseFeeDash"
          }
          else if(this.languageid==6)
          {
            Swal.fire('', 'Mis à jour avec succès !');
            location.href = "#/NurseFeeDash"
          }
       
        }
        else {
          if(this.languageid==1)
          {
            Swal.fire("This Service Already Exists");
            this.tablecount = 0;
          }
          else if(this.languageid==6)
          {
            Swal.fire("Ce service existe déjà");
            this.tablecount = 0;
          }
       
        }
      })
    }
  }

  nursefeelist: any;


  public GetNurseCommisiionDetails() {
    this.docservice.GetNurseCommissionDeatails(this.languageid).subscribe(
      data => {
        debugger
        this.nursefeelist = data;
        var list = this.nursefeelist.filter(x => x.id == this.id)
        this.homevisitfee = list[0].homeVisitFees,
          this.nursename = list[0].nurseName,
          this.hospitalname = list[0].hospital_ClinicName
      }, error => {
      }
    )
  }

  public independent: any;

  public updatedetails() {
    var entity1 = {
      'ID': this.id,
      'HomeVisitFees': this.homevisitfee,
      'NurseFee': this.nursefees,
      'VoilaDocCommission': this.voiladoccommission
    }
    this.docservice.UpdateNurseCommissionDeatails(entity1).subscribe(data => {
      if (this.languageid == 1) {
      
        Swal.fire('Updated Successfully');

        location.href = "#/NurseFeeDash"
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
        location.href = "#/NurseFeeDash"
      }
    })
  }


  public nurselist1: any;


  public GetIndependentNurse(even) {
    if (even.target.value == 1) {
      this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {

          this.dummnurse = data;
          this.nurselist1 = this.dummnurse.filter(x => x.hospitalClinicID != 612)
        }, error => {
        }
      )
    }
    else if (even.target.value == 2) {
      this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {

          this.dummnurse = data;
          this.nurselist1 = this.dummnurse.filter(x => x.hospitalClinicID == 612)
        }, error => {
        }
      )
    }

  }

  subscriptiontype: any;

  appointmentpercentage: any;
  monthlysubription: any;
  contractstartdate: any;
  contractenddate: any;



  public Getsubscriptontype() {
    debugger
    this.appointmentpercentage = 0;
    this.monthlysubription = 0;
  }

  public InsertNurseRevenue() {
    debugger
    var entity1 = {
      'SubscriptionTypeID': this.subscriptiontype,
      'HospitalID': this.hospitalid,
      'NurseID': this.nurseid,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.InsertIndependentNurse_Revene(entity1).subscribe(data => {

    })
  }

}
