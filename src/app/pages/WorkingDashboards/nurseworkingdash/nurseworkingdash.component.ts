import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-nurseworkingdash',
  templateUrl: './nurseworkingdash.component.html',
  styleUrls: ['./nurseworkingdash.component.css']
})
export class NurseworkingdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public nurseid: any;
  public workinglist: any;
  public nursehospitaldetilsid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public term: any;
  public dayslist: any;
  public id: any;

  public languageid: any;
  public labels: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public dummlist: any;
  public nurselist: any;
  public count: any;
  public daysname: any;
  public nursename: any;
  public nursedd = {};
  public search: any;
  labels1: any;
  ngOnInit() {
    this.daysname = ''
    this.nursename = ''
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');

    this.getlanguage()
    this.getnurseworkingdetails();
    this.GetDaysMaster()

    if (this.hospitalclinicid == undefined) {
      // this.getnurselist();
      this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.nurselist = data;
          this.count = this.nurselist.length;

          this.nursedd = {
            singleSelection: true,
            idField: 'nurseID',
            textField: 'nurseName',
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

    if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.nurselist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.nurselist.length


          this.nursedd = {
            singleSelection: true,
            idField: 'nurseID',
            textField: 'nurseName',
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
    this.GetTimings()
  }


  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.dayslist = data;
      }, error => {
      }
    )
  }

  public SelectLabel: any;

  public getlanguage() {
    this.docservice.GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search,
          this.SelectLabel = this.labels[0].selectNurse
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
  public getnurseworkingdetails() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetNurseWorkingDetils(this.languageid).subscribe(
        data => {
          this.dummworkinglist = data;
          // this.workinglist = data;

        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseWorkingDetils(this.languageid).subscribe(
        data => {

          this.dummworkinglist = data;
          // this.workinglist = this.dummworkinglist.filter(x => x.hospitalClinicID == this.hospitalclinicid)

        }, error => {
        }
      )
    }
  }

  slotTypeID:any;

  public GetNurseID(item: any) {

    this.nurseid = item.nurseID;

    var list = this.nurselist.filter(x => x.nurseID == this.nurseid);
    this.nursehospitaldetilsid = list[0].nursehospitalid,
    this.slotTypeID = list[0].slotDurationID
    
    this.GetNurseTimings()
  }

  public getnurseesworkingdetails() {
    this.docservice.GetNurseWorkingDetils(this.languageid).subscribe(
      data => {

        this.dummworkinglist = data;
        this.workinglist = this.dummworkinglist.filter(x => x.nurseID == this.nurseid)

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


  public Timings: any;

  public GetNurseTimings() {
    this.spinner.show();
    this.docservice.GetNurseSlotsByNurseID(this.nurseid, this.slotTypeID, this.languageid).subscribe(
      data => {
        debugger
        this.Timings = data;
        this.spinner.hide();
      }, error => {
      }
    )
  }


  public GetDetsilsID(nurseHospitalDetailsID, dayID, startime, endtime, nsid) {

    this.nursehospitaldetilsid = nurseHospitalDetailsID;
    this.dayid = dayID,
      this.startdatetime = startime,
      this.enddatetime = endtime
    this.id = nsid;

  }



  public updatedetails() {
    var entity = {
      'ID': this.id,
      'NurseHospitalDetailsID': this.nursehospitaldetilsid,
      'DayID': this.dayid,
      'StartTimee': this.startdatetime,
      'EndTimee': this.enddatetime
    }

    this.docservice.UpdateNurseWorkingDetails(entity).subscribe(data => {
      if (data != undefined) {
        if (this.languageid == 1) {
          Swal.fire("Updated Successfully");
          this.getnurseesworkingdetails();
        }
        else if (this.languageid == 6) {
          Swal.fire("Mis à jour avec succés !");
          this.getnurseesworkingdetails();
        }

      }
    })

  }


  public DeleteNurseWorkingDetails(nsid, dayid) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Day Slot!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteNurseWorkingDetails(nsid, dayid).subscribe(res => {
            let test = res;
            this.getnurseesworkingdetails();
          })
          Swal.fire(
            'Deleted!',
            'Day has been deleted.',
            'success'
          )
        }
        else {
          this.getnurseesworkingdetails();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Supprimer !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'non'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteNurseWorkingDetails(nsid, dayid).subscribe(res => {
            let test = res;
            this.getnurseesworkingdetails();
          })
          Swal.fire(
            '',
            'Supprimé !',
            'success'
          )
        }
        else {
          this.getnurseesworkingdetails();
        }
      })
    }
  }


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
      this.spinner.show();
      var entity1 = {
        'NurseHospitalDetailsID': this.nursehospitaldetilsid,
        'NurseID': this.nurseid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.InsertNurseWorkingDetailsSlots(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.GetNurseTimings();



      })
    }

   else if (this.allappointmentid == 4 && this.appointmentypeid == 6) {
      this.spinner.show();
      var entity1 = {
        'NurseHospitalDetailsID': this.nursehospitaldetilsid,
        'NurseID': this.nurseid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.InsertNurseWorkingDetailsSlots(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.GetNurseTimings();



      })
    }
   else if (this.allappointmentid == 1 && this.appointmentypeid == 6) {
      this.spinner.show();
      var entity1 = {
        'NurseHospitalDetailsID': this.nursehospitaldetilsid,
        'NurseID': this.nurseid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.InsertNurseWorkingDetailsSlots(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.GetNurseTimings();

      })
    }

    else if (this.allappointmentid == 1 && this.appointmentypeid == 4) {
      debugger
      this.spinner.show();
      this.docservice.DeleteNurseWorkingDetailsBySlot(this.slotid).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Deleted Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }

        this.GetNurseTimings();


      })
    }
    else if (this.allappointmentid == 6 && this.appointmentypeid == 4) {
      debugger
      this.spinner.show();
      this.docservice.DeleteNurseWorkingDetailsBySlot(this.slotid).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Deleted Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }

        this.GetNurseTimings();


      })
    }
  }

}
