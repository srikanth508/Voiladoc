import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-physiotherapist-working-details',
  templateUrl: './physiotherapist-working-details.component.html',
  styleUrls: ['./physiotherapist-working-details.component.css']
})
export class PhysiotherapistWorkingDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public physiolist: any;
  public dayslist: any;
  public hospitalcliniclist: any;
  public detailsarray = [];
  public idcount: any;
  public table: any;

  public physioid: any;
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
  public physioname: any
  public hospitalname: any
  active: any
  ngOnInit() {
    this.dummid = localStorage.getItem('hospitalid');
    this.hsp_clinicID = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.physioname = localStorage.getItem('user');
    this.physioid = localStorage.getItem('physioid');
    this.active = 0;
    this.getphysiolist();
    this.GetTimings();
    this.GetDaysMaster();
    this.dayid = 0;
    this.idcount = 1;
    this.table = 0;

    this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
      data => {
        debugger

        let temp: any = data;
        let temp1: any = temp.filter(x => x.physiotherapyID == this.physioid);
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
    this.getlanguage()
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.active = 1;
      this.physioid = params['id'];
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
  public getphysiolist() {
    if (this.dummid == undefined) {
      this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.physiolist = data;
        }, error => {
        }
      )
    }
    else if (this.dummid != undefined) {
      this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.dummlist = data;
          this.physiolist = this.dummlist.filter(x => x.hospitalClinicID == this.hsp_clinicID)
        }, error => {
        }
      )
    }

  }

  public getphysioid(even) {
    this.physioid = even.target.value;
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



  public adddetails() {
    this.table = 1;
    debugger
    var detailsentity = {
      'Sno': this.idcount,
      'PhyioID': this.physioid,
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
      'physiotherapyID': this.detailsarray[0].PhyioID,
      'Fees': this.detailsarray[0].Fees,
      'Hospital_ClinicID': this.detailsarray[0].Hospital_ClinicID,
      'LanguageID': 1
    }
    this.docservice.InsertPhysiotherapyHospitalDetailsAdmin(entity).subscribe(data => {
      debugger
      let qqq = data;
      for (let i = 0; i < this.detailsarray.length; i++) {
        debugger
        var entity = {
          'PhysiotherapyHospitalDetailsID': qqq,
          'PhysiotherapistID': this.detailsarray[i].PhyioID,
          'DayID': this.detailsarray[i].DayID,
          'StartTimee': this.detailsarray[i].StartTime,
          'EndTimee': this.detailsarray[i].EndTime
        }
        this.docservice.InsertPhysiotherapistWorkingDetails(entity).subscribe(data => {
          debugger

        })
      }
      this.detailsarray = [];
      Swal.fire('Completed', 'Saved successfully', 'success');
      location.href = "#/PhysioworkingDash"
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
      'physiotherapyID': this.detailsarray[0].PhyioID,
      'Fees': this.detailsarray[0].Fees,
      'Hospital_ClinicID': this.detailsarray[0].Hospital_ClinicID,
      'LanguageID': 1
    }
    this.docservice.InsertPhysiotherapyHospitalDetailsAdmin(entity).subscribe(data => {
      debugger
      let qqq = data;
      for (let i = 0; i < this.detailsarray.length; i++) {
        debugger
        var entity = {
          'PhysiotherapyHospitalDetailsID': qqq,
          'PhysiotherapistID': this.detailsarray[i].PhyioID,
          'DayID': this.detailsarray[i].DayID,
          'StartTimee': this.detailsarray[i].StartTime,
          'EndTimee': this.detailsarray[i].EndTime
        }
        this.docservice.InsertPhysiotherapistWorkingDetails(entity).subscribe(data => {
          debugger

        })
      }
      this.detailsarray = [];
      Swal.fire('Completed', 'Saved successfully', 'success');
      location.href = "#/PhysiotherapistTimings"
      this.table = 0;
      this.starttime = '';
      this.endtime = '';
      this.dayid = 0;
      this.idcount = 1;
      this.fees = '';
    })
  }

}
