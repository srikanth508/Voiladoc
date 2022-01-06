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
  public dummtimings: any;



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
    this.idcount = 1;

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
    this.getnurse();
    // this.GetTimings();
  }


   Timeings: any
  // public GetTimings() {
  //   this.docservice.GetSlotMasterTimings().subscribe(
  //     data => {

  //       this.Timeings = data;
  //       this.dummtimings = data;
  //     }, error => {
  //     }
  //   )
  // }


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



  public GetNurseID(even) {

    this.nurseid = even.target.value;
    
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



  nursefeelist: any;

  public GetNurseCommisiionDetails() {
    this.docservice.GetNurseCommissionDeatails(this.languageid).subscribe(
      data => {
        
        this.nursefeelist = data;
        var list = this.nursefeelist.filter(x => x.id == this.id)
        this.homevisitfee = list[0].homeVisitFees,
          this.nursename = list[0].nurseName,
          this.hospitalname = list[0].hospital_ClinicName,
          this.starttime = list[0].startTime,
          this.endtime = list[0].endTime

      }, error => {
      }
    )
  }

  public independent: any;
  public starttime: any;
  public endtime: any;
  public strttimeid: any;
  public endtimelist: any;
  public endtimeid: any;


  public GetStartTime(even) {
    
    let list = even.target.value.split(',')

    this.starttime = list[0];
    this.strttimeid = list[1];
    this.endtimelist = this.Timeings.filter(x => x.id > this.strttimeid);
  }

  public GetEndTime(even) {
    
    let list = even.target.value.split(',');
    this.endtime = list[0];
    this.endtimeid = list[1];
  }


  public adddetails() {
    var entity1 = {
      'Sno': this.idcount,
      'HomeVisitFees': this.homevisitfee,
      'NurseFee': this.nursefees,
      'StartTime': this.starttime,
      'EndTime': this.endtime,
      'NurseName': this.nursename,
      'StartTimeID': this.strttimeid
    }
    this.qwerty.push(entity1);
    this.idcount = this.idcount + 1;
    this.tablecount = 1;
    var mrngslots = this.Timeings.findIndex(x => x.id == this.endtimeid);
    this.Timeings = this.Timeings.slice(mrngslots, this.Timeings.length);
    this.starttime = "";
    this.endtime = "";
    this.endtimelist.length = 0;
    this.homevisitfee = "";
  }



  public insertdetails() {
    
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'NurseID': this.nurseid,
        'NurseHospitalID': this.nursehospitalid,
        'HospitalID': this.hospitalid,
        'HomeVisitFees': this.qwerty[i].HomeVisitFees,
        'StartTime': this.qwerty[i].StartTime,
        'EndTime': this.qwerty[i].EndTime,
      }
      this.docservice.InsertNurseCommissionDeatails(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          location.href = "#/NurseFeeDash"
        }
        else {
          Swal.fire('Error', 'Home Visit Charges Exist For This Time band Please Edit Same Fees');
        }
      })
    }
    this.tablecount = 0;
    // if (this.languageid == 1) {
    //   Swal.fire('Success', 'Details Saved Successfully');
    //   // location.href = "#/NurseFeeDash"
    // }
    // else if (this.languageid == 6) {
    //   Swal.fire('', 'Mis à jour avec succès !');
    //   // location.href = "#/NurseFeeDash"
    // }

  }



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
    
    this.appointmentpercentage = 0;
    this.monthlysubription = 0;
  }



  public delete(Sno) {
    
    for (let i = 0; i < this.qwerty.length; i++) {
      if (Sno == this.qwerty[i].Sno) {
        
        var mrngslots = this.dummtimings.findIndex(x => x.id == this.qwerty[i].StartTimeID);
        this.Timeings = this.dummtimings.slice(mrngslots, this.dummtimings.length);
        
        this.qwerty.splice(i, 1);
      }
    }
    if (this.qwerty.length == 0) {
      this.tablecount = 0;
    }

  }


}
