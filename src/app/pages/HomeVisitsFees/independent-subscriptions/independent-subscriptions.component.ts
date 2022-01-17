import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-independent-subscriptions',
  templateUrl: './independent-subscriptions.component.html',
  styleUrls: ['./independent-subscriptions.component.css']
})
export class IndependentSubscriptionsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public languageid: any;
  public typeid: any;
  public dummlist: any;
  public doctorlist1: any;
  public docdd = {}
  public dummnurse: any;
  public nurselist1: any;
  public dummphysiolist: any;
  public physiolist1: any;
  public midwifes1: any;
  public dummlistmidwife: any;



  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetDoctorHospitalDetailsDoctors(this.languageid).subscribe(
      data => {
        this.dummlist = data;
        this.doctorlist1 = this.dummlist.filter(x => x.hosid == 590)

        this.docdd = {
          singleSelection: true,
          idField: 'doctorID',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          // searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )

    // nurse

    this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
      data => {

        this.dummnurse = data;
        this.nurselist1 = this.dummnurse.filter(x => x.hospitalClinicID == 612)
      }, error => {
      }
    )
    //physiotherapist

    this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
      data => {

        this.dummphysiolist = data;
        this.physiolist1 = this.dummphysiolist.filter(x => x.hospitalClinicID == 613)
      }, error => {
      }
    )

    //midwife

    this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
      data => {

        this.dummlistmidwife = data;
        this.midwifes1 = this.dummlistmidwife.filter(x => x.hospitalClinicID == 614)
      }, error => {
      }
    )

    this.getlanguage()
this.typeid==1;
  }


  labels: any;

  public getlanguage() {
    this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(
      data => {

        this.labels = data;


      }, error => {
      }
    )
  }



  public GetTypeID(even) {

    this.typeid = even.target.value;
  }

  public nurseid: any;


  public GetNurseID(even) {

    this.nurseid = even.target.value;

    var list = this.nurselist1.filter(x => x.nurseID == this.nurseid)
    // this.nursename = list[0].nurseName,
    //   this.hospitalid = list[0].hospitalClinicID,
    //   this.hospitalname = list[0].hospital_ClinicName,
    //   this.nursehospitalid = list[0].nursehospitalid

    // this.gethospitals();
  }

  public midwifeid: any;


  public GetMidwifeID(even) {

    this.midwifeid = even.target.value;

    // var list1 = this.dummlist.filter(x => x.midWifeID == this.midwifeid)
    // this.midwifehospitalid = list1[0].midwifehospitalid,
    //   this.hospitalid = list1[0].hospitalClinicID,
    //   this.hospitalname = list1[0].hospital_ClinicName

    // this.getmidwifehosiptals();
  }


  public physioid: any;

  public GetphysioID(even) {

    this.physioid = even.target.value;

    // var list1 = this.dummphysiolist.filter(x => x.physiotherapyID == this.physioid)
    // this.physihospitalid = list1[0].id,
    //   this.hospitalid = list1[0].hospitalClinicID,
    //   this.hospitalname = list1[0].hospital_ClinicName

    // this.gethospitals();
  }

  public appointmentpercentage: any;
  public subscriptiontype: any;
  public monthlysubription: any;
  public doctorid: any;
  public contractstartdate: any;
  public contractenddate: any;

  public Getsubscriptontype() {

    this.appointmentpercentage = 0;
    this.monthlysubription = 0;
  }


  public GetDoctorID(item: any) {
    this.doctorid = item.doctorID;
  }



  public insertdetails() {
    if (this.typeid == 1) {
      this.insertinpendentDoctorrevenue()
    }
    if (this.typeid == 2) {
      this.InsertNurseRevenue()
    }
    if (this.typeid == 3) {
      this.InsertPhysioRevenue()
    }
    if (this.typeid == 4) {
      this.InsertMidwifeRevenue()
    }
  }





  public insertinpendentDoctorrevenue() {
    if (this.doctorid == undefined) {
      Swal.fire('Please Select Doctor');
    }
    else {
      var entity1 = {
        'SubscriptionTypeID': this.subscriptiontype,
        'HospitalID': 590,
        'DoctorID': this.doctorid,
        'MonthlySubscription': this.monthlysubription,
        'AppointmentPercentage': this.appointmentpercentage,
        'ContractStartdate': this.contractstartdate,
        'ContractEnddate': this.contractenddate
      }
      this.docservice.InsertIndependentDoctors_Revenue(entity1).subscribe(data => {
        if (data != 0) {
          Swal.fire('Saved Successfully');
          location.href = "#/Independentsubdash"
        }
        else {
          Swal.fire('Contract Dates Already Exists');
        }

      })
    }
  }




  public InsertNurseRevenue() {
    if (this.nurseid == undefined) {
      Swal.fire('Please Select Nurse');
    }
    else {
      var entity1 = {
        'SubscriptionTypeID': this.subscriptiontype,
        'HospitalID': 612,
        'NurseID': this.nurseid,
        'MonthlySubscription': this.monthlysubription,
        'AppointmentPercentage': this.appointmentpercentage,
        'ContractStartdate': this.contractstartdate,
        'ContractEnddate': this.contractenddate
      }
      this.docservice.InsertIndependentNurse_Revene(entity1).subscribe(data => {
        if (data != 0) {
          Swal.fire('Saved Successfully');
          location.href = "#/Independentsubdash"
        }
        else {
          Swal.fire('Contract Dates Already Exists');
        }
      })
    }

  }


  public InsertPhysioRevenue() {
    if (this.physioid == undefined) {
      Swal.fire('Please Select Nurse');
    }
    else {
      var entity1 = {
        'SubscriptionTypeID': this.subscriptiontype,
        'HospitalID': 613,
        'PhysiotherapistID': this.physioid,
        'MonthlySubscription': this.monthlysubription,
        'AppointmentPercentage': this.appointmentpercentage,
        'ContractStartdate': this.contractstartdate,
        'ContractEnddate': this.contractenddate
      }
      this.docservice.InsertIndependentPhysiotherapist_Revenue(entity1).subscribe(data => {
        if (data != 0) {
          Swal.fire('Saved Successfully');
          location.href = "#/Independentsubdash"
        }
        else {
          Swal.fire('Contract Dates Already Exists');
        }
      })
    }

  }


  public InsertMidwifeRevenue() {
    if (this.midwifeid == undefined) {
      Swal.fire('Please Select Nurse');
    }
    else {
      var entity1 = {
        'SubscriptionTypeID': this.subscriptiontype,
        'HospitalID': 614,
        'MidwifeID': this.midwifeid,
        'MonthlySubscription': this.monthlysubription,
        'AppointmentPercentage': this.appointmentpercentage,
        'ContractStartdate': this.contractstartdate,
        'ContractEnddate': this.contractenddate
      }
      this.docservice.InsertIndependentMidwife_Revenue(entity1).subscribe(data => {
        if (data != 0) {
          Swal.fire('Saved Successfully');
          location.href = "#/Independentsubdash"
        }
        else {
          Swal.fire('Contract Dates Already Exists');
        }
      })
    }
  }
}
