import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nurse-working-details',
  templateUrl: './nurse-working-details.component.html',
  styleUrls: ['./nurse-working-details.component.css']
})
export class NurseWorkingDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public nurselist: any;
  public dayslist: any;
  public hospitalcliniclist: any;
  public detailsarray = [];
  public idcount: any;
  public table: any;

  public nurseid: any;
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
  public dummnurselist: any;
  public dummid: any;
  NurseName: any
  NurseHospital
  active
  ngOnInit() {
    this.dummid = localStorage.getItem('hospitalid');
    this.hsp_clinicID = localStorage.getItem('hospitalid');
    this.NurseName = localStorage.getItem('user');
    this.nurseid = localStorage.getItem('nurseid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getnurselist();
    this.GetDaysMaster();
    this.GetTimings();
    this.dayid = 0;
    this.idcount = 1;
    this.table = 0;
    this.active = 0;
    this.starttime = 0;
    this.endtime = 0;

    this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
      data => {
        debugger
        let temp: any = data;
        let temp1: any = temp.filter(x => x.nurseID == this.nurseid);
        this.hospital_ClinicName = temp1[0].hospital_ClinicName;
        this.hsp_clinicID = temp1[0].hospitalClinicID;
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
      this.nurseid = params['id'];

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
  public getnurselist() {
    if (this.hsp_clinicID == undefined) {
      this.docservice.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.nurselist = data;
        }, error => {
        }
      )
    }
    else if (this.hsp_clinicID != undefined) {
      this.docservice.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.dummnurselist = data;
          this.nurselist = this.dummnurselist.filter(x => x.hospitalClinicID == this.hsp_clinicID)
        }, error => {
        }
      )
    }
  }

  public getnurseid(even) {
    this.nurseid = even.target.value;
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
      'NurseID': this.nurseid,
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

  public InsertNurseHospitalDetailsAdmin() {
    debugger
    var entity = {
      'NurseID': this.detailsarray[0].NurseID,
      'Fees': this.detailsarray[0].Fees,
      'Hospital_ClinicID': this.detailsarray[0].Hospital_ClinicID,
      'LanguageID': 1
    }
    this.docservice.InsertNurseHospitalDetailsAdmin(entity).subscribe(data => {

      let qqqq = data;
      debugger
      for (let i = 0; i < this.detailsarray.length; i++) {
        debugger
        var entity1 = {
          'NurseHospitalDetailsID': qqqq,
          'NurseID': this.detailsarray[i].NurseID,
          'DayID': this.detailsarray[i].DayID,
          'StartTimee': this.detailsarray[i].StartTime,
          'EndTimee': this.detailsarray[i].EndTime
        }
        this.docservice.InsertNurseWorkingDetails(entity1).subscribe(data => {
          debugger

        })
      }

      this.detailsarray = [];
      Swal.fire('Completed', 'Saved successfully', 'success');
      location.href = "#/NurseTimings"
      this.table = 0;
      this.starttime = '';
      this.endtime = '';
      this.dayid = 0;
      this.idcount = 1;
      this.fees = '';
    })

  }

  public InsertNurseHospitalDetailsAdmindash() {
    debugger
    var entity = {
      'NurseID': this.detailsarray[0].NurseID,
      'Fees': this.detailsarray[0].Fees,
      'Hospital_ClinicID': this.detailsarray[0].Hospital_ClinicID,
      'LanguageID': 1
    }
    this.docservice.InsertNurseHospitalDetailsAdmin(entity).subscribe(data => {

      let qqqq = data;
      debugger
      for (let i = 0; i < this.detailsarray.length; i++) {
        debugger
        var entity1 = {
          'NurseHospitalDetailsID': qqqq,
          'NurseID': this.detailsarray[i].NurseID,
          'DayID': this.detailsarray[i].DayID,
          'StartTimee': this.detailsarray[i].StartTime,
          'EndTimee': this.detailsarray[i].EndTime
        }
        this.docservice.InsertNurseWorkingDetails(entity1).subscribe(data => {
          debugger

        })
      }

      this.detailsarray = [];
      Swal.fire('Completed', 'Saved successfully', 'success');
      location.href = "#/Nurseworkingdash"
      this.table = 0;
      this.starttime = '';
      this.endtime = '';
      this.dayid = 0;
      this.idcount = 1;
      this.fees = '';
    })

  }

}
