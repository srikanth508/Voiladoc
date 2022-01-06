import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-midwife-working-dash',
  templateUrl: './midwife-working-dash.component.html',
  styleUrls: ['./midwife-working-dash.component.css']
})
export class MidwifeWorkingDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public languageid: any;
  public labels: any;
  public workinglist: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public term: any;
  public dayslist: any;
  public daysname: any;
  public dummlist: any;
  public midwifelist: any;
  public count: any;
  public miwifename: any;
  public middd = {};
  public search: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.miwifename = ''
    this.daysname = ''
    // this.getmidwifelist();
    this.getlanguage();
    // this.GetDaysMaster();


    if (this.hospitalclinicid == undefined) {
      this.GetMidWivesRegistration();
    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.midwifelist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifelist.length;

          this.middd = {
            singleSelection: true,
            idField: 'midWifeID',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        }, error => {
        }
      )
    }

  }

  Timings: any;


  public GetMidwifeTimings() {
    this.spinner.show();
    this.docservice.GetMidwifeYearwiseCalender(this.midwifeid, this.slotTypeID, this.languageid).subscribe(
      data => {
        debugger
        this.Timings = data;
        this.spinner.hide();
      }, error => {
      }
    )
  }


  // Timeings: any
  // public GetTimings() {
  //   this.docservice.GetSlotMasterTimings().subscribe(
  //     data => {

  //       this.Timeings = data;
  //     }, error => {
  //     }
  //   )
  // }

  public GetMidWivesRegistration() {
    this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
      data => {

        this.midwifelist = data;
        this.dummlist = this.midwifelist
        this.count = this.midwifelist.length;

        this.middd = {
          singleSelection: true,
          idField: 'midWifeID',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }


  public select: any;
  labels1: any;
  public getlanguage() {
    this.docservice.GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search
        this.select = this.labels[0].selectMidwife
      }, error => {
      }
    )
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;

      }, error => {
      }
    )
  }
  // public getmidwifelist() {
  //   if (this.hospitalclinicid == undefined) {
  //     this.docservice.GetMidWifeWorkingDetails(this.languageid).subscribe(
  //       data => {
  //         this.dummworkinglist = data;
  //         this.workinglist = data;
  //       }, error => {
  //       }
  //     )
  //   }
  //   else if (this.hospitalclinicid != undefined) {
  //     this.docservice.GetMidWifeWorkingDetails(this.languageid).subscribe(
  //       data => {


  //         this.workinglist = this.dummworkinglist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
  //       }, error => {
  //       }
  //     )
  //   }
  // }


  midwifeid: any;
  slotTypeID: any;

  public GetmidwifeID(item: any) {

    this.midwifeid = item.midWifeID;
    var list = this.midwifelist.filter(x => x.midWifeID == this.midwifeid);
    this.midwifehospitalid = list[0].midwifehospitalid,
      this.slotTypeID = list[0].slotDurationID
    this.GetMidwifeTimings()

  }

  // public getMidwifeworkingdetails() {
  //   this.docservice.GetMidWifeWorkingDetails(this.languageid).subscribe(
  //     data => {

  //       this.dummworkinglist = data;
  //       this.workinglist = this.dummworkinglist.filter(x => x.midWifeID == this.midwifeid)
  //     }, error => {
  //     }
  //   )
  // }





  public midwifehospitalid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public midid: any;

  appointmentypeid: any;
  slotid: any;
  allappointmentid: any;
  docslotid: any;
  fees: any;



  public GetDay1List(details) {
    this.appointmentypeid = details.mondayappointmentID;
    this.slotid = details.mondaySlotID;
    this.allappointmentid = details.mondayappointmentID;
    this.dayid = details.mondayDayID;
    this.docslotid = details.docMondaySlotID;
    this.fees = details.mondayFees;
  }



  public GetDay2List(details) {
    this.appointmentypeid = details.tuesdayAppointmentID;
    this.slotid = details.tuesdaySlotID;
    this.allappointmentid = details.tuesdayAppointmentID;
    this.dayid = details.tuesDayID;
    this.docslotid = details.docTuesDaySlotID;
    this.fees = details.tuesdayFees;
  }

  public GetDay3List(details) {

    this.appointmentypeid = details.wednesdayAppointmentID;
    this.slotid = details.wednessdaySlotID;
    this.allappointmentid = details.wednesdayAppointmentID;
    this.dayid = details.wednessDayID;
    this.docslotid = details.docWednessDaySlotID;
    this.fees = details.wednessdayFees;
  }

  public GetDay4List(details) {

    this.appointmentypeid = details.thursdayAppointmentID;
    this.slotid = details.tursdaySlotID;
    this.allappointmentid = details.thursdayAppointmentID;
    this.dayid = details.thursDayID;
    this.docslotid = details.docThursaDaySlotID;
    this.fees = details.thursdayFees;
  }

  public GetDay5List(details) {

    this.appointmentypeid = details.fridayAppointmentID;
    this.slotid = details.fridaySlotID;
    this.allappointmentid = details.fridayAppointmentID;
    this.dayid = details.friDayID;
    this.docslotid = details.docFridayDaySlotID;
    this.fees = details.fridayFees;
  }

  public GetDay6List(details) {

    this.appointmentypeid = details.saturdayAppintmentID;
    this.slotid = details.saturdaySlotID;
    this.allappointmentid = details.saturdayAppintmentID;
    this.dayid = details.saturDayID;
    this.docslotid = details.docSatDaySlotID;
    this.fees = details.satdayFees;
  }

  public GetDay7List(details) {

    this.appointmentypeid = details.sundayAppointmentID;
    this.slotid = details.sundaySlotID;
    this.allappointmentid = details.sundayAppointmentID;
    this.dayid = details.sunDayID;
    this.docslotid = details.doSunDaySlotID;
    this.fees = details.sundayFees;
  }








  public Updateslots() {
    debugger

    if (this.allappointmentid == 4 && this.appointmentypeid == 1) {
      debugger
      this.spinner.show();
      var entity1 = {
        'MidWifeHospitalDetailsID': this.midwifehospitalid,
        'MidWifeID': this.midwifeid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.InsertMidWifeWorkingDetailsYearwise(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.GetMidwifeTimings();

      })
    }


    else if (this.allappointmentid == 1 && this.appointmentypeid == 6) {
      debugger
      this.spinner.show();
      var entity1 = {
        'MidWifeHospitalDetailsID': this.midwifehospitalid,
        'MidWifeID': this.midwifeid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.InsertMidWifeWorkingDetailsYearwise(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.GetMidwifeTimings();

      })
    }
    else if (this.allappointmentid == 4 && this.appointmentypeid == 6) {
      debugger
      this.spinner.show();
      var entity1 = {
        'MidWifeHospitalDetailsID': this.midwifehospitalid,
        'MidWifeID': this.midwifeid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.InsertMidWifeWorkingDetailsYearwise(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.GetMidwifeTimings();

      })
    }

    else if (this.allappointmentid == 1 && this.appointmentypeid == 4) {
      debugger
      this.spinner.show();
      this.docservice.DeleteMidWifeWorkingDetails(this.slotid).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Deleted Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }

        this.GetMidwifeTimings();
      })
    }
    else if (this.allappointmentid == 6 && this.appointmentypeid == 4) {
      debugger
      this.spinner.show();
      this.docservice.DeleteMidWifeWorkingDetails(this.slotid).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Deleted Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }

        this.GetMidwifeTimings();


      })
    }
  }




}
