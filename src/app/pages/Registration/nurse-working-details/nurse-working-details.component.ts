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
  public dayid = []
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
   
    this.idcount = 1;
    this.table = 0;
    this.active = 0;
    this.starttime = 0;
    this.endtime = 0;

    this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
      data => {

        let temp: any = data;
        let temp1: any = temp.filter(x => x.nurseID == this.nurseid);
        this.hospital_ClinicName = temp1[0].hospital_ClinicName;
        this.hsp_clinicID = temp1[0].hospitalClinicID;
      }, error => {
      }
    )
    this.docservice.GetHospital_ClinicDetailsForAdmin(this.hsp_clinicID).subscribe(
      data => {

        this.hospital_ClinicName = data[0].hospital_ClinicName
      }, error => {
      }
    )

    this.getlanguage();
    this.activatedroute.params.subscribe(params => {

      this.active = 1;
      this.nurseid = params['id'];
    }
    )

  }
  search: any;
  select: any;
  public getlanguage() {
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search
        this.select = this.labels[0].select
      }, error => {
      }
    )
  }
  nursedd = {};

  public getnurselist() {
    if (this.hsp_clinicID == undefined) {
      this.docservice.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummnurselist = data;
          this.nurselist = data;

          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            searchPlaceholderText: this.search,
          };

        }, error => {
        }
      )
    }
    else if (this.hsp_clinicID != undefined) {
      this.docservice.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummnurselist = data;
          this.nurselist = this.dummnurselist.filter(x => x.hospitalClinicID == this.hsp_clinicID);

          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            searchPlaceholderText: this.search,
          };
        }, error => {
        }
      )
    }
  }
  slotTypeID:any;

  public getnurseid(item: any) {
    this.nurseid = item.id;
    debugger
    var list = this.dummnurselist.filter(x => x.id == this.nurseid)
    this.hsp_clinicID = list[0].hospitalClinicID,
      this.hospital_ClinicName = list[0].hospital_ClinicName,
      this.slotTypeID = list[0].slotDurationID

      this.GetTimings();
    debugger
  }

  public Getworktypeid(even) {

    this.worktypeid = even.target.value;
    this.GetAllHospitalclinicById();

  }

  public GetAllHospitalclinicById() {

    this.docservice.GetAllHospital_ClinicListByID(this.worktypeid).subscribe(
      data => {

        this.hospitalcliniclist = data;
      }, error => {
      }
    )
  }

  public Gethsp_clinicID(even) {
    this.hsp_clinicID = even.target.value;
    this.docservice.GetHospital_ClinicDetailsForAdmin(this.hsp_clinicID).subscribe(
      data => {

        this.hospital_ClinicName = data[0].hospital_ClinicName
      }, error => {
      }
    )
  }
  daysdd = {};

  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.dayslist = data;

        this.daysdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'dayOfTheWeek',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }
  Timeings: any
  public GetTimings() {
    this.docservice.GetSlotMasterTimings(this.slotTypeID).subscribe(
      data => {

        this.Timeings = data;
      }, error => {
      }
    )
  }

  public GetDaysID(item: any) {
    debugger
    this.dayid.push(item);
  }

  startid: any;
  endid: any;
  endslotlist: any;
  slotids: any;

  public changeStarttime(even) {
    this.startid = even.target.value;
    this.endslotlist = this.Timeings.filter(x => x.id > this.startid);



  }

  changeEndtime(even) {
    this.endid = even.target.value;
    this.slotids = this.startid + "," + this.endid
  }

  public adddetails() {
    this.table = 1;

    var detailsentity = {
      'Sno': this.idcount,
      'NurseID': this.nurseid,
      'Fees': this.fees,
      'Hospital_ClinicID': this.hsp_clinicID,
      // 'DayID': this.dayid,
      'StartTime': this.starttime,
      'EndTime': this.endtime,
      'hospitalname': this.hospital_ClinicName,
      // 'Day': this.day
    }
    this.detailsarray.push(detailsentity);
    this.starttime = '';
    this.endtime = '';
    this.idcount = this.idcount + 1;
  }

  public delete(Sno) {

    for (let i = 0; i < this.detailsarray.length; i++) {

      if (Sno == this.detailsarray[i].Sno) {

        this.detailsarray.splice(i, 1);
      }
    }
    if (this.detailsarray.length == 0) {
      this.table = 0;
    }

  }
  nursehosid: any;

   InsertNurseHospitalDetailsAdmin() {
    debugger
    var entity = {
      'NurseID':this.nurseid,
      'Fees': 0,
      'Hospital_ClinicID': this.hsp_clinicID,
      'LanguageID': 1
    }
    this.docservice.InsertNurseHospitalDetailsAdmin(entity).subscribe(data => {
      debugger
      this.nursehosid = data;
      this.InsertNurseworking();

      if (this.languageid == 1) {

        Swal.fire('Completed', 'Saved successfully', 'success');
        location.href = "#/Nurseworkingdash"

      }
      else {
        Swal.fire('Enregistré');
        location.href = "#/Nurseworkingdash"
      }
    })

  }



  async InsertNurseworking() {
    for (let j = 0; j < this.dayid.length; j++) {
      debugger
      // for (let i = 0; i < this.detailsarray.length; i++) {
        debugger
        var entity1 = {
          'NurseHospitalDetailsID': this.nursehosid,
          'NurseID': this.nurseid,
          'DayID': this.dayid[j].id,
          'SlotTimings': this.slotids,
          'Fees':this.fees,
          'AppointmentTypeID':1
        }
        this.docservice.InsertNurseWorkingDetails(entity1).subscribe(data => {
        })
      // }

    }

  }





  // public InsertNurseHospitalDetailsAdmindash() {

  //   var entity = {
  //     'NurseID': this.detailsarray[0].NurseID,
  //     'Fees': this.detailsarray[0].Fees,
  //     'Hospital_ClinicID': this.detailsarray[0].Hospital_ClinicID,
  //     'LanguageID': 1
  //   }
  //   this.docservice.InsertNurseHospitalDetailsAdmin(entity).subscribe(data => {

  //     let qqqq = data;

  //     for (let i = 0; i < this.detailsarray.length; i++) {

  //       var entity1 = {
  //         'NurseHospitalDetailsID': qqqq,
  //         'NurseID': this.detailsarray[i].NurseID,
  //         'DayID': this.detailsarray[i].DayID,
  //         'StartTimee': this.detailsarray[i].StartTime,
  //         'EndTimee': this.detailsarray[i].EndTime
  //       }
  //       this.docservice.InsertNurseWorkingDetails(entity1).subscribe(data => {

  //       })
  //     }
  //     if (this.languageid == 1) {
  //       this.detailsarray = [];
  //       Swal.fire('Completed', 'Saved successfully', 'success');
  //       location.href = "#/Nurseworkingdash"
  //       this.table = 0;
  //       this.starttime = '';
  //       this.endtime = '';
  //       this.dayid = []
  //       this.idcount = 1;
  //       this.fees = '';
  //     }
  //     else {
  //       this.detailsarray = [];
  //       Swal.fire('Enregistré');
  //       location.href = "#/Nurseworkingdash"
  //       this.table = 0;
  //       this.starttime = '';
  //       this.endtime = '';
  //       this.dayid = []
  //       this.idcount = 1;
  //       this.fees = '';
  //     }

  //   })

  // }

}
