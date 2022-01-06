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
  public dayid = [];
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
    this.getlanguage();
    this.getmidwifelist();
 
    this.GetDaysMaster();
    this.endid = 0;
  }
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
  Timeings: any


  middd = {};
  search: any;
  public getmidwifelist() {
    if (this.dummid == undefined) {
      this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.midwifelist = data;



          this.middd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
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
    else if (this.dummid != undefined) {
      this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.midwifelist = this.dummlist.filter(x => x.hospitalClinicID == this.hsp_clinicID);

          this.middd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
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
          enableCheckAll: false
        };

      }, error => {
      }
    )
  }
  slotTypeID:any;

  public getmidwifeid(item: any) {
    this.widwifeid = item.id;
    var list1 = this.dummlist.filter(x => x.id == this.widwifeid)
    this.hsp_clinicID = list1[0].hospitalClinicID,
      this.hospital_ClinicName = list1[0].hospital_ClinicName,
      this.slotTypeID = list1[0].slotDurationID

      this.GetTimings();
  }



  public GetTimings() {
    this.docservice.GetSlotMasterTimings(this.slotTypeID).subscribe(
      data => {

        this.Timeings = data;
      }, error => {
      }
    )
  }
  // public Getworktypeid(even) {

  //   this.worktypeid = even.target.value;
  //   this.GetAllHospitalclinicById();

  // }

  // public GetAllHospitalclinicById() {

  //   this.docservice.GetAllHospital_ClinicListByID(this.worktypeid).subscribe(
  //     data => {

  //       this.hospitalcliniclist = data;
  //     }, error => {
  //     }
  //   )
  // }

  // public Gethsp_clinicID(even) {
  //   this.hsp_clinicID = even.target.value;
  //   this.docservice.GetHospital_ClinicDetailsForAdmin(this.hsp_clinicID).subscribe(
  //     data => {

  //       this.hospital_ClinicName = data[0].hospital_ClinicName
  //     }, error => {
  //     }
  //   )
  // }



  public GetDaysID(item: any) {
    debugger
    this.dayid.push(item);
  }

  daysdd = {};
  startid: any;
  endslotlist: any;
  endid: any;
  slotids: any;
  midwifehospitalid: any;

  public changeStarttime(even) {
    this.startid = even.target.value;
    this.endslotlist = this.Timeings.filter(x => x.id > this.startid);
    this.endid = 0;
  }

  changeEndtime(even) {
    this.endid = even.target.value;
    this.slotids = this.startid + "," + this.endid
  }


  public InsertPhysiotherapyHospitalDetailsAdmin() {
    var entity = {
      'MidWifeID': this.widwifeid,
      'Fees': 0,
      'HospitalClinicID': this.hsp_clinicID,
      'LanguageID': 1
    }
    this.docservice.InsertMidWifeHospitalDetails(entity).subscribe(data => {
      this.midwifehospitalid = data;
      this.Physioworkingdetails();
      if (this.languageid == 1) {
        this.detailsarray = [];
        Swal.fire('Completed', 'Saved successfully', 'success');
        location.href = "#/MidwifeWorkingDash"
        this.table = 0;
        this.starttime = '';
        this.endtime = '';

        this.idcount = 1;
        this.fees = '';
      }
      else {
        this.detailsarray = [];
        Swal.fire('Enregistré');
        location.href = "#/MidwifeWorkingDash"
        this.table = 0;
        this.starttime = '';
        this.endtime = '';

        this.idcount = 1;
        this.fees = '';
      }


    })

  }



  public Physioworkingdetails() {
    for (let j = 0; j < this.dayid.length; j++) {
      debugger
      var entity = {
        'MidWifeHospitalDetailsID': this.midwifehospitalid,
        'MidWifeID': this.widwifeid,
        'DayID': this.dayid[j].id,
        'SlotTimings': this.slotids,
        'Fees': this.fees,
        'AppointmentTypeID': 1
      }
      this.docservice.InsertMidWifeWorkingDetails(entity).subscribe(data => {
      })

    }
  }


  // public InsertPhysiotherapyHospitalDetails() {

  //   var entity = {
  //     'MidWifeID': this.detailsarray[0].MidwifeID,
  //     'Fees': this.detailsarray[0].Fees,
  //     'HospitalClinicID': this.detailsarray[0].Hospital_ClinicID,
  //     'LanguageID': 1
  //   }
  //   this.docservice.InsertMidWifeHospitalDetails(entity).subscribe(data => {

  //     let qqq = data;
  //     for (let i = 0; i < this.detailsarray.length; i++) {

  //       var entity = {
  //         'MidWifeHospitalDetailsID': qqq,
  //         'MidWifeID': this.detailsarray[i].MidwifeID,
  //         'DayID': this.detailsarray[i].DayID,
  //         'StartTimee': this.detailsarray[i].StartTime,
  //         'EndTimee': this.detailsarray[i].EndTime
  //       }
  //       this.docservice.InsertMidWifeWorkingDetails(entity).subscribe(data => {


  //       })
  //     }
  //     if (this.languageid == 1) {
  //       this.detailsarray = [];
  //       Swal.fire('Completed', 'Saved successfully', 'success');
  //       location.href = "#/MidwifeWorkingDash"
  //       this.table = 0;
  //       this.starttime = '';
  //       this.endtime = '';

  //       this.idcount = 1;
  //       this.fees = '';
  //     }
  //     else {
  //       this.detailsarray = [];
  //       Swal.fire('Enregistré');
  //       // location.href = "#/MidWifeTimings"
  //       location.href = "#/MidwifeWorkingDash"
  //       this.table = 0;
  //       this.starttime = '';
  //       this.endtime = '';

  //       this.idcount = 1;
  //       this.fees = '';
  //     }


  //   })

  // }

}
