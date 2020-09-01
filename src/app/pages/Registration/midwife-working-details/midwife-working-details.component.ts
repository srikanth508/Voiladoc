import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-midwife-working-details',
  templateUrl: './midwife-working-details.component.html',
  styleUrls: ['./midwife-working-details.component.css']
})
export class MidwifeWorkingDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public midwifelist: any;
  public dayslist: any;
  public hospitalcliniclist: any;
  public detailsarray = [];
  public idcount: any;
  public table: any;

  public widwifeid: any;
  public nursename: any;
  public dayid: any;
  public day: any;
  public worktypeid: any;
  public hsp_clinicID: any;
  public hospital_ClinicName: any;
  public starttime: any;
  public endtime: any;
  public fees: any;
  public languageid: any;
  public labels: any;
  public dummid: any;
  public dummlist: any;
  midwifename: any
  active: any
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.dummid = localStorage.getItem('hospitalid');
    this.hsp_clinicID = localStorage.getItem('hospitalid');
    this.midwifename = localStorage.getItem('user');
    this.widwifeid = localStorage.getItem('midwifeid');
    this.getmidwifelist();
    this.GetDaysMaster();
    this.GetTimings();
    this.dayid = 0;
    this.active = 0;
    this.idcount = 1;
    this.table = 0;
    this.starttime = 0
    this.endtime = 0
    this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
      data => {
        debugger
        let temp: any = data;
        let temp1: any = temp.filter(x => x.midWifeID == this.widwifeid);
        this.hsp_clinicID = temp1[0].hospitalClinicID;
        this.hospital_ClinicName = temp1[0].hospital_ClinicName;
      }, error => {
      }
    )
    this.docservice.GetHospital_ClinicDetailsForAdmin(this.hsp_clinicID).subscribe(
      data => {
        debugger
        this.hospital_ClinicName = data[0].hospital_ClinicName
      }, error => {
      }
    )
    this.getlanguage();
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.active = 1;
      this.widwifeid = params['id'];
    }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  Timeings: any
  public GetTimings() {
    this.docservice.GetSlotMasterTimings().subscribe(
      data => {
        debugger
        this.Timeings = data;
      }, error => {
      }
    )
  }
  public getmidwifelist() {
    if (this.dummid == undefined) {
      this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.midwifelist = data;
        }, error => {
        }
      )
    }
    else if (this.dummid != undefined) {
      this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.dummlist = data;
          this.midwifelist = this.dummlist.filter(x => x.hospitalClinicID == this.hsp_clinicID)
        }, error => {
        }
      )
    }
  }

  public getmidwifeid(even) {
    this.widwifeid = even.target.value;
  }

  public Getworktypeid(even) {
    debugger
    this.worktypeid = even.target.value;
    this.GetAllHospitalclinicById();

  }

  public GetAllHospitalclinicById() {
    debugger
    this.docservice.GetAllHospital_ClinicListByID(this.worktypeid).subscribe(
      data => {
        debugger
        this.hospitalcliniclist = data;
      }, error => {
      }
    )
  }

  public Gethsp_clinicID(even) {
    this.hsp_clinicID = even.target.value;
    this.docservice.GetHospital_ClinicDetailsForAdmin(this.hsp_clinicID).subscribe(
      data => {
        debugger
        this.hospital_ClinicName = data[0].hospital_ClinicName
      }, error => {
      }
    )
  }

  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.dayslist = data;
      }, error => {
      }
    )
  }

  public GetDaysID(even) {
    debugger
    this.dayid = even.target.value;

    for (let i = 0; i < this.dayslist.length; i++) {
      if (this.dayslist[i].id == this.dayid) {
        this.day = this.dayslist[i].dayOfTheWeek;
      }
    }
  }


  public adddetails() {
    this.table = 1;
    debugger
    var detailsentity = {
      'Sno': this.idcount,
      'MidwifeID': this.widwifeid,
      'Fees': this.fees,
      'Hospital_ClinicID': this.hsp_clinicID,
      'DayID': this.dayid,
      'StartTime': this.starttime,
      'EndTime': this.endtime,
      'hospitalname': this.hospital_ClinicName,
      'Day': this.day

    }
    this.detailsarray.push(detailsentity);
    this.starttime = '';
    this.endtime = '';
    this.dayid = 0;
    this.idcount = this.idcount + 1;
  }

  public delete(Sno) {
    debugger
    for (let i = 0; i < this.detailsarray.length; i++) {
      debugger
      if (Sno == this.detailsarray[i].Sno) {
        debugger
        this.detailsarray.splice(i, 1);
      }
    }
    if (this.detailsarray.length == 0) {
      this.table = 0;
    }
    debugger
  }
  public InsertPhysiotherapyHospitalDetailsAdmin() {
    debugger
    var entity = {
      'MidWifeID': this.detailsarray[0].MidwifeID,
      'Fees': this.detailsarray[0].Fees,
      'HospitalClinicID': this.detailsarray[0].Hospital_ClinicID,
      'LanguageID': 1
    }
    this.docservice.InsertMidWifeHospitalDetails(entity).subscribe(data => {
      debugger
      let qqq = data;
      for (let i = 0; i < this.detailsarray.length; i++) {
        debugger
        var entity = {
          'MidWifeHospitalDetailsID': qqq,
          'MidWifeID': this.detailsarray[i].MidwifeID,
          'DayID': this.detailsarray[i].DayID,
          'StartTimee': this.detailsarray[i].StartTime,
          'EndTimee': this.detailsarray[i].EndTime
        }
        this.docservice.InsertMidWifeWorkingDetails(entity).subscribe(data => {
          debugger

        })
      }
      this.detailsarray = [];
      Swal.fire('Completed', 'Saved successfully', 'success');
      location.href = "#/MidwifeWorkingDash"
      this.table = 0;
      this.starttime = '';
      this.endtime = '';
      this.dayid = 0;
      this.idcount = 1;
      this.fees = '';

    })

  }
  public InsertPhysiotherapyHospitalDetails() {
    debugger
    var entity = {
      'MidWifeID': this.detailsarray[0].MidwifeID,
      'Fees': this.detailsarray[0].Fees,
      'HospitalClinicID': this.detailsarray[0].Hospital_ClinicID,
      'LanguageID': 1
    }
    this.docservice.InsertMidWifeHospitalDetails(entity).subscribe(data => {
      debugger
      let qqq = data;
      for (let i = 0; i < this.detailsarray.length; i++) {
        debugger
        var entity = {
          'MidWifeHospitalDetailsID': qqq,
          'MidWifeID': this.detailsarray[i].MidwifeID,
          'DayID': this.detailsarray[i].DayID,
          'StartTimee': this.detailsarray[i].StartTime,
          'EndTimee': this.detailsarray[i].EndTime
        }
        this.docservice.InsertMidWifeWorkingDetails(entity).subscribe(data => {
          debugger

        })
      }
      this.detailsarray = [];
      Swal.fire('Completed', 'Saved successfully', 'success');
      location.href = "#/MidWifeTimings"
      this.table = 0;
      this.starttime = '';
      this.endtime = '';
      this.dayid = 0;
      this.idcount = 1;
      this.fees = '';

    })

  }

}
