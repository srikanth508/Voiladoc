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
    this.getmidwifes();
    // this.GetTimings();
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
      this.hospitalname = list1[0].hospital_ClinicName,
      this.midwifename = list1[0].name

  }

  public qwerty = [];
  public tablecount: any;
  public idcount: any;




  public addetails() {
    var entity1 = {
      'Sno': this.idcount,
      'MidwifeID': this.midwifeid,
      'MidWifeHospitalID': this.midwifehospitalid,
      'HospitalID': this.hospitalid,
      'HomeVisitFees': this.homevisitfee,
      'StartTime': this.starttime,
      'EndTime': this.endtime,
      'MidWifeName': this.midwifename,
      'StartTimeID':this.strttimeid
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
        'MidwifeID': this.midwifeid,
        'MidWifeHospitalID': this.midwifehospitalid,
        'HospitalID': this.hospitalid,
        'HomeVisitFees': this.qwerty[i].HomeVisitFees,
        'StartTime': this.qwerty[i].StartTime,
        'EndTime': this.qwerty[i].EndTime
      }
      this.docservice.InsertMidWifeCommissionDeatails(entity).subscribe(data => {
        
        if (data != 0) {
          // if (this.languageid == 1) {
          //   Swal.fire('Success', 'Details Saved Successfully');
          //   location.href = "#/MidwifeFeesDash"
          // }
          // else if (this.languageid == 6) {
          //   Swal.fire('', 'Mis à jour avec succès !');
          //   location.href = "#/MidwifeFeesDash"
          // }
        }
        // else {
        //   if (this.languageid == 1) {
        //     location.href = "#/MidwifeFeesDash"
        //     Swal.fire("This Service Already Exists");
        //   }
        //   else if (this.languageid == 6) {
        //     location.href = "#/MidwifeFeesDash"
        //     Swal.fire("Ce service existe déjà");
        //   }
        // }
      })
    }
    this.tablecount = 0;
    if (this.languageid == 1) {
      Swal.fire('Success', 'Details Saved Successfully');
       location.href = "#/MidwifeFeesDash"
    }
    else if (this.languageid == 6) {
      Swal.fire('', 'Mis à jour avec succès !');
       location.href = "#/MidwifeFeesDash"
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
          this.midwifename = list2[0].name,
          this.starttime=list2[0].startTime,
          this.endtime=list2[0].endTime


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



  public starttime: any;
  public strttimeid: any;
  public endtimelist: any;
  public endtime: any;
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



  Timeings: any;
  dummtimings: any;

  // public GetTimings() {
  //   this.docservice.GetSlotMasterTimings().subscribe(
  //     data => {

  //       this.Timeings = data;
  //       this.dummtimings = data;
  //     }, error => {
  //     }
  //   )
  // }


  public delete(Sno) {
    
    for (let i = 0; i < this.qwerty.length; i++) {
      if (Sno == this.qwerty[i].Sno) {
      
        var mrngslots = this.dummtimings.findIndex(x => x.id ==  this.qwerty[i].StartTimeID);
        this.Timeings = this.dummtimings.slice(mrngslots, this.dummtimings.length);
        
        this.qwerty.splice(i, 1);
      }
    }
    if (this.qwerty.length == 0) {
      this.tablecount = 0;
    }

  }


}
