import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-physiotherapist-working-details',
  templateUrl: './physiotherapist-working-details.component.html',
  styleUrls: ['./physiotherapist-working-details.component.css']
})
export class PhysiotherapistWorkingDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  public physiolist: any;
  public dayslist: any;
  public hospitalcliniclist: any;
  public detailsarray = [];
  public idcount: any;
  public table: any;

  public physioid: any;
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
  public physioname: any
  public hospitalname: any
  active: any
  loader: boolean;
  ngOnInit() {
    this.spinner.show();
    this.dummid = localStorage.getItem('hospitalid');
    this.hsp_clinicID = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.physioname = localStorage.getItem('user');
    this.physioid = localStorage.getItem('physioid');

    this.getphysiolist();

    this.GetDaysMaster();

    // this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
    //   data => {

    //     let temp: any = data;
    //     let temp1: any = temp.filter(x => x.physiotherapyID == this.physioid);
    //     this.hospital_ClinicName = temp1[0].hospital_ClinicName;
    //     this.hsp_clinicID = temp1[0].hospitalClinicID;

    //   }, error => {
    //   }
    // )
    // this.docservice.GetHospital_ClinicDetailsForAdmin(this.hsp_clinicID).subscribe(
    //   data => {

    //     this.hospital_ClinicName = data[0].hospital_ClinicName
    //   }, error => {
    //   }
    // )
    this.getlanguage()
    this.spinner.hide();
  }
  select:any;
  search:any;
  public getlanguage() {
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.select=this.labels[0].select,
        this.search = this.labels[0].search
      }, error => {
      }
    )
  }

  physiodd = {};

  public getphysiolist() {
    if (this.dummid == undefined) {
      this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.physiolist = data;

          this.physiodd = {
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
      this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.physiolist = this.dummlist.filter(x => x.hospitalClinicID == this.hsp_clinicID);

          this.physiodd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            searchPlaceholderText: this.search
          };

        }, error => {
        }
      )
    }

  }

  slotTypeID: any;

  public getphysioid(item: any) {
    this.physioid = item.id;
    var list = this.dummlist.filter(x => x.id == this.physioid)
    this.hsp_clinicID = list[0].hospitalClinicID,
      this.hospital_ClinicName = list[0].hospital_ClinicName,
      this.slotTypeID = list[0].slotDurationID
    this.GetTimings();
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

  public GetDaysID(item: any) {

    this.dayid.push(item)
  }
  Timeings: any;
  public GetTimings() {
    this.docservice.GetSlotMasterTimings(this.slotTypeID).subscribe(
      data => {

        this.Timeings = data;
      }, error => {
      }
    )
  }



  // public adddetails() {
  //   this.table = 1;

  //   var detailsentity = {
  //     'Sno': this.idcount,
  //     'PhyioID': this.physioid,
  //     'Fees': this.fees,
  //     'Hospital_ClinicID': this.hsp_clinicID,
  //     'DayID': this.dayid,
  //     'StartTime': this.starttime,
  //     'EndTime': this.endtime,
  //     'hospitalname': this.hospital_ClinicName,
  //     'Day': this.day

  //   }
  //   this.detailsarray.push(detailsentity);
  //   this.starttime = '';
  //   this.endtime = '';

  //   this.idcount = this.idcount + 1;
  // }

  // public delete(Sno) {

  //   for (let i = 0; i < this.detailsarray.length; i++) {

  //     if (Sno == this.detailsarray[i].Sno) {

  //       this.detailsarray.splice(i, 1);
  //     }
  //   }
  //   if (this.detailsarray.length == 0) {
  //     this.table = 0;
  //   }

  // }

  physiohospitalid: any;
  startid: any;
  endslotlist: any;
  endid: any;
  slotids: any;

  public changeStarttime(even) {
    this.startid = even.target.value;
    this.endslotlist = this.Timeings.filter(x => x.id > this.startid);
  }

  changeEndtime(even) {
    this.endid = even.target.value;
    this.slotids = this.startid + "," + this.endid
  }



  public InsertPhysiotherapyHospitalDetailsAdmin() {
    debugger

    var entity = {
      'physiotherapyID': this.physioid,
      'Fees': 0,
      'Hospital_ClinicID': this.hsp_clinicID,
      'LanguageID': 1
    }
    this.docservice.InsertPhysiotherapyHospitalDetailsAdmin(entity).subscribe(data => {
      this.physiohospitalid = data;
      this.InsertPhyoeorking()
      if (this.languageid == 1) {
        this.loader = false;
        Swal.fire('Completed', 'Saved successfully', 'success');
        location.href = "#/PhysioworkingDash"
      }
      else {
        this.loader = false;
        Swal.fire('Enregistré');
        location.href = "#/PhysioworkingDash"

      }
    })
  }

  async InsertPhyoeorking() {
    for (let j = 0; j < this.dayid.length; j++) {

      var entity = {
        'PhysiotherapyHospitalDetailsID': this.physiohospitalid,
        'PhysiotherapistID': this.physioid,
        'DayID': this.dayid[j].id,
        'SlotTimings': this.slotids,
        'Fees': this.fees,
        'AppointmentTypeID': 1
      }
      this.docservice.InsertPhysiotherapistWorkingDetails(entity).subscribe(data => {

      })
    }

  }


}
