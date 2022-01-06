import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-physioworking-dash',
  templateUrl: './physioworking-dash.component.html',
  styleUrls: ['./physioworking-dash.component.css']
})
export class PhysioworkingDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public languageid: any;
  public labels: any;
  public workinglist: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public dummlistphysiolist: any;
  public physioist: any;
  public term: any;
  public count: any;
  public dummlist: any;
  public dayslist: any;
  public daysname: any;
  public physioname: any;
  public phsyodd = {};
  public search: any;
  loader: boolean;
  labels1: any;
  ngOnInit() {
    this.spinner.show();
    this.daysname = ''
    this.physioname = ''
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.getlanguage();

    if (this.hospitalclinicid != undefined) {
      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummlistphysiolist = data;
          this.physioist = this.dummlistphysiolist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.physioist.length

          this.phsyodd = {
            singleSelection: true,
            idField: 'physiotherapyID',
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
    else if (this.hospitalclinicid == undefined) {

      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {

          this.physioist = data;
          this.dummlist = this.physioist
          this.count = this.physioist.length

          this.phsyodd = {
            singleSelection: true,
            idField: 'physiotherapyID',
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
    this.spinner.hide();
  }







  public getlanguage() {

    this.docservice.GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search,
          this.select = this.labels[0].selectPhysiotherapist
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

  public select: any;




  Timings: any;
  public getPhysioTimings() {
    this.docservice.GetPhysioYearwiseCalender(this.physioid, this.SlotTypeID, this.languageid).subscribe(
      data => {
        debugger
        this.Timings = data;
        this.spinner.hide();

      }, error => {
      }
    )
  }

  // public getphysiolist() {
  //   if (this.hospitalclinicid == undefined) {
  //     this.docservice.GetPhysiotherapyWorkingDetails(this.languageid).subscribe(
  //       data => {

  //         this.workinglist = data;
  //       }, error => {
  //       }
  //     )
  //   }
  //   else if (this.hospitalclinicid != undefined) {
  //     this.docservice.GetPhysiotherapyWorkingDetails(this.languageid).subscribe(
  //       data => {

  //         this.dummworkinglist = data;
  //         this.workinglist = this.dummworkinglist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
  //       }, error => {
  //       }
  //     )
  //   }
  // }

  physioid: any;
  SlotTypeID:any;

  public GetPhysioID(item: any) {
    this.spinner.show();
    this.physioid = item.physiotherapyID
    var list = this.physioist.filter(x => x.physiotherapyID == this.physioid);
    this.phsyhospitadetailsid = list[0].id,
    this.SlotTypeID = list[0].slotDurationID
    this.getPhysioTimings()
  }


  // public GetPhysioWorkingDetails() {
  //   this.docservice.GetPhysiotherapyWorkingDetails(this.languageid).subscribe(
  //     data => {

  //       this.dummworkinglist = data;
  //       this.workinglist = this.dummworkinglist.filter(x => x.physiotherapistID == this.physioid)
  //     }, error => {
  //     }
  //   )
  // }




  // Timeings: any
  // public GetTimings() {
  //   this.docservice.GetSlotMasterTimings().subscribe(
  //     data => {

  //       this.Timeings = data;
  //     }, error => {
  //     }
  //   )
  // }

  phsyhospitadetailsid: any;
  public dayid: any;
  public id: any;



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
        'PhysiotherapyHospitalDetailsID': this.phsyhospitadetailsid,
        'PhysiotherapistID': this.physioid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.InsertPhysiotherapistWorkingDetailsByYearWise(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.getPhysioTimings();

      })
    }


  else if (this.allappointmentid == 1 && this.appointmentypeid == 6) {
      debugger
      this.spinner.show();
      var entity1 = {
        'PhysiotherapyHospitalDetailsID': this.phsyhospitadetailsid,
        'PhysiotherapistID': this.physioid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.InsertPhysiotherapistWorkingDetailsByYearWise(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.getPhysioTimings();

      })
    }
    else if (this.allappointmentid == 4 && this.appointmentypeid == 6) {
      debugger
      this.spinner.show();
      var entity1 = {
        'PhysiotherapyHospitalDetailsID': this.phsyhospitadetailsid,
        'PhysiotherapistID': this.physioid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.InsertPhysiotherapistWorkingDetailsByYearWise(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.getPhysioTimings();

      })
    }

    else if (this.allappointmentid == 1 && this.appointmentypeid == 4) {
      debugger
      this.spinner.show();
      this.docservice.DeletePhysiotherapistWorkingDetails(this.slotid).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Deleted Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }

        this.getPhysioTimings();
      })
    }
    else if (this.allappointmentid == 6 && this.appointmentypeid == 4) {
      debugger
      this.spinner.show();
      this.docservice.DeletePhysiotherapistWorkingDetails(this.slotid).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Deleted Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }

        this.getPhysioTimings();


      })
    }
  }

}
